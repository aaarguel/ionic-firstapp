import { NgModule } from '@angular/core';
import {AuthLayoutPage} from './auth-layout/auth-layout.page';
import {AdminLayoutPage} from './admin-layout/admin-layout.page';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth-layout/auth-layout.module').then(m => m.AuthLayoutPageModule)
  },
  {
      path: '',
      loadChildren: () => import('./admin-layout/admin-layout.module').then(m => m.AdminLayoutPageModule),
      /*children: [
        {
          path: 'folder/:id',
          loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
        }
      ]*/
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
