(function () {
  "use strict";

  // Header: shadow on scroll + mobile menu toggle
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");

  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (header && toggle) {
    var setOpen = function (open) {
      header.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };

    toggle.addEventListener("click", function () {
      setOpen(!header.classList.contains("is-open"));
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1024) setOpen(false);
    });
  }

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var button = item.querySelector(".faq-item__q");
    if (!button) return;
    button.addEventListener("click", function () {
      var open = !item.classList.contains("is-open");
      item.classList.toggle("is-open", open);
      button.setAttribute("aria-expanded", String(open));
    });
  });

  // Reveal-on-scroll
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // Paver Advisor: search + category filter
  var library = document.querySelector("[data-library]");
  if (library) {
    var search = document.querySelector("[data-library-search]");
    var radios = document.querySelectorAll("[data-library-filter]");
    var groups = library.querySelectorAll("[data-group]");
    var empty = library.querySelector("[data-library-empty]");

    var apply = function () {
      var query = search ? search.value.trim().toLowerCase() : "";
      var checked = document.querySelector("[data-library-filter]:checked");
      var category = checked ? checked.value : "all";
      var shown = 0;

      groups.forEach(function (group) {
        var groupMatches = category === "all" || group.getAttribute("data-group") === category;
        var visibleInGroup = 0;

        group.querySelectorAll(".resource-card").forEach(function (card) {
          var text = card.textContent.toLowerCase();
          var match = groupMatches && (!query || text.indexOf(query) !== -1);
          card.hidden = !match;
          if (match) visibleInGroup++;
        });

        group.hidden = visibleInGroup === 0;
        shown += visibleInGroup;
      });

      if (empty) empty.hidden = shown !== 0;
    };

    if (search) search.addEventListener("input", apply);
    radios.forEach(function (radio) {
      radio.addEventListener("change", apply);
    });
    apply();
  }
})();
