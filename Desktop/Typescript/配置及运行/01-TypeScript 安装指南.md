# TypeScript 安装指南

## 概述
TypeScript 是 JavaScript 的超集，为 JavaScript 添加了静态类型系统。要使用 TypeScript，我们需要先安装相关的工具包。

## 安装方式

### 1. 全局安装 TypeScript
```bash
npm install -g typescript
```

### 2. 本地安装（推荐）
```bash
npm install --save-dev typescript
```

### 3. 验证安装
安装完成后，可以通过以下命令验证 TypeScript 是否安装成功：
```bash
tsc --version
# 或
npx tsc --version
```

## 安装 ts-node
为了更方便地运行 TypeScript 代码，建议安装 ts-node：
```bash
npm install --save-dev ts-node @types/node
```

## 项目初始化

### 创建 TypeScript 配置文件
```bash
tsc --init
```
这会生成一个 `tsconfig.json` 文件，包含 TypeScript 编译器的配置选项。

### 基本 tsconfig.json 配置
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## 目录结构建议
```
project/
├── src/           # TypeScript 源代码
├── dist/          # 编译后的 JavaScript 代码
├── node_modules/
├── package.json
└── tsconfig.json
```

## 常用命令

### 编译 TypeScript
```bash
tsc
```

### 监听文件变化并自动编译
```bash
tsc --watch
```

### 运行 TypeScript 文件（使用 ts-node）
```bash
ts-node src/index.ts
```

## 注意事项
1. 建议使用本地安装，避免全局依赖冲突
2. 开发时使用 `ts-node` 可以跳过编译步骤直接运行
3. 生产环境需要先编译为 JavaScript 再运行

## 相关链接
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [ts-node GitHub](https://github.com/TypeStrong/ts-node)

---
最后更新: 2025-11-20