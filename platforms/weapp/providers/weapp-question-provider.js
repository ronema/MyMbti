const QuestionProviderInterface = require('../../../common/interfaces/question-provider.interface.js');

class WeappQuestionProvider {
  constructor() {
    this.questions = null;
  }

  static async getAllQuestions() {
    console.log('WeappQuestionProvider: getAllQuestions called');
    try {
      const defaultQuestions = this._getDefaultQuestions();
      console.log('Default questions:', defaultQuestions);
      return defaultQuestions;
    } catch (error) {
      console.error('获取问题时发生错误:', error);
      return this._getDefaultQuestions();
    }
  }

  static _getDefaultQuestions() {
    // 返回一个默认的问题列表，以确保测试可以继续进行
    return [
      {
        id: 1,
        text: "你更喜欢在社交场合中与人交流，还是独自思考？",
        dimension: "E-I",
        options: [
          { label: "E", text: "我喜欢与人交流，感到精力充沛" },
          { label: "I", text: "我更喜欢独处，感到思考更清晰" }
        ]
      },
      {
        id: 2,
        text: "在做决定时，你更倾向于依据逻辑还是感受？",
        dimension: "T-F",
        options: [
          { label: "T", text: "我更相信理性分析" },
          { label: "F", text: "我更相信内心感受" }
        ]
      },
      {
        id: 3,
        text: "你更喜欢关注具体的事实，还是追求抽象的可能性？",
        dimension: "S-N",
        options: [
          { label: "S", text: "我更关注实际和具体的细节" },
          { label: "N", text: "我更喜欢探索潜在的可能性" }
        ]
      },
      {
        id: 4,
        text: "你更喜欢有计划的生活，还是灵活自由的生活方式？",
        dimension: "J-P",
        options: [
          { label: "J", text: "我更喜欢有条理、有计划的生活" },
          { label: "P", text: "我更喜欢自由、灵活的生活方式" }
        ]
      }
    ];
  }

  async getQuestions() {
    console.log('WeappQuestionProvider: getQuestions called');
    
    // 如果已经有缓存的问题，直接返回
    if (this.questions) {
      console.log('Returning cached questions');
      return this.questions;
    }

    try {
      console.log('Attempting to read questions from file');
      const fs = wx.getFileSystemManager();
      const filePath = wx.env.USER_DATA_PATH + '/questions.json';

      return new Promise((resolve, reject) => {
        fs.readFile({
          filePath: filePath,
          encoding: 'utf8',
          success: (res) => {
            try {
              const questionsData = JSON.parse(res.data);
              console.log('Questions read from file:', questionsData);
              
              // 确保返回正确的问题数组
              const questions = questionsData.questions || questionsData;
              
              this.questions = questions;
              resolve(questionsData);
            } catch (parseError) {
              console.error('解析问题文件失败:', parseError);
              const defaultQuestions = WeappQuestionProvider._getDefaultQuestions();
              this.questions = defaultQuestions;
              resolve({ questions: defaultQuestions });
            }
          },
          fail: (error) => {
            console.error('读取问题文件失败:', error);
            
            // 如果没有成功读取文件，使用默认问题
            const defaultQuestions = WeappQuestionProvider._getDefaultQuestions();
            this.questions = defaultQuestions;
            resolve({ questions: defaultQuestions });
          }
        });
      });
    } catch (error) {
      console.error('获取问题时发生错误:', error);
      const defaultQuestions = WeappQuestionProvider._getDefaultQuestions();
      this.questions = defaultQuestions;
      return { questions: defaultQuestions };
    }
  }

  async initializeQuestions() {
    console.log('WeappQuestionProvider: initializeQuestions called');
    // 初始化问题，这里可以添加额外的初始化逻辑
    this.questions = await this.getQuestions();
    return this.questions;
  }

  validateQuestion(question) {
    // 验证问题是否有效的逻辑
    return question && 
           question.id && 
           question.text && 
           question.dimension && 
           Array.isArray(question.options) && 
           question.options.length > 0;
  }
}

module.exports = WeappQuestionProvider;
