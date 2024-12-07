Page({
  data: {
    questions: [
      {
        title: "在社交场合中，你更倾向于：",
        options: [
          "积极主动地与人交谈",
          "更喜欢安静地观察"
        ]
      },
      // 更多问题...
    ],
    currentQuestionIndex: 0,
    answers: [],
    totalQuestions: 0
  },
  
  onLoad() {
    this.setData({
      totalQuestions: this.data.questions.length
    })
  },
  
  selectOption(e) {
    const selectedIndex = e.currentTarget.dataset.index
    const currentQuestionIndex = this.data.currentQuestionIndex
    
    // 记录答案
    const newAnswers = [...this.data.answers, selectedIndex]
    
    if (currentQuestionIndex < this.data.totalQuestions - 1) {
      this.setData({
        currentQuestionIndex: currentQuestionIndex + 1,
        answers: newAnswers
      })
    } else {
      // 测试结束，跳转结果页
      this.calculateResult(newAnswers)
    }
  },
  
  calculateResult(answers) {
    // 简单的结果计算逻辑
    wx.navigateTo({
      url: `/pages/result/result?answers=${JSON.stringify(answers)}`
    })
  }
})
