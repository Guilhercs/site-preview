function applySmallScreenStyles() {
  // Verifica se a largura da tela é menor que 480px
  if (window.innerWidth < 480) {
    // Seleciona o elemento com a classe 'slide'
    const slides = document.querySelectorAll(".slide");

    // Aplica o estilo necessário a todos os slides
    slides.forEach((slide) => {
      slide.style.width = "100%";
      // Se você quiser adicionar mais propriedades, pode fazer isso aqui
      // Por exemplo: slide.style.height = "auto";
    });
  }
}

function applyMediumScreenStyles() {
  // Verifica se a largura da tela está entre 481px e 780px
  if (window.innerWidth >= 481 && window.innerWidth <= 780) {
    // Seleciona todos os elementos com a classe 'slide'
    const slides = document.querySelectorAll(".slide");

    // Aplica o estilo necessário a todos os slides
    slides.forEach((slide) => {
      slide.style.width = "calc(100% / 2)";
    });
  }
}

// Executa a função ao carregar a página
window.onload = applyMediumScreenStyles;

// Executa a função novamente se a janela for redimensionada
window.onresize = applyMediumScreenStyles;

// Executa a função ao carregar a página
window.onload = applySmallScreenStyles;

// Executa a função novamente se a janela for redimensionada
window.onresize = applySmallScreenStyles;

document.addEventListener("DOMContentLoaded", function () {
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const scrollPaddingTop = 90;
        const targetPosition = targetElement.offsetTop - scrollPaddingTop;

        window.scrollTo({
          top: targetPosition,
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
let autoSlideInterval; // Intervalo para auto slide
let isAutoSliding = true; // Controla se o auto slide está ativo
const totalSlides = slider.children.length;

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
  startAutoSlide(); // Inicia o auto slide
}

// Inicia o auto slide
function startAutoSlide() {
  stopAutoSlide(); // Garante que não haja múltiplos intervalos ativos
  autoSlideInterval = setInterval(() => {
    if (!isDragging && isAutoSliding) {
      moveToSlide(currentIndex + 1);
    }
  }, 2200); // Move o slide a cada segundo
}

// Para o auto slide
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Eventos de mouse
slider.addEventListener("mousedown", (e) => {
  stopAutoSlide();
  startDrag(e);
});
slider.addEventListener("mouseup", (e) => {
  endDrag(e);
  startAutoSlide();
});
slider.addEventListener("mousemove", drag);
slider.addEventListener("mouseleave", (e) => {
  endDrag(e);
  startAutoSlide();
});

// Eventos de toque
slider.addEventListener("touchstart", (e) => {
  stopAutoSlide();
  startDrag(e);
});
slider.addEventListener("touchend", (e) => {
  endDrag(e);
  startAutoSlide();
});
slider.addEventListener("touchmove", drag);

// Eventos dos botões
leftButton.addEventListener("click", () => {
  moveToSlide(currentIndex - 1);
  startAutoSlide(); // Reinicia o auto slide após interação manual
});
rightButton.addEventListener("click", () => {
  moveToSlide(currentIndex + 1);
  startAutoSlide(); // Reinicia o auto slide após interação manual
});

// Função para iniciar o arrasto
function startDrag(e) {
  isDragging = true;
  isAutoSliding = false; // Pausa o auto slide ao arrastar
  startPos = getPositionX(e);
  animationID = requestAnimationFrame(animation);
  slider.classList.add("grabbing");
}

// Função para terminar o arrasto
function endDrag() {
  isDragging = false;
  cancelAnimationFrame(animationID);
  isAutoSliding = true; // Retoma o auto slide após terminar o arrasto

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100) {
    moveToSlide(currentIndex + 1);
  }

  if (movedBy > 100) {
    moveToSlide(currentIndex - 1);
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

  // Calcular o índice de looping
  if (currentIndex < 0) {
    currentIndex = totalSlides - slidesToShow; // Vai para o final se for antes do início
  } else if (currentIndex > totalSlides - slidesToShow) {
    currentIndex = 0; // Vai para o início se passar do final
  }

  currentTranslate = currentIndex * -slideWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
}

// Move para o slide com base no índice
function moveToSlide(index) {
  currentIndex = index;
  setPositionByIndex();
}

// Atualiza o slider quando a janela for redimensionada
window.addEventListener("resize", () => {
  updateSlidesToShow();
  setPositionByIndex();
  startAutoSlide(); // Reinicia o auto slide após redimensionar a janela
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

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (event) {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      // Itera sobre todos os campos do formulário
      form.classList.add("was-validated");
    } else {
      form.classList.remove("was-validated");
    }
  });

  // Validação para campos individuais
  form.querySelectorAll("input, textarea").forEach(function (input) {
    input.addEventListener("input", function () {
      if (input.checkValidity()) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
      } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
      }
    });
  });
});
