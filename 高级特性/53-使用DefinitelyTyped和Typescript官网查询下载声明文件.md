# 使用 DefinitelyTyped 和 TypeScript 官网查询下载声明文件

本文面向初学者，手把手教你为第三方 JavaScript 库添加 TypeScript 类型：先判断库是否自带类型，再通过 DefinitelyTyped 安装 `@types/*`，最后在项目中验证与配置。

## 两种来源：内置类型 vs `@types/*`
- 库自带类型：很多现代库直接在包内提供 `.d.ts`，其 `package.json` 会包含 `"types"` 或 `"typings"` 字段（如 `axios`、`dayjs`）。
- 社区声明包：若库本身不提供类型，通常在 `@types/库名`（由 DefinitelyTyped 维护）可以找到对应声明（如 `@types/lodash`、`@types/jquery`）。

## 步骤一：判断库是否自带类型
- 在 npm 或 GitHub 查看库的 `package.json` 是否包含 `types`/`typings` 字段。
- 试着在 TypeScript 文件中导入库，查看编辑器是否有智能提示且无类型错误。
- 如果没有类型提示或出现 `any`/报错，继续下一步安装 `@types/*`。

## 步骤二：在 DefinitelyTyped 搜索并安装
- 访问搜索页：`https://www.typescriptlang.org/dt/search`。
- 输入库名，查找是否存在 `@types/库名`。
- 使用开发依赖安装（推荐）：

```bash
npm install --save-dev @types/lodash
```

使用示例：

```typescript
import _ from 'lodash';
const shuffled = _.shuffle([1, 2, 3]);
```

## 步骤三：在 TypeScript 官网查找文档
- 官网地址：`https://www.typescriptlang.org/`
- 查阅 “Definitely Typed” 文档与指引，了解安装、版本匹配以及常见问题。

## 步骤四：项目内验证是否生效
- 新建或打开一个 `.ts` 文件，导入库并使用其 API。
- 若类型生效：编辑器会显示参数、返回值类型；编译器不再报错。
- 若仍无类型：检查是否安装到了正确工作区、路径是否正确，或继续调整 `tsconfig.json`。

## `tsconfig.json` 常用配置（初学者建议）
- `typeRoots`：设置类型声明搜索目录（默认包含 `node_modules/@types`）。
- `types`：指定要包含的全局类型包（如只加载特定包，提升编译速度）。
- `skipLibCheck`：跳过第三方声明文件检查，减少编译报错（入门推荐开启）。

示例：

```json
{
  "compilerOptions": {
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "typeRoots": [
      "./node_modules/@types",
      "./types"
    ]
    // 如需仅加载部分全局类型：
    // "types": ["node", "jest"]
  }
}
```

## 版本匹配与常见库示例
- 版本匹配：`@types/*` 的主版本通常与原库主版本保持一致；安装后若提示不兼容，尝试调整版本或查看包说明。
- 常见库：
  - `@types/node`（Node.js API 类型）
  - `@types/express`（Express 框架）
  - `@types/jquery`（jQuery）
  - 已内置类型的库（无需 `@types`）：`axios`、`dayjs`、`react`、`vue` 等现代库通常自带类型

## 排错与技巧
- 安装到正确目录：确保在当前项目根目录执行安装命令。
- 识别模块名：`declare module '库名'` 的库名需与 `import` 使用的字符串一致。
- 若类型冲突或报错多：临时开启 `skipLibCheck`，并逐步定位具体问题。
- 多工作区/Monorepo：为每个子包配置自己的 `tsconfig.json` 和依赖。

## 进一步学习资源
- DefinitelyTyped 仓库：`https://github.com/DefinitelyTyped/DefinitelyTyped`
- TypeScript 手册：`https://www.typescriptlang.org/docs/`

照着本文完成安装与配置后，你就能在项目中享受完善的类型提示与检查。如果遇到具体库的类型问题，告诉我库名，我可以帮你定位与解决。