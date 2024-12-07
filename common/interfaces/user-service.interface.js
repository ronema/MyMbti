// 用户服务接口
export class UserServiceInterface {
  /**
   * 用户登录
   * @returns {Promise<Object>} 登录结果
   */
  async login() {
    throw new Error('Method not implemented');
  }

  /**
   * 获取用户信息
   * @returns {Promise<Object>} 用户信息
   */
  async getUserInfo() {
    throw new Error('Method not implemented');
  }

  /**
   * 检查用户登录状态
   * @returns {Promise<boolean>} 是否已登录
   */
  async isLoggedIn() {
    throw new Error('Method not implemented');
  }

  /**
   * 退出登录
   * @returns {Promise<void>}
   */
  async logout() {
    throw new Error('Method not implemented');
  }
}
