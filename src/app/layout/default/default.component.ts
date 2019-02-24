import { Component } from '@angular/core';
import { LAYOUT_FOOTER_HEIGHT, LAYOUT_HEADER_HEIGHT } from '../../config/app.config';

@Component({
  selector: 'app-layout-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.less']
})
export class LayoutDefaultComponent {
  headerHeight = LAYOUT_HEADER_HEIGHT + 'px';
  footerHeight = LAYOUT_FOOTER_HEIGHT + 'px';

  constructor() {

  }


}
