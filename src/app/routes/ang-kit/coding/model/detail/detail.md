## 数据模型
用来声明数据中有哪些属性，我们在使用对象的时候，比如商品对象，一般的都直接这样写 **goods = {name: '商品名称', type: '1'}** ，如果只是本地数据，这样看起来没什么问题，不过如果这个对象是通过与后端交互所获得的对象的时候，当换成其他人来维护代码，他第一眼并不知道这个商品数据里面有哪些属性，这些属性都代表了什么意思，而且在代码中调用对象属性的时候，无法获取编译器的提示和报错，这样的代码是有隐患的。

正确是的使用方式，例如：在models下面新建一个 **goods.model.ts** 文件
```angular
/**
 * 商品分类模型
 */
export interface GoodsCategoryModel {
  id?: string;
  pid?: string;
  /**
   * 名称
   */
  categoryName?: string;
  /**
   * 层级
   */
  categoryLevel?: number;
  createTime?: string;
  updateTime?: string;
}
```

外部使用：
<br/>
1.声明：**const gooodsCategory: GoodsCategoryModel**
<br/>
2.获取对象：**gooodsCategory.categoryName**
<br/>
这样一眼就知道 **gooodsCategory** 是什么类型的对象，有哪些属性，并且调用属性可以获取编译器的提示，如果调用了不存在的属性，编译器会给出报错提示
