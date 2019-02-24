## ng-sora工程
ng-sora工程在项目schematics目录下

## @ang-kit包工程
@ang-kit包工程在项目projects->ang-kit目录下，各个包在对应目录下的src目录下开发

## 文档网站工程
文档网站在项目src目录下开发，文档页统一在src->routes->ang-kit下面管理，文档目前所有结构已经约定好，只需要配置数据和创建页面即可（如后期有需要增加新界功能或节点，可以调整结构）

## 启动工程
1.将模块打包（初始化工程运行一次即可，本地有dist目录后，可不用在运行此命令）
```
npm run build-package
```
2.运行
```
npm start
```

### 数据配置
例如：
```
ang-kit.component.ts
# 菜单配置
menus = [
  {
    title: '更新日志',
    url: '/ang-kit/log'
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
  }
]
# 文档对象配置（严格按照如下格式来配置）
doc = {
  'token-service': {// 这里key需要匹配路由
        header: {
          title: 'TokenService',
          subtitle: '服务类',
          introduce: '',
        },
        detail: require('raw-loader!./auth/token-service/detail/detail.md'),
        api: require('raw-loader!./component/ad-st/api/api.md')
  },
}
```
