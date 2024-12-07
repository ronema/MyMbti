// 问题提供者接口
const QuestionProviderInterface = {
  /**
   * 获取测试问题
   * @returns {Promise<Array>} 问题列表
   */
  async getQuestions() {
    throw new Error('Method getQuestions() must be implemented');
  },

  /**
   * 初始化问题
   * @returns {Promise<void>}
   */
  async initializeQuestions() {
    throw new Error('Method initializeQuestions() must be implemented');
  },

  /**
   * 验证问题是否有效
   * @param {Object} question 问题对象
   * @returns {boolean} 是否有效
   */
  validateQuestion(question) {
    throw new Error('Method validateQuestion() must be implemented');
  }
};

module.exports = QuestionProviderInterface;
