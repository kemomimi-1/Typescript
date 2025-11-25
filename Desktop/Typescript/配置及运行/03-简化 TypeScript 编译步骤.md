# 简化 TypeScript 编译步骤

## 概述
在实际开发中，频繁的手动编译会影响开发效率。本文将介绍几种简化 TypeScript 编译步骤的方法。

## 方法一：使用 --watch 模式

### 监听文件变化并自动编译
```bash
tsc --watch
# 或
tsc -w
```

### 效果
- 编译器会持续运行
- 当 TypeScript 文件发生变化时自动重新编译
- 在终端中显示编译状态和错误信息

## 方法二：配置 npm scripts

### package.json 配置
```json
{
  "scripts": {
    "build": "tsc",
    "build:watch": "tsc --watch",
    "dev": "ts-node src/index.ts",
    "start": "node dist/index.js"
  }
}
```

### 使用方式
```bash
npm run build        # 一次性编译
npm run build:watch # 监听模式编译
npm run dev         # 直接运行 TypeScript（开发环境）
npm start           # 运行编译后的 JavaScript（生产环境）
```

## 方法三：使用 ts-node

### 直接运行 TypeScript
```bash
ts-node src/index.ts
```

### 监听模式运行
```bash
ts-node --watch src/index.ts
```

### 优点
- 无需手动编译步骤
- 开发体验更流畅
- 适合快速原型开发

## 方法四：集成开发环境配置

### VS Code 配置
在 `.vscode/settings.json` 中添加：
```json
{
  "typescript.preferences.includePackageJsonAutoImports": "on",
  "typescript.suggest.autoImports": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  }
}
```

### 任务配置（.vscode/tasks.json）
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "type": "typescript",
      "tsconfig": "tsconfig.json",
      "option": "watch",
      "problemMatcher": ["$tsc-watch"],
      "group": {
        "kind": "build",
        "isDefault": true
      }
    }
  ]
}
```

## 方法五：使用 nodemon + ts-node

### 安装依赖
```bash
npm install --save-dev nodemon
```

### 配置 nodemon
创建 `nodemon.json`：
```json
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "ts-node src/index.ts"
}
```

### package.json 脚本
```json
{
  "scripts": {
    "dev": "nodemon"
  }
}
```

## 方法六：现代构建工具集成

### 使用 Vite
```bash
npm create vite@latest my-ts-app -- --template vanilla-ts
```

### 使用 Webpack
安装相关 loader：
```bash
npm install --save-dev ts-loader webpack webpack-cli
```

## 编译优化配置

### tsconfig.json 优化
```json
{
  "compilerOptions": {
    "incremental": true,        // 启用增量编译
    "tsBuildInfoFile": "./.tsbuildinfo", // 增量编译信息文件
    "removeComments": false,    // 保留注释（开发时）
    "sourceMap": true           // 生成 source map
  }
}
```

## 性能考虑

### 开发环境 vs 生产环境
| 环境 | 推荐配置 | 特点 |
|------|---------|------|
| 开发 | ts-node + nodemon | 快速反馈，无需编译 |
| 生产 | tsc 编译 + node | 性能最优，类型安全 |

### 编译缓存
使用 `--incremental` 标志可以显著提升编译速度：
```bash
tsc --incremental
```

## 最佳实践

1. **开发时**：使用 `ts-node` 或 `tsc --watch`
2. **调试时**：确保生成 source map
3. **生产部署**：预先编译并运行 JavaScript
4. **团队协作**：统一构建脚本配置

## 注意事项

1. `ts-node` 不适合大型项目（性能考虑）
2. 生产环境务必进行完整编译
3. 注意内存使用，特别是监听模式

---
最后更新: 2025-11-20