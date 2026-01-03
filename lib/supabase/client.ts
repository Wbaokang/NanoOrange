'use client'

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  // 如果环境变量未配置或无效，返回 null 或抛出错误
  if (!supabaseUrl || !supabaseKey || 
      supabaseUrl === 'your_supabase_project_url' || 
      !supabaseUrl.startsWith('http')) {
    // 在客户端，我们返回一个模拟的客户端对象，避免应用崩溃
    console.warn(
      'Supabase 环境变量未配置。请在 .env.local 文件中设置 NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY。' +
      '详情请参考 QUICK_START.md 文件。'
    )
    // 返回一个最小化的客户端对象，避免应用崩溃
    return createBrowserClient(
      'https://placeholder.supabase.co',
      'placeholder-key'
    )
  }

  return createBrowserClient(
    supabaseUrl,
    supabaseKey
  )
}

