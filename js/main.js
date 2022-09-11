let btnAgregar = document.getElementById("btnAgregar"); 
let lista = document.getElementById("lista"); //Se manda llamar el id de Lista, que pertenece a la tabla. (A toda la tabla) No, fila, no columna.
let data = [];  //Se realiza un arreglo vacio para poder añadir valores.
let cant = 0;  //Se agrega esta variable para controlar cuantos productos se estan agregando. Se inicializa con cero productos.
let numerador = 1; //Para ponerle número a la lista por evento. //Cuando se agrego el boton de ver, se cambio a 1. Pero inicialmente era cero.
const key = "info";  //Palabra clave para JSON.

btnAgregar.addEventListener("click", function(e){
    e.preventDefault();
    //Estas variables se definen aquí, porque aquí es donde nos interesa. Que trabajen hasta que se les mande llamar.
    let campoName = document.getElementById("Name");
    let campoNumber = document.getElementById("Number");
    

    //Validaciones en los cuadros 
    console.log(campoName.value);
    if (campoName.value.length >= 3){  //Si cumplen esta función cambia de un estado a otro y se pone verde.
        campoName.classList.remove("is-invalid");
        campoName.classList.add("is-valid");
    } else {   //Sino la cumplen cambian de un estado a otro y se ponen en rojo.
        campoName.classList.remove("is-valid");
        campoName.classList.add("is-invalid");
    }

    let cn = campoNumber.value;
    console.log(campoNumber.value.length);
    console.log(! isNaN(cn));
    if ((! isNaN (cn)) && (campoNumber.value.length>=1)) {  //Con el 0 no funcionó, debes ponerle uno.
        campoNumber.classList.remove("is-invalid");
        campoNumber.classList.add("is-valid");
    } else {
        campoNumber.classList.remove("is-valid");
        campoNumber.classList.add("is-invalid");
    }
    
    //----------Agregar los productos a la tabla inferior-------------------------------
    let nombre = campoName.value;
    let cantidad = parseFloat(campoNumber.value);
    let precio = ((cantidad) * (Math.random())).toFixed(2);
    console.log(precio);
    
    //Se agrega esta condición para que no se genere la tabla hasta que realmente se encuentren completados los campos con los requerimientos correctos.
    if ((campoName.value.length >= 3) && (! isNaN (cn)) && (campoNumber.value.length>=1)){
    //Se agregan los elementos al arreglo. Se usa un push para que se posicionen en el último lugar.   
    data.push(
        {
            "id":cant,  //"String" : value, // Sólo es para identificar el arreglo.
            "numerador":numerador,
            "nombre":nombre,
            "cantidad":cantidad,
            "precio":precio
        }
    ); //Cierre de JSON
    
    cant++; //Para ir incrementando el numero del numerador de las filas.
    numerador++;  //Le suma 1 al numerador por cada evento. Por eso inicia en cero. Para que el primer valor agregado numerdaror = 0 + 1 = 1.
    //Los valores que se ponen adentro, son los de color azul porque en la estructura de JSON ese sería el valor.
    let id_row = 'row' + cant; //El cant sólo sirve para asignar un numero diferente a cada nueva fila <tr id="row0"></tr> ... <tr id="row1"></tr> ...
    let fila_todascolumnas = `<tr id= ${id_row} ><td> ${numerador} </td><td>        
    ${nombre} </td><td> ${cantidad} </td><td> $ ${precio} </td></tr>`;
   
    //Agregar a la tabla
    $("#lista").append(fila_todascolumnas); //El objeto llamado lista va a agregar ese nodo (fila). //Agrega una fila con todas las columnas al final.
    $("#nombre").val(''); //Val de vaciar. Devuelve el método o establece el valor de la propiedad del elemento seleccionado.
    $("#cantidad").val(''); // Se utilizó la sintaxis de jQuery. $("selector").val("");
      
     
    console.log(fila_todascolumnas);
    console.log(data);

    //------------LocalStorage--------------------------------------
    JSON.stringify(data);
    localStorage.setItem(key, JSON.stringify(data));

    //-----------Suma carta superior derecha-----------
    //---------Aún no funciona---------------------
    function sumar(){
        let x=0;
        data.forEach(cantidad => {
            x += data.cantidad;
            console.log(cantidad);
         });    
        return x;
        console.log(sumar());
        }
    
    console.log("Hola" + sumar());

    

    }; //Final de condición para que se genere tabla hasta que haya datos correctos.

});//Final de función con el evento click para Agregar.


//---------Botón de Ver----------------------------------
let btnVer = document.getElementById("btnVer");
btnVer.addEventListener("click", function(e){
    e.preventDefault();
    let alert1 = document.getElementsByClassName("table")[1]; //Indice 1, porque es la tabla donde se agregarón los productos.
    if (localStorage.getItem(key)){
    let tmp = JSON.parse(localStorage.getItem(key));
    alert1.innerHTML="";
    tmp.forEach(element => {
        alert1.innerHTML += `<tr id= ${element.id_row} ><td> ${element.numerador} </td><td>        
        ${element.nombre} </td><td> ${element.cantidad} </td><td> $ ${element.precio} </td></tr></table>`;
    });
    alert1.style.display = "table"; //Para que sea visible la tabla con los productos. Se llama hasta presionar el botón de Ver.
    setTimeout( ()=>{alert1.style.display ="none";}, (5*1000));  //Contador para que después de 5s se vuelva a hacer invisible.
    };

});//Final de función con el evento click para Ver.


//----------Botón de Borrar---------------------------------
let btnBorrar = document.getElementById("btnBorrar");
btnBorrar.addEventListener("click", function(e){
    e.preventDefault();
    localStorage.removeItem(key); //Aquí solo basta con esta línea :D

});//Final de función con el evento click para Borrar.



//------------Preguntas--------------------------------------------
//1. Preguntar por qué El numerador se cambio a 1 cuando se agregó el boton ver pero inicialmente era cero 
//para que iniciara en 1 al presionar el boton de Guardar.

//2. Preguntar por la variable temporal y el parse
//3. Preguntar como reconoce las variables cuando no estan dentro de la función.
//4. Preguntar por como vaciar las celdas

//-------Posible uso para agregar notas a la tarjeta superior derecha------------
 //let productosTotal = document.getElementById("productosTotal");
   //productosTotal.innerHTML = sumar();