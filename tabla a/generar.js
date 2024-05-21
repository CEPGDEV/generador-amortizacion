/*funcion para convertir la tasa de porcentaje a decimal*/
function decimal(tipo, porcentaje){
    /*Dependiendo el tipo de pago cambia el proceso*/
    switch (tipo) {
        case "mensual":
            porcentaje = porcentaje/12;
            porcentaje = porcentaje/100;
            break;
        case "bimestral":
            porcentaje = porcentaje/6;
            porcentaje = porcentaje/100;
            break;
        case "trimestral":
            porcentaje = porcentaje/4;
            porcentaje = porcentaje/100;
            break;
        case "cuatrimestral":
            porcentaje = porcentaje/3;
            porcentaje = porcentaje/100;
            break;
        case "semestral":
            porcentaje = porcentaje/2;
            porcentaje = porcentaje/100;
            break;
        case "anual":
            porcentaje = porcentaje/100;
            break
    }
    return porcentaje
}
/*Funcion para el calculo de la renta*/
function cal_renta(monto,n_pagos,tasa){
    var renta = (monto*tasa)/(1-(Math.pow((1+tasa),-n_pagos)));
    renta = renta.toFixed(2); /*limitar los decimales a dos*/
    return renta;
}

var control = false; /*variable de control*/
//funcion para generar las filas
function generar(){
var tableBody = document.getElementById("amortizacion");
 /*en caso de haber generado una tabla anterior se elimina
 completamente, para evitar la existencia de dos o mas tablas a la vez*/
if(control == true){
    const generado = document.querySelectorAll(".generado");
    for (let index = 0; index < generado.length; index++) {
        generado[index].remove();
    }
    control = false;
 }
 //seleccionamis nuestros elementos del formulario
 var monto = document.getElementById("monto").value;
 var n_pagos = document.getElementById("n_pagos").value;
 var t_pagos = document.getElementById("t_pagos").value;
 var tasa = document.getElementById("tasa").value;
 //si no existe otra tabla podemos hacer una nueva
 if(control == false){
//calculamos nuestra tasa en decimal y nuestra renta
 tasa = decimal(t_pagos,tasa);
 var renta = cal_renta(monto, n_pagos, tasa);
 //bucle que genera las filas con datos
 for (let i = 0; i <= n_pagos; i++){
    /*definimos en variables la creacion de una celda
    con el dato que debe contener*/
    var c_pago = `<td>${i}</td>`;
    var c_renta = `<td>${renta}</td>`;
    var c_interes = `<td>${(monto*tasa).toFixed(2)}</td>`;
    var c_amortizado = `<td>${(renta-(monto*tasa)).toFixed(2)}</td>`;
    var c_saldo = `<td>${monto}</td>`;
    var blanco = `<td></td>`;
    //genera nuestra fila de pago cero
    if( i == 0 ){
        tableBody.innerHTML += `<tr class="generado">${c_pago + blanco + blanco + blanco + c_saldo}</tr>`;
        monto = (monto - (renta-(monto*tasa))).toFixed(2);
    }else{
        //genera el resto de pagos y actualiza nuestro saldo a pagar
        tableBody.innerHTML += `<tr class="generado">${c_pago + c_renta + c_interes + c_amortizado + c_saldo}</tr>`;
        monto = (monto - (renta-(monto*tasa))).toFixed(2);
    }
 }
 //alerta con los valores, usada para test, se puede eliminar
 alert(`renta ${renta} monto ${monto} n_pagos ${n_pagos} t_pagos ${t_pagos} tasa ${tasa}`);
 control = true; //indicamos que ya existe una tabla, la proxima vez que se genere una sera eliminada
}
}

/*
<---! codigo hecho por Carlos Pérez !--->
*/