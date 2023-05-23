
const $ = selector => document.querySelector(selector)
const mostrar = selector => $(selector).classList.remove('hidden')
const ocultar = selector => $(selector).classList.add('hidden')
const id = () => self.crypto.randomUUID()
const getCategorias = (key) => JSON.parse(localStorage.getItem(key))
const setCategorias = (key, array) => localStorage.setItem(key, JSON.stringify(array))
const todasLasCategorias = getCategorias('categorias') || []
const vaciar = (selector) => $(selector).innerHTML = ''

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

const mostrarCategorias = (categorias) =>{
   vaciar('#agregarValoresCategorias')
   if(categorias && categorias.length > 0){
      for(const {nombre, id } of categorias){
      $('#agregarValoresCategorias').innerHTML += `
      <div class='py-3 flex justify-between items-center'>
         <h3 class='px-2 py-1 text-xs text-cyan-400 bg-emerald-100 rounded'>${nombre}</h3>
         <div>
            <button class='pr-3 text-xs text-blue-800 hover:text-black' onclick='editarCategoriaForm("${id}")'>Editar</button>
            <button class='text-xs text-blue-800 hover:text-black' onclick='eliminarCategoria("${id}")'>Eliminar</button>
         </div>
      </div>`
      colocarCategoriaInput(nombre)
      }
}}
const guardarCategoria = (categoriaId) =>{
   return{
      id: categoriaId ? categoriaId : id(),
      nombre: $('#nombreCategoria').value
   }
}

const eliminarCategoria = (id) =>{
   const todasLasCategorias = getCategorias('categorias').filter(categoria => categoria.id !== id)
   console.log(id)
   setCategorias('categorias',todasLasCategorias)
   mostrarCategorias(todasLasCategorias)
}

const editarCategoriaForm = (id) =>{
   ocultar('#agregarValoresCategorias')
   mostrar('#editarCategoria')
   ocultar('#agregarCategoria')
   console.log(id)
   $('#editarCategoria').setAttribute('dataId', id)
   const categoriaSeleccionada = getCategorias('categorias').find(categoria => categoria.id === id)
   $('#nombreCategoria').value = categoriaSeleccionada.nombre
}

const editarCategoria = () => {
   const categoriaId = $('#editarCategoria').getAttribute('dataId')
   const editarCategoria = getCategorias('categorias').map(categoria => {
      if(categoria.id === categoriaId){
         return guardarCategoria(categoriaId)
      }
      return categoria 
   })
   setCategorias('categorias',editarCategoria)
}

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

const agregarCategoria = () =>{
   const categorias = getCategorias('categorias')
   const nuevaCategoria = guardarCategoria()
   categorias.push(nuevaCategoria)
   setCategorias('categorias', categorias)
}

const colocarCategoriaInput = (nombre) =>{ 
   $('#nuevaOperacionCategoria').innerHTML +=  `<option value='${nombre}'> ${nombre}</option>`
}




const inicializador = () =>{
   setCategorias('categorias', todasLasCategorias)
   mostrarCategorias(todasLasCategorias)
   $('#iconoAbrirMenu').addEventListener('click', abrirMenu)
   $('#iconoCerrar').addEventListener('click', cerrarMenu)
   $('#agregarCategoria').addEventListener('click', logicaValorinput)
   $('#editarCategoria').addEventListener('click', () =>{
      editarCategoria()
   })
}

window.addEventListener('load', inicializador)
