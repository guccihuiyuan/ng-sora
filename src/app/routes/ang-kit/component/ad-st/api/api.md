### ADSTComponent
|参数|说明|类型|默认值|
|------|------|------|------|
| data | 数据源 | ```string \| ADSTData[]``` | ```[]``` |
| dataKey | 数据源索，引用来标识数据的唯一性 | ```string``` | ```id``` |
| reqMethod | 请求方法 | ```'GET' \| 'POST' \| 'DELETE' \| 'PUT'``` | ```'POST'``` |
| reqHeader | 请求头 | ```any``` | ```null``` |
| initLoadData | 是否初始化加载数据 | ```boolean``` | ```true``` |
| extraParams | 额外参数 | ```any``` | ```null``` |
| reqReName | 重命名请求参数 | ```ADSTReqReName``` | - |
| resReName | 重命名返回参数 | ```ADSTResReName``` | - |
| columns | 列描述 | ```ADSTColumn[]``` | ```[]``` |
| header | 头部 | ```string \| TemplateRef<void>``` | - |
| footer | 尾部 | ```string \| TemplateRef<void>``` | - |
| noResult | 无数据时显示内容 | ```string \| TemplateRef<void>``` | - |
| size | 表格大小 | ```'small' \| 'middle' \| 'default'``` | ```middle``` |
| loadingDelay | 延迟显示加载效果的时间（防止闪烁） | ```number``` | ```0``` |
| showBordered | 是否显示边框 | ```boolean``` | ```true``` |
| scroll | 横向或纵向滚动 | ```{ y?: string; x?: string }``` | ```-``` |
| simple | 是否简单分页 | ```boolean``` | ```false``` |
| hideOnSinglePage | 只有一页时是否隐藏分页器 | ```boolean``` | ```false``` |
| showQuickJumper | 是否可以快速跳转至某页 | ```boolean``` | ```true``` |
| showSizeChanger | 是否可以改变每页大小 | ```boolean``` | ```true``` |
| showPagination | 是否显示分页 | ```boolean``` | ```true``` |
| isFrontPagination | 是否前端分页 | ```boolean``` | ```false``` |
| total | 数据总量，后端分页需要传入，前端分页自动判断 | ```number``` | ```0``` |
| expand | 当前列是否包含展开按钮 | ```TemplateRef<{ $implicit: any; }>``` | - |
| showNumber | 是否显示序号 | ```boolean``` | ```false``` |
| showCheckBox | 是否显示checkbox | ```boolean``` | ```true```|
| maxCheckedCount | 最大checked数量 | ```number``` | ```500``` |
| showRadio | 是否显示radio | ```boolean``` | ```true``` |
| isSingleSort | 是否单列排序 | ```boolean``` | false |
| asyncTreeData | 是否是异步树形类型数据 | ```boolean``` | false |
| preDataChange | 数据处理前回调 | ```(data: ADSTData[]) => ADSTData[]``` | - |
| preResponseDataChange | 如果需要从外部改变数据的时候调用 | ```(data: any) => any``` | - |
| (requestDataEmitter) | 请求数据的回调，传出请求参数 | ```EventEmitter<ADSTReqParams>``` | - |
</br>
</br>


### ADSTConfig
|参数|说明|类型|默认值|
|------|------|------|------|
| dataKey | 数据源索，引用来标识数据的唯一性 | ```string``` | ```id``` |
| reqMethod | 请求方法 | ```'GET' \| 'POST' \| 'DELETE' \| 'PUT'``` | ```'POST'``` |
| reqReName | 重命名请求参数 | ```ADSTReqReName``` | - |
| resReName | 重命名返回参数 | ```ADSTResReName``` | - |
| size | 表格大小 | ```'small' \| 'middle' \| 'default'``` | ```middle``` |
| showBordered | 是否显示边框 | ```boolean``` | ```true``` |
| showNumber | 是否显示序号 | ```boolean``` | ```false``` |
| maxCheckedCount | 最大checked数量 | ```number``` | ```500``` |
| tdClassName | td class | ```string``` | ```-``` |
| tdStyles | td styles | ```{[key: string]: string}``` | ```{}``` |
| thClassName | th class | ```string``` | ```-``` |
| thStyles | th styles | ```{[key: string]: string}``` | ```{}``` |

</br>
</br>

### 组件属性
|名称|说明|类型|
|------|------|------|

</br>
</br>

### 组件方法
|名称|说明|
|------|------|
| loadData() | 请求加载数据，会调用组件内的requestDataEmitter方法通知外部 |
| clearChecked() | 清空选中的数据 |
| deleteCheckedData() | 当外部调用删除接口成功的时候，需要调用改方法，删除表格选中的数据 |
| treeChildrenDataLoadComplete() | 树形结构子数据加载完成（外部请求的时候调用） |
| getCheckedData() | 获取所有选中的数据 |

</br>
</br>

### ADSTData
|参数|说明|类型|默认值|
|------|------|------|------|
| checked | 是否选中 | ```boolean``` | ```false``` |
| disabled | 是否禁用 | ```boolean``` | ```false``` |
| rowClassName | 表格行样式 | ```string``` | ```-``` |
| expand | 展开状态，用于展示额外数据 | ```boolean``` | ```false``` |
| level | 层级结构，用于树形结构 | ```number``` | ```-``` |
| treeExpand | 展开状态，用于树形结构 | ```boolean``` | ```false``` |
| children | 子节点，用于树形结构 | ```ADSTData[]``` | ```-``` |
| parent | 父节点，用于树形结构 | ```ADSTData``` | ```-``` |
| tdClassName | td class | ```string``` | ```-``` |
| tdStyles | td styles | ```{[key: string]: string}``` | ```-``` |
| isLeaf | 是否是叶子节点 | ```boolean``` | ```false``` |
| isLoading | 是否正在加载子节点 | ```boolean``` | ```false``` |

</br>
</br>

### ADSTColumn
|参数|说明|类型|默认值|
|------|------|------|------|
| title | 标题 | ```string``` | ```-``` |
| titleFormat | 标题格式化 | ```(column: ADSTColumn) => any``` | ```-``` |
| titleFormatCache | 标题格式化 从缓存中取 | ```any``` | ```null``` |
| index | 索引 | ```string``` | ```-``` |
| type | 类型 | ```'date' \| 'avatar'``` | ```-``` |
| show | 是否显示 | ```(void) => boolean``` | ```true``` |
| format | 格式化列值 | ```(record: ADSTData) => any``` | ```-``` |
| formatCache | 格式化列值 从缓存中取 | ```object``` | ```{}``` |
| dateFormat | 日期格式，`type=date` 有效 | ```string``` | ```-``` |
| shape | 形状，`type=avatar` 有效 | ```'square' \| 'circle'``` | ```'circle'``` |
| width | 宽度 | ```string``` | ```-``` |
| left | 左边 | ```string``` | ```-``` |
| right | 右边 | ```string``` | ```-``` |
| buttons | 按钮配置项目 | ```ADSTColumnBtn[]``` | ```-``` |
| sort | 排序配置项 | ```ADSTColumnSort``` | ```-``` |
| filter | 过滤配置项 | ```ADSTColumnFilter``` | ```-``` |
| thClassName | th class | ```string``` | ```-``` |
| thStyles | th styles | ```{[key: string]: string}``` | ```-``` |
| tdClassName | td class | ```string``` | ```-``` |
| tdStyles | td styles | ```{[key: string]: string}``` | ```-``` |
| rowSpan | 横跨行 | ```number``` | ```null``` |
| colSpan | 横跨列 | ```number``` | ```null``` |
| group | 表头分组 | ```ADSTColumnGroup``` | ```null``` |
| formatFromCache | 格式化的值，是否从缓存中取 | ```boolean``` | ```true``` |

</br>
</br>

