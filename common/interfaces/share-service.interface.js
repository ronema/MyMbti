// 分享服务接口
export class ShareServiceInterface {
  /**
   * 分享内容
   * @param {Object} options 分享配置
   * @returns {Promise<Object>} 分享结果
   */
  async share(options) {
    throw new Error('Method not implemented');
  }

  /**
   * 获取分享参数
   * @param {string} type 分享类型
   * @param {Object} data 分享数据
   * @returns {Object} 分享参数
   */
  getShareParams(type, data) {
    throw new Error('Method not implemented');
  }

  /**
   * 处理分享回调
   * @param {Object} result 分享结果
   */
  handleShareCallback(result) {
    throw new Error('Method not implemented');
  }
}
