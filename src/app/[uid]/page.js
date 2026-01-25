import { notFound } from "next/navigation";
import { Layout } from "@/components/Layout";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { mockSettings } from "@/data/mockSettings";

// 模拟页面数据
const mockPages = {
  about: {
    uid: "about",
    data: {
      title: "About Us",
      meta_title: "About Us | Blog",
      meta_description: "Learn more about our blog.",
      meta_image: { url: "https://example.com/about.jpg" },
      slices: [
        {
          __component: "shared.rich-text",
          id: "about-1",
          body: "## About Us\n\nWe are a team of passionate developers."
        }
      ]
    }
  },
  contact: {
    uid: "contact",
    data: {
      title: "Contact Us",
      meta_title: "Contact Us | Blog",
      meta_description: "Get in touch with us.",
      meta_image: { url: "https://example.com/contact.jpg" },
      slices: [
        {
          __component: "shared.rich-text",
          id: "contact-1",
          body: "## Contact Us\n\nFeel free to reach out to us at contact@example.com."
        }
      ]
    }
  }
};

export async function generateMetadata({ params }) {
  const { uid } = await params;
  const page = mockPages[uid];

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: `${page.data.title} | ${mockSettings.data.name}`,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title,
      images: [
        {
          url: page.data.meta_image.url,
        },
      ],
    },
  };
}

export default async function Page({ params }) {
  const { uid } = await params;
  const page = mockPages[uid];

  if (!page) {
    notFound();
  }

  const settings = mockSettings;

  return (
    <Layout settings={settings}>
      <div className="container mx-auto px-4 py-8">
        <BlockRenderer blocks={page.data.slices} />
      </div>
    </Layout>
  );
}

export async function generateStaticParams() {
  return Object.keys(mockPages).map((uid) => ({ uid }));
}
