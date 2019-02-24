import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { ADSimpleTableData, ADSimpleTableColumn } from './ad-simple-table.interface';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-ad-simple-table',
  templateUrl: './ad-simple-table.component.html',
  styleUrls: ['./ad-simple-table.component.less']
})

// 公用表格分页组件
export class ADSimpleTableComponent implements OnInit, OnChanges {
  // 是否显示序号
  @Input()
  showNumber = true;

  // 大小 default、middle、small
  @Input()
  tableSize = 'middle';
  // 标题
  @Input()
  tableTitle = '';
  // 是否显示border
  @Input()
  showBorder = true;

  // 是否显示分页
  @Input()
  isPagination = true;
  // 是否前端分页
  @Input()
  isFrontPagination = false;

  // 是否显示checkbox
  @Input()
  showCheckBox = false;
  // 数据源的ID，主要用于checkbox、快速编辑功能等判断是否是同一个数据
  @Input()
  dataSourceId: number | string = null;
  // 当有checkBox，最大显示数量
  @Input()
  maxCheckCount = 500;

  // 请求地址，如果用了该变量默认在内部做请求处理
  @Input()
  url: string = null;
  // 表格数据，如果用了该变量默认在外部做请求处理
  @Input()
  dataSource: ADSimpleTableData[] = [];
  // 额外参数
  @Input()
  extraParams: any = null;
  // 请求头信息
  @Input()
  reqHeader: any = null;
  // 请求方法，传入 GET | POST...
  @Input()
  reqMehtod = 'POST';
  // 重命名请求参数，支持重命名pageNo、pageSize两个参数
  @Input()
  reqReName: any = {};

  // 重命名排序参数，支持重命名sortName、sortValue两个参数
  @Input()
  sortReName: any = {};
  // 重命名排序参数对应的值，支持重命名descend、ascend
  @Input()
  sortReNameValue: any = {};

  // 重命名返回参数，支持重命名total、list两个参数
  @Input()
  resReName: any = {};

  // 表格字段
  @Input()
  columns: ADSimpleTableColumn[] = [];

  // 数据处理前回调
  @Input()
  preDataChange: (data: ADSimpleTableData[]) => ADSimpleTableData[];
  // 如果需要从外部改变数据的时候调用
  @Input()
  preResponseDataChange: (data: any) => any;
  // 初始化的时候是否加载数据
  @Input()
  initLoadData = true;

  // 请求数据
  @Output()
  requestDataSourceEmitter = new EventEmitter<object>();
  // 多选框改变事件
  @Output()
  checkboxChangeEmitter = new EventEmitter<ADSimpleTableData[]>();
  // 快速保存数据的事件
  @Output()
  saveRowEmitter = new EventEmitter<ADSimpleTableData>();

  // 表格加载状态
  tableIsloading = false;
  // 分页信息
  pageInfo = {
    total: 0,
    pageNo: 1,
    pageSize: 10
  };
  // 是否初始化完成
  initComplete = false;
  // 是否全选
  allChecked = false;
  // 半选择状态
  indeterminate = false;
  // 当前选中的数据
  selectDataSource: ADSimpleTableData[] = [];
  // 快速编辑的缓存
  editCache: any = {};
  // 是否有可编辑的列
  hasEditColumn = false;

