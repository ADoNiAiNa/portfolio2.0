// --- 1. GESTION DU MODE SOMBRE/CLAIR ---
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Vérifier si l'utilisateur avait déjà choisi un thème
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
}

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Sauvegarder le choix
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// --- 2. EFFET TYPEWRITER (Machine à écrire) ---
const words = ["expériences UX.", "interfaces UI.", "émotions digitales.", "galeries virtuelles."];
const typewriterElement = document.getElementById('typewriter');
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        // Pause à la fin du mot
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Passage au mot suivant
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

// Lancer l'effet au chargement
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1500); // Attend que l'animation "PORTFOLIO" se termine
});