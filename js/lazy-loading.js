function load(img) {
  const url = img.getAttribute("lazy-src");

  // img.classList.add("visible");

  img.setAttribute("src", url);
  img.style.height = "auto";
  // img.removeAttribute("lazy-src");
}

function ready() {
  if ("IntersectionObserver" in window) {
    let lazyImgs = document.querySelectorAll("[lazy-src]");

    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          load(entry.target);
        }
      });
    });

    lazyImgs.forEach((img) => {
      observer.observe(img);
    });
  } else {
  }
}

document.addEventListener("DOMContentLoaded", ready);
