console.log("Funciona link a app.js")

function viewForm(){
    document.getElementById("movements_detail").style.display="block";
}

function hideForm(){
    document.getElementById("movements_detail").style.display="none";
}

window.onload = function(){
    let nuevo = document.getElementById("btn_crear");
    nuevo.addEventListener("click", viewForm)

    let cerrar = document.getElementById("btn_cerrar");
    cerrar.addEventListener("click", hideForm)
}
