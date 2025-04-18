document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent event bubbling

      // Close search if open
      const mobileSearch = document.getElementById("mobile-search");
      if (mobileSearch && mobileSearch.classList.contains("active")) {
        mobileSearch.classList.remove("active");
      }

      // Toggle menu
      mobileMenu.classList.toggle("active");

      // Update button icon
      mobileMenuButton.innerHTML = mobileMenu.classList.contains("active")
        ? '<i class="fas fa-times text-xl"></i>'
        : '<i class="fas fa-bars text-xl"></i>';
    });
  }

  // Search Bar Toggle
  const searchButton = document.getElementById("search-button");
  const mobileSearch = document.getElementById("mobile-search");

  if (searchButton && mobileSearch) {
    searchButton.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent event bubbling

      // Close menu if open
      if (mobileMenu && mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active");
        if (mobileMenuButton) {
          mobileMenuButton.innerHTML = '<i class="fas fa-bars text-xl"></i>';
        }
      }

      // Toggle search
      mobileSearch.classList.toggle("active");
    });
  }

  // Navbar Scroll Effect
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // Close menus when clicking outside
  document.addEventListener("click", () => {
    if (mobileMenu && mobileMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active");
      if (mobileMenuButton) {
        mobileMenuButton.innerHTML = '<i class="fas fa-bars text-xl"></i>';
      }
    }

    if (mobileSearch && mobileSearch.classList.contains("active")) {
      mobileSearch.classList.remove("active");
    }
  });

  // Prevent closing when clicking inside menus
  if (mobileMenu) {
    mobileMenu.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  if (mobileSearch) {
    mobileSearch.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  // .........FEATURE SECTION ..>>>>>>>

  // Add to cart functionality
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const product = this.closest(".product-card");
      const productName = product.querySelector("h3").textContent;
      const productPrice = product.querySelector(".text-amber-400").textContent;

      // Animation
      this.innerHTML = '<i class="fas fa-check"></i> Added';
      this.classList.add("bg-green-500");

      // Reset after 2 seconds
      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
        this.classList.remove("bg-green-500");
      }, 5000);

      // In a real app, you would add to cart here
      console.log(`Added to cart: ${productName} - ${productPrice}`);
    });
  });

  // .........CATEGORY SECTION ..>>>>>>>

  document.querySelectorAll(".category-card").forEach((card) => {
    card.addEventListener("click", function (e) {
      if (!e.target.closest("button")) {
        const category = this.querySelector("h3").textContent;
        console.log(`Navigating to ${category} collection`);
        // window.location.href = `/collections/${category.toLowerCase().replace(' ', '-')}`;
      }
    });
  });

  // .........ABOUT SECTION ..>>>>>>>

  document.addEventListener("DOMContentLoaded", function () {
    // Counter animation for stats
    const counters = document.querySelectorAll(".counter");
    const speed = 200;

    function animateCounters() {
      counters.forEach((counter) => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText.replace("K+", "");
        const increment = target / speed;

        if (count < target) {
          counter.innerText =
            target === 8
              ? Math.ceil(count + increment) + "+"
              : Math.ceil(count + increment) + "K+";
          setTimeout(animateCounters, 1);
        } else {
          counter.innerText = target === 8 ? target + "+" : target + "K+";
        }
      });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fadeIn");

          // Start counter animation when stats section is visible
          if (entry.target.classList.contains("about-section")) {
            animateCounters();
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    document
      .querySelectorAll(".about-section, .values-section, .cta-section")
      .forEach((section) => {
        observer.observe(section);
      });

    // Team image tilt effect on mouse move
    const teamImage = document.querySelector(".team-image");
    if (teamImage) {
      teamImage.addEventListener("mousemove", (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        teamImage.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
      });

      teamImage.addEventListener("mouseleave", () => {
        teamImage.style.transform =
          "perspective(1000px) rotateY(-5deg) rotateX(0)";
      });
    }

    // Highlight text animation on hover
    const highlightTexts = document.querySelectorAll(".highlight-text");
    highlightTexts.forEach((text) => {
      text.addEventListener("mouseenter", () => {
        text.style.transform = "translateY(-2px)";
      });
      text.addEventListener("mouseleave", () => {
        text.style.transform = "translateY(0)";
      });
    });
  });
});