  /**
   * 获取深层数据
   */
  static deepGet(obj, path) {
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

  constructor(
    private httpService: HttpClient,
    private messageService: NzMessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initComplete = true;

    if (!this.dataSourceId) {
      this.dataSourceId = 'id';
    }

    // 判断是否有可编辑项目
    for (let i = 0; i < this.columns.length; i++) {
      if (this.columns[i].canEdit) {
        this.hasEditColumn = true;
        break;
      }
    }

    // 判断是否有重命名请求参数
    if (!this.reqReName['pageNo']) {
      this.reqReName['pageNo'] = 'pageNo';
    }
    if (!this.reqReName['pageSize']) {
      this.reqReName['pageSize'] = 'pageSize';
    }

    // 判断是否有重命名排序参数
    if (!this.sortReName['sortName']) {
      this.sortReName['sortName'] = 'sortName';
    }
    if (!this.sortReName['sortValue']) {
      this.sortReName['sortValue'] = 'sortValue';
    }

    // 判断是否有重命名相应参数
    if (!this.resReName['total']) {
      this.resReName['total'] = 'total';
    }
    if (!this.resReName['list']) {
      this.resReName['list'] = 'list';
    }

    // 请求数据
    if (this.initLoadData) {
      this.reloadTable();
    }

    // 赋值
    if (this.dataSource && !this.url && this.showCheckBox) {
      this.selectDataSource = this.dataSource.filter(v => v.checked === true);
    }
  }

  ngOnChanges(changes) {
    // 获取当前输入属性的值
    if (changes['extraParams']) {
      if (this.initComplete) {
        this.extraParamsChange();
      }
    }
    // 检测到数据源有变化并且是前端进行分页
    if (changes['dataSource'] && this.isFrontPagination) {
      this.pageInfo.total = this.dataSource.length;
    }

    if (this.dataSource && !this.url && this.showCheckBox) {

    }
  }

  /**
   * 额外参数改变事件(比如搜索)
   */
  extraParamsChange() {
    // bug：一开始page=0
    if (this.pageInfo.pageNo === 0) {
      this.pageInfo.pageNo = 1;
    }

    if (this.pageInfo.pageNo === 1) {
      // 请求表格数据
      if (this.url !== null) {
        this.requestDataSource(this.generateCommonParams());
      }

      // 通知外部请求
      this.requestDataSourceEmitter.emit(this.generateCommonParams());
      return;
    }

    // 让页码重新回到第一页
    this.pageInfo.pageNo = 1;
    this.requestDataSource(this.generateCommonParams());

    this.cdr.detectChanges();
  }

  /**
   * 刷新表格事件
   */
  public reloadTable() {
    // 请求表格数据
    if (this.url !== null) {
      this.requestDataSource(this.generateCommonParams());
    }
    // 请求数据
    this.requestDataSourceEmitter.emit(this.generateCommonParams());
  }

  /**
   * 计算当前序列号
   * @param index 当前页数的index
   */
  calculateOrderNumber(index) {
    return (this.pageInfo.pageNo - 1) * (this.pageInfo.pageSize) + index + 1;
  }

  /**
   * 开始编辑
   */
  startEdit(id: number | string): void {
    this.editCache[ id ].edit = true;
  }

  /**
   * 取消编辑
   */
  cancelEdit(id: number | string): void {
    const index = this.dataSource.findIndex(item => item[this.dataSourceId] === id);
    this.editCache[ id ].data = JSON.parse(JSON.stringify(this.dataSource[ index ]));
    this.editCache[ id ].edit = false;
  }

  /**
   * 编辑保存
   */
  saveEdit(id: number | string): void {
    const tempEditCache = this.editCache[ id ].data;

    // 将参数传入外部
    this.saveRowEmitter.emit(tempEditCache);
  }

  /**
   * 重置编辑缓存
   */
  resetEditCache(): void {
    // 先清空所有数据
    this.editCache = {};

    this.dataSource.forEach(item => {
      if (!this.editCache[ item[this.dataSourceId] ]) {
        this.editCache[ item[this.dataSourceId] ] = {
          edit: false,
          data: JSON.parse(JSON.stringify(item))
        };
      }
    });
  }

  /**
   * 全选或取消全选
   */
  checkAll(value) {
    if (value) {
      let unCheckedCount = 0;
      this.dataSource.forEach((item) => {
        if (!item.checked) {
          unCheckedCount += 1;
        }
      });
      if (this.maxCheckCount !== null) {
        if (this.selectDataSource.length + unCheckedCount > this.maxCheckCount) {
          this.messageService.error('最大不超过' + this.maxCheckCount + '条数据');
          return;
        }
      }
    }

    this.dataSource.forEach(data => {
      data['checked'] = value;

      this.changeCheckedDataSource(data, value);
    });

    // 更新状态
    const allChecked = this.dataSource.every(v => v.checked === true);
    const allUnChecked = this.dataSource.every(v => !v.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);

    this.checkboxChangeEmitter.emit(this.selectDataSource);
  }

  /**
   * 单个选中或取消选中
   */
  checkSingle(event, data) {
    if (this.maxCheckCount !== null) {
      if (event && this.selectDataSource.length + 1 > this.maxCheckCount) {
        setTimeout(() => {
          data.checked = false;
        });
        this.messageService.error('最大不超过' + this.maxCheckCount + '条数据');
        return;
      }
    }

    this.changeCheckedDataSource(data, event);

    const allChecked = this.dataSource.every(value => value['checked'] === true);
    const allUnChecked = this.dataSource.every(value => !value['checked']);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);

    this.checkboxChangeEmitter.emit(this.selectDataSource);
  }

  /**
   * 清空选择的
   */
  public clearChecked() {
    this.selectDataSource = [];

    this.dataSource.forEach((data) => {
      // 设置状态
      data.checked = false;
    });

    // 更新状态
    this.allChecked = false;
    this.indeterminate = false;

    this.checkboxChangeEmitter.emit(this.selectDataSource);
  }

