const d = document,
    $table = d.querySelector(".crud-table"),
    $form = d.querySelector(".crud-form"),
    $title = d.querySelector(".crud-title"),
    $template = d.getElementById("crud-template").content,
    $fragment = d.createDocumentFragment();

const getAll = async () => {
    try {
        let res = await axios.get("http://localhost:3000/juegos"),
            json = await res.data;
        console.log(res);
    } catch (err) {
        let message = err.statusText || "Ocurrio un error";
        $table.insertAdjacentHTML("afterend", message);
    }
};

d.addEventListener("DOMContentLoaded", getAll);
