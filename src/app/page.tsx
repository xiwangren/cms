import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Bounded from "@/components/Bounded";
import { Article } from "@/components/Article";
// import { ArticleSimple } from "@/components/ArticleSimple"; // 如果 Article 有问题，取消注释这行并使用 ArticleSimple
import { mockSettings } from "@/data/mockSettings";
import { getArticles, StrapiArticle } from "@/lib/strapi";

export async function generateMetadata() {
  const settings = mockSettings;
  return {
    title: settings.data.name || "Blog",
  };
}

export default async function Index() {
  let articles: StrapiArticle[] = [];
  let errorMessage: string | null = null;
  
  try {
    console.log('Fetching articles...');
    articles = await getArticles({ pageSize: 10, sort: "publishedAt:desc" });
    console.log(articles)
  } catch (error: any) {
    console.error("Failed to load articles:", error);
    errorMessage = error?.message || "加载文章失败";
    // 页面仍然可以渲染，只是没有文章
  }

  const settings = mockSettings;
  const { withProfile, withHeaderDivider, withSignUpForm } = settings.data;

  return (
    <div className="text-slate-700">
      <Header
        withProfile={withProfile}
        withDivider={withHeaderDivider}
        settings={settings}
      />
      <main>
        <Bounded size="widest" className="">
          {
            <ul className="grid grid-cols-1 gap-16">
              {articles.map((article) => (
                <Article key={article.id} article={article} />
                // 如果图片不显示，尝试使用 ArticleSimple：
                // <ArticleSimple key={article.id} article={article} />
              ))}
            </ul>
          }
        </Bounded>
      </main>
      <Footer withSignUpForm={withSignUpForm} settings={settings} />
    </div>
  );
}
