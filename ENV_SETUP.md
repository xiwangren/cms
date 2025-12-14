# 环境变量配置说明

## 问题
如果看到连接地址是 `http://localhost:1337/api` 而不是 `http://107.23.182.26:1337/api`，说明环境变量没有正确加载。

## 解决方案

### 1. 创建 `.env.local` 文件

在项目根目录创建 `.env.local` 文件（如果不存在）：

```env
NEXT_PUBLIC_STRAPI_API_URL=http://107.23.182.26:1337/api
```

**重要提示：**
- 文件名必须是 `.env.local`（注意前面的点）
- 不要包含末尾斜杠
- 确保包含 `/api` 路径

### 2. 重启开发服务器

环境变量只在服务器启动时加载，所以修改后必须重启：

```bash
# 停止当前服务器 (Ctrl+C)
npm run dev
```

### 3. 验证环境变量

服务器启动后，查看控制台输出，应该能看到：

```
[Strapi] API URL: http://107.23.182.26:1337/api
[Strapi] Environment variable: http://107.23.182.26:1337/api
```

如果显示 "not set (using default)"，说明环境变量没有加载。

### 4. 其他可能的问题

#### 文件位置错误
确保 `.env.local` 文件在项目根目录（与 `package.json` 同级），而不是在 `src` 目录。

#### 文件格式错误
确保文件格式正确：
- 每行一个变量
- 使用 `KEY=VALUE` 格式
- 不要有多余的空格
- 值不需要引号（除非值本身包含空格）

#### Next.js 缓存
如果修改后仍然不生效，尝试清除缓存：

```bash
rm -rf .next
npm run dev
```

### 5. 检查环境变量

在代码中临时添加调试代码（在 `src/lib/strapi.ts` 中）：

```typescript
console.log('All env vars:', {
  NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
  NODE_ENV: process.env.NODE_ENV,
});
```

### 6. 生产环境

在生产环境中，需要在部署平台设置环境变量：
- Vercel: Project Settings > Environment Variables
- Netlify: Site settings > Environment variables
- 其他平台: 参考相应文档

## 默认值

代码中已设置默认值为 `http://107.23.182.26:1337/api`，所以即使没有环境变量，也应该能正常工作。

如果仍然看到 `localhost`，可能是：
1. 代码缓存问题（清除 `.next` 目录）
2. 多个环境变量文件冲突（`.env`, `.env.local`, `.env.development` 等）
3. 系统环境变量覆盖了文件中的设置

