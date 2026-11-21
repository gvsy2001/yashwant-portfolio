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
   - `NEXT_PUBLIC_SITE_URL` (e.g., `https://your-domain.vercel.app`)
   - `NEXT_PUBLIC_WEB3FORMS_KEY` (your Web3Forms access key)
4. Trigger deployment (`next build`).
