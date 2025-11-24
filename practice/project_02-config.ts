// ==============================================
// 项目练习 02：应用配置与环境切换
// 目标：练习接口、联合类型、函数返回类型
// ==============================================

/**
 * 任务 1：设计 AppConfig 接口
 *
 * 要求（可以在现有 AppConfig 的基础上稍作调整或扩展）：
 * - appName: string
 * - version: string
 * - debug: boolean
 * - apiUrl: string
 * - env: 'dev' | 'prod'
 */

// TODO: 根据需求定义 AppConfig 接口
interface AppConfig {
  // appName: string
  // version: string
  // debug: boolean
  // apiUrl: string
  // env: 'dev' | 'prod'
}

/**
 * 任务 2：根据 env 生成不同配置
 *
 * 要求：
 * - 定义一个函数 createAppConfig：
 *   - 参数：env: 'dev' | 'prod'
 *   - 返回：AppConfig
 * - 约定：
 *   - dev 环境：debug = true，apiUrl 为本地/开发地址
 *   - prod 环境：debug = false，apiUrl 为线上地址
 */

// TODO: 实现 createAppConfig 函数
// function createAppConfig(env: 'dev' | 'prod'): AppConfig {
//   // 根据 env 返回不同的配置对象
// }

/**
 * 任务 3：简单测试
 *
 * 要求：
 * - 创建 devConfig 和 prodConfig，分别调用 createAppConfig('dev') / ('prod')
 * - 使用 console.log 打印，观察结果和类型提示
 */

// TODO: 编写简单的测试代码
// const devConfig = createAppConfig('dev')
// const prodConfig = createAppConfig('prod')
// console.log(devConfig, prodConfig)
