// MBTI 常量定义
const MBTI_DIMENSIONS = {
  ENERGY_SOURCE: {
    code: 'E-I',
    name: '能量来源',
    options: [
      { code: 'E', name: '外向型', description: '从外部互动中获取能量' },
      { code: 'I', name: '内向型', description: '从内心世界和反思中获取能量' }
    ]
  },
  INFORMATION_GATHERING: {
    code: 'S-N',
    name: '信息获取',
    options: [
      { code: 'S', name: '实感型', description: '关注具体、实际的信息' },
      { code: 'N', name: '直觉型', description: '关注可能性和潜在意义' }
    ]
  },
  DECISION_MAKING: {
    code: 'T-F',
    name: '决策方式',
    options: [
      { code: 'T', name: '思维型', description: '基于逻辑和客观标准' },
      { code: 'F', name: '情感型', description: '基于个人价值观和他人感受' }
    ]
  },
  LIFESTYLE: {
    code: 'J-P',
    name: '生活方式',
    options: [
      { code: 'J', name: '判断型', description: '有计划、有组织' },
      { code: 'P', name: '知觉型', description: '灵活、自发' }
    ]
  }
};

const MBTI_TYPES = {
  ISTJ: { 
    code: 'ISTJ', 
    name: '检查员', 
    description: '务实、可靠、有条理',
    characteristics: [
      '注重细节和事实',
      '高度负责任和守纪律',
      '喜欢有计划和系统的生活',
      '善于组织和管理',
      '重视传统和稳定性'
    ]
  },
  ISFJ: { 
    code: 'ISFJ', 
    name: '守护者', 
    description: '尽责、温和、关心他人',
    characteristics: [
      '非常细心和体贴',
      '重视人际关系和和谐',
      '愿意无私地帮助他人',
      '对细节高度敏感',
      '追求稳定和安全感'
    ]
  },
  INFJ: { 
    code: 'INFJ', 
    name: '提倡者', 
    description: '有理想、有同情心、有洞察力',
    characteristics: [
      '富有同情心和理想主义',
      '善于洞察人性',
      '追求内心的和谐与意义',
      '具有强烈的价值观',
      '致力于帮助他人实现潜能'
    ]
  },
  INTJ: { 
    code: 'INTJ', 
    name: '战略家', 
    description: '有想法、有决心、高标准',
    characteristics: [
      '理性和逻辑思维强',
      '追求知识和个人成长',
      '善于制定长期战略',
      '独立思考，不盲从',
      '对自己和他人要求很高'
    ]
  },
  ISTP: { 
    code: 'ISTP', 
    name: '鉴赏家', 
    description: '灵活、理性、善于解决问题',
    characteristics: [
      '动手能力强',
      '喜欢实际操作',
      '灵活应对突发情况',
      '善于分析和解决技术问题',
      '追求个人自由'
    ]
  },
  ISFP: { 
    code: 'ISFP', 
    name: '探险家', 
    description: '艺术敏感、灵活、追求自我表达',
    characteristics: [
      '对美有敏锐的感知',
      '追求个人艺术表达',
      '善于感受当下',
      '灵活且不拘泥于规则',
      '重视个人价值观'
    ]
  },
  INFP: { 
    code: 'INFP', 
    name: '调解者', 
    description: '理想主义、富有同情心、创造性',
    characteristics: [
      '追求内心和谐',
      '富有同情心',
      '具有强烈的价值观',
      '富有创造力',
      '对他人的情感高度敏感'
    ]
  },
  INTP: { 
    code: 'INTP', 
    name: '逻辑学家', 
    description: '理性、富有创造力、追求真理',
    characteristics: [
      '逻辑思维能力强',
      '追求知识和真理',
      '富有创造性',
      '喜欢理论探索',
      '独立思考'
    ]
  },
  ESTP: { 
    code: 'ESTP', 
    name: '企业家', 
    description: '大胆、精力充沛、现实主义',
    characteristics: [
      '精力充沛',
      '善于社交',
      '喜欢冒险',
      '灵活应对变化',
      '注重实际和行动'
    ]
  },
  ESFP: { 
    code: 'ESFP', 
    name: '表演者', 
    description: '热情、社交、享受生活',
    characteristics: [
      '充满活力',
      '善于社交',
      '喜欢成为焦点',
      '享受当下',
      '对他人的情感敏感'
    ]
  },
  ENFP: { 
    code: 'ENFP', 
    name: '竞选者', 
    description: '热情、创造力、社交能力强',
    characteristics: [
      '充满热情',
      '富有创造力',
      '社交能力强',
      '追求可能性',
      '善于激励他人'
    ]
  },
  ENTP: { 
    code: 'ENTP', 
    name: '辩论家', 
    description: '聪明、富有创意、善于辩论',
    characteristics: [
      '聪明机智',
      '喜欢挑战',
      '富有创造力',
      '善于辩论',
      '追求创新'
    ]
  },
  ESTJ: { 
    code: 'ESTJ', 
    name: '总经理', 
    description: '高效、负责、善于管理',
    characteristics: [
      '高度组织能力',
      '注重效率',
      '善于管理',
      '重视传统和秩序',
      '果断且自信'
    ]
  },
  ESFJ: { 
    code: 'ESFJ', 
    name: '执政官', 
    description: '友好、尽责、重视和谐',
    characteristics: [
      '善于社交',
      '重视人际关系',
      '尽责且乐于助人',
      '追求团队和谐',
      '注重细节'
    ]
  },
  ENFJ: { 
    code: 'ENFJ', 
    name: '教练', 
    description: '有感染力、善于激励、关心他人',
    characteristics: [
      '善于激励他人',
      '富有同情心',
      '有强烈的领导力',
      '追求团队目标',
      '重视人际关系'
    ]
  },
  ENTJ: { 
    code: 'ENTJ', 
    name: '指挥官', 
    description: '果断、有领导力、追求效率',
    characteristics: [
      '强大的领导力',
      '高效且有决心',
      '善于制定战略',
      '追求卓越',
      '勇于挑战'
    ]
  }
};

const SCORING_RULES = {
  // 定义维度判断的阈值百分比
  THRESHOLD_PERCENTAGE: 0.55,  // 55%以上才认为是明确的倾向
  
  // 可以添加更多评分规则
  MIN_QUESTIONS_FOR_VALID_RESULT: 80  // 至少需要回答的问题数量
};

module.exports = {
  MBTI_DIMENSIONS,
  MBTI_TYPES,
  SCORING_RULES
};
