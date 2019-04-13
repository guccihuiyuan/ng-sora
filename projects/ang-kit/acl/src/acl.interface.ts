/**
 * ACL基础模型
 */
interface ACLBase {
  /**
   * 角色
   */
  roles?: string[];
  /**
   * 权限
   */
  abilities?: Array<number | string>;
}

/**
 * ACL模型
 */
export interface ACL extends ACLBase {
  /**
   * 是否全量
   */
  full?: boolean;
}

/**
 * ACL类型
 */
export interface ACLType extends ACLBase {
  /**
   * 校验模式，默认：`oneOf`
   * - `allOf` 表示必须满足所有角色或权限点数组算有效
   * - `oneOf` 表示只须满足角色或权限点数组中的一项算有效
   */
  mode?: 'allOf' | 'oneOf';
}

export type ACLCanType = number | number[] | string | string[] | ACLType;
