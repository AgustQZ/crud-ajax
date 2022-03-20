// fetch con async-await
const d = document,
    $table = d.querySelector(".crud-table"),
    $form = d.querySelector(".crud-form"),
    $title = d.querySelector(".crud-title"),
    $template = d.getElementById("crud-template").content,
    $fragment = d.createDocumentFragment();

const getAll = async () => {
    // necesita try catch
    try {
        // fetch recibe url e intrucciones. Al no recibir segundo parametro se usa metodo GET
        let res = await fetch("http://localhost:3000/juegos"),
            json = await res.json();

        if (!res.ok)
            throw {
                status: res.status,
                statusText: res.statusText,
            };
        console.log(json);
        // recorremos el arreglo
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
        let message = err.statusText || `Ocurrio un error: ${err.status}`;
        $table.insertAdjacentHTML("afterend", message);
    }
};

d.addEventListener("DOMContentLoaded", getAll);

d.addEventListener("submit", async (e) => {
    if (e.target === $form) {
        e.preventDefault();

        if (!e.target.id.value) {
            // vamos a crear o metodo POST
            try {
                let options = {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json; charset=utf-8",
                        },
                        body: JSON.stringify({
                            nombre: e.target.nombre.value,
                            desarrollador: e.target.desarrollador.value,
                        }),
                    },
                    res = await fetch("http://localhost:3000/juegos", options),
                    json = await res.json();

                if (!res.ok)
                    throw {
                        status: res.status,
                        statusText: res.statusText,
                    };

                location.reload();
            } catch (error) {
                let message =
                    error.statusText || `Ocurrio un error: ${error.status}`;
                $form.insertAdjacentHTML("afterend", message);
            }
        } else {
            // vamos a actualizar o metodo PUT
            try {
                let options = {
                        method: "PUT",
                        headers: {
                            "Content-type": "application/json; charset= utf-8",
                        },
                        body: JSON.stringify({
                            nombre: e.target.nombre.value,
                            desarrollador: e.target.desarrollador.value,
                        }),
                    },
                    res = await fetch(
                        `http://localhost:3000/juegos/${e.target.id.value}`,
                        options
                    ),
                    json = await res.json();

                if (!res.ok)
                    throw {
                        status: res.status,
                        statusText: res.statusText,
                    };

                location.reload();
            } catch (error) {
                let message =
                    error.statusText || `Ocurrio un error: ${error.status}`;
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
                        Headers: {
                            "Content-type": "application/json; charset= utf-8",
                        },
                    },
                    res = await fetch(
                        `http://localhost:3000/juegos/${e.target.dataset.id}`,
                        options
                    ),
                    json = await res.json();

                if (!res.ok)
                    throw {
                        status: res.status,
                        statusText: res.statusText,
                    };

                location.reload();
            } catch (error) {
                let message =
                    error.statusText || `Ocurrio un error: ${error.status}`;
                alert(message);
            }
        }
    }
});
