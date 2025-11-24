// ==============================================
// 项目练习 01：用户与权限模块
// 目标：练习接口、接口继承、泛型 ApiResponse 的综合使用
// 说明：这里只给出任务说明和空接口，请根据注释自行完成实现。
// ==============================================
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function fetchUserDetail(userId) {
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
    });
}
(() => __awaiter(this, void 0, void 0, function* () {
    const res = yield fetchUserDetail(1);
    console.log(res.data);
}))();
console.log('start running file');
