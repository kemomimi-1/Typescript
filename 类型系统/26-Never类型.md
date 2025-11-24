# Never 类型

## 概念定义
Never 类型表示永远不会发生的值的类型，通常用于函数永远不会返回或总是抛出错误的情况。

## 语法示例
```typescript
// 函数永远不会返回
function throwError(message: string): never {
  throw new Error(message);
}

// 无限循环
function infiniteLoop(): never {
  while (true) {
    // 永远执行
  }
}

// 类型收缩中的 never
function neverExample(value: string | number) {
  if (typeof value === "string") {
    // value 是 string
  } else if (typeof value === "number") {
    // value 是 number
  } else {
    // value 是 never
    const check: never = value;
  }
}
```

## 使用场景

### 1. 错误处理函数
```typescript
// 自定义错误抛出函数
function fatalError(message: string): never {
  console.error("Fatal error:", message);
  throw new Error(message);
}

// 使用示例
function initializeApp() {
  if (!isValidConfig()) {
    fatalError("Invalid configuration");
  }
  // 正常初始化逻辑
}
```

### 2. 类型安全守卫
```typescript
// 确保所有情况都被处理
type Shape = "circle" | "square" | "triangle";

function getArea(shape: Shape): number {
  switch (shape) {
    case "circle":
      return Math.PI * 1;
    case "square":
      return 1;
    case "triangle":
      return 0.5;
    default:
      // 确保所有情况都被处理
      const exhaustiveCheck: never = shape;
      throw new Error(`Unhandled shape: ${shape}`);
  }
}

// 添加新形状时会报错
type NewShape = Shape | "hexagon";
// 需要更新 switch 语句来处理新情况
```

### 3. 异步操作
```typescript
// Promise 永远不会 resolve
function createTimeout(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Timeout")), ms);
  });
}

// 使用示例
async function fetchWithTimeout(url: string, timeout: number) {
  try {
    const response = await Promise.race([
      fetch(url),
      createTimeout(timeout)
    ]);
    return response;
  } catch (error) {
    console.error("Request failed or timed out");
    throw error;
  }
}
```

## 类型系统特性

### 1. 底部类型
```typescript
// never 是类型系统的底部类型
// 所有类型都可以赋值给 never，但 never 不能赋值给其他类型

let neverValue: never;
// neverValue = "hello"; // 错误: 不能将类型“string”分配给类型“never”
// let stringValue: string = neverValue; // 错误: 不能将类型“never”分配给类型“string”

// 但可以这样使用
function impossible(): never {
  throw new Error("This should never happen");
}

const result: string = impossible(); // 编译错误，但实际不会执行到
```

### 2. 类型收缩中的 never
```typescript
// 在类型守卫中，当所有可能类型都被处理后，剩余类型是 never
function processValue(value: string | number | boolean) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else if (typeof value === "number") {
    console.log(value.toFixed(2));
  } else if (typeof value === "boolean") {
    console.log(value ? "YES" : "NO");
  } else {
    // 这里 value 是 never
    const unexpected: never = value;
    throw new Error(`Unexpected value: ${unexpected}`);
  }
}
```

### 3. 条件类型中的 never
```typescript
// 在条件类型中，never 表示空集
type FilterNever<T> = T extends never ? never : T;

// 分布式条件类型
type Distributed = string | number | never; // string | number

// 映射类型中的 never
type OptionalKeys<T> = {
  [K in keyof T]: T[K] extends undefined ? K : never;
}[keyof T];
```

## 最佳实践

### 1. 详尽的 switch 语句
```typescript
// 使用 never 确保 switch 语句完整
type Status = "pending" | "success" | "error";

function handleStatus(status: Status) {
  switch (status) {
    case "pending":
      return showSpinner();
    case "success":
      return showSuccess();
    case "error":
      return showError();
    default:
      // 编译时检查确保所有情况都被处理
      const exhaustiveCheck: never = status;
      return exhaustiveCheck;
  }
}

// 添加新状态时会报错
type NewStatus = Status | "warning";
// 需要更新 switch 语句
```

### 2. 自定义断言函数
```typescript
// 使用 never 的类型断言函数
function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}

// 使用示例
function processInput(input: string | number) {
  if (typeof input === "string") {
    return input.length;
  } else if (typeof input === "number") {
    return input * 2;
  } else {
    return assertNever(input); // 编译时确保所有情况都被处理
  }
}
```

