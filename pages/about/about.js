// pages/about/about.js
Page({
  data: {
    dimensions: null,
    mbtiDimensions: [
      {
        key: 'E-I',
        name: '外向-内向',
        description: '获取能量和与外界互动的方式'
      },
      {
        key: 'S-N',
        name: '感觉-直觉',
        description: '获取和处理信息的方式'
      },
      {
        key: 'T-F',
        name: '思考-情感',
        description: '做决策和判断的方式'
      },
      {
        key: 'J-P',
        name: '判断-感知',
        description: '处理外部世界的方式'
      }
    ]
  },

  onLoad() {
    wx.showLoading({ title: '加载中...' })
    
    // 使用 wx.request 异步加载数据
    wx.request({
      url: '/data/questions.json',
      method: 'GET',
      success: (res) => {
        wx.hideLoading()
        
        if (res.data && res.data.mbtiDimensions) {
          const dimensions = Object.entries(res.data.mbtiDimensions).map(([key, value]) => ({
            key,
            name: value.name,
            description: value.description
          }))
          
          this.setData({ dimensions })
        } else {
          wx.showToast({
            title: '数据解析失败',
            icon: 'none'
          })
        }
      },
      fail: (error) => {
        wx.hideLoading()
        wx.showToast({
          title: '加载数据失败',
          icon: 'none'
        })
        
        // 如果网络加载失败，使用本地默认数据
        this.setData({ dimensions: this.data.mbtiDimensions })
      }
    })
  }
})
