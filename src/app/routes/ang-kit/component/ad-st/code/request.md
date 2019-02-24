@Component({
  selector: 'components-table-request',
  template: `
  <ad-st
      #request
      [data]="reqData"
      [columns]="reqColumns"
      [total]="reqTotal"
      [extraParams]="reqExtraParams"
      (requestDataEmitter)="reqRequestDataEmitter($event)"
      [showPagination]="true"
  >
  </ad-st>
  `
})
export class ComponentsTableRequestComponent {
  reqData = [];
  reqColumns = [
        {index: 'a', title: '序号'}
  ];
  reqTotal = 0;
  reqExtraParams = {};
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
}
