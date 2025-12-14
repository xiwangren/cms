import Bounded from "@/components/Bounded";
import { RichText } from "@/components/RichText";

interface TextBlockProps {
  content: string;
}

export function TextBlock({ content }: TextBlockProps) {
  if (!content) return null;

  return (
    <Bounded as="section">
      <div className="font-serif leading-relaxed md:text-xl md:leading-relaxed">
        <RichText content={content} />
      </div>
    </Bounded>
  );
}

