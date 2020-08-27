import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TablaBasicComponent } from './components/tabla-basic/tabla-basic.component';
import { ConductorComponent } from './components/personas/conductor/conductor.component';
import { PermisosComponent } from './components/seguridad/permisos/permisos.component';
import { RolesComponent } from './components/seguridad/roles/roles.component';
import { TipoDocumentoComponent } from './components/parametrico/tipo-documento/tipo-documento.component';
import { MarcaComponent } from './components/parametrico/marca/marca.component';
import { ModeloComponent } from './components/parametrico/modelo/modelo.component';
import { TitularComponent } from './components/personas/titular/titular.component';


const routes: Routes = [
  {
    path: '', data: { title: 'Inicio' },
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Inicio' } },
      { path: 'data-table', component: TablaBasicComponent, data: { title: 'Ejemplo de Table' } },
      {
        path: 'conductores', data: { title: 'Conductores' },
        children: [
          { path: '', component: ConductorComponent, data: { title: 'Listado' } },
        ]
      },
      {
        path: 'titulares', data: { title: 'Titulares' },
        children: [
          { path: '', component: TitularComponent, data: { title: 'Listado' } },
        ]
      },

      {
        path: 'permisos', data: { title: 'Permisos' },
        children: [
          { path: '', component: PermisosComponent, data: { title: 'Listado' } },
        ]
      },

      {
        path: 'roles', data: { title: 'Roles' },
        children: [
          { path: '', component: RolesComponent, data: { title: 'Listado' } },
        ]
      },

      {
        path: 'tipo-documento', data: { title: 'Tipo Documento' },
        children: [
          { path: '', component: TipoDocumentoComponent, data: { title: 'Listado' } },
        ]
      },

      {
        path: 'marcas', data: { title: 'Marcas' },
        children: [
          { path: '', component: MarcaComponent, data: { title: 'Listado' } },
        ]
      },

      {
        path: 'modelos', data: { title: 'Modelos' },
        children: [
          { path: '', component: ModeloComponent, data: { title: 'Listado' } },
        ]
      },

    ]
  },

  





  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
