console.log("Funciona link a app.js")
let peticion_movimientos = new XMLHttpRequest() //creo un objeto de tipo XMLHttpRequest
let peticion_alta = new XMLHttpRequest()

function altaMovimiento(){
    const date = document.getElementById('date').value;
    const concept = document.getElementById('concept').value;
    const quantity = document.getElementById('quantity').value;

    /*console.log("date: ", date)
    console.log("concept: ", concept)
    console.log("quantity: ", quantity)*/

    //control de ingreso de datos
    if(concept === ""){
        alert("Debes agregar un concepto");
        return
    }
    if(quantity == 0 || quantity === ""){
        alert("Debes agregar cantidad positiva o negativa");
        return
    }
    //formateo de datos para capturar fecha actual yyy-mm-dd
    const hoy = new Date().toISOString().split('T')[0];
    if(!date || date > hoy){
        alert("Debes agregar una fecha menor o igual a hoy");
    }

    peticion_alta.open("POST", "http://localhost:5000/api/v1.0/new");
    peticion_alta.onload = peticion_alta_handler
    peticion_alta.onerror = function(){alert("No se ha podido completar la peticion post")}
    peticion_alta.setRequestHeader("Content-Type", "application/json")

    //definir la estructura json y enviar
    const data_json = JSON.stringify({
        "date":date,
        "concept":concept,
        "quantity":quantity
    })
    peticion_alta.send(data_json);
    
}
function peticion_alta_handler(){
    if(this.readyState === 4){ //para verificar si es una peticion http
        if(this.status === 200){ //para saber si el estado de codigo es el correcto
            console.log("Registro correcto");
            //limpiar inputs
            document.getElementById('date').value="";
            document.getElementById('concept').value="";
            document.getElementById('quantity').value="";
            //ocultar formulario
            this.hideForm();
            //refrescar la lista
            peticion_movimientos.open("GET", "http://localhost:5000/api/v1.0/all");
            peticion_movimientos.onload = peticion_movimientos_handler
            peticion_movimientos.onerror = function(){alert("No se ha podido completar la peticion de movimientos")};
            peticion_movimientos.send();
        }else{
            alert("Se ha producido un error al intentar registrar el movimiento")
        }
    }
}

function peticion_movimientos_handler(){
    if(this.readyState === 4){ //para verificar si es una peticion http
        if(this.status === 200){ //para saber si el estado de codigo es el correcto
            //alert(this.responseText); //formato string
            const movimientos = JSON.parse(this.responseText) //convertir string a lista de json
            //datos[{obj1},{obj2}]
            //{ data: [{obj1},{obj2}], status:"OK"}
            const datos = movimientos.data;
            //limpiar la tabla
            document.getElementById("movements_table").innerHTML="<tr><th>Fecha</th><th>Concepto</th><th>Cantidad</th></tr>"

            if(datos.length === 0){
                let tabla = document.getElementById("movements_table");

                const fila = document.createElement("tr");

                const celda_vacia = document.createElement("td");
                celda_vacia.innerHTML = "No hay registros de movimientos"
                fila.appendChild(celda_vacia);
                
                tabla.appendChild(fila);
            }else{


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

function capturarItemLista(){
    //accedo a lista table
    const tabla = document.getElementById("movements_table");
    //accedo a la fila
    const filas = tabla.getElementsByTagName("tr");
    
    for(let i=0;i<filas.length;i++){
        const celdas = filas[i].getElementsByTagName("td");
        
        for (let x = 0; x < celdas.length; x++) {
            console.log(`Fila: ${i},Celdas: ${celdas[x].innerText}`);
        }
    }
    
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
