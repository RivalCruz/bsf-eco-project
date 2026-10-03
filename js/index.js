// --- CAROUSEL DATA ---
const carouselSlides = [
  { img: "images/carousel1.png", alt: "BSF Composting Facility" },
  { img: "images/carousel2.png", alt: "BSF Larvae" },
  { img: "images/carousel3.png", alt: "Nutrient-rich frass" },
];

// --- ABOUT US CAROUSEL DATA ---
const aboutSlides = [
  { img: "images/team1.png" },
  { img: "images/team2.png" },
  // { img: "images/team3.png", alt: "Waste Management" },
];

// --- FLIP CARD DATA ---
const lifeCycleSteps = [
  {
    num: 1,
    title: "Mating & Eggs",
    img: "images/eggs.png",
    alt: "Eggs",
    desc: "After 2-3 days, mating occurs. Females lay 200-800 eggs, which hatch in 2-4 days.",
  },
  {
    num: 2,
    title: "Larval Stages",
    img: "images/larvae.png",
    alt: "Larvae",
    desc: "Taking 10 to 30 days, larvae consume organic waste at amazing speeds, converting it to protein and fat.",
  },
  {
    num: 3,
    title: "Prepupae",
    img: "images/prepupae.png",
    alt: "Prepupae",
    desc: "After finishing feeding, they transition into prepupae for roughly 7 days to prepare for pupation.",
  },
  {
    num: 4,
    title: "Pupae",
    img: "images/pupae.png",
    alt: "Pupae",
    desc: "For about 10 days, they stop eating completely and turn into hard-shelled pupae.",
  },
  {
    num: 5,
    title: "Adult Fly",
    img: "images/adult.png",
    alt: "Adult Fly",
    desc: "Pupae emerge as adult flies that do not bite or sting. The cycle repeats!",
  },
];

// Function to generate the Carousel
function renderCarousel() {
  const indicatorsContainer = document.getElementById(
    "carousel-indicators-container",
  );
  const innerContainer = document.getElementById("carousel-inner-container");

  if (!indicatorsContainer || !innerContainer) return;

  let indicatorsHTML = "";
  let itemsHTML = "";

  carouselSlides.forEach((slide, index) => {
    // The first item needs the 'active' class to show up on load
    const isActive = index === 0 ? "active" : "";

    indicatorsHTML += `
      <button type="button" data-bs-target="#bsfCarousel" data-bs-slide-to="${index}" class="${isActive}"></button>
    `;

    itemsHTML += `
      <div class="carousel-item ${isActive}">
        <img src="${slide.img}" class="d-block w-100" alt="${slide.alt}" />
      </div>
    `;
  });

  indicatorsContainer.innerHTML = indicatorsHTML;
  innerContainer.innerHTML = itemsHTML;
}

// Function to generate the Flip Cards
function renderFlipCards() {
  const container = document.getElementById("flip-card-container");
  if (!container) return;

  let cardsHTML = "";

  lifeCycleSteps.forEach((step) => {
    cardsHTML += `
      <div class="flip-card" onclick="this.classList.toggle('flipped')">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <div class="step-number">${step.num}</div>
            <h5 class="font-display">${step.title}</h5>
            <img src="${step.img}" alt="${step.alt}" />
            <span class="click-hint">👆 Click to flip</span>
          </div>
          <div class="flip-card-back">
            <h5 class="font-display mb-3">${step.num}. ${step.title}</h5>
            <p>${step.desc}</p>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = cardsHTML;
}

// Function to generate the About Us Carousel
function renderAboutCarousel() {
  const indicatorsContainer = document.getElementById(
    "about-indicators-container",
  );
  const innerContainer = document.getElementById("about-inner-container");

  if (!indicatorsContainer || !innerContainer) return;

  let indicatorsHTML = "";
  let itemsHTML = "";

  aboutSlides.forEach((slide, index) => {
    const isActive = index === 0 ? "active" : "";

    indicatorsHTML += `
      <button type="button" data-bs-target="#aboutCarousel" data-bs-slide-to="${index}" class="${isActive}"></button>
    `;

    itemsHTML += `
      <div class="carousel-item ${isActive} h-100">
        <img src="${slide.img}" class="d-block w-100 h-100" style="object-fit: cover;" alt="${slide.alt}" />
      </div>
    `;
  });

  indicatorsContainer.innerHTML = indicatorsHTML;
  innerContainer.innerHTML = itemsHTML;
}

// Run both functions when the page loads
window.addEventListener("DOMContentLoaded", () => {
  renderCarousel();
  renderFlipCards();
  renderAboutCarousel();
});
