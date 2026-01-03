# ⚠️ 关键配置：修复 "requested path is invalid" 错误

## 🔴 问题分析

从错误信息看，Google 登录后重定向到了：
```
hwzbhkhqbwjnswnyhvgi.supabase.co/?code=42e3e272-e2a6-45c6-81cf-3b5bbc75e111
```

这说明：
1. ✅ Google 登录成功
2. ✅ Google 重定向到 Supabase 成功
3. ❌ **Supabase 无法重定向到您的应用**（因为 Redirect URLs 未配置）

## 🔧 必须配置的步骤

### 步骤 1: 在 Supabase Dashboard 中配置 Redirect URLs（最关键！）

**这是导致错误的根本原因！**

1. **访问 Supabase URL Configuration**
   - 直接打开：https://supabase.com/dashboard/project/hwzbhkhqbwjnswnyhvgi/auth/url-configuration
   - 或：项目 → Authentication → URL Configuration

2. **配置 Site URL**
   ```
   Site URL: https://www.zenoai.online
   ```
   ⚠️ **不要**末尾斜杠

3. **配置 Redirect URLs（必须添加！）**
   - 找到 **"Redirect URLs"** 部分
   - 点击 **"Add URL"** 或 **"+"** 按钮
   - 添加以下 URL：
     ```
     https://www.zenoai.online/auth/callback
     ```
   - **重要**：必须包含 `/auth/callback` 路径
   - 点击 **"Save"** 保存

4. **如果需要支持开发环境**，也可以添加：
   ```
   http://localhost:3000/auth/callback
   ```

### 步骤 2: 验证环境变量

确保 `.env.local` 文件中的配置正确：

```env
NEXT_PUBLIC_SITE_URL=https://www.zenoai.online
```

⚠️ **不要**末尾斜杠！

### 步骤 3: 验证 Google Cloud Console 配置

1. **访问 Google Cloud Console**
   - https://console.cloud.google.com/

2. **检查 OAuth 2.0 凭据**
   - 进入 **API 和服务** > **凭据**
   - 找到您的 OAuth 2.0 客户端 ID
   - 点击编辑

3. **检查已授权的重定向 URI**
   - 应该**只包含**：
     ```
     https://hwzbhkhqbwjnswnyhvgi.supabase.co/auth/v1/callback
     ```
   - **不要**添加 `https://www.zenoai.online/auth/callback` 到这里
   - Google Cloud Console 只需要 Supabase 的回调 URL

## 📊 OAuth 流程说明

```
1. 用户点击"使用 Google 登录"
   ↓
2. 应用调用 signInWithGoogle()
   redirectTo: https://www.zenoai.online/auth/callback
   ↓
3. 重定向到 Google 登录页面
   ↓
4. 用户点击"Continue"
   ↓
5. Google 验证后重定向到 Supabase
   https://hwzbhkhqbwjnswnyhvgi.supabase.co/auth/v1/callback?code=xxx
   ↓
6. Supabase 处理登录，然后重定向到您的应用
   https://www.zenoai.online/auth/callback?code=xxx  ← 这个必须在 Supabase Dashboard 中配置！
   ↓
7. 应用处理回调，显示用户信息
```

## ⚠️ 关键点

### 为什么会出现 "requested path is invalid"？

当 Supabase 尝试重定向到 `https://www.zenoai.online/auth/callback` 时，如果这个 URL **没有**在 Supabase Dashboard 的 Redirect URLs 列表中，Supabase 会拒绝重定向，并返回错误。

### 配置位置总结

| 配置项 | 位置 | 值 |
|--------|------|-----|
| **Site URL** | Supabase Dashboard | `https://www.zenoai.online` |
| **Redirect URLs** | Supabase Dashboard | `https://www.zenoai.online/auth/callback` ← **必须添加！** |
| **重定向 URI** | Google Cloud Console | `https://hwzbhkhqbwjnswnyhvgi.supabase.co/auth/v1/callback` |
| **NEXT_PUBLIC_SITE_URL** | .env.local | `https://www.zenoai.online` |

## ✅ 配置检查清单

- [ ] Supabase Dashboard 中的 **Site URL** 已设置为 `https://www.zenoai.online`
- [ ] Supabase Dashboard 中的 **Redirect URLs** 已添加 `https://www.zenoai.online/auth/callback`
- [ ] `.env.local` 中的 `NEXT_PUBLIC_SITE_URL` 没有末尾斜杠
- [ ] Google Cloud Console 中的重定向 URI 只包含 Supabase 回调 URL
- [ ] 已重启开发服务器

## 🔗 快速链接

- **Supabase URL Configuration**: https://supabase.com/dashboard/project/hwzbhkhqbwjnswnyhvgi/auth/url-configuration
- **Google Cloud Console**: https://console.cloud.google.com/

## 💡 提示

配置完成后，**必须重启开发服务器**才能生效！

```bash
# 停止服务器 (Ctrl+C)
npm run dev
```

