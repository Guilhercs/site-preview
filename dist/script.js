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
