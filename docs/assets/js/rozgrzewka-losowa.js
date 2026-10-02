/* ------------------------------------------------------------
   Widżet losowej rozgrzewki i powtórki przed sprawdzianem
   ------------------------------------------------------------ */
(function () {
  "use strict";

  const scriptSrc = document.currentScript ? document.currentScript.src : "";

  function getJsonUrl(klasa) {
    if (scriptSrc) {
      return new URL("../rozgrzewki/" + klasa + ".json", scriptSrc).href;
    }
    return "../assets/rozgrzewki/" + klasa + ".json";
  }

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function losujUnikalne(dostepne, ile, wykluczoneIds) {
    let kandydaci = dostepne.filter((q) => !wykluczoneIds.has(q.id));
    if (kandydaci.length < ile) {
      kandydaci = dostepne;
    }
    const kopia = [...kandydaci];
    const wynik = [];
    while (wynik.length < ile && kopia.length > 0) {
      const idx = Math.floor(Math.random() * kopia.length);
      wynik.push(kopia.splice(idx, 1)[0]);
    }
    return wynik;
  }

  function budujInterfejs(host, data) {
    const kolejnosc = data.kolejnosc || [];
    const tytuly = data.tytuly || {};
    const pytania = data.pytania || [];

    let aktywnaZakladka = "lekcja";
    let ostatnieIds = new Set();
    let pokazWszystkieOdpowiedzi = false;

    host.className = "rz-losowa";
    host.innerHTML = `
      <div class="rz-naglowek">
        <div class="rz-tytul-bloku">
          <span class="rz-ikona-mozgu"></span>
          <span>Losowa rozgrzewka i powtórka</span>
        </div>
        <button type="button" class="rz-przycisk rz-btn-tablica" title="Widok na projektor">Na tablicę</button>
      </div>

      <div class="rz-zakladki">
        <button type="button" class="rz-zakladka rz-aktywna" data-tab="lekcja">Rozgrzewka na lekcję</button>
        <button type="button" class="rz-zakladka" data-tab="powtorka">Powtórka przed sprawdzianem</button>
      </div>

      <div class="rz-tresc-zakladki rz-pane-lekcja"></div>
      <div class="rz-tresc-zakladki rz-pane-powtorka" hidden></div>
    `;

    const paneLekcja = host.querySelector(".rz-pane-lekcja");
    const panePowtorka = host.querySelector(".rz-pane-powtorka");
    const btnTablica = host.querySelector(".rz-btn-tablica");

    // Obsługa zakładek
    host.querySelectorAll(".rz-zakladka").forEach((btn) => {
      btn.addEventListener("click", () => {
        host.querySelectorAll(".rz-zakladka").forEach((b) => b.classList.remove("rz-aktywna"));
        btn.classList.add("rz-aktywna");
        aktywnaZakladka = btn.dataset.tab;
        paneLekcja.hidden = aktywnaZakladka !== "lekcja";
        panePowtorka.hidden = aktywnaZakladka !== "powtorka";
      });
    });

    // Tryb Tablicy
    let handleTablicy = null;
    let wTrybieTablicyFallback = false;

    function wlaczTabliceFallback() {
      wTrybieTablicyFallback = true;
      host.classList.add("rz-tablica-mode");
      btnTablica.textContent = "Zamknij";
      if (host.requestFullscreen) {
        host.requestFullscreen().catch(() => {});
      }
    }

    function wylaczTabliceFallback() {
      wTrybieTablicyFallback = false;
      host.classList.remove("rz-tablica-mode");
      btnTablica.textContent = "Na tablicę";
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }

    btnTablica.addEventListener("click", () => {
      if (handleTablicy) {
        handleTablicy.zamknij();
        return;
      }

      if (window.Tablica && typeof window.Tablica.otworz === "function") {
        // Bez klasy rz-tablica-mode: nakładka tablica.js sama powiększa treść
        // i ma własny przycisk „Zamknij”.

        handleTablicy = window.Tablica.otworz(host, {
          tytul: "Losowa rozgrzewka i powtórka",
          poZamknieciu: () => {
            handleTablicy = null;
          }
        });
      } else {
        if (wTrybieTablicyFallback) wylaczTabliceFallback();
        else wlaczTabliceFallback();
      }
    });

    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement && wTrybieTablicyFallback) {
        wylaczTabliceFallback();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && wTrybieTablicyFallback) {
        wylaczTabliceFallback();
      }
    });

    // === TRYB 1: ROZGRZEWKA NA LEKCJĘ ===
    function renderLekcja() {
      const opcjeTematow = kolejnosc.map((slug, idx) => {
        const tytul = tytuly[slug] || slug;
        return `<option value="${idx}">${idx + 1}. ${esc(tytul)}</option>`;
      }).join("");

      paneLekcja.innerHTML = `
        <div class="rz-pasek-opcji">
          <label>Dziś zaczynamy temat:
            <select class="rz-select rz-wybor-tematu">
              ${opcjeTematow}
            </select>
          </label>
          <button type="button" class="rz-przycisk rz-przycisk-akcent rz-btn-losuj-lekcja">Losuj rozgrzewkę</button>
        </div>
        <div class="rz-wynik-lekcja"></div>
      `;

      const selectTemat = paneLekcja.querySelector(".rz-wybor-tematu");
      const btnLosuj = paneLekcja.querySelector(".rz-btn-losuj-lekcja");
      const kontenerWyniku = paneLekcja.querySelector(".rz-wynik-lekcja");

      if (kolejnosc.length > 1) {
        selectTemat.value = "1";
      }

      function losujNaLekcje() {
        const idx = parseInt(selectTemat.value, 10);
        if (idx === 0) {
          kontenerWyniku.innerHTML = `
            <div class="rz-komunikat-brak">
              To jest pierwszy temat w kolejności — brak wcześniejszych materiałów do wylosowania rozgrzewki.
            </div>`;
          return;
        }

        pokazWszystkieOdpowiedzi = false;
        const wczesniejszeSlugi = kolejnosc.slice(0, idx);

        const slug1 = kolejnosc[idx - 1];
        const pytania1 = pytania.filter((q) => q.temat === slug1);

        const slugi2 = [kolejnosc[idx - 2], kolejnosc[idx - 3]].filter(Boolean);
        const pytania2 = pytania.filter((q) => slugi2.includes(q.temat));

        const slugi3 = wczesniejszeSlugi.slice(0, Math.max(0, idx - 3));
        const pytania3 = pytania.filter((q) => slugi3.includes(q.temat));

        const wybranePytania = [];
        const uzyteIds = new Set();

        let p1 = losujUnikalne(pytania1, 1, ostatnieIds)[0];
        if (!p1) p1 = losujUnikalne(pytania.filter(q => wczesniejszeSlugi.includes(q.temat)), 1, uzyteIds)[0];
        if (p1) { wybranePytania.push({ q: p1, etykieta: "Z poprzedniej lekcji." }); uzyteIds.add(p1.id); }

        let p2 = losujUnikalne(pytania2.filter(q => !uzyteIds.has(q.id)), 1, ostatnieIds)[0];
        if (!p2) p2 = losujUnikalne(pytania.filter(q => wczesniejszeSlugi.includes(q.temat) && !uzyteIds.has(q.id)), 1, uzyteIds)[0];
        if (p2) { wybranePytania.push({ q: p2, etykieta: "Sprzed kilku tygodni." }); uzyteIds.add(p2.id); }

        let p3 = losujUnikalne(pytania3.filter(q => !uzyteIds.has(q.id)), 1, ostatnieIds)[0];
        if (!p3) p3 = losujUnikalne(pytania.filter(q => wczesniejszeSlugi.includes(q.temat) && !uzyteIds.has(q.id)), 1, uzyteIds)[0];
        if (p3) { wybranePytania.push({ q: p3, etykieta: "Z dawniejszych tematów." }); uzyteIds.add(p3.id); }

        ostatnieIds = uzyteIds;
        renderWybraneLekcja(kontenerWyniku, wybranePytania);
      }

      selectTemat.addEventListener("change", losujNaLekcje);
      btnLosuj.addEventListener("click", losujNaLekcje);

      losujNaLekcje();
    }

    function renderWybraneLekcja(container, zestawy) {
      if (zestawy.length === 0) {
        container.innerHTML = `<div class="rz-komunikat-brak">Brak pytań w banku dla wybranych tematów.</div>`;
        return;
      }

      const kartyHtml = zestawy.map((item, i) => {
        const q = item.q;
        const kodHtml = q.kod ? `<div class="rz-kod-pytania"><pre><code>${esc(q.kod)}</code></pre></div>` : "";
        return `
          <div class="rz-karta-pytania">
            <span class="rz-etykieta-pytania">${i + 1}. ${esc(item.etykieta)}</span>
            <div class="rz-tresc-pytania">${esc(q.pytanie)}</div>
            ${kodHtml}
            <div class="rz-odpowiedz-box" ${pokazWszystkieOdpowiedzi ? "" : "hidden"}>
              <strong>Odpowiedź:</strong> ${esc(q.odpowiedz)}
            </div>
          </div>
        `;
      }).join("");

      container.innerHTML = `
        <div class="rz-lista-pytan">${kartyHtml}</div>
        <div class="rz-przyciski-akcji">
          <button type="button" class="rz-przycisk rz-btn-pokaz-odp">
            ${pokazWszystkieOdpowiedzi ? "Schowaj odpowiedzi" : "Pokaż odpowiedzi"}
          </button>
          <button type="button" class="rz-przycisk rz-btn-losuj-inne">Losuj inne</button>
        </div>
      `;

      container.querySelector(".rz-btn-pokaz-odp").addEventListener("click", () => {
        pokazWszystkieOdpowiedzi = !pokazWszystkieOdpowiedzi;
        container.querySelectorAll(".rz-odpowiedz-box").forEach((box) => {
          box.hidden = !pokazWszystkieOdpowiedzi;
        });
        container.querySelector(".rz-btn-pokaz-odp").textContent =
          pokazWszystkieOdpowiedzi ? "Schowaj odpowiedzi" : "Pokaż odpowiedzi";
      });

      container.querySelector(".rz-btn-losuj-inne").addEventListener("click", () => {
        paneLekcja.querySelector(".rz-btn-losuj-lekcja").click();
      });
    }

    // === TRYB 2: POWTÓRKA PRZED SPRAWDZIANEM ===
    function renderPowtorka() {
      const checki = kolejnosc.map((slug) => {
        const tytul = tytuly[slug] || slug;
        return `
          <label class="rz-check-item">
            <input type="checkbox" class="rz-check-temat" value="${esc(slug)}">
            <span>${esc(tytul)}</span>
          </label>
        `;
      }).join("");

      panePowtorka.innerHTML = `
        <div class="rz-checkgroup">
          <strong>Wybierz tematy do powtórki:</strong>
          ${checki}
        </div>
        <div class="rz-pasek-opcji">
          <label>Liczba pytań:
            <select class="rz-select rz-ile-pytan">
              <option value="5">5 pytań</option>
              <option value="10">10 pytań</option>
              <option value="all">Wszystkie z wybranych</option>
            </select>
          </label>
          <button type="button" class="rz-przycisk rz-przycisk-akcent rz-btn-losuj-powtorka" disabled title="Zaznacz co najmniej jeden temat">
            Losuj powtórkę
          </button>
        </div>
        <div class="rz-wynik-powtorka"></div>
      `;

      const btnLosuj = panePowtorka.querySelector(".rz-btn-losuj-powtorka");
      const kontenerWyniku = panePowtorka.querySelector(".rz-wynik-powtorka");

      const odswiezStanPrzycisku = () => {
        const zaznaczone = panePowtorka.querySelectorAll(".rz-check-temat:checked");
        btnLosuj.disabled = zaznaczone.length === 0;
        if (zaznaczone.length === 0) {
          btnLosuj.title = "Zaznacz co najmniej jeden temat";
        } else {
          btnLosuj.removeAttribute("title");
        }
      };

      panePowtorka.querySelectorAll(".rz-check-temat").forEach((cb) => {
        cb.addEventListener("change", odswiezStanPrzycisku);
      });

      btnLosuj.addEventListener("click", () => {
        const wybraneSlugi = Array.from(panePowtorka.querySelectorAll(".rz-check-temat:checked")).map((cb) => cb.value);
        if (wybraneSlugi.length === 0) return;

        const pDostepne = pytania.filter((q) => wybraneSlugi.includes(q.temat));
        if (pDostepne.length === 0) {
          kontenerWyniku.innerHTML = `<div class="rz-komunikat-brak">Brak pytań w banku dla wybranych tematów.</div>`;
          return;
        }

        const ileVal = panePowtorka.querySelector(".rz-ile-pytan").value;
        let ile = pDostepne.length;
        if (ileVal === "5") ile = Math.min(5, pDostepne.length);
        else if (ileVal === "10") ile = Math.min(10, pDostepne.length);

        const wylosowane = losujUnikalne(pDostepne, ile, new Set());
        renderWybranePowtorka(kontenerWyniku, wylosowane);
      });
    }

    function renderWybranePowtorka(container, listaPytan) {
      const kartyHtml = listaPytan.map((q, i) => {
        const tytulTematu = tytuly[q.temat] || q.temat;
        const kodHtml = q.kod ? `<div class="rz-kod-pytania"><pre><code>${esc(q.kod)}</code></pre></div>` : "";
        return `
          <div class="rz-karta-pytania" data-id="${esc(q.id)}">
            <span class="rz-etykieta-pytania">Pytanie ${i + 1} (${esc(tytulTematu)})</span>
            <div class="rz-tresc-pytania">${esc(q.pytanie)}</div>
            ${kodHtml}
            <button type="button" class="rz-przycisk rz-btn-odp-pojedyncza">Pokaż odpowiedź</button>
            <div class="rz-odpowiedz-box" hidden>
              <strong>Odpowiedź:</strong> ${esc(q.odpowiedz)}
            </div>
          </div>
        `;
      }).join("");

      container.innerHTML = `<div class="rz-lista-pytan">${kartyHtml}</div>`;

      container.querySelectorAll(".rz-karta-pytania").forEach((karta) => {
        const btn = karta.querySelector(".rz-btn-odp-pojedyncza");
        const box = karta.querySelector(".rz-odpowiedz-box");
        btn.addEventListener("click", () => {
          const jestUkryta = box.hidden;
          box.hidden = !jestUkryta;
          btn.textContent = jestUkryta ? "Schowaj odpowiedź" : "Pokaż odpowiedź";
        });
      });
    }

    renderLekcja();
    renderPowtorka();
  }

  function start() {
    document.querySelectorAll(".rozgrzewka-losowa").forEach((host) => {
      if (host.dataset.gotowe) return;

      const klasa = host.dataset.klasa || "klasa-1";
      const jsonUrl = getJsonUrl(klasa);

      host.dataset.gotowe = "1";
      host.innerHTML = `<div class="rz-komunikat-brak">Wczytywanie banku pytań…</div>`;

      fetch(jsonUrl)
        .then((res) => {
          if (!res.ok) throw new Error("HTTP " + res.status);
          return res.json();
        })
        .then((data) => {
          budujInterfejs(host, data);
        })
        .catch((err) => {
          console.error("Błąd ładowania rozgrzewki:", err);
          host.innerHTML = `<div class="kp-blad">Nie udało się wczytać pytań rozgrzewkowych.</div>`;
        });
    });
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(start);
  } else {
    document.addEventListener("DOMContentLoaded", start);
  }
})();
