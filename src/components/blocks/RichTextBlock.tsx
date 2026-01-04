import Bounded from "@/components/Bounded";

interface RichTextBlockProps {
  body: string;
}



// 简单的 Markdown 转换函数（临时解决方案）
function parseSimpleMarkdown(text: string): string {
  return text
    // 标题
    .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold mt-4 mb-2 text-slate-800">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold mt-6 mb-3 text-slate-800">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold mt-8 mb-4 text-slate-800">$1</h1>')
    // 粗体和斜体
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // 链接
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">$1</a>')
    // 段落（换行符转换）
    .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed">')
    .replace(/\n/g, '<br>');
}

export function RichTextBlock({ body }: RichTextBlockProps) {
  if (!body) return null;

  // 检查是否已经是 HTML
  if (body.includes('<') && body.includes('>')) {
    return (
      <Bounded as="section" className="">
        <div className="font-serif leading-relaxed md:text-xl md:leading-relaxed prose prose-slate max-w-none">
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </div>
      </Bounded>
    );
  }

  // 简单的 Markdown 处理（避免使用 MDXRemote）
  const htmlContent = `<p class="mb-4 leading-relaxed">${parseSimpleMarkdown(body)}</p>`;

  return (
    <Bounded as="section" className="">
      <div className="font-serif leading-relaxed md:text-xl md:leading-relaxed prose prose-slate max-w-none">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </Bounded>
  );
}

