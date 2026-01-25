import Image from "next/image";
import Bounded from "@/components/Bounded";
import { RichText } from "@/components/RichText";

const ImageSlice = ({ slice }) => {
  const image = slice.primary.image;

  return (
    <Bounded as="section" size={slice.variation === "wide" ? "widest" : "base"}>
      <figure className="grid grid-cols-1 gap-4">
        {image?.url && (
          <div className="bg-gray-100">
            <Image
              src={image.url}
              alt={image.alt || ""}
              width={image.dimensions?.width || 800}
              height={image.dimensions?.height || 600}
              sizes="100vw"
              className="w-full"
            />
          </div>
        )}
        {slice.primary.caption && (
          <figcaption className="text-center font-serif italic tracking-tight text-slate-500">
            <RichText content={slice.primary.caption} />
          </figcaption>
        )}
      </figure>
    </Bounded>
  );
};

export default ImageSlice;
