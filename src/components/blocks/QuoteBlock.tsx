import Bounded from "@/components/Bounded";

interface QuoteBlockProps {
  quote?: string;
  source?: string;
  title?: string;
  body?: string;
}

export function QuoteBlock({ quote, source, title, body }: QuoteBlockProps) {
  // 支持两种格式：旧的 quote/source 和新的 title/body
  const quoteText = body || quote;
  const quoteSource = title || source;

  if (!quoteText) return null;

  return (
    <Bounded as="section" size="wide" className="">
      <div className="font-serif text-3xl italic leading-relaxed">
        &ldquo;{quoteText}&rdquo;
        {quoteSource && <> &mdash; {quoteSource}</>}
      </div>
    </Bounded>
  );
}

