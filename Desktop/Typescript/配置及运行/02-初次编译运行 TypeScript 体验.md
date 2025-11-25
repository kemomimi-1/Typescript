# 初次编译运行 TypeScript 体验

## 概述
本文将带你体验第一次编写、编译和运行 TypeScript 代码的完整过程。

## 创建第一个 TypeScript 文件

### 1. 创建源代码目录和文件
```bash
mkdir src
touch src/index.ts
```

### 2. 编写简单的 TypeScript 代码
在 `src/index.ts` 文件中输入以下内容：

```typescript
// 定义一个打招呼的函数
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// 使用函数
const message = greet("TypeScript");
console.log(message);

// 简单的类型注解示例
let age: number = 25;
let isStudent: boolean = true;

console.log(`Age: ${age}, Student: ${isStudent}`);
```

## 编译 TypeScript

### 1. 使用 tsc 编译
```bash
tsc
```

### 2. 查看编译结果
编译后会生成 `dist/index.js` 文件：

```javascript
// 编译后的 JavaScript 代码
function greet(name) {
    return "Hello, " + name + "!";
}
var message = greet("TypeScript");
console.log(message);
var age = 25;
var isStudent = true;
console.log("Age: " + age + ", Student: " + isStudent);
```

## 运行 JavaScript

### 1. 运行编译后的代码
```bash
node dist/index.js
```

### 输出结果：
```
Hello, TypeScript!
Age: 25, Student: true
```

## 使用 ts-node 直接运行

### 1. 安装 ts-node（如果尚未安装）
```bash
npm install --save-dev ts-node
```

### 2. 直接运行 TypeScript 文件
```bash
ts-node src/index.ts
```

### 输出结果（与上面相同）：
```
Hello, TypeScript!
Age: 25, Student: true
```

## 编译配置

### 基本的 tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true
  },
  "include": ["src/**/*"]
}
```

## 常见问题

### 1. 编译错误 - 类型不匹配
```typescript
let count: number = "hello"; // 错误：不能将类型"string"分配给类型"number"
```

### 2. 编译错误 - 未定义的变量
```typescript
console.log(unknownVariable); // 错误：找不到名称'unknownVariable'
```

## 体验总结

1. **类型安全**：TypeScript 在编译时就能发现类型错误
2. **代码清晰**：类型注解让代码意图更加明确
3. **开发体验**：更好的编辑器支持和代码提示
4. **兼容性**：编译为标准的 JavaScript，可以在任何环境中运行

## 下一步
尝试修改代码，体验 TypeScript 的类型检查功能：
- 故意制造类型错误，观察编译器的报错信息
- 添加更多的类型注解
- 尝试使用不同的 TypeScript 特性

---
最后更新: 2025-11-20