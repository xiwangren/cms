"use client";

import Image from "next/image";
import Bounded from "@/components/Bounded";
import { getImageUrl } from "@/lib/strapi";
import { useState } from "react";

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
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!sliderImages || sliderImages.length === 0) {
    console.warn("SliderBlock: No images provided", { id, documentId, files, images });
    return null;
  }

  const currentImage = sliderImages[currentIndex];
  const imageUrl = currentImage?.url ? getImageUrl(currentImage.url) : null;

  if (!imageUrl) return null;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <Bounded as="section" size="widest" className="">
      <div className="relative">
        <div className="bg-gray-100 relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={currentImage.alternativeText || currentImage.caption || ""}
            width={currentImage.width}
            height={currentImage.height}
            sizes="100vw"
            className="w-full h-auto"
            unoptimized={imageUrl.startsWith('http://')}
          />
          {sliderImages.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
        {currentImage.caption && (
          <figcaption className="text-center font-serif italic tracking-tight text-slate-500 mt-4">
            {currentImage.caption}
          </figcaption>
        )}
        {sliderImages.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-slate-800" : "bg-slate-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </Bounded>
  );
}

