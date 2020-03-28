import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TablaBasicComponent } from './components/tabla-basic/tabla-basic.component';


const routes: Routes = [
  {
    path: '', data: { title: 'Dashboard' },
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard-Componente' } },
      { path: 'data-table', component: TablaBasicComponent, data: { title: 'Ejemplo de Table' } },

    ]
  },





  {
    path: '**',
    redirectTo: '',
  },
  //{path:'/new', component:NewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
