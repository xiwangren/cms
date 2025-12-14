import Image from "next/image";
import Bounded from "@/components/Bounded";
import { getImageUrl } from "@/lib/strapi";

interface MediaBlockProps {
  id?: number;
  documentId?: string;
  media?: {
    id: number;
    documentId?: string;
    name?: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats?: {
      thumbnail?: { url: string; width: number; height: number };
      large?: { url: string; width: number; height: number };
      medium?: { url: string; width: number; height: number };
      small?: { url: string; width: number; height: number };
    };
    url: string;
  };
}

export function MediaBlock({ media, id, documentId }: MediaBlockProps) {
  // 如果只有 id，可能需要从 Strapi 获取完整数据
  // 目前先处理已提供的 media 数据
  if (!media?.url) {
    console.warn("MediaBlock: No media data provided", { id, documentId, media });
    return null;
  }

  const imageUrl = getImageUrl(media.url);
  if (!imageUrl) return null;

  return (
    <Bounded as="section" size="widest" className="">
      <figure className="grid grid-cols-1 gap-4">
        <div className="bg-gray-100">
          <Image
            src={imageUrl}
            alt={media.alternativeText || media.caption || ""}
            width={media.width}
            height={media.height}
            sizes="100vw"
            className="w-full h-auto"
            unoptimized={imageUrl.startsWith('http://')}
          />
        </div>
        {media.caption && (
          <figcaption className="text-center font-serif italic tracking-tight text-slate-500">
            {media.caption}
          </figcaption>
        )}
      </figure>
    </Bounded>
  );
}

