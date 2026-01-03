'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { signInWithGoogle, signOut } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { User } from '@supabase/supabase-js'

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

    // 检查环境变量是否配置
    if (!supabaseUrl || !supabaseKey || 
        supabaseUrl === 'your_supabase_project_url' || 
        !supabaseUrl.startsWith('http')) {
      setLoading(false)
      return
    }

    const supabase = createClient()

    // 获取当前用户
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })

    // 监听认证状态变化
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // 检查 Supabase 是否配置
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  const isSupabaseConfigured = supabaseUrl && 
                                 supabaseKey && 
                                 supabaseUrl !== 'your_supabase_project_url' && 
                                 supabaseUrl.startsWith('http')

  if (loading) {
    return (
      <Button disabled className="bg-primary text-primary-foreground hover:bg-primary/90">
        加载中...
      </Button>
    )
  }

  // 如果 Supabase 未配置，不显示登录按钮（可选：也可以显示提示）
  if (!isSupabaseConfigured) {
    // 如果不需要登录功能，可以返回 null 隐藏按钮
    // return null
    
    // 或者显示一个简单的提示（可选）
    return (
      <Button 
        disabled 
        className="bg-muted text-muted-foreground hover:bg-muted/90 opacity-50"
        title="Google 登录功能需要配置 Supabase。如果不需要登录功能，可以忽略此提示。"
      >
        登录（可选）
      </Button>
    )
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || '用户'} />
              <AvatarFallback>
                {user.email?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.user_metadata?.full_name || user.email}
              </p>
              <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>登出</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Button
      onClick={() => signInWithGoogle()}
      className="bg-primary text-primary-foreground hover:bg-primary/90"
    >
      使用 Google 登录
    </Button>
  )
}

