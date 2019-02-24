@Component({
  selector: 'components-table-innerReq',
  template: `
  <ad-st
        #request
        [resReName]="{list: 'data.list', total: 'data.total'}"
        [reqMethod]="'POST'"
        [data]="innerReqUrl"
        [columns]="innerReqColumns"
        [extraParams]="innerReqExtraParams"
        [showPagination]="true"
      >
  </ad-st>
  `
})
export class ComponentsTableInnerComponent {
  innerReqUrl = '/users';
  innerReqColumns = [
      {index: 'a', title: '序号'}
  ];
  innerReqExtraParams = {a: 1, b: 2};
}
