document.getElementById('sorteo-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener los datos del formulario
    const personasTexto = document.getElementById('personas').value;
    const cantidadGanadores = parseInt(document.getElementById('cantidad').value);

    // Procesar el listado de personas
    // Separar por líneas y luego por comas o espacios
    const personas = personasTexto
        .split(/\r?\n|\s*,\s*|\s+/) // Dividir por nuevas líneas, comas y espacios
        .map(persona => persona.trim()) // Eliminar espacios alrededor
        .filter(persona => persona !== ''); // Eliminar entradas vacías

    if (personas.length === 0) {
        alert('Por favor, introduce al menos una persona.');
        return;
    }

    if (isNaN(cantidadGanadores) || cantidadGanadores < 1 || cantidadGanadores > personas.length) {
        alert('Por favor, introduce un número válido de ganadores.');
        return;
    }

    // Función para seleccionar ganadores aleatorios
    function seleccionarGanadores(arr, num) {
        let seleccionados = [];
        let copia = [...arr];
        while (num > 0 && copia.length > 0) {
            const index = Math.floor(Math.random() * copia.length);
            seleccionados.push(copia.splice(index, 1)[0]);
            num--;
        }
        return seleccionados;
    }

    // Obtener los ganadores
    const ganadores = seleccionarGanadores(personas, cantidadGanadores);

    // Mostrar los ganadores
    const listaGanadores = document.getElementById('lista-ganadores');
    listaGanadores.innerHTML = '';
    ganadores.forEach(ganador => {
        const li = document.createElement('li');
        li.textContent = ganador;
        listaGanadores.appendChild(li);
    });
});
