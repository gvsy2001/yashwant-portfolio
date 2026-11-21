# G.V.S. Yashwant — Developer Portfolio

Production-ready developer portfolio built with **Next.js 15 (App Router)**, **TypeScript (strict)**, **Tailwind CSS**, **MDX**, **Fuse.js**, and **Web3Forms**.

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Fill in `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_WEB3FORMS_KEY`.
3. Run the development server:
   ```bash
   npm run dev
   ```

## Quality Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Adding Content

### Project Case Study (`/content/projects/*.mdx`)
```mdx
---
title: "Project Title"
slug: "project-slug"
summary: "Concise summary of the system and impact."
date: "2026-06-01"
tags: ["aws", "react"]
stack: ["React.js", "Node.js", "AWS S3"]
featured: true
cover: "/images/project-migration.svg"
repoUrl: "https://github.com"
---

## Problem
...
```

### Blog Post (`/content/blog/*.mdx`)
```mdx
---
title: "Post Title"
slug: "post-slug"
summary: "Concise article summary."
date: "2026-06-01"
tags: ["aws", "architecture"]
draft: false
---

## Introduction
...
```

Frontmatter is validated with **Zod** during build (`lib/schemas.ts` and `lib/content.ts`), and posts with `draft: true` are excluded in production builds.

## Deploying to Vercel

1. Push the repository to GitHub.
2. Import the project into **Vercel**.
3. Configure environment variables in Vercel project settings:
   - `NEXT_PUBLIC_SITE_URL` (e.g., `https://your-domain.vercel.app`)
   - `NEXT_PUBLIC_WEB3FORMS_KEY` (your Web3Forms access key)
4. Trigger deployment (`next build`).
