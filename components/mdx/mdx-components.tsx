import Image from "next/image";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import { Callout } from "./Callout";
import { CodeBlock } from "./CodeBlock";
import { slugifyHeading } from "@/lib/utils";

function extractTextFromNode(node: unknown): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractTextFromNode).join("");
  }
  if (node && typeof node === "object" && "props" in node) {
    const props = (node as { props?: { children?: unknown } }).props;
    return extractTextFromNode(props?.children);
  }
  return "";
}

export const mdxComponents: MDXComponents = {
  h2: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => {
    const text = extractTextFromNode(children);
    const id = props.id ?? slugifyHeading(text);
    return (
      <h2
        id={id}
        className="scroll-mt-24 text-2xl font-bold tracking-tight text-ink"
        {...props}
      >
        <a href={`#${id}`} className="no-underline hover:underline">
          {children}
        </a>
      </h2>
    );
  },
  h3: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => {
    const text = extractTextFromNode(children);
    const id = props.id ?? slugifyHeading(text);
    return (
      <h3
        id={id}
        className="scroll-mt-24 text-xl font-semibold tracking-tight text-ink"
        {...props}
      >
        <a href={`#${id}`} className="no-underline hover:underline">
          {children}
        </a>
      </h3>
    );
  },
  a: ({ href = "#", children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="font-medium text-accent underline underline-offset-4 hover:text-accent-hover"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className="font-medium text-accent underline underline-offset-4 hover:text-accent-hover"
        {...props}
      >
        {children}
      </Link>
    );
  },
  img: ({ src, alt }) => {
    if (!src || typeof src !== "string") {
      return null;
    }
    return (
      <span className="my-6 block overflow-hidden rounded-lg border border-border bg-surface">
        <Image
          src={src}
          alt={alt ?? "Article illustration"}
          width={960}
          height={540}
          sizes="(max-width: 768px) 100vw, 768px"
          className="h-auto w-full object-cover"
        />
      </span>
    );
  },
  pre: ({ children }) => {
    if (children && typeof children === "object" && "props" in children) {
      const codeElement = children as {
        props?: { className?: string; children?: unknown };
      };
      const className = codeElement.props?.className ?? "";
      const language = className.replace("language-", "") || "text";
      const codeText = extractTextFromNode(codeElement.props?.children);
      return <CodeBlock code={codeText} language={language} />;
    }
    return <pre>{children}</pre>;
  },
  Callout,
  CodeBlock,
};
