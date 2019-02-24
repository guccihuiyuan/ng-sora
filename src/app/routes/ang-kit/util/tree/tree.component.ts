import {Component, OnInit} from '@angular/core';
import {TreeService} from '../../../../../../projects/ang-kit/util/src/array/tree.service';

@Component({
  templateUrl: './tree.component.html',
})
export class TreeComponent implements OnInit {
  constructor(private treeService: TreeService) {}
  ngOnInit() {
    const arr = [
      {id: '10', parentId: '0', title: '10'},
      {id: '11', parentId: '10', title: '11'},
      {id: '12', parentId: '10', title: '12'},
      {id: '13', parentId: '10', title: '13', checked: true},
      {id: '20', parentId: '0', title: '20', checked: true}
    ];
    console.log(this.treeService.arrToTreeNode(arr));
  }
}
