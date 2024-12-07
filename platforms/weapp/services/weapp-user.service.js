import { UserServiceInterface } from '../../../common/interfaces/user-service.interface.js';

export class WeappUserService extends UserServiceInterface {
  constructor() {
    super();
    this.userInfo = null;
    this.loginState = false;
  }

  async login() {
    return new Promise((resolve, reject) => {
      // 对于多端应用，我们使用匿名登录或本地存储
      try {
        const anonymousId = this._generateAnonymousId();
        wx.setStorageSync('anonymousId', anonymousId);
        this.loginState = true;
        resolve({
          anonymousId: anonymousId,
          platform: 'weapp'
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async getUserInfo() {
    if (this.userInfo) return this.userInfo;

    return new Promise((resolve, reject) => {
      try {
        const anonymousId = wx.getStorageSync('anonymousId');
        this.userInfo = {
          id: anonymousId,
          nickname: `用户${anonymousId.slice(-6)}`,
          platform: 'weapp'
        };
        resolve(this.userInfo);
      } catch (error) {
        reject(error);
      }
    });
  }

  async isLoggedIn() {
    return this.loginState || !!wx.getStorageSync('anonymousId');
  }

  async logout() {
    wx.removeStorageSync('anonymousId');
    this.userInfo = null;
    this.loginState = false;
  }

  _generateAnonymousId() {
    return 'anon_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}
