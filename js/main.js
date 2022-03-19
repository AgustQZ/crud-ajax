const d = document,
    $table = d.querySelector(".crud-table"),
    $form = d.querySelector(".crud-form"),
    $title = d.querySelector(".crud-title"),
    $template = d.getElementById("crud-template").content,
    $fragment = d.createDocumentFragment();

// funcion para realizar todas las operaciones del crud
const ajax = (options) => {
    let { url, method, success, error, data } = options;

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", (e) => {
        if (xhr.readyState !== 4) {
            return;
        }

        if (xhr.status >= 200 && xhr.status < 300) {
            let json = JSON.parse(xhr.responseText);
            success(json);
        } else {
            let message = xhr.statusText || "Ocurrio un error";
            error(`${message}: ${xhr.status}`);
        }
    });

    xhr.open(method || "GET", url);

    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");

    xhr.send(JSON.stringify(data));
};

const getAll = () => {
    ajax({
        // method: "GET",
        url: "http://localhost:3000/juegos",
        success: (res) => {
            // console.log(res);
            res.forEach((ele) => {
                // asignar el nombre al template
                $template.querySelector(".name").textContent = ele.nombre;
                $template.querySelector(".developer").textContent =
                    ele.desarrollador;
                $template.querySelector(".edit").dataset.id = ele.id;
                $template.querySelector(".edit").dataset.name = ele.nombre;
                $template.querySelector(".edit").dataset.developer =
                    ele.desarrollador;
                $template.querySelector(".delete").dataset.id = ele.id;
                // agregar el nombre al fragmento
                let $clonar = d.importNode($template, true);
                $fragment.appendChild($clonar);
            });
            // agregar el fragmento a tbody de la tabla
            $table.querySelector("tbody").appendChild($fragment);
        },
        error: (err) => {
            // console.error(err);
            $table.insertAdjacentHTML("afterend", `<p>${err}</p>`);
        },
        // data: null,
    });
};

d.addEventListener("DOMContentLoaded", getAll);

d.addEventListener("submit", (e) => {
    if (e.target === $form) {
        // evitar que el boton envie datos por defecto para usar ajax
        e.preventDefault;

        // si no hay valor en el id
        if (!e.target.id.value) {
            // POST = crear
            ajax({
                url: "http://localhost:3000/juegos",
                method: "POST",
                success: (res) => location.reload(),
                error: () =>
                    $form.insertAdjacentHTML("afterend", `<p>${err}</p>`),
                data: {
                    nombre: e.target.nombre.value,
                    desarrollador: e.target.desarrollador.value,
                },
            });
        } else {
            //PUT = actualizar
            ajax({
                url: `http://localhost:3000/juegos/${e.target.id.value}`,
                method: "PUT",
                success: (res) => location.reload(),
                error: () =>
                    $form.insertAdjacentHTML("afterend", `<p>${err}</p>`),
                data: {
                    nombre: e.target.nombre.value,
                    desarrollador: e.target.desarrollador.value,
                },
            });
        }
    }
});

d.addEventListener("click", (e) => {
    if (e.target.matches(".edit")) {
        $title.textContent = "Editar Juego";
        $form.nombre.value = e.target.dataset.name;
        $form.desarrollador.value = e.target.dataset.developer;
        $form.id.value = e.target.dataset.id;
    }
    if (e.target.matches(".delete")) {
        let isDelete = confirm("Esta seguro que desea eliminar el juego?");
        if (isDelete) {
            ajax({
                url: `http://localhost:3000/juegos/${e.target.dataset.id}`,
                method: "DELETE",
                success: (res) => location.reload(),
                error: () => alert(err),
            });
        }
    }
});