  /**
   * 批量删除清理数据
   */
  public batchDelete() {
    // 是否回到第一页
    let backToFirstPageNo = false;

    let selectCurrentPageCount = 0;

    for (let i = 0; i < this.dataSource.length; i++) {
      for (let j = 0; j < this.selectDataSource.length; j++) {
        if (this.dataSource[i][this.dataSourceId] === this.selectDataSource[j][this.dataSourceId]) {
          selectCurrentPageCount += 1;
          // 退出循环
          if (selectCurrentPageCount === this.dataSource.length) {
            break;
          }
        }
      }
      // 退出循环
      if (selectCurrentPageCount === this.dataSource.length) {
        break;
      }
    }

    if (selectCurrentPageCount === this.dataSource.length) {
      backToFirstPageNo = true;
    }

    // 清空选择项目
    this.clearChecked();

    if (backToFirstPageNo) {
      this.pageInfo.pageNo = 1;
      this.reloadTable();
    } else {
      this.reloadTable();
    }
  }

  /**
   * 改变当前保存选中的数据
   */
  changeCheckedDataSource(dataSource, checked) {
    let isAdcd = true;

    this.selectDataSource.forEach((selectedData, index) => {
      if (this.dataSourceId) {
        if (selectedData[this.dataSourceId] === dataSource[this.dataSourceId]) {
          if (!checked) {
            this.selectDataSource.splice(index, 1);
          }
          isAdcd = false;
          return;
        }
      }
    });

    if (isAdcd && checked) {
      this.selectDataSource.push(dataSource);
    }
  }

  /**
   * 排序事件
   */
  sortChange(column, value) {
    if (value === 'descend') {
    } else if (value === 'ascend') {
    }

    // 重置为空
    this.columns.forEach(data => {
      if (data.sortValue !== undefined) {
        data.sortValue = null;
      }
    });

    // 设置新值
    column.sortValue = value;

    // 通知外部以该值进行排序
    const totalParams = this.generateCommonParams();

    // 请求表格数据
    if (this.url !== null) {
      this.requestDataSource(this.generateCommonParams());
    }

    // 请求数据
    this.requestDataSourceEmitter.emit(totalParams);
  }

  /**
   * 生成公共请求参数
   */
  generateCommonParams() {
    // 生成所有请求参数
    let totalParams = {};

    // 额外参数
    if (this.extraParams !== null) {
      totalParams = {...this.extraParams};
    }

    // 分页参数
    if (this.isPagination && !this.isFrontPagination) {
      const pageParams = JSON.parse(JSON.stringify(this.pageInfo));
      totalParams[this.reqReName['pageNo']] = pageParams.pageNo;
      totalParams[this.reqReName['pageSize']] = pageParams.pageSize;
    }

    // 排序参数
    this.columns.forEach(column => {
      if (column.sortValue !== undefined && column.sortValue !== null) {
        totalParams[this.sortReName['sortName']] = column.index;

        // 重命名排序值的value
        let tureValue = column.sortValue;
        if (tureValue === 'descend') {
          // 降序
          if (this.sortReNameValue['descend']) {
            tureValue = this.sortReNameValue['descend'];
          }
        } else if (tureValue === 'ascend') {
          // 升序
          if (this.sortReNameValue['ascend']) {
            tureValue = this.sortReNameValue['ascend'];
          }
        }
        totalParams[this.sortReName['sortValue']] = tureValue;
      }
    });

    return totalParams;
  }

  disableInputNumber (data, column) {
    if (!column.isDisable) {
      return false;
    } else {
      return column.isDisable(data);
    }
  }

