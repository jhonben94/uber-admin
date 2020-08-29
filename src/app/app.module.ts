import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { BreadcrumsComponent } from './shared/breadcrums/breadcrums.component';
import { TablaBasicComponent } from './components/tabla-basic/tabla-basic.component';
import { SortableHeader } from './directives/sortable.directive';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TitularComponent } from './components/personas/titular/titular.component';
import { ConductorComponent } from './components/personas/conductor/conductor.component';
import { UsuarioComponent } from './components/seguridad/usuario/usuario.component';
import { MarcaComponent } from './components/parametrico/marca/marca.component';
import { ModeloComponent } from './components/parametrico/modelo/modelo.component';
import { VehiculoComponent } from './components/parametrico/vehiculo/vehiculo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'

import { BlockUIModule } from 'ng-block-ui';
import { RolesComponent } from './components/seguridad/roles/roles.component';
import { RolesEditComponent } from './components/seguridad/roles/roles-edit.component';

 
import { ToastrModule } from 'ngx-toastr';
import { PermisosComponent } from './components/seguridad/permisos/permisos.component';
import { PermisosEditComponent } from './components/seguridad/permisos/permisos-edit.component';
import { MatTableTranslateService } from './services/shared/mat-table-translate.service';
import { AsignarPermisosComponent } from './components/seguridad/roles/asignar-permisos.component';
import { TipoDocumentoComponent } from './components/parametrico/tipo-documento/tipo-documento.component';
import { TipoDocumentoEditComponent } from './components/parametrico/tipo-documento/tipo-documento-edit.component';
import { MarcaEditComponent } from './components/parametrico/marca/marca-edit.component';
import { ModeloEditComponent } from './components/parametrico/modelo/modelo-edit.component';
import { ConductorEditComponent } from './components/personas/conductor/conductor-edit.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    BreadcrumsComponent,
    TablaBasicComponent,
    SortableHeader,
    TitularComponent,
    ConductorComponent,
    UsuarioComponent,
    MarcaComponent,
    ModeloComponent,
    VehiculoComponent,
    RolesComponent,
    RolesEditComponent,
    PermisosComponent,
    PermisosEditComponent,
    AsignarPermisosComponent,
    TipoDocumentoComponent,
    TipoDocumentoEditComponent,
    MarcaEditComponent,
    ModeloEditComponent,
    ConductorEditComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    BlockUIModule.forRoot({ message: 'Cargando...'}),
    ReactiveFormsModule 
  ],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [

  ],
  bootstrap: [AppComponent],
  entryComponents: [
  ]
})
export class AppModule { }
