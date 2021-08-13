export default class Controlador {
  constructor() {
    this.conexion = null;
    this.ui = null;
  }

  setConexion(conexion) {
    this.conexion = conexion;
  }

  setUI(ui) {
    this.ui = ui;
  }

  getIDBData(tipo, msg = "") {
    const db = this.conexion.result;
    const IDBtransaction = db.transaction("nombres", tipo);
    const objectStore = IDBtransaction.objectStore("nombres");
    IDBtransaction.addEventListener("complete", () => {
      console.log(msg);
    });
    return objectStore;
  }

  addObjeto(object) {
    const IDBData = this.getIDBData(
      "readwrite",
      "objeto agreado correctamente"
    );
    IDBData.add(object);
  }

  leerObjeto() {
    const IDBData = this.getIDBData("readonly");
    let customers = [];
    return new Promise((resolve, reject) => {
      IDBData.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
          let obj = {
            key: cursor.key,
            nombres: cursor.value.nombres,
          };
          customers.push(obj);
          cursor.continue();
          
        } else {
          resolve(customers);
        }
      };
    });
  }

  modificarObjeto(key, object) {
    const IDBData = this.getIDBData(
      "readwrite",
      "objeto modificado correctamente"
    );
    IDBData.put(object, key);
  }

  eliminarObjeto = (key) => {
    const IDBData = this.getIDBData(
      "readwrite",
      "objeto eliminado correctamente"
    );
    IDBData.delete(key);
  };
}
