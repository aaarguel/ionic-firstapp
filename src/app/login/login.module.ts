import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms'
import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,    
    
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
