document.documentElement.classList.add("js");

const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const NAV_BREAKPOINT = 1040;

if (navToggle && navMenu) {
  const closeMenu = () => {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > NAV_BREAKPOINT) closeMenu();
  });
}

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

const photoSlots = document.querySelectorAll("img[data-photo]");
const photoExts = ["jpg", "jpeg", "webp", "png"];

photoSlots.forEach((img) => {
  const base = img.getAttribute("data-photo");
  if (!base) return;

  const tryExt = (index) => {
    if (index >= photoExts.length) return;
    const url = `${base}.${photoExts[index]}`;
    const probe = new Image();
    probe.onload = () => {
      img.src = url;
      img.classList.add("is-live");
      const liveAlt = img.getAttribute("data-live-alt");
      if (liveAlt) img.alt = liveAlt;
    };
    probe.onerror = () => tryExt(index + 1);
    probe.src = url;
  };

  tryExt(0);
});
