/* Konsola Pythona na stronie z materiałami.
 *
 * W Markdownie zwykły blok kodu, a tuż pod nim pusty znacznik:
 *
 *   ```python
 *   imie = input("Jak masz na imię? ")
 *   print("Cześć,", imie)
 *   ```
 *
 *   <div class="py-konsola" data-wejscie="Ola"></div>
 *
 * Skrypt bierze kod z bloku stojącego bezpośrednio nad znacznikiem, ukrywa
 * ten blok (zostaje na wydruku i bez JavaScriptu) i w miejscu znacznika
 * wstawia edytor z przyciskiem „Uruchom”, polem na dane dla input() i oknem
 * wyniku. Kilka wierszy danych w atrybucie: data-wejscie="2&#10;3".
 * Wewnątrz admonicji całość wcina się o 4 spacje, jak każdą treść.
 *
 * Opcjonalnie w znaczniku skrypt z testami:
 *
 *   <div class="py-konsola"><script type="application/json"
 *   class="py-testy">[{"wejscie": "3725", "wynik": "1 godz. 2 min 5 s"}]</script></div>
 *
 * dokłada przycisk „Sprawdź”: program ucznia uruchamia się na tych danych
 * (bez wypisywania pytań z input()) i wynik porównuje się z oczekiwanym,
 * bez względu na nadmiarowe spacje.
 *
 * Python działa w przeglądarce (Pyodide, w osobnym wątku). Nic nie jest
 * wysyłane na serwer. Interpreter (ok. 13 MB, w assets/pyodide/) pobiera się
 * dopiero przy pierwszym kliknięciu „Uruchom” i zostaje w pamięci podręcznej
 * przeglądarki. Program działający dłużej niż LIMIT_S sekund jest przerywany.
 */
