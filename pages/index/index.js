// index.js
Page({
  data: {},

  onLoad() {
    // 页面加载时的逻辑
  },

  startTest() {
    wx.navigateTo({
      url: '/pages/test/test'
    })
  },

  goToAbout() {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  }
})
