import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AuthCodeError() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-bold">认证错误</h1>
        <p className="text-muted-foreground">
          登录过程中出现了错误。请重试。
        </p>
        <Link href="/">
          <Button>返回首页</Button>
        </Link>
      </div>
    </div>
  )
}

