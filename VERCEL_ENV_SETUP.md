# Vercel 环境变量配置指南

## 🎯 目标

在 Vercel 部署平台配置项目所需的环境变量。

## 📋 详细步骤

### 步骤 1: 登录 Vercel

1. 访问：https://vercel.com
2. 使用 GitHub 账号登录（推荐，因为您的代码在 GitHub 上）

### 步骤 2: 导入项目

如果项目还未部署：

1. 点击 **"Add New..."** → **"Project"**
2. 选择 **"Import Git Repository"**
3. 找到并选择 `Wbaokang/NanoOrange` 仓库
4. 点击 **"Import"**

### 步骤 3: 进入环境变量配置页面

**方法 A（部署前配置）**：
- 在导入项目时，会显示 **"Configure Project"** 页面
- 向下滚动找到 **"Environment Variables"** 部分

**方法 B（已部署项目）**：
1. 在 Vercel Dashboard 中选择您的项目
2. 点击顶部菜单的 **"Settings"**
3. 在左侧菜单中找到 **"Environment Variables"**
4. 或直接访问：`https://vercel.com/[your-username]/[project-name]/settings/environment-variables`

### 步骤 4: 添加环境变量

在 Environment Variables 页面，您会看到：

```
Environment Variables

┌─────────────────────────────────────────────────────────┐
│ Key                      Value        Environment  Actions│
├─────────────────────────────────────────────────────────┤
│                                                          │
│ [Empty - Click "Add New" to add variables]              │
│                                                          │
└─────────────────────────────────────────────────────────┘

[+ Add New]
```

#### 添加第一个变量：NEXT_PUBLIC_SUPABASE_URL

1. 点击 **"+ Add New"** 按钮
2. 在弹出的对话框中：
   - **Key**: 输入 `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: 输入您的 Supabase URL（例如：`https://hwzbhkhqbwjnswnyhvgi.supabase.co`）
   - **Environment**: 选择环境
     - ✅ **Production** - 生产环境
     - ✅ **Preview** - 预览环境（可选）
     - ✅ **Development** - 开发环境（可选）
3. 点击 **"Save"**

#### 添加第二个变量：NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

1. 再次点击 **"+ Add New"**
2. 填写：
   - **Key**: `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - **Value**: 您的 Supabase anon public key（从 Supabase Dashboard 获取）
   - **Environment**: 选择 Production、Preview、Development
3. 点击 **"Save"**

#### 添加第三个变量：NEXT_PUBLIC_SITE_URL

1. 点击 **"+ Add New"**
2. 填写：
   - **Key**: `NEXT_PUBLIC_SITE_URL`
   - **Value**: 
     - 生产环境：`https://yourdomain.com`（您的实际域名）
     - 预览环境：`https://your-project.vercel.app`（Vercel 分配的域名）
   - **Environment**: 选择对应的环境
3. 点击 **"Save"**

#### 添加第四个变量：OPENROUTER_API_KEY

1. 点击 **"+ Add New"**
2. 填写：
   - **Key**: `OPENROUTER_API_KEY`
   - **Value**: 您的 OpenRouter API 密钥（格式：`sk-or-v1-xxx`）
   - **Environment**: 选择 Production、Preview、Development
3. 点击 **"Save"**

### 步骤 5: 验证配置

配置完成后，您应该看到类似这样的列表：

```
Environment Variables

┌──────────────────────────────────────────────────────────────┐
│ Key                              Value        Environment     │
├──────────────────────────────────────────────────────────────┤
│ NEXT_PUBLIC_SUPABASE_URL         https://xxx.supabase.co    │
│                                  Production, Preview          │
├──────────────────────────────────────────────────────────────┤
│ NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY  eyJhbGciOi...         │
│                                  Production, Preview          │
├──────────────────────────────────────────────────────────────┤
│ NEXT_PUBLIC_SITE_URL             https://yourdomain.com       │
│                                  Production                   │
├──────────────────────────────────────────────────────────────┤
│ OPENROUTER_API_KEY              sk-or-v1-xxx                │
│                                  Production, Preview          │
└──────────────────────────────────────────────────────────────┘
```

### 步骤 6: 部署项目

1. 如果是在导入时配置，点击 **"Deploy"**
2. 如果项目已存在，环境变量会在下次部署时自动应用
3. 可以点击 **"Deployments"** → **"Redeploy"** 触发重新部署

## 🔍 环境变量详细说明

### 环境选择说明

- **Production**：生产环境（正式域名）
- **Preview**：预览环境（每次 Pull Request 或分支推送）
- **Development**：开发环境（本地开发，通常不需要在 Vercel 配置）

### 推荐配置

| 变量名 | Production | Preview | Development |
|--------|-----------|---------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | ✅ | ❌ |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | ✅ | ✅ | ❌ |
| `NEXT_PUBLIC_SITE_URL` | ✅ | ✅ | ❌ |
| `OPENROUTER_API_KEY` | ✅ | ✅ | ❌ |

**说明**：
- Production 和 Preview 通常使用相同的值
- Development 环境使用本地的 `.env.local` 文件

## 📝 配置示例

### Production 环境示例

```env
NEXT_PUBLIC_SUPABASE_URL=https://hwzbhkhqbwjnswnyhvgi.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
OPENROUTER_API_KEY=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
```

### Preview 环境示例

```env
NEXT_PUBLIC_SUPABASE_URL=https://hwzbhkhqbwjnswnyhvgi.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
OPENROUTER_API_KEY=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
```

## 🔒 安全提示

1. **不要暴露敏感信息**
   - API 密钥不要提交到代码仓库
   - 使用 Vercel 的环境变量功能

2. **定期更新密钥**
   - 定期轮换 API 密钥
   - 如果密钥泄露，立即更新

3. **环境隔离**
   - 生产环境和预览环境可以使用不同的密钥
   - 测试时使用预览环境

## ✅ 验证配置

### 部署后验证

1. **检查部署日志**
   - 在 Vercel Dashboard 中查看部署日志
   - 确认没有环境变量相关的错误

2. **测试功能**
   - 访问部署的网站
   - 测试 Google 登录功能
   - 测试图片生成功能

3. **检查环境变量**
   - 在浏览器控制台运行：`console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)`
   - 应该能看到配置的值（注意：只有 `NEXT_PUBLIC_*` 前缀的变量可以在客户端访问）

## 🐛 常见问题

### 问题 1: 环境变量不生效

**解决方案**：
- 确保变量名正确（注意大小写）
- 重新部署项目
- 检查环境变量是否选择了正确的环境

### 问题 2: 找不到环境变量配置页面

**解决方案**：
- 确保项目已导入到 Vercel
- 使用 Settings → Environment Variables 路径
- 确保有项目访问权限

### 问题 3: 部署后功能不工作

**解决方案**：
- 检查环境变量是否正确配置
- 查看部署日志中的错误信息
- 确认所有必需的环境变量都已添加

## 🔗 快速链接

- **Vercel Dashboard**: https://vercel.com/dashboard
- **环境变量配置**: `https://vercel.com/[username]/[project]/settings/environment-variables`
- **部署页面**: `https://vercel.com/[username]/[project]/deployments`

## 💡 提示

- 配置环境变量后，Vercel 会自动触发重新部署
- 可以随时编辑或删除环境变量
- 环境变量是加密存储的，只有项目成员可以查看

