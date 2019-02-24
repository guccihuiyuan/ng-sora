import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

// layout
import { LayoutDefaultComponent } from './default/default.component';

// header
import { DefaultHeaderComponent } from './default/header/header.component';

// footer
import { FooterComponent } from './default/footer/footer.component';

const COMPONENTS = [
  LayoutDefaultComponent
];

const HEADERCOMPONENTS = [
  DefaultHeaderComponent
];

const FOOTERCOMPONENTS = [
  FooterComponent
];

@NgModule({
  imports: [SharedModule],
  providers: [],
  declarations: [
    ...COMPONENTS,
    ...HEADERCOMPONENTS,
    ...FOOTERCOMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class LayoutModule { }
