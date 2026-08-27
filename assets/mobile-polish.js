(() => {
  const mobileQuery = window.matchMedia("(max-width: 640px)");

  const placeBrand = () => {
    const header = document.querySelector(".site-header");
    const heroContent = document.querySelector(".hero-content");
    const brand = document.querySelector(".site-header > .brand, .hero-content > .hero-brand");
    const menu = header?.querySelector(".menu-toggle");

    if (!header || !heroContent || !brand || !menu) return false;

    if (mobileQuery.matches) {
      if (brand.parentElement !== heroContent) heroContent.prepend(brand);
      brand.classList.add("hero-brand");
      document.documentElement.classList.add("mobile-brand-ready");
    } else {
      if (brand.parentElement !== header) header.insertBefore(brand, menu);
      brand.classList.remove("hero-brand");
      document.documentElement.classList.remove("mobile-brand-ready");
    }

    return true;
  };

  const start = () => {
    placeBrand();

    const root = document.getElementById("root");
    if (root) {
      const observer = new MutationObserver(() => placeBrand());
      observer.observe(root, { childList: true, subtree: true });
    }

    mobileQuery.addEventListener?.("change", placeBrand);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
