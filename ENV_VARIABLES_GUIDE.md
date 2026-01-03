# 环境变量配置路径指南

## 📁 本地开发环境

### 文件位置

项目根目录下的 `.env.local` 文件：

```
E:\AI_Code\website-clone-with-next-js\.env.local
```

或者相对路径：
```
./.env.local
```

### 文件内容格式

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://hwzbhkhqbwjnswnyhvgi.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key

# Site URL (for OAuth callback)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# OpenRouter API Key (for Gemini 2.5 Flash Image)
OPENROUTER_API_KEY=sk-or-v1-your-api-key-here
```

### 如何编辑

1. **使用代码编辑器**
   - 在项目根目录找到 `.env.local` 文件
   - 使用 VS Code、Notepad++ 等编辑器打开
   - 修改对应的值
   - 保存文件

2. **使用命令行**
   ```bash
   # Windows PowerShell
   notepad .env.local
   
   # 或者使用 VS Code
   code .env.local
   ```

## 🌐 生产环境配置

### Vercel 部署

1. **访问 Vercel Dashboard**
   - 登录：https://vercel.com/dashboard
   - 选择您的项目

2. **配置环境变量路径**
   - 项目 → **Settings** → **Environment Variables**
   - 或直接访问：`https://vercel.com/[your-username]/[project-name]/settings/environment-variables`

3. **添加环境变量**
   - 点击 **Add New**
   - 输入变量名和值
   - 选择环境（Production、Preview、Development）
   - 点击 **Save**

4. **需要配置的变量**
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
   NEXT_PUBLIC_SITE_URL
   OPENROUTER_API_KEY
   ```

### Netlify 部署

1. **访问 Netlify Dashboard**
   - 登录：https://app.netlify.com
   - 选择您的站点

2. **配置环境变量路径**
   - 站点 → **Site settings** → **Environment variables**
   - 或直接访问：`https://app.netlify.com/sites/[site-name]/configuration/env`

3. **添加环境变量**
   - 点击 **Add a variable**
   - 输入变量名和值
   - 选择作用域（All scopes、Production、Deploy previews、Branch deploys）
   - 点击 **Save**

### Railway 部署

1. **访问 Railway Dashboard**
   - 登录：https://railway.app
   - 选择您的项目

2. **配置环境变量路径**
   - 项目 → **Variables** 标签
   - 或点击项目设置中的 **Variables**

3. **添加环境变量**
   - 点击 **New Variable**
   - 输入变量名和值
   - 点击 **Add**

### 其他平台

大多数平台的环境变量配置位置：
- **Settings** → **Environment Variables**
- **Configuration** → **Environment**
- **Secrets** 或 **Config**

## 📝 环境变量列表

### 必需的环境变量

| 变量名 | 说明 | 示例值 |
|--------|------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase 公钥 | `eyJhbGciOi...` |
| `NEXT_PUBLIC_SITE_URL` | 站点 URL | `https://yourdomain.com` |
| `OPENROUTER_API_KEY` | OpenRouter API 密钥 | `sk-or-v1-xxx` |

### 环境变量说明

1. **NEXT_PUBLIC_* 前缀**
   - 这些变量会被暴露到客户端
   - 可以在浏览器中访问
   - 不要包含敏感信息

2. **不带 NEXT_PUBLIC_ 前缀**
   - 仅在服务器端可用
   - 更安全，适合存储 API 密钥

## 🔒 安全提示

1. **不要提交 `.env.local` 到 Git**
   - 文件已在 `.gitignore` 中
   - 确保不会意外提交

2. **生产环境使用平台的环境变量功能**
   - 不要在代码中硬编码
   - 使用平台提供的环境变量管理

3. **定期轮换密钥**
   - 定期更新 API 密钥
   - 如果密钥泄露，立即更换

## ✅ 验证配置

### 本地开发

1. 检查 `.env.local` 文件是否存在
2. 确认所有变量都已配置
3. 重启开发服务器：
   ```bash
   npm run dev
   ```

### 生产环境

1. 在平台 Dashboard 中检查环境变量
2. 重新部署应用
3. 检查应用是否正常运行

## 🔗 快速链接

- **本地文件**: `E:\AI_Code\website-clone-with-next-js\.env.local`
- **Vercel**: https://vercel.com/dashboard
- **Netlify**: https://app.netlify.com
- **Railway**: https://railway.app

## 💡 常见问题

**Q: 环境变量不生效？**
A: 
- 确保变量名正确（注意大小写）
- 重启开发服务器
- 检查 `.env.local` 文件是否在项目根目录

**Q: 如何在生产环境查看环境变量？**
A: 
- Vercel: Settings → Environment Variables
- Netlify: Site settings → Environment variables
- 不要在生产代码中打印环境变量

**Q: 可以同时配置多个环境吗？**
A: 
- 可以，大多数平台支持 Production、Preview、Development 环境
- 为每个环境配置不同的值

