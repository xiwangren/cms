import Bounded from "@/components/Bounded";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeCodeTitles from "rehype-code-titles";

interface RichTextBlockProps {
  body: string;
}

// MDX 组件配置
const components = {
  // 代码块 - rehype-highlight 会添加高亮类
  pre: ({ children, ...props }: any) => (
    <pre className="rounded-lg overflow-x-auto bg-slate-900 p-4 my-4" {...props}>
      {children}
    </pre>
  ),
  code: ({ className, children, ...props }: any) => {
    // 检查是否是代码块（有 language 类）
    const isCodeBlock = className && className.startsWith('language-');
    
    if (isCodeBlock) {
      // 代码块 - rehype-highlight 已经添加了高亮
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    
    // 行内代码
    return (
      <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800" {...props}>
        {children}
      </code>
    );
  },
  // 标题样式增强
  h1: ({ children }: any) => (
    <h1 className="text-4xl font-bold mt-8 mb-4 text-slate-800">{children}</h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-3xl font-bold mt-6 mb-3 text-slate-800">{children}</h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-2xl font-bold mt-4 mb-2 text-slate-800">{children}</h3>
  ),
  // 段落
  p: ({ children }: any) => (
    <p className="mb-4 leading-relaxed">{children}</p>
  ),
  // 列表
  ul: ({ children }: any) => (
    <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
  ),
  li: ({ children }: any) => (
    <li className="ml-4">{children}</li>
  ),
  // 链接
  a: ({ href, children }: any) => (
    <a href={href} className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  // 引用
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-slate-300 pl-4 italic my-4 text-slate-600">
      {children}
    </blockquote>
  ),
  // 代码块（行内）
  inlineCode: ({ children }: any) => (
    <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800">
      {children}
    </code>
  ),
  // 水平线
  hr: () => <hr className="my-8 border-slate-300" />,
  // 表格
  table: ({ children }: any) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border-collapse border border-slate-300">
        {children}
      </table>
    </div>
  ),
  th: ({ children }: any) => (
    <th className="border border-slate-300 px-4 py-2 bg-slate-100 font-bold text-left">
      {children}
    </th>
  ),
  td: ({ children }: any) => (
    <td className="border border-slate-300 px-4 py-2">
      {children}
    </td>
  ),
};

export function RichTextBlock({ body }: RichTextBlockProps) {
  if (!body) return null;

  // 检查是否已经是 HTML（向后兼容）
  if (body.includes('<') && body.includes('>') && !body.includes('```')) {
    return (
      <Bounded as="section" className="">
        <div className="font-serif leading-relaxed md:text-xl md:leading-relaxed prose prose-slate max-w-none">
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </div>
      </Bounded>
    );
  }

  return (
    <Bounded as="section" className="">
      <div className="font-serif leading-relaxed md:text-xl md:leading-relaxed prose prose-slate max-w-none">
        {/* 导入 highlight.js 的 CSS */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
        />
        <MDXRemote 
          source={body} 
          options={{
            mdxOptions: {
              rehypePlugins: [
                rehypeCodeTitles,
                [rehypeHighlight, { 
                  ignoreMissing: true,
                }],
              ],
            },
          }}
          components={components} 
        />
      </div>
    </Bounded>
  );
}

