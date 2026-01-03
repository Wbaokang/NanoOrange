'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function AuthCodeError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const description = searchParams.get('description')

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-bold">认证错误</h1>
        <p className="text-muted-foreground">
          登录过程中出现了错误。请重试。
        </p>
        {error && (
          <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-md text-left">
            <p className="text-sm font-medium text-destructive mb-2">错误详情：</p>
            <p className="text-xs text-muted-foreground break-all">{error}</p>
            {description && (
              <p className="text-xs text-muted-foreground mt-2 break-all">{description}</p>
            )}
          </div>
        )}
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button>返回首页</Button>
          </Link>
          <Button variant="outline" onClick={() => window.location.reload()}>
            重试
          </Button>
        </div>
        <div className="mt-6 text-xs text-muted-foreground space-y-2">
          <p>如果问题持续存在，请检查：</p>
          <ul className="list-disc list-inside text-left space-y-1">
            <li>Supabase Dashboard 中的 Google 提供商配置</li>
            <li>Supabase URL Configuration 中的 Redirect URLs</li>
            <li>Google Cloud Console 中的 OAuth 凭据</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