(function () {
  "use strict";

  const KATALOG = (document.currentScript && document.currentScript.src)
    ? document.currentScript.src.replace(/[^/]+$/, "") : "";
  const SERWIS = "inf-lo";
  const LIMIT_S = 10;

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ───────────────────────── interpreter — jeden na stronę ───────────────── */
  const silnik = {
    worker: null, gotowy: null, wersja: "", nastepneId: 1, zadania: new Map(),

    uruchomWatek() {
      if (this.gotowy) return this.gotowy;
      this.gotowy = new Promise((ok, blad) => {
        let w;
        try {
          w = new Worker(new URL("python-worker.mjs", KATALOG || location.href), { type: "module" });
        } catch (e) { blad(e); return; }
        this.worker = w;
        w.onmessage = ({ data }) => {
          if (data.typ === "gotowy") { this.wersja = data.wersja; ok(); return; }
          if (data.typ === "blad-startu") { blad(new Error(data.tekst)); return; }
          const z = this.zadania.get(data.id);
          if (!z) return;
          if (data.typ === "out" || data.typ === "err") z.wypisz(data.tekst, data.typ);
          if (data.typ === "koniec") { this.zadania.delete(data.id); z.koniec(data); }
        };
        w.onerror = (e) => blad(new Error(e.message || "nie udało się uruchomić wątku Pythona"));
      });
      this.gotowy.catch(() => { this.gotowy = null; });
      return this.gotowy;
    },

    /* Zatrzymanie = zabicie wątku. Interpreter trzeba potem wczytać od nowa,
       ale pliki są już w pamięci przeglądarki, więc trwa to chwilę. */
    zatrzymaj(powod) {
      if (this.worker) this.worker.terminate();
      this.worker = null;
      this.gotowy = null;
      for (const z of this.zadania.values()) z.koniec({ ok: false, przerwane: powod });
      this.zadania.clear();
    },

    async uruchom(kod, wejscie, echo, wypisz) {
      await this.uruchomWatek();
      return new Promise((koniec) => {
        const id = this.nastepneId++;
        let licznik = null;
        this.zadania.set(id, {
          wypisz,
          koniec: (w) => { clearTimeout(licznik); koniec(w); },
        });
        licznik = setTimeout(() => this.zatrzymaj("czas"), LIMIT_S * 1000);
        this.worker.postMessage({ id, kod, wejscie, echo });
      });
    },
  };

  /* ───────────────────────── podpowiedzi do błędów ───────────────────────── */
  const PODPOWIEDZI = {
    SyntaxError: "Błąd zapisu — sprawdź nawiasy, cudzysłowy i dwukropki we wskazanym wierszu. Brakujący nawias bywa wierszem wyżej.",
    IndentationError: "Złe wcięcie — przypadkowa spacja na początku wiersza albo brak wcięcia po dwukropku.",
    NameError: "Python nie zna tej nazwy — literówka w nazwie zmiennej albo zmienna użyta, zanim cokolwiek do niej przypisano.",
    TypeError: "Te typy do siebie nie pasują. Czy nie łączysz napisu z liczbą? Pamiętaj: input() zawsze zwraca napis.",
    ValueError: "Dobra funkcja, zła wartość — na przykład int(\"3.5\") albo int(\"dwa\").",
    ZeroDivisionError: "Dzielenie przez zero.",
    EOFError: "Program pyta o więcej danych, niż wpisałeś w polu „Dane wejściowe” — dopisz kolejne wiersze, po jednym na każde input().",
  };

  /* ───────────────────────── edytor ───────────────────────── */
  const WCIECIE = "    ";

  function podepnijEdytor(pole, uruchom) {
    const dopasuj = () => {
      pole.style.height = "auto";
      pole.style.height = pole.scrollHeight + 2 + "px";
    };
    pole.addEventListener("input", dopasuj);
    pole.addEventListener("keydown", (e) => {
      const { selectionStart: a, selectionEnd: b, value: v } = pole;
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault(); uruchom(); return;
      }
      if (e.key === "Tab" && !e.shiftKey && a === b) {
        e.preventDefault();
        pole.setRangeText(WCIECIE, a, b, "end");
        dopasuj(); pole.dispatchEvent(new Event("input", { bubbles: true }));
        return;
      }
      if (e.key === "Tab" && e.shiftKey) {
        e.preventDefault();
        const poczatek = v.lastIndexOf("\n", a - 1) + 1;
        const ile = (v.slice(poczatek).match(/^ {1,4}/) || [""])[0].length;
        if (ile) {
          pole.setRangeText("", poczatek, poczatek + ile, "preserve");
          pole.selectionStart = pole.selectionEnd = Math.max(poczatek, a - ile);
          pole.dispatchEvent(new Event("input", { bubbles: true }));
        }
        return;
      }
      /* Enter zachowuje wcięcie bieżącego wiersza, a po dwukropku je
         pogłębia — jak w IDLE. */
      if (e.key === "Enter" && !e.shiftKey && a === b) {
        const poczatek = v.lastIndexOf("\n", a - 1) + 1;
        const wiersz = v.slice(poczatek, a);
        let wciecie = (wiersz.match(/^\s*/) || [""])[0];
        if (/:\s*(#.*)?$/.test(wiersz)) wciecie += WCIECIE;
        e.preventDefault();
        pole.setRangeText("\n" + wciecie, a, b, "end");
        dopasuj(); pole.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });
    requestAnimationFrame(dopasuj);
    return dopasuj;
  }

  /* ───────────────────────── pamięć kodu ucznia ───────────────────────── */
  const kluczKodu = (nr) => `py:${SERWIS}:${location.pathname.replace(/index\.html$/, "")}:${nr}`;
  const czytaj = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
  const pisz = (k, v) => { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch { /* bez pamięci */ } };

  const normalizuj = (s) => String(s ?? "").replace(/\r\n/g, "\n").split("\n")
    .map((l) => l.replace(/[ \t]+/g, " ").trim()).join("\n").trim();

  /* ───────────────────────── widżet ───────────────────────── */
  function zbuduj(host, nr) {
    /* Kod bierzemy z bloku kodu stojącego tuż nad znacznikiem konsoli
       (albo, dla wygody, ze <script type="text/plain"> w środku). Blok
       zostaje w dokumencie — ukryty — żeby bez JavaScriptu i na wydruku
       przykład nadal był widoczny. */
    const zrodlo = host.querySelector('script[type="text/plain"]');
    let blok = null;
    if (!zrodlo) {
      for (let el = host.previousElementSibling; el; el = el.previousElementSibling) {
        if (el.matches(".highlight, pre")) { blok = el; break; }
        if (el.textContent.trim()) break;
      }
    }
    const tekstBloku = blok ? (blok.querySelector("code") || blok).textContent : "";
    const testyEl = host.querySelector("script.py-testy");
    const przyklad = ((zrodlo ? zrodlo.textContent : tekstBloku) || "").replace(/^\n+/, "").replace(/\s+$/, "") + "\n";
    if (blok) blok.classList.add("pyk-zrodlo");
    /* Wewnątrz admonicji Markdown owija znacznik w <p>, a przeglądarka
       rozcina go na dwa puste akapity wokół konsoli — sprzątamy je. */
    for (const el of [host.previousElementSibling, host.nextElementSibling]) {
      if (el && el.tagName === "P" && !el.childNodes.length) el.remove();
    }
    let testy = [];
    try { testy = testyEl ? JSON.parse(testyEl.textContent) : []; } catch { testy = []; }
    const wejscieDomyslne = host.dataset.wejscie ?? "";
    const pokazWejscie = host.dataset.wejscie !== undefined || /\binput\s*\(/.test(przyklad);
    const klucz = kluczKodu(nr);
    const zapisany = czytaj(klucz);

    host.innerHTML = `
      <div class="pyk-pasek">
        <span class="pyk-etykieta">Python</span>
        <button type="button" class="pyk-uruchom" title="Ctrl + Enter">▶ Uruchom</button>
        <button type="button" class="pyk-zatrzymaj" hidden>■ Zatrzymaj</button>
        ${testy.length ? '<button type="button" class="pyk-sprawdz">✓ Sprawdź</button>' : ""}
        <span class="pyk-odstep"></span>
        <button type="button" class="pyk-przywroc" title="Wróć do kodu z materiału">↺ Przykład</button>
      </div>
      <textarea class="pyk-kod" spellcheck="false" autocapitalize="off" autocomplete="off"
        aria-label="Kod programu w Pythonie"></textarea>
      ${pokazWejscie ? `<label class="pyk-wejscie-et">Dane wejściowe — każdy wiersz to odpowiedź na kolejne <code>input()</code>
        <textarea class="pyk-wejscie" rows="2" spellcheck="false"></textarea></label>` : ""}
      <pre class="pyk-wynik" aria-live="polite" hidden></pre>
      <div class="pyk-testy" hidden></div>
      <p class="pyk-uwaga" hidden></p>`;

    const kod = host.querySelector(".pyk-kod");
    const wejscie = host.querySelector(".pyk-wejscie");
    const wynik = host.querySelector(".pyk-wynik");
    const wynikTestow = host.querySelector(".pyk-testy");
    const uwaga = host.querySelector(".pyk-uwaga");
    const bUruchom = host.querySelector(".pyk-uruchom");
    const bZatrzymaj = host.querySelector(".pyk-zatrzymaj");
    const bSprawdz = host.querySelector(".pyk-sprawdz");
    const bPrzywroc = host.querySelector(".pyk-przywroc");

    kod.value = zapisany != null ? zapisany : przyklad;
    if (wejscie) wejscie.value = wejscieDomyslne.replace(/\\n/g, "\n");
    const pokazUwage = () => {
      const zmieniony = kod.value !== przyklad;
      uwaga.hidden = !zmieniony;
      uwaga.textContent = zmieniony
        ? "To twoja wersja kodu — zapamiętana w tej przeglądarce. „↺ Przykład” przywraca kod z materiału." : "";
    };
    pokazUwage();

    let zapisTimer = null;
    kod.addEventListener("input", () => {
      clearTimeout(zapisTimer);
      zapisTimer = setTimeout(() => { pisz(klucz, kod.value === przyklad ? null : kod.value); pokazUwage(); }, 400);
    });

    const dopasuj = podepnijEdytor(kod, () => uruchom());

    bPrzywroc.addEventListener("click", () => {
      kod.value = przyklad; pisz(klucz, null); pokazUwage(); dopasuj();
      if (wejscie) wejscie.value = wejscieDomyslne.replace(/\\n/g, "\n");
      wynik.hidden = true; wynikTestow.hidden = true;
    });

    let trwa = false;
    const stan = (dziala) => {
      trwa = dziala;
      bUruchom.disabled = dziala;
      if (bSprawdz) bSprawdz.disabled = dziala;
      bZatrzymaj.hidden = !dziala;
    };
    bZatrzymaj.addEventListener("click", () => silnik.zatrzymaj("uczen"));

    const dopisz = (tekst, klasa) => {
      const s = document.createElement("span");
      if (klasa) s.className = klasa;
      s.textContent = tekst;
      wynik.appendChild(s);
      wynik.scrollTop = wynik.scrollHeight;
    };

    async function uruchom() {
      if (trwa) return;
      stan(true);
      wynik.hidden = false; wynikTestow.hidden = true;
      wynik.textContent = "";
      if (!silnik.gotowy) dopisz("Uruchamiam Pythona — za pierwszym razem trwa to kilka sekund…\n", "pyk-info");
      let odp;
      try {
        await silnik.uruchomWatek();
        if (wynik.firstChild && wynik.firstChild.className === "pyk-info") wynik.textContent = "";
        odp = await silnik.uruchom(kod.value, wejscie ? wejscie.value : "", true,
          (t, typ) => dopisz(t, typ === "err" ? "pyk-blad" : ""));
      } catch (e) {
        wynik.textContent = "";
        dopisz("Nie udało się uruchomić Pythona w tej przeglądarce (" + e.message + ").\n" +
          "Spróbuj odświeżyć stronę albo użyj online-python.com.", "pyk-blad");
        stan(false); return;
      }
      pokazKoniec(odp);
      stan(false);
    }

    function pokazKoniec(odp) {
      if (odp.przerwane === "czas") {
        dopisz(`\nProgram działał dłużej niż ${LIMIT_S} s i został zatrzymany. ` +
          "Sprawdź, czy pętla ma warunek, który kiedyś przestanie być spełniony.\n", "pyk-blad");
      } else if (odp.przerwane) {
        dopisz("\nProgram zatrzymany.\n", "pyk-info");
      } else if (!odp.ok) {
        if (wynik.textContent && !wynik.textContent.endsWith("\n")) dopisz("\n");
        dopisz(odp.blad + "\n", "pyk-blad");
        const rada = PODPOWIEDZI[odp.rodzaj];
        if (rada) dopisz("💡 " + rada + "\n", "pyk-rada");
      } else if (!wynik.textContent) {
        dopisz("(program zakończył się i niczego nie wypisał — w pliku wynik trzeba wypisać przez print())\n", "pyk-info");
      }
    }

    bUruchom.addEventListener("click", uruchom);

    if (bSprawdz) {
      bSprawdz.addEventListener("click", async () => {
        if (trwa) return;
        stan(true);
        wynik.hidden = true;
        wynikTestow.hidden = false;
        wynikTestow.innerHTML = '<p class="pyk-info">Sprawdzam…</p>';
        const wiersze = [];
        let zaliczone = 0;
        try {
          await silnik.uruchomWatek();
          for (const t of testy) {
            let wyjscie = "";
            const odp = await silnik.uruchom(kod.value, t.wejscie ?? "", false, (s, typ) => { if (typ === "out") wyjscie += s; });
            const dobrze = odp.ok && normalizuj(wyjscie) === normalizuj(t.wynik);
            if (dobrze) zaliczone++;
            wiersze.push(`<li class="${dobrze ? "pyk-ok" : "pyk-zle"}">
              <strong>${dobrze ? "✔" : "✘"}</strong>
              ${t.wejscie ? `dane: <code>${esc(String(t.wejscie).replace(/\n/g, " ⏎ "))}</code> · ` : ""}
              oczekiwano: <code>${esc(t.wynik)}</code>
              ${dobrze ? "" : ` · otrzymano: <code>${esc(odp.ok ? (normalizuj(wyjscie) || "(nic)") : (odp.przerwane ? "przerwano" : (odp.blad || "").split("\n").pop()))}</code>`}
            </li>`);
            if (odp.przerwane) break;
          }
        } catch (e) {
          wiersze.push(`<li class="pyk-zle">Nie udało się uruchomić Pythona (${esc(e.message)}).</li>`);
        }
        wynikTestow.innerHTML = `<p class="${zaliczone === testy.length ? "pyk-ok" : "pyk-zle"}">
          <strong>Zaliczone przypadki: ${zaliczone} z ${testy.length}</strong></p><ul>${wiersze.join("")}</ul>`;
        stan(false);
      });
    }
  }

  function start() {
    document.querySelectorAll(".py-konsola").forEach((host, nr) => {
      if (host.dataset.gotowe) return;
      host.dataset.gotowe = "1";
      zbuduj(host, nr);
    });
  }

  if (typeof document$ !== "undefined") document$.subscribe(start);
  else if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
