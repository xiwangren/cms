/**
 * Strapi API Client Configuration
 * 
 * Configure your Strapi API URL in environment variables:
 * NEXT_PUBLIC_STRAPI_API_URL=http://107.23.182.26:1337/api
 * 
 * Note: Do not include trailing slash
 */

// 确保 URL 格式正确，移除末尾斜杠
const getStrapiUrl = () => {
  // 优先使用环境变量，如果没有则使用远程服务器地址
  const url = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://107.23.182.26:1337/api';
  const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  
  // 在开发环境下打印 URL 以便调试
  if (typeof window === 'undefined') {
    console.log('[Strapi] API URL:', cleanUrl);
    console.log('[Strapi] Environment variable:', process.env.NEXT_PUBLIC_STRAPI_API_URL || 'not set (using default)');
  }
  
  return cleanUrl;
};

const STRAPI_API_URL = getStrapiUrl();
// 获取基础 URL（用于构建图片完整路径）
const STRAPI_BASE_URL = STRAPI_API_URL.replace('/api', '');

// 从环境变量或默认值中提取远程服务器地址
const getRemoteServerUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://107.23.182.26:1337/api';
  // 提取协议、主机和端口
  try {
    const url = new URL(apiUrl);
    return `${url.protocol}//${url.host}`;
  } catch {
    // 如果解析失败，尝试简单替换
    return apiUrl.replace('/api', '');
  }
};

const REMOTE_SERVER_URL = getRemoteServerUrl();

// 根据实际 API 响应定义接口（扁平结构，无 attributes 嵌套）
export interface StrapiArticle {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  excerpt?: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  featuredImage?: {
    data: {
      id: number;
      attributes: {
        url: string;
        width: number;
        height: number;
        alternativeText?: string;
        name?: string;
      };
    } | null;
  } | null;
  image?: {
    data: {
      id: number;
      attributes: {
        url: string;
        width: number;
        height: number;
        alternativeText?: string;
      };
    } | null;
  } | null;
  blocks?: StrapiBlock[];
  cover?: {
    id: number;
    documentId?: string;
    name?: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats?: {
      thumbnail?: {
        url: string;
        width: number;
        height: number;
        size?: number;
      };
      large?: {
        url: string;
        width: number;
        height: number;
        size?: number;
      };
      medium?: {
        url: string;
        width: number;
        height: number;
        size?: number;
      };
      small?: {
        url: string;
        width: number;
        height: number;
        size?: number;
      };
    };
    hash?: string;
    ext?: string;
    mime?: string;
    size?: number;
    url: string;
    previewUrl?: string | null;
    provider?: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
  } | null;
  // 为了兼容性，添加 attributes 访问器
  attributes?: {
    title: string;
    slug: string;
    description?: string;
    content?: string;
    excerpt?: string;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
    featuredImage?: {
      data: {
        id: number;
        attributes: {
          url: string;
          width: number;
          height: number;
          alternativeText?: string;
        };
      } | null;
    } | null;
    image?: {
      data: {
        id: number;
        attributes: {
          url: string;
          width: number;
          height: number;
          alternativeText?: string;
        };
      } | null;
    } | null;
    blocks?: StrapiBlock[];
    cover?: {
      id: number;
      documentId?: string;
      name?: string;
      alternativeText?: string;
      caption?: string;
      width: number;
      height: number;
      formats?: {
        thumbnail?: {
          url: string;
          width: number;
          height: number;
          size?: number;
        };
        large?: {
          url: string;
          width: number;
          height: number;
          size?: number;
        };
        medium?: {
          url: string;
          width: number;
          height: number;
          size?: number;
        };
        small?: {
          url: string;
          width: number;
          height: number;
          size?: number;
        };
      };
      hash?: string;
      ext?: string;
      mime?: string;
      size?: number;
      url: string;
      previewUrl?: string | null;
      provider?: string;
      createdAt?: string;
      updatedAt?: string;
      publishedAt?: string;
    } | null;
  };
}

export interface StrapiBlock {
  id: number;
  __component: string;
  [key: string]: any;
}

