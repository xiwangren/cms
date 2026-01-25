'use client';

import { dateFormatter } from "@/lib/dateFormatter";
import { Heading } from "@/components/Heading";
import Image from "next/image";
import Link from "next/link";
import { StrapiArticle, getArticleImage } from "@/lib/strapi";
import { useState } from "react";

export function Article({ article }: { article: StrapiArticle }) {
  // 兼容扁平结构和 attributes 结构

  // console.log(article)
  const title = article.attributes?.title || article.title || "";
  const slug = article.attributes?.slug || article.slug || "";
  const publishedAt = article.attributes?.publishedAt || article.publishedAt || article.createdAt;
  const excerpt = article.attributes?.excerpt || article.excerpt || article.attributes?.description || article.description || "";
  
  const date = new Date(publishedAt);
  
  // 使用统一的图片获取函数
  const imageInfo = getArticleImage(article);
  const [imageError, setImageError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  console.log(imageInfo)
  return (
    <li className="grid grid-cols-1 items-start gap-6 md:grid-cols-3 md:gap-8">
      <Link href={`/articles/${slug}`} tabIndex={-1}>
        <div className="aspect-h-3 aspect-w-4 relative bg-gray-100 overflow-hidden">
          {imageInfo && !imageError ? (
            useFallback ? (
              // 使用普通 img 标签作为后备
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={imageInfo.url}
                alt={imageInfo.alt}
                className="w-full h-full object-cover"
                onError={() => {
                  console.error('[Image] Fallback img also failed:', imageInfo.url);
                  setImageError(true);
                }}
                onLoad={() => {
                  console.log('[Image] Fallback img loaded successfully:', imageInfo.url);
                }}
              />
            ) : (
              // 使用 Next.js Image 组件
              <Image
                src={imageInfo.url}
                alt={imageInfo.alt}
                fill={true}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                unoptimized={imageInfo.url.startsWith('http://')}
                onError={(e) => {
                  console.error('[Image] Next.js Image failed, trying fallback:', imageInfo.url);
                  setUseFallback(true);
                }}
                onLoad={() => {
                  console.log('[Image] Next.js Image loaded successfully:', imageInfo.url);
                }}
              />
            )
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400">
              {imageError && imageInfo && (
                <div className="text-center p-4">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xs">图片加载失败</p>
                  <p className="text-xs mt-1 text-slate-500 break-all px-2">{imageInfo.url}</p>
                </div>
              )}
              {!imageInfo && (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )}
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
