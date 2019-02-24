@Component({
  selector: 'components-table-checkbox',
  template: `
  <ad-st
    #checkbox
    [showCheckBox]="true"
    [initLoadData]="false"
    [data]="checkboxData"
    [columns]="checkboxColumns"
    [showPagination]="true"
    [isFrontPagination]="true"
  >
  </ad-st>
  `
})
export class ComponentsTableCheckboxComponent {
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
}
