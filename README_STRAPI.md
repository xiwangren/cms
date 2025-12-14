# Strapi 迁移完成

## ✅ 已完成的迁移工作

### 1. 核心文件创建

- ✅ `src/lib/strapi.ts` - Strapi API 客户端
  - `getArticles()` - 获取文章列表
  - `getArticleBySlug()` - 根据 slug 获取单篇文章
  - `getArticleSlugs()` - 获取所有文章 slug（用于静态生成）

### 2. 组件替换

- ✅ `src/components/RichText.tsx` - 富文本渲染组件（替代 PrismicRichText）
- ✅ `src/components/blocks/` - 内容块组件（替代 Prismic slices）
  - `TextBlock.tsx` - 文本块
  - `ImageBlock.tsx` - 图片块
  - `QuoteBlock.tsx` - 引用块
  - `BlockRenderer.tsx` - 块渲染器

### 3. 页面更新

- ✅ `src/app/page.tsx` - 文章列表页（使用 Strapi API）
- ✅ `src/app/articles/[uid]/page.tsx` - 文章详情页（使用 Strapi API）
- ✅ `src/components/Article.tsx` - 文章卡片组件（适配 Strapi 数据结构）

### 4. 文档

- ✅ `MIGRATION_GUIDE.md` - 详细迁移指南
- ✅ `PACKAGE_UPDATE.md` - package.json 更新说明

## 🚀 下一步操作

### 1. 更新 package.json

```bash
npm uninstall @prismicio/client @prismicio/react @prismicio/next @slicemachine/adapter-next
```

### 2. 配置环境变量

创建 `.env.local` 文件：

```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337/api
```

### 3. 设置 Strapi

1. 安装 Strapi（如果还没有）：
   ```bash
   npx create-strapi-app@latest my-strapi-blog
   ```

2. 在 Strapi 中创建 Article 内容类型（参考 `MIGRATION_GUIDE.md`）

3. 配置 API 权限（允许 Public 角色访问 Article）

4. 创建一些测试文章

### 4. 测试

```bash
# 启动 Strapi（在 Strapi 项目目录）
npm run develop

# 启动 Next.js（在当前项目目录）
npm run dev
```

访问 http://localhost:3000 查看效果

## 📝 主要变更说明

### API 调用方式

**之前（Prismic）：**
```typescript
import { createClient } from "@/prismicio";
const client = createClient();
const article = await client.getByUID("article", uid);
```

**现在（Strapi）：**
```typescript
import { getArticleBySlug } from "@/lib/strapi";
const article = await getArticleBySlug(uid);
```

### 内容渲染

**之前（Prismic）：**
```tsx
import { PrismicRichText, SliceZone } from "@prismicio/react";
<PrismicRichText field={article.data.title} />
<SliceZone slices={article.data.slices} components={components} />
```

**现在（Strapi）：**
```tsx
import { RichText } from "@/components/RichText";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
<RichText content={article.attributes.content} />
<BlockRenderer blocks={article.attributes.blocks} />
```

### 数据结构

**之前（Prismic）：**
```typescript
{
  id: string;
  uid: string;
  data: {
    title: { text: string };
    slices: Array<Slice>;
  }
}
```

**现在（Strapi）：**
```typescript
{
  id: number;
  attributes: {
    title: string;
    slug: string;
    content: string;
    blocks: Array<Block>;
  }
}
```

## 🔧 故障排除

### 图片不显示

确保 Strapi 返回的图片 URL 正确。代码已处理相对路径，但需要确保：
- Strapi 的 `NEXT_PUBLIC_STRAPI_API_URL` 环境变量正确
- 图片在 Strapi 中已正确上传

### API 请求失败

1. 检查 Strapi 是否运行在正确端口（默认 1337）
2. 检查 API 权限设置
3. 检查环境变量配置

### 类型错误

如果遇到 TypeScript 类型错误，检查：
- `src/lib/strapi.ts` 中的类型定义
- Strapi 返回的数据结构是否匹配

## 📚 参考资源

- [Strapi 官方文档](https://docs.strapi.io/)
- [Strapi REST API](https://docs.strapi.io/dev-docs/api/rest)
- [Next.js 文档](https://nextjs.org/docs)

