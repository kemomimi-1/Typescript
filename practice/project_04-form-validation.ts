// ==============================================
// 项目练习 04：表单校验模块
// 目标：练习接口、类型别名、泛型（可选）、函数返回类型
// ==============================================

/**
 * 任务 1：定义登录表单数据结构
 *
 * 要求：
 * - 定义 LoginForm 接口：
 *   - username: string
 *   - password: string
 */

// TODO: 定义 LoginForm 接口
interface LoginForm {
  // username: string
  // password: string
}

/**
 * 任务 2：定义表单错误结构
 *
 * 简单版本（任选其一）：
 * - 使用索引签名：interface FormErrors { [field: string]: string }
 *
 * 进阶版本（如果已经学了映射类型，可以尝试）：
 * - type FormErrors<T> = { [K in keyof T]?: string }
 */

// TODO: 选择一种方式定义表单错误类型
// 简单版：
// interface FormErrors {
//   [field: string]: string
// }

// 进阶版（可选）：
// type FormErrors<T> = {
//   [K in keyof T]?: string
// }

/**
 * 任务 3：实现登录表单校验函数
 *
 * 要求（以简单版为例，可以根据你选择的错误类型调整）：
 * - 函数名：validateLoginForm
 * - 参数：form: LoginForm
 * - 返回：FormErrors 或 FormErrors<LoginForm>
 *
 * 校验规则：
 * - 如果 username 为空，返回错误："用户名不能为空"
 * - 如果 password 长度 < 6，返回错误："密码长度不能少于 6 位"
 * - 没有错误时，返回空对象
 */

// TODO: 实现登录表单校验函数
// function validateLoginForm(form: LoginForm): /* 在这里填入返回类型 */ {
//   // 在这里编写校验逻辑，根据错误情况填充错误对象
// }

/**
 * 任务 4：简单测试
 *
 * - 构造几个不同的 LoginForm：
 *   - 用户名为空
 *   - 密码太短
 *   - 都合法
 * - 调用 validateLoginForm，查看返回结果
 */

// TODO: 编写简单测试代码
// const form1: LoginForm = { ... }
// const errors1 = validateLoginForm(form1)
// console.log(errors1)
