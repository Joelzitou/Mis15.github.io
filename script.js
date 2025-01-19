var currentImageIndex = 0; // Índice de la imagen actual
var clickCount = 0; // Contador de clics

// Array de imágenes
var images = [
    'Images/SAM_0001.JPG', 'Images/SAM_0002.JPG', 'Images/SAM_0003.JPG', 
    'Images/SAM_0004.JPG', 'Images/SAM_0005.JPG', 'Images/SAM_0006.JPG', 
    'Images/SAM_0007.JPG', 'Images/SAM_0008.JPG', 'Images/SAM_0009.JPG', 
    'Images/SAM_0010.JPG', 'Images/SAM_0011.JPG', 'Images/SAM_0012.JPG', 
    'Images/SAM_0013.JPG', 'Images/SAM_0014.JPG', 'Images/SAM_0015.JPG', 
    'Images/SAM_0016.JPG', 'Images/SAM_0017.JPG', 'Images/SAM_0018.JPG', 
    'Images/SAM_0019.JPG', 'Images/SAM_0020.JPG', 'Images/SAM_0021.JPG', 
    'Images/SAM_0022.JPG', 'Images/SAM_0023.JPG', 'Images/SAM_0024.JPG', 
    'Images/SAM_0025.JPG'
];

// Función para abrir el modal y mostrar la imagen ampliada
function openModal(imageSrc) {
    var modal = document.getElementById("modal");
    var modalImg = document.getElementById("modalImg");

    modal.style.display = "flex"; // Muestra el modal
    modalImg.src = imageSrc; // Cambia la imagen del modal
    currentImageIndex = images.indexOf(imageSrc); // Establece el índice de la imagen actual

    // Resetea el zoom al abrir una nueva imagen
    modalImg.style.transform = 'scale(1)'; // Resetea la escala al abrir la imagen
    modalImg.style.transition = 'transform 0.2s'; // Añadir una transición suave

    // Reproducir música después de un primer o segundo clic en la imagen
    clickCount++;

    if (clickCount === 2) {  // Reproducir la música solo después del segundo clic
        var music = document.getElementById("background-music");
        music.play();  // Reproduce la música
        music.volume = 0.5;  // Ajusta el volumen (0.0 a 1.0)
    }

    // Añadir el event listener para el zoom con la rueda del ratón
    modalImg.addEventListener('wheel', function(event) {
        if (event.deltaY < 0) {
            zoomIn();
        } else {
            zoomOut();
        }
    });
}

// Función para cerrar el modal
function closeModal(event) {
    // Solo cerramos el modal si se hace clic en el fondo o en el botón de cierre
    if (event.target === event.currentTarget || event.target.classList.contains("close")) {
        var modal = document.getElementById("modal");
        modal.style.display = "none"; // Ocultamos el modal

        // Eliminar el event listener cuando el modal se cierra
        var modalImg = document.getElementById("modalImg");
        modalImg.removeEventListener('wheel', function(event) {
            if (event.deltaY < 0) {
                zoomIn();
            } else {
                zoomOut();
            }
        });
    }
}

// Función para cambiar la imagen (izquierda/derecha)
function changeImage(direction) {
    currentImageIndex += direction;

    // Si estamos al final, volvemos al principio o viceversa
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }

    // Cambiamos la imagen
    var modalImg = document.getElementById("modalImg");
    modalImg.src = images[currentImageIndex];
}

// Función para hacer zoom en la imagen (acercar)
function zoomIn() {
    var modalImg = document.getElementById("modalImg");
    var currentScale = getComputedStyle(modalImg).transform.match(/matrix\(([^,]+)/); // Obtener escala actual

    currentScale = currentScale ? parseFloat(currentScale[1]) : 1; // Si no existe la escala, establecerla como 1

    // Aumentar la escala de la imagen
    modalImg.style.transform = `scale(${currentScale * 1.1})`;
}

// Función para hacer zoom en la imagen (alejar)
function zoomOut() {
    var modalImg = document.getElementById("modalImg");
    var currentScale = getComputedStyle(modalImg).transform.match(/matrix\(([^,]+)/); // Obtener escala actual

    currentScale = currentScale ? parseFloat(currentScale[1]) : 1; // Si no existe la escala, establecerla como 1

    // Reducir la escala de la imagen
    modalImg.style.transform = `scale(${currentScale / 1.1})`;
}

// Espera a que la página esté completamente cargada
window.onload = function() {
    var music = document.getElementById("background-music");

    // Retraso de 1 segundo antes de reproducir la música
    setTimeout(function() {
        music.play();  // Reproduce la música después de 1 segundo
        music.volume = 0.5;  // Ajusta el volumen (0.0 a 1.0)
    }, 1000);  // Retraso de 1 segundo
};
