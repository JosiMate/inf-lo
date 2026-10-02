/* Rozwiązanie krok po kroku (POMYSLY.md, punkt 27).
 *
 * W Markdownie ramka typu „kroki” z listą numerowaną — każdy punkt listy to
 * jeden krok (pogrubiony tytuł, formuła albo kod, jedno zdanie „dlaczego”):
 *
 *     !!! kroki "Krok po kroku: …"
 *
 *         Krótki opis zadania.
 *
 *         1. **Tytuł kroku.** Co robimy i dlaczego.
 *
 *             ```text
 *             =JEŻELI(…)
 *             ```
 *
 *         2. **Następny krok.** …
 *
 * Skrypt chowa kroki i dokłada przyciski w stylu „Losuj rozgrzewkę”:
 * „Pokaż krok 1” → „Pokaż krok 2” → … → „Pokaż ostatni krok”, oraz
 * „Pokaż wszystkie” i „Zacznij od nowa”. Uczeń najpierw próbuje sam
 * przewidzieć kolejny krok, potem go odsłania.
 *
 * Bez JavaScriptu widać całą listę. Przed wydrukiem wszystko się odsłania.
 * Niczego nie zapisuje w przeglądarce.
 */
(function () {
  "use strict";

  function zbuduj(ramka) {
    const lista = ramka.querySelector(":scope > ol");
    if (!lista || ramka.dataset.krokiGotowe) return;
    ramka.dataset.krokiGotowe = "1";
    const kroki = [...lista.children].filter((el) => el.tagName === "LI");
    const ile = kroki.length;
    if (!ile) return;

    lista.classList.add("kr-lista");
    kroki.forEach((k) => k.classList.add("kr-krok"));

    const pasek = document.createElement("div");
    pasek.className = "kr-pasek";
    pasek.innerHTML =
      '<button type="button" class="pdp-przycisk kr-dalej"></button>' +
      '<button type="button" class="pdp-przycisk kr-wszystkie">Pokaż wszystkie</button>' +
      '<button type="button" class="pdp-przycisk kr-od-nowa" hidden>Zacznij od nowa</button>';
    lista.after(pasek);

    const bDalej = pasek.querySelector(".kr-dalej");
    const bWszystkie = pasek.querySelector(".kr-wszystkie");
    const bOdNowa = pasek.querySelector(".kr-od-nowa");
    let odslonietych = 0;

    function odswiez() {
      kroki.forEach((k, i) => { k.hidden = i >= odslonietych; });
      lista.hidden = odslonietych === 0;
      const koniec = odslonietych >= ile;
      bDalej.hidden = koniec;
      bWszystkie.hidden = koniec;
      bDalej.textContent = odslonietych === ile - 1 && ile > 1
        ? "Pokaż ostatni krok" : `Pokaż krok ${odslonietych + 1}`;
      bOdNowa.hidden = odslonietych === 0;
    }

    function pokazNowy(i) {
      kroki[i].classList.add("pdp-nowa");
      setTimeout(() => kroki[i].classList.remove("pdp-nowa"), 400);
    }

    bDalej.addEventListener("click", () => {
      if (odslonietych >= ile) return;
      odslonietych++;
      odswiez();
      pokazNowy(odslonietych - 1);
      if (odslonietych >= ile) bOdNowa.focus();
    });
    bWszystkie.addEventListener("click", () => {
      odslonietych = ile;
      odswiez();
      bOdNowa.focus();
    });
    bOdNowa.addEventListener("click", () => {
      odslonietych = 0;
      odswiez();
      bDalej.focus();
    });

    let przed = null;
    window.addEventListener("beforeprint", () => {
      przed = odslonietych;
      kroki.forEach((k) => { k.hidden = false; });
      lista.hidden = false;
    });
    window.addEventListener("afterprint", () => {
      if (przed === null) return;
      odslonietych = przed;
      przed = null;
      odswiez();
    });

    odswiez();
  }

  function start() {
    document.querySelectorAll(".md-typeset .kroki").forEach(zbuduj);
  }

  if (typeof document$ !== "undefined") document$.subscribe(start);
  else if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
