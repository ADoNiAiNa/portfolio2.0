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


/*************************page projets**************************************** */
// --- 3. SYSTÈME DE FILTRE ET RECHERCHE (PAGE PROJETS) ---

const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('project-search');
const projectCards = document.querySelectorAll('.project-card');

function filterProjects() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || "all";

    projectCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const category = card.dataset.category;
        
        const matchesSearch = title.includes(searchTerm);
        const matchesFilter = activeFilter === "all" || category === activeFilter;

        if (matchesSearch && matchesFilter) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

// Écouteur pour les boutons de filtre
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        filterProjects();
    });
});

// Écouteur pour la recherche
if (searchInput) {
    searchInput.addEventListener('input', filterProjects);
}


/**art galerie ***********************************/
const gallery = document.getElementById('gallery');
    const photos = document.querySelectorAll('.photo');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalText = document.getElementById('modal-text');
    const close = document.getElementById('close');

    let dispersed = false;

    // Disperser les photos au hover
    gallery.addEventListener('mouseenter', () => {
      if (dispersed) return;
      dispersed = true;

      photos.forEach((photo, index) => {
        const x = (index % 2) * 50 + Math.random() * 40;
        const y = Math.floor(index / 2) * 40 + Math.random() * 30;

        photo.style.top = `${y}%`;
        photo.style.left = `${x}%`;
        photo.style.transform = 'rotate(0deg)';
      });
    });

    // Ouvrir la modal
    photos.forEach(photo => {
      photo.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = photo.src;
        modalText.textContent = photo.dataset.text;
      });
    });

    // Fermer la modal
    close.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });