/**
 * 响应数据
 */
export interface HttpResponse {
  /**
   * 返回结果是否正确
   */
  flag: boolean;
  /**
   * 返回信息
   */
  message: string;
  /**
   * 返回数据
   */
  data?: any;
  /**
   * 错误信息
   */
  error?: any;
}

/**
 * 请求类型
 */
export enum HttpRequestType {
  GET,
  POST,
  PUT,
  DELETE
}
