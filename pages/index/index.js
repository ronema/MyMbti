Page({
  data: {
    motto: 'MBTI性格测试'
  },
  
  startTest() {
    wx.navigateTo({
      url: '/pages/test/test'
    })
  },
  
  onLoad() {
    // 页面加载时执行
  },
  
  onShareAppMessage() {
    return {
      title: 'MBTI性格测试',
      path: '/pages/index/index'
    }
  }
})
