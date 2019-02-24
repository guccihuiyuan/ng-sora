import { Component, OnInit } from '@angular/core';
import { LAYOUT_HEADER_HEIGHT, LAYOUT_FOOTER_HEIGHT } from '../../config/app.config';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  // 头部高度
  headerHeight = LAYOUT_HEADER_HEIGHT;
  // 尾部高度
  footerHeight = LAYOUT_FOOTER_HEIGHT;
  // 主要内容的高度
  mainHeight = 0;
  mainMinHeight = 300;

  ngOnInit() {
    this.setMainHeight();

    // 监听窗口大小的改变
    window.onresize = () => {
      this.setMainHeight();
    };
  }

  /**
   * 获取窗口大小
   */
  setMainHeight() {
    // 可视窗口的高度
    const clientHeight = document.body.clientHeight;
    let mainHeight = (clientHeight - this.headerHeight - this.footerHeight);
    if (mainHeight < this.mainMinHeight) {
      mainHeight = this.mainMinHeight;
    }
    this.mainHeight = mainHeight;
  }
}
