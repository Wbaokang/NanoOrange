# 调试回调 URL 问题

## 问题描述

如果您看到回调 URL 指向 Supabase 而不是您的应用（例如：`https://hwzbhkhqbwjnswnyhvgi.supabase.co/auth/v1/callback`），这说明 Supabase 没有正确重定向到您的应用。

## 原因分析

1. **Supabase Dashboard 中的 Redirect URLs 未正确配置**
   - Supabase 需要知道哪些 URL 是允许的回调地址
   - 如果您的应用回调 URL 不在允许列表中，Supabase 会使用默认的回调 URL

2. **环境变量 `NEXT_PUBLIC_SITE_URL` 配置错误**
   - 这个值必须与您在 Supabase Dashboard 中配置的 Redirect URL 完全匹配

## 解决步骤

### 步骤 1：检查环境变量

确保 `.env.local` 文件中的 `NEXT_PUBLIC_SITE_URL` 正确：

```env
NEXT_PUBLIC_SITE_URL=https://www.zenoai.online
```

**重要**：
- ✅ 不要包含尾部斜杠（`/`）
- ✅ 使用 `https://` 协议
- ✅ 使用您的实际域名

### 步骤 2：在 Supabase Dashboard 中配置 Redirect URLs

1. 登录 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择您的项目：`hwzbhkhqbwjnswnyhvgi`
3. 进入 **Authentication** → **URL Configuration**
4. 在 **Redirect URLs** 部分，添加以下 URL：

```
https://www.zenoai.online/auth/callback
```

5. 如果还在本地开发，也可以添加：

```
http://localhost:3000/auth/callback
```

6. 点击 **Save** 保存更改

### 步骤 3：检查 Google Cloud Console 配置

1. 登录 [Google Cloud Console](https://console.cloud.google.com)
2. 选择您的项目
3. 进入 **APIs & Services** → **Credentials**
4. 找到您的 OAuth 2.0 Client ID
5. 在 **Authorized redirect URIs** 中，确保包含：

```
https://hwzbhkhqbwjnswnyhvgi.supabase.co/auth/v1/callback
```

**注意**：Google Cloud Console 中的 redirect URI 应该指向 Supabase，而不是您的应用。Supabase 会处理 Google 的回调，然后重定向到您的应用。

### 步骤 4：验证配置

1. 重启开发服务器（如果正在本地测试）
2. 清除浏览器缓存和 cookies
3. 尝试重新登录

## 调试技巧

### 检查回调 URL

当您点击 Google 登录后，观察浏览器地址栏中的 URL：

- ✅ **正确**：`https://www.zenoai.online/auth/callback?code=...`
- ❌ **错误**：`https://hwzbhkhqbwjnswnyhvgi.supabase.co/auth/v1/callback?code=...`

如果看到 Supabase 的 URL，说明 Redirect URLs 配置不正确。

### 检查网络请求

1. 打开浏览器开发者工具（F12）
2. 切换到 **Network** 标签
3. 尝试登录
4. 查看重定向链：
   - Google OAuth → Supabase → 您的应用

### 检查 Supabase 日志

1. 在 Supabase Dashboard 中，进入 **Logs** → **Auth Logs**
2. 查看是否有错误信息
3. 特别关注与 redirect 相关的错误

## 常见错误

### 错误 1：`requested path is invalid`

**原因**：Redirect URL 不在 Supabase 的允许列表中

**解决**：在 Supabase Dashboard 的 **URL Configuration** 中添加正确的 Redirect URL

### 错误 2：500 Internal Server Error

**原因**：
- Supabase 无法重定向到您的应用
- 环境变量配置错误
- 回调处理逻辑出错

**解决**：
1. 检查 `NEXT_PUBLIC_SITE_URL` 是否正确
2. 检查 Supabase Dashboard 中的 Redirect URLs
3. 查看应用日志以获取详细错误信息

### 错误 3：回调 URL 包含 Supabase 域名

**原因**：Supabase 没有找到匹配的 Redirect URL，使用了默认值

**解决**：确保在 Supabase Dashboard 中正确配置了 Redirect URLs

## 验证清单

在继续之前，请确认：

- [ ] `.env.local` 中的 `NEXT_PUBLIC_SITE_URL` 设置为 `https://www.zenoai.online`（无尾部斜杠）
- [ ] Supabase Dashboard → Authentication → URL Configuration → Redirect URLs 中包含 `https://www.zenoai.online/auth/callback`
- [ ] Google Cloud Console → OAuth 2.0 Client ID → Authorized redirect URIs 中包含 `https://hwzbhkhqbwjnswnyhvgi.supabase.co/auth/v1/callback`
- [ ] 已重启开发服务器（如果本地测试）
- [ ] 已清除浏览器缓存和 cookies

## 需要帮助？

如果问题仍然存在，请提供：
1. 浏览器地址栏中的完整回调 URL
2. 浏览器控制台中的错误信息
3. Supabase Dashboard → Logs → Auth Logs 中的相关日志

