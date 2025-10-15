cuentas=[
    {numeroCuenta:"02234567", cedula:"1714616123",nombre:"Juan",apellido:"Perez",saldo:0.0},
    {numeroCuenta:"02345211",cedula:"1281238233",nombre:"Felipe",apellido:"Caicedo",saldo:0.0}
]

cargar=function(){
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("contenedorTransacciones");
    
}

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
buscarCuenta=function(numeroCuenta){
    let elementoCliente;
        let clienteEncontrado=null;
        for(i=0;i<cuentas.length;i++){
            elementoCliente=cuentas[i];
            if(elementoCliente.numeroCuenta==numeroCuenta){
                clienteEncontrado=elementoCliente;
                break;
            }
        }
        return clienteEncontrado;
}

ejecutarBusqueda=function(){
    //toma el numero de cuenta de la caja de texto
    //invoca a buscarCuenta y guarda el resultado en una variable
    //Si el resultado es diferente de null, muestra en pantalla, caso contrario muestra un alert
    let valorCedula=recuperarTexto("txtCajaCuentas");
    let cuenta=buscarCuenta(valorCedula);
    if(cuenta==null){
        alert("CLIENTE NO ENCONTRADO")
    }else{
        mostrarComponente("contenedorTransacciones");
        
        mostrarTabla();
    }

}

depositar=function(numeroCuenta,monto){
    let cuentaAfectada=buscarCuenta(numeroCuenta);
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    //Al saldo actual de la cuenta afectada, le suma el monto que recibe como parámetro
    cuentaAfectada.saldo+=monto;

}

ejecutarDeposito=function(){
    //Toma el numero de cuenta ingresado en la caja de texto
    //Toma el monto ingresado en la caja de texto
    //invoca a depositar
    //Muestra un mensaje TRANSACCION EXITOSA
    //Muestra en pantalla el nuevo saldo de la cuenta
    let numCuenta=recuperarTexto("txtCajaCuentas");
    let monto=recuperarFloat("txtMonto");
    depositar(numCuenta,monto);
    alert("TRANSACCION EXITOSA");
    mostrarTabla();
}

retirar=function(numeroCuenta,monto){
    let cuentaAfectada=buscarCuenta(numeroCuenta);
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    //Al saldo actual de la cuenta afectada, le suma el monto que recibe como parámetro
    cuentaAfectada.saldo-=monto;
}

ejecutarRetiro=function(){
    let numCuenta=recuperarTexto("txtCajaCuentas");
    let cuentaAfectada=buscarCuenta(numCuenta);
    let monto=recuperarFloat("txtMonto");
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    //Valida si la cuenta tiene el saldo suficiente para retirar el monto
    //Si el saldo es suficiente,al saldo actual de la cuenta afectada, le resta el monto que recibe como parámetro
    //Si el saldo no es suficiente, muestra un alert SALDO INSUFICIENTE
    //Si logra retirar muestra un mensaje TRANSACCION EXITOSA y muestra en pantalla el nuevo saldo de la cuenta

    if(cuentaAfectada.saldo<monto){
        alert("SALDO INSUFICIENTE")
    }else{
        retirar(numCuenta,monto)
        alert("TRANSACCION EXITOSA")
        mostrarTabla();
    }
}
mostrarTabla=function(){
    let cmpTabla=document.getElementById("divTabla");
    let contenidoTabla="<table><tr>"+
    "<th>NUMERO DE CUENTA</th>"+
    "<th>CEDULA</th>"+
    "<th>NOMBRE</th>"+
    "<th>APELLIDO</th>"+
    "<th>SALDO</th>"+
    "</tr>";
    let elementoClientes;
    for(let i=0;i<cuentas.length;i++){
    elementoClientes=cuentas[i]
    contenidoTabla+=
    "<tr><td>"+elementoClientes.numeroCuenta+"</td>"
    +"<td>"+elementoClientes.cedula+"</td>"
    +"<td>"+elementoClientes.nombre+"</td>"
    +"<td>"+elementoClientes.apellido+"</td>"
    +"<td>"+elementoClientes.saldo+"</td>"
    +"</tr>"
    }
    contenidoTabla+="</table>"
    cmpTabla.innerHTML=contenidoTabla;

}