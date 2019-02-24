import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(res => {
    setTimeout(() => {
      // 清除首页动画
      const preloader = document.querySelector('#nb-global-spinner');
      if (preloader) {
        preloader.remove();
      }
    }, 100);
    return res;
  }).catch(err => console.error(err));
