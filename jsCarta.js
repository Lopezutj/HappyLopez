// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Obtener el botón y agregar un evento de clic
    var leerCartaBtn = document.getElementById("leerCartaBtn");
    leerCartaBtn.addEventListener("click", reproducirCancion);
});

function reproducirCancion() {
    var audio = document.getElementById("audio");
    audio.play();
    // Redirigir a la carta después de un breve retraso
    setTimeout(function() {
        window.location.href = '/Canvas/html/carta.html';
    }, 1000); // Retraso de 1 segundo para que la canción comience a sonar
}