export interface StrapiResponse<T> {
  data: T | T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * 构建完整的图片 URL
 * 如果 URL 中包含 localhost，会替换为远程服务器地址
 */
export function getImageUrl(imageUrl: string | undefined | null): string | null {
  if (!imageUrl) {
    return null;
  }
  
  let finalUrl: string;
  
  // 如果已经是完整 URL
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    // 检查是否包含 localhost，如果是则替换为远程服务器地址
    if (imageUrl.includes('localhost') || imageUrl.includes('127.0.0.1')) {
      try {
        const url = new URL(imageUrl);
        // 替换主机为远程服务器
        const remoteUrl = new URL(REMOTE_SERVER_URL);
        url.host = remoteUrl.host;
        url.port = remoteUrl.port;
        finalUrl = url.toString();
      } catch (e) {
        // 如果 URL 解析失败，使用字符串替换
        finalUrl = imageUrl.replace(/localhost:\d+/, REMOTE_SERVER_URL.replace(/^https?:\/\//, ''));
        finalUrl = finalUrl.replace(/127\.0\.0\.1:\d+/, REMOTE_SERVER_URL.replace(/^https?:\/\//, ''));
      }
    } else {
      finalUrl = imageUrl;
    }
  } else {
    // 如果是相对路径，添加 Strapi 基础 URL
    if (imageUrl.startsWith('/')) {
      finalUrl = `${REMOTE_SERVER_URL}${imageUrl}`;
    } else {
      // 如果路径不包含 /，添加 /uploads/ 前缀
      finalUrl = `${REMOTE_SERVER_URL}/uploads/${imageUrl}`;
    }
  }
  
  return finalUrl;
}

/**
 * 从文章数据中提取图片信息
 */
export function getArticleImage(article: StrapiArticle): {
  url: string;
  alt: string;
  width?: number;
  height?: number;
} | null {
  // 尝试多种可能的图片字段
  let imageData = null;
  console.log(article)
  if (article.cover) {
    imageData = article.cover
  }
  
  if (!imageData || !imageData.url) {
    return null;
  }
  
  const url = getImageUrl(imageData.url);
  if (!url) return null;
  
  return {
    url,
    alt: imageData.alternativeText || article.attributes?.title || article.title || '',
    width: imageData.width,
    height: imageData.height,
  };
}

/**
 * 将扁平结构转换为带 attributes 的结构（用于兼容现有代码）
 */
function normalizeArticle(article: any): StrapiArticle {
  // 如果已经是 attributes 结构，直接返回
  if (article.attributes) {
    return article;
  }
  
  // 扁平结构转换为 attributes 结构
  return {
    id: article.id,
    documentId: article.documentId || '',
    title: article.title || '',
    slug: article.slug || '',
    description: article.description,
    content: article.content,
    excerpt: article.excerpt || article.description,
    publishedAt: article.publishedAt || article.createdAt,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
    featuredImage: article.featuredImage,
    image: article.image,
    blocks: article.blocks,
    cover: article.cover,
    // 添加 attributes 以兼容现有代码
    attributes: {
      title: article.title || '',
      slug: article.slug || '',
      description: article.description,
      content: article.content,
      excerpt: article.excerpt || article.description,
      publishedAt: article.publishedAt || article.createdAt,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      featuredImage: article.featuredImage,
      image: article.image,
      blocks: article.blocks,
      cover: article.cover,
    },
  };
}

/**
 * Fetch articles from Strapi
 */
export async function getArticles(params?: {
  page?: number;
  pageSize?: number;
  sort?: string;
}): Promise<StrapiArticle[]> {
  // 构建查询 URL
  let url = `${STRAPI_API_URL}/articles`;
  const queryParams: string[] = [];
  
  // 只添加基本的分页和排序参数
  if (params?.pageSize) {
    queryParams.push(`pagination[pageSize]=${params.pageSize}`);
  }
  
  if (params?.sort) {
    queryParams.push(`sort=${params.sort}`);
  }
  
  // Populate 图片字段
  queryParams.push('populate=*');
  
  if (queryParams.length > 0) {
    url += '?' + queryParams.join('&');
  }
  
  console.log('[Strapi] Fetching articles from:', url);
  
  try {
    const response = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('[Strapi] Response status:', response.status, response.statusText);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Strapi] Error response:', errorText);
      throw new Error(`Failed to fetch articles: ${response.status} ${response.statusText}`);
    }
    
    const data: StrapiResponse<StrapiArticle> = await response.json();
    console.log('========',data)
    console.log('=====',data.data)
    let articles: any[] = [];
    if (Array.isArray(data.data)) {
      articles = data.data;
      console.log('[Strapi] Found', articles.length, 'articles');
    } else if (data.data) {
      articles = [data.data];
      console.log('[Strapi] Found 1 article (single object)');
    } else {
      console.warn('[Strapi] No data in response');
      return [];
    }
    
    // 标准化文章数据
    const normalizedArticles = articles.map(normalizeArticle);
    console.log("=======articles",normalizedArticles)
    console.log('[Strapi] Normalized', normalizedArticles.length, 'articles');
    
    return normalizedArticles;
  } catch (error: any) {
    console.error('[Strapi] Error fetching articles:', error);
    // 在开发环境下，仍然抛出错误以便调试
    if (process.env.NODE_ENV === 'development') {
      throw error;
    }
    // 生产环境返回空数组
    return [];
  }
}

/**
 * Get a single article by slug
 */
export async function getArticleBySlug(slug: string): Promise<StrapiArticle | null> {
  const url = `${STRAPI_API_URL}/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`;
  
  console.log('[Strapi] Fetching article by slug from:', url);
  
  try {
    const response = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error('[Strapi] Error fetching article:', response.status, response.statusText);
      return null;
    }
    
    const data: StrapiResponse<StrapiArticle> = await response.json();
    
    let articles: any[] = [];
    if (Array.isArray(data.data)) {
      articles = data.data;
    } else if (data.data) {
      articles = [data.data];
    }
    
    if (articles.length > 0) {
      return normalizeArticle(articles[0]);
    }
    
    return null;
  } catch (error) {
    console.error('[Strapi] Error fetching article:', error);
    return null;
  }
}

/**
 * Get article slugs for static generation
 */
export async function getArticleSlugs(): Promise<string[]> {
  try {
    const articles = await getArticles({ pageSize: 100 });
    return articles.map((article) => article.attributes?.slug || article.slug);
  } catch (error) {
    console.error('Error fetching article slugs:', error);
    return [];
  }
}
