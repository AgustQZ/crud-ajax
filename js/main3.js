const d = document,
    $table = d.querySelector("crud-table"),
    $form = d.querySelector("crud-form"),
    $title = d.querySelector("crud-title"),
    $template = d.getElementById("crud-template").content,
    $fragment = d.createDocumentFragment();

const ajax = (options) => {
    const xhr = new XMLHttpRequest();
    let { url, method, success, error, data } = options;

    xhr.addEventListener("readystatechange", (e) => {
        if (xhr.readyState !== 4) return;

        if (xhr.status >= 200 && xhr.status < 300) {
            let json = JSON.parse(xhr.responseText);
        }
    });

    xhr.open(method || "GET", url);

    xhr.setRequestHeader("Content-type", "application/json; charset= utf-8");

    xhr.send(JSON.stringify(data));
};
