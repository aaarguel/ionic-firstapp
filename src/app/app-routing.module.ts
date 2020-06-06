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
    path: '',
    component: AuthLayoutPage,
    children: [
      {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule),
        data: { title: 'Register'}
      },
	    {
        path: 'auth',
        loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
        data: { title: 'Login'}
      }
    ]
  },
  {
      path: '',
      component: AdminLayoutPage,
      children: [
        {
          path: 'folder/:id',
          loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
        }
      ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
