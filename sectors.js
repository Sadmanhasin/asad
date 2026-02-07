const buttons = document.querySelectorAll(".sector-button");
const cards = document.querySelectorAll(".card");
const backToTopButton = document.querySelector(".back-to-top");

const setActiveSector = (sector) => {
  buttons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.sector === sector);
  });
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const sector = button.dataset.sector;
    const targetCard = document.getElementById(sector)
      || document.querySelector(`.card[data-sector="${sector}"]`);

    if (targetCard) {
      targetCard.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSector(sector);
    }
  });
});

if (buttons.length) {
  setActiveSector(buttons[0].dataset.sector);
}

const cardList = Array.from(cards);
let isTicking = false;

const updateActiveByScroll = () => {
  const viewportCenter = window.innerHeight * 0.4;
  let closestCard = null;
  let closestDistance = Number.POSITIVE_INFINITY;

  cardList.forEach((card) => {
    const rect = card.getBoundingClientRect();

    if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
      return;
    }

    const cardCenter = rect.top + rect.height / 2;
    const distance = Math.abs(cardCenter - viewportCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestCard = card;
    }
  });

  if (closestCard && closestCard.dataset.sector) {
    setActiveSector(closestCard.dataset.sector);
  }
};

const onScroll = () => {
  if (!isTicking) {
    window.requestAnimationFrame(() => {
      updateActiveByScroll();
      isTicking = false;
    });
    isTicking = true;
  }
};

const toggleBackToTop = () => {
  if (!backToTopButton) {
    return;
  }

  if (window.scrollY > 300) {
    backToTopButton.classList.add("is-visible");
  } else {
    backToTopButton.classList.remove("is-visible");
  }
};

const onPageScroll = () => {
  onScroll();
  toggleBackToTop();
};

window.addEventListener("scroll", onPageScroll);
window.addEventListener("resize", onPageScroll);
onPageScroll();

if (backToTopButton) {
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
