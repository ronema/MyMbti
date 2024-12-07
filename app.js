App({
  onLaunch() {
    // 小程序初始化
    wx.cloud.init({
      env: 'your-env-id', // 替换为你的云开发环境ID
      traceUser: true
    })
  },
  globalData: {
    userInfo: null,
    mbtiResult: null
  }
})
