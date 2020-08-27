import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu =[];
  constructor() {
    this.menu =[

      {
        modulo:'Personas',
        iconoSubModulo:'user-friends',
        moduloItems: [
          {
              id:'gestion_personas',
              subModulo : 'Gestión Personas',
              iconoSubModulo: 'fas fa-user-friends',
              subItems: [
                {
                  url:'/conductores',
                  icono:'fas fa-user',
                  titulo:'Conductores'
                },
                {
                  url:'/titulares',
                  icono:'fas fa-user-cog',
                  titulo:'Titulares'
                }
              ]
          },
        ]
      },


      
      {
        modulo:'Parametricos',
        iconoSubModulo:'address-archive',
        moduloItems: [
          {
              id:'forms',
              subModulo : 'Definiciones',
              iconoSubModulo: 'fas fa-archive  fa-lg',
              subItems: [
                {
                  url:'/tipo-documento',
                  icono:'fas fa-address-card  fa-lg',
                  titulo:'Tipo Documento'
                },
                {
                  url:'/marcas',
                  icono:'fas fa-barcode fa-lg',
                  titulo:'Marcas'
                },
                {
                  url:'/modelos',
                  icono:'fas fa-sitemap  fa-lg',
                  titulo:'Modelos'
                },
                {
                  url:'/modelo',
                  icono:'fas fa-car  fa-lg',
                  titulo:'Vehículos'
                },
              ]
          },
        ]
      },
   
      {
        modulo:'Seguridad',
        iconoSubModulo:'user-friends',
        moduloItems: [
          {
              id:'seguridad',
              subModulo : 'Gestión Seguridad ',
              iconoSubModulo: 'fas fa-shield-alt  fa-lg',
              subItems: [
                {
                  url:'/permisos',
                  icono:'fas fa-file-signature  fa-lg',
                  titulo:'Permisos'
                },
                {
                  url:'/roles',
                  icono:'fas fa-user-lock  fa-lg',
                  titulo:'Roles'
                },
                {
                  url:'/usuarios',
                  icono:'fas fa-user-shield  fa-lg',
                  titulo:'Usuarios'
                },
              ]
          },
        ]
      },
    ];
   }
   obtenerSideBar(){
     return this.menu;
   }
}
