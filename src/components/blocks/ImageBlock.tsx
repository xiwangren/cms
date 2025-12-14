import Image from "next/image";
import Bounded from "@/components/Bounded";
import { RichText } from "@/components/RichText";

interface ImageBlockProps {
  image: {
    url: string;
    width: number;
    height: number;
    alternativeText?: string;
  };
  caption?: string;
  size?: "base" | "wide" | "widest";
}

export function ImageBlock({ image, caption, size = "base" }: ImageBlockProps) {
  if (!image?.url) return null;

  const sizeMap = {
    base: "base",
    wide: "wide",
    widest: "widest",
  };

  return (
    <Bounded as="section" size={sizeMap[size]}>
      <figure className="grid grid-cols-1 gap-4">
        <div className="bg-gray-100">
          <Image
            src={image.url.startsWith('http') ? image.url : `${process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace('/api', '')}${image.url}`}
            alt={image.alternativeText || ""}
            width={image.width}
            height={image.height}
            sizes="100vw"
            className="w-full"
          />
        </div>
        {caption && (
          <figcaption className="text-center font-serif italic tracking-tight text-slate-500">
            <RichText content={caption} />
          </figcaption>
        )}
      </figure>
    </Bounded>
  );
}

