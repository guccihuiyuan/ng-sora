/**
 * 后台菜单
 */
export interface AdminMenu {
  /**
   * 标题
   */
  title: string;
  /**
   * 图标
   */
  icon?: string;
  /**
   * 是否展开
   */
  open?: boolean;
  /**
   * 是否选中
   */
  selected?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 分组名
   */
  group?: boolean;
  /**
   * 链接
   */
  link?: string;
  /**
   * 外部链接
   */
  externalLink?: string;
  // /**
  //  * 打开方式
  //  */
  // target?: '_blank' | '_self' | '_parent' | '_top';
  /**
   * 子菜单
   */
  children?: AdminMenu[];
}
