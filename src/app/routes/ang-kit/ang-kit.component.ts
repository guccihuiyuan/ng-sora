import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {DocModel} from '../../models/doc.model';

declare var require: any;

@Component({
  templateUrl: './ang-kit.component.html',
  styleUrls: ['./ang-kit.component.less']
})
export class AngKitComponent implements OnInit, OnDestroy {
  $routerEvent = null;

  // 菜单数组
  menus = [
    {
      title: '更新日志',
      list: [
        {
          url: '/ang-kit/log/log-kit',
          title: '@ang-kit',
          subtitle: ''
        },
        {
          url: '/ang-kit/log/log-cli',
          title: 'ng-sora',
          subtitle: ''
        }
      ]
    },
    {
      title: 'ng-sora',
      url: '/ang-kit/cli'
    },
    {
      title: '@ang-kit/auth 认证',
      list: [
        {
          url: '/ang-kit/auth/token-service',
          title: 'TokenService 服务',
          subtitle: ''
        },
        {
          url: '/ang-kit/auth/token-interceptor',
          title: 'SimpleTokenInterceptor 拦截器',
          subtitle: ''
        }
      ]
    },
    {
      title: '@ang-kit/component 组件',
      list: [
        {
          url: '/ang-kit/component/ad-st',
          title: 'ad-st 表格',
          subtitle: ''
        }
      ]
    },
    {
      title: '@ang-kit/http 请求',
      list: [
        {
          url: '/ang-kit/http/http-service',
          title: 'HttpService 服务',
          subtitle: ''
        },
        {
          url: '/ang-kit/http/http-interceptor',
          title: 'DefaultHttpInterceptor 拦截器',
          subtitle: ''
        }
      ]
    },
    {
      title: '@ang-kit/util 工具',
      list: [
        {
          url: '/ang-kit/util/util-tree',
          title: 'Tree 服务',
          subtitle: ''
        }
      ]
    },
    {
      title: '编码规范',
      list: [
        {
          url: '/ang-kit/coding/coding-config',
          title: 'config 配置',
          subtitle: ''
        },
        {
          url: '/ang-kit/coding/coding-model',
          title: 'model 模型',
          subtitle: ''
        },
        {
          url: '/ang-kit/coding/coding-request',
          title: 'request 请求',
          subtitle: ''
        },
        {
          url: '/ang-kit/coding/coding-ngrx',
          title: 'ngrx 状态管理',
          subtitle: ''
        }
      ]
    }
  ];

  /**
   * 所有文档对象
   */
  doc = {
    'token-service': {
      header: {
        title: 'TokenService',
        subtitle: '服务类',
        introduce: '',
      },
      detail: require('raw-loader!./auth/token-service/detail/detail.md')
    },
    'token-interceptor': {
      header: {
        title: 'SimpleTokenInterceptor',
        subtitle: '拦截器',
        introduce: '',
      },
      detail: require('raw-loader!./auth/token-interceptor/detail/detail.md')
    },

    'ad-st': {
      header: {
        title: 'ad-st',
        subtitle: '简易表格',
        introduce: '<p><code>ad-st</code> 是在 <code>nz-table</code> 基础上封装的 <strong> 可配置 </strong> 表格 </p>',
      },
      detail: require('raw-loader!./component/ad-st/detail/detail.md'),
      api: require('raw-loader!./component/ad-st/api/api.md')
    },

    'http-service': {
      header: {
        title: 'HttpService',
        subtitle: '网络请求',
        introduce: '<p><code>HttpService</code> 是基于 <code>HttpClient</code> 基础上封装的网络请求类</p>',
      },
      detail: require('raw-loader!./http/service/detail/detail.md')
    },
    'http-interceptor': {
      header: {
        title: 'DefaultHttpInterceptor',
        subtitle: '请求拦截器',
        introduce: '',
      },
      detail: require('raw-loader!./http/interceptor/detail/detail.md')
    },

    'util-tree': {
      header: {
        title: 'TreeService',
        subtitle: '服务类',
        introduce: '',
      },
      detail: require('raw-loader!./util/tree/detail/detail.md')
    },

    'coding-config': {
      header: {
        title: 'Config',
        subtitle: '配置文件',
        introduce: '<p>在项目目录下，建立一个 <b>config</b> 文件夹，管理项目中所有的配置文件</p>'
      },
      detail: require('raw-loader!./coding/config/detail/detail.md')
    },
    'coding-model': {
      header: {
        title: 'Model',
        subtitle: '模型文件',
        introduce: '<p>在项目目录下，建立一个 <b>models</b> 文件夹，管理项目中所有的数据模型，所有复杂的对象建议都创建一个数据模型</p>'
      },
      detail: require('raw-loader!./coding/model/detail/detail.md')
    },
    'coding-request': {
      header: {
        title: 'Request',
        subtitle: '数据请求',
        introduce: '<p>在项目目录下，建立一个 <b>request</b> 文件夹，管理项目中所有的请求服务</p>'
      },
      detail: require('raw-loader!./coding/request/detail/detail.md')
    },
    'coding-ngrx': {
      header: {
        title: 'Ngrx',
        subtitle: '状态管理',
        introduce: ''
      },
      detail: require('raw-loader!./coding/ngrx/detail/detail.md')
    },
    'log-kit': {
      header: {
        title: '@ang-kit',
        subtitle: '',
        introduce: ''
      },
      detail: require('raw-loader!./log/kit/detail/detail.md')
    },
    'log-cli': {
      header: {
        title: 'ng-sora',
        subtitle: '',
        introduce: ''
      },
      detail: require('raw-loader!./log/cli/detail/detail.md')
    },
    'cli': {
      header: {
        title: 'ng-sora 脚手架工具',
        subtitle: '',
        introduce: ''
      },
      detail: require('raw-loader!./cli/detail/detail.md')
    }
  };

  /**
   * 当前文档对象
   */
  currentDoc: DocModel;

  constructor(
    private router: Router
  ) {
    // 监听路由改变
    this.$routerEvent = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.url;
        const index = url.lastIndexOf('\/');
        const key = url.substring(index + 1, url.length);

        // 拿到当前的对象
        this.currentDoc = this.doc[key];
      }
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    // 取消订阅
    if (this.$routerEvent) {
      this.$routerEvent.unsubscribe();
      this.$routerEvent = null;
    }
  }
}
