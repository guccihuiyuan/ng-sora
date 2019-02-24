/**
 * 数据源
 */
export interface ADSTData {
  /** 选择框 | 单选框 */
  /**
   * 是否选中
   */
  checked?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /** 选择框 | 单选框 */

  /**
   * 表格行样式
   */
  rowClassName?: string;

  /**
   * 展开状态，用于展示额外数据
   */
  expand?: boolean;

  /**
   * 层级结构，用于树形结构
   */
  level?: number;
  /**
   * 展开状态，用于树形结构
   */
  treeExpand?: boolean;
  /**
   * 子节点，用于树形结构
   */
  children?: ADSTData[];
  /**
   * 父节点，用于树形结构
   */
  parent?: ADSTData;

  /**
   * td Class
   */
  tdClassName?: string;
  /**
   * td 样式
   */
  tdStyles?: {[key: string]: string};

  /**
   * 是否是叶子节点
   */
  isLeaf?: boolean;
  /**
   * 是否正在加载子节点
   */
  isLoading?: boolean;

  /**
   * 其他
   */
  [key: string]: any;
}

/**
 * 列描述
 */
export interface ADSTColumn {
  /**
   * 标题
   */
  title: string;
  /**
   * 格式化头部内容
   */
  titleFormat?: (column: ADSTColumn) => any;
  /**
   * 格式化头部内容 从缓存中取
   */
  titleFormatCache?: any;
  /**
   * 索引
   */
  index?: string;
  /**
   * 类型
   * date：使用 dateFormat 定义格式
   */
  type?:
    | 'date'
    | 'avatar'
    // | 'checkbox'
    // | 'radio'
    // | 'img'
    // | 'currency'
    // | 'number'
    // | 'link'
    // | 'badge'
    // | 'tag'
    // | 'yn'
    // | 'no'
  ;
  /**
   * 是否显示
   */
  show?: () => boolean;
  /**
   * 格式化列值
   */
  format?: (record: ADSTData) => any;
  /**
   * 格式化列值 从缓存中取
   */
  formatCache?: object;
  /**
   * 日期格式，`type=date` 有效
   */
  dateFormat?: string;
  /**
   * 形状，`type=avatar` 有效
   */
  shape?: 'square' | 'circle';

  /**
   * 列宽，例如：`100`、`10%`、`100px`
   */
  width?: string;
  /**
   * 左边，例如：`100`、`10%`、`100px`
   */
  left?: string;
  /**
   * 右边，例如：`100`、`10%`、`100px`
   */
  right?: string;

  /**
   * 按钮配置项目
   */
  buttons?: ADSTColumnBtn[];

  /**
   * 排序配置项
   */
  sort?: ADSTColumnSort;

  /**
   * 过滤配置项
   */
  filter?: ADSTColumnFilter;

  /**
   * th Class
   */
  thClassName?: string;
  /**
   * th 样式
   */
  thStyles?: {[key: string]: string};
  /**
   * td Class
   */
  tdClassName?: string;
  /**
   * td 样式
   */
  tdStyles?: {[key: string]: string};

  /**
   * 横跨行
   */
  rowSpan?: number;
  /**
   * 横跨列
   */
  colSpan?: number;

  /**
   * 表头分组
   */
  group?: ADSTColumnGroup;

  /**
   * 格式化的值，是否从缓存中取，默认为true
   */
  formatFromCache?: boolean;
}

/**
 * 分组
 */
export interface ADSTColumnGroup {
  /**
   * 名称
   */
  title: string;
  /**
   * 层级，从0开始
   */
  level: number;
  /**
   * 横跨行
   */
  rowSpan?: number;
  /**
   * 横跨列
   */
  colSpan?: number;

  /**
   * th Class
   */
  thClassName?: string;
  /**
   * th 样式
   */
  thStyles?: {[key: string]: string};
  /**
   * td Class
   */
  tdClassName?: string;
  /**
   * td 样式
   */
  tdStyles?: {[key: string]: string};
}

/**
 * 按钮配置
 */
export interface ADSTColumnBtn {
  /**
   * 文本
   */
  text: string;
  // /**
  //  * 格式化文本
  //  */
  // format?: (record: ADSTData, btn: ADSTColumnBtn) => string;
  /**
   * 是否显示
   */
  show?: (record: ADSTData, btn: ADSTColumnBtn) => boolean;
  /**
   * 点击事件
   */
  click?: (record: ADSTData) => void;
  /**
   * 下拉菜单，当存在时以 `dropdown` 形式渲染
   * - 只支持一级
   */
  children?: ADSTColumnBtn[];
  [key: string]: any;
}

/**
 * 排序配置项
 */
export interface ADSTColumnSort {
  /**
   * 排序值
   */
  sortValue?: 'ascend' | 'descend' | null;
  /**
   * 本地数据的排序函数，使用一个函数
   */
  compare?: (a: ADSTData, b: ADSTData) => number;
}

/**
 * 过滤配置项
 */
export interface ADSTColumnFilter {
  /**
   * 是否多选
   */
  filterMultiple?: boolean;
  /**
   * 项目
   */
  menus?: ADSTColumnFilterMenu[];
}

/**
 * 过滤配置菜单项
 */
export interface ADSTColumnFilterMenu {
  /**
   * 文本
   */
  text: string;
  /**
   * 值
   */
  value?: any;
  /**
   * 是否选中
   */
  byDefault?: boolean;
}

/**
 * 重命名请求参数
 */
export interface ADSTReqReName {
  page?: ADSTPageReName;
  sortKey?: ADSTSortKeyReName;
  sortValue?: ADSTSortValueReName;
  sortWrapKey?: string;
  filterWrapKey?: string;
}

/**
 * 重命名返回参数
 */
export interface ADSTResReName {
  list?: string;
  total?: string;
}

/**
 * 重命名分页参数 `{pageNo: 1, pageSize: 10}`
 */
export interface ADSTPageReName {
  pageNo?: string;
  pageSize?: string;
}

/**
 * 重命名排序Key参数 `{sortName: columnName, sortValue: ascend | descend}`
 */
export interface ADSTSortKeyReName {
  sortName?: string;
  sortValue?: string;
}

/**
 * 重命名排序Value参数
 */
export interface ADSTSortValueReName {
  ascend?: string;
  descend?: string;
}

/**
 * 生成的请求参数
 */
export interface ADSTReqParams {
  // 传入的额外参数
  extra?: any;
  // 分页参数
  page?: object;
  // 排序参数
  sort?: object[];
  // 过滤参数
  filter?: object[];
  // 合并参数
  merge?: object;
}
