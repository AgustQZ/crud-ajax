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
            console.error(err);
            $table.insertAdjacentHTML("afterend", `<p>${err}</p>`);
        },
        // data: null,
    });
};

d.addEventListener("DOMContentLoaded", getAll);
