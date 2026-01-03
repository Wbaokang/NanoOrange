# 配置 Supabase 自定义域名

## 🎯 目标

将 Google 登录页面显示的 "继续前往 hwzbhkhqbwjnswnyhvgi.supabase.co" 替换为您的自定义域名。

## 📋 配置步骤

### 步骤 1: 在 Supabase 中配置自定义域名

1. **访问 Supabase Dashboard**
   - 登录：https://supabase.com/dashboard
   - 选择您的项目

2. **进入 Authentication 设置**
   - 点击左侧菜单 **Authentication**
   - 选择 **URL Configuration**

3. **配置 Site URL**
   - 找到 **Site URL** 字段
   - 输入您的域名（例如：`https://yourdomain.com`）
   - 点击 **Save**

4. **配置 Redirect URLs（重定向 URL）**
   - 在 **Redirect URLs** 部分
   - 添加您的域名回调 URL：
     ```
     https://yourdomain.com/auth/callback
     ```
   - 如果需要支持多个环境，可以添加：
     ```
     https://yourdomain.com/auth/callback
     http://localhost:3000/auth/callback  (开发环境)
     ```
   - 点击 **Save**

### 步骤 2: 更新环境变量

更新 `.env.local` 文件中的 `NEXT_PUBLIC_SITE_URL`：

```env
# 生产环境
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# 或者开发环境
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 步骤 3: 更新 OAuth 回调配置

在 `app/actions/auth.ts` 中，确保回调 URL 使用环境变量：

```typescript
redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`
```

### 步骤 4: 更新 Google Cloud Console 配置

1. **访问 Google Cloud Console**
   - 进入：https://console.cloud.google.com/
   - 选择您的项目

2. **更新 OAuth 2.0 凭据**
   - 进入 **API 和服务** > **凭据**
   - 找到您的 OAuth 2.0 客户端 ID
   - 点击编辑

3. **更新已授权的重定向 URI**
   - 添加您的域名回调 URL：
     ```
     https://yourdomain.com/auth/callback
     ```
   - 保留 Supabase 的回调 URL（如果需要）：
     ```
     https://hwzbhkhqbwjnswnyhvgi.supabase.co/auth/v1/callback
     ```
   - 点击 **保存**

## 🔍 配置位置说明

### Supabase Dashboard 中的位置：

```
Authentication > URL Configuration

Site URL:
┌─────────────────────────────────────┐
│ https://yourdomain.com              │  ← 您的域名
└─────────────────────────────────────┘

Redirect URLs:
┌─────────────────────────────────────┐
│ https://yourdomain.com/auth/callback│  ← 添加这个
│ http://localhost:3000/auth/callback │  ← 开发环境（可选）
└─────────────────────────────────────┘
```

## ⚠️ 重要提示

1. **域名格式**
   - ✅ 必须包含协议：`https://yourdomain.com`
   - ✅ 生产环境必须使用 HTTPS
   - ❌ 不要包含尾部斜杠

2. **DNS 配置**
   - 确保您的域名已正确配置 DNS
   - 如果使用 Vercel/Netlify 等平台，域名会自动配置

3. **SSL 证书**
   - 生产环境必须使用 HTTPS
   - 大多数部署平台（Vercel、Netlify）会自动提供 SSL

4. **测试**
   - 配置后，Google 登录页面应该显示您的域名
   - 登录成功后应该重定向到您的网站

## 📝 完整配置示例

### .env.local（生产环境）
```env
NEXT_PUBLIC_SUPABASE_URL=https://hwzbhkhqbwjnswnyhvgi.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_key_here
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### .env.local（开发环境）
```env
NEXT_PUBLIC_SUPABASE_URL=https://hwzbhkhqbwjnswnyhvgi.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🔗 相关链接

- **Supabase URL Configuration**: https://supabase.com/dashboard/project/hwzbhkhqbwjnswnyhvgi/auth/url-configuration
- **Google Cloud Console**: https://console.cloud.google.com/

## ✅ 验证配置

配置完成后：

1. **检查 Google 登录页面**
   - 点击登录按钮
   - 应该显示 "继续前往 yourdomain.com" 而不是 "hwzbhkhqbwjnswnyhvgi.supabase.co"

2. **测试登录流程**
   - 完成 Google 登录
   - 应该重定向回您的网站
   - 应该显示用户信息

## 💡 提示

- 如果仍然显示 Supabase 域名，检查 `NEXT_PUBLIC_SITE_URL` 是否正确
- 确保在 Supabase Dashboard 中保存了配置
- 清除浏览器缓存后重试

