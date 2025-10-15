movimientos=[
    {numeroCuenta:"02234567",monto:10.24,tipo:"D"},
    {numeroCuenta:"02345211",monto:45.90,tipo:"D"},
    {numeroCuenta:"02234567",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:12.0,tipo:"D"},
]

cargar=function(){
    mostrarComponente("divMovimientos");
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");
    
}

filtrarMovimientos=function(numeroCuenta){
    let movimientosCuenta=[];
    
    for (let i = 0; i < movimientos.length; i++) {
        if (movimientos[i].numeroCuenta === numeroCuenta) {
            movimientosCuenta.push(movimientos[i]);
        }
    }
    mostrarMovimientos(movimientosCuenta);
}

mostrarMovimientos=function(misMovimientos){
    let tablaHTML = '<table class="tablaMovimientos">';
    
    tablaHTML += '<thead><tr><th>CUENTA</th><th>MONTO</th><th>OPERACION</th></tr></thead>';
    
    tablaHTML += '<tbody>';
    
    misMovimientos.forEach(movimiento => {
        let montoAMostrar = movimiento.monto;
        let tipoOperacion = '';
        
        if (movimiento.tipo === "D") {
            montoAMostrar = montoAMostrar * -1; 
            tipoOperacion = 'DEBITO';
        } else if (movimiento.tipo === "C") { 
            tipoOperacion = 'CREDITO';
        }
        
        
        tablaHTML += `<tr>
            <td>${movimiento.numeroCuenta}</td>
            <td>${montoAMostrar.toFixed(2)}</td>
            <td>${tipoOperacion}</td>
        </tr>`;
    });
    
    tablaHTML += '</tbody></table>';

    mostrarTexto("tablaMovimientos", tablaHTML); 
}

buscarMovimientos=function(){
    
    let numeroCuenta = recuperarTexto("txtNumeroCuenta");
    
    if (numeroCuenta) {
        filtrarMovimientos(numeroCuenta);
    } else {
        alert("Por favor, ingrese un numero de cuenta.");
    }
}





