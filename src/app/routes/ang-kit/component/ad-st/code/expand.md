@Component({
  selector: 'components-table-expand',
  template: `
  <ad-st
      #expand
      [expand]="expand"
      [initLoadData]="false"
      [data]="expandData"
      [columns]="expandColumns"
      [showPagination]="false"
  >
    </ad-st>
  <ng-template #expand let-data>
      {{data.extra}}
  </ng-template>
  `
})
export class ComponentsTableExpandComponent {
  expandData = [
      {id: 1, age: 12, name: '乔峰', extra: '太长了，好痛苦！太长了，好痛苦！太长了，好痛苦！太长了，好痛苦！太长了，好痛苦！太长了，好痛苦！太长了，好痛苦！太长了，好痛苦！太长了，好痛苦！太长了，好痛苦！太长了，好痛苦！太长了，好痛苦！太长了，好痛苦！'},
      {id: 2, age: 24, name: '张无忌'},
      {id: 3, age: 6, name: '令狐冲'}
  ];
  
  expandColumns = [
      {index: 'name', title: '姓名'},
      {index: 'age', title: '年龄'}
  ];
}
