@Component({
  selector: 'components-table-basic',
  template: `
  <ad-st
    #basic
    [initLoadData]="false"
    [data]="basicData"
    [columns]="basicColumns"
    [showPagination]="false"
  >
  </ad-st>
  `
})
export class ComponentsTableBasicComponent {
  basicData = [
    {id: 1, avatar: '', name: '张三', regTime: '2018-11-29 12:00:00'},
    {id: 2, avatar: '', name: '李四', regTime: '2018-11-29 13:00:00'},
    {id: 3, avatar: '', name: '王五', regTime: '2018-11-29 14:00:00'}
  ];

  basicColumns = [
    {index: 'avatar', title: '头像', type: 'avatar', shape: 'circle'},
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
}
