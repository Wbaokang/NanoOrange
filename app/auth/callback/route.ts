import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')
  const next = searchParams.get('next') ?? '/'

  // 检查是否有错误参数（来自 OAuth 提供商）
  if (error) {
    console.error('OAuth error:', error, errorDescription)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL || origin}/auth/auth-code-error?error=${encodeURIComponent(error)}&description=${encodeURIComponent(errorDescription || '')}`
    )
  }

  if (code) {
    try {
      const supabase = await createClient()
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (exchangeError) {
        console.error('Exchange code error:', exchangeError)
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_SITE_URL || origin}/auth/auth-code-error?error=${encodeURIComponent(exchangeError.message)}`
        )
      }

      if (data.session) {
        // 成功交换会话，重定向到应用
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || origin
        const forwardedHost = request.headers.get('x-forwarded-host')
        const isLocalEnv = process.env.NODE_ENV === 'development'
        
        let redirectUrl: string
        if (isLocalEnv) {
          redirectUrl = `${origin}${next}`
        } else if (forwardedHost) {
          redirectUrl = `https://${forwardedHost}${next}`
        } else {
          redirectUrl = siteUrl.startsWith('http') ? `${siteUrl}${next}` : `${origin}${next}`
        }
        
        return NextResponse.redirect(redirectUrl)
      }
    } catch (err: any) {
      console.error('Callback error:', err)
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL || origin}/auth/auth-code-error?error=${encodeURIComponent(err.message || 'Unknown error')}`
      )
    }
  }

  // 如果没有 code 也没有 error，重定向到错误页面
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL || origin}/auth/auth-code-error`)
}

