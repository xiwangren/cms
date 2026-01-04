import { TextBlock } from "./TextBlock";
import { ImageBlock } from "./ImageBlock";
import { QuoteBlock } from "./QuoteBlock";
import { RichTextBlock } from "./RichTextBlock";
import { MediaBlock } from "./MediaBlock";
import { SliderBlock } from "./SliderBlock";
import { StrapiBlock } from "@/lib/strapi";

// 组件映射，类似 Prismic 的 components
export const blockComponents = {
  "shared.rich-text": RichTextBlock,
  "shared.quote": QuoteBlock,
  "shared.media": MediaBlock,
  "shared.slider": SliderBlock,
  // 兼容旧的组件类型
  "blocks.text": TextBlock,
  "blocks.image": ImageBlock,
  "blocks.quote": QuoteBlock,
};

interface BlockRendererProps {
  blocks?: StrapiBlock[];
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block) => {
        const Component = blockComponents[block.__component as keyof typeof blockComponents];
        
        if (!Component) {
          console.warn(`Unknown block type: ${block.__component}`);
          return null;
        }

        // 根据组件类型传递相应的 props
        switch (block.__component) {
          case "shared.rich-text":
            return <RichTextBlock key={block.id} body={block.body} />;
          
          case "shared.quote":
            return <QuoteBlock key={block.id} title={block.title} body={block.body} />;
          
          case "shared.media":
            return <MediaBlock key={block.id} id={block.id} documentId={block.documentId} media={block.media} />;
          
          case "shared.slider":
            return <SliderBlock key={block.id} id={block.id} documentId={block.documentId} files={block.files} images={block.images} />;
          
          // 兼容旧的组件类型
          case "blocks.text":
            return <TextBlock key={block.id} content={block.content} />;
          
          case "blocks.image":
            return (
              <ImageBlock
                key={block.id}
                image={block.image?.data?.attributes || block.image}
                caption={block.caption}
                size={block.size}
              />
            );
          
          case "blocks.quote":
            return (
              <QuoteBlock
                key={block.id}
                quote={block.quote}
                source={block.source}
              />
            );
          
          default:
            return null;
        }
      })}
    </>
  );
}

