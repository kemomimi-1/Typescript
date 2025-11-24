// ==============================================
// 项目练习 01：用户与权限模块
// 目标：练习接口、接口继承、泛型 ApiResponse 的综合使用
// 说明：这里只给出任务说明和空接口，请根据注释自行完成实现。
// ==============================================

/**
 * 任务 1：定义基础数据结构
 *
 * 要求：
 * - 定义 User 接口，包含：
 *   - id: number（只读）
 *   - username: string
 *   - email: string
 *   - isActive: boolean
 * - 定义 Role 接口，包含：id, name, description?
 * - 定义 Permission 接口，包含：id, code, description?
 */

// TODO: 定义 User 接口
interface User {
    readonly id: number
    username: string
    email: string
    isActive: boolean
}

// TODO: 定义 Role 接口
interface Role {
    id: number
    name: string
    description?: string
}

// TODO: 定义 Permission 接口
interface Permission {
    id: number
    code: string
    description?: string
}

/**
 * 任务 2：定义用户详情结构
 *
 * 要求：
 * - 定义 UserDetail 接口，包含：
 *   - user: User
 *   - roles: Role[]
 *   - permissions: Permission[]
 */

// TODO: 定义 UserDetail 接口
interface UserDetail {
    user: User
    roles: Role[]
    permissions: Permission[]
}

/**
 * 任务 3：结合你自己在 practice_15-接口.ts 中写的 ApiResponse<T>
 *
 * 要求：
 * - 使用已有的 ApiResponse<T> 定义：
 *   - type UserDetailResponse = ApiResponse<UserDetail>
 *   - type UserListResponse = ApiResponse<User[]>
 *
 * 提示：这里不再重复定义 ApiResponse，避免与原文件冲突。
 */

// TODO: 使用已有的 ApiResponse<T> 定义响应类型
interface ApiTResonse<T> {
    data: T
    status: number
    message: string
    error?: any
    success: boolean
}
type UserDetailResponse = ApiTResonse<UserDetail>
type UserListResponse = ApiTResonse<User[]>

/**
 * 任务 4：模拟请求函数
 *
 * 要求：
 * - 定义一个函数，用于“获取用户详情”：
 *   - 函数名：fetchUserDetail
 *   - 参数：userId: number
 *   - 返回类型：Promise<UserDetailResponse>
 * - 函数内部可以直接 return Promise.resolve(假数据)，不需要真实发请求。
 */

// TODO: 定义并实现模拟请求函数（类型要写完整）
function fetchUserDetail(userId: number): Promise<UserDetailResponse> {
    return Promise.resolve({
        data: {
            user: {
                id: 1,
                username: 'admin',
                email: '<EMAIL>',
                isActive: true
            },
            roles: [
                { id: 1, name: '管理员', description: '拥有所有权限' },
                { id: 2, name: '普通用户' }
            ],
            permissions: [
                { id: 1, code: 'user:read', description: '查看用户信息' },
                { id: 2, code: 'user:create', description: '创建新用户' },
                { id: 3, code: 'user:update', description: '更新用户信息' },
                { id: 4, code: 'user:delete', description: '删除用户' }
            ]
        },
        status: 200,
        message: 'success',
        success: true
    })
}

(async () => {
    const res = await fetchUserDetail(1)
    console.log(res.data)
})();

console.log('start running file')
