/* 
  ELEMENTOS EDITABLES FÁCILMENTE:
  - Fecha objetivo de la cuenta regresiva: Modificable en la variable 'eventDate'.
  - Comportamiento del reproductor de audio ambiental y transición de la portada al contenido principal.
*/

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Lógica del Reproductor de Música y Portada ---
    const portadaSection = document.getElementById('portada');
    const mainContent = document.getElementById('main-content');
    const openButton = document.getElementById('open-invitation');
    const bgMusic = document.getElementById('bg-music');
    const musicToggleBtn = document.getElementById('music-toggle');
    const musicTooltip = musicToggleBtn.querySelector('.music-tooltip');

    let isPlaying = false;

    // Configurar volumen inicial moderado
    bgMusic.volume = 0.4;

    openButton.addEventListener('click', () => {
        // Ocultar portada con transición suave y mostrar contenido
        portadaSection.style.opacity = '0';
        portadaSection.style.transition = 'opacity 0.6s ease';
        
        setTimeout(() => {
            portadaSection.classList.add('hidden');
            mainContent.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 600);

        // Intentar reproducir la música de fondo
        bgMusic.play().then(() => {
            isPlaying = true;
            musicToggleBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            musicTooltip.textContent = 'Pausar música';
        }).catch(error => {
            console.log("Reproducción automática bloqueada por el navegador:", error);
            isPlaying = false;
            musicToggleBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
            musicTooltip.textContent = 'Reproducir música';
        });
    });

    // Control manual del botón flotante de música
    musicToggleBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            isPlaying = false;
            musicToggleBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
            musicTooltip.textContent = 'Reproducir música';
        } else {
            bgMusic.play().then(() => {
                isPlaying = true;
                musicToggleBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
                musicTooltip.textContent = 'Pausar música';
            }).catch(error => {
                console.log("No se pudo reproducir el audio:", error);
            });
        }
    });

    // --- 2. Lógica de la Cuenta Regresiva ---
    // Fecha objetivo: Domingo 27 de diciembre de 2026 a las 15:45:00
    const eventDate = new Date('December 27, 2026 15:45:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');

        if (distance < 0) {
            if (daysElement) daysElement.textContent = '00';
            if (hoursElement) hoursElement.textContent = '00';
            if (minutesElement) minutesElement.textContent = '00';
            if (secondsElement) secondsElement.textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (daysElement) daysElement.textContent = String(days).padStart(2, '0');
        if (hoursElement) hoursElement.textContent = String(hours).padStart(2, '0');
        if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, '0');
        if (secondsElement) secondsElement.textContent = String(seconds).padStart(2, '0');
    }

    // Actualizar cada segundo
    setInterval(updateCountdown, 1000);
    updateCountdown();
});

/* --- Generador de Brillos / Partículas Discretas (Optimizado) --- */
function initSparkles() {
    const container = document.createElement('div');
    container.className = 'sparkles-container';
    document.body.appendChild(container);

    const numSparkles = 25; // Cantidad para mantener el toque elegante

    for (let i = 0; i < numSparkles; i++) {
        createSparkle(container, true);
    }
}

function createSparkle(container, isInitialLoad = false) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';

    // Tamaño discreto (entre 3px y 7px)
    const size = Math.random() * 4 + 3;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;

    // Posición horizontal aleatoria
    sparkle.style.left = `${Math.random() * 100}vw`;

    // Duración de caída lenta y elegante (entre 8 y 15 segundos)
    const duration = Math.random() * 7 + 8;
    sparkle.style.animationDuration = `${duration}s`;

    if (isInitialLoad) {
        // Al cargar, se distribuyen aleatoriamente en pantalla pero con un retraso 
        // negativo aleatorio para que ya vengan cayendo desde arriba de manera fluida.
        const randomDelay = -Math.random() * duration;
        sparkle.style.animationDelay = `${randomDelay}s`;
        sparkle.style.top = `${Math.random() * 100}vh`;
    } else {
        // Los nuevos brillos siempre empiezan justo arriba de la pantalla de forma invisible
        sparkle.style.top = `-20px`;
        sparkle.style.animationDelay = `0s`;
    }

    container.appendChild(sparkle);

    // Al terminar su ciclo de animación, se elimina y se regenera arriba
    setTimeout(() => {
        sparkle.remove();
        createSparkle(container, false);
    }, duration * 1000);
}

// Inicializar los brillos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    initSparkles();
});