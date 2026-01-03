# 项目中使用 Supabase 的文件清单

## 📋 核心 Supabase 文件（工具类）

### 1. `lib/supabase/client.ts`
**类型**: 客户端工具函数  
**用途**: 创建浏览器端 Supabase 客户端  
**使用场景**: Client Components 中使用

```typescript
// 导出函数
export function createClient()
```

**功能**:
- 创建浏览器端 Supabase 客户端
- 检查环境变量配置
- 未配置时返回占位符客户端（避免崩溃）

**被以下文件使用**:
- `components/auth-button.tsx`

---

### 2. `lib/supabase/server.ts`
**类型**: 服务器端工具函数  
**用途**: 创建服务器端 Supabase 客户端  
**使用场景**: Server Components、Server Actions、API Routes 中使用

```typescript
// 导出函数
export async function createClient()
```

**功能**:
- 创建服务器端 Supabase 客户端
- 处理 Cookie 管理
- 检查环境变量配置

**被以下文件使用**:
- `app/actions/auth.ts`
- `app/auth/callback/route.ts`

---

### 3. `lib/supabase/proxy.ts`
**类型**: 会话代理函数  
**用途**: 刷新用户会话令牌  
**使用场景**: 中间件中使用

```typescript
// 导出函数
export async function updateSession(request: NextRequest)
```

**功能**:
- 刷新过期的认证令牌
- 管理 Cookie 设置
- 检查环境变量配置（未配置时跳过）

**被以下文件使用**:
- `middleware.ts`

---

## 🎨 UI 组件

### 4. `components/auth-button.tsx`
**类型**: React 客户端组件  
**用途**: 显示登录按钮和用户信息  
**Supabase 使用**:
- 导入: `createClient` from `@/lib/supabase/client`
- 导入: `signInWithGoogle, signOut` from `@/app/actions/auth`
- 导入: `User` type from `@supabase/supabase-js`

**功能**:
- 检查 Supabase 配置状态
- 显示登录按钮或用户头像
- 处理登录/登出操作

**关键代码**:
```typescript
import { createClient } from '@/lib/supabase/client'
import { signInWithGoogle, signOut } from '@/app/actions/auth'
import type { User } from '@supabase/supabase-js'
```

---

## ⚙️ 服务器操作和路由

### 5. `app/actions/auth.ts`
**类型**: Server Actions  
**用途**: 处理登录和登出操作  
**Supabase 使用**:
- 导入: `createClient` from `@/lib/supabase/server`

**功能**:
- `signInWithGoogle()` - 发起 Google OAuth 登录
- `signOut()` - 用户登出

**关键代码**:
```typescript
import { createClient } from '@/lib/supabase/server'

export async function signInWithGoogle() {
  const supabase = await createClient()
  // ... OAuth 登录逻辑
}

export async function signOut() {
  const supabase = await createClient()
  // ... 登出逻辑
}
```

---

### 6. `app/auth/callback/route.ts`
**类型**: API Route Handler  
**用途**: 处理 OAuth 回调  
**Supabase 使用**:
- 导入: `createClient` from `@/lib/supabase/server`

**功能**:
- 接收 Google OAuth 回调
- 交换授权码获取会话
- 重定向用户到应用

**关键代码**:
```typescript
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const supabase = await createClient()
  await supabase.auth.exchangeCodeForSession(code)
  // ... 重定向逻辑
}
```

---

### 7. `middleware.ts`
**类型**: Next.js Middleware  
**用途**: 请求拦截和会话刷新  
**Supabase 使用**:
- 导入: `updateSession` from `@/lib/supabase/proxy`

**功能**:
- 拦截所有请求
- 刷新过期的认证令牌
- 管理会话 Cookie

**关键代码**:
```typescript
import { updateSession } from '@/lib/supabase/proxy'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}
```

---

## 📦 依赖包

### 8. `package.json`
**类型**: 项目依赖配置  
**Supabase 相关依赖**:
- `@supabase/supabase-js`: `^2.89.0` - Supabase JavaScript 客户端
- `@supabase/ssr`: `^0.8.0` - Supabase SSR 支持

---

## 📊 使用关系图

```
┌─────────────────────────────────────────┐
│         Supabase 使用关系图              │
└─────────────────────────────────────────┘

lib/supabase/
├── client.ts ──────────┐
│                       │
├── server.ts ──────────┼──┐
│                       │  │
└── proxy.ts ───────────┼──┼──┐
                        │  │  │
                        ▼  ▼  ▼
components/          app/  app/  middleware.ts
auth-button.tsx      actions/  auth/
                     auth.ts    callback/
                                route.ts
```

## 🔍 详细使用说明

### 客户端使用（Browser）

**文件**: `components/auth-button.tsx`
- 使用 `lib/supabase/client.ts` 创建客户端
- 在浏览器中检查用户登录状态
- 监听认证状态变化

### 服务器端使用（Server）

**文件**: `app/actions/auth.ts`, `app/auth/callback/route.ts`
- 使用 `lib/supabase/server.ts` 创建服务器端客户端
- 处理 OAuth 登录流程
- 管理用户会话

### 中间件使用（Middleware）

**文件**: `middleware.ts`
- 使用 `lib/supabase/proxy.ts` 刷新会话
- 在每个请求中检查并更新认证状态
- 自动处理 Cookie

## ⚠️ 重要提示

1. **环境变量检查**
   - 所有文件都检查 `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - 未配置时会优雅降级（不崩溃）

2. **客户端 vs 服务器端**
   - `client.ts` - 用于 Client Components
   - `server.ts` - 用于 Server Components/Actions/Routes

3. **会话管理**
   - `proxy.ts` - 自动刷新会话
   - `middleware.ts` - 在每个请求中调用

## 📝 总结

**使用 Supabase 的文件总数**: 7 个核心文件

1. ✅ `lib/supabase/client.ts` - 客户端工具
2. ✅ `lib/supabase/server.ts` - 服务器端工具
3. ✅ `lib/supabase/proxy.ts` - 会话代理
4. ✅ `components/auth-button.tsx` - UI 组件
5. ✅ `app/actions/auth.ts` - 服务器操作
6. ✅ `app/auth/callback/route.ts` - API 路由
7. ✅ `middleware.ts` - 中间件

**所有文件都做了优雅降级处理**，未配置 Supabase 时不会导致应用崩溃。

