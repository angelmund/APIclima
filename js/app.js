//obtener en donde se van a mostrar los resultados de la consulta a la API y para validar datos 
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

//al cargar la páfina, y al hacer click en el btón se manda a llamar buscarClima
window.addEventListener('load', (e) => {
    formulario.addEventListener('submit', buscarClima);
})

//verica si los campos son vacios
function buscarClima(e) {
    e.preventDefault();
    //validar formulario y obtener los valores de los campos del formulario 
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;
    // console.table(ciudad, pais);

    if (ciudad == '' || pais == '') {
        //Mostrar error
        MostrarError('Los campos son obligatorios');
        return;
    }
    //llamar function de consultar API y pasat dos parametros 
    consultarApi(ciudad, pais);
}

//mostrar mensaje de error
function MostrarError(mensaje) {
    //seleccionar componente
    const alerta = document.querySelector('.bg-red-100')

    //vlidar si la alerta es diferente de vacio paa mostrar 
    if (!alerta) {
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-auto', 'mt-7', 'text-center');

        //Insertar HTML
        alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
    `;
        container.appendChild(alerta);
        //bORAR ALERTA
        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }

}

//consulatar API
function consultarApi(ciudad, pais) {
    //id de la API de clima 
    const appId = 'ad8ebd903d1a2cd2d0cc765dd0fde2d0';

    //yrl para dar la ciudad y el pais 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    // console.log(url);

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHTML(); //limpiar el resultado 
            if (datos.cod == "404") {
                MostrarError('Ciudad no encontrada');
                return;
            }

            //mostrar datos de temperatura
            mostrarClima(datos);
        });
}

//Muestra los datos en la vista 
function mostrarClima(datos) {
    const { main: { temp, temp_max, temp_min } } = datos;
    //273.15 son grados kelvin
    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const actual = document.createElement('p');
    actual.innerHTML = `<SPAN>Temperatura:</SPAN> ${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    
    const tempMax = document.createElement('p');
    tempMax.innerHTML = `<SPAN>Máxima:</SPAN> ${max} &#8451;`;
    tempMax.classList.add('text-xl');

    const tempMin = document.createElement('p');
    tempMin.innerHTML = `<SPAN>Mínima:</SPAN> ${min} &#8451`;
    tempMin.classList.add('text-xl');


    const resultadoDIV = document.createElement('div');
    resultadoDIV.classList.add('text-center', 'text-white');
    resultadoDIV.appendChild(actual);
    resultadoDIV.appendChild(tempMax);
    resultadoDIV.appendChild(tempMin);
    
    resultado.appendChild(resultadoDIV);

}

//arrow function para mostrar los grados en entero, un helper, hace una entrada y slaida de datos
const kelvinACentigrados = grados => parseInt(grados - 273.15);{
}

//limpiar datos de lo que haya consultado
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}