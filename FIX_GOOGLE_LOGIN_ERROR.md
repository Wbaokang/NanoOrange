# 修复 Google 登录错误："requested path is invalid"

## 🔴 错误原因

错误 "requested path is invalid" 通常是因为 OAuth 回调 URL 配置不正确。

## 🔍 问题诊断

检查您的 `.env.local` 文件，`NEXT_PUBLIC_SITE_URL` 应该设置为：

### ❌ 错误配置
```env
NEXT_PUBLIC_SITE_URL=https://hwzbhkhqbwjnswnyhvgi.supabase.co/auth/v1/callback
```

### ✅ 正确配置
```env
# 开发环境
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# 或生产环境
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 🔧 修复步骤

### 步骤 1: 修正环境变量

编辑 `.env.local` 文件，将 `NEXT_PUBLIC_SITE_URL` 改为您的实际网站 URL：

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://hwzbhkhqbwjnswnyhvgi.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_fRDieUziEao_pKbW5Dw1og_J2FdAcIk

# Site URL - 应该是您的网站地址，不是 Supabase 回调 URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# OpenRouter API Key
OPENROUTER_API_KEY=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
```

### 步骤 2: 检查 Supabase Dashboard 配置

1. **访问 Supabase Dashboard**
   - https://supabase.com/dashboard/project/hwzbhkhqbwjnswnyhvgi/auth/url-configuration

2. **配置 Site URL**
   - **Site URL**: 设置为 `http://localhost:3000`（开发环境）
   - 或 `https://yourdomain.com`（生产环境）

3. **配置 Redirect URLs**
   - 添加：`http://localhost:3000/auth/callback`（开发环境）
   - 添加：`https://yourdomain.com/auth/callback`（生产环境）

### 步骤 3: 检查 Google Cloud Console 配置

1. **访问 Google Cloud Console**
   - https://console.cloud.google.com/

2. **检查 OAuth 2.0 凭据**
   - 进入 **API 和服务** > **凭据**
   - 找到您的 OAuth 2.0 客户端 ID
   - 点击编辑

3. **检查已授权的重定向 URI**
   - 应该包含：`https://hwzbhkhqbwjnswnyhvgi.supabase.co/auth/v1/callback`
   - 这是 Supabase 的回调 URL（由 Supabase 处理）
   - **不要**添加您自己的 `/auth/callback` URL 到这里

### 步骤 4: 重启开发服务器

```bash
# 停止当前服务器 (Ctrl+C)
npm run dev
```

## 📝 配置说明

### OAuth 流程中的 URL

1. **NEXT_PUBLIC_SITE_URL**
   - 用途：告诉 Supabase 登录成功后重定向到哪里
   - 值：您的网站 URL（`http://localhost:3000`）
   - 位置：`.env.local` 文件

2. **Supabase 回调 URL**
   - 用途：Google 登录后重定向到 Supabase
   - 值：`https://hwzbhkhqbwjnswnyhvgi.supabase.co/auth/v1/callback`
   - 位置：Google Cloud Console 的 OAuth 凭据中

3. **应用回调 URL**
   - 用途：Supabase 处理完登录后重定向到您的应用
   - 值：`http://localhost:3000/auth/callback`
   - 位置：Supabase Dashboard > Authentication > URL Configuration

## ✅ 正确的配置流程

```
用户点击登录
    ↓
重定向到 Google
    ↓
Google 验证后重定向到 Supabase
    ↓ (使用 Supabase 回调 URL)
https://hwzbhkhqbwjnswnyhvgi.supabase.co/auth/v1/callback
    ↓
Supabase 处理登录
    ↓ (使用应用回调 URL)
重定向到您的应用
    ↓
http://localhost:3000/auth/callback
    ↓
显示用户信息
```

## 🐛 常见错误

### 错误 1: NEXT_PUBLIC_SITE_URL 设置为 Supabase URL
```
❌ NEXT_PUBLIC_SITE_URL=https://xxx.supabase.co/auth/v1/callback
✅ NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 错误 2: Redirect URLs 配置错误
```
❌ 在 Google Cloud Console 中添加了 http://localhost:3000/auth/callback
✅ 在 Google Cloud Console 中只添加 Supabase 回调 URL
✅ 在 Supabase Dashboard 中添加应用回调 URL
```

### 错误 3: Site URL 和 Redirect URL 不匹配
- Supabase Dashboard 中的 Site URL 应该与 `NEXT_PUBLIC_SITE_URL` 一致
- Redirect URLs 应该包含 `/auth/callback` 路径

## 🔗 相关链接

- **Supabase URL Configuration**: https://supabase.com/dashboard/project/hwzbhkhqbwjnswnyhvgi/auth/url-configuration
- **Google Cloud Console**: https://console.cloud.google.com/

