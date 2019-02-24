@Component({
  selector: 'components-table-sort',
  template: `
  <ad-st
    #sort
    [initLoadData]="false"
    [data]="sortData"
    [columns]="sortColumns"
    [showPagination]="false"
  >
  </ad-st>
  `
})
export class ComponentsTableSortComponent {
  sortData = [
      {id: 1, age: 12, name: '乔峰'},
      {id: 2, age: 24, name: '张无忌'},
      {id: 3, age: 6, name: '令狐冲'}
  ];
  
  sortColumns = [
      {index: 'name', title: '姓名',
        sort: {
          sortValue: null,
          compare: (a, b) => {
            const sortValue = this.sortColumns[0].sort.sortValue;
            return sortValue === 'ascend' ? (a['name'].length > b['name'].length ? 1 : -1) : (b['name'].length > a['name'].length ? 1 : -1);
          }
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
}
