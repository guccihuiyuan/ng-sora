@Component({
  selector: 'components-table-group',
  template: `
  <ad-st
        #group
        [showCheckBox]="true"
        [initLoadData]="false"
        [data]="groupData"
        [columns]="groupColumns"
        [showPagination]="false"
  >
  </ad-st>
  `
})
export class ComponentsTableGroupComponent {
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
}
