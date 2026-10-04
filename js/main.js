console.log("==================================================");
console.log(" LUMEN | La luz que transforma tus espacios 💡 ");
console.log(" Sistema de Gestión de Catálogo & Inventario LED ");
console.log("==================================================");

// 1. CLASE PRODUCTO
class Producto {
  constructor(id, nombre, precio, stock) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }

  vender(cantidad) {
    if (cantidad <= this.stock) {
      this.stock -= cantidad;
      return true;
    }  
    return false;
  }
}

// 2. CATÁLOGO INICIAL
const catalogoLumen= [
  new Producto(1, "Tira LED Cálida 2700K", 1500, 10),
  new Producto(2, "Tira LED RGB Neón", 2500, 8),
  new Producto(3, "Panel LED Embutir 18W", 12000, 15),
  new Producto(4, "Lámpara de Pie Nórdica", 3400, 9),
  new Producto(5, "Perfil de Aluminio Difusor", 800, 20)

];    

// 3. MOSTRAR CATÁLOGO(forEach con arrow function)

function mostrarCatalogo(lista){
  let mensaje = "Catálogo LUMEN:\n\n";
  lista.forEach(p=>{
    mensaje += `${p.id}. ${p.nombre} - $${p.precio} (Stock: ${p.stock})\n`;
  });
  alert(mensaje);
}


// 4. BUSCAR PRODUCTO (find con arrow function)

function buscarProducto(){
  let buscado = prompt("Ingresa el nombre del producto a buscar");

   // Si canceló o no escribió nada, salimos sin error
  if (!buscado || buscado.trim() === "") {
    alert("Búsqueda cancelada.");
    return;
  }
  
  let encontrado = catalogoLumen.find(p => p.nombre.toLowerCase().includes(buscado.toLowerCase()));

  if (encontrado){
    alert(`Encontrado: ${encontrado.nombre} | Precio: $${encontrado.precio} | Stock: ${encontrado.stock}`);
  } else{
    alert ("No se encontró el producto");
  }
}


// 5. FILTRAR PRODUCTOS POR PRECIO(Usando filter)
function filtrarPorPrecio(){
  let precioMax = parseFloat(prompt("Ingresa el precio máximo"));
  let filtrados = catalogoLumen.filter (p => p.precio <= precioMax);

  if (filtrados.length > 0){
    mostrarCatalogo(filtrados);
  } else{
    alert("No hay productos dentro de este rango de precio.");
  }
}



// 6. TOTAL INVERTIDO EN STOCK (USANDO REDUCE)
function calcularTotalStock(){
  const total= catalogoLumen.reduce ((acc,p)=> acc+p.precio * p.stock, 0);
  alert("Total valorizado en stock: \$" + total);
}

// 7. VENDER PRODUCTO
function realizarVenta() {
  mostrarCatalogo(catalogoLumen);
  let idIngresado = parseInt(prompt("Ingresa el número de ID del producto a vender:"));
  let productoEncontrado = catalogoLumen.find(p => p.id === idIngresado);
  if (productoEncontrado) {
    let cantidad = parseInt(prompt(`¿Cuántas unidades deseas vender de ${productoEncontrado.nombre}? (Stock actual: ${productoEncontrado.stock})`));
    if (!isNaN(cantidad) && cantidad > 0) {
      let ventaOk = productoEncontrado.vender(cantidad);
      if (ventaOk) {
        let total = cantidad * productoEncontrado.precio;
        alert(`Venta realizada. Total a pagar: $${total}. Stock restante: ${productoEncontrado.stock}`);
      } else {
        alert("No hay suficiente stock disponible.");
      }
    } else {
      alert("Cantidad no válida.");
    }
  } else {
    alert("Producto no encontrado. Verifica el ID ingresado");

  }
}


// 8. AGREGAR PRODUCTO (new + push)
function agregarProducto() {
  let nombre = prompt("Ingresa el nombre del nuevo producto:");
  let precio = parseFloat(prompt("Ingresa el precio:"));
  let stock = parseInt(prompt("Ingresa el stock inicial:"));

  if (nombre !== null && nombre.trim() !== "" && !isNaN(precio) && !isNaN(stock)) {
    let nuevoId = catalogoLumen.length + 1;
    let nuevo = new Producto(nuevoId, nombre.trim(), precio, stock);
    catalogoLumen.push(nuevo);
    alert("Producto agregado con éxito.");
  } else {
    alert("Datos inválidos.");
  }
}

// ----------------------------------------------------
// FLUJO PRINCIPAL: Menú con SWITCH-CASE
// ----------------------------------------------------

let usuario = prompt("¡ Bienvenido/a a LUMEN! Ingresa tu nombre:");


if (usuario !== null && usuario !=="") {
  let continuar = true;

  while (continuar) {
    let opcionMenu = prompt(
      `Hola ${usuario}, bienvenido/a al panel de LUMEN.\n\n` +
      "Selecciona una opción:\n" +
      "1 - Ver catálogo completo (forEach)\n" +
      "2 - Buscar producto por nombre (find)\n" +
      "3 - Filtrar productos por precio (filter)\n" +
      "4 - Total invertido en stock (reduce)\n" +
      "5 - Vender producto (método vender)\n" +
      "6 - Agregar nuevo producto (new Producto)\n" +
      "7 - Salir"
    );

    switch (opcionMenu) {
      case "1":
        mostrarCatalogo(catalogoLumen);
        break;

      case "2":
        buscarProducto();
        break;

      case "3":
        filtrarPorPrecio();
        break;

      case "4":
        calcularTotalStock();
        break;

      case "5":
        realizarVenta();
        break;

      case "6":
        agregarProducto();
        break;

      case"7":
      case null:
        alert("¡Gracias por gestionar el catálogo de LUMEN, " + usuario + "!");
        continuar = false;
        break;

      default:
        alert("Opción no válida. Ingresa un número del 1 al 7.");
        break;
    }
  }
} else {
  alert("Operación cancelada.");
}
