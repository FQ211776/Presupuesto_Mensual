// Arreglos de objetos que contienen información sobre ingresos y egresos
const ingresos = [
    new Ingreso('Salario', 2100.00),
    new Ingreso('Venta coche', 1500)
];

const egresos = [
    new Egreso('Renta departamento', 900),
    new Egreso('Ropa', 400)
];

// Función principal que carga la aplicación
let cargarApp = ()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
    getInitialDate();
}

// Función que calcula el total de ingresos
let totalIngresos = ()=>{
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

// Función que calcula el total de egresos
let totalEgresos = ()=>{
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

// Función que carga los datos en el encabezado de la aplicación
let cargarCabecero = ()=>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

// Función que da formato de moneda a los valores
const formatoMoneda = (valor)=>{
    return valor.toLocaleString('en-US',{style:'currency', currency:'USD', minimumFractionDigits:2});
}

// Función que da formato de porcentaje a los valores
const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('en-US',{style:'percent', minimumFractionDigits:2});
}

// Función que carga los datos de ingresos en el HTML
const cargarIngresos = ()=>{
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

// Función que crea el HTML para mostrar un ingreso
const crearIngresoHTML = (ingreso)=>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class='elemento_eliminar--btn'>
                <ion-icon name="close-circle-outline"
                onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return ingresoHTML;
}

// Función que elimina un ingreso del arreglo y actualiza la información en el HTML
const eliminarIngreso = (id)=>{
    // Recorre cada uno de los elementos de la lista de egresos
    let indiceEliminar = ingresos.findIndex( ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

// Función para cargar los elementos de la lista de egresos en el HTML
const cargarEgresos = ()=>{
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}


// Función para crear el HTML de un elemento de egreso
const crearEgresoHTML = (egreso)=>{
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
        <div class="elemento_eliminar">
            <button class='elemento_eliminar--btn'>
                <ion-icon name="close-circle-outline"
                onclick='eliminarEgreso(${egreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return egresoHTML;
}

// Función para eliminar un elemento de la lista de egresos
let eliminarEgreso = (id)=>{
    // Busca el índice del elemento a eliminar
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    // Elimina el elemento de la lista de egresos
    egresos.splice(indiceEliminar, 1);
     // Actualiza los totales en la sección de cabecera y recarga la lista de egresos en el HTML
    cargarCabecero();
    cargarEgresos();
}

// Función para agregar un nuevo elemento a la lista de ingresos o egresos
let agregarDato = ()=>{
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if(descripcion.value !== '' && valor.value !== ''){
        // Agrega un nuevo elemento de ingreso a la lista de ingresos y recarga los totales y la lista de ingresos en el HTML
            ingresos.push( new Ingreso(descripcion.value, +valor.value));
        if(tipo.value === 'ingreso'){
            ingresos.push( new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();
        }
        // Agrega un nuevo elemento de egreso a la lista de egresos y recarga los totales y la lista de egresos en el HTML
        else if(tipo.value === 'egreso'){
           egresos.push( new Egreso(descripcion.value, +valor.value));
           cargarCabecero();
           cargarEgresos();
        }
    }
}


// Definimos la función para obtener el mes en el encabezado
function getInitialDate() {
  // Obtenemos la referencia del elemento con el ID "titulo-header" en el HTML
  let headerTitle = document.getElementById("fecha-actual");
  // Creamos una instancia de la clase Date para obtener la fecha actual
  const currentDate = new Date();
  // Creamos un array con el nombre de los meses en orden
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
// Actualizamos el contenido del elemento con el mes y el año actual
  headerTitle.innerHTML = `Presupuesto de ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
}
