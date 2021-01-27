import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ADSTColumn, ADSTColumnBtn, ADSTColumnGroup, ADSTData, ADSTReqParams, ADSTReqReName, ADSTResReName } from './ad-st.interface';
import { HttpService, HttpRequestType } from '@ang-kit/http';
import { ADSTConfig } from './ad-st.config';
// TODO 新功能 1.可以禁用某些checkbox(存在问题全选问题)
@Component({
  selector: 'ad-st',
  templateUrl: './ad-st.component.html',
  providers: [HttpService],
  styleUrls: ['./ad-st.component.less']
})
export class ADSTComponent implements OnInit, OnChanges {
  /**
   * 是否初始化完成
   */
  private initComplete = false;
  /**
   * 页面变化数据流
   */
  private pageChanges$ = new Subject();

  /**
   * 表格真正的数据源
   */
  _data: ADSTData[] = [];
  /**
   * 是否显示加载动画
   */
  loading = false;
  /**
   * 当前页码
   */
  pageIndex = 1;
  /**
   * 每页数量
   */
  @Input()
  pageSize = 10;
  /**
   * 当前选中的数据，外部直接获取，不能修改，只能读取
   */
  checkedData: ADSTData[] = [];
  /**
   * 是否勾选了全部
   */
  allChecked = false;
  /**
   * 是否有选中，但不是全选
   */
  indeterminate = false;
  /**
   * 表头tr
   */
  headTrs: [ADSTColumn[]] = [[]];
  /**
   * 最大跨行数
   */
  maxRowSpan: number = null;

  /**
   * 数据源
   */
  @Input()
  data: string | ADSTData[] | Observable<ADSTData[]> = [];
  /**
   * 数据源索引
   */
  @Input()
  dataKey = 'id';
  /**
   * 请求方式
   */
  @Input()
  reqMethod: 'GET' | 'POST' | 'DELETE' | 'PUT' = 'POST';
  /**
   * 请求头
   */
  @Input()
  reqHeader: any = null;

  /**
   * 初始化的时候是否加载数据
   */
  @Input()
  initLoadData = true;

  /**
   * 额外参数
   */
  @Input()
  extraParams: any = null;
  /**
   * 重命名请求参数
   */
  @Input()
  reqReName: ADSTReqReName = {
    page: {
      pageNo: 'pageNo',
      pageSize: 'pageSize'
    },
    sortKey: {
      sortName: 'sortName',
      sortValue: 'sortValue'
    },
    sortValue: {
      ascend: 'ascend',
      descend: 'descend'
    },
    sortWrapKey: 'sort',
    filterWrapKey: 'filter'
  };
  // 重命名返回参数，支持重命名total、list两个参数
  @Input()
  resReName: ADSTResReName = {
    list: 'list',
    total: 'total'
  };

  /**
   * 列描述
   */
  @Input()
  columns: ADSTColumn[] = [];

  /**
   * 头部
   */
  @Input()
  header: string | TemplateRef<void>;
  /**
   * 尾部
   */
  @Input()
  footer: string | TemplateRef<void>;
  /**
   * 无数据时显示内容
   */
  @Input()
  noResult: string | TemplateRef<void>;
  /**
   * table大小
   */
  @Input()
  size: 'small' | 'middle' | 'default' = 'middle';
  /**
   * 延迟显示加载效果的时间（防止闪烁）
   */
  @Input()
  loadingDelay = 0;
  /**
   * 是否展示边框
   */
  @Input()
  showBordered = true;
  /**
   * 横向或纵向滚动
   */
  @Input()
  scroll: { y?: string; x?: string };

  /**
   * 显示为简单分页
   */
  @Input()
  simple = false;
  /**
   * 只有一页时是否隐藏分页器
   */
  @Input()
  hideOnSinglePage = false;
  /**
   * 是否可以快速跳转至某页
   */
  @Input()
  showQuickJumper = true;
  /**
   * 是否可以改变每页大小
   */
  @Input()
  showSizeChanger = true;
  /**
   * 是否显示分页
   */
  @Input()
  showPagination = true;
  /**
   * 是否前端分页
   */
  @Input()
  isFrontPagination = false;
  /**
   * 总数
   */
  @Input()
  total = 0;

  /**
   * 当前列是否包含展开按钮
   */
  @Input()
  expand: TemplateRef<{ $implicit: any; }>;

  /**
   * 是否显示序号
   */
  @Input()
  showNumber = false;

  /**
   * 是否显示勾选框
   */
  @Input()
  showCheckBox = false;
  /**
   * 最大checked数量
   */
  @Input()
  maxCheckedCount = 500;

  /**
   * 是否显示radio
   */
  @Input()
  showRadio = false;

  /**
   * 是否单列排序
   */
  @Input()
  isSingleSort = false;

  /**
   * 是否是异步树形类型数据
   */
  @Input()
  asyncTreeData = false;

  /**
   * 数据处理前回调
   */
  @Input()
  preDataChange: (data: ADSTData[]) => ADSTData[];
  /**
   * 如果需要从外部改变数据的时候调用
   */
  @Input()
  preResponseDataChange: (data: any) => any;

  /**
   * 请求数据的回调，传出请求参数
   */
  @Output()
  requestDataEmitter = new EventEmitter<ADSTReqParams>();

  /**
   * 请求子数据的回调，传出请求参数
   */
  @Output()
  requestChildrenDataEmitter = new EventEmitter<[ADSTData, ADSTReqParams]>();

  constructor(
    private msgService: NzMessageService,
    private cdr: ChangeDetectorRef,
    private httpService: HttpService,
    private config: ADSTConfig,
  ) {
    // 合并配置
    const totalConfig = {...this.config};
    this.dataKey = totalConfig.dataKey;
    this.reqMethod = totalConfig.reqMethod;
    this.reqReName = totalConfig.reqReName;
    this.resReName = totalConfig.resReName;
    this.size = totalConfig.size;
    this.showBordered = totalConfig.showBordered;
    this.showNumber = totalConfig.showNumber;
    this.maxCheckedCount = totalConfig.maxCheckedCount;
  }

  ngOnInit() {
    // 重新合并值
    this.reqReName = {...this.config.reqReName, ...this.reqReName};
    this.reqReName.page = {...this.config.reqReName.page, ...this.reqReName.page};
    this.reqReName.sortKey = {...this.config.reqReName.sortKey, ...this.reqReName.sortKey};
    this.reqReName.sortValue = {...this.config.reqReName.sortValue, ...this.reqReName.sortValue};
    this.resReName = {...this.config.resReName, ...this.resReName};

    // 初始化完成
    this.initComplete = true;

    // 处理 columns
    this.columns.forEach(column => {
      // 初始化值
      column.formatFromCache = true;
      column.formatCache = {};
      column.titleFormatCache = null;

      // 设置 column 样式 和 class
      this.setColumnOrGroupStylesAndClass(column);

      // 设置最大 rowSpan
      if (column.rowSpan) {
        if (!this.maxRowSpan) {
          this.maxRowSpan = column.rowSpan;
        }
        if (column.rowSpan > this.maxRowSpan) {
          this.maxRowSpan = column.rowSpan;
        }
      }

      // 处理分组数据
      if (!column.group) {
        this.headTrs[0].push(column);
      } else {
        // 先 push group
        if (!this.headTrs[column.group.level]) {
          this.headTrs[column.group.level] = [];
        }
        // 防止 group 再 push 一遍
        const added = this.headTrs[column.group.level].some(item => {
          return item['title'] === column.group.title;
        });
        if (!added) {
          const group = column.group;
          this.setColumnOrGroupStylesAndClass(group);
          this.headTrs[column.group.level].push(group);
        }

        // 再 push column
        if (!this.headTrs[column.group.level + 1]) {
          this.headTrs[column.group.level + 1] = [];
        }
        this.headTrs[column.group.level + 1].push(column);
      }
    });

    // 防抖动
    this.pageChanges$.pipe(
      debounceTime(200)
    ).subscribe(() => {
      this.loadData();
    });

    // 空数据并且需要初始化数据就加载数据
    if (this.initLoadData) {
      this.loadData();
    }
  }

  ngOnChanges(changes) {
    // 参数变动-请求数据
    if (changes.extraParams) {
      if (this.initComplete) {
        // 当有分页的时候返回第一页
        if (this.showPagination) {
          this.pageIndex = 1;
        }
        this.loadData();
      }
    }

    if (changes.columns && changes.columns.currentValue) {
      if (this.initComplete) {
        this.resetColumnsCache();
      }
    }

    // 数据源变动-处理数据
    if (changes.data && changes.data.currentValue) {
      // 停止加载
      this.loading = false;

      // 获取当前数据源的值
      const currentValue = changes.data.currentValue;

      // 数据源变化
      if (currentValue instanceof Array) {
        this.resetColumnsCache();
        this.processData(currentValue);
      }
    }
  }

  /**
   * 设置 column 或者 Group 的 样式 和 class
   */
  private setColumnOrGroupStylesAndClass(item: ADSTColumn | ADSTColumnGroup) {
    const totalConfig = this.config;
    if (!item.thClassName) {
      item.thClassName = totalConfig.thClassName;
    }
    if (!item.thStyles) {
      item.thStyles = totalConfig.thStyles;
    }
    if (!item.tdClassName) {
      item.tdClassName = totalConfig.tdClassName;
    }
    if (!item.tdStyles) {
      item.tdStyles = totalConfig.tdStyles;
    }
  }

  /**
   * 重置表格的缓存
   */
  private resetColumnsCache() {
    this.columns.forEach(column => {
      // 初始化值
      column.formatCache = {};
      column.titleFormatCache = null;
    });
  }

  /**
   * 加工数据
   */
  private processData(data: ADSTData[]) {
    const treeData = this.convertTreeToArray(data);

    this.processCheckedData(treeData);
    this.processTreeData(data, null);

    // 设置数据源
    this._data = [...data];
    if (this.showPagination && this.isFrontPagination) {// 只有前端分页的时候，才手动处理
      this.total = data.length;
    }
  }

  /**
   * 处理选中数据
   */
  private processCheckedData(data: ADSTData[]) {
    if (this.showCheckBox) {
      data.forEach((item) => {
        // 是否曾在选中的数据里面
        let findInChecked = false;
        this.checkedData.forEach((selectedData) => {
          if (this.dataKey) {
            if (item[this.dataKey] === selectedData[this.dataKey]) {
              findInChecked = true;
              item.checked = true;
            }
          }
        });

        // 如果没有找到并且是选中状态，则添加到选中数据里面
        if (!findInChecked && item.checked) {
          this.checkedData.push(item);
        }

        // 如果都没有，设置为false
        if (!item.checked) {
          item.checked = false;
        }
      });

      const allChecked = data.every(value => value.checked === true);
      const allUnChecked = data.every(value => !value.checked);
      this.allChecked = allChecked;
      this.indeterminate = (!allChecked) && (!allUnChecked);
    }
  }

  /**
   * 处理树形数据
   */
  private processTreeData(data: ADSTData[], parent: ADSTData, level: number = 0) {
    data.forEach(v => {
      v.parent = parent;
      v.level = level;
      v.isLoading = false;

      if (v.children && v.children.length > 0) {
        this.processTreeData(v.children, v, level + 1);
      }
    });
  }

  /**
   * 树形结构子数据加载完成
   */
  public treeChildrenDataLoadComplete() {
    this.processTreeData(this._data, null);
  }

  /**
   * 当前页码改变时的回调函数
   */
  pageIndexChange(pageIndex: number) {
    if (this.pageIndex === 0) {
      return;
    }

    // 后端分页，请求数据
    if (!this.isFrontPagination) {
      this.pageChanges$.next();
    }
  }

  /**
   * 页数改变时的回调函数
   */
  pageSizeChange(pageSize: number) {
    this.pageIndex = 1;

    // 后端分页，请求数据
    if (!this.isFrontPagination) {
      this.pageChanges$.next();
    }
  }

  /**
   * 获取深层数据
   */
  private deepGet(obj, path = '') {
    if (!path) {
      return null;
    }
    // 将字符串转换成数组
    const arrayPath = path.split('.');

    let tempObj = obj;

    for (let i = 0; i < arrayPath.length; i++) {
      const pathStr = arrayPath[i];
      if (tempObj.hasOwnProperty(pathStr)) {
        tempObj = tempObj[pathStr];
      } else {
        return null;
      }
    }

    return tempObj;
  }

  /**
   * 生成公共参数
   */
  private generateCommonParams(): ADSTReqParams {
    // 生成所有请求参数
    const totalParams: ADSTReqParams = {
      extra: null,
      page: null,
      sort: null,
      filter: null,
      merge: null
    };

    // 合并额外参数
    if (this.extraParams !== null) {
      totalParams.extra = {...this.extraParams};
    }

    // 分页参数
    if (this.showPagination && !this.isFrontPagination) {
      if (!totalParams.page) {
        totalParams.page = {};
      }
      totalParams.page[this.reqReName.page.pageNo] = this.pageIndex;
      totalParams.page[this.reqReName.page.pageSize] = this.pageSize;
    }

    // (排序 && 过滤) 参数
    this.columns.forEach((column: ADSTColumn) => {
      // 排序
      if (column.sort && column.sort.sortValue !== undefined && column.sort.sortValue !== null) {
        if (!totalParams.sort) {
          totalParams.sort = [];
        }

        const sort = {};

        // key
        sort[this.reqReName.sortKey.sortName] = column.index;

        // value
        let tureValue: any = column.sort.sortValue;
        if (tureValue === 'descend') {
          tureValue = this.reqReName.sortValue.descend;
        } else if (tureValue === 'ascend') {
          tureValue = this.reqReName.sortValue.ascend;
        }
        sort[this.reqReName.sortKey.sortValue] = tureValue;

        totalParams.sort.push(sort);
      }

      // 过滤
      if (column.filter && column.filter.menus) {
        if (!totalParams.filter) {
          totalParams.filter = [];
        }

        const filter = {};

        filter[column.index] = column.filter.menus.filter(v => v.byDefault).map(v => v.value);

        totalParams.filter.push(filter);
      }
    });

    // sort
    let sortParams = null;
    if (this.isSingleSort && totalParams.sort) {// 单列排序
      sortParams = totalParams.sort[0];
    } else if (!this.isSingleSort) {
      sortParams = {};
      sortParams[this.reqReName.sortWrapKey] = totalParams.sort;
    }

    // filter
    let filterParams = null;
    if (totalParams.filter) {
      filterParams = {};
      filterParams[this.reqReName.filterWrapKey] = totalParams.filter;
    }

    // 合并
    totalParams.merge = Object.assign({}, totalParams.page, totalParams.extra, sortParams, filterParams);

    return totalParams;
  }

  /**
   * 当前页面展示数据改变的回调函数
   */
  currentPageDataChange(event) {
  }

  /**
   * 勾选/取消勾选所有事件
   */
  checkAllChange(checked: boolean) {
    const treeData = this.convertTreeToArray(this._data);

    // 判断数量是否超过
    if (checked) {
      let unCheckedCount = 0;
      treeData.forEach((item) => {
        // if (!item.checked) {
        //   unCheckedCount += 1;
        // }
        if (!item.checked && !item.disabled) {
          unCheckedCount += 1;
        }
      });
      if (this.maxCheckedCount !== null) {
        if (this.checkedData.length + unCheckedCount > this.maxCheckedCount) {
          this.msgService.error('最大不超过' + this.maxCheckedCount + '条数据');
          return;
        }
      }
    }

    // 改变已缓存数据的选中状态
    treeData.forEach(data => {
      // data.checked = checked;
      if (!data.disabled) {
        data.checked = checked;
      }
      this.changeCheckedData(data, checked);
    });

    // 更新状态
    const allChecked = treeData.every(v => v.checked === true);
    const allUnChecked = treeData.every(v => !v.checked);
    if (allChecked || allUnChecked) {
      this.allChecked = allChecked;
      this.indeterminate = (!allChecked) && (!allUnChecked);
    }
  }

  /**
   * 勾选/取消勾选单个事件
   */
  checkSingleChange(checked: boolean, data: ADSTData) {
    // 判断数量是否超过
    if (this.maxCheckedCount !== null) {
      if (checked && this.checkedData.length + 1 > this.maxCheckedCount) {
        setTimeout(() => {
          data.checked = false;
        });
        this.msgService.error('最大不超过' + this.maxCheckedCount + '条数据');
        return;
      }
    }

    // 改变已缓存数据的选中状态
    this.changeCheckedData(data, checked);

    const treeData = this.convertTreeToArray(this._data);

    const allChecked = treeData.every(value => value.checked === true);
    const allUnChecked = treeData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  /**
   * 将树形结构数组转换成数组
   */
  private convertTreeToArray(treeData: ADSTData[]): ADSTData[] {
    const arr = [];

    // 定义一个递归方法
    const deepFn = function (tree: ADSTData[], data: ADSTData[]) {
      for (let i = 0, data_1 = tree; i < data_1.length; i++) {
        const item = data_1[i];

        data.push(item);

        const childrenVal = item.children;
        if (childrenVal && childrenVal.length > 0) {
          deepFn(childrenVal, data);
        }
      }
    };

    deepFn(treeData, arr);

    return arr;
  }

  /**
   * 改变当前保存选中的数据
   */
  private changeCheckedData(data: ADSTData, checked: boolean) {
    let canAdd = true;

    this.checkedData.forEach((value, index) => {
      if (this.dataKey) {
        if (value[this.dataKey] === data[this.dataKey]) {// 找到索引相同的数据
          if (!checked) {// 取消选中
            this.checkedData.splice(index, 1);
          }
          canAdd = false;
          return;
        }
      }
    });

    // if (canAdd && checked) {
    //   this.checkedData.push(data);
    // }
    if (canAdd && checked && !data.disabled) {
      this.checkedData.push(data);
    }
  }

  /**
   * 请求数据
   */
  private requestData(): void {
    const httpParams = this.generateCommonParams().merge;
    let options = {};
    let httpMethod;

    if (this.reqMethod === 'GET') {
      httpMethod = HttpRequestType.GET;
    } else if (this.reqMethod === 'POST') {
      httpMethod = HttpRequestType.POST;
    } else if (this.reqMethod === 'PUT') {
      httpMethod = HttpRequestType.PUT;
    } else if (this.reqMethod === 'DELETE') {
      httpMethod = HttpRequestType.DELETE;
    }

    if (this.reqHeader !== null) {
      options = Object.assign(options, {headers: this.reqHeader});
    } else {// 默认使用form表单形式
      options = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}};
    }

