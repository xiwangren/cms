# 故障排除指南

## 常见错误及解决方案

### 1. `getaddrinfo ENOTFOUND http` 错误

**原因：** 环境变量 URL 格式不正确

**解决方案：**
- 确保 `.env.local` 中的 URL 格式正确：
  ```env
  NEXT_PUBLIC_STRAPI_API_URL=http://107.23.182.26:1337/api
  ```
- 不要包含末尾斜杠
- 确保包含协议（http:// 或 https://）

### 2. `Failed to fetch articles: Bad Request` 错误

**可能的原因：**

#### a) Strapi API 端点不存在
- 确保 Strapi 中已创建 `Article` 内容类型
- 检查内容类型的 API ID 是否为 `article`（复数形式）

#### b) 查询参数格式不正确
- Strapi v4 使用特定的查询参数格式
- 代码已更新为正确的格式

#### c) API 权限未配置
1. 登录 Strapi 管理面板
2. 进入 Settings > Users & Permissions Plugin > Roles
3. 编辑 "Public" 角色
4. 为 Article 内容类型启用：
   - `find` - 允许查询文章列表
   - `findOne` - 允许查询单篇文章

#### d) CORS 问题
如果 Strapi 和 Next.js 运行在不同域名/端口，需要配置 CORS：

在 Strapi 的 `config/middlewares.js` 中添加：
```javascript
module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: ['http://localhost:3000', 'http://localhost:1337'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

### 3. 图片不显示

**原因：** Strapi 返回的图片 URL 可能是相对路径

**解决方案：**
- 代码已自动处理相对路径
- 确保 `NEXT_PUBLIC_STRAPI_API_URL` 环境变量正确
- 如果图片仍然不显示，检查 Strapi 的媒体库配置

### 4. 文章内容为空

**检查清单：**
- [ ] Strapi 中是否有已发布的文章
- [ ] 文章的 `publishedAt` 字段是否已设置
- [ ] API 权限是否正确配置
- [ ] 网络连接是否正常

### 5. 环境变量未生效

**解决方案：**
1. 确保 `.env.local` 文件在项目根目录
2. 重启 Next.js 开发服务器
3. 检查变量名是否正确（`NEXT_PUBLIC_` 前缀）
4. 在代码中打印变量值：
   ```typescript
   console.log('API URL:', process.env.NEXT_PUBLIC_STRAPI_API_URL);
   ```

## 调试步骤

### 1. 检查 Strapi API 是否可访问

在浏览器中访问：
```
http://107.23.182.26:1337/api/articles
```

应该返回 JSON 数据。如果返回 403，需要配置权限。

### 2. 检查网络请求

在浏览器开发者工具的 Network 标签中：
- 查看对 Strapi API 的请求
- 检查请求 URL 是否正确
- 查看响应状态码和错误信息

### 3. 查看服务器日志

在 Next.js 终端中查看详细错误信息。

### 4. 测试 API 端点

使用 curl 或 Postman 测试：
```bash
curl http://107.23.182.26:1337/api/articles
```

## 快速检查清单

- [ ] Strapi 服务正在运行
- [ ] 环境变量 `NEXT_PUBLIC_STRAPI_API_URL` 已配置
- [ ] URL 格式正确（无末尾斜杠，包含协议）
- [ ] Strapi 中已创建 Article 内容类型
- [ ] API 权限已配置（Public 角色）
- [ ] 至少有一篇已发布的文章
- [ ] 网络连接正常
- [ ] 防火墙/安全组允许访问

## 获取帮助

如果问题仍然存在：
1. 检查 Strapi 和 Next.js 的版本兼容性
2. 查看 Strapi 官方文档：https://docs.strapi.io/
3. 检查 Next.js 文档：https://nextjs.org/docs

