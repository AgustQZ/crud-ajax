IMPORTANTE
- Debes tener instalado nodeJs
- Debes tener Json Server Ir a https://github.com/typicode/json-server, o https://jsonplaceholder.typicode.com/ para saber mas.

//para instalar json server global
    npm install -g json-server

//para iniciar la ejecucion de json server
    Nota: se debe escribir la ruta completa de la base de datos (en este caso esta dentro de la carpeta assets/)

    json-server --watch assets/db.json

// para usar axios es necesario agregar el cdn en el html:
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>