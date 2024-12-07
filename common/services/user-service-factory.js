// 用户服务工厂
export class UserServiceFactory {
  static createUserService(platform) {
    switch (platform) {
      case 'weapp':
        import('../platforms/weapp/services/weapp-user.service.js')
          .then(module => new module.WeappUserService());
        break;
      case 'web':
        import('../platforms/web/services/web-user.service.js')
          .then(module => new module.WebUserService());
        break;
      case 'mobile':
        import('../platforms/mobile/services/mobile-user.service.js')
          .then(module => new module.MobileUserService());
        break;
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }
}
