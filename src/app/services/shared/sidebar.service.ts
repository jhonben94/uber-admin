import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu =[];
  constructor() {
    this.menu =[
      {
        modulo:'Parametricos',
        iconoModulo:'',
        moduloItems: [
          {
              id:'cliente',
              subModulo : 'Clientes',
              subItems: [
                {
                  url:'',
                  icono:'address-card',
                  titulo:'Agregar Cliente'
                },
                {
                  url:'',
                  icono:'address-card',
                  titulo:'Modificar Cliente'
                },
                {
                  url:'',
                  icono:'address-card',
                  titulo:'Listar Clientes'
                }
              ]
          },
          {
            id:'submodulo3',
            subModulo : 'SubModulo3',
            subItems: [
              {
                url:'',
                icono:'address-card',
                titulo:'Tipo Producto'
              },
              {
                url:'',
                icono:'address-card',
                titulo:'Tipo Documento'
              },
              {
                url:'',
                icono:'address-card',
                titulo:'Categorias'
              }
            ]
          }

        ]
      },
   
      {
        modulo:'Servicios',
        iconoModulo:'',
        moduloItems: [
          {
              id:'submodulo2',
              subModulo : 'SubModulo2',
              subItems: [
                {
                  url:'',
                  icono:'address-card',
                  titulo:'Tipo Producto'
                },
                {
                  url:'',
                  icono:'address-card',
                  titulo:'Tipo Documento'
                },
                {
                  url:'',
                  icono:'address-card',
                  titulo:'Categorias'
                }
              ]
          },
          {
            id:'submodulo3',
            subModulo : 'SubModulo3',
            subItems: [
              {
                url:'',
                icono:'address-card',
                titulo:'Tipo Producto'
              },
              {
                url:'',
                icono:'address-card',
                titulo:'Tipo Documento'
              },
              {
                url:'',
                icono:'address-card',
                titulo:'Categorias'
              }
            ]
          }

        ]
      }
    ];
   }
   obtenerSideBar(){
     return this.menu;
   }
}
