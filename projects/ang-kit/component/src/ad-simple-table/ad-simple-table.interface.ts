/**
 * 单个数据源(静态数据)
 */
export interface ADSimpleTableData {
  /**
   * 选择框或单选框状态值
   */
  checked?: boolean;
  /**
   * 选择框或单选框 `disabled` 值
   */
  disabled?: boolean;
  /**
   * 其他字段
   */
  [key: string]: any;
}

/**
 * 列描述
 */
export interface ADSimpleTableColumn {
  /**
   * 表格标题
   */
  title: string;
  /**
   * 列数据在数据项中对应的key
   */
  index?: string;
  /**
   * 类型
   */
  type?: 'checkbox' | 'img' | 'date' | 'yuan' | 'input-number';
  /**
   * 是否可编辑
   */
  canEdit?: boolean;
  /**
   * 编辑状态类型
   */
  editType?: 'input-number';
  /**
   * 列宽，例如：`10%`、`100px`
   */
  width?: string;
  /**
   * 按钮组
   */
  buttons?: ADSimpleTableButton[];
  /**
   * 排序的默认受控属性
   * - 只支持同时对一列进行排序
   * - 保证只有一列的 `sort` 值，否则自动获取所有列的第一个值
   */
  sortValue: 'descend' | 'ascend' | null;
  /**
   * 格式化列值
   */
  format?: (record: any) => any;
  /**
   * 日期格式，`type=date` 有效，（默认：yyyy-MM-dd HH:mm:ss）
   */
  dateFormat?: string;
  /**
   * 头像类型，仅当 type=img 时有效；
   */
  avatarShape?: 'square' | 'circle' | null;
  /**
   * 默认提示，仅当呦输入框的时候有效
   */
  placeholder?: string;
  /**
   * 精度值，只有当 type = input-number 时候有效
   */
  precision?: number;
  /**
   * 最小值，只有 type = input-number 时候有效
   */
  min?: number;
  /**
   * 步数，只有 type = input-number 时候有效
   */
  step?: number;
  [key: string]: any;
}

/**
 * 按钮配置
 */
export interface ADSimpleTableButton {
  /**
   * 文本
   */
  text: string;
  /**
   * 格式化文本
   */
  format?: (record: any, btn: ADSimpleTableButton) => string;
  /**
   * 按钮类型 暂只支持 edit
   */
  type?: null | 'edit';
  /**
   * 是否显示的条件
   */
  isShow?: (record: any) => boolean;
  /**
   * 是否显示分割符，显示在该按钮的位置后面
   */
  isShowDivider?: boolean;
  /**
   * 点击回调
   */
  click?: (record: any) => void;
  /**
   * 下拉菜单，当存在时以 `dropdown` 形式渲染
   * - 只支持一级
   */
  children?: ADSimpleTableButton[];
  [key: string]: any;
}
