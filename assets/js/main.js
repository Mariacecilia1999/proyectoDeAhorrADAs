
/***************FUNCIONES REUTILIZABLES*************/
const $ = selector => document.querySelector(selector)
const mostrar = selector => $(selector).classList.remove('hidden')
const ocultar = selector => $(selector).classList.add('hidden')

/**************FUNCIONALIDAD DEL NAVBAR*************/
const abrirMenu = () =>{
   mostrar('#menu')
   mostrar('#iconoCerrar')
   ocultar('#iconoAbrirMenu')
}

const cerrarMenu = () =>{
   ocultar('#menu')
   ocultar('#iconoCerrar')
   mostrar('#iconoAbrirMenu')
}

/******************* CATEGORIAS**********************/
const categorias = [
   {
      nombre: 'Estudios'
   },
   {
      nombre: 'Compras'
   },
   {
      nombre: 'Luz'
   }
]

/******************MOSTRAR CATEGORIAS***********************/

const mostrarCategorias = (valores) =>{
   for(const categoria of valores){
      $('#agregarValoresCategorias').innerHTML += `
      <div class='py-3 flex justify-between items-center'>
         <h3 class='px-2 py-1 text-xs text-cyan-400 bg-emerald-100 rounded'>${categoria.nombre}</h3>
         <div>
            <button class='pr-3 text-xs text-blue-800 hover:text-black'>Editar</button>
            <button class='text-xs text-blue-800 hover:text-black'>Eliminar</button>
         </div>
      </div>`
   }
}
mostrarCategorias(categorias)





/***************INICIALIZACIÓN DE FUNCIONES***********/
const inicializador = () =>{
   $('#iconoAbrirMenu').addEventListener('click', abrirMenu)
   $('#iconoCerrar').addEventListener('click', cerrarMenu)
}
window.addEventListener('load', inicializador)





/*************************************************/