import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminLayoutPageRoutingModule } from './admin-layout-routing.module';

import { AdminLayoutPage } from './admin-layout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminLayoutPageRoutingModule
  ],
  declarations: [AdminLayoutPage]
})
export class AdminLayoutPageModule {}
