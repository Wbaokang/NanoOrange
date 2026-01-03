# 修复 Google 登录 "requested path is invalid" 错误

## 🔴 错误原因

错误 "requested path is invalid" 通常是因为 Supabase Dashboard 中的 **Redirect URLs** 配置不正确。

## 🔍 问题诊断

当前配置：
- `NEXT_PUBLIC_SITE_URL=https://www.zenoai.online/`（注意末尾有斜杠）

## 🔧 修复步骤

### 步骤 1: 修正环境变量（移除末尾斜杠）

编辑 `.env.local` 文件，确保 URL 末尾**没有斜杠**：

```env
NEXT_PUBLIC_SITE_URL=https://www.zenoai.online
```

**不要**写成：
```env
NEXT_PUBLIC_SITE_URL=https://www.zenoai.online/  ❌
```

### 步骤 2: 在 Supabase Dashboard 中配置 Redirect URLs（重要！）

这是**最关键**的步骤！

1. **访问 Supabase Dashboard**
   - https://supabase.com/dashboard/project/hwzbhkhqbwjnswnyhvgi/auth/url-configuration

2. **配置 Site URL**
   - **Site URL**: `https://www.zenoai.online`（不要末尾斜杠）

3. **配置 Redirect URLs**（必须添加！）
   - 点击 **"Add URL"** 或 **"+"** 按钮
   - 添加：`https://www.zenoai.online/auth/callback`
   - **重要**：必须包含 `/auth/callback` 路径
   - 点击 **"Save"**

4. **如果需要支持开发环境**，也可以添加：
   - `http://localhost:3000/auth/callback`

### 步骤 3: 验证 Google Cloud Console 配置

1. **访问 Google Cloud Console**
   - https://console.cloud.google.com/

2. **检查 OAuth 2.0 凭据**
   - 进入 **API 和服务** > **凭据**
   - 找到您的 OAuth 2.0 客户端 ID
   - 点击编辑

3. **检查已授权的重定向 URI**
   - 应该**只包含**：`https://hwzbhkhqbwjnswnyhvgi.supabase.co/auth/v1/callback`
   - **不要**添加 `https://www.zenoai.online/auth/callback` 到这里
   - Google Cloud Console 只需要 Supabase 的回调 URL

### 步骤 4: 重启开发服务器

```bash
# 停止当前服务器 (Ctrl+C)
npm run dev
```

## 📝 正确的 OAuth 流程

```
1. 用户点击登录
   ↓
2. 重定向到 Google
   ↓
3. Google 验证后重定向到 Supabase
   https://hwzbhkhqbwjnswnyhvgi.supabase.co/auth/v1/callback
   ↓
4. Supabase 处理登录，然后重定向到您的应用
   https://www.zenoai.online/auth/callback  ← 这个必须在 Supabase Dashboard 中配置
   ↓
5. 应用处理回调，显示用户信息
```

## ⚠️ 关键配置点

### Supabase Dashboard 配置

**URL Configuration 页面**：
- **Site URL**: `https://www.zenoai.online`
- **Redirect URLs**: 
  ```
  https://www.zenoai.online/auth/callback  ← 必须添加这个！
  ```

### Google Cloud Console 配置

**OAuth 2.0 客户端 ID**：
- **已授权的重定向 URI**: 
  ```
  https://hwzbhkhqbwjnswnyhvgi.supabase.co/auth/v1/callback  ← 只需要这个
  ```

### 环境变量配置

**.env.local**：
```env
NEXT_PUBLIC_SITE_URL=https://www.zenoai.online  ← 不要末尾斜杠
```

## 🐛 常见错误

### 错误 1: Supabase Redirect URLs 未配置
```
❌ 没有在 Supabase Dashboard 中添加 https://www.zenoai.online/auth/callback
✅ 必须在 Supabase Dashboard > Authentication > URL Configuration 中添加
```

### 错误 2: URL 末尾有斜杠
```
❌ NEXT_PUBLIC_SITE_URL=https://www.zenoai.online/
✅ NEXT_PUBLIC_SITE_URL=https://www.zenoai.online
```

### 错误 3: 在 Google Cloud Console 中添加了错误的 URL
```
❌ 在 Google Cloud Console 中添加了 https://www.zenoai.online/auth/callback
✅ Google Cloud Console 只需要 Supabase 的回调 URL
✅ 应用的回调 URL 应该在 Supabase Dashboard 中配置
```

## ✅ 检查清单

- [ ] `.env.local` 中的 `NEXT_PUBLIC_SITE_URL` 没有末尾斜杠
- [ ] Supabase Dashboard 中的 Site URL 已设置为 `https://www.zenoai.online`
- [ ] Supabase Dashboard 中的 Redirect URLs 已添加 `https://www.zenoai.online/auth/callback`
- [ ] Google Cloud Console 中的重定向 URI 只包含 Supabase 回调 URL
- [ ] 已重启开发服务器

## 🔗 快速链接

- **Supabase URL Configuration**: https://supabase.com/dashboard/project/hwzbhkhqbwjnswnyhvgi/auth/url-configuration
- **Google Cloud Console**: https://console.cloud.google.com/

