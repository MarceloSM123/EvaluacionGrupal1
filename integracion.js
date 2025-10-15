cuentas = [
    { numeroCuenta: "02234567", cedula: "1714616123", nombre: "Juan", apellido: "Perez", saldo: 0.0 },
    { numeroCuenta: "02345211", cedula: "1281238233", nombre: "Felipe", apellido: "Caicedo", saldo: 0.0 }
]

movimientos = [
    { numeroCuenta: "02234567", monto: 10.24, tipo: "D" },
    { numeroCuenta: "02345211", monto: 45.90, tipo: "D" },
    { numeroCuenta: "02234567", monto: 65.23, tipo: "C" },
    { numeroCuenta: "02345211", monto: 65.23, tipo: "C" },
    { numeroCuenta: "02345211", monto: 12.0, tipo: "D" },
]


cargar = function () {
    mostrarComponente("divCuentas");
    ocultarComponente("divTransacciones");
    ocultarComponente("divMovimientos");
    mostrarCuentas(); 
}

mostrarSeccion = function (idSeccion) {
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");
    ocultarComponente("divMovimientos");
    mostrarComponente(idSeccion);
    
    if (idSeccion === "divCuentas") {
        mostrarCuentas();
    } else if (idSeccion === "divTransacciones") {
        ocultarComponente("contenedorTransacciones");
    }
}


buscarCuenta = function (numeroCuenta) {
    let clienteEncontrado = null;
    for (let i = 0; i < cuentas.length; i++) {
        let elementoCliente = cuentas[i];
        if (elementoCliente.numeroCuenta == numeroCuenta) {
            clienteEncontrado = elementoCliente;
            break;
        }
    }
    return clienteEncontrado;
}


mostrarCuentas = function () {
    let objetoPersona = {};
    let tabla = "<table><tr><th> NUMERO CUENTA </th><th> CEDULA </th><th> NOMBRE </th><th> APELLIDO </th><th> SALDO </th></tr>";
    for (let i = 0; i < cuentas.length; i++) {
        objetoPersona = cuentas[i];
        tabla += "<tr>" + "<td>" + objetoPersona.numeroCuenta + "</td>" +
            "<td>" + objetoPersona.cedula + "</td>" +
            "<td>" + objetoPersona.nombre + "</td>" +
            "<td>" + objetoPersona.apellido + "</td>" +
            "<td>" + objetoPersona.saldo + "</td>" + "</tr>";
    }

    tabla += "</table>";
    mostrarTextoHTML("tablaCuentas", tabla);
}


agregarCuenta = function (cuenta) {
    let cliente = buscarCuenta(cuenta.numeroCuenta);
    if (cliente == null) {
        alert(" CUENTA AGREGADA ");
        cuentas.push(cuenta);
    } else {
        alert(" CUENTA EXISTENTE ");
    }
}

agregar = function () {
    let objetoCuenta = {};
    let cedula = recuperarTexto("txtCedula");
    let cuenta = recuperarTexto("txtCuenta");
    let nombre = recuperarTexto("txtNombre");
    let apellido = recuperarTexto("txtApellido");

    if (!cedula || !cuenta || !nombre || !apellido) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    objetoCuenta.numeroCuenta = cuenta;
    objetoCuenta.cedula = cedula;
    objetoCuenta.nombre = nombre;
    objetoCuenta.apellido = apellido;
    objetoCuenta.saldo = 0.0;

    agregarCuenta(objetoCuenta);
    mostrarCuentas();
}


ejecutarBusqueda = function () {
    let valorCuenta = recuperarTexto("txtCajaCuentas");
    let cuenta = buscarCuenta(valorCuenta);
    if (cuenta == null) {
        alert("CLIENTE NO ENCONTRADO")
        ocultarComponente("contenedorTransacciones");
    } else {
        mostrarComponente("contenedorTransacciones");
        mostrarTablaTransacciones();
    }
}

mostrarTablaTransacciones = function () {
    let numCuenta = recuperarTexto("txtCajaCuentas");
    let cuenta = buscarCuenta(numCuenta);
    
    if (cuenta) {
        let cmpTabla = document.getElementById("divTabla");
        let contenidoTabla = "<table><tr>" +
            "<th>NUMERO DE CUENTA</th>" +
            "<th>CEDULA</th>" +
            "<th>NOMBRE</th>" +
            "<th>APELLIDO</th>" +
            "<th>SALDO</th>" +
            "</tr>";

        contenidoTabla +=
            "<tr><td>" + cuenta.numeroCuenta + "</td>"
            + "<td>" + cuenta.cedula + "</td>"
            + "<td>" + cuenta.nombre + "</td>"
            + "<td>" + cuenta.apellido + "</td>"
            + "<td>" + cuenta.saldo.toFixed(2) + "</td>"
            + "</tr>"
        
        contenidoTabla += "</table>"
        cmpTabla.innerHTML = contenidoTabla;
    }
}


depositar = function (numeroCuenta, monto) {
    let cuentaAfectada = buscarCuenta(numeroCuenta);
    cuentaAfectada.saldo += monto;
    
    let nuevoMovimiento = {
        numeroCuenta: numeroCuenta,
        monto: monto,
        tipo: "C" 
    };
    movimientos.push(nuevoMovimiento);
}

ejecutarDeposito = function () {
    let numCuenta = recuperarTexto("txtCajaCuentas");
    let monto = recuperarFloat("txtMonto");

    if (!numCuenta || !monto || monto <= 0) {
        alert("Ingrese un número de cuenta y un monto válido.");
        return;
    }

    if (buscarCuenta(numCuenta) == null) {
        alert("Cuenta no encontrada.");
        return;
    }

    depositar(numCuenta, monto);
    alert("TRANSACCION EXITOSA");
    mostrarTablaTransacciones(); 
}

retirar = function (numeroCuenta, monto) {
    let cuentaAfectada = buscarCuenta(numeroCuenta);
    cuentaAfectada.saldo -= monto;
    
    let nuevoMovimiento = {
        numeroCuenta: numeroCuenta,
        monto: monto,
        tipo: "D" 
    };
    movimientos.push(nuevoMovimiento);
}

ejecutarRetiro = function () {
    let numCuenta = recuperarTexto("txtCajaCuentas");
    let monto = recuperarFloat("txtMonto");
    
    if (!numCuenta || !monto || monto <= 0) {
        alert("Ingrese un número de cuenta y un monto válido.");
        return;
    }

    let cuentaAfectada = buscarCuenta(numCuenta);
    
    if (cuentaAfectada == null) {
        alert("Cuenta no encontrada.");
        return;
    }

    if (cuentaAfectada.saldo < monto) {
        alert("SALDO INSUFICIENTE")
    } else {
        retirar(numCuenta, monto)
        alert("TRANSACCION EXITOSA")
        mostrarTablaTransacciones(); 
    }
}


filtrarMovimientos = function (numeroCuenta) {
    let movimientosCuenta = [];

    for (let i = 0; i < movimientos.length; i++) {
        if (movimientos[i].numeroCuenta === numeroCuenta) {
            movimientosCuenta.push(movimientos[i]);
        }
    }
    mostrarMovimientos(movimientosCuenta);
}

mostrarMovimientos = function (misMovimientos) {
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

    mostrarTextoHTML("tablaMovimientos", tablaHTML); 
}

buscarMovimientos = function () {

    let numeroCuenta = recuperarTexto("txtNumeroCuentaMov"); 

    if (numeroCuenta) {
        filtrarMovimientos(numeroCuenta);
    } else {
        alert("Por favor, ingrese un numero de cuenta.");
    }
}