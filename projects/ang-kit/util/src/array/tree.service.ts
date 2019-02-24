import {Injectable} from '@angular/core';

@Injectable()
export class TreeService {
  /**
   * 默认配置
   */
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

  /**
   * 将树结构转换成数组结构
   */
  treeToArr(tree: any[], options?: {
    deepMapName?: string;
    parentMapName?: string;
    childrenMapName?: string;
    clearChildren?: boolean;
    /** 转换成数组结构时回调 */
    cb?: (item: any, parent: any, deep: number) => void;
  }): any[] {
    // 合并
    options = Object.assign({}, this.defaultConfig, options);

    const result = [];

    const deepFn = function (list, parent, deep) {
      for (let _i = 0, list_1 = list; _i < list_1.length; _i++) {
        const i = list_1[_i];
        i[options.deepMapName] = deep;
        i[options.parentMapName] = parent;
        if (options.cb) {
          options.cb(i, parent, deep);
        }
        result.push(i);

        const children = i[options.childrenMapName];

        if (children != null &&
          Array.isArray(children) &&
          children.length > 0) {
          deepFn(children, i, deep + 1);
        }

        if (options.clearChildren) {
          delete i[options.childrenMapName];
        }
      }
    };
    deepFn(tree, 1, null);
    return result;
  }
  /**
   * 将数组转换成树结构
   * @param arr 数组
   * @param options 选项
   */
  arrToTree(
    arr: any[] = [],
    options?: {
      idMapName?: string,
      parentIdMapName?: string,
      rootParentId?: string,
      childrenMapName?: string,
      /** 转换成树数据后，执行的递归回调 */
      cb?: (item: any) => void
    }): any[] {
    // 合并
    options = Object.assign({}, this.defaultConfig, options);

    const tree = [];
    const childrenOf = {};

    for (let i = 0, arr_1 = arr; i < arr_1.length; i++) {
      const item = arr_1[i];

      const id = item[options.idMapName];
      const pid = item[options.parentIdMapName];

      childrenOf[id] = childrenOf[id] || [];
      item[options.childrenMapName] = childrenOf[id];

      if (options.cb) {
        options.cb(item);
      }

      if ((pid).toString() !== (options.rootParentId).toString()) {
        childrenOf[pid] = childrenOf[pid] || [];
        childrenOf[pid].push(item);
      } else {
        tree.push(item);
      }
    }
    return tree;
  }

  /**
   * 数组转换成 `nz-tree` 数据源
   */
  arrToTreeNode(arr: any[], options?: {
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
  }): any[] {
    options = Object.assign({}, this.defaultConfig, options);

    const tree = this.arrToTree(arr, {
      idMapName: options.idMapName,
      parentIdMapName: options.parentIdMapName,
      childrenMapName: 'children',
      rootParentId: options.rootParentId
    });

    this.visitTree(tree, function (item, parent, deep) {
      item.key = item[options.idMapName];
      item.title = item[options.titleMapName];
      item.checked = item[options.checkedMapname];
      item.selected = item[options.selectedMapname];
      item.expanded = item[options.expandedMapname];
      item.disabled = item[options.disabledMapname];
      if (item[options.isLeafMapName] == null) {
        item.isLeaf = item.children.length === 0;
      } else {
        item.isLeaf = item[options.isLeafMapName];
      }
      if (options.cb) {
        options.cb(item, parent, deep);
      }
    });

    return tree;
  }

  /**
   * 遍历树形结构
   */
  visitTree(tree: any[], cb: (item: any, parent: any, deep: number) => void, options?: {
    childrenMapName?: string;
  }): void {
    // 合并
    options = Object.assign({}, this.defaultConfig, options);

    // 定义一个递归方法
    const deepFn = function (data, parent, deep) {
      for (let i = 0, data_1 = data; i < data_1.length; i++) {
        const item = data_1[i];
        cb(item, parent, deep);
        const childrenVal = item[options.childrenMapName];
        if (childrenVal && childrenVal.length > 0) {
          deepFn(childrenVal, item, deep + 1);
        }
      }
    };

    deepFn(tree, null, 1);
  }
}
