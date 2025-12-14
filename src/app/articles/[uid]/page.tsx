import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getArticles, StrapiArticle, getArticleImage } from "@/lib/strapi";
import { Layout } from "@/components/Layout";
import Bounded from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { HorizontalDivider } from "@/components/HorizontalDivider";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import Image from "next/image";
import { mockSettings } from "@/data/mockSettings";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function LatestArticle({ article }: { article: StrapiArticle }) {
  const title = article.attributes?.title || article.title || "";
  const slug = article.attributes?.slug || article.slug || "";
  const publishedAt = article.attributes?.publishedAt || article.publishedAt || article.createdAt;
  const excerpt = article.attributes?.excerpt || article.excerpt || article.attributes?.description || article.description;
  
  const date = new Date(publishedAt);
  const imageInfo = getArticleImage(article);

  return (
    <li className="grid grid-cols-1 items-start gap-6 md:grid-cols-3 md:gap-8">
      <Link href={`/articles/${slug}`} tabIndex={-1}>
        <div className="aspect-h-3 aspect-w-4 relative bg-gray-100">
          {imageInfo ? (
            <Image
              src={imageInfo.url}
              alt={imageInfo.alt}
              fill={true}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400">
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

export async function generateMetadata({ params }: { params: Promise<{ uid: string }> | { uid: string } }) {
  const { uid } = await params;
  const article = await getArticleBySlug(uid);

  if (!article) {
    return {
      title: "文章未找到",
    };
  }

  const title = article.attributes?.title || article.title || "";
  const excerpt = article.attributes?.excerpt || article.excerpt || article.attributes?.description || article.description || "";
  const content = article.attributes?.content || article.content || "";
  
  return {
    title: `${title} | Blog`,
    description: excerpt || content.substring(0, 160),
  };
}

export default async function Page({ params }: { params: Promise<{ uid: string }> | { uid: string } }) {
  const settings = mockSettings
  const { uid } = await params;

  const article = await getArticleBySlug(uid);

  if (!article) {
    notFound();
  }

  // Get latest articles (excluding current article, max 3)
  const allArticles = await getArticles({ pageSize: 10, sort: "publishedAt:desc" });
  const articleSlug = article.attributes?.slug || article.slug || "";
  const latestArticles = allArticles
    .filter((a) => (a.attributes?.slug || a.slug) !== uid)
    .slice(0, 3);

  const publishedAt = article.attributes?.publishedAt || article.publishedAt || article.createdAt;
  const date = new Date(publishedAt);
  
  const title = article.attributes?.title || article.title || "";
  const content = article.attributes?.content || article.content || "";
  const blocks = article.attributes?.blocks || article.blocks;
  
  const imageInfo = getArticleImage(article);

  return (
    <Layout
      withSignUpForm={true}
      withHeaderDivider={true}
      withProfile={false}
      settings={settings}
    >
      <Bounded className="">
        <Link href="/" className="font-semibold tracking-tight text-slate-400 hover:text-slate-600">
          &larr; Back to articles
        </Link>
      </Bounded>
      <article>
        <Bounded className="pb-0">
          <h1 className="mb-3 text-3xl font-semibold tracking-tighter text-slate-800 md:text-4xl">
            {title}
          </h1>
          <p className="font-serif italic tracking-tighter text-slate-500">
            {dateFormatter.format(date)}
          </p>
          {imageInfo && (
            <div className="mt-6 mb-8">
              <Image
                src={imageInfo.url}
                alt={imageInfo.alt}
                width={imageInfo.width || 1200}
                height={imageInfo.height || 600}
                className="w-full h-auto"
                sizes="100vw"
              />
            </div>
          )}
        </Bounded>
        {/* Render blocks using BlockRenderer (similar to Prismic's SliceZone) */}
        {/* Supports: shared.rich-text, shared.quote, shared.media, shared.slider */}
        {blocks && blocks.length > 0 && <BlockRenderer blocks={blocks} />}
        {/* Fallback to content if no blocks */}
        {!blocks && content && (
          <Bounded className="">
            <div className="font-serif leading-relaxed md:text-xl md:leading-relaxed prose prose-slate max-w-none">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </Bounded>
        )}
      </article>
      {latestArticles.length > 0 && (
        <Bounded className="">
          <div className="grid grid-cols-1 justify-items-center gap-16 md:gap-24">
            <HorizontalDivider />
            <div className="w-full">
              <Heading size="2xl" className="mb-10">
                Latest articles
              </Heading>
              <ul className="grid grid-cols-1 gap-12">
                {latestArticles.map((article) => (
                  <LatestArticle key={article.id} article={article} />
                ))}
              </ul>
            </div>
          </div>
        </Bounded>
      )}
    </Layout>
  );
}

export async function generateStaticParams() {
  const articles = await getArticles({ pageSize: 100 });
  return articles.map((article) => ({
    uid: article.attributes?.slug || article.slug,
  }));
}
