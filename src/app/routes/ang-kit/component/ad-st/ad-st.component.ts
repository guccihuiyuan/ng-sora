import {Component, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ADSTComponent} from '../../../../../../projects/ang-kit/component/src/ad-st/ad-st.component';

declare var require: any;

@Component({
  templateUrl: './ad-st.component.html',
  styleUrls: ['./ad-st.component.less']
})
export class AppADStComponent implements OnInit {
  @ViewChild('tree')
  private treeST: ADSTComponent;

  basicMd = require('raw-loader!./code/basic.md');
  checkboxMd = require('raw-loader!./code/checkbox.md');
  sortMd = require('raw-loader!./code/sort.md');
  expandMd = require('raw-loader!./code/expand.md');
  treeMd = require('raw-loader!./code/tree.md');
  requestMd = require('raw-loader!./code/request.md');
  innerReqMd = require('raw-loader!./code/innerRequest.md');
  stylesMd = require('raw-loader!./code/styles.md');
  groupMd = require('raw-loader!./code/group.md');

  basicExpand = false;
  checkboxExpand = false;
  sortExpand = false;
  expandExpand = false;
  treeExpand = false;
  requestExpand = false;
  innerReqExpand = false;
  stylesExpand = false;
  groupExpand = false;

  basicData = [
    {id: 1, avatar: '', name: '张三', regTime: '2018-11-29 12:00:00'},
    {id: 2, avatar: '', name: '李四', regTime: '2018-11-29 13:00:00'},
    {id: 3, avatar: '', name: '王五', regTime: '2018-11-29 14:00:00'}
  ];

  basicColumns = [
    {index: 'avatar', title: '头像', type: 'avatar'},
    {index: 'name', title: '姓名'},
    {index: 'regTime', title: '注册时间', type: 'date', dateFormat: 'yyyy-MM-dd' },
    {title: '操作',
      buttons: [
        {
          text: '操作1',
          show: (item) => {
            return true;
          },
          click: (item) => {
            console.log(item);
          }
        },
        {
          text: '下拉',
          children: [
            {
              text: '操作2',
              show: (item) => {
                return true;
              },
              click: (item) => {
                console.log(item);
              }
            },
            {
              text: '操作3',
              show: (item) => {
                return true;
              },
              click: (item) => {
                console.log(item);
              }
            }
          ]
        }
      ]
    }
  ];

  checkboxData = [
    {id: 1, avatar: '', code: '1'},
    {id: 2, avatar: '', code: '2'},
    {id: 3, avatar: '', code: '3'},
    {id: 4, avatar: '', code: '4'},
    {id: 5, avatar: '', code: '5'},
    {id: 6, avatar: '', code: '6'},
    {id: 7, avatar: '', code: '7'},
    {id: 8, avatar: '', code: '8'},
    {id: 9, avatar: '', code: '9'},
    {id: 10, avatar: '', code: '10'},
    {id: 11, avatar: '', code: '11'},
    {id: 12, avatar: '', code: '12'},
    {id: 13, avatar: '', code: '13'},
    {id: 14, avatar: '', code: '14'}
  ];

  checkboxColumns = [
    {index: 'code', title: '编号'}
  ];

  sortData = [
    {id: 1, age: 12, name: '乔峰'},
    {id: 2, age: 24, name: '张无忌'},
    {id: 3, age: 6, name: '令狐冲'}
  ];

  sortColumns = [
    {index: 'name', title: '姓名',
      sort: {
        sortValue: null,
        // compare: (a, b) => {
        //   const sortValue = this.sortColumns[0].sort.sortValue;
        //   return sortValue === 'ascend' ? (a['name'].length > b['name'].length ? 1 : -1) : (b['name'].length > a['name'].length ? 1 : -1);
        // }
      }
    },
    {index: 'age', title: '年龄',
      sort: {
        sortValue: null,
        compare: (a, b) => {
          const sortValue = this.sortColumns[1].sort.sortValue;
          return sortValue === 'ascend' ? (a['age'] > b['age'] ? 1 : -1) : (b['age'] > a['age'] ? 1 : -1);
        }
      },
      filter: {
        filterMultiple: true,
        menus: [
          {text: '>10', value: 'v1', byDefault: true},
          {text: '>20', value: 'v2', byDefault: true},
          {text: '>30', value: 'v3'}
        ]
      }
    }
  ];

  expandData = [
    {id: 1, age: 12, name: '乔峰', extra: '太长了，好痛苦！太长了，好痛苦！太长了，好痛苦！太长了，好痛苦！太长了，好痛苦！太长了，好痛苦！太长了，好痛苦！太长了，好痛苦！太长了，好痛苦！太长了，好痛苦！太长了，好痛苦！太长了，好痛苦！太长了，好痛苦！'},
    {id: 2, age: 24, name: '张无忌'},
    {id: 3, age: 6, name: '令狐冲'}
  ];

  expandColumns = [
    {index: 'name', title: '姓名'},
    {index: 'age', title: '年龄'}
  ];

  treeData = [
    {id: 1, name: '手机', catrgoryName: '一级分类1'},
    {id: 2, name: '服装', catrgoryName: '一级分类2'}
    // {id: 1, name: '手机', catrgoryName: '一级分类1', children: [
    //     {id: 1000, name: 'iphonex', catrgoryName: '二级分类1'}
    //   ]},
    // {id: 2, name: '服装', catrgoryName: '一级分类2'}
  ];
  treeColumns = [
    {index: 'name', title: '名称'},
    {index: 'catrgoryName', title: '分类'}
  ];
  requestChildrenDataEmitter([data, reqParams]) {
    setTimeout(() => {
      data.children = [
        {id: 1000, name: 'iphonex', catrgoryName: '手机分类1'}
      ];
      this.treeST.treeChildrenDataLoadComplete();
    }, 1000);
  }

  reqData = [];
  reqColumns = [
    {index: 'a', title: '序号'}
  ];
  reqTotal = 0;
  reqExtraParams = {a: 1, b: 2};
  reqRequestDataEmitter(reqParams) {
    setTimeout(() => {
      if (reqParams.page.pageNo === 1) {
        this.reqData = [
          {id: 1, a: '1'},
          {id: 2, a: '2'},
          {id: 3, a: '3'},
          {id: 4, a: '4'},
          {id: 5, a: '5'},
          {id: 6, a: '6'},
          {id: 7, a: '7'},
          {id: 8, a: '8'},
          {id: 9, a: '9'},
          {id: 10, a: '10'}
        ];
        this.reqTotal = 12;
      } else if (reqParams.page.pageNo === 2) {
        this.reqData = [
          {id: 11, a: '11'},
          {id: 12, a: '12'}
        ];
        this.reqTotal = 12;
      }
    }, 1000);
  }

  // 请求地址
  innerReqUrl = '/users';
  innerReqColumns = [
    {index: 'a', title: '序号'}
  ];
  innerReqExtraParams = {a: 1, b: 2};

