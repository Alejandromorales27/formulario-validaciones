export function valida(input){
    const tipoInput = input.dataset.tipo
    if(validadores[tipoInput]){
        validadores[tipoInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML="";
    }else{
        input.parentElement.classList.add("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").
        innerHTML= mostrarMensajeDeError(tipoInput,input)
    }
}

const tipoErrores=[
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

const mensajeDelError={
    nombre:{
        valueMissing: "Este campo no puede estar vacio"
    },
    email:{
        valueMissing: "Este campo no puede estar vacio",
        typeMismatch:"el correo no es valido"
    },
    password:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch:"Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
    },
    nacimiento:{
        valueMissing: "Este campo no puede estar vacio",
        customError:"debes tener al menos 18 años de edad"
    },

    numero:{
        valueMissing:"Este campo no puede estar vacio",
        patternMismatch:"El formato requerido es xxxxxxxxxx 10 numeros"
    },

    direccion:{
        valueMissing:"Este campo no puede estar vacio",
        patternMismatch:"Este campo de tener por lo menos 10 caracteres y maximo 40"
    },

    ciudad:{
        valueMissing:"Este campo no puede estar vacio",
        patternMismatch:"Este campo de tener por lo menos 10 caracteres y maximo 40"
    },

    estado:{
        valueMissing:"Este campo no puede estar vacio",
        patternMismatch:"Este campo de tener por lo menos 10 caracteres y maximo 40"
    }

}


const validadores= {
    nacimiento: input => validarNacimiento(input)
}

function mostrarMensajeDeError(tipoInput, input) {
    let mensaje = "";
    tipoErrores.forEach((error) => {
      if (input.validity[error]) {
        console.log(tipoInput, error);
        console.log(input.validity[error]);
        console.log(mensajeDelError[tipoInput][error]);
        mensaje = mensajeDelError[tipoInput][error];
      }
    });


    return mensaje

}

function validarNacimiento(input){
    const fechaCliente= new Date (input.value)
    let mensaje="";
    if(!mayorEdad(fechaCliente)){
        mensaje="debes tener al menos 18 años de edad"
    }
    input.setCustomValidity(mensaje);

    
}

function mayorEdad(fecha){
     const fechaActual = new Date();
     const diferenciaFechas= new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate())
     
     return diferenciaFechas<fechaActual;
     
} 

