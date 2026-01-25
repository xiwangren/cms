import { dateFormatter } from "@/lib/dateFormatter";
import { Heading } from "@/components/Heading";
import Link from "next/link";
import Image from "next/image";
import { StrapiArticle, getArticleImage } from "@/lib/strapi";

/**
 * 简化版 Article 组件，使用普通 img 标签
 * 如果 Next.js Image 组件有问题，可以使用这个组件
 */
export function ArticleSimple({ article }: { article: StrapiArticle }) {
  const title = article.attributes?.title || article.title || "";
  const slug = article.attributes?.slug || article.slug || "";
  const publishedAt = article.attributes?.publishedAt || article.publishedAt || article.createdAt;
  const excerpt = article.attributes?.excerpt || article.excerpt || article.attributes?.description || article.description || "";
  
  const date = new Date(publishedAt);
  const imageInfo = getArticleImage(article);

  return (
    <li className="grid grid-cols-1 items-start gap-6 md:grid-cols-3 md:gap-8">
      <Link href={`/articles/${slug}`} tabIndex={-1}>
        <div className="aspect-h-3 aspect-w-4 relative bg-gray-100 overflow-hidden">
          {imageInfo ? (
            <Image
              src={imageInfo.url}
              alt={imageInfo.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              unoptimized
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 min-h-[200px]">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
      </Link>
      <div className="grid grid-cols-1 gap-3 md:col-span-2">
        <Heading as="h2" className="">
          <Link href={`/articles/${slug}`}>
            {title}
          </Link>
        </Heading>
        <p className="font-serif italic tracking-tighter text-slate-500">
          {dateFormatter.format(date)}
        </p>
        {excerpt && (
          <p className="font-serif leading-relaxed md:text-lg md:leading-relaxed">
            {excerpt}
          </p>
        )}
      </div>
    </li>
  );
}

