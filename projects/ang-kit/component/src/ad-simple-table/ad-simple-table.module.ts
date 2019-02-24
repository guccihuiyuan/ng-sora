import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { ADSimpleTableComponent } from './ad-simple-table.component';

const COMPONENT = [
  ADSimpleTableComponent,
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
export class ADSimpleTableModule { }
