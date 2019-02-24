@Component({
  selector: 'components-table-tree',
  template: `
  <ad-st
    #tree
    [initLoadData]="false"
    [data]="treeData"
    [columns]="treeColumns"
    [showPagination]="false"
    [asyncTreeData]="true"
    (requestChildrenDataEmitter)="requestChildrenDataEmitter($event)"
  >
  </ad-st>
  `
})
export class ComponentsTableTreeComponent {
  treeData = [
      {id: 1, name: '手机', catrgoryName: '一级分类1'},
      {id: 2, name: '服装', catrgoryName: '一级分类2'}
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
}
