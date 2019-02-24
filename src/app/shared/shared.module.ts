import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// region: third libs
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AngKitComponentModule } from '../../../projects/ang-kit/component/src/component.module';
const THIRDMODULES = [
  NgZorroAntdModule,
  AngKitComponentModule
];
// endregion

// region: your componets & directives
const COMPONENTS = [];

const DIRECTIVES = [];
// endregion


const PIPES = [];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    // third libs
    ...THIRDMODULES
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ]
})
export class SharedModule { }
