import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutPage } from './admin-layout.page';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutPage,
    children: [
      {
        path: 'folder/:id',
        loadChildren: () => import('../folder/folder.module').then( m => m.FolderPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminLayoutPageRoutingModule {}
