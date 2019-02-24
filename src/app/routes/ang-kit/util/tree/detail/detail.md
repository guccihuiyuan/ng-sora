## 特性

- 可配置
- 数组和树之间转换

## 注册
```angular
import {AngKitUtilModule} from '@ang-kit/util';

@NgModule({
    imports: [
        AngKitUtilModule
    ],
})
export class AppModule { }
```

## 示例
```angular
constructor(private arrayService: TreeService) {}

const arr = [
      {id: '10', parentId: '0', title: '10'},
      {id: '11', parentId: '10', title: '11'},
      {id: '12', parentId: '10', title: '12'},
      {id: '13', parentId: '10', title: '13', checked: true},
      {id: '20', parentId: '0', title: '20', checked: true}
];

const tree = this.arrayService.arrToTreeNode(arr);
```

## 方法
- `treeToArr(tree: any[], options?: {
    deepMapName?: string;
    parentMapName?: string;
    childrenMapName?: string;
    clearChildren?: boolean;
    /** 转换成数组结构时回调 */
    cb?: (item: any, parent: any, deep: number) => void;
  }): any[]`

- `arrToTree(arr: any[] = [], options?: {
    idMapName?: string;
    parentIdMapName?: string;
    rootParentId?: string;
    childrenMapName?: string;
    /** 转换成树数据后，执行的递归回调 */
    cb?: (item: any) => void;
  }): any[]`
    
- `arrToTreeNode(arr: any[], options?: {
    idMapName?: string;
    parentIdMapName?: string;
    rootParentId?: string,
    titleMapName?: string;
    isLeafMapName?: string;
    checkedMapname?: string;
    selectedMapname?: string;
    expandedMapname?: string;
    disabledMapname?: string;
    /** 转换成树数据后，执行的递归回调 */
    cb?: (item: any, parent: any, deep: number) => void;
  }): any[]`
  
- `visitTree(tree: any[], cb: (item: any, parent: any, deep: number) => void, options?: {
    childrenMapName?: string;
  }): void`
  
 
## 默认配置
```angular
defaultConfig = {
    /** 深度项名 */
    deepMapName: 'deep',
    /** 扁平后数组的父数据项名 */
    parentMapName: 'parent',
    /** 是否移除 */
    clearChildren: true,
    /** 编号项名 */
    idMapName: 'id',
    /** 父编号项名 */
    parentIdMapName: 'parentId',
    /** 根Id */
    rootParentId: '0',
    /** 源数据子项名 */
    childrenMapName: 'children',
    /** 标题项名 */
    titleMapName: 'title',
    /** 设置为叶子节点项名，若数据源不存在时自动根据 `children` 值决定是否为叶子节点 */
    isLeafMapName: 'isLeaf',
    /** 节点 Checkbox 是否选中项名 */
    checkedMapname: 'checked',
    /** 节点本身是否选中项名 */
    selectedMapname: 'selected',
    /** 节点是否展开(叶子节点无效)项名 */
    expandedMapname: 'expanded',
    /** 设置是否禁用节点(不可进行任何操作)项名 */
    disabledMapname: 'disabled'
};
```
