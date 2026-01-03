# API 密钥问题排查指南

## 🔴 错误：403 Key limit exceeded

### 问题描述
当您看到 "403 Key limit exceeded (total limit)" 错误时，表示您的 OpenRouter API 密钥已达到使用限制。

### 解决方案

#### 1. 检查 API 密钥状态
访问 [OpenRouter 密钥管理页面](https://openrouter.ai/settings/keys) 查看：
- API 密钥的使用情况
- 当前的使用限制
- 剩余配额

#### 2. 可能的解决方案

**方案 A：升级账户**
- 如果使用的是免费账户，考虑升级到付费计划
- 付费计划通常有更高的使用限制

**方案 B：创建新的 API 密钥**
- 在 OpenRouter 设置中创建新的 API 密钥
- 更新 `.env.local` 文件中的 `OPENROUTER_API_KEY`

**方案 C：等待限制重置**
- 某些限制可能是按天或按月重置的
- 检查您的账户限制重置时间

#### 3. 更新 API 密钥

1. 访问 [OpenRouter 密钥管理](https://openrouter.ai/settings/keys)
2. 创建新的 API 密钥或复制现有密钥
3. 更新 `.env.local` 文件：
   ```env
   OPENROUTER_API_KEY=your_new_api_key_here
   ```
4. 重启开发服务器：
   ```bash
   # 停止当前服务器 (Ctrl+C)
   npm run dev
   ```

## 🔴 错误：401 Unauthorized / Invalid API key

### 问题描述
API 密钥无效或未正确配置。

### 解决方案

1. **检查 `.env.local` 文件**
   - 确认文件存在于项目根目录
   - 确认 `OPENROUTER_API_KEY` 变量已设置
   - 确认密钥值正确（没有多余的空格或引号）

2. **验证 API 密钥格式**
   - OpenRouter API 密钥通常以 `sk-or-v1-` 开头
   - 确保密钥完整且未被截断

3. **重启服务器**
   - 环境变量更改后需要重启开发服务器才能生效

## 📝 环境变量配置示例

`.env.local` 文件应该包含：

```env
# OpenRouter API Key (用于 Gemini 2.5 Flash Image)
OPENROUTER_API_KEY=sk-or-v1-your-api-key-here

# 站点 URL (用于 OAuth 回调)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase 配置（如果使用）
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
```

## ✅ 验证配置

1. **检查环境变量是否加载**
   - 在 API 路由中添加日志：
     ```typescript
     console.log('API Key exists:', !!process.env.OPENROUTER_API_KEY)
     ```
   - 注意：不要直接打印 API 密钥值

2. **测试 API 连接**
   - 访问 OpenRouter 的测试端点
   - 或使用简单的 API 调用测试密钥

## 🔒 安全提示

1. **不要提交 `.env.local` 到 Git**
   - 该文件已在 `.gitignore` 中
   - 确保不会意外提交敏感信息

2. **使用环境变量管理工具**
   - 生产环境使用 Vercel、Netlify 等平台的环境变量功能
   - 不要硬编码 API 密钥

3. **定期轮换 API 密钥**
   - 定期更新 API 密钥以提高安全性
   - 如果密钥泄露，立即撤销并创建新密钥

## 📚 相关链接

- [OpenRouter 密钥管理](https://openrouter.ai/settings/keys)
- [OpenRouter 定价](https://openrouter.ai/pricing)
- [OpenRouter API 文档](https://openrouter.ai/docs)

## 💡 常见问题

**Q: 为什么我的 API 密钥突然不能用了？**
A: 可能是达到了使用限制，或者密钥被撤销。检查 OpenRouter 账户状态。

**Q: 如何查看我的 API 使用情况？**
A: 访问 OpenRouter Dashboard 查看使用统计和限制。

**Q: 免费账户有什么限制？**
A: 免费账户通常有较低的使用限制。查看 [OpenRouter 定价页面](https://openrouter.ai/pricing) 了解详情。

**Q: 可以同时使用多个 API 密钥吗？**
A: 可以，但需要在代码中实现密钥轮换逻辑。

