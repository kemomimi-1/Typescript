# 在创建 React 时使用 TS 以及项目开发中安装 TS

面向初学者的完整指南：如何在新建 React 项目时选择 TypeScript 模板，以及如何在现有 React 项目中逐步安装与启用 TypeScript。

## 新建项目：使用 Vite 的 React + TS 模板（推荐）
- 创建项目：

```bash
npm create vite@latest my-react-app -- --template react-ts
cd my-react-app
npm install
npm run dev
```

- 为什么选 Vite：启动快、配置简单、天然支持 TypeScript 与现代 ESM。
- 目录要点：`src/main.tsx`、`src/App.tsx`、`tsconfig.json` 已为你准备好，直接写 TS/TSX 即可。

## 备选方案：使用 Create React App 的 TS 模板
> CRA 已不再强烈推荐，但学习或老项目迁移时仍可参考。

```bash
npx create-react-app my-react-app --template typescript
cd my-react-app
npm start
```

## 在“已有 React 项目”中安装并启用 TypeScript
适用于你已有基于 Webpack/Vite 的 React 项目（原本是 JS）。

### 1. 安装依赖

```bash
npm install --save-dev typescript @types/react @types/react-dom
```

### 2. 创建或完善 tsconfig.json
- 快速初始化：`npx tsc --init`
- 推荐配置（适配 React + Vite/Webpack）：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "jsx": "react-jsx",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "lib": ["ES2020", "DOM"]
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

### 3. 迁移源码到 TS/TSX
- 组件文件改为 `.tsx`（如 `App.tsx`、`Button.tsx`）。
- 纯逻辑/工具改为 `.ts`（如 `utils/math.ts`）。
- 入口文件改为 `.tsx`（如 `main.tsx`）。

### 4. 资源声明（图片、样式、SVG 等）
在 `src/` 下新增 `env.d.ts` 或 `vite-env.d.ts`：

```typescript
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.gif'
declare module '*.css'
declare module '*.module.css'
```

### 5. 常见构建器支持
- Vite：开箱即用，无需额外 loader。
- Webpack：安装 `ts-loader` 或 `babel-loader` 配合 `@babel/preset-typescript`。

### 6. 运行与类型检查
- 启动开发服务器：`npm run dev` 或 `npm start`。
- 仅类型检查（不生成 JS）：`npx tsc --noEmit`。

## 在 React 代码中书写类型的入门示例
- 组件 Props：

```typescript
type ButtonProps = {
  onClick?: () => void
  children: React.ReactNode
}

export function Button({ onClick, children }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>
}
```

- 自定义 Hook：

```typescript
export function useToggle(initial = false) {
  const [on, setOn] = React.useState<boolean>(initial)
  const toggle = () => setOn(v => !v)
  return { on, toggle }
}
```

## 常见问题与排错
- JSX 报错：检查 `tsconfig.json` 的 `jsx: "react-jsx"` 与 `lib` 包含 `DOM`。
- 找不到类型：确认已安装 `@types/react`、`@types/react-dom`。
- 资源导入失败：为图片/CSS 模块添加声明文件。
- 别名无效：在构建器中同步配置路径别名（Vite 的 `resolve.alias`，Webpack 的 `alias`）。
- 联合/可选类型不熟：从 Props 开始练习，逐步在 Hook/服务层完善类型。

掌握以上流程后，你可以在任何 React 项目中顺利启用 TypeScript，并享受类型带来的开发体验与安全性。

## CRA 的 react-app-env.d.ts 与三斜线指令（reference types）
- 在使用 Create React App（CRA）时，项目会默认包含 `react-app-env.d.ts`，其内容通常为：

```typescript
/// <reference types="react-scripts" />
```

- 作用说明：
  - 告诉 TypeScript 自动加载 `react-scripts` 提供的类型声明。
  - 包含 React、ReactDOM、Node 等环境类型。
  - 包含资源导入的类型（图片、SVG、样式模块），允许在代码中 `import './index.css'`、`import logo from './logo.svg'` 等。
- 加载机制：只要该 `.d.ts` 文件位于编译器的 `include` 范围内（由 `tsconfig.json` 控制），TS 就会自动生效。
- 对比 Vite：在 Vite 项目中通常使用 `vite-env.d.ts`：

```typescript
/// <reference types="vite/client" />
```

- 如果你需要额外的资源类型（如 `*.png`、`*.module.css`），仍可在 `env.d.ts` 中手动补充 `declare module '*.png'` 等声明，以增强类型体验。