export interface Schema {
  /**
   * 工程名称
   */
  project?: string;
  /**
   * 是否安装 @ang-kit/http
   */
  http?: boolean;
  /**
   * 是否安装 @ang-kit/component
   */
  component?: boolean;
  /**
   * 是否安装 @ang-kit/auth
   */
  auth?: string;
  /**
   * 是否安装 @ang-kit/util
   */
  util?: boolean;
}
