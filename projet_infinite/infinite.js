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
