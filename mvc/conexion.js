export default class Conexion {
  constructor(nombreDB) {
    this.nombreDB = nombreDB;
  }
  conexionDB() {
    const IDBRequest = indexedDB.open(this.nombreDB, 1);
    IDBRequest.addEventListener("upgradeneeded", () => {
      const db = IDBRequest.result;
      db.createObjectStore("nombres", {
        autoIncrement: true,
      });

      IDBRequest.addEventListener("success", () => {
        console.log("todo salio correctamente");
      });

      IDBRequest.addEventListener("error", () => {
        console.log("Ups hubo un error");
      });
    });

    return IDBRequest;
  }
}
