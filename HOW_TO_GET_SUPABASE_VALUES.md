# 如何获取 Supabase 配置值 - 图文步骤

## 🎯 需要获取的两个值

1. **NEXT_PUBLIC_SUPABASE_URL** - Project URL
2. **NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY** - anon public key

## 📋 详细步骤

### 步骤 1: 登录 Supabase Dashboard

1. 访问：https://supabase.com/dashboard
2. 使用您的账号登录

### 步骤 2: 进入项目设置

**方法 A（直接链接）**：
- 访问：https://supabase.com/dashboard/project/hwzbhkhqbwjnswnyhvgi/settings/api
- 替换 `hwzbhkhqbwjnswnyhvgi` 为您的实际项目ID

**方法 B（通过界面）**：
1. 在 Dashboard 中选择您的项目
2. 点击左侧菜单的 **Settings**（⚙️ 齿轮图标）
3. 在 Settings 子菜单中点击 **API**

### 步骤 3: 获取 Project URL

在 API Settings 页面的顶部，您会看到：

```
Project URL
https://hwzbhkhqbwjnswnyhvgi.supabase.co
[复制图标]
```

- 点击 **复制图标** 复制这个 URL
- 这就是 `NEXT_PUBLIC_SUPABASE_URL` 的值
- ⚠️ 格式应该是：`https://你的项目ID.supabase.co`

### 步骤 4: 获取 anon public key

向下滚动到 **"Project API keys"** 部分，您会看到多个密钥：

```
Project API keys

┌─────────────────────────────────────────────────────────┐
│ anon                                                    │
│ public                                                  │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...                │
│ [眼睛图标] [复制图标]                                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ service_role                                            │
│ secret                                                  │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...                │
│ [眼睛图标] [复制图标]                                    │
└─────────────────────────────────────────────────────────┘
```

**找到标有 "anon" 和 "public" 的密钥**：
1. 点击 **眼睛图标** 👁️ 显示完整密钥（如果被隐藏）
2. 点击 **复制图标** 📋 复制密钥
3. 这就是 `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` 的值

⚠️ **重要**：使用 **anon public** 密钥，**不要**使用 service_role secret 密钥！

## 📝 配置示例

获取到值后，您的 `.env.local` 文件应该类似这样：

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://hwzbhkhqbwjnswnyhvgi.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3emJoa2hxYndqbnN3bnlodmdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIzNDU2NzgsImV4cCI6MjAyNzk0MTY3OH0.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🔍 如何识别正确的值

### Project URL 特征：
- ✅ 格式：`https://xxxxx.supabase.co`
- ✅ 以 `https://` 开头
- ✅ 以 `.supabase.co` 结尾
- ❌ 不是：`https://supabase.com/dashboard/...`

### anon public key 特征：
- ✅ 以 `eyJ` 开头（JWT token）
- ✅ 标签显示 "anon" 和 "public"
- ✅ 很长的一串字符（通常 200+ 字符）
- ❌ 不是：service_role secret key

## 🚨 常见错误

### 错误 1: URL 格式错误
```
❌ 错误：https://supabase.com/dashboard/project/xxx
✅ 正确：https://xxx.supabase.co
```

### 错误 2: 使用了错误的密钥
```
❌ 错误：使用 service_role secret key
✅ 正确：使用 anon public key
```

### 错误 3: 密钥不完整
- 确保复制了完整的密钥（点击眼睛图标查看）
- 密钥应该很长，通常包含多个点号（.）

## 🔗 快速链接

根据您的项目ID，直接访问：
- **API 设置页面**: https://supabase.com/dashboard/project/hwzbhkhqbwjnswnyhvgi/settings/api

## ✅ 验证配置

配置完成后，重启开发服务器：
```bash
npm run dev
```

如果配置正确，右上角的按钮应该从"登录（可选）"变为"使用 Google 登录"。

## 💡 提示

- 如果找不到这些值，确保您有项目的访问权限
- 密钥是敏感信息，不要分享给他人
- `.env.local` 文件已在 `.gitignore` 中，不会被提交到 Git

