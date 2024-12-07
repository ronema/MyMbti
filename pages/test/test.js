// pages/test/test.js
const { MbtiTestService } = require('../../common/services/mbti-test.service.js');
const WeappQuestionProvider = require('../../platforms/weapp/providers/weapp-question-provider.js');
const { MBTI_TYPES } = require('../../common/constants/mbti.js');

Page({
  data: {
    questions: [],
    currentQuestionIndex: 0,
    selectedAnswers: {},
    progress: 0,
    isTestComplete: false,
    resultType: null,
    resultDetails: null
  },

  onLoad: function (options) {
    console.log('Test Page onLoad triggered');
    this.initializeTest();
  },

  // 添加 onShow 生命周期方法
  onShow: function () {
    console.log('Test Page onShow triggered');
    // 重置测试状态
    this.setData({
      currentQuestionIndex: 0,
      selectedAnswers: {},
      progress: 0,
      isTestComplete: false,
      resultType: null,
      resultDetails: null
    });
    this.initializeTest();
  },

  // 添加重新测试的方法
  restartTest: function() {
    this.setData({
      questions: [],
      currentQuestionIndex: 0,
      selectedAnswers: {},
      progress: 0,
      isTestComplete: false,
      resultType: null,
      resultDetails: null
    });
    this.initializeTest();
  },

  initializeTest: async function () {
    try {
      console.log('Attempting to load questions...');
      
      // 创建问题提供者实例
      const questionProvider = new WeappQuestionProvider();
      
      // 使用实例方法获取问题
      const questionsData = await questionProvider.getQuestions();
      
      // 确保使用正确的问题数组
      const questions = questionsData.questions || questionsData;
      
      console.log('Questions loaded successfully:', questions);
      
      // 如果没有加载到问题，使用默认问题
      if (!questions || questions.length === 0) {
        console.warn('No questions loaded, using default questions');
        const defaultQuestions = WeappQuestionProvider._getDefaultQuestions();
        
        this.setData({
          questions: defaultQuestions,
          progress: 0  // 确保进度条从0开始
        });
      } else {
        this.setData({
          questions: questions,
          progress: 0  // 确保进度条从0开始
        });
      }
      
      // 额外的调试信息
      console.log('Current questions in data:', this.data.questions);
    } catch (error) {
      console.error('Failed to load questions:', error);
      wx.showToast({
        title: '题目加载失败',
        icon: 'none'
      });
    }
  },

  selectOption: function (e) {
    const { questionId, label } = e.currentTarget.dataset;
    const { questions, currentQuestionIndex, selectedAnswers } = this.data;

    // 记录答案
    const updatedAnswers = {
      ...selectedAnswers,
      [questionId]: label
    };

    // 更新进度和选择
    const progress = (Object.keys(updatedAnswers).length / questions.length) * 100;

    // 判断是否移动到下一题或完成测试
    if (currentQuestionIndex < questions.length - 1) {
      this.setData({
        selectedAnswers: updatedAnswers,
        currentQuestionIndex: currentQuestionIndex + 1,
        progress: progress
      });
    } else {
      // 测试完成，计算结果
      this.calculateTestResult(updatedAnswers);
    }
  },

  calculateTestResult: function (answers) {
    try {
      console.log('Calculating test result with answers:', answers);
      
      // 创建测试服务实例
      const questionProvider = new WeappQuestionProvider();
      const testService = new MbtiTestService(questionProvider);
      
      // 初始化测试
      testService.questions = this.data.questions;
      
      // 记录所有答案
      Object.entries(answers).forEach(([questionId, label]) => {
        testService.recordAnswer(Number(questionId), label);
      });
      
      // 计算结果
      const result = testService.completeMbtiTest();
      
      console.log('Detailed Test Result:', result);
      
      // 获取详细的类型信息
      const resultType = result.type.code;
      const resultDetails = result.type;

      this.setData({
        isTestComplete: true,
        resultType: resultType,
        resultDetails: resultDetails
      });

      // 跳转到结果页面
      wx.navigateTo({
        url: `/pages/result/result?type=${resultType}`
      });
    } catch (error) {
      console.error('结果计算失败:', error);
      wx.showToast({
        title: '结果计算出错',
        icon: 'none'
      });
    }
  }
});
