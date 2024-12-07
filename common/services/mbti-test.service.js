const { MBTI_DIMENSIONS, MBTI_TYPES, SCORING_RULES } = require('../constants/mbti.js');

class MbtiTestService {
  constructor(questionProvider) {
    this.questionProvider = questionProvider;
    this.questions = [];
    this.answers = {};
  }

  async initTest() {
    this.questions = await this.questionProvider.getQuestions();
    this.answers = {};
  }

  recordAnswer(questionId, optionCode) {
    if (!this.questions.find(q => q.id === questionId)) {
      throw new Error('Invalid question ID');
    }
    this.answers[questionId] = optionCode;
  }

  calculateDimensionScores() {
    const scores = {};

    Object.values(MBTI_DIMENSIONS).forEach(dimension => {
      const relevantQuestions = this.questions.filter(q => q.dimension === dimension.code);
      const answers = relevantQuestions.map(q => this.answers[q.id]);

      const optionCounts = dimension.options.reduce((acc, option) => {
        acc[option.code] = answers.filter(a => a === option.code).length;
        return acc;
      }, {});

      const totalAnswered = answers.length;
      const scorePercentages = Object.entries(optionCounts).reduce((acc, [code, count]) => {
        acc[code] = count / totalAnswered;
        return acc;
      }, {});

      // 修改判断逻辑，增加随机性和更精确的计算
      const percentageDifference = Math.abs(scorePercentages[dimension.options[0].code] - scorePercentages[dimension.options[1].code]);
      
      scores[dimension.code] = {
        ...scorePercentages,
        dominant: percentageDifference > SCORING_RULES.THRESHOLD_PERCENTAGE 
          ? (scorePercentages[dimension.options[0].code] > scorePercentages[dimension.options[1].code] 
              ? dimension.options[0].code 
              : dimension.options[1].code)
          : (Math.random() > 0.5 ? dimension.options[0].code : dimension.options[1].code)
      };
    });

    return scores;
  }

  determineMbtiType(scores) {
    const typeCode = Object.values(MBTI_DIMENSIONS)
      .map(dimension => scores[dimension.code].dominant)
      .join('');

    const type = MBTI_TYPES[typeCode] || {
      code: typeCode,
      name: '未知类型',
      description: '无法确定具体类型'
    };

    return {
      type,
      scores
    };
  }

  completeMbtiTest() {
    if (Object.keys(this.answers).length === 0) {
      throw new Error('请完成所有问题');
    }

    const scores = this.calculateDimensionScores();
    const result = this.determineMbtiType(scores);
    
    console.log('Test Result:', result);  // 添加调试日志
    
    return result;
  }
}

module.exports = {
  MbtiTestService
};
