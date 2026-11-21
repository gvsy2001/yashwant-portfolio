import { codeToHtml } from "shiki";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export async function CodeBlock({
  code,
  language = "ts",
  filename,
}: CodeBlockProps) {
  const html = await codeToHtml(code.trimEnd(), {
    lang: language,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });

  return (
    <figure className="not-prose my-6 overflow-hidden rounded-lg border border-border bg-surface">
      {filename && (
        <div className="flex items-center justify-between border-b border-border bg-surface-alt px-4 py-2 font-mono text-xs text-muted">
          <span>{filename}</span>
          <span className="uppercase">{language}</span>
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </figure>
  );
}
