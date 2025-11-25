# React 支持 TS 的结构目录说明

面向初学者的项目结构建议：帮助你在 React + TypeScript 项目中合理组织目录、文件与类型，提升可维护性与可读性。

## 典型目录结构（Vite/CRA 通用）

```text
my-react-app/
├─ src/
│  ├─ app/
│  │  ├─ App.tsx
│  │  ├─ routes.tsx
│  │  └─ store.ts (可选：Redux/Zustand 等)
│  ├─ pages/
│  │  ├─ Home.tsx
│  │  └─ About.tsx
│  ├─ features/
│  │  └─ todo/
│  │     ├─ components/
│  │     │  └─ TodoItem.tsx
│  │     ├─ hooks/
│  │     │  └─ useTodos.ts
│  │     ├─ types.ts
│  │     └─ index.ts
│  ├─ components/
│  │  ├─ Button/
│  │  │  ├─ Button.tsx
│  │  │  └─ Button.module.css
│  │  └─ Header.tsx
│  ├─ hooks/
│  │  └─ useToggle.ts
│  ├─ services/
│  │  ├─ http.ts
│  │  └─ api.ts
│  ├─ utils/
│  │  └─ format.ts
│  ├─ types/
│  │  ├─ api.ts
│  │  ├─ env.d.ts
│  │  └─ index.ts
│  ├─ assets/
│  │  ├─ images/
│  │  │  └─ logo.png
│  │  └─ icons/
│  ├─ styles/
│  │  └─ globals.css
│  ├─ main.tsx
│  └─ vite-env.d.ts
├─ tsconfig.json
├─ package.json
└─ vite.config.ts / webpack.config.js
```

## 目录职责说明
- `app/`：应用入口与顶层组织（`App.tsx`、路由、全局状态）。
- `pages/`：路由页面组件（页面级，通常作为路由终点）。
- `features/`：按业务域分组的功能模块（组件、Hook、类型就近维护）。
- `components/`：可复用的通用 UI 组件（与业务无关）。
- `hooks/`：通用自定义 Hook（共享逻辑，尽量无业务耦合）。
- `services/`：数据访问层（HTTP 客户端、接口封装、SDK 适配）。
- `utils/`：纯函数工具库（格式化、校验、日期处理等）。
- `types/`：类型集合与对外导出（集中管理全局/跨模块类型）。
- `assets/`：静态资源（图片、图标、字体）。
- `styles/`：全局样式与主题（CSS、Sass、CSS Modules）。
- `vite-env.d.ts`/`env.d.ts`：资源与环境的声明文件（`declare module '*.png'` 等）。

### 三斜线指令与环境类型
- CRA 项目默认包含 `react-app-env.d.ts`：

```typescript
/// <reference types="react-scripts" />
```

  这条指令让 TS 自动加载 `react-scripts` 提供的类型（React/ReactDOM/Node 以及资源导入类型）。

- Vite 项目通常包含 `vite-env.d.ts`：

```typescript
/// <reference types="vite/client" />
```

  这会加载 Vite 的客户端类型定义（如 `import.meta.env` 等）。

> 若需扩展资源类型（如 `*.svg` 组件化、`*.module.css`），可在 `src/types/env.d.ts` 中补充 `declare module` 声明。

## 文件命名与类型约定
- 组件文件使用 `.tsx`，逻辑/工具使用 `.ts`。
- 组件命名使用 PascalCase（如 `Button.tsx`），函数/变量使用 camelCase。
- Props 类型就近定义且导出：

```typescript
export type ButtonProps = {
  onClick?: () => void
  children: React.ReactNode
}
```

- 业务模块内的公共类型放在 `features/<domain>/types.ts`，可通过 `index.ts` 统一导出。
- 全局共享类型放在 `src/types/`，并通过 `src/types/index.ts` 作为入口。

## 路由与页面组织（示例）

```typescript
// src/app/routes.tsx
import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> }
])
```

## 服务层与类型（示例）

```typescript
// src/services/http.ts
export async function http<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init)
  if (!res.ok) throw new Error(res.statusText)
  return res.json() as Promise<T>
}

// src/services/api.ts
import { http } from './http'
import type { User } from '../types/api'

export function getUser(id: number) {
  return http<User>(`/api/users/${id}`)
}
```

## 别名与路径（提升可读性）
- 在 `tsconfig.json` 设置：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```

- 在构建器中同步：Vite 使用 `resolve.alias = { '@': '/src' }`；Webpack 使用 `resolve.alias`。

## 测试与质量保障（可选但推荐）
- 测试：使用 Vitest/Jest；在 `src` 或 `tests` 下维护 `.test.ts(x)`。
- Lint：ESLint + `@typescript-eslint`；Prettier 用于一致的格式化。
- 类型检查：在 CI 中运行 `tsc --noEmit` 保证类型正确。

## 常见变体与注意事项
- Next.js：目录结构有所不同（`app/` 或 `pages/`）；TS 支持开箱即用。
- CSS Modules：建议就近放在组件目录，命名 `*.module.css`。
- 声明文件：为资源与全局变量撰写 `env.d.ts`，避免导入报错。
- 渐进式类型化：从页面与 Props 开始，逐步在服务层与工具层完善类型。

遵循以上结构与约定，你的 React + TypeScript 项目会更清晰、可维护，并且更易于团队协作与长期迭代。