# tsconfig.json 配置说明（初学者友好版）

这是一份帮你从零理解 `tsconfig.json` 的学习笔记，按“是什么—为什么—怎么配—常见坑”的节奏展开。哼~认真读完就能少踩很多坑喵。

## 什么是 `tsconfig.json`
- TypeScript 项目的配置文件，告诉编译器如何解析、检查和输出代码。
- 通过它可以启用严格模式、设置模块类型、路径别名、生成声明文件等。
- 在项目根目录使用 `npx tsc --init` 可以快速生成基础配置。

## 快速开始（入门必做）
- 在项目根执行：
  ```bash
  npx tsc --init
  ```
- 生成的文件里有很多注释，先保留；逐步打开严格选项并按项目需求调整。

## 文件结构总览
- `compilerOptions`: 核心编译选项（绝大多数配置都在这里）。
- `include`: 指定参与编译的文件或目录（如 `src`）。
- `exclude`: 排除不参与编译的目录（如 `node_modules`）。
- `extends`: 继承其他 tsconfig（常用于多包或共享基础配置）。
- `references`: 项目引用（多包/Monorepo 中的依赖编译）。

## 核心字段详解（常用且重要）
- `target`: 输出 JS 的语法版本。
  - 常用值：`ES2017`、`ES2020`、`ES2022`、`ESNext`
  - 选择建议：现代前端/Node 18+ 用 `ES2020` 及以上；旧浏览器需更低。
- `module`: 模块系统（打包器/运行环境如何处理 `import`）。
  - 前端 + Vite/Webpack：`ESNext`
  - Node 传统 CJS：`CommonJS`
  - Node ESM：`NodeNext`
- `moduleResolution`: 模块解析策略。
  - 前端：`node`
  - Node ESM：`nodenext`（或 `NodeNext`）
- `lib`: 指定可用的内置 API 类型集合。
  - 前端：`["DOM", "ES2020"]`
  - Node：`["ES2020"]`
- `jsx`: React JSX 编译策略。
  - React 17+ 新转译：`react-jsx`
  - 老转译：`react`
- `strict`: 开启严格类型检查（强烈建议）。
  - 包含 `noImplicitAny`、`strictNullChecks` 等在内的严格选项集合。
- `esModuleInterop`: 允许 `default import` 更好兼容 CJS 包；前端常开。
- `allowSyntheticDefaultImports`: 与上类似的兼容开关，打包器环境常开。
- `skipLibCheck`: 跳过第三方声明文件的检查，减少编译报错与时间（入门建议开）。
- `sourceMap`: 生成 `.map` 文件以便调试。
- `outDir` / `rootDir`: 输出/输入目录控制（库项目与 Node 项目常用）。
- `baseUrl` / `paths`: 路径别名（提升可读性）。
  ```json
  {
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@/*": ["src/*"]
      }
    }
  }
  ```
  - 注意：打包器也要同步配置别名（Vite 的 `resolve.alias` / Webpack 的 `resolve.alias`）。
- `resolveJsonModule`: 允许 `import json` 并提供类型。
- `isolatedModules`: 每个文件独立编译（配合 Babel/ESBuild/Vite 建议开启）。
- `useDefineForClassFields`: 类字段的语义（与 Babel/TS 行为对齐，现代前端建议开）。
- `declaration` / `declarationMap`: 生成 `.d.ts` 和声明映射（写库或 SDK 时开启）。
- `types` / `typeRoots`: 控制全局类型包的加载位置与范围（如 `@types/node`）。
- `downlevelIteration`: 让较低 `target` 时迭代器语义更正确（旧环境需要）。
- `forceConsistentCasingInFileNames`: 大小写一致性（跨平台友好）。
- `noEmit` / `noEmitOnError`: 只做类型检查或在报错时不输出文件（前端项目常用 `noEmit`）。

## include / exclude / extends / references 说明
- `include`: 只编译这些文件（如 `"include": ["src"]`）。
- `exclude`: 从编译中排除（如 `node_modules`、`dist`）。
- `extends`: 从基础配置继承，如：
  ```json
  {
    "extends": "./tsconfig.base.json",
    "compilerOptions": { "strict": true },
    "include": ["src"]
  }
  ```
- `references`: 多包工程中建立编译依赖：
  ```json
  {
    "files": [],
    "references": [{ "path": "../utils" }, { "path": "../core" }]
  }
  ```

## 常用场景模板（复制就能用）
- 前端（Vite + React）：
  ```json
  {
    "compilerOptions": {
      "target": "ES2020",
      "module": "ESNext",
      "jsx": "react-jsx",
      "lib": ["ES2020", "DOM"],
      "moduleResolution": "node",
      "strict": true,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "baseUrl": ".",
      "paths": { "@/*": ["src/*"] }
    },
    "include": ["src"],
    "exclude": ["node_modules", "dist"]
  }
  ```
- Node 18+（ESM）：
  ```json
  {
    "compilerOptions": {
      "target": "ES2022",
      "module": "NodeNext",
      "moduleResolution": "nodenext",
      "strict": true,
      "outDir": "dist",
      "esModuleInterop": true,
      "skipLibCheck": true
    },
    "include": ["src"],
    "exclude": ["node_modules"]
  }
  ```
- 库/SDK（生成声明文件）：
  ```json
  {
    "compilerOptions": {
      "target": "ES2020",
      "module": "ESNext",
      "declaration": true,
      "declarationMap": true,
      "outDir": "dist",
      "strict": true,
      "esModuleInterop": true,
      "skipLibCheck": true
    },
    "include": ["src"],
    "exclude": ["node_modules", "test", "__tests__"]
  }
  ```

## 常见问题与排错清单
- 路径别名不起作用：除了 `tsconfig.json`，还要在打包器配置别名。
- JSX 报错：检查 `jsx: "react-jsx"`，并确保 `lib` 包含 `DOM`。
- 找不到类型：安装 `@types/react`、`@types/react-dom` 或对应库的 `@types/*`。
- 只想类型检查不输出：设置 `"noEmit": true`，搭配 `npx tsc --noEmit`。
- Node 环境报模块错误：确认 `module` 与 `moduleResolution` 是否匹配（CJS/ESM）。
- 第三方包类型报错很多：临时开启 `skipLibCheck`，再逐步定位具体问题。

## 学习与实践建议
- 从开启 `strict` 开始，先适应更严的类型检查，再逐步使用高级配置。
- 项目变大时抽取 `tsconfig.base.json`，用 `extends` 共享基础选项。
- 在 CI 中加入 `tsc --noEmit`，保证类型健康。
- 遇到不确定的选项时，查阅官方手册并做最小试验后再落地。

差不多就这么多啦，初学者掌握这些就能把 TS 项目稳稳地跑起来喵~如果你要我给你当前项目做一份“定制版 tsconfig”，发我你的打包器和运行环境，我就帮你精确调参！