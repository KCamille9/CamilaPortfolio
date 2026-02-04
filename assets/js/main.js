/* global lucide */

if (typeof lucide !== "undefined") {
  lucide.createIcons();
}

const slideElements = document.querySelectorAll('[data-anim="slide-up"]');

slideElements.forEach((el, index) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(40px)";
  el.style.transition =
    "opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";

  setTimeout(() => {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  }, 200 + index * 150);
});

const fadeElements = document.querySelectorAll('[data-anim="fade-in"]');

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
      obs.unobserve(el);
    }
  });
}, observerOptions);

fadeElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
  observer.observe(el);
});

(function () {
  const navRoot = document.querySelector(
    '[data-shared-component="primary-navigation"]'
  );
  if (!navRoot) return;

  const toggleBtn = navRoot.querySelector('[data-ref="mobile-toggle"]');
  const menu = navRoot.querySelector('[data-ref="mobile-menu"]');

  if (toggleBtn && menu) {
    toggleBtn.addEventListener("click", () => {
      const isHidden =
        menu.style.display === "none" ||
        getComputedStyle(menu).display === "none";

      if (isHidden) {
        menu.style.display = "block";
        menu.style.height = "auto";
      } else {
        menu.style.display = "none";
        menu.style.height = "0";
      }
    });
  }
})();

document.querySelectorAll("[data-loki-link]").forEach((element) => {
  element.addEventListener("click", (event) => {
    event.preventDefault();
    const link = document.createElement("a");
    link.href = element.dataset.lokiLink;
    if (event.currentTarget.dataset.lokiLink[0] !== "#") {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});
