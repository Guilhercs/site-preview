document.addEventListener("DOMContentLoaded", function () {
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const toggleButtons = document.querySelectorAll(".btn-toggle");

  toggleButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const targetSelector = button.getAttribute("data-target");
      const contentElement = document.querySelector(targetSelector);

      if (contentElement.classList.contains("expanded")) {
        contentElement.classList.remove("expanded");
        button.textContent = "Expandir";
      } else {
        contentElement.classList.add("expanded");
        button.textContent = "Contrair";
      }
    });
  });
});

const slider = document.querySelector(".slider");
const leftButton = document.querySelector(".left-button");
const rightButton = document.querySelector(".right-button");
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let currentIndex = 0;
let slidesToShow = 3; // Valor padrão para o número de slides visíveis

// Ajusta o número de slides visíveis com base no tamanho da tela
function updateSlidesToShow() {
  const width = window.innerWidth;
  if (width <= 480) {
    slidesToShow = 1;
  } else if (width <= 768) {
    slidesToShow = 2;
  } else {
    slidesToShow = 3;
  }
}

// Inicializa o slider
function initSlider() {
  updateSlidesToShow();
  setPositionByIndex();
}

// Eventos de mouse
slider.addEventListener("mousedown", startDrag);
slider.addEventListener("mouseup", endDrag);
slider.addEventListener("mousemove", drag);
slider.addEventListener("mouseleave", endDrag);

// Eventos de toque
slider.addEventListener("touchstart", startDrag);
slider.addEventListener("touchend", endDrag);
slider.addEventListener("touchmove", drag);

// Eventos dos botões
leftButton.addEventListener("click", () =>
  moveToSlide(currentIndex - slidesToShow)
);
rightButton.addEventListener("click", () =>
  moveToSlide(currentIndex + slidesToShow)
);

// Função para iniciar o arrasto
function startDrag(e) {
  isDragging = true;
  startPos = getPositionX(e);
  animationID = requestAnimationFrame(animation);
  slider.classList.add("grabbing");
}

// Função para terminar o arrasto
function endDrag() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentIndex < slider.children.length - slidesToShow) {
    currentIndex += slidesToShow;
  }

  if (movedBy > 100 && currentIndex > 0) {
    currentIndex -= slidesToShow;
  }

  setPositionByIndex();
  slider.classList.remove("grabbing");
}

// Função para arrastar
function drag(e) {
  if (isDragging) {
    const currentPosition = getPositionX(e);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

// Função para obter a posição X
function getPositionX(e) {
  return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
}

// Função de animação
function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

// Define a posição do slider
function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
}

// Define a posição com base no índice
function setPositionByIndex() {
  const slideWidth = slider.offsetWidth / slidesToShow; // Ajusta a largura do slide com base no número de slides visíveis
  currentTranslate = currentIndex * -slideWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
}

// Move para o slide com base no índice
function moveToSlide(index) {
  if (index < 0) {
    currentIndex = 0;
  } else if (index > slider.children.length - slidesToShow) {
    currentIndex = slider.children.length - slidesToShow;
  } else {
    currentIndex = index;
  }
  setPositionByIndex();
}

// Atualiza o slider quando a janela for redimensionada
window.addEventListener("resize", () => {
  updateSlidesToShow();
  setPositionByIndex();
});

// Inicializa o slider
initSlider();

document.addEventListener("DOMContentLoaded", function () {
  const animatedElementLeft = document.querySelector(".myDivLeft");
  const animatedElementRight = document.querySelector(".myDivRight");

  function checkVisibility() {
    const rectLeft = animatedElementLeft.getBoundingClientRect();
    const rectRight = animatedElementRight.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    // Verifica se o elemento esquerdo está visível
    if (rectLeft.top <= windowHeight && rectLeft.bottom >= 0) {
      animatedElementLeft.classList.add("bounceInLeft");
      animatedElementLeft.classList.remove("hidden");
    }

    // Verifica se o elemento direito está visível
    if (rectRight.top <= windowHeight && rectRight.bottom >= 0) {
      animatedElementRight.classList.add("bounceInRight");
      animatedElementRight.classList.remove("hidden");
    }

    // Remove o event listener após as animações serem executadas
    if (
      !animatedElementLeft.classList.contains("hidden") &&
      !animatedElementRight.classList.contains("hidden")
    ) {
      window.removeEventListener("scroll", checkVisibility);
    }
  }

  window.addEventListener("scroll", checkVisibility);
});

document.addEventListener("DOMContentLoaded", function () {
  const animatedElement = document.querySelector(".myDiv");

  function checkVisibility() {
    const rect = animatedElement.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    if (rect.top <= windowHeight && rect.bottom >= 0) {
      animatedElement.classList.add("bounceInUp");
      animatedElement.classList.remove("hidden");
      window.removeEventListener("scroll", checkVisibility);
    }
  }

  window.addEventListener("scroll", checkVisibility);
});
