import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { ADSTComponent } from './ad-st.component';

const COMPONENT = [
  ADSTComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
  ],
  declarations: [...COMPONENT],
  exports: [...COMPONENT],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ADStModule { }
