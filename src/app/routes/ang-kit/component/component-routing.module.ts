import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppADStComponent } from './ad-st/ad-st.component';

const routes: Routes = [
  { path: 'ad-st', component: AppADStComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngKitComponentRoutingModule {}
