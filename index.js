'use strict';
import Conexion from "./mvc/conexion.js";
import Controlador from "./mvc/controlador.js";
import UI from "./mvc/ui.js";

function run(){
    const conexion = new Conexion('PRUEBA');
    const controlador = new Controlador();
    const ui = new UI();
    const IDBRequest = conexion.conexionDB();
    controlador.setConexion(IDBRequest);
    controlador.setUI(ui);
    ui.setControlador(controlador);
   
    IDBRequest.onsuccess = function() {       
        ui.render();
       
      };
    
}

document.addEventListener('DOMContentLoaded', run);

