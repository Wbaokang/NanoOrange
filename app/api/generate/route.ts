import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    'X-Title': 'Nano Banana - AI Image Editor',
  },
})

export async function POST(request: NextRequest) {
  try {
    const { image, prompt } = await request.json()

    if (!image) {
      return NextResponse.json({ error: '图片是必需的' }, { status: 400 })
    }

    if (!prompt || !prompt.trim()) {
      return NextResponse.json({ error: '提示词是必需的' }, { status: 400 })
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json({ error: 'API密钥未配置' }, { status: 500 })
    }

    // 调用 Gemini 2.5 Flash Image API
    // 这是一个图像生成模型，可以基于输入图像和提示词生成新图像
    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.5-flash-image',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt.trim(),
            },
            {
              type: 'image_url',
              image_url: {
                url: image, // base64 data URL 格式 (data:image/...)
              },
            },
          ],
        },
      ],
    })

    const responseMessage = completion.choices[0]?.message

    if (!responseMessage) {
      return NextResponse.json({ error: 'API 未返回有效响应' }, { status: 500 })
    }

    // 处理API响应
    // Gemini 2.5 Flash Image 返回的内容可能是：
    // 1. 包含图片的数组格式
    // 2. 文本格式的base64图片数据
    // 3. 图片URL
    // 4. 文本描述（需要进一步处理）
    let imageUrl: string | null = null

    console.log('开始解析API响应...')
    console.log('响应消息:', JSON.stringify(responseMessage, null, 2))

    if (responseMessage.content) {
      const content = responseMessage.content
      console.log('内容类型:', typeof content)
      console.log('是否为数组:', Array.isArray(content))

      // 情况1: content是数组，查找图片类型的内容
      if (Array.isArray(content)) {
        console.log('内容数组长度:', content.length)
        for (let i = 0; i < content.length; i++) {
          const item = content[i]
          console.log(`项目 ${i}:`, JSON.stringify(item, null, 2))
          
          if (item.type === 'image_url' && item.image_url?.url) {
            imageUrl = item.image_url.url
            console.log('找到图片URL (image_url类型):', imageUrl)
            break
          }
          if (item.type === 'image' && item.image) {
            imageUrl = typeof item.image === 'string' ? item.image : item.image.url
            console.log('找到图片 (image类型):', imageUrl)
            break
          }
          // 检查是否有其他可能的图片字段
          if (item.url) {
            imageUrl = item.url
            console.log('找到图片URL (url字段):', imageUrl)
            break
          }
        }
      }
      // 情况2: content是字符串
      else if (typeof content === 'string') {
        console.log('内容字符串长度:', content.length)
        console.log('内容前100字符:', content.substring(0, 100))
        
        // 检查是否是base64图片数据
        if (
          content.startsWith('data:image/') ||
          content.startsWith('/9j/') ||
          content.startsWith('iVBORw0KGgo') ||
          (content.length > 100 && content.match(/^[A-Za-z0-9+/=\s]+$/))
        ) {
          // 如果是base64数据但没有data:前缀，添加它
          if (!content.startsWith('data:')) {
            imageUrl = `data:image/png;base64,${content.trim()}`
            console.log('转换为base64数据URL')
          } else {
            imageUrl = content
            console.log('使用原始base64数据URL')
          }
        }
        // 检查是否包含图片URL
        else {
          const urlMatch = content.match(/https?:\/\/[^\s<>"']+\.(jpg|jpeg|png|gif|webp|svg)/i)
          if (urlMatch) {
            imageUrl = urlMatch[0]
            console.log('从字符串中提取图片URL:', imageUrl)
          } else {
            // 可能是文本描述，记录以便调试
            console.log('内容可能是文本描述:', content.substring(0, 200))
          }
        }
      }
      // 情况3: content是对象
      else if (typeof content === 'object' && content !== null) {
        console.log('内容是对象:', JSON.stringify(content, null, 2))
        // 尝试从对象中提取图片URL
        if ((content as any).url) {
          imageUrl = (content as any).url
        } else if ((content as any).image_url) {
          imageUrl = typeof (content as any).image_url === 'string' 
            ? (content as any).image_url 
            : (content as any).image_url?.url
        }
      }
    }
    
    // 如果responseMessage本身有图片相关字段
    if (!imageUrl) {
      if ((responseMessage as any).image) {
        imageUrl = (responseMessage as any).image
        console.log('从响应消息中提取图片')
      } else if ((responseMessage as any).imageUrl) {
        imageUrl = (responseMessage as any).imageUrl
        console.log('从响应消息中提取imageUrl')
      }
    }

    // 如果找到了图片URL，返回它
    if (imageUrl) {
      return NextResponse.json({
        imageUrl,
      })
    }

    // 如果无法解析图片，尝试更多解析方式
    console.log('API响应:', JSON.stringify(responseMessage, null, 2))
    console.log('响应内容类型:', typeof responseMessage.content)
    console.log('响应内容:', responseMessage.content)
    
    // 尝试从原始响应中提取任何可能的图片数据
    const responseStr = JSON.stringify(responseMessage)
    
    // 检查是否包含base64图片数据
    const base64Match = responseStr.match(/data:image\/[^;]+;base64,[A-Za-z0-9+/=]+/)
    if (base64Match) {
      console.log('找到base64图片数据')
      return NextResponse.json({
        imageUrl: base64Match[0],
      })
    }
    
    // 检查是否包含图片URL
    const urlMatch = responseStr.match(/https?:\/\/[^\s"']+\.(jpg|jpeg|png|gif|webp|svg)/i)
    if (urlMatch) {
      console.log('找到图片URL:', urlMatch[0])
      return NextResponse.json({
        imageUrl: urlMatch[0],
      })
    }
    
    // 如果仍然无法解析，返回详细错误信息
    return NextResponse.json(
      {
        error: '无法从API响应中提取图片',
        message: 'API响应已接收，但响应格式不符合预期',
        rawResponse: responseMessage,
        responseContent: responseMessage.content,
        responseType: typeof responseMessage.content,
        hint: '请检查API响应格式，可能需要调整解析逻辑。查看控制台日志获取更多信息。',
      },
      { status: 500 }
    )
  } catch (error: any) {
    console.error('生成图片时出错:', error)
    
    // 处理特定的API错误
    const errorMessage = error.message || '生成图片时出错'
    const errorStatus = error.status || error.response?.status || 500
    
    // 检查是否是API密钥相关错误
    if (errorMessage.includes('403') || errorMessage.includes('Key limit exceeded') || errorMessage.includes('limit')) {
      return NextResponse.json(
        {
          error: 'API密钥已达到使用限制',
          message: '您的OpenRouter API密钥已达到使用限制。请访问 https://openrouter.ai/settings/keys 管理您的密钥或升级账户。',
          type: 'API_KEY_LIMIT',
          details: error.response?.data || error.cause,
        },
        { status: 403 }
      )
    }
    
    // 检查是否是认证错误
    if (errorMessage.includes('401') || errorMessage.includes('Unauthorized') || errorMessage.includes('Invalid API key')) {
      return NextResponse.json(
        {
          error: 'API密钥无效',
          message: 'OpenRouter API密钥无效或未配置。请检查 .env.local 文件中的 OPENROUTER_API_KEY 配置。',
          type: 'API_KEY_INVALID',
          details: error.response?.data || error.cause,
        },
        { status: 401 }
      )
    }
    
    return NextResponse.json(
      {
        error: errorMessage,
        details: error.response?.data || error.cause,
      },
      { status: errorStatus }
    )
  }
}
