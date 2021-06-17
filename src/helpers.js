// Calcula la diferencia de años entre año actual y el año del formulario
export function obtenerDiferenciaYears(year){
    return new Date().getFullYear() - year;
}

// Calcula el total a pagar segun la marca
export function calcularMarca(marca){
    let incremento;

    switch(marca){

        case 'europeo':
            incremento = 1.30;
            break;
        case 'americano':
            incremento = 1.15;
            break;
        case 'asiatico':
            incremento = 1.05;
            break;

        default:
            break;
        
    }
    return incremento;
}

// Calcular segun plan
export function calcularPlan(plan){
    let aumento;

    switch(plan){

        case 'basico':
            aumento = 1.20;
            break;
        case 'completo':
            aumento = 1.50;
            break;

        default:
            break;
    }
    return aumento;
}
// muestra Primera Letra Mayuscula
export function primeraMayuscula(texto){
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}