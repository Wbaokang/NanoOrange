# 核心功能说明

## ✅ 已实现的功能

### 1. 图片上传功能
- ✅ 用户点击上传区域可以上传图片
- ✅ 支持拖拽上传
- ✅ 文件大小限制：10MB
- ✅ 支持所有图片格式（image/*）
- ✅ 上传后立即预览

### 2. 图片生成功能
- ✅ 用户上传图片后，在 "Main Prompt" 中输入提示词
- ✅ 点击 "Generate Now" 按钮触发生成
- ✅ 将图片和提示词发送到 Gemini 2.5 Flash Image API
- ✅ 在 "Output Gallery" 区域显示生成的图片
- ✅ 支持下载生成的图片

### 3. API 集成
- ✅ 使用 OpenRouter API 调用 Gemini 2.5 Flash Image
- ✅ API Key 存储在 `.env.local` 文件中
- ✅ 服务器端 API 路由处理图片生成请求
- ✅ 错误处理和用户友好的错误提示

## 📁 文件结构

```
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # API 路由处理图片生成
│   └── layout.tsx                 # 已添加 Toaster 组件
├── components/
│   └── editor.tsx                 # 编辑器组件（已更新）
├── .env.local                     # 环境变量（包含 OpenRouter API Key）
└── FEATURES.md                    # 本文件
```

## 🔧 配置说明

### 环境变量

`.env.local` 文件应包含：

```env
# OpenRouter API Key
OPENROUTER_API_KEY=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

# Supabase 配置（可选）
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🚀 使用方法

1. **上传图片**
   - 点击上传区域或拖拽图片文件
   - 图片会自动预览

2. **输入提示词**
   - 在 "Main Prompt" 文本框中输入您想要的编辑描述
   - 例如："place the person in a snowy mountain landscape"

3. **生成图片**
   - 点击 "Generate Now" 按钮
   - 等待生成完成（会显示加载状态）
   - 生成的图片会显示在 "Output Gallery" 区域

4. **下载图片**
   - 鼠标悬停在生成的图片上
   - 点击 "下载" 按钮保存图片

## 🎨 UI 特性

- ✅ 响应式设计，支持移动端和桌面端
- ✅ 加载状态指示器
- ✅ Toast 通知提示（成功/错误/警告）
- ✅ 图片预览和下载功能
- ✅ 禁用状态管理（未上传图片或未输入提示词时按钮禁用）

## 🔍 API 响应处理

API 路由会处理以下响应格式：
- 图片 URL（HTTP/HTTPS）
- Base64 编码的图片
- JSON 格式的响应
- 文本响应

## ⚠️ 注意事项

1. **API Key 安全**
   - 不要将 `.env.local` 文件提交到 Git
   - API Key 已添加到 `.gitignore`

2. **文件大小限制**
   - 上传的图片不能超过 10MB
   - 超过限制会显示错误提示

3. **网络请求**
   - 生成图片需要网络连接
   - 如果 API 调用失败，会显示错误提示

## 🐛 故障排除

### 问题：生成按钮无法点击
- 确保已上传图片
- 确保已输入提示词

### 问题：生成失败
- 检查 `.env.local` 文件中的 API Key 是否正确
- 检查网络连接
- 查看浏览器控制台的错误信息

### 问题：图片不显示
- 检查 API 返回的响应格式
- 查看浏览器控制台的网络请求

## 📚 相关文档

- [OpenRouter API 文档](https://openrouter.ai/google/gemini-22.5-flash-image/api)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

