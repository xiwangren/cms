# 从 Prismic 迁移到 Strapi 指南

## 概述

本项目已从 Prismic CMS 迁移到 Strapi CMS。以下是迁移的详细说明和配置步骤。

## 主要变更

### 1. 依赖变更

**移除的依赖：**
- `@prismicio/client`
- `@prismicio/react`
- `@prismicio/next`
- `@slicemachine/adapter-next`

**新增的依赖：**
- 使用原生 `fetch` API 与 Strapi REST API 通信

### 2. 文件结构变更

**新增文件：**
- `src/lib/strapi.ts` - Strapi API 客户端
- `src/components/RichText.tsx` - 富文本渲染组件
- `src/components/blocks/` - 内容块组件（替代 Prismic slices）
  - `TextBlock.tsx`
  - `ImageBlock.tsx`
  - `QuoteBlock.tsx`
  - `BlockRenderer.tsx`

**更新的文件：**
- `src/app/page.tsx` - 文章列表页
- `src/app/articles/[uid]/page.tsx` - 文章详情页
- `src/components/Article.tsx` - 文章卡片组件

**移除的文件：**
- `src/slices/` - Prismic slices（已替换为 blocks）
- `src/prismicio.js` - Prismic 客户端配置
- `prismicio-types.d.ts` - Prismic 类型定义
- `slicemachine.config.json` - Slice Machine 配置

## Strapi 配置

### 1. 安装和配置 Strapi

```bash
# 创建新的 Strapi 项目（在项目外部）
npx create-strapi-app@latest my-strapi-blog

# 或使用现有 Strapi 实例
```

### 2. 创建内容类型

在 Strapi 管理面板中创建以下内容类型：

#### Article (文章)

字段：
- `title` (Text, Short text) - 必填
- `slug` (UID, based on title) - 必填，唯一
- `content` (Rich text) - 文章正文
- `excerpt` (Text, Long text) - 文章摘要
- `publishedAt` (Date) - 发布日期
- `featuredImage` (Media, Single media) - 特色图片
- `blocks` (Component, Repeatable) - 内容块

#### Block Components

创建以下组件类型：

**blocks.text**
- `content` (Rich text) - 文本内容

**blocks.image**
- `image` (Media, Single media) - 图片
- `caption` (Rich text) - 图片说明
- `size` (Enumeration: base, wide, widest) - 图片尺寸

**blocks.quote**
- `quote` (Text, Long text) - 引用内容
- `source` (Text, Short text) - 引用来源

### 3. 配置 API 权限

在 Strapi 管理面板中：
1. 进入 Settings > Users & Permissions Plugin > Roles
2. 编辑 "Public" 角色
3. 为 Article 内容类型启用：
   - `find` - 允许查询文章列表
   - `findOne` - 允许查询单篇文章

## 环境变量配置

创建 `.env.local` 文件：

```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337/api
```

如果 Strapi 部署在其他服务器，更新 URL：

```env
NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi-instance.com/api
```

## 数据迁移

### 从 Prismic 导出数据

1. 在 Prismic 中导出所有文章数据
2. 转换为 Strapi 格式

### 导入到 Strapi

1. 在 Strapi 管理面板中手动创建文章
2. 或使用 Strapi 的导入功能
3. 或编写脚本批量导入

## 开发

### 启动 Strapi

```bash
cd my-strapi-blog
npm run develop
```

访问 http://localhost:1337/admin 创建管理员账户

### 启动 Next.js 应用

```bash
npm run dev
```

访问 http://localhost:3000

## API 端点

Strapi 自动生成以下 REST API 端点：

- `GET /api/articles` - 获取文章列表
- `GET /api/articles/:id` - 获取单篇文章
- `GET /api/articles?filters[slug][$eq]=article-slug` - 根据 slug 查询

## 注意事项

1. **图片 URL**: Strapi 返回的图片 URL 可能是相对路径，代码中已处理
2. **内容格式**: Strapi 的 Rich text 字段返回 HTML，使用 `dangerouslySetInnerHTML` 渲染
3. **日期格式**: 使用 `publishedAt` 或 `createdAt` 字段
4. **静态生成**: `generateStaticParams` 函数会预生成所有文章页面

## 下一步

1. 配置 Strapi 内容类型
2. 导入现有文章数据
3. 测试所有页面功能
4. 部署 Strapi 实例
5. 更新生产环境变量

## 参考资源

- [Strapi 文档](https://docs.strapi.io/)
- [Strapi REST API](https://docs.strapi.io/dev-docs/api/rest)
- [Next.js 文档](https://nextjs.org/docs)

