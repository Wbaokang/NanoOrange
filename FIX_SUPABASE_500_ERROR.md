# 修复 Supabase 500 错误："Unexpected failure"

## 🔴 错误分析

错误信息：
```json
{
  "code": 500,
  "error_code": "unexpected_failure",
  "msg": "Unexpected failure, please check server logs for more information"
}
```

这个错误通常发生在：
1. Supabase 项目配置不正确
2. Google OAuth 提供商未正确配置
3. 回调 URL 配置不匹配
4. Supabase 服务端问题

## 🔧 修复步骤

### 步骤 1: 检查 Supabase Google 提供商配置

1. **访问 Supabase Dashboard**
   - https://supabase.com/dashboard/project/hwzbhkhqbwjnswnyhvgi/auth/providers

2. **检查 Google 提供商**
   - 确保 Google 提供商已**启用**
   - 检查 **Client ID** 和 **Client Secret** 是否正确
   - 如果配置有误，更新后点击 **"Save"**

3. **验证配置**
   - Client ID 应该以数字开头（Google OAuth 客户端 ID）
   - Client Secret 应该是一串字符

### 步骤 2: 检查 Supabase URL Configuration

1. **访问 URL Configuration**
   - https://supabase.com/dashboard/project/hwzbhkhqbwjnswnyhvgi/auth/url-configuration

2. **验证配置**
   - **Site URL**: `https://www.zenoai.online`
   - **Redirect URLs**: 必须包含 `https://www.zenoai.online/auth/callback`

### 步骤 3: 检查 Google Cloud Console 配置

1. **访问 Google Cloud Console**
   - https://console.cloud.google.com/

2. **检查 OAuth 2.0 凭据**
   - 进入 **API 和服务** > **凭据**
   - 找到您的 OAuth 2.0 客户端 ID
   - 点击编辑

3. **验证已授权的重定向 URI**
   - 必须包含：`https://hwzbhkhqbwjnswnyhvgi.supabase.co/auth/v1/callback`
   - 确保 URL 完全匹配（包括协议 https）

### 步骤 4: 检查环境变量

确保 `.env.local` 文件中的配置正确：

```env
NEXT_PUBLIC_SUPABASE_URL=https://hwzbhkhqbwjnswnyhvgi.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_fRDieUziEao_pKbW5Dw1og_J2FdAcIk
NEXT_PUBLIC_SITE_URL=https://www.zenoai.online
```

### 步骤 5: 检查 Supabase 项目状态

1. **访问 Supabase Dashboard**
   - https://supabase.com/dashboard/project/hwzbhkhqbwjnswnyhvgi

2. **检查项目状态**
   - 确保项目处于活跃状态
   - 检查是否有任何警告或错误提示

3. **检查 API 密钥**
   - 进入 **Settings** > **API**
   - 确认 **anon public** key 是正确的
   - 如果密钥已过期或被重置，更新 `.env.local` 文件

## 🐛 常见原因和解决方案

### 原因 1: Google OAuth 凭据错误

**症状**: 500 错误，Supabase 无法验证 Google 凭据

**解决方案**:
- 检查 Supabase Dashboard 中的 Google Client ID 和 Secret
- 确保与 Google Cloud Console 中的凭据一致
- 重新复制并粘贴凭据

### 原因 2: 重定向 URI 不匹配

**症状**: Google 重定向失败

**解决方案**:
- Google Cloud Console 中的重定向 URI 必须完全匹配 Supabase 回调 URL
- 格式：`https://hwzbhkhqbwjnswnyhvgi.supabase.co/auth/v1/callback`
- 注意：必须是 `https://`，不能是 `http://`

### 原因 3: Supabase 项目配置问题

**症状**: 服务器端处理失败

**解决方案**:
- 检查 Supabase 项目是否处于活跃状态
- 检查是否有 API 限制或配额问题
- 尝试重新保存 Google 提供商配置

### 原因 4: 环境变量问题

**症状**: 应用无法正确连接到 Supabase

**解决方案**:
- 确认 `.env.local` 文件中的值正确
- 确认没有多余的空格或特殊字符
- 重启开发服务器

## ✅ 检查清单

- [ ] Supabase Dashboard 中 Google 提供商已启用
- [ ] Google Client ID 和 Secret 配置正确
- [ ] Supabase URL Configuration 中的 Site URL 正确
- [ ] Supabase URL Configuration 中的 Redirect URLs 已添加
- [ ] Google Cloud Console 中的重定向 URI 正确
- [ ] `.env.local` 文件中的环境变量正确
- [ ] 已重启开发服务器

## 🔗 快速链接

- **Supabase Providers**: https://supabase.com/dashboard/project/hwzbhkhqbwjnswnyhvgi/auth/providers
- **Supabase URL Configuration**: https://supabase.com/dashboard/project/hwzbhkhqbwjnswnyhvgi/auth/url-configuration
- **Google Cloud Console**: https://console.cloud.google.com/

## 💡 调试建议

1. **查看 Supabase 日志**
   - 在 Supabase Dashboard 中查看项目日志
   - 查找与认证相关的错误信息

2. **测试 Google OAuth 配置**
   - 在 Google Cloud Console 中测试 OAuth 凭据
   - 确认重定向 URI 配置正确

3. **简化测试**
   - 先使用 `http://localhost:3000` 测试
   - 确认本地环境工作正常后再配置生产环境

## 📝 如果问题仍然存在

如果按照以上步骤配置后仍然出现 500 错误：

1. **检查 Supabase 服务状态**
   - 访问：https://status.supabase.com/
   - 确认服务正常运行

2. **联系 Supabase 支持**
   - 提供错误信息和项目 ID
   - 查看 Supabase Dashboard 中的日志

3. **尝试重新配置**
   - 暂时禁用 Google 提供商
   - 重新配置所有设置
   - 重新启用 Google 提供商

