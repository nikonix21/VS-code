const imgRosa = document.getElementById('img-rosa');
const imgCubo = document.getElementById('img-cubo');
const imgHabitar = document.getElementById('img-habitar');

if (imgRosa) {
    imgRosa.addEventListener('click', () => {
        imgRosa.classList.remove('animar-rosa');
        setTimeout(() => { imgRosa.classList.add('animar-rosa'); }, 10);
    });
}

if (imgCubo) {
    imgCubo.addEventListener('click', () => {
        imgCubo.classList.remove('animar-cubo');
        setTimeout(() => { imgCubo.classList.add('animar-cubo'); }, 10);
    });
}

if (imgHabitar) {
    imgHabitar.addEventListener('click', () => {
        imgHabitar.classList.contains('animar-habitar') 
            ? imgHabitar.classList.remove('animar-habitar') 
            : imgHabitar.classList.add('animar-habitar');
    });
}