cuentas=[
    {numeroCuenta:"02234567", cedula:"1714616123",nombre:"Juan",apellido:"Perez",saldo:0.0},
    {numeroCuenta:"02345211",cedula:"1281238233",nombre:"Felipe",apellido:"Caicedo",saldo:0.0}
]

cargar=function(){
    mostrarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("divTransacciones");
    
}

mostrarCuentas=function(){
    let objetoPersona={};
    let tabla="<table><tr><th> NUMERO CUENTA </th><th> NOMBRE </th><th> SALDO </th></tr>";
    for(let i=0; i<cuentas.length;i++){
        objetoPersona=cuentas[i];
        tabla+="<tr>"+"<td>"+objetoPersona.numeroCuenta+"</td>"+
            "<td>"+objetoPersona.nombre+""+objetoPersona.apellido+"</td>"+
            "<td>"+objetoPersona.saldo+"</td>"+"</tr>";
    }

    tabla+="</table>";
 mostrarTextoHTML("tablaCuentas", tabla);


    /*
        Muestra en pantalla una tabla con la información de todas las cuentas del arreglo.
        Columnas: NUMERO CUENTA, NOMBRE, SALDO
        En la columna NOMBRE concatenar el nombre y el apellido
    */
}

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
buscarCuenta=function(numeroCuenta){
    let objetoPersona={};
    for(let i=0;i<cuentas.length;i++){
        objetoPersona=cuentas[i];
        if(objetoPersona.numeroCuenta==numeroCuenta){
            return objetoPersona;
            break;
        }
    }
    return null;
}

/*
    Agrega una cuenta al arreglo, solamente si no existe otra cuenta con el mismo numero.
    No retorna nada
*/
agregarCuenta=function(cuenta){
    let cliente=buscarCuenta(cuenta.numeroCuenta);
    if(cliente==null){
        alert(" CUENTA AGREGADA ");
        cuentas.push(cuenta);
    }else{
        alert(" CUENTA EXISTENTE ");
    }
    //Si ya existe mostrar un alert CUENTA EXISTENTE
    //Si se agrega, mostrar un alert CUENTA AGREGADA
}

agregar=function(){
    let objetoCuenta={};
    let cedula=recuperarTexto("txtCedula");//"txtCuenta"
    let cuenta=recuperarTexto("txtCuenta");//"txtNombre"
    let nombre=recuperarTexto("txtNombre");
    let apellido=recuperarTexto("txtApellido");//
    //Toma los valores de las cajas de texto, sin validaciones
    objetoCuenta.numeroCuenta=cuenta;
    objetoCuenta.cedula=cedula;
    objetoCuenta.nombre=nombre;//apellido
    objetoCuenta.apellido=apellido;
    objetoCuenta.saldo=0.0;
    //Crea un objeto cuenta y agrega los atributos con los valores de las cajas respectivas
    agregarCuenta(objetoCuenta);
    //Invoca a agregarCuenta
    mostrarCuentas();
    //Invoca a mostrarCuentas
}
