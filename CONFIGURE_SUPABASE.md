# 配置 Supabase Google 登录 - 快速指南

## 📋 配置步骤

### 步骤 1: 创建 Supabase 项目

1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 点击 **"New Project"** 创建新项目
3. 填写项目信息：
   - **Name**: 项目名称（例如：Nano Banana）
   - **Database Password**: 设置数据库密码（记住这个密码）
   - **Region**: 选择离您最近的区域
4. 点击 **"Create new project"** 等待项目创建完成（约2分钟）

### 步骤 2: 获取 API 密钥

1. 项目创建完成后，进入项目
2. 点击左侧菜单的 **Settings**（设置图标）
3. 选择 **API**
4. 在 **Project API keys** 部分，找到：
   - **Project URL** - 复制这个 URL（格式：`https://xxxxx.supabase.co`）
   - **anon public** key - 复制这个密钥（这是 `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`）

### 步骤 3: 配置 Google OAuth

#### 3.1 在 Google Cloud Console 设置

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 Google+ API：
   - 点击左侧菜单 **"API 和服务"** > **"库"**
   - 搜索 **"Google+ API"** 或 **"Google Identity"**
   - 点击 **"启用"**
4. 创建 OAuth 2.0 凭据：
   - 点击 **"API 和服务"** > **"凭据"**
   - 点击 **"+ 创建凭据"** > **"OAuth 2.0 客户端 ID"**
   - 如果提示配置同意屏幕：
     - 选择 **"外部"**
     - 填写应用名称、用户支持邮箱等
     - 点击 **"保存并继续"** 完成配置
   - 应用类型选择 **"Web 应用"**
   - 名称：输入您的应用名称
   - **已授权的 JavaScript 来源**：
     ```
     http://localhost:3000
     ```
   - **已授权的重定向 URI**：
     ```
     https://your-project-ref.supabase.co/auth/v1/callback
     ```
     ⚠️ **重要**：`your-project-ref` 需要替换为您的 Supabase 项目引用ID（在 Supabase Dashboard 的 URL 中可以找到）

5. 创建后，复制：
   - **客户端 ID**
   - **客户端密钥**

#### 3.2 在 Supabase 中配置 Google 提供商

1. 回到 Supabase Dashboard
2. 点击左侧菜单 **Authentication**（认证）
3. 选择 **Providers**（提供商）
4. 找到 **Google** 提供商，点击启用
5. 输入从 Google Cloud Console 获取的：
   - **Client ID (for OAuth)**: 粘贴客户端 ID
   - **Client Secret (for OAuth)**: 粘贴客户端密钥
6. 点击 **"Save"**（保存）

### 步骤 4: 更新环境变量

编辑项目根目录下的 `.env.local` 文件，将以下占位符替换为实际值：

```env
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXItcHJvamVjdC1pZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjE2MjM5MDIyfQ.your-actual-key-here

# 站点 URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**重要提示**：
- 将 `your-project-id` 替换为您的 Supabase 项目 ID
- 将 `your-actual-key-here` 替换为实际的 anon public key

### 步骤 5: 重启开发服务器

1. 停止当前运行的开发服务器（在终端按 `Ctrl+C`）
2. 重新启动：
   ```bash
   npm run dev
   ```

### 步骤 6: 测试登录功能

1. 刷新浏览器页面
2. 右上角的按钮应该变为 **"使用 Google 登录"**
3. 点击按钮，应该会跳转到 Google 登录页面
4. 登录成功后，会显示您的用户头像和下拉菜单

## ✅ 配置完成检查清单

- [ ] Supabase 项目已创建
- [ ] 已复制 Project URL 和 anon public key
- [ ] Google Cloud Console 项目已创建
- [ ] Google+ API 已启用
- [ ] OAuth 2.0 凭据已创建
- [ ] 重定向 URI 已配置（包含 Supabase 回调 URL）
- [ ] Supabase 中 Google 提供商已启用并配置
- [ ] `.env.local` 文件已更新
- [ ] 开发服务器已重启

## 🐛 常见问题

### 问题 1: 重定向 URI 不匹配
**错误**: "redirect_uri_mismatch"
**解决**: 确保 Google Cloud Console 中的重定向 URI 与 Supabase 回调 URL 完全一致

### 问题 2: API 密钥无效
**错误**: "Invalid API key"
**解决**: 检查 `.env.local` 中的密钥是否正确，确保没有多余的空格

### 问题 3: 按钮仍然显示"登录（可选）"
**解决**: 
- 确认 `.env.local` 文件已保存
- 确认环境变量值不是占位符
- 重启开发服务器

## 📚 相关链接

- [Supabase Dashboard](https://supabase.com/dashboard)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Supabase 认证文档](https://supabase.com/docs/guides/auth)
- [Google OAuth 文档](https://developers.google.com/identity/protocols/oauth2)

