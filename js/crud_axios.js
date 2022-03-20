const d = document,
    $table = d.querySelector(".crud-table"),
    $form = d.querySelector(".crud-form"),
    $title = d.querySelector(".crud-title"),
    $template = d.getElementById("crud-template").content,
    $fragment = d.createDocumentFragment();

const getAll = async () => {
    try {
        let res = await axios.get("http://localhost:3000/juegos"),
            // axios devuelve la respuesta en formato json por eso no hay que convertirlo
            json = await res.data;
        console.log(res);
        // recorremos la respuesta del servidor
        json.forEach((el) => {
            $template.querySelector(".name").textContent = el.nombre;
            $template.querySelector(".developer").textContent =
                el.desarrollador;
            $template.querySelector(".edit").dataset.id = el.id;
            $template.querySelector(".edit").dataset.name = el.nombre;
            $template.querySelector(".edit").dataset.developer =
                el.desarrollador;
            $template.querySelector(".delete").dataset.id = el.id;
            // se agrega al fragmento
            let $clone = d.importNode($template, true);
            $fragment.appendChild($clone);
        });
        // se agrega el fragmento con los datos al cuerpo de la tabla
        $table.querySelector("tbody").appendChild($fragment);
    } catch (err) {
        let message = err.statusText || "Ocurrio un error";
        $table.insertAdjacentHTML("afterend", message);
    }
};

d.addEventListener("DOMContentLoaded", getAll);

d.addEventListener("submit", async (e) => {
    if (e.target === $form) {
        e.preventDefault();

        if (!e.target.id.value) {
            // crearemos o metodo POST
            try {
                let options = {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json; charset=utf-8",
                        },
                        data: JSON.stringify({
                            nombre: e.target.nombre.value,
                            desarrollador: e.target.desarrollador.value,
                        }),
                    },
                    res = await axios("http://localhost:3000/juegos", options),
                    json = await res.data();

                location.reload();
            } catch (err) {
                let message =
                    error.statusText || `Ocurrio un error: ${error.status}`;
                $form.insertAdjacentHTML("afterend", message);
            }
        } else {
            // actualizaremos o metodo PUT
            try {
                let options = {
                        method: "PUT",
                        headers: {
                            "Content-type": "application/json; charset= utf-8",
                        },
                        data: JSON.stringify({
                            nombre: e.target.nombre.value,
                            desarrollador: e.target.desarrollador.value,
                        }),
                    },
                    res = await axios(
                        `http://localhost:3000/juegos/${e.target.id.value}`,
                        options
                    ),
                    json = await res.data();

                location.reload();
            } catch (err) {
                let message =
                    err.statusText || `Ocurrio un error: ${err.status}`;
                $form.insertAdjacentHTML("afterend", message);
            }
        }
    }
});

d.addEventListener("click", async (e) => {
    if (e.target.matches(".edit")) {
        $title.textContent = "Editar Juego";
        $form.nombre.value = e.target.dataset.name;
        $form.desarrollador.value = e.target.dataset.developer;
        $form.id.value = e.target.dataset.id;
    }

    if (e.target.matches(".delete")) {
        let isDelete = confirm("Esta seguro que desea eliminar el juego?");
        if (isDelete) {
            try {
                let options = {
                        method: "DELETE",
                        headers: {
                            "Content-type": "application/json; charset= utf-8",
                        },
                    },
                    res = await axios(
                        `http://localhost:3000/juegos/${e.target.dataset.id}`,
                        options
                    ),
                    json = await res.data();

                location.reload();
            } catch (err) {
                let message =
                    err.response.statusText ||
                    `Ocurrio un error: ${err.response.status}`;
                alert(message);
            }
        }
    }
});
