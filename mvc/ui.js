export default class UI {
  constructor() {
    this.controlador = null;
    this.inputText = document.getElementById("input-add");
    this.buttonAdd = document.getElementById("button-add");
    this.table = document.getElementById("table");
  }

  setControlador(controlador) {
    this.controlador = controlador;
  }

  async render() {
    const datos = await this.controlador.leerObjeto();
    datos.forEach((dato) => this.createRow(dato));
    this.addDato();
  }

  addDato() {
    this.buttonAdd.addEventListener("click", (e) => {
      e.preventDefault();
      const value = this.inputText.value;
      const objeto = {
        nombres: value,
      };
      if (value !== "" || value.length > 0) {
        this.controlador.addObjeto(objeto);
        this.render();
        this.table.innerHTML = "";
        this.inputText.value = "";
      } else {
        console.log("datos son requeridos");
      }
    });
  }

  createRow(dato) {
    const row = table.insertRow();
    row.setAttribute("id", dato.key);
    row.innerHTML = `
        <td scope="row">${dato.key}</td>
        <td>${dato.nombres}</td>
        <td >
          <div class="btn-group me-2" role="group">
            
          </div>
        </td>
        `;

    //edit
    const editBtn = document.createElement("BUTTON");
    editBtn.classList.add("btn", "btn-outline-secondary");
    editBtn.textContent = "Guardar";
    editBtn.setAttribute("disabled", "true");
    row.children[2].children[0].appendChild(editBtn);
    row.children[1].setAttribute("contenteditable", "true");
    row.children[1].setAttribute("spellcheck", "true");
    row.children[1].addEventListener("keyup", () => {
      editBtn.removeAttribute("disabled");
    });
    editBtn.addEventListener("click", () => {
      const disabled = row.children[1].getAttribute("disabled");
      if (disabled === null) {
        const nuevoValor = row.children[1].textContent;
        this.controlador.modificarObjeto(dato.key, { nombres: nuevoValor });
        editBtn.setAttribute("disabled", "true");
      }
    });

    const deleteBtn = document.createElement("BUTTON");
    deleteBtn.classList.add("btn", "btn-outline-secondary");
    deleteBtn.textContent = "Eliminar";

    //delete
    deleteBtn.onclick = () => {
      document.getElementById(dato.key).remove();
      this.controlador.eliminarObjeto(dato.key);
    };

    row.children[2].children[0].appendChild(deleteBtn);
    this.table.appendChild(row);
  }
}