### ADSTColumnGroup
|参数|说明|类型|默认值|
|------|------|------|------|
| title | 标题 | ```string``` | ```-``` |
| level | 层级 | ```number``` | ```0``` |
| rowSpan | 横跨行 | ```number``` | ```null``` |
| colSpan | 横跨列 | ```number``` | ```null``` |
| thClassName | th class | ```string``` | ```-``` |
| thStyles | th styles | ```{[key: string]: string}``` | ```-``` |
| tdClassName | td class | ```string``` | ```-``` |
| tdStyles | td styles | ```{[key: string]: string}``` | ```-``` |

</br>
</br>

### ADSTColumnBtn
|参数|说明|类型|默认值|
|------|------|------|------|
| text | 标题 | ```string``` | ```-``` |
| show | 是否显示 | ```(record: ADSTData, btn: ADSTColumnBtn) => boolean``` | ```-``` |
| click | 点击事件 | ```(record: ADSTData) => void``` | ```-``` |
| children | 下拉菜单，当存在时以 `dropdown` 形式渲染 | ```ADSTColumnBtn[]``` | ```-``` |

</br>
</br>

### ADSTColumnSort
|参数|说明|类型|默认值|
|------|------|------|------|
| sortValue | 排序值 | ```'ascend' \| 'descend' \| null``` | ```-``` |
| compare | 本地数据的排序函数，使用一个函数 | ```(a: ADSTData, b: ADSTData) => number``` | ```-``` |

</br>
</br>

### ADSTColumnFilter
|参数|说明|类型|默认值|
|------|------|------|------|
| filterMultiple | 是否多选 | ```boolean``` | ```-``` |
| menus | 项目 | ```ADSTColumnFilterMenu[]``` | ```-``` |

</br>
</br>

### ADSTColumnFilterMenu
|参数|说明|类型|默认值|
|------|------|------|------|
| text | 文本 | ```string``` | ```-``` |
| value | 值 | ```any``` | ```-``` |
| byDefault | 是否选中 | ```boolean``` | ```-``` |

</br>
</br>

### ADSTReqReName
|参数|说明|类型|默认值|
|------|------|------|------|
| page | 分页 | ```ADSTPageReName``` | ```-``` |
| sortKey | 排序key | ```ADSTSortKeyReName``` | ```-``` |
| sortValue | 排序value | ```ADSTSortValueReName``` | ```-``` |
| sortWrapKey | 排序外层key | ```string``` | ```'sort'``` |
| filterWrapKey | 过滤外层key | ```string``` | ```'filter'``` |
</br>
</br>

### ADSTResReName
|参数|说明|类型|默认值|
|------|------|------|------|
| list | 数据源 | ```string``` | ```'list'``` |
| total | 总数 | ```string``` | ```'total'``` |

</br>
</br>

### ADSTPageReName
|参数|说明|类型|默认值|
|------|------|------|------|
| pageNo | 当前页数 | ```string``` | ```'pageNo'``` |
| pageSize | 每页数量 | ```string``` | ```'pageSize'``` |

</br>
</br>

### ADSTSortKeyReName
|参数|说明|类型|默认值|
|------|------|------|------|
| sortName | 哪一列排序的key | ```string``` | ```'sortName'``` |
| sortValue | 哪一列排序的value | ```string``` | ```'sortValue'``` |

</br>
</br>

### ADSTSortValueReName
|参数|说明|类型|默认值|
|------|------|------|------|
| ascend | 升序 | ```string``` | ```'ascend'``` |
| descend | 降序 | ```string``` | ```'descend'``` |


</br>
</br>

### ADSTReqParams
|参数|说明|类型|默认值|
|------|------|------|------|
| extra | 额外参数 | ```any``` | ```-``` |
| page | 分页参数 | ```object``` | ```-``` |
| sort | 排序参数 | ```object[]``` | ```-``` |
| filter | 过滤参数 | ```object[]``` | ```-``` |
| merge | 合并参数 | ```object``` | ```-``` |
