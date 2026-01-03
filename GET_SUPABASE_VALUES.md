# 如何获取 Supabase 配置值 - 详细步骤

## 📍 您的项目信息

- **项目ID**: `hwzbhkhqbwjnswnyhvgi`
- **正确的 Project URL**: `https://hwzbhkhqbwjnswnyhvgi.supabase.co`

## 🔍 获取步骤

### 方法 1: 通过 Supabase Dashboard（推荐）

1. **访问 API 设置页面**
   - 直接打开：https://supabase.com/dashboard/project/hwzbhkhqbwjnswnyhvgi/settings/api
   - 或登录后：项目 → Settings → API

2. **找到 Project URL**
   - 在页面顶部 "Project URL" 部分
   - 应该显示：`https://hwzbhkhqbwjnswnyhvgi.supabase.co`
   - 点击复制按钮复制

3. **找到 anon public key**
   - 向下滚动到 "Project API keys" 部分
   - 找到 **"anon"** 和 **"public"** 标签的密钥
   - 这是 `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - 点击右侧的眼睛图标查看，然后点击复制按钮

### 方法 2: 通过项目概览页面

1. 访问：https://supabase.com/dashboard/project/hwzbhkhqbwjnswnyhvgi
2. 点击左侧菜单的 **Settings**（齿轮图标）
3. 选择 **API**
4. 按照方法 1 的步骤 2 和 3 获取值

## 📝 配置示例

获取到值后，`.env.local` 文件应该类似这样：

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://hwzbhkhqbwjnswnyhvgi.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3emJoa2hxYndqbnN3bnlodmdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIzNDU2NzgsImV4cCI6MjAyNzk0MTY3OH0.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## ⚠️ 重要提示

1. **URL 格式**：
   - ✅ 正确：`https://hwzbhkhqbwjnswnyhvgi.supabase.co`
   - ❌ 错误：`https://supabase.com/dashboard/project/hwzbhkhqbwjnswnyhvgi`

2. **密钥格式**：
   - anon public key 通常以 `eyJ` 开头
   - 是一个很长的字符串（JWT token）

3. **安全提示**：
   - 不要将密钥分享给他人
   - 不要提交 `.env.local` 到 Git（已在 `.gitignore` 中）

## 🔗 快速链接

- **API 设置页面**: https://supabase.com/dashboard/project/hwzbhkhqbwjnswnyhvgi/settings/api
- **项目概览**: https://supabase.com/dashboard/project/hwzbhkhqbwjnswnyhvgi

