"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Sparkles, Loader2 } from "lucide-react"
import { toast } from "sonner"

export function Editor() {
  const [prompt, setPrompt] = useState("")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // 检查文件大小（10MB）
      if (file.size > 10 * 1024 * 1024) {
        toast.error("图片大小不能超过 10MB")
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = async () => {
    if (!uploadedImage) {
      toast.error("请先上传图片")
      return
    }

    if (!prompt.trim()) {
      toast.error("请输入提示词")
      return
    }

    setIsGenerating(true)
    toast.loading("正在生成图片...")

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: uploadedImage,
          prompt: prompt.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // 处理特定的错误类型
        if (data.type === 'API_KEY_LIMIT') {
          toast.error(data.message || data.error || "API密钥已达到使用限制", {
            duration: 10000,
            action: {
              label: "管理密钥",
              onClick: () => window.open("https://openrouter.ai/settings/keys", "_blank"),
            },
          })
          throw new Error(data.message || data.error || "API密钥已达到使用限制")
        }
        
        if (data.type === 'API_KEY_INVALID') {
          toast.error(data.message || data.error || "API密钥无效", {
            duration: 8000,
          })
          throw new Error(data.message || data.error || "API密钥无效")
        }
        
        // 如果是响应格式问题，显示详细信息
        if (data.message?.includes('响应格式不符合预期') || data.error?.includes('无法从API响应中提取图片')) {
          console.error('API响应格式问题:', data)
          console.error('原始响应:', data.rawResponse)
          toast.error(data.message || data.error || "API响应格式不符合预期", {
            description: data.hint || "请查看控制台获取详细信息",
            duration: 10000,
          })
          throw new Error(data.message || data.error || "API响应格式不符合预期")
        }
        
        throw new Error(data.message || data.error || "生成失败")
      }

      // 处理返回的图片
      if (data.imageUrl) {
        setGeneratedImages((prev) => [data.imageUrl, ...prev])
        toast.success("图片生成成功！")
      } else if (data.message) {
        // 如果返回的是文本消息，显示它
        toast.info(data.message)
      } else {
        toast.warning("未收到图片响应")
      }
    } catch (error: any) {
      console.error("生成图片时出错:", error)
      // 如果错误消息已经通过toast显示，就不再重复显示
      if (!error.message?.includes("API密钥")) {
        toast.error(error.message || "生成图片时出错，请重试")
      }
    } finally {
      setIsGenerating(false)
      toast.dismiss()
    }
  }

  return (
    <section id="editor" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started</h2>
          <p className="text-lg text-muted-foreground">Try The AI Editor</p>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
            Experience the power of Nano Banana&apos;s natural language image editing. Transform any photo with simple
            text commands
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Prompt Engine
              </CardTitle>
              <CardDescription>Transform your image with AI-powered editing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="image-to-image">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="image-to-image">Image to Image</TabsTrigger>
                  <TabsTrigger value="text-to-image">Text to Image</TabsTrigger>
                </TabsList>
                <TabsContent value="image-to-image" className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Upload Image</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      {uploadedImage ? (
                        <div className="space-y-3">
                          <img
                            src={uploadedImage}
                            alt="Uploaded"
                            className="max-h-40 mx-auto rounded border border-border"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setUploadedImage(null)
                              const input = document.getElementById('image-upload') as HTMLInputElement
                              if (input) input.value = ''
                            }}
                          >
                            更换图片
                          </Button>
                        </div>
                      ) : (
                        <label htmlFor="image-upload" className="cursor-pointer block">
                          <Upload className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                          <p className="text-xs text-muted-foreground mt-1">Max 10MB</p>
                        </label>
                      )}
                    </div>
                    {!uploadedImage && (
                      <Button
                        variant="outline"
                        className="w-full mt-2"
                        onClick={() => {
                          document.getElementById('image-upload')?.click()
                        }}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Add Image
                      </Button>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="text-to-image" className="space-y-4 mt-4">
                  <p className="text-sm text-muted-foreground">Generate images from text descriptions</p>
                </TabsContent>
              </Tabs>

              <div>
                <label className="text-sm font-medium mb-2 block">Main Prompt</label>
                <Textarea
                  placeholder="Describe your desired edits... e.g., 'place the person in a snowy mountain landscape'"
                  className="min-h-[120px] resize-none"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
                onClick={handleGenerate}
                disabled={isGenerating || !uploadedImage || !prompt.trim()}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    <span>生成中...</span>
                  </>
                ) : (
                  <>
                    <span className="mr-2">Generate Now</span>
                    <span>🍌</span>
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <CardTitle>Output Gallery</CardTitle>
              <CardDescription>Your ultra-fast AI creations appear here instantly</CardDescription>
            </CardHeader>
            <CardContent>
              {generatedImages.length === 0 ? (
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
                  <Sparkles className="w-16 h-16 text-muted-foreground/30 mb-4" />
                  <p className="text-lg font-medium text-muted-foreground mb-2">Ready for instant generation</p>
                  <p className="text-sm text-muted-foreground">Enter your prompt and unleash the power</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {generatedImages.map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={imageUrl}
                          alt={`Generated ${index + 1}`}
                          className="w-full h-auto rounded-lg border border-border"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                              const link = document.createElement("a")
                              link.href = imageUrl
                              link.download = `generated-image-${index + 1}.png`
                              link.click()
                            }}
                          >
                            下载
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
