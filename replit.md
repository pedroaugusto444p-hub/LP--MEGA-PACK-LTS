# Mega Pack STL

Página de vendas para o Mega Pack STL — o maior pacote de arquivos STL para impressão 3D do Brasil, com +90.000 modelos prontos para imprimir e vender.

## Run & Operate

- `pnpm --filter @workspace/mega-pack-stl run dev` — run the landing page (port assigned by workflow)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS v4
- Animations: Framer Motion
- Icons: Lucide React
- UI Components: shadcn/ui (Radix UI)
- API: Express 5 (api-server artifact)

## Where things live

- `artifacts/mega-pack-stl/src/pages/LandingPage.tsx` — main sales page component
- `artifacts/mega-pack-stl/src/App.tsx` — router
- `artifacts/mega-pack-stl/src/index.css` — theme/CSS variables

## Product

Landing page de vendas para o Mega Pack STL:
- Hero com VSL (vídeo Vimeo)
- Seção de dores e benefícios
- Carrossel de categorias de produtos
- Tabela de comparação (com/sem o pack)
- 11 módulos bônus exclusivos
- Depoimentos de clientes
- Tabela de preços (Básico R$10 / Premium R$29,90)
- FAQ com accordion
- Rodapé com contato

## Checkout URLs

- Pacote Básico: https://checkout.educafacl.shop/VCCL1O8SCNEQ
- Pacote Premium: https://checkout.educafacl.shop/VCCL1O8SCNER
- Upsell Upgrade: https://checkout.educafacl.shop/VCCL1O8SCNF7

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._
