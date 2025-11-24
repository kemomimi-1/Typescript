// ==============================================
// 项目练习 05：通用仓库类（Repository）
// 目标：练习接口、类实现接口、泛型约束
// ==============================================

/**
 * 任务 1：带 id 的基础接口
 *
 * 要求：
 * - 定义一个 HasId 接口，包含：id: number
 */

// TODO: 定义 HasId 接口
interface HasId {
  // id: number
}

/**
 * 任务 2：设计通用仓库接口 Repository<T>
 *
 * 要求：
 * - 使用泛型 T 表示实体类型
 * - 仓库接口包含以下方法：
 *   - getAll(): T[]
 *   - getById(id: number): T | undefined
 *   - add(item: T): void
 *   - remove(id: number): void
 */

// TODO: 定义 Repository 接口
interface Repository<T> {
  // getAll(): T[]
  // getById(id: number): T | undefined
  // add(item: T): void
  // remove(id: number): void
}

/**
 * 任务 3：实现内存仓库类 InMemoryRepository<T>
 *
 * 要求：
 * - 使用泛型 T，并约束 T 必须有 id 字段：T extends HasId
 * - 实现 Repository<T> 接口
 * - 使用一个私有数组保存数据：private items: T[] = []
 */

// TODO: 实现 InMemoryRepository 类
// class InMemoryRepository<T extends HasId> implements Repository<T> {
//   private items: T[] = []
//
//   // 在这里实现接口要求的四个方法
// }

/**
 * 任务 4：使用 User 测试仓库
 *
 * 建议：
 * - 复用你在其他练习中定义的 User 接口（包含 id: number）
 * - 创建一个 InMemoryRepository<User> 实例
 * - 调用 add / getAll / getById / remove 等方法，观察行为和类型提示
 */

// TODO: 编写简单测试代码
// const userRepo = new InMemoryRepository<User>()
// userRepo.add(...)
// console.log(userRepo.getAll())
