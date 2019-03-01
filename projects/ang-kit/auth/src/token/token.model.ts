export interface TokenModel {
  /**
   * token
   */
  token: string;
  /**
   * refresh_token 刷新token
   */
  refresh_token?: string;
  /**
   * 经过多少时间过期（默认是秒）
   */
  expires_in?: number;
  /**
   * 过期时间（timestamp）
   */
  expires_time?: number;
  /**
   * 其他
   */
  [key: string]: any;
}