  stylesData = [
    {
      name       : '水城县人民政府1',
      trainNumber: 60,
      poorNumber : 30,
      tdStyles: {
        'background': '#003348'
      }
    },
    {
      name       : '水城县人民政府2',
      trainNumber: 60,
      poorNumber : 30,
      tdStyles: {
        'background': '#094056'
      }
    },
    {
      name       : '水城县人民政府3',
      trainNumber: 60,
      poorNumber : 30,
      tdStyles: {
        'background': '#003348'
      }
    },
    {
      name       : '水城县人民政府4',
      trainNumber: 60,
      poorNumber : 30,
      tdStyles: {
        'background': '#094056'
      }
    },
    {
      name       : '水城县人民政府5',
      trainNumber: 60,
      poorNumber : 30,
      tdStyles: {
        'background': '#003348'
      }
    },
    {
      name       : '水城县人民政府6',
      trainNumber: 60,
      poorNumber : 30,
      tdStyles: {
        'background': '#094056'
      }
    },
    {
      name       : '水城县人民政府7',
      trainNumber: 60,
      poorNumber : 30,
      tdStyles: {
        'background': '#003348'
      }
    },
    {
      name       : '水城县人民政府8',
      trainNumber: 60,
      poorNumber : 30,
      tdStyles: {
        'background': '#094056'
      }
    },
    {
      name       : '水城县人民政府1',
      trainNumber: 60,
      poorNumber : 30,
      tdStyles: {
        'background': '#003348'
      }
    },
    {
      name       : '水城县人民政府2',
      trainNumber: 60,
      poorNumber : 30,
      tdStyles: {
        'background': '#094056'
      }
    },
    {
      name       : '水城县人民政府3',
      trainNumber: 60,
      poorNumber : 30,
      tdStyles: {
        'background': '#003348'
      }
    },
    {
      name       : '水城县人民政府4',
      trainNumber: 60,
      poorNumber : 30,
      tdStyles: {
        'background': '#094056'
      }
    },
    {
      name       : '水城县人民政府5',
      trainNumber: 60,
      poorNumber : 30,
      tdStyles: {
        'background': '#003348'
      }
    },
    {
      name       : '水城县人民政府6',
      trainNumber: 60,
      poorNumber : 30,
      tdStyles: {
        'background': '#094056'
      }
    },
    {
      name       : '水城县人民政府7',
      trainNumber: 60,
      poorNumber : 30,
      tdStyles: {
        'background': '#003348'
      }
    },
    {
      name       : '水城县人民政府8',
      trainNumber: 60,
      poorNumber : 30,
      tdStyles: {
        'background': '#094056'
      }
    }
  ];
  stylesColumns = [
    {
      'index': 'name',
      'thStyles': {'background': '#003348', 'color': 'white', 'z-index': '100', 'position': 'relative', 'border-bottom': '0', 'border-right': '0', 'padding-left': '0'},
      'tdStyles': {'color': 'white', 'border-bottom': '0', 'border-right': '0'},
      'format': (item) => {
        return this.sanitizer.bypassSecurityTrustHtml('<span style="background: deepskyblue;width: 20px;height: 20px;display: inline-block;margin-right: 10px;text-align: center;">1</span>' + item.name);
      },
      'titleFormat': (column) => {
        return this.sanitizer.bypassSecurityTrustHtml('<span style="padding-left: 8px">企业名称</span>' + '<div style="background: deepskyblue;width: 100%;height: 3px;position: absolute;bottom: 0"></div>');
      }
    },
    {
      'index': 'trainNumber',
      'thStyles': {'background': 'deepskyblue', 'color': 'black', 'z-index': '100', 'position': 'relative', 'border-bottom': '0', 'border-right': '0'},
      'tdStyles': {'color': 'yellow', 'border-bottom': '0', 'border-right': '0'},
      'titleFormat': (column) => {
        return this.sanitizer.bypassSecurityTrustHtml('困难家庭' + '<br/>' + '（人）' + '<div style="background: deepskyblue;height: 3px"></div>');
      }
    },
    {
      'index': 'poorNumber',
      'thStyles': {'background': 'deepskyblue', 'color': 'black', 'z-index': '100', 'position': 'relative', 'border-bottom': '0', 'border-right': '0'},
      'tdStyles': {'color': 'yellow', 'border-bottom': '0', 'border-right': '0'},
      'titleFormat': (column) => {
        return this.sanitizer.bypassSecurityTrustHtml('困难人口' + '<br/>' + '（人）' + '<div style="background: deepskyblue;height: 3px"></div>');
      }
    }
  ];

  groups = [
    {title: 'Other', colSpan: 4, level: 0},
    {title: 'Address', colSpan: 3, level: 1},
    {title: 'Block', colSpan: 2, level: 2},
  ];

  groupColumns = [
    {index: 'Name', title: 'Name', rowSpan: 4},
    {index: 'Age', title: 'Age', rowSpan: 3, group: this.groups[0]},
    {index: 'Street', title: 'Street', rowSpan: 2, group: this.groups[1]},
    {index: 'Building', title: 'Building', group: this.groups[2]},
    {index: 'Door', title: 'Door', group: this.groups[2]}
  ];

  groupData = [
    {id: 1, Age: '10', Name: '张三', Street: 'aaa', Building: 'aaa-1', Door: 'aaa-2'},
    {id: 2, Age: '11', Name: '李四', Street: 'bbb', Building: 'bbb-1', Door: 'bbb-2'},
    {id: 3, Age: '12', Name: '王五', Street: 'ccc', Building: 'ccc-1', Door: 'ccc-2'}
  ];

  basicHandle() {
    this.basicExpand = !this.basicExpand;
  }

  checkboxHandle() {
    this.checkboxExpand = !this.checkboxExpand;
  }

  sortHandle() {
    this.sortExpand = !this.sortExpand;
  }

  expandHandle() {
    this.expandExpand = !this.expandExpand;
  }

  treeHandle() {
    this.treeExpand = !this.treeExpand;
  }

  requestHandle() {
    this.requestExpand = !this.requestExpand;
  }

  innerReqHandle() {
    this.innerReqExpand = !this.innerReqExpand;
  }

  stylesHandle() {
    this.stylesExpand = !this.stylesExpand;
  }

  groupHandle() {
    this.groupExpand = !this.groupExpand;
  }

  constructor(
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
  }
}
