const { ShareServiceInterface } = require('../../../common/interfaces/share-service.interface.js');
const { MBTI_TYPES } = require('../../../common/constants/mbti.js');

class WeappShareService extends ShareServiceInterface {
  constructor() {
    super();
    this.defaultShareImage = '/images/share-default.txt'; // 临时占位文件
  }

  share(options = {}) {
    // 增加参数校验
    if (!options.type) {
      options.type = 'default';
    }

    try {
      const defaultOptions = this.getShareParams(options.type, options.data);
      const mergedOptions = { ...defaultOptions, ...options };

      return new Promise((resolve, reject) => {
        // 检查分享所需参数
        if (!mergedOptions.title) {
          reject(new Error('分享标题不能为空'));
          return;
        }

        if (!mergedOptions.path) {
          reject(new Error('分享路径不能为空'));
          return;
        }

        wx.shareAppMessage({
          title: mergedOptions.title,
          path: mergedOptions.path,
          imageUrl: mergedOptions.imageUrl || this.defaultShareImage,
          success: (res) => {
            try {
              this.handleShareCallback(res);
              resolve(res);
            } catch (callbackError) {
              console.error('Share callback error:', callbackError);
              reject(callbackError);
            }
          },
          fail: (error) => {
            console.error('Share failed:', error);
            wx.showToast({
              title: '分享失败，请重试',
              icon: 'none'
            });
            reject(error);
          }
        });
      });
    } catch (error) {
      console.error('Share preparation error:', error);
      wx.showToast({
        title: '准备分享时出错',
        icon: 'none'
      });
      return Promise.reject(error);
    }
  }

  getShareParams(type, data) {
    try {
      switch (type) {
        case 'result':
          return this._getResultShareParams(data || {});
        case 'test':
          return this._getTestShareParams();
        default:
          return this._getDefaultShareParams();
      }
    } catch (error) {
      console.error('Get share params error:', error);
      return this._getDefaultShareParams();
    }
  }

  _getDefaultShareParams() {
    return {
      title: 'MBTI性格测试 - 了解真实的自己',
      path: '/pages/index/index',
      imageUrl: this.defaultShareImage
    };
  }

  _getResultShareParams(resultData) {
    const type = resultData.type || 'UNKNOWN';
    const mbtiType = MBTI_TYPES[type] || { name: '未知', description: '性格类型' };
    
    return {
      title: `我的MBTI性格类型是${mbtiType.name}，快来测测你的！`,
      path: `/pages/result/result?type=${type}&scores=${JSON.stringify(resultData.scores || {})}`,
      imageUrl: this.defaultShareImage
    };
  }

  _getTestShareParams() {
    return {
      title: '快来测测你的MBTI性格类型！',
      path: '/pages/test/test',
      imageUrl: this.defaultShareImage
    };
  }

  handleShareCallback(result) {
    try {
      wx.reportAnalytics('share_action', {
        share_type: result.shareTickets ? '群' : '个人',
        share_scene: result.scene || 'unknown'
      });
    } catch (error) {
      console.error('Share analytics error:', error);
    }
  }
}

module.exports = {
  WeappShareService
};
