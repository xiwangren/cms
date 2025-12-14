/**
 * Rich Text Component
 * Renders HTML content from Strapi rich text fields
 */

interface RichTextProps {
  content: string;
  className?: string;
}

export function RichText({ content, className = "" }: RichTextProps) {
  return (
    <div
      className={`prose prose-slate max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

