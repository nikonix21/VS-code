document.addEventListener('DOMContentLoaded', () => {
    const contenedores = document.querySelectorAll('.media-container');

    contenedores.forEach(contenedor => {
        contenedor.addEventListener('click', () => {
            contenedor.classList.toggle('revelado');
        });
    });
});