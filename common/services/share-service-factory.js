// 分享服务工厂
export class ShareServiceFactory {
  static createShareService(platform) {
    switch (platform) {
      case 'weapp':
        // 直接导入，不使用动态导入
        const { WeappShareService } = require('../platforms/weapp/services/weapp-share.service.js');
        return new WeappShareService();
      case 'web':
        // 直接导入，不使用动态导入
        const { WebShareService } = require('../platforms/web/services/web-share.service.js');
        return new WebShareService();
      case 'mobile':
        // 直接导入，不使用动态导入
        const { MobileShareService } = require('../platforms/mobile/services/mobile-share.service.js');
        return new MobileShareService();
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }
}
