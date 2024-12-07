// pages/result/result.js
import { MBTI_TYPES } from '../../common/constants/mbti.js';

Page({
  data: {
    mbtiType: '',
    typeDetails: null,
    scores: {}
  },

  onLoad(options) {
    const { type, scores } = options;
    
    if (type) {
      const typeDetails = MBTI_TYPES[type];
      
      this.setData({
        mbtiType: type,
        typeDetails: typeDetails,
        scores: scores ? JSON.parse(scores) : {}
      });
    } else {
      wx.showToast({
        title: '未找到结果',
        icon: 'none'
      });
      this.navigateBack();
    }
  },

  shareResult() {
    wx.showShareMenu({
      withShareTicket: true
    });
    
    wx.shareAppMessage({
      title: `我的MBTI性格类型是${this.data.mbtiType}：${this.data.typeDetails.name}`,
      path: `/pages/result/result?type=${this.data.mbtiType}`
    });
  },

  restartTest() {
    // 使用 reLaunch 确保重新加载测试页面
    wx.reLaunch({
      url: '/pages/test/test'
    });
  },

  // 新增返回首页方法
  returnToHome() {
    wx.reLaunch({
      url: '/pages/index/index'
    });
  },

  navigateBack() {
    wx.navigateBack({
      delta: 1
    });
  }
});
