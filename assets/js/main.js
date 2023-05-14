
/******************HANDLERS*********************/

/***************FUNCIONES REUTILIZABLES*************/
const $ = selector => document.querySelector(selector)
const mostrar = selector => $(selector).classList.remove('hidden')
const ocultar = selector => $(selector).classList.add('hidden')

const id = () => self.crypto.randomUUID()

/*******************LOCAL STORAGE******************/
const getCategorias = (key) => JSON.parse(localStorage.getItem(key))

const setCategorias = (key, array) => localStorage.setItem(key, JSON.stringify(array))

const todasLasCategorias = getCategorias('categorias') || []

const vaciar = (selector) => $(selector).innerHTML = ''




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


/******************MOSTRAR CATEGORIAS***********************/

const mostrarCategorias = (categorias) =>{
   vaciar('#agregarValoresCategorias')
   if(categorias && categorias.length > 0){
   for(const {nombre, id } of categorias){
      $('#agregarValoresCategorias').innerHTML += `
      <div class='py-3 flex justify-between items-center'>
         <h3 class='px-2 py-1 text-xs text-cyan-400 bg-emerald-100 rounded'>${nombre}</h3>
         <div>
            <button class='pr-3 text-xs text-blue-800 hover:text-black' onclick='editarCategoria("${id}")'>Editar</button>
            <button class='text-xs text-blue-800 hover:text-black' onclick='eliminarCategoria("${id}")'>Eliminar</button>
         </div>
      </div>`
   }
   }
}



const guardarCategoria = () =>{
   return{
      id: id(),
      nombre: $('#nombreCategoria').value
   }
}

/************DELETE**************/
const eliminarCategoria = (id) =>{
   const todasLasCategorias = getCategorias('categorias').filter(categoria => categoria.id !== id)
   console.log(id)
   setCategorias('categorias',todasLasCategorias)
   mostrarCategorias(todasLasCategorias)
}

/************EDITAR CATEGORIA***************/

const editarCategoria = (id) =>{
   ocultar('#agregarValoresCategorias')
   mostrar('#editarCategoria')
   ocultar('#agregarCategoria')
   console.log(id)
}




/***************VALIDO INPUT****************/
const logicaValorinput = (e) =>{
   e.preventDefault()
   if($('#nombreCategoria').value.length >= 4 ){
      agregarCategoria()
      window.location.reload()
   }else{
      console.log('error')
      $('#errorValorInput').innerHTML = `<p class='text-red-400'>Agrega un nombre de la categoria valido</p>`
   }
}

/*******************************/
const agregarCategoria = () =>{
   const categorias = getCategorias('categorias')
   const nuevaCategoria = guardarCategoria()
   categorias.push(nuevaCategoria)
   setCategorias('categorias', categorias)
}



/***************INICIALIZACIÓN DE FUNCIONES***********/
const inicializador = () =>{
   setCategorias('categorias', todasLasCategorias)
   mostrarCategorias(todasLasCategorias)
   $('#iconoAbrirMenu').addEventListener('click', abrirMenu)
   $('#iconoCerrar').addEventListener('click', cerrarMenu)
   $('#agregarCategoria').addEventListener('click', logicaValorinput)
}
window.addEventListener('load', inicializador)





/*************************************************/