window.onload = function() {
    const canvas = document.getElementById('miCanvas');
    const ctx = canvas.getContext('2d');

    // Configurar el tamaño del canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Reproducir el audio
    const audio = document.getElementById('audio');
    audio.play(); // Iniciar la reproducción del audio

    const colores = ['#FF6347', '#FFD700', '#ADFF2F', '#00BFFF', '#EE82EE'];

    const mensajes = [
        '',
        '¡Feliz Cumpleaños, Amor mío!',
        '¡Eres Mi Todo.!',
        'Te Amo, Hoy y Siempre.',
        'Eres Mi Alegría.',
        'Eres Única.',
        '¡Eres Especial.!',
        'Amo Tu Risa.',
        '¡Te Amo a Mi Manera!',
        '¡Eres Mi Luz.!',
        '¡Te Quiero, Hoy, Mañana y siempre.!'
    ]; // Mensajes diferentes
    let mensajeActualIndex = 0; // Índice del mensaje actual
    let letras = mensajes[mensajeActualIndex].split(''); // Dividir el mensaje en letras individuales
    const posicionesLetras = []; // Guardar las posiciones iniciales de las letras
    const alphaLetras = Array(letras.length).fill(1); // Opacidad inicial de las letras

    // Lista de imágenes para el fondo
    const imagenes = [
        '/image/img1.jpg',
        '/image/img2.jpg',
        '/image/img3.jpg',
        '/image/img4.jpg',
        '/image/img5.jpg',
        '/image/img6.jpg',
        '/image/img7.jpg',
        '/image/img8.jpg'
    ];
    let imgIndex = 0;
    let fondo = new Image();
    fondo.src = imagenes[imgIndex];

    // Cambiar imagen de fondo cada 10 segundos
    setInterval(() => {
        imgIndex = (imgIndex + 1) % imagenes.length;
        fondo.src = imagenes[imgIndex];
    }, 10000);

    // Determinar las posiciones iniciales de las letras
    function actualizarPosicionesLetras() {
        const letraInicioY = canvas.height / 2; // Centrado verticalmente
        const espacioEntreLetras = canvas.width / (letras.length + 1);
        posicionesLetras.length = 0; // Limpiar posiciones anteriores
        for (let i = 0; i < letras.length; i++) {
            posicionesLetras.push({
                x: espacioEntreLetras * (i + 1), // Espaciar las letras uniformemente
                y: letraInicioY,
                letra: letras[i]
            });
        }
    }

    // Cambiar mensaje y letras
    function cambiarMensaje() {
        mensajeActualIndex = (mensajeActualIndex + 1) % mensajes.length; // Cambiar al siguiente mensaje
        letras = mensajes[mensajeActualIndex].split(''); // Dividir el nuevo mensaje en letras individuales
        alphaLetras.length = letras.length; // Ajustar la longitud de alphaLetras
        alphaLetras.fill(1); // Reiniciar opacidad
        actualizarPosicionesLetras(); // Actualizar posiciones
    }

    // Cambiar mensaje cada 10 segundos
    setInterval(cambiarMensaje, 10000); // Cambia cada 10000 milisegundos (10 segundos)

    // Crear globos flotantes
    const globos = [];
    const NUM_GLOBOS = 8; // Número de globos

    function crearGlobos() {
        for (let i = 0; i < NUM_GLOBOS; i++) {
            globos.push({
                x: Math.random() * canvas.width, // Posición aleatoria en x
                y: canvas.height + Math.random() * 100, // Comenzar fuera del canvas
                radio: Math.random() * 20 + 20, // Tamaño del globo
                velocidad: Math.random() * 0.9 + 0.5, // Reducir la velocidad aleatoria (ahora entre 0.5 y 1.5)
                color: colores[Math.floor(Math.random() * colores.length)], // Color aleatorio
            });
        }
    }

    crearGlobos(); // Inicializar globos

    function dibujarGlobo(globo) {
        ctx.beginPath();
        ctx.ellipse(globo.x, globo.y, globo.radio * 0.9, globo.radio, Math.PI / 2, 0, Math.PI * 2); // Hacer el globo ovalado
        ctx.fillStyle = globo.color;
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.stroke();

        // Dibujar cuerda del globo
        ctx.beginPath();
        ctx.moveTo(globo.x, globo.y + globo.radio); // Comienza en la parte inferior del globo
        ctx.lineTo(globo.x, globo.y + globo.radio + 40); // Línea para la cuerda
        ctx.strokeStyle = 'brown'; // Color de la cuerda
        ctx.lineWidth = 2; // Grosor de la cuerda
        ctx.stroke();
    }

    function dibujar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.8; // Aumentar la opacidad de la imagen de fondo

        // Ajustar la imagen al tamaño del canvas manteniendo la proporción
        let imgAspectRatio = fondo.width / fondo.height;
        let canvasAspectRatio = canvas.width / canvas.height;

        let renderWidth, renderHeight;
        if (imgAspectRatio > canvasAspectRatio) {
            renderWidth = canvas.width; // Ajustar el ancho al del canvas
            renderHeight = renderWidth / imgAspectRatio; // Calcular la altura manteniendo la proporción
        } else {
            renderHeight = canvas.height; // Ajustar la altura al del canvas
            renderWidth = renderHeight * imgAspectRatio; // Calcular el ancho manteniendo la proporción
        }

        // Limitar el tamaño de la imagen de fondo
        if (renderWidth > 500) { // Ajusta el valor a tu preferencia
            renderWidth = 500;
            renderHeight = renderWidth / imgAspectRatio; // Recalcular la altura
        }
        if (renderHeight > 500) { // Ajusta el valor a tu preferencia
            renderHeight = 500;
            renderWidth = renderHeight * imgAspectRatio; // Recalcular el ancho
        }

        // Centrar la imagen en el canvas
        let xOffset = (canvas.width - renderWidth) / 2;
        let yOffset = (canvas.height - renderHeight) / 2;

        ctx.drawImage(fondo, xOffset, yOffset, renderWidth, renderHeight);

        // Dibujar letras en sus posiciones iniciales
        posicionesLetras.forEach((pos, index) => {
            ctx.globalAlpha = alphaLetras[index]; // Aplicar opacidad de cada letra
            ctx.font = '48px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.shadowColor = 'black'; // Color de la sombra
            ctx.shadowOffsetX = 2; // Desplazamiento en el eje X
            ctx.shadowOffsetY = 2; // Desplazamiento en el eje Y
            ctx.shadowBlur = 5; // Desenfoque de la sombra
            ctx.strokeStyle = 'black'; // Color del borde
            ctx.lineWidth = 2; // Grosor del borde
            ctx.strokeText(pos.letra, pos.x, pos.y); // Dibujar borde
            ctx.fillText(pos.letra, pos.x, pos.y); // Dibujar texto

            // Desvanecer la letra progresivamente
            if (alphaLetras[index] > 0) {
                alphaLetras[index] -= 0.01; // Ajustar la velocidad de desvanecimiento
            }
        });

        // Restablecer opacidad para el texto
        ctx.globalAlpha = 1;

        // Dibujar globos
        globos.forEach((globo) => {
            dibujarGlobo(globo); // Llamar a la función para dibujar un globo
            // Actualizar posición del globo
            globo.y -= globo.velocidad; // Los globos se elevan

            // Reiniciar la posición del globo si sale de la parte superior
            if (globo.y + globo.radio < 0) {
                globo.y = canvas.height + Math.random() * 100; // Reiniciar en la parte inferior
                globo.x = Math.random() * canvas.width; // Nueva posición aleatoria en x
            }
        });

        // Llamar a la función de dibujo de nuevo
        requestAnimationFrame(dibujar);
    }

    // Iniciar el bucle de dibujo
    dibujar();
};
