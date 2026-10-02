/* Podpowiedzi odsłaniane po kolei (POMYSLY.md, punkt 26).
 *
 * W Markdownie nic się nie zmienia — pod ćwiczeniem stoją jak dotąd:
 *
 *     ??? tip "Podpowiedź 1"
 *     ??? tip "Podpowiedź 2"
 *     ??? tip "Podpowiedź 3"
 *
 * Skrypt znajduje na stronie takie sąsiadujące ramki (co najmniej dwie,
 * ponumerowane od 1) i składa je w jeden blok: najpierw widać tylko przycisk
 * „Pokaż pierwszą podpowiedź”, potem licznik „1 z 3” i „Następna podpowiedź”.
 * Trzeciej podpowiedzi — prawie gotowego rozwiązania — nie da się otworzyć
 * bez dwóch pierwszych.
 *
 * Bez JavaScriptu i na wydruku zostają zwykłe trzy ramki. Niczego nie
 * zapisuje w przeglądarce — po odświeżeniu strony podpowiedzi znów są
 * schowane.
 */
(function () {
  "use strict";

  const WZOR = /^\s*Podpowied[źz]\s+(\d+)\s*$/i;

  function numer(el) {
    if (!el || el.tagName !== "DETAILS" || !el.classList.contains("tip")) return 0;
    const s = el.querySelector(":scope > summary");
    const m = s && s.textContent.match(WZOR);
    return m ? Number(m[1]) : 0;
  }

  /* Ciągi sąsiadujących ramek „Podpowiedź 1, 2, 3…” w kolejności. */
  function znajdzGrupy(korzen) {
    const grupy = [];
    korzen.querySelectorAll("details.tip").forEach((el) => {
      if (el.closest(".pdp") || numer(el) !== 1) return;
      const grupa = [el];
      let nast = el.nextElementSibling;
      while (numer(nast) === grupa.length + 1) {
        grupa.push(nast);
        nast = nast.nextElementSibling;
      }
      if (grupa.length >= 2) grupy.push(grupa);
    });
    return grupy;
  }

  function zbuduj(grupa) {
    const ile = grupa.length;
    const blok = document.createElement("div");
    blok.className = "pdp";
    grupa[0].before(blok);
    grupa.forEach((el) => {
      el.open = false;
      el.classList.add("pdp-ukryta");
      blok.appendChild(el);
    });

    const pasek = document.createElement("div");
    pasek.className = "pdp-pasek";
    pasek.innerHTML =
      '<button type="button" class="pdp-dalej"></button>' +
      '<span class="pdp-licznik" aria-live="polite"></span>' +
      '<button type="button" class="pdp-schowaj" hidden>Schowaj podpowiedzi</button>';
    blok.appendChild(pasek);

    const bDalej = pasek.querySelector(".pdp-dalej");
    const bSchowaj = pasek.querySelector(".pdp-schowaj");
    const licznik = pasek.querySelector(".pdp-licznik");
    let odslonietych = 0;

    function odswiez() {
      grupa.forEach((el, i) => el.classList.toggle("pdp-ukryta", i >= odslonietych));
      licznik.textContent = odslonietych ? `Podpowiedź ${odslonietych} z ${ile}` : "";
      bDalej.hidden = odslonietych >= ile;
      bDalej.textContent = odslonietych === 0
        ? "Pokaż pierwszą podpowiedź"
        : (odslonietych === ile - 1 ? "Pokaż ostatnią podpowiedź" : "Następna podpowiedź");
      bSchowaj.hidden = odslonietych === 0;
    }

    bDalej.addEventListener("click", () => {
      if (odslonietych >= ile) return;
      /* Poprzednia zostaje widoczna, ale zwinięta — uwaga ucznia idzie
         na nową podpowiedź. */
      if (odslonietych > 0) grupa[odslonietych - 1].open = false;
      grupa[odslonietych].open = true;
      odslonietych++;
      odswiez();
    });

    bSchowaj.addEventListener("click", () => {
      grupa.forEach((el) => { el.open = false; });
      odslonietych = 0;
      odswiez();
      bDalej.focus();
    });

    odswiez();
  }

  function start() {
    const korzen = document.querySelector(".md-content") || document.body;
    znajdzGrupy(korzen).forEach(zbuduj);
  }

  /* Serwis ma navigation.instant — po kliknięciu w menu Material podmienia
     treść bez przeładowania, więc start musi iść przez document$. Ponowne
     wywołanie na tej samej treści nic nie psuje: zbudowane grupy są już
     w .pdp i są pomijane. */
  if (typeof document$ !== "undefined") document$.subscribe(start);
  else if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
