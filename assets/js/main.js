
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




/************************************************/
const inicializador = () =>{
   $('#iconoAbrirMenu').addEventListener('click', abrirMenu)
   console.log('inicializador')
}
window.addEventListener('load', inicializador)





/***************INICIALIZACIÓN DE FUNCIONES***********/




/*************************************************/