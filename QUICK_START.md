# 快速开始 - Supabase Google 登录配置

## ⚠️ 当前错误
您需要配置 Supabase 环境变量才能使用 Google 登录功能。

## 📝 步骤 1: 配置环境变量

### 1.1 获取 Supabase 配置值

1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 登录或注册账号
3. 创建新项目或选择现有项目
4. 进入 **Settings** (设置) > **API**
5. 复制以下值：
   - **Project URL** → 复制到 `NEXT_PUBLIC_SUPABASE_URL`
   - **Publishable key** → 复制到 `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

### 1.2 编辑 .env.local 文件

打开项目根目录下的 `.env.local` 文件，将占位符替换为实际值：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**重要提示：**
- 不要提交 `.env.local` 文件到 Git（已在 `.gitignore` 中）
- `NEXT_PUBLIC_SITE_URL` 在开发环境保持 `http://localhost:3000`

## 📝 步骤 2: 配置 Google OAuth

### 2.1 在 Google Cloud Console 中设置

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 **Google+ API**：
   - 进入 **API 和服务** > **库**
   - 搜索 "Google+ API" 并启用
4. 创建 OAuth 2.0 凭据：
   - 进入 **API 和服务** > **凭据**
   - 点击 **创建凭据** > **OAuth 2.0 客户端 ID**
   - 如果提示配置同意屏幕，请完成配置
   - 应用类型选择 **Web 应用**
   - 配置以下内容：
     - **名称**: 您的应用名称
     - **已授权的 JavaScript 来源**: 
       - `http://localhost:3000` (开发环境)
     - **已授权的重定向 URI**: 
       - 需要先获取 Supabase 回调 URL（见下一步）

### 2.2 获取 Supabase 回调 URL

1. 在 Supabase Dashboard 中，进入 **Authentication** > **URL Configuration**
2. 复制 **Site URL** 下方的回调 URL，格式类似：
   ```
   https://your-project-ref.supabase.co/auth/v1/callback
   ```
3. 将这个 URL 添加到 Google Cloud Console 的 **已授权的重定向 URI** 中

### 2.3 在 Supabase 中启用 Google 提供商

1. 在 Supabase Dashboard 中，进入 **Authentication** > **Providers**
2. 找到 **Google** 提供商
3. 点击 **启用**
4. 输入从 Google Cloud Console 获取的：
   - **Client ID (for OAuth)**: 从 Google Cloud Console 复制的客户端 ID
   - **Client Secret (for OAuth)**: 从 Google Cloud Console 复制的客户端密钥
5. 点击 **保存**

## ✅ 步骤 3: 重启开发服务器

配置完成后，重启开发服务器：

```bash
# 停止当前服务器 (Ctrl+C)
# 然后重新启动
npm run dev
```

## 🎉 完成！

配置完成后，您应该能够：
- 看到 Header 中的 "使用 Google 登录" 按钮
- 点击按钮后跳转到 Google 登录页面
- 登录成功后显示用户头像和下拉菜单

## 🔍 故障排除

### 问题：仍然显示环境变量错误
- 确保 `.env.local` 文件在项目根目录
- 确保环境变量名称正确（注意大小写）
- 重启开发服务器

### 问题：Google 登录失败
- 检查 Google Cloud Console 中的重定向 URI 是否正确
- 确保 Google+ API 已启用
- 检查 Supabase Dashboard 中的 Google 提供商配置

### 问题：回调后出现错误
- 检查 `NEXT_PUBLIC_SITE_URL` 是否正确
- 确保 Supabase 中的 Site URL 配置正确

## 📚 更多信息

详细配置说明请参考 `SUPABASE_SETUP.md` 文件。

