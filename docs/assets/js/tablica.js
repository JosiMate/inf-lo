/* ------------------------------------------------------------
   Tryb tablicy dla ramek i widżetów (tablica.js)
   ------------------------------------------------------------ */
(function () {
  "use strict";

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  let aktywnaNakladka = null;

  function otworz(elementyInput, opcje) {
    opcje = opcje || {};

    if (aktywnaNakladka && aktywnaNakladka.zamknij) {
      aktywnaNakladka.zamknij();
    }

    const tytul = opcje.tytul || "Tryb tablicy";

    let elementy = [];
    if (Array.isArray(elementyInput)) {
      elementy = elementyInput;
    } else if (elementyInput instanceof HTMLElement) {
      elementy = [elementyInput];
    }

    const scrollY = window.scrollY || window.pageYOffset || 0;
    const scrollX = window.scrollX || window.pageXOffset || 0;
    const prevFocus = document.activeElement;
    const prevBodyOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const nakladka = document.createElement("div");
    nakladka.className = "tb-nakladka";
    nakladka.setAttribute("role", "dialog");
    nakladka.setAttribute("aria-modal", "true");
    nakladka.setAttribute("tabindex", "-1");

    nakladka.innerHTML = `
      <div class="tb-naglowek">
        <span class="tb-tytul">${esc(tytul)}</span>
        <button type="button" class="tb-btn-zamknij pdp-przycisk">Zamknij</button>
      </div>
      <div class="tb-tresc">
        <div class="tb-kontener"></div>
      </div>
    `;

    const kontener = nakladka.querySelector(".tb-kontener");
    const btnZamknij = nakladka.querySelector(".tb-btn-zamknij");

    const przeniesioneObiekty = [];

    if (elementy.length > 0) {
      elementy.forEach((el) => {
        if (!(el instanceof HTMLElement)) return;

        const placeHolder = document.createElement("span");
        placeHolder.hidden = true;
        placeHolder.dataset.tbMiejsce = "1";
        el.before(placeHolder);

        const savedDetailsStates = new Map();
        const detailsList = el.querySelectorAll ? Array.from(el.querySelectorAll("details")) : [];
        if (el.tagName === "DETAILS") detailsList.unshift(el);

        detailsList.forEach((d) => {
          savedDetailsStates.set(d, d.open);

          if (d === el) {
            d.open = true;
          } else {
            const sum = d.querySelector(":scope > summary");
            const sumText = sum ? sum.textContent.trim().toLowerCase() : "";
            const isAnswerOrPred =
              d.classList.contains("success") ||
              sumText.startsWith("odpowiedzi") ||
              sumText.startsWith("przewiduj");

            if (isAnswerOrPred) {
              d.open = false;
            }
          }
        });

        const pyKonsola = el.classList.contains("py-konsola") ? el : el.querySelector(".py-konsola");
        let prevKonsolaDisplay = null;
        if (pyKonsola) {
          prevKonsolaDisplay = pyKonsola.style.display;
          pyKonsola.style.display = "none";
        }

        kontener.appendChild(el);

        przeniesioneObiekty.push({
          el: el,
          placeHolder: placeHolder,
          savedDetailsStates: savedDetailsStates,
          pyKonsola: pyKonsola,
          prevKonsolaDisplay: prevKonsolaDisplay
        });
      });
    } else if (typeof elementyInput === "string") {
      kontener.innerHTML = elementyInput;
    }

    document.body.appendChild(nakladka);

    setTimeout(() => {
      try { nakladka.focus(); } catch (e) {}
    }, 50);

    if (nakladka.requestFullscreen) {
      nakladka.requestFullscreen().catch(() => {});
    }

    let isClosing = false;

    function zamknij() {
      if (isClosing) return;
      isClosing = true;

      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }

      document.body.style.overflow = prevBodyOverflow;

      przeniesioneObiekty.forEach((item) => {
        const { el, placeHolder, savedDetailsStates, pyKonsola, prevKonsolaDisplay } = item;

        if (savedDetailsStates) {
          savedDetailsStates.forEach((wasOpen, d) => {
            d.open = wasOpen;
          });
        }

        if (pyKonsola) {
          pyKonsola.style.display = prevKonsolaDisplay || "";
        }

        if (placeHolder && placeHolder.parentNode) {
          placeHolder.before(el);
          placeHolder.remove();
        }
      });

      if (nakladka.parentNode) {
        nakladka.parentNode.removeChild(nakladka);
      }

      window.scrollTo(scrollX, scrollY);

      if (prevFocus && typeof prevFocus.focus === "function") {
        try { prevFocus.focus(); } catch (e) {}
      }

      aktywnaNakladka = null;

      if (typeof opcje.poZamknieciu === "function") {
        opcje.poZamknieciu();
      }
    }

    aktywnaNakladka = { nakladka: nakladka, zamknij: zamknij };

    btnZamknij.addEventListener("click", zamknij);

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        zamknij();
      }
    };
    document.addEventListener("keydown", onKeyDown, true);

    const onFSChange = () => {
      if (!document.fullscreenElement && nakladka.parentNode) {
        zamknij();
      }
    };
    document.addEventListener("fullscreenchange", onFSChange);

    const origZamknij = zamknij;
    aktywnaNakladka.zamknij = () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("fullscreenchange", onFSChange);
      origZamknij();
    };

    return {
      nakladka: nakladka,
      kontener: kontener,
      zamknij: aktywnaNakladka.zamknij
    };
  }

  function czyscTytul(str) {
    return String(str || "").replace(/\s+/g, " ").trim();
  }

  function dopasujRamke(el) {
    if (el.dataset.tbGotowa) return null;
    if (el.parentElement && el.parentElement.closest(".admonition, details, .kroki, .quiz, .karta-pracy")) return null;

    const summary = el.querySelector(":scope > summary") || el.querySelector(":scope > .admonition-title");
    if (!summary) return null;

    const clone = summary.cloneNode(true);
    clone.querySelectorAll("button, .tb-btn-ramka").forEach((b) => b.remove());
    const tytul = czyscTytul(clone.textContent).toLowerCase();

    // 1) Rozgrzewka
    if (el.classList.contains("rozgrzewka")) {
      return { typ: "rozgrzewka", summary: summary, tytul: "Na rozgrzewkę" };
    }

    // 2) Kryteria sukcesu
    if (el.classList.contains("success") && tytul.startsWith("kryteria sukcesu")) {
      return { typ: "kryteria", summary: summary, tytul: "Kryteria sukcesu" };
    }

    // 3) Ćwiczenie
    if (el.classList.contains("note") && tytul.startsWith("ćwiczenie")) {
      return { typ: "cwiczenie", summary: summary, tytul: summary.textContent.trim() };
    }

    // 4) Przewiduj
    if (tytul.startsWith("przewiduj")) {
      return { typ: "przewiduj", summary: summary, tytul: "Przewiduj" };
    }

    // 5) Krok po kroku
    if (el.classList.contains("kroki") || tytul.startsWith("krok po kroku")) {
      return { typ: "kroki", summary: summary, tytul: summary.textContent.trim() };
    }

    return null;
  }

  function inicjalizujRamki() {
    if (aktywnaNakladka && aktywnaNakladka.zamknij) {
      aktywnaNakladka.zamknij();
    }

    const kandydaci = document.querySelectorAll(".md-content .admonition, .md-content details, .md-content .kroki");
    kandydaci.forEach((el) => {
      const dopasowanie = dopasujRamke(el);
      if (!dopasowanie) return;

      el.dataset.tbGotowa = "1";
      const { summary } = dopasowanie;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tb-btn-ramka";
      btn.title = "Na tablicę";
      btn.innerHTML = `<span class="tb-ikona-ekran"></span>Na tablicę`;

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (dopasowanie.typ === "przewiduj" && (el.classList.contains("success") || el.tagName === "DETAILS")) {
          let codeBlock = null;
          let pyKonsola = null;
          let prev = el.previousElementSibling;

          while (prev && (prev.tagName === "P" && prev.textContent.trim() === "")) {
            prev = prev.previousElementSibling;
          }

          if (prev && prev.classList.contains("py-konsola")) {
            pyKonsola = prev;
            prev = prev.previousElementSibling;
            while (prev && (prev.tagName === "P" && prev.textContent.trim() === "")) {
              prev = prev.previousElementSibling;
            }
          }

          if (prev && (prev.classList.contains("highlight") || prev.tagName === "PRE" || prev.querySelector(".highlight, pre"))) {
            codeBlock = prev;
          }

          if (codeBlock) {
            const doPrzeniesienia = [codeBlock];
            if (pyKonsola) doPrzeniesienia.push(pyKonsola);
            doPrzeniesienia.push(el);

            otworz(doPrzeniesienia, { tytul: "Przewiduj" });
            return;
          }
        }

        const titleText = summary.cloneNode(true);
        titleText.querySelectorAll("button, .tb-btn-ramka").forEach((b) => b.remove());
        otworz(el, { tytul: titleText.textContent.trim() });
      });

      summary.appendChild(btn);
    });
  }

  window.Tablica = {
    otworz: otworz,
    start: inicjalizujRamki
  };

  if (typeof document$ !== "undefined") {
    document$.subscribe(inicjalizujRamki);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicjalizujRamki);
  } else {
    inicjalizujRamki();
  }
})();
