// Gestion du curseur personnalisé
const cursor = document.getElementById("cursor");
const interactives = document.querySelectorAll(".interactive");

// Mettre à jour la position du curseur
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Ajouter l'effet de survol sur les éléments cliquables
interactives.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("hovered");
  });
  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("hovered");
  });
});

// Gérer le curseur qui quitte l'écran
document.addEventListener("mouseout", () => {
  cursor.style.display = "none";
});
document.addEventListener("mouseover", () => {
  cursor.style.display = "block";
});


/*************************page projets**************************************** */
// --- 3. SYSTÈME DE FILTRE ET RECHERCHE (PAGE PROJETS) ---

const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("project-search");
const projectCards = document.querySelectorAll(".project-card");

function filterProjects() {
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
  const activeFilter =
    document.querySelector(".filter-btn.active")?.dataset.filter || "all";

  projectCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
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
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");
    filterProjects();
  });
});

// Écouteur pour la recherche
if (searchInput) {
  searchInput.addEventListener("input", filterProjects);
}

/**art galerie ***********************************/

// --- GALERIE : FILTRES ET FENÊTRE CONTEXTUELLE ---

const filterBtns = document.querySelectorAll('.filter-btn');
const gridItems = document.querySelectorAll('.grid-item');

const modal = document.getElementById('gallery-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalVisual = document.getElementById('modal-visual-content');
const modalTitle = document.getElementById('modal-title');
const modalClient = document.getElementById('modal-client');
const modalDesc = document.getElementById('modal-desc');

// 1. Système de Filtres
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Gérer la classe active sur les boutons
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');

        const filterValue = btn.dataset.filter;

        // Afficher/Masquer les éléments
        gridItems.forEach(item => {
            if (filterValue === 'all' || item.dataset.category === filterValue) {
                item.style.display = 'block';
                // Petite animation de réapparition
                item.style.animation = 'none';
                item.offsetHeight; /* trigger reflow */
                item.style.animation = null; 
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// 2. Ouverture de la Fenêtre Contextuelle
gridItems.forEach(item => {
    item.addEventListener('click', () => {
        // Récupérer les données de l'élément cliqué
        const title = item.dataset.title;
        const client = item.dataset.client;
        const desc = item.dataset.desc;
        const visualContent = item.querySelector('.item-visual').innerHTML;

        // Injecter les données dans la modale
        modalTitle.textContent = title;
        modalClient.textContent = client;
        modalDesc.textContent = desc;
        modalVisual.innerHTML = visualContent; // Copie le visuel (plus tard, tu mettras des balises <img>)

        // Afficher la modale
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Empêche de scroller la page en arrière-plan
    });
});

// 3. Fermeture de la Fenêtre Contextuelle
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Réactive le scroll
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

// Fermer en cliquant dans le vide (sur le fond flouté)
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

/***************************************** */

// --- MENU BURGER RESPONSIVE ---
const burgerMenu = document.getElementById('burger-menu');
const navLinks = document.getElementById('nav-links');

if (burgerMenu) {
  burgerMenu.addEventListener('click', () => {
    // Fait glisser le menu sur l'écran
    navLinks.classList.toggle('nav-active');
    
    // Anime le bouton burger en croix
    burgerMenu.classList.toggle('toggle');
    
    // Empêche le défilement de la page quand le menu est ouvert
    if (navLinks.classList.contains('nav-active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  });
}

// Optionnel mais recommandé : fermer le menu si on clique sur un lien
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('nav-active');
    burgerMenu.classList.remove('toggle');
    document.body.style.overflow = 'auto';
  });
});


// --- 5. ÉTUDE DE CAS : BARRE DE PROGRESSION & ANIMATION AU SCROLL ---

// A. Barre de progression de lecture
const progressBar = document.getElementById("reading-progress");

if (progressBar) {
  window.addEventListener("scroll", () => {
    // Calcule la hauteur totale scrollable
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    // Calcule le pourcentage scrollé
    const progressHeight = (window.scrollY / totalHeight) * 100;
    // Applique la largeur à la barre
    progressBar.style.width = progressHeight + "%";
  });
}

// B. Faire apparaître les éléments au scroll (Intersection Observer)
const faders = document.querySelectorAll(".fade-in-section");

const appearOptions = {
  threshold: 0.15, // L'élément apparaît quand 15% est visible à l'écran
  rootMargin: "0px 0px -50px 0px",
};

const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll,
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("is-visible");
      // Optionnel : arrêter d'observer une fois apparu
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});