  /**
   * 格式化字符串
   */
  formatText(data, column) {
    if (column.format) {
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
   * 格式化元
   */
  formatYuan(data, column) {
    const prefix = '￥';
    if (!data[column.index] || data[column.index] === null || data[column.index] === 'null') {
      return prefix + 0;
    } else {
      return prefix + data[column.index];
    }
  }

  /**
   * 格式化图片
   */
  formatImage(data, column) {
    if (column.format) {
      return column.format(data);
    }
    return data[column.index];
  }

  /**
   * 按钮是否显示
   */
  btnIsShow(data, btnColumn) {
    if (btnColumn.isShow) {
      const isShow = btnColumn.isShow(data);
      btnColumn.isShowDivider = isShow;
      return isShow;
    }
    btnColumn.isShowDivider = true;
    return true;
  }

  /**
   * 请求表格数据
   */
  requestDataSource(params): void {
    if (this.url !== null && typeof this.url === 'string') {
      this.tableIsloading = true;

      let httpParams = {};
      let options = {};

      if (this.reqMehtod === 'GET') {
        httpParams = params;
      } else if (this.reqMehtod === 'POST') {
        httpParams = params;
      }

      if (this.reqHeader !== null) {
        options = Object.assign(options, {headers: this.reqHeader});
      } else {// 默认使用form表单形式
        options = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}};
      }

      this.request(this.reqMehtod, this.url, httpParams, options).pipe(
        catchError(error => of(error))
      ).subscribe(httpResponseData => {
        this.tableIsloading = false;

        if (httpResponseData instanceof HttpErrorResponse) {
          return;
        }

        // 如果需要从外面处理数据的时候调用
        if (this.preResponseDataChange) {
          httpResponseData = this.preResponseDataChange(httpResponseData);
        }

        let dataSource = ADSimpleTableComponent.deepGet(httpResponseData, this.resReName['list']);
        if (dataSource === null) {
          return;
        }

        if (this.preDataChange) {
          dataSource = this.preDataChange(dataSource);
        }
        this.dataSource = dataSource;

        if (!this.isFrontPagination) {
          this.pageInfo.total = ADSimpleTableComponent.deepGet(httpResponseData, this.resReName['total']);
        } else {
          this.pageInfo.total = this.dataSource.length;
        }

        // 重置编辑
        if (this.hasEditColumn) {
          this.resetEditCache();
        }

        if (this.showCheckBox) {
          this.dataSource.forEach((data) => {
            // data.checked = false;

            // 是否曾在选中的数据里面
            let findInSelected = false;
            this.selectDataSource.forEach((selectedData) => {
              if (this.dataSourceId) {
                if (data[this.dataSourceId] === selectedData[this.dataSourceId]) {
                  findInSelected = true;
                  data.checked = true;
                }
              }
            });

            // 如果没有找到并且是选中状态，则添加到选中数据里面
            if (!findInSelected && data.checked) {
              this.selectDataSource.push(data);
            }

            // 如果都没有，设置为false
            if (!data.checked) {
              data.checked = false;
            }
          });

          const allChecked = this.dataSource.every(value => value['checked'] === true);
          const allUnChecked = this.dataSource.every(value => !value['checked']);
          this.allChecked = allChecked;
          this.indeterminate = (!allChecked) && (!allUnChecked);

          // 向外传递事件
          this.checkboxChangeEmitter.emit(this.selectDataSource);
        }
      });
    }
  }

  /**
   * 点击按钮事件
   */
  tableRowBtnClick($event, btn, data) {
    $event.stopPropagation();
    btn.click(data);
  }

  /**
   * checkbox选中事件
   */
  tableRowCheckboxClick($event, data) {
    $event.stopPropagation();
  }

  pageIndexChange() {
    if (this.pageInfo.pageNo === 0) {
      return;
    }

    if (!this.isFrontPagination) {
      // 请求表格数据
      if (this.url !== null) {
        this.requestDataSource(this.generateCommonParams());
      }

      // 请求数据
      this.requestDataSourceEmitter.emit(this.generateCommonParams());
    }
  }

  pageSizeChange() {
    this.pageInfo.pageNo = 1;

    if (!this.isFrontPagination) {
      this.reloadTable();
    }
  }

  /**
   * 转换不同的请求方式
   */
  request(type: string, url: string, params: any = {}, options: any): Observable<any> {
    switch (type) {
      case 'GET':
        return this.get(url, params, options);
      case 'POST':
        return this.post(url, params, options);
    }
  }

  /**
   * POST请求
   * @param url     请求地址
   * @param params  请求参数
   * @param options 其他选项
   */
  post(url: string, params: any = {}, options: any): Observable<any> {
    // 去掉GET请求的查询参数
    options = Object.assign(options, {params: {}});

    // 去空
    const keys = Object.keys(params);
    keys.forEach((key) => {
      if (
        params[key] === null || params[key] === 'null' || params[key] === '' || (params[key] instanceof Array && params[key].length === 0)
      ) {
        delete params[key];
      }
    });

    return this.httpService.post(url, params, options);
  }

  /**
   * GET请求
   * @param url     请求地址
   * @param params  请求参数
   * @param options 其他选项
   */
  get(url: string, params: any = {}, options: any): Observable<any> {
    // 去空
    const keys = Object.keys(params);
    keys.forEach((key) => {
      if (params[key] === null || params[key] === '' || (params[key] instanceof Array && params[key].length === 0)) {
        delete params[key];
      }
    });

    options = Object.assign(options, {params: params});

    return this.httpService.get(url, options);
  }
}

