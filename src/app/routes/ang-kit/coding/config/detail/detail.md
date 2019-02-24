## 请求地址
在 **config** 目录下建立一个 **api.config.ts** 文件，将项目中所有的请求地址都写在这个文件里，例如：

```angular
// 地址前缀
const API_PREFIX = '';

// 所有的请求地址放在这里
export const HttpApiUrls = {
  /**
   * 示例
   */
  example: {
    getUser: API_PREFIX + '/user/profile',
    getMenus: API_PREFIX + '/user/menu',
  }
};
```

外部通过这个 **HttpApiUrls** 对象来获取请求地址


## 数据字典
在项目开发过程中，通常都有 **下拉选择框** 或者 **状态值** 这种多个页面都会用到的数据，这些数据不能直接写在用到页面里，必须统一管理，这样以后如果需要修改只用修改一处地方即可，在 **config** 目录下，新建一个 **data-dict** 文件夹，并在下面新建一个 **index.ts** 文件，用来定义状态值声明的规范和获取的方法

```angular
/**
 * 数据字典子项
 */
export interface IDataDictItem {
  CODE: string;
  DESC: string;
}

/**
 * 数据字典，都实现该接口
 */
export interface IDataDict {
  [key: string]: IDataDictItem;
}

/**
 * 将字典对象转换成数组
 */
export function GET_ARRAR_FROM_DICT(dictType: object): IDataDictItem[] {
  const arr = [];

  // 获取所有key
  const dictKeys = Object.keys(dictType);

  dictKeys.forEach((key) => {
    arr.push(dictType[key]);
  });

  return arr;
}

/**
 * 获取对应类型和值的描述
 * @param dictType 字典类型
 * @param code     值
 * @constructor
 */
export function GET_DESC_FROM_DICT(dictType: object, code: string): string {
  if (!code) {
    return '';
  }

  // 获取所有key
  const dictKeys = Object.keys(dictType);

  let desc = '';

  dictKeys.forEach(key => {
    if ((dictType[key].CODE).toString() === code.toString()) {
      desc = dictType[key].DESC;
    }
  });

  return desc;
}
```

创建字典文件，例如订单模块，就在 **data-dict** 文件夹下面新建一个 **order.dict.ts** 文件来管理，例如：
```angular
import {IDataDictItem} from '@appConfig/data-dict';
/**
 * 订单状态接口，一定要声明，这样外部使用，编译器会自动提示有哪些状态值
 */
interface IOrderStatus {
  UNPAID: IDataDictItem;
  COMPLETE: IDataDictItem;
  CANCEL: IDataDictItem;
  CLOSE: IDataDictItem;
  REFUND: IDataDictItem;
}

/**
 * 订单状态
 */
export const OrderStatus: IOrderStatus = {
  UNPAID: {
    CODE: '1',
    DESC: '待付款'
  },
  COMPLETE: {
    CODE: '2',
    DESC: '已完成'
  },
  CANCEL: {
    CODE: '3',
    DESC: '已取消',
  },
  CLOSE: {
    CODE: '4',
    DESC: '已关闭',
  },
  REFUND: {
    CODE: '5',
    DESC: '发生退款'
  }
};
```
使用示例：
<br/>
1.下拉框数据：用 **GET_ARRAR_FROM_DICT(字典对象)** 来填充
<br/>
2.状态判断：**xxx.code === OrderStatus.UNPAID.CODE**
