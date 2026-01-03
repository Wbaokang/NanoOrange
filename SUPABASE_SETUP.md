# Supabase Google 登录配置指南

本项目已集成 Supabase 服务器端 Google 登录功能。

## 1. 安装依赖

依赖已安装完成：
- `@supabase/supabase-js`
- `@supabase/ssr`

## 2. 配置环境变量

在项目根目录创建 `.env.local` 文件，添加以下环境变量：

```env
# Supabase 配置
# 从 Supabase 项目设置中获取这些值: https://supabase.com/dashboard/project/_/settings/api
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key

# 站点 URL (用于 OAuth 回调)
# 开发环境使用 http://localhost:3000
# 生产环境使用您的实际域名
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 如何获取 Supabase 配置值：

1. 登录 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择您的项目
3. 进入 **Settings** > **API**
4. 复制以下值：
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Publishable key** → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

## 3. 配置 Google OAuth

### 3.1 在 Google Cloud Console 中设置

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 **Google+ API**
4. 进入 **API 和服务** > **凭据**
5. 点击 **创建凭据** > **OAuth 2.0 客户端 ID**
6. 配置同意屏幕（如果尚未配置）
7. 创建 Web 应用程序凭据：
   - **名称**: 您的应用名称
   - **已授权的 JavaScript 来源**: 
     - `http://localhost:3000` (开发环境)
     - `https://your-domain.com` (生产环境)
   - **已授权的重定向 URI**:
     - `https://your-project-ref.supabase.co/auth/v1/callback`
     - 您可以在 Supabase Dashboard > Authentication > URL Configuration 中找到正确的回调 URL

### 3.2 在 Supabase Dashboard 中配置

1. 登录 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择您的项目
3. 进入 **Authentication** > **Providers**
4. 找到 **Google** 提供商并启用
5. 输入从 Google Cloud Console 获取的：
   - **Client ID (for OAuth)**
   - **Client Secret (for OAuth)**
6. 保存配置

## 4. 项目结构

```
├── lib/
│   └── supabase/
│       ├── client.ts          # 客户端组件使用的 Supabase 客户端
│       ├── server.ts          # 服务器组件使用的 Supabase 客户端
│       └── proxy.ts           # 会话刷新代理
├── app/
│   ├── actions/
│   │   └── auth.ts            # 登录/登出服务器操作
│   └── auth/
│       └── callback/
│           └── route.ts       # OAuth 回调处理
├── components/
│   ├── auth-button.tsx        # 登录按钮组件
│   └── header.tsx             # 已更新，包含登录功能
├── middleware.ts              # Next.js 中间件（用于会话刷新）
└── proxy.ts                   # 代理配置
```

## 5. 功能说明

### 服务器端认证流程

1. **用户点击登录按钮** → 调用 `signInWithGoogle()` 服务器操作
2. **重定向到 Google** → Supabase 处理 OAuth 流程
3. **Google 回调** → 重定向到 `/auth/callback`
4. **交换代码** → 使用授权码交换会话令牌
5. **设置 Cookie** → 会话信息存储在安全的 HTTP-only Cookie 中
6. **中间件刷新** → `middleware.ts` 自动刷新过期的会话令牌

### 安全特性

- ✅ 使用服务器端认证，避免客户端暴露敏感信息
- ✅ 会话令牌存储在 HTTP-only Cookie 中
- ✅ 自动刷新过期的认证令牌
- ✅ 使用 PKCE 流程增强安全性

## 6. 使用方法

登录功能已集成到 Header 组件中：

- **未登录状态**: 显示 "使用 Google 登录" 按钮
- **已登录状态**: 显示用户头像下拉菜单，包含用户信息和登出选项

## 7. 故障排除

### 问题：登录后重定向失败

- 检查 `.env.local` 中的 `NEXT_PUBLIC_SITE_URL` 是否正确
- 确保 Supabase Dashboard 中的重定向 URL 配置正确

### 问题：Google OAuth 错误

- 检查 Google Cloud Console 中的重定向 URI 是否包含 Supabase 回调 URL
- 确保 Google+ API 已启用
- 检查客户端 ID 和密钥是否正确

### 问题：会话不持久

- 检查 `middleware.ts` 是否正确配置
- 确保 Cookie 设置正确（检查浏览器开发者工具）

## 参考文档

- [Supabase 服务器端认证文档](https://supabase.com/docs/guides/auth/server-side/creating-a-client)
- [Supabase Google 登录文档](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Next.js 中间件文档](https://nextjs.org/docs/app/building-your-application/routing/middleware)

