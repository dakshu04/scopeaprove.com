import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import { ArrowRight, CheckCircle2, Download, FileText, Send } from "lucide-react";
import Link from "next/link";

type ChildrenProps = { children: ReactNode };

export const articleMdxComponents: MDXComponents = {
  h2: ({ children }) => <h2 className="text-2xl font-semibold tracking-[-0.035em] text-[#1b1c18] sm:text-3xl">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-6 font-semibold text-[#272925]">{children}</h3>,
  p: ({ children }) => <p className="mt-4 text-[15px] leading-7 text-[#5e615b]">{children}</p>,
  ul: ({ children }) => <ul className="mt-5 space-y-3 text-sm leading-6 text-[#5e615b]">{children}</ul>,
  li: ({ children }) => <li>{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-[#272925]">{children}</strong>,
};

export function MdxArticle({ children }: ChildrenProps) {
  return <article className="mx-auto max-w-[920px] px-5 sm:px-6">{children}</article>;
}

export function MdxSection({ children }: ChildrenProps) {
  return <section className="border-b border-[#e2e4de] py-10 last:border-0 sm:py-14">{children}</section>;
}

export function MdxCallout({ children }: ChildrenProps) {
  return <div className="rounded-2xl border border-[#cdded6] bg-[#eef7f3] p-5 [&>p:first-child]:mt-0 [&>p]:text-base [&>p]:text-[#294b40] sm:p-7">{children}</div>;
}

type MdxActionsProps = {
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
};

export function MdxActions({ primaryHref, primaryLabel, secondaryHref, secondaryLabel }: MdxActionsProps) {
  return (
    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
      <a className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#176b55] px-4 py-2.5 text-sm font-semibold text-white" download href={primaryHref}>
        <Download aria-hidden="true" className="size-4" />
        {primaryLabel}
      </a>
      <Link className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#cbd8d2] bg-white px-4 py-2.5 text-sm font-semibold text-[#214d40]" href={secondaryHref}>
        {secondaryLabel}
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </div>
  );
}

export function MdxTemplate({ children }: ChildrenProps) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-[#dcded8] bg-white shadow-[0_14px_38px_rgba(31,49,42,0.06)]">
      <div className="flex items-center gap-2 border-b border-[#e5e6e1] bg-[#f5f6f2] px-5 py-3 text-xs font-semibold text-[#4f534d]">
        <FileText aria-hidden="true" className="size-4 text-[#176b55]" />
        Freelance client change request
      </div>
      <pre className="overflow-x-auto whitespace-pre-wrap p-5 font-sans text-sm leading-7 text-[#454842] sm:p-7">{children}</pre>
    </div>
  );
}

export function MdxCardGrid({ children }: ChildrenProps) {
  return <div className="mt-6 grid gap-3 sm:grid-cols-2">{children}</div>;
}

export function MdxCard({ description, title }: { description: string; title: string }) {
  return (
    <div className="rounded-xl border border-[#e1e2dc] bg-white p-4">
      <h3 className="flex items-center gap-2 font-semibold">
        <CheckCircle2 aria-hidden="true" className="size-4 text-[#176b55]" />
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-[#63665f]">{description}</p>
    </div>
  );
}

export function MdxDefinitionGrid({ children }: ChildrenProps) {
  return <dl className="mt-6 grid gap-4 rounded-2xl border border-[#dfe1db] bg-white p-5 text-sm sm:grid-cols-2 sm:p-7">{children}</dl>;
}

export function MdxDefinition({ accent = false, term, value }: { accent?: boolean; term: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[#85877f]">{term}</dt>
      <dd className={`mt-2 ${accent ? "text-lg font-semibold text-[#176b55]" : "leading-6"}`}>{value}</dd>
    </div>
  );
}

export function MdxEmail({ children }: ChildrenProps) {
  return <div className="mt-6 rounded-2xl border border-[#dfe1db] bg-[#f7f8f5] p-5 text-sm leading-7 text-[#4f524c] [&>p:first-child]:mt-0 sm:p-7">{children}</div>;
}

type FaqItem = { answer: string; question: string };

export function MdxFaqList({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="mt-6 space-y-4">
      {items.map(({ answer, question }) => (
        <div className="rounded-xl border border-[#e1e2dc] bg-white p-5" key={question}>
          <h3 className="font-semibold">{question}</h3>
          <p className="mt-2 text-sm leading-6 text-[#62645e]">{answer}</p>
        </div>
      ))}
    </div>
  );
}

export function MdxFinalCta({ description, title }: { description: string; title: string }) {
  return (
    <section className="py-12 sm:py-16">
      <div className="overflow-hidden rounded-3xl bg-[#173e33] p-6 text-white shadow-[0_24px_65px_rgba(23,62,51,0.18)] sm:p-9">
        <Send aria-hidden="true" className="size-5 text-[#a9e5cc]" />
        <h2 className="mt-5 text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">{title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">{description}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#a9e5cc] px-4 py-2.5 text-sm font-semibold text-[#173e33]" href="/sign-in">
            Create your free request
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
          <Link className="inline-flex items-center justify-center rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold text-white" href="/guides/scope-creep">
            Read the scope creep guide
          </Link>
        </div>
      </div>
    </section>
  );
}
