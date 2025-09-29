console.log("Funciona link a app.js")
let peticion_movimientos = new XMLHttpRequest() //creo un objeto de tipo XMLHttpRequest

function peticion_movimientos_handler(){
    if(this.readyState === 4){ //para verificar si es una peticion http
        if(this.status === 200){ //para saber si el estado de codigo es el correcto
            alert(this.responseText); //formato string
            const datos = JSON.parse(this.responseText) //convertir string a lista de json
            alert(datos[0].concept)

            let tabla = document.getElementById("movements_table");

            for(let i = 0;datos.length;i++){
                const fila = document.createElement("tr");

                const celda_date = document.createElement("td");
                celda_date.innerHTML = datos[i].date
                fila.appendChild(celda_date);
                
                const celda_concept = document.createElement("td");
                celda_concept.innerHTML = datos[i].concept
                fila.appendChild(celda_concept);

                const celda_quantity = document.createElement("td");
                celda_quantity.innerHTML = datos[i].quantity
                fila.appendChild(celda_quantity);

                tabla.appendChild(fila);
            }


        }else{
            alert("Se ha producido un error en la consulta http")
        }
    }
}

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

    peticion_movimientos.open("GET", "http://localhost:5000/api/v1.0/all");
    peticion_movimientos.onload = peticion_movimientos_handler
    peticion_movimientos.onerror = function(){alert("No se ha podido completar la peticion de movimientos")};
    peticion_movimientos.send();
}
