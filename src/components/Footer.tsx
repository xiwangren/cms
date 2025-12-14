import Link from "next/link";

import Bounded from "./Bounded";
import { Heading } from "./Heading";
import { HorizontalDivider } from "./HorizontalDivider";


function SignUpForm({ settings }: { settings: any }) {
  console.log('newsletterDescription:', settings.data.newsletterDescription); 
  return (
    <div className="px-4">
      <form
        action="/api/sign-up"
        method="post"
        className="grid w-full max-w-xl grid-cols-1 gap-6"
      >
  
        {settings.data.newsletterDescription?.length > 0 && (
          <div className="text-center font-serif tracking-tight text-slate-500">
            {settings.data.newsletterDescription.map((block, index) => {
              // 根据富文本块的类型渲染不同元素
              switch (block.type) {
                case "heading1":
                  // 对应原 PrismicRichText 的 heading1 组件（h2 标题）
                  return (
                    <h2
                      key={index}
                      className="mb-4 last:mb-0"
                    >
                      {block.text}
                    </h2>
                  );
                case "paragraph":
                  // 对应原 PrismicRichText 的 paragraph 组件（斜体段落）
                  return (
                    <p
                      key={index}
                      className="mb-4 italic last:mb-0"
                    >
                      {block.text}
                    </p>
                  );
                default:
                  // 忽略未处理的块类型（如列表、图片等，可根据需求扩展）
                  return null;
              }
            })}
          </div>
        )}

        <div className="grid grid-cols-1 gap-2">
          <div className="relative">
            <label>
              <span className="sr-only">Email address</span>
              <input
                name="email"
                type="email"
                placeholder="jane.doe@example.com"
                required={true}
                className="w-full rounded-none border-b border-slate-200 py-3 pl-3 pr-10 text-slate-800 placeholder-slate-400"
              />
            </label>
            <button
              type="submit"
              className="absolute bottom-0 right-0 top-0 flex items-center justify-center px-3 text-2xl text-slate-400"
            >
              <span className="sr-only">Submit</span>
              <span aria-hidden={true}>&rarr;</span>
            </button>
          </div>

          {/* 修改后的 newsletterDisclaimer 部分 */}
          {settings.data.newsletterDisclaimer?.length > 0 && (
            <div className="text-center font-serif tracking-tight text-slate-500">
              <PrismicRichText
                field={settings.data.newsletterDisclaimer}
                components={{
                  paragraph: ({ children }) => (
                    <p className="mb-4 italic last:mb-0">{children}</p>
                  ),
                }}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export function Footer({ withSignUpForm = true, settings }) {
  return (
    <Bounded as="footer">
      <div className="grid grid-cols-1 justify-items-center gap-24">
        <HorizontalDivider />
        {withSignUpForm && <SignUpForm settings={settings} />}
        <div className="mx-auto w-full max-w-3xl text-center text-xs font-semibold tracking-tight text-slate-500">
          Proudly published using{" "}
          <Link href="https://prismic.io" className="text-slate-700">
            Prismic
          </Link>
        </div>
      </div>
    </Bounded>
  );
}