    this.httpService.request(httpMethod, this.data as string, httpParams, options).subscribe(res => {
      this.loading = false;

      if (res.flag) {
        let httpResponseData = res.data;

        // 如果需要从外面处理数据的时候调用
        if (this.preResponseDataChange) {
          httpResponseData = this.preResponseDataChange(httpResponseData);
        }

        let dataSource = this.deepGet(httpResponseData, this.resReName.list);
        if (dataSource === null) {
          // 没有数据的时候，显示空数据
          dataSource = [];
          // return;
        }

        if (this.preDataChange) {
          dataSource = this.preDataChange(dataSource);
        }

        this.resetColumnsCache();
        this.processData(dataSource);

        if (!this.isFrontPagination && this.showPagination) {// 显示分页并且是后端分页
          this.total = this.deepGet(httpResponseData, this.resReName.total) || 0;
        }
      }
    });
  }

  /**
   * 排序改变事件
   */
  sortChange(column: ADSTColumn, value: any) {
    if (this.isSingleSort) {// 单列排序
      // 重置为空
      this.columns.forEach(c => {
        if (c.sort && c.sort.sortValue) {
          c.sort.sortValue = null;
        }
      });
    }

    // 设置新值
    column.sort.sortValue = value;

    // 本地排序
    if (column.sort.compare) {
      this._data = [...this._data.sort(column.sort.compare)];
      return;
    }

    // 请求数据
    this.loadData();
  }

  /**
   * 多列排序触发事件
   */
  theadSortChange(sortValue: {key: string, value: 'ascend' | 'descend' | null}) {

  }

  /**
   * 过滤改变
   */
  filterChange(column: ADSTColumn, filterValues: any[]) {
    if (typeof this.data === 'string') {
      // 请求数据
      this.loadData();
    } else {
      // TODO 本地过滤 暂不支持
    }
  }

  /**
   * 是否展开
   */
  expandChange(value: boolean) {

  }

  treeExpandChange(value: boolean, data: ADSTData) {
    if (!data.treeExpand || (data.children && data.children.length > 0)) {
      return;
    }
    if (!data.isLeaf) {// 不是叶子节点，去请求数据
      if (typeof this.data === 'string') {// url请求
        // TODO 远程请求 暂不支持
      } else {// 数据
        data.isLoading = true;
        this.requestChildrenDataEmitter.emit([data, this.generateCommonParams()]);
      }
    }
  }

  /**
   * 格式化th的内容
   */
  formatTheadContent(column: ADSTColumn) {
    // if (column.titleFormat) {
    //   return column.titleFormat(column);
    // }
    if (column.titleFormat) {
      // if (column.formatFromCache && column.titleFormatCache) {
      //   return column.titleFormatCache;
      // }
      // column.titleFormatCache = column.titleFormat(column);
      // return column.titleFormatCache;
      return column.titleFormat(column);
    }
    if (!column.title || column.title === 'null') {
      return '';
    }
    return column.title;
  }

  /**
   * 格式化文字
   */
  formatText(data: ADSTData, column: ADSTColumn, dataIndex: number) {
    // if (column.format) {
    //   return column.format(data);
    // }
    if (column.format) {
      // if (column.formatFromCache && column.formatCache[dataIndex]) {// 从缓存中取值
      //   return column.formatCache[dataIndex];
      // }
      // column.formatCache[dataIndex] = column.format(data);
      // return column.formatCache[dataIndex];
      return column.format(data);
    }
    if (data[column.index] === 0) {
      return 0;
    }
    if (!data[column.index] || data[column.index] === null || data[column.index] === 'null') {
      return '';
    }
    return data[column.index];
  }

  /**
   * 格式化Src
   */
  formatSrc(data: ADSTData, column: ADSTColumn) {
    if (column.format) {
      return column.format(data);
    }
    return data[column.index];
  }

  /**
   * 格式化按钮是否显示
   */
  formatBtnShow(data: ADSTData, btn: ADSTColumnBtn) {
    if (btn.show) {
      return btn.show(data, btn);
    }
    return true;
  }

  /**
   * td className 格式化
   */
  tdClassNameFormat(data: ADSTData, column: ADSTColumn) {
    let className = '';
    if (data.tdClassName) {
      className += data.tdClassName + ' ' + column.tdClassName;
    } else {
      className = column.tdClassName;
    }
    return className;
  }

  /**
   * td 样式 格式化
   */
  tdStylesFormat(data: ADSTData, column: ADSTColumn) {
    let dataTdStyles = {};
    if (data.tdStyles) {
      dataTdStyles = data.tdStyles;
    }
    return {...dataTdStyles, ...column.tdStyles};
  }

  /**
   * 计算可展开的间距
   */
  calIndentSize(data: ADSTData, i: number) {
    if (data.level === 0) {
      if (data.isLeaf || !this.asyncTreeData && (!data.children || (data.children && data.children.length === 0))) {
        return null;
      }
      return i === 0 ? data.level * 20 : null;
    }
    return i === 0 ? data.level * 20 : null;
  }

  /**
   * 点击按钮事件
   */
  btnClick(event, btn: ADSTColumnBtn, data: ADSTData) {
    event.stopPropagation();
    btn.click(data);
  }

  /**
   * 计算当前序列号
   * @param index 当前页数的index
   */
  calculateOrderNumber(index) {
    if (typeof index === 'string') {
      return '';
    }
    return (this.pageIndex - 1) * (this.pageSize) + index + 1;
  }

  /**
   * 加载数据
   */
  public loadData() {
    this.loading = true;

    if (typeof this.data === 'string') {// url请求
      this.requestData();
    } else {// 数据
      this.requestDataEmitter.emit(this.generateCommonParams());
    }
  }

  /**
   * 清空所有选择的数据
   */
  public clearChecked() {
    this.checkedData = [];

    this._data.forEach((data) => {
      // 设置状态
      data.checked = false;
    });

    // 更新状态
    this.allChecked = false;
    this.indeterminate = false;
  }

  /**
   * 删除选中的数据
   */
  public deleteCheckedData() {
    // 清空选择项目
    this.clearChecked();

    // 回到第一页
    this.pageIndex = 1;
    this.loadData();
  }

  /**
   * 获取所有选中的数据
   */
  public getCheckedData() {
    return this.checkedData;
  }

  /**
   * 删除刷新
   * @param deleteCount 删除数量-默认是1
   */
  public deleteAndLoadData(deleteCount: number = 1) {
    if (this.showPagination) {
      if (this.isFrontPagination) {// 前端分页

      } else {// 后端分页
        // 清空选择项目
        this.clearChecked();

        const curCount = this._data.length;
        if (curCount - deleteCount > 0) {

        } else if (curCount - deleteCount <= 0) {
          // 计算出需要删除的页数
          const pageCount = 1 + parseInt(((- (curCount - deleteCount)) / this.pageSize).toString(), 0);

          if (this.pageIndex - pageCount > 0) {
            this.pageIndex = this.pageIndex - pageCount;
          } else {
            this.pageIndex = 1;
          }
        }

        // 刷新
        this.loadData();
      }
    }
  }
}