### 3. 错误边界
```typescript
// 使用 never 标记不可恢复的错误
class ApplicationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApplicationError";
  }
  
  // 标记为 never 返回
  fatal(): never {
    console.error("Fatal error:", this.message);
    process.exit(1);
  }
}

// 使用示例
try {
  riskyOperation();
} catch (error) {
  if (error instanceof ApplicationError) {
    error.fatal(); // 永远不会返回
  }
  // 处理其他错误
}
```

## 实用模式

### 1. 类型安全的事件处理
```typescript
// 确保所有事件类型都被处理
type AppEvent = "click" | "keypress" | "scroll";

function handleEvent(event: AppEvent) {
  switch (event) {
    case "click":
      return handleClick();
    case "keypress":
      return handleKeypress();
    case "scroll":
      return handleScroll();
    default:
      // 编译时检查
      const exhaustiveCheck: never = event;
      throw new Error(`Unhandled event: ${exhaustiveCheck}`);
  }
}
```

### 2. 状态机验证
```typescript
// 使用 never 验证状态转换
type State = "idle" | "loading" | "success" | "error";

function transition(current: State, next: State) {
  // 验证状态转换是否有效
  const validTransitions: Record<State, State[]> = {
    idle: ["loading"],
    loading: ["success", "error"],
    success: ["idle"],
    error: ["idle"]
  };
  
  if (!validTransitions[current].includes(next)) {
    throw new Error(`Invalid transition from ${current} to ${next}`);
  }
  
  return next;
}
```

### 3. 不可达代码检测
```typescript
// 使用 never 标记理论上不可达的代码
function impossibleCondition() {
  if (Math.random() < 0) {
    // 理论上永远不会执行
    const unreachable: never = "This should never happen";
    return unreachable;
  }
  return "normal";
}

// 在复杂逻辑中标记边界情况
function complexLogic(input: unknown) {
  if (typeof input === "string") {
    return processString(input);
  }
  
  if (typeof input === "number") {
    return processNumber(input);
  }
  
  if (input === null || input === undefined) {
    return processNullish(input);
  }
  
  // 理论上应该处理了所有情况
  const shouldBeNever: never = input;
  throw new Error(`Unexpected input type: ${typeof shouldBeNever}`);
}
```

## 常见错误

### 1. 误用 never 返回
```typescript
// 错误：函数实际上可能返回
function badNever(): never {
  if (Math.random() > 0.5) {
    throw new Error("Error");
  }
  // 这里可能返回 undefined
}

// 正确：确保永远不会返回
function goodNever(): never {
  throw new Error("Always throws");
}

function alsoGoodNever(): never {
  while (true) {
    // 无限循环
  }
}
```

### 2. 忽略编译错误
```typescript
// 不要忽略 never 相关的编译错误
type Color = "red" | "green" | "blue";

function handleColor(color: Color) {
  switch (color) {
    case "red":
      return "#ff0000";
    case "green":
      return "#00ff00";
    // 缺少 blue 的情况
    default:
      const exhaustiveCheck: never = color; // 编译错误
      return exhaustiveCheck;
  }
}
```

## 性能考虑

### 1. 编译时特性
```typescript
// never 是编译时概念，不影响运行时性能
function usesNever(): never {
  throw new Error("Error");
}

// 编译后的代码没有 never 的概念
```

### 2. 类型检查开销
```typescript
// 复杂的 never 类型检查可能增加编译时间
// 但通常影响很小

// 简单的 never 使用几乎没有开销
function simpleNever(): never {
  throw new Error("Simple");
}
```

## 总结
Never 类型是 TypeScript 类型系统的重要组成部分：

✅ **正确使用**:
- 标记永远不会返回的函数
- 确保 switch 语句的完整性
- 类型安全的错误处理
- 编译时验证

❌ **避免**:
- 误用 never 返回类型
- 忽略 never 相关的编译错误
- 在可能返回的函数中使用 never

**最佳实践**:
- 使用 never 进行 exhaustive checking
- 为错误处理函数使用 never 返回类型
- 利用 never 进行类型安全的设计
- 注意 never 在条件类型中的行为

---
**示例文件**: [examples/26-never-type.ts](../examples/26-never-type.ts)