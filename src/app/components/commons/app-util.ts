export function deleteEmptyData(data){

    for(const key in data) {
        if(data[key] ==='' || data[key] === null) {
          delete data[key];
        }
    }
    return data;
}

export const CANTIDAD_PAG_LIST = [5,10,25,100]
export const CANTIDAD_PAG_DEFAULT= 10;


export const MENSAJES_DIALOG ={
  ACTIVAR:"¿Esta seguro que desea activar ",
  ACTIVAR_EXITO:"Se ha activado exitosamente",
  EDITAR:"¿Esta seguro que desea editar",
  EDITAR_EXITO:"Se ha modificado exitosamente",
  DESACTIVAR:"¿Esta seguro que desea desactivar",
  DESACTIVAR_EXITO:"Se ha desactivado exitosamente",
  AGREGAR_EXITO:"Se ha agregado exitosamente",
  ELIMINAR:"¿Esta seguro que desea eliminar "
}
