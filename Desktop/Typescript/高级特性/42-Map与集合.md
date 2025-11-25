# 42. Map 与集合

## 1. 核心概念

### 1.1 什么是 Map

`Map` 是 ES6 提供的一种键值对（key-value）数据结构：

- 每一项都是一个 `[key, value]` 对
- 键 `key` 可以是任意类型（对象、函数、原始类型都可以）
- 按插入顺序保存数据
- 读取、删除、判断是否存在等操作都比较直观

它和普通对象 `{}` 的主要区别：

- 对象的键通常是字符串或 symbol，`Map` 的键可以是任意类型
- `Map` 有 `size` 属性，直接告诉你有多少条数据
- `Map` 的遍历顺序就是插入顺序
- `Map` 专门用于“键值映射”，语义更清晰

### 1.2 在项目中的典型用途

在本项目中，你已经在混入（`34-混入.md`）里见过这样的用法：

```ts
class Observable {
  private listeners: Map<string, Function[]> = new Map();
  
  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }
  
  emit(event: string, ...args: any[]) {
    const callbacks = this.listeners.get(event) || [];
    callbacks.forEach(callback => callback(...args));
  }
}
```

这里 `listeners` 就是一个 `Map<string, Function[]>`：

- `key` 是事件名 `event: string`
- `value` 是该事件对应的一组回调函数 `Function[]`

用 `Map` 来存储监听器列表，比用普通对象更直观，也更安全。

---

## 2. 基本使用方法：new Map

### 2.1 创建 Map

最常见的创建方式：

```ts
const map1 = new Map();               // 空的 Map<any, any>
const map2 = new Map<string, number>(); // 泛型约束键和值的类型
```

也可以直接用二维数组初始化：

```ts
const map3 = new Map<string, number>([
  ["a", 1],
  ["b", 2],
]);
```

在 TypeScript 中，推荐总是写上类型参数：

```ts
const userAgeMap = new Map<string, number>();
```

表示：

- 键：用户名 `string`
- 值：年龄 `number`

### 2.2 常用方法

假设有一个 `Map<string, number>`：

```ts
const scores = new Map<string, number>();
``

常用操作：

1. 设置键值对：

```ts
scores.set("Alice", 90);
scores.set("Bob", 85);
```

2. 读取值：

```ts
const aliceScore = scores.get("Alice"); // number | undefined
```

3. 判断是否存在键：

```ts
if (scores.has("Bob")) {
  // ...
}
```

4. 删除某个键：

```ts
scores.delete("Bob");
```

5. 清空所有数据：

```ts
scores.clear();
```

6. 获取大小：

```ts
const count = scores.size; // 当前键值对的数量
```

---

## 3. 遍历 Map

`Map` 提供了多种遍历方式。

### 3.1 for...of 遍历 entries

```ts
const scores = new Map<string, number>([
  ["Alice", 90],
  ["Bob", 85],
]);

for (const [name, score] of scores) {
  console.log(name, score);
}
```

### 3.2 分别遍历 key / value

```ts
for (const name of scores.keys()) {
  console.log("name:", name);
}

for (const score of scores.values()) {
  console.log("score:", score);
}
```

### 3.3 使用 forEach

```ts
scores.forEach((score, name) => {
  console.log(name, score);
});
```

注意参数顺序：`(value, key)`。

---

## 4. 与对象的互相转换

### 4.1 对象转 Map

```ts
const obj = {
  a: 1,
  b: 2,
};

const map = new Map<string, number>(Object.entries(obj));
```

### 4.2 Map 转对象

```ts
const map = new Map<string, number>([
  ["a", 1],
  ["b", 2],
]);

const obj = Object.fromEntries(map); // { a: 1, b: 2 }
```

这在需要和旧代码（使用普通对象）互相协作时非常有用。

---

## 5. TypeScript 中的 Map 类型

### 5.1 泛型声明

在 TypeScript 中，`Map` 一般写成：

```ts
const listeners: Map<string, Function[]> = new Map();
```

形式为：

```ts
Map<KeyType, ValueType>
```

- `KeyType`：键的类型
- `ValueType`：值的类型

我们在 `Observable` 例子中就是 `Map<string, Function[]>`：

- `key: string`：事件名
- `value: Function[]`：对应的回调函数列表

### 5.2 常见使用场景

1. 事件监听表（如 `Observable`）
2. 缓存（cache），例如记忆化函数 `memoize` 的内部缓存
3. ID 与对象实例的映射
4. 复杂键（如对象）与值的映射

例如，用于缓存计算结果：

```ts
function memoize<TArg, TResult>(fn: (arg: TArg) => TResult) {
  const cache = new Map<TArg, TResult>();

  return (arg: TArg): TResult => {
    if (cache.has(arg)) {
      return cache.get(arg)!;
    }

    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}
```

这里 `cache` 就是一个 `Map<TArg, TResult>`。

---

## 6. 综合示例：事件系统中的 Map

结合混入章节中的思路，我们可以用 `Map` 来实现一个简单的事件系统：

```ts
type Listener = (...args: any[]) => void;

type EventName = string;

class SimpleEventEmitter {
  private listeners: Map<EventName, Listener[]> = new Map();

  on(event: EventName, listener: Listener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(listener);
  }

  emit(event: EventName, ...args: any[]) {
    const currentListeners = this.listeners.get(event) || [];
    currentListeners.forEach(listener => listener(...args));
  }

  off(event: EventName, listener: Listener) {
    const currentListeners = this.listeners.get(event);
    if (!currentListeners) return;

    this.listeners.set(
      event,
      currentListeners.filter(l => l !== listener)
    );
  }
}
```

在这个例子里：

- `listeners` 使用 `Map` 管理不同事件的监听器列表
- 操作逻辑清晰：`on` 添加，`emit` 触发，`off` 移除

---

## 7. 小结

1. `Map` 是键值对集合，键可以是任意类型，适合做“映射关系”存储
2. 使用 `new Map()` 创建，常用方法有 `set`、`get`、`has`、`delete`、`clear`、`size`
3. 可以用 `for...of`、`keys()`、`values()`、`entries()`、`forEach()` 遍历
4. 可以和普通对象通过 `Object.entries` / `Object.fromEntries` 互相转换
5. 在 TypeScript 中使用 `Map<K, V>` 可以让映射关系更类型安全
6. 典型场景包括：事件系统、缓存、ID 映射等，项目中在混入和工具函数里都会用到 `Map`

建议：

- 写一点自己的 `Map` 小练习，例如用 `Map<string, number>` 做一个简单的计数器
- 尝试把之前用对象 `{}` 写的映射，改写成 `Map`，体会两者在类型与 API 上的差异。
