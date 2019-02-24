# @ang-kit/component

新的使用文档请访问内网：http://10.10.11.106:4500

## 注册模块
```angular
import {AngKitComponentModule} from '@ang-kit/component';

@NgModule({
  imports: [
    AngKitComponentModule
  ]
})
export class AppModule { }
```

## 组件
### ADSimpleTableComponent
#### 功能
> * 简易表格，简化html的声明，基于配置的方式创建表格组件

#### 使用示例
```angular
1.使用
.html
<app-ad-simple-table
  #table
  [dataSource]="data"
  [columns]="column"
>
</app-ad-simple-table>

.ts
data = [
    {name: '111'}
];
column = [
    {title: '姓名', index: 'name'},
    {title: '操作区', buttons: [
        {
          text: '按钮1',
          click: (item) => {
            console.log('111');
          }
        }
    ]}
];
```

2.基本的接口类说明
```angular
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

```

#### Api
|参数|说明|类型|默认值|
|------|------|------|------|
| showNumber | 是否显示序号 | ```boolean``` | ```true``` |
| tableSize | 大小，有default、middle、small三种 | ```string``` | ```middle``` |
| tableTitle | 标题 | ```string``` | ```''``` |
| showBorder | 是否显示border | ```boolean``` | ```true``` |
| isPagination | 是否显示分页 | ```boolean``` | ```true``` |
| isPagination | 是否显示分页 | ```boolean``` | ```true``` |
| isFrontPagination | 是否前端分页 | ```boolean``` | ```false``` |
| showCheckBox | 是否显示checkbox | ```boolean``` | ```false``` |
| dataSourceId | 数据源的ID，主要用于checkbox、快速编辑功能等判断是否是同一个数据 | ```number 或者 string``` | ```'id'``` |
| maxCheckCount | 当有checkBox，最大显示数量 | ```number``` | ```500``` |
| url | 请求地址，如果用了该变量默认在内部做请求处理 | ```string``` | ```null``` |
| dataSource | 表格数据，如果用了该变量默认在外部做请求处理 | ```ADSimpleTableData[]``` | ```[]``` |
| extraParams | 请求的额外参数 | ```any``` | ```null``` |
| reqHeader | 请求头信息 | ```any``` | ```null``` |
| reqMethod | 请求方法，传入 GET、POST... | ```string``` | ```'POST'``` |
| reqReName | 重命名请求参数，支持重命名pageNo、pageSize两个参数 | ```any``` | ```{}``` |
| sortReName | 重命名排序参数，支持重命名sortName、sortValue两个参数 | ```any``` | ```{}``` |
| sortReNameValue | 重命名排序参数对应的值，支持重命名descend、ascend | ```any``` | ```{}``` |
| resReName | 重命名返回参数，支持重命名total、list两个参数 | ```any``` | ```{}``` |
| columns | 表格字段 | ```ADSimpleTableColumn[]``` | ```[]``` |
| preDataChange | 数据处理前回调 | ```(data: ADSimpleTableData[]) => ADSimpleTableData[]``` | - |
| preResponseDataChange | 如果需要从外部改变数据的时候调用 | ```(data: ADSimpleTableData) => any``` | - |
| initLoadData | 初始化的时候是否加载数据 | ```boolean``` | ```true``` |
| requestDataSourceEmitter | 通知外部处理请求事件 | ```EventEmitter<object>``` | - |
| checkboxChangeEmitter | 多选框改变事件 | ```EventEmitter<ADSimpleTableData[]>``` | - |
| saveRowEmitter | 快速保存数据的事件 | ```EventEmitter<ADSimpleTableData>``` | - |
