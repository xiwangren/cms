import Image from "next/image";
import Bounded from "@/components/Bounded";
import { getImageUrl } from "@/lib/strapi";

interface SliderImage {
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
}

interface SliderBlockProps {
  id?: number;
  documentId?: string;
  files?: SliderImage[];
  images?: SliderImage[];
}

export function SliderBlock({ files, images, id, documentId }: SliderBlockProps) {
  const sliderImages = files || images || [];

  if (!sliderImages || sliderImages.length === 0) {
    console.warn("SliderBlock: No images provided", { id, documentId, files, images });
    return null;
  }

  // For now, just show the first image to avoid React version conflicts
  // TODO: Add client-side interactivity later
  const firstImage = sliderImages[0];
  const imageUrl = firstImage?.url ? getImageUrl(firstImage.url) : null;

  if (!imageUrl) return null;

  return (
    <Bounded as="section" size="widest" className="">
      <div className="relative">
        <div className="bg-gray-100 relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={firstImage.alternativeText || firstImage.caption || ""}
            width={firstImage.width}
            height={firstImage.height}
            sizes="100vw"
            className="w-full h-auto"
            unoptimized={imageUrl.startsWith('http://')}
          />
        </div>
        {firstImage.caption && (
          <figcaption className="text-center font-serif italic tracking-tight text-slate-500 mt-4">
            {firstImage.caption}
          </figcaption>
        )}
        {sliderImages.length > 1 && (
          <p className="text-center text-sm text-slate-400 mt-2">
            Image 1 of {sliderImages.length}
          </p>
        )}
      </div>
    </Bounded>
  );
}

