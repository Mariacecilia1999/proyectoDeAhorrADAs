
const $ = selector => document.querySelector(selector)
const mostrar = selector => $(selector).classList.remove('hidden')
const mostrarMd  = selector => $(selector).classList.remove('md:hidden')
const ocultarMd= selector => $(selector).classList.add('md:hidden')
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
   //vaciar('#nuevaOperacionCategoria')
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
   mostrar('#cancelarCategoria')
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
   const categoriasEditadas= get('categorias').map(categoria => {
      if(categoria.id === categoriaId){
         return guardarCategoria(categoriaId)
      }
      return categoria 
   })
   set('categorias',categoriasEditadas)
   mostrar('#agregarValoresCategorias')
   mostrarCategorias(get('categorias'))
   ocultar('#editarCategoria')
   ocultar('#cancelarCategoria')
   mostrar('#agregarCategoria')
}

const logicaValorinput = () =>{
   if($('#nombreCategoria').value.length >= 4 ){
      agregarCategoria()
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
   mostrarCategorias(get('categorias'))
} 


/*NUEVA OPERACIÓN */
const operaciones = get('operaciones') || []
const colocarCategoriaInput = (nombre) =>{
   $('#nuevaOperacionCategoria').innerHTML +=  `<option value='${nombre}'> ${nombre}</option>`
}

const guardarNuevaOperacion= (operacionId) =>{
   return{
      id: operacionId ? operacionId : id(),
      categoria: $('#nuevaOperacionCategoria').value,
      descripcion: $('#descripcionOperacion').value,
      monto: parseFloat($('#montoOperacion').value),
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
      mostrar('.tabla')
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
                     <button onclick='editarOperacionForm("${id}")'>Editar</button>
                     <button onclick='eliminarOperacion("${id}")'>Eliminar</button>
                  </td>
               </tr>
         `
      }
   }else{
      mostrar('#sinOperaciones')
      ocultar('.tabla')
   }
}

const eliminarOperacion = (id) =>{
   const operaciones = get('operaciones').filter(operacion => operacion.id !== id)
   set('operaciones', operaciones)
   mostrarNuevaOperacion(operaciones)
   calculosBalance()

}

const editarOperacionForm = (id) =>{
   mostrar('#seccionNuevaOperacion')
   ocultar('#agregarOperacion')
   mostrar('#editarOperacion')
   ocultar('#seccionBalance')
   ocultarMd('#seccionBalance')
   $('#editarOperacion').setAttribute('dataId', id)
   const operacionSeleccionada = get('operaciones').find(operacion => operacion.id === id)
   $('#descripcionOperacion').value = operacionSeleccionada.descripcion
   $('#montoOperacion').value = operacionSeleccionada.monto
   $('#fechaOperacion').value = operacionSeleccionada.fecha
   $('#tipoCategoria').value = operacionSeleccionada.tipo
   $('#nuevaOperacionCategoria').value = operacionSeleccionada.categoria
   
}

const editarOperacion = () =>{
   const idOperacion = $('#editarOperacion').getAttribute('dataId')
   console.log(idOperacion)
   const editarOperacion = get('operaciones').map(operacion =>{
      if(operacion.id === idOperacion){
         return guardarNuevaOperacion(operacion.id)
      }
      return operacion
   })

   set('operaciones', editarOperacion)
   mostrar('#seccionBalance')
   mostrarMd('#seccionBalance')
   ocultar('#seccionNuevaOperacion')
}


const calculosBalance = () =>{
   if(operaciones.length >= 1){ 
      const filtrarGanancia = get('operaciones').reduce((acumulador, valor) =>{
         if(valor.tipo === 'ganancia'){
            return acumulador + valor.monto
         }
         return acumulador
      }, 0)

      set('ganancia', filtrarGanancia)
      $('#mostrarGanancia').innerHTML = get('ganancia')

      const filtrarGasto = get('operaciones').reduce((acumulador, valor)=>{
         if(valor.tipo === 'gasto'){
            return acumulador - valor.monto
         }
         return acumulador
      }, 0)
      set('gastos', filtrarGasto)
      $('#mostrarGastos').innerHTML = get('gastos')

      console.log(filtrarGanancia)
      console.log(filtrarGasto)
      const total = filtrarGanancia +  filtrarGasto
      console.log(total)
      $('#totalBalance').innerHTML = `${total}`
   }
}

const filtros = () =>{
   const obtengoCategorias = get('categorias')
   for(const {nombre} of obtengoCategorias){
      $('#valoresCategorias').innerHTML += `<option value="${nombre}">${nombre}</option>`
   }

   const seleccionarTipo = $('#tipoOperacion')
   seleccionarTipo.addEventListener('change', () =>{
      const tipoSelecionado = seleccionarTipo.value
      const filtrarPorOperacion = operaciones.filter(operacion => operacion.tipo === tipoSelecionado)
      mostrarNuevaOperacion(filtrarPorOperacion)
   })

   const categoriaSeleccionada = $('#valoresCategorias')
   categoriaSeleccionada.addEventListener('change', () => {
      const nombreCategoria = categoriaSeleccionada.value
      const filtrarCategoria = operaciones.filter(operacion => operacion.categoria === nombreCategoria)
      console.log(filtrarCategoria)
      mostrarNuevaOperacion(filtrarCategoria)
      if(nombreCategoria === 'Todas'){
         mostrarNuevaOperacion(get('operaciones'))
      }
   })
  
}

filtros()

const inicializador = () =>{
   calculosBalance()
   set('categorias', todasLasCategorias)
   set('operaciones', operaciones)
   mostrarCategorias(todasLasCategorias)
   mostrarNuevaOperacion(operaciones)
   $('#iconoAbrirMenu').addEventListener('click', abrirMenu)
   $('#iconoCerrar').addEventListener('click', cerrarMenu)


   $('#agregarCategoria').addEventListener('click', (e) =>{
      e.preventDefault()
      logicaValorinput()
   })
   $('#editarCategoria').addEventListener('click', (e) =>{
      e.preventDefault()
      editarCategoria()
   })
   $('#editarOperacion').addEventListener('click', (e) =>{
      e.preventDefault()
      editarOperacion()
      mostrarNuevaOperacion(get('operaciones'))
      calculosBalance()

   })
   $('#agregarOperacion').addEventListener('click', (e)=>{
      e.preventDefault()
      agregarNuevaOperacion()
      mostrarNuevaOperacion(get('operaciones'))
      mostrar('#seccionBalance')
      mostrarMd('#seccionBalance')
      ocultar('#seccionNuevaOperacion')
      calculosBalance()

   })

   $('#mostrarCategorias').addEventListener('click', () =>{
      
      ocultar('#seccionBalance')
      ocultarMd('#seccionBalance')
      mostrar('#seccionCategorias')
   })
   $('#mostrarBalances').addEventListener('click', () =>{
      ocultar('#seccionCategorias')
      mostrar('#seccionBalance')
      mostrarMd('#seccionBalance')
   })
   $('#cancelarCategoria').addEventListener('click', () =>{
      console.log('cancelar')
      console.log(get('categorias'))
      ocultar('#cancelarCategoria')
      mostrar('#agregarValoresCategorias')
      ocultar('#editarCategoria')
      mostrar('#agregarCategoria')
   })
   $('#nuevaOperacion').addEventListener('click', () =>{
      mostrar('#seccionNuevaOperacion')
      ocultar('#seccionBalance')
      ocultarMd('#seccionBalance')
      ocultar('#editarOperacion')
      mostrar('#agregarOperacion')
   })
   $('#cancelarOperacion').addEventListener('click', () =>{
      mostrarNuevaOperacion(get('operaciones'))
      ocultar('#seccionNuevaOperacion')
      mostrar('#seccionBalance')
      mostrarMd('#seccionBalance')
   })
}

window.addEventListener('load', inicializador)

