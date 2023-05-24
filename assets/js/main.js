
const $ = selector => document.querySelector(selector)
const mostrar = selector => $(selector).classList.remove('hidden')
const ocultar = selector => $(selector).classList.add('hidden')
const id = () => self.crypto.randomUUID()
const get = (key) => JSON.parse(localStorage.getItem(key))
const set = (key, array) => localStorage.setItem(key, JSON.stringify(array))
const todasLasCategorias = get('categorias') || []
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
   vaciar('#nuevaOperacionCategoria')
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
      nombre: $('#nombreCategoria').value,
   }
}

const eliminarCategoria = (id) =>{
   const todasLasCategorias = get('categorias').filter(categoria => categoria.id !== id)
   console.log(id)
   set('categorias',todasLasCategorias)
   mostrarCategorias(todasLasCategorias)
}

const editarCategoriaForm = (id) =>{
   ocultar('#agregarValoresCategorias')
   mostrar('#editarCategoria')
   ocultar('#agregarCategoria')
   console.log(id)
   $('#editarCategoria').setAttribute('dataId', id)
   const categoriaSeleccionada = get('categorias').find(categoria => categoria.id === id)
   $('#nombreCategoria').value = categoriaSeleccionada.nombre
}

const editarCategoria = () => {
   const categoriaId = $('#editarCategoria').getAttribute('dataId')
   const editarCategoria = get('categorias').map(categoria => {
      if(categoria.id === categoriaId){
         return guardarCategoria(categoriaId)
      }
      return categoria 
   })
   set('categorias',editarCategoria)
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
   const categorias = get('categorias')
   const nuevaCategoria = guardarCategoria()
   categorias.push(nuevaCategoria)
   set('categorias', categorias)
} 


/*NUEVA OPERACIÓN */
const operaciones = get('operaciones') || []
const colocarCategoriaInput = (nombre) =>{
   $('#nuevaOperacionCategoria').innerHTML +=  `<option value='${nombre}'> ${nombre}</option>`
}

const guardarNuevaOperacion= () =>{
   return{
      id:  id(),
      categoria: $('#nuevaOperacionCategoria').value,
      descripcion: $('#descripcionOperacion').value,
      monto: $('#montoOperacion').value,
      tipo: $('#tipoCategoria').value,
      fecha: $('#fechaOperacion').value
   }
}

const agregarNuevaOperacion = () =>{
   const obtengoOperaciones = get('operaciones')
   const nuevaOperacion = guardarNuevaOperacion()
   obtengoOperaciones.push(nuevaOperacion)
   set('operaciones', obtengoOperaciones)
   mostrarNuevaOperacion(operaciones)
}

const mostrarNuevaOperacion = (operaciones) =>{
   vaciar('.cuerpoTabla')
   if(operaciones.length > 0){
      ocultar('#sinOperaciones')
      mostrar('#conOperaciones')
      for(const {id, descripcion, monto, fecha, categoria} of operaciones){
         $('.cuerpotabla').innerHTML += `
               <tr class='tr'>
                  <td>${descripcion}</td>
                  <td>${categoria}</td>
                  <td>${fecha}</td>
                  <td>${monto}</td>
                  <td>
                     <button>Editar</button>
                     <button onclick='eliminarOperacion("${id}")'>Eliminar</button>
                  </td>
               </tr>
         `
      }
   }
}

const eliminarOperacion = (id) =>{
   const operaciones = get('operaciones').filter(operacion => operacion.id !== id)
   set('operaciones', operaciones)
   mostrarNuevaOperacion(operaciones)
}






const inicializador = () =>{
   set('categorias', todasLasCategorias)
   set('operaciones', operaciones)
   mostrarCategorias(todasLasCategorias)
   mostrarNuevaOperacion(operaciones)
   $('#iconoAbrirMenu').addEventListener('click', abrirMenu)
   $('#iconoCerrar').addEventListener('click', cerrarMenu)
   $('#agregarCategoria').addEventListener('click', logicaValorinput)
   $('#editarCategoria').addEventListener('click', () =>{
      editarCategoria()
   })
   $('#agregarOperacion').addEventListener('click', (e)=>{
      e.preventDefault()
      agregarNuevaOperacion()

   })
}

window.addEventListener('load', inicializador)
