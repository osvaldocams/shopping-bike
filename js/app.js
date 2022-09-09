const cart = document.querySelector('#cart'); //icono del carrito
const shop = document.querySelector('#shop'); // carrito de compras(completo)
const listaProductos = document.querySelector('#lista-productos'); // lista de productos
const contenedorCarrito = document.querySelector('#shopping_dinamic'); //elemento dinamico
const vaciarCarrito = document.querySelector('#vaciar-carrito'); //boton vaciar carrito
let articulosCarrito = [];


listeners();
function listeners(){
    //desplegar carrito
    cart.addEventListener('click', ()=>{
        shop.classList.toggle('inactive');
    });

    //agregar curso al carrito de compras
    listaProductos.addEventListener('click', agregarProducto);

    //elimina productos del carrito
    shop.addEventListener('click', eliminarProducto);

    //muestra lo que hay en localStorage
    document.addEventListener('DOMContentLoaded', ()=>{
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    });

    //vaciar carrito
    vaciarCarrito.addEventListener('click', ()=>{
        articulosCarrito = [];
        limpiarHTML()
    });

}



// funciones
function agregarProducto(e){
    e.preventDefault()
    if(e.target.classList.contains('card__boton')){
        const productoSeleccionado = e.target.parentElement.parentElement; 

        leerDatosProd(productoSeleccionado);
    }
    
}

function eliminarProducto(e){
    e.preventDefault();
    if(e.target.classList.contains('shopping__close')){
        const prodId = e.target.getAttribute('data-id');

        //elimina del array por el data-id
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== prodId);
        
        carritoHTML(); //iterar sobre carrito y mostrar su html
    }
    
}

// leer html del producto para extraer informacion
function leerDatosProd(producto){
    console.log(producto);

    //crear un objeto para separar el contenido html
    const infoProducto = {
        imagen: producto.querySelector('.card__img img').src,
        titulo: producto.querySelector('.card__title').textContent,
        precio: producto.querySelector('.card__precio').textContent,
        id: producto.querySelector('.card__boton').getAttribute('data-id'),
        cantidad: 1
    }
    
    //revisa si un producto ya existe en el carrito
    const existe = articulosCarrito.some(producto => producto.id === infoProducto.id );
    if(existe){
        //actualizamos la cantidad
        const bicis = articulosCarrito.map(producto =>{
            if(producto.id === infoProducto.id){
                producto.cantidad++;
                return producto
            }else{
                return producto
            }
        });
        articulosCarrito = [...bicis]

    }else{
        //se agrega el producto al carrito
        articulosCarrito = [...articulosCarrito, infoProducto];
    }


    //agregar elementos al array de carrito
    
    console.log(articulosCarrito);

    carritoHTML();
}


//muestra el carrito de compras en el html
function carritoHTML(){

    //limpiar el html
    limpiarHTML();

    //recorre el carrito y genera el html
    articulosCarrito.forEach(producto => {
        const {imagen, titulo, precio, cantidad, id} = producto
        const fila = document.createElement('div');
        fila.classList.add('shopping__content');
        fila.innerHTML = `
            <img class="shopping__img" src="${imagen}" alt="imagen producto">
            <p>
                ${titulo}
            </p>
            <p class="shopping__precio">${precio} </p>
            <p class="shopping__cantidad"> ${cantidad} </p>
            <a href="#" class="shopping__close" data-id="${id}" > X </a>   
        `
        //agrega el html del carrito al div dinamico
        contenedorCarrito.appendChild(fila);

    });
    sincronizarStorage();
}

//sincronizar con local storage
function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

//elimina los prroductos del div dinámico
function limpiarHTML(){
    contenedorCarrito.innerHTML = '';
    // while(contenedorCarrito.firstChild){
    //     contenedorCarrito.remove(contenedorCarrito.firstChild);
    // }
}



