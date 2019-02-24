@Component({
  selector: 'components-table-styles',
  styles: [`
  :host {
    ::ng-deep {
      .th1 {
        background: #003348;
        color: white;
        z-index: 100;
        position: relative;
        border-bottom: 0;
      }
      .th2 {
        background: deepskyblue;
        color: black;
        z-index: 100;
        position: relative;
        border-bottom: 0;
      }
    }
  }
  `]
  template: `
  <ad-st
        #styles
        [initLoadData]="false"
        [data]="stylesData"
        [columns]="stylesColumns"
        [showPagination]="false"
        [showCheckBox]="false"
  ></ad-st>
  `
})
export class ComponentsTableStylesComponent {
  stylesData = [
      {
        name       : '水城县人民政府1',
        trainNumber: 60,
        poorNumber : 30,
        tdStyles: {
          'background': '#003348'
        }
      },
      {
        name       : '水城县人民政府2',
        trainNumber: 60,
        poorNumber : 30,
        tdStyles: {
          'background': '#094056'
        }
      },
      {
        name       : '水城县人民政府3',
        trainNumber: 60,
        poorNumber : 30,
        tdStyles: {
          'background': '#003348'
        }
      },
      {
        name       : '水城县人民政府4',
        trainNumber: 60,
        poorNumber : 30,
        tdStyles: {
          'background': '#094056'
        }
      },
      {
        name       : '水城县人民政府5',
        trainNumber: 60,
        poorNumber : 30,
        tdStyles: {
          'background': '#003348'
        }
      },
      {
        name       : '水城县人民政府6',
        trainNumber: 60,
        poorNumber : 30,
        tdStyles: {
          'background': '#094056'
        }
      },
      {
        name       : '水城县人民政府7',
        trainNumber: 60,
        poorNumber : 30,
        tdStyles: {
          'background': '#003348'
        }
      },
      {
        name       : '水城县人民政府8',
        trainNumber: 60,
        poorNumber : 30,
        tdStyles: {
          'background': '#094056'
        }
      }
  ];

  stylesColumns = [
      {
        'index': 'name',
        'thStyles': {'background': '#003348', 'color': 'white', 'z-index': '100', 'position': 'relative', 'border-bottom': '0', 'border-right': '0', 'padding-left': '0'},
        'tdStyles': {'color': 'white', 'border-bottom': '0', 'border-right': '0'},
        'format': (item) => {
          return this.sanitizer.bypassSecurityTrustHtml('<span style="background: deepskyblue;width: 20px;height: 20px;display: inline-block;margin-right: 10px;text-align: center;">1</span>' + item.name);
        },
        'titleFormat': (column) => {
          return this.sanitizer.bypassSecurityTrustHtml('<span style="padding-left: 8px">企业名称</span>' + '<div style="background: deepskyblue;width: 100%;height: 3px;position: absolute;bottom: 0"></div>');
        }
      },
      {
        'index': 'trainNumber',
        'thStyles': {'background': 'deepskyblue', 'color': 'black', 'z-index': '100', 'position': 'relative', 'border-bottom': '0', 'border-right': '0'},
        'tdStyles': {'color': 'yellow', 'border-bottom': '0', 'border-right': '0'},
        'titleFormat': (column) => {
          return this.sanitizer.bypassSecurityTrustHtml('困难家庭' + '<br/>' + '（人）' + '<div style="background: deepskyblue;height: 3px"></div>');
        }
      },
      {
        'index': 'poorNumber',
        'thStyles': {'background': 'deepskyblue', 'color': 'black', 'z-index': '100', 'position': 'relative', 'border-bottom': '0', 'border-right': '0'},
        'tdStyles': {'color': 'yellow', 'border-bottom': '0', 'border-right': '0'},
        'titleFormat': (column) => {
          return this.sanitizer.bypassSecurityTrustHtml('困难人口' + '<br/>' + '（人）' + '<div style="background: deepskyblue;height: 3px"></div>');
        }
      }
  ];
}
