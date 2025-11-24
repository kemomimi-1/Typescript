# TypeScript void 类型

## 概述
`void` 类型表示函数没有返回值。它是 TypeScript 中用于描述函数不返回任何值的特殊类型。

## 基本用法

### 函数没有返回值
```typescript
function logMessage(message: string): void {
  console.log(message);
  // 没有 return 语句，或者 return 没有值
}
```

### 显式返回 undefined
```typescript
function noOp(): void {
  return undefined; // 允许
}
```

### 空返回
```typescript
function doNothing(): void {
  return; // 空返回
}
```

## void 与 undefined

### 区别
```typescript
// void 表示没有返回值
function log(): void {
  console.log("Hello");
}

// undefined 表示返回 undefined 值
function getUndefined(): undefined {
  return undefined;
}
```

### 使用场景对比
```typescript
// 适合使用 void 的场景
function saveData(): void {
  // 保存数据，不需要返回值
  localStorage.setItem("key", "value");
}

// 适合使用 undefined 的场景
function clearData(): undefined {
  // 明确返回 undefined
  localStorage.clear();
  return undefined;
}
```

## void 在函数类型中的使用

### 函数类型别名
```typescript
type ClickHandler = (event: MouseEvent) => void;

const handleClick: ClickHandler = (event) => {
  console.log("Clicked at:", event.clientX, event.clientY);
  // 不需要返回值
};
```

### 接口中的函数类型
```typescript
interface ButtonProps {
  onClick: () => void;
  label: string;
}

const button: ButtonProps = {
  onClick: () => console.log("Button clicked"),
  label: "Click me"
};
```

## void 与数组方法

### forEach 方法
```typescript
const numbers = [1, 2, 3];

numbers.forEach((num): void => {
  console.log(num);
  // 回调函数不需要返回值
});
```

### setTimeout 回调
```typescript
setTimeout((): void => {
  console.log("Timeout completed");
  // 不需要返回值
}, 1000);
```

## void 的类型安全

### 不能赋值给其他类型
```typescript
function log(): void {
  console.log("Hello");
}

let result: string = log(); // 错误：不能将类型"void"分配给类型"string"
```

### 可以赋值给 void
```typescript
function returnsNumber(): number {
  return 42;
}

function acceptsVoid(callback: () => void): void {
  callback();
}

// 允许：number 返回值被忽略
acceptsVoid(returnsNumber);
```

## void 的特殊行为

### 忽略返回值
```typescript
function returnsString(): string {
  return "hello";
}

let result: void = returnsString(); // 实际上 result 是 "hello"，但类型是 void
```

### 实际应用
```typescript
// Array.prototype.push 返回 number（新长度）
// 但我们可以忽略返回值
const numbers: number[] = [];
const length: void = numbers.push(1, 2, 3); // 忽略返回值
```

## void 在泛型中的使用

### Promise<void>
```typescript
async function saveToDatabase(): Promise<void> {
  // 异步操作，不需要返回值
  await fetch("/api/save");
}
```

### 泛型约束
```typescript
function runTask<T>(task: () => T): T {
  return task();
}

// 使用 void 泛型
runTask<void>(() => {
  console.log("Task completed");
});
```

## void 与 never 的区别

### void
- 函数正常执行完成
- 可能返回 undefined
- 用于没有返回值的函数

### never
- 函数永远不会正常完成
- 总是抛出异常或无限循环
- 用于永远不会返回的函数

```typescript
// void：正常完成
function log(): void {
  console.log("Done");
}

// never：永远不会完成
function throwError(): never {
  throw new Error("Oops");
}

function infiniteLoop(): never {
  while (true) {
    // 无限循环
  }
}
```

## 最佳实践

### 1. 为没有返回值的函数使用 void
```typescript
// 好的实践
function updateUI(): void {
  // 更新界面，不需要返回值
  render();
}
```

### 2. 避免混淆 void 和 undefined
```typescript
// 明确意图
function clearCache(): void {
  // 表示不关心返回值
  localStorage.clear();
}

function getConfig(): undefined {
  // 明确返回 undefined
  return undefined;
}
```

### 3. 在回调函数中使用 void
```typescript
// 事件处理函数
function setupEventListeners(): void {
  document.addEventListener("click", (event): void => {
    console.log("Click:", event.clientX);
  });
}
```

### 4. 使用 Promise<void> 表示异步无返回值操作
```typescript
async function sendNotification(): Promise<void> {
  await fetch("/api/notify");
  // 不需要返回数据
}
```

## 常见错误

### 1. 混淆 void 和 undefined
```typescript
function mistake(): void {
  return "hello"; // 错误：不能将类型"string"分配给类型"void"
}
```

### 2. 错误使用 void 变量
```typescript
function log(): void {
  console.log("Hello");
}

let message: void = log();
// console.log(message.toUpperCase()); // 错误：void 没有方法
```

### 3. 不必要的 void 注解
```typescript
// 不必要的注解
const numbers = [1, 2, 3];
numbers.forEach((num: number): void => {
  console.log(num);
});

// 更好的方式（让 TypeScript 推断）
numbers.forEach(num => {
  console.log(num);
});
```

## 实用技巧

### 1. 忽略函数返回值
```typescript
function returnsValue(): string {
  return "important data";
}

// 使用 void 表示我们忽略返回值
const ignored: void = returnsValue();
```

### 2. 条件执行
```typescript
function maybeLog(shouldLog: boolean): void {
  if (shouldLog) {
    console.log("Logging...");
  }
  // 没有返回值
}
```

### 3. 多个操作
```typescript
function setupApp(): void {
  initializeDatabase();
  loadConfig();
  renderUI();
  // 所有操作都不需要返回值
}
```

## 练习建议

1. 为没有返回值的函数添加 void 类型注解
2. 练习使用 Promise<void> 处理异步操作
3. 比较 void 和 undefined 的使用场景
4. 体验 void 在回调函数中的应用
5. 理解 void 与 never 的区别

---
最后更新: 2025-11-20