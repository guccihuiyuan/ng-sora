import {ModuleWithProviders, NgModule} from '@angular/core';
import {TokenService} from './token.service';
import {TokenConfig, TokenConfigService} from './token.config';

@NgModule({
  providers: [TokenService]
})
export class AngKitTokenModule {
  static forRoot(config: TokenConfig = null): ModuleWithProviders {
    return {
      ngModule: AngKitTokenModule,
      providers: [
        // 注入配置
        { provide: TokenConfigService, useValue: config }
      ]
    };
  }
}
