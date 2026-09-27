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
 * bez względu na nadmiarowe spacje; liczby porównuje się co do wartości.
 * Zamiast danych test może sprawdzać funkcję ucznia:
 *
 *   {"kod": "print(cena_biletu(6))", "wynik": "0", "pokaz": "cena_biletu(6)"}
 *
 * — program ucznia wykonuje się po cichu, potem „kod” w tej samej przestrzeni
 * nazw i porównywane jest tylko to, co wypisał „kod”. Pola nieobowiązkowe:
 * "pokaz" (co wyświetlić zamiast kodu) i "opis" (słowo przed nim).
 *
 * Inne atrybuty znacznika:
 *   data-plik="../pliki/szkielet.py"  kod wczytywany z pliku zamiast bloku
 *                                     nad znacznikiem (długie szkielety);
 *   data-nazwa="zadanie.py"           przycisk „Zapisz .py” z tą nazwą
 *                                     (przy data-plik jest zawsze).
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
  /* Wszystkie serwisy leżą pod jednym adresem josimate.github.io, więc
     klucz w pamięci przeglądarki zaczyna się od nazwy serwisu. */
  const SERWIS = /\.github\.io$/.test(location.hostname)
    ? location.pathname.split("/")[1] : "lokalnie";
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

    async uruchom(kod, wejscie, echo, wypisz, dopisek) {
      await this.uruchomWatek();
      return new Promise((koniec) => {
        const id = this.nastepneId++;
        let licznik = null;
        this.zadania.set(id, {
          wypisz,
          koniec: (w) => { clearTimeout(licznik); koniec(w); },
        });
        licznik = setTimeout(() => this.zatrzymaj("czas"), LIMIT_S * 1000);
        this.worker.postMessage({ id, kod, wejscie, echo, dopisek });
      });
    },
  };

  /* ───────────────────────── podpowiedzi do błędów ───────────────────────── */
  const PODPOWIEDZI = {
    SyntaxError: "Błąd zapisu — sprawdź nawiasy, cudzysłowy i dwukropki we wskazanym wierszu. Brakujący nawias bywa wierszem wyżej.",
    IndentationError: "Złe wcięcie — przypadkowa spacja na początku wiersza albo brak wcięcia po dwukropku.",
    NameError: "Python nie zna tej nazwy — literówka w nazwie, zmienna użyta, zanim cokolwiek do niej przypisano, albo funkcja wywołana wyżej niż jej def.",
    TypeError: "Te typy do siebie nie pasują. Czy nie łączysz napisu z liczbą? Pamiętaj: input() zawsze zwraca napis.",
    ValueError: "Dobra funkcja, zła wartość — na przykład int(\"3.5\") albo int(\"dwa\").",
    ZeroDivisionError: "Dzielenie przez zero.",
    EOFError: "Program pyta o więcej danych, niż wpisałeś w polu „Dane wejściowe” — dopisz kolejne wiersze, po jednym na każde input().",
    IndexError: "Indeks poza listą — lista o długości n ma indeksy od 0 do n − 1.",
    KeyError: "W słowniku nie ma takiego klucza.",
    RecursionError: "Funkcja wywołuje samą siebie zbyt głęboko — brakuje warunku zakończenia albo dane są za duże na rekurencję (limit to około 1000 zagnieżdżeń).",
  };

  /* Część błędów ma typowe przyczyny, które widać dopiero w treści komunikatu. */
  function podpowiedz(rodzaj, komunikat) {
    const m = String(komunikat || "");
    if (rodzaj === "IndexError" && m.includes("pop from empty list"))
      return "Zdejmujesz z pustej listy — na stosie nic już nie ma.";
    if (rodzaj === "AttributeError" && m.includes("'NoneType'"))
      return "Sięgasz do pola czegoś, co jest None — zwykle pętla przeszła za koniec listy albo brakuje sprawdzenia „is not None”.";
    if (rodzaj === "TypeError" && m.includes("NoneType"))
      return "Któraś wartość to None — najczęściej funkcja bez return. Sprawdź, czy funkcja zwraca wynik, a nie tylko go wypisuje.";
    if (rodzaj === "TypeError" && /missing \d+ required positional argument/.test(m))
      return "Za mało argumentów w wywołaniu — porównaj je z listą parametrów w def.";
    if (rodzaj === "TypeError" && /takes \d+ positional arguments? but \d+ (was|were) given/.test(m))
      return "Za dużo argumentów w wywołaniu — porównaj je z listą parametrów w def.";
    return PODPOWIEDZI[rodzaj];
  }

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

  /* Wynik zgadza się, gdy po ujednoliceniu odstępów tekst jest ten sam —
     albo gdy obie strony są liczbami równymi co do wartości (12 i 12.0). */
  const LICZBA = /^-?\d+(\.\d+)?([eE][-+]?\d+)?$/;
  function zgodne(otrzymane, oczekiwane) {
    const a = normalizuj(otrzymane), b = normalizuj(oczekiwane);
    if (a === b) return true;
    if (LICZBA.test(a) && LICZBA.test(b)) return Math.abs(Number(a) - Number(b)) < 1e-9;
    return false;
  }

  function pobierzPlik(tekst, nazwa) {
    const url = URL.createObjectURL(new Blob([tekst.replace(/\n/g, "\r\n")], { type: "text/x-python;charset=utf-8" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: nazwa });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  /* ───────────────────────── widżet ───────────────────────── */
  function zbuduj(host, nr) {
    /* Kod bierzemy z bloku kodu stojącego tuż nad znacznikiem konsoli
       (albo, dla wygody, ze <script type="text/plain"> w środku). Blok
       zostaje w dokumencie — ukryty — żeby bez JavaScriptu i na wydruku
       przykład nadal był widoczny. */
    const plik = host.dataset.plik || "";
    const zrodlo = host.querySelector('script[type="text/plain"]');
    let blok = null;
    if (!zrodlo && !plik) {
      for (let el = host.previousElementSibling; el; el = el.previousElementSibling) {
        if (el.matches(".highlight, pre")) { blok = el; break; }
        if (el.textContent.trim()) break;
      }
    }
    const tekstBloku = blok ? (blok.querySelector("code") || blok).textContent : "";
    const testyEl = host.querySelector("script.py-testy");
    const oczysc = (s) => String(s || "").replace(/\r\n/g, "\n").replace(/^\n+/, "").replace(/\s+$/, "") + "\n";
    let przyklad = oczysc(zrodlo ? zrodlo.textContent : tekstBloku);
    const nazwaPliku = host.dataset.nazwa || (plik ? plik.split("/").pop() : "");
    if (blok) blok.classList.add("pyk-zrodlo");
    /* Wewnątrz admonicji Markdown owija znacznik w <p>, a przeglądarka
       rozcina go na dwa puste akapity wokół konsoli — sprzątamy je. */
    for (const el of [host.previousElementSibling, host.nextElementSibling]) {
      if (el && el.tagName === "P" && !el.childNodes.length) el.remove();
    }
    let testy = [];
    try { testy = testyEl ? JSON.parse(testyEl.textContent) : []; } catch { testy = []; }
    const wejscieDomyslne = host.dataset.wejscie ?? "";
    const pokazWejscie = host.dataset.wejscie !== undefined || (!plik && /\binput\s*\(/.test(przyklad));
    const klucz = kluczKodu(nr);
    const zapisany = czytaj(klucz);

    host.innerHTML = `
      <div class="pyk-pasek">
        <span class="pyk-etykieta">Python</span>
        <button type="button" class="pyk-uruchom" title="Ctrl + Enter">▶ Uruchom</button>
        <button type="button" class="pyk-zatrzymaj" hidden>■ Zatrzymaj</button>
        ${testy.length ? '<button type="button" class="pyk-sprawdz">✓ Sprawdź</button>' : ""}
        <span class="pyk-odstep"></span>
        ${nazwaPliku ? `<button type="button" class="pyk-zapisz" title="Zapisz kod z okienka jako plik ${esc(nazwaPliku)}">⤓ Zapisz .py</button>` : ""}
        <button type="button" class="pyk-przywroc" title="${plik ? "Wczytaj szkielet od nowa" : "Wróć do kodu z materiału"}">↺ ${plik ? "Szkielet" : "Przykład"}</button>
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

    const bZapisz = host.querySelector(".pyk-zapisz");
    const PRZYWROC = plik ? "„↺ Szkielet” wczytuje szkielet od nowa." : "„↺ Przykład” przywraca kod z materiału.";

    kod.value = zapisany != null ? zapisany : przyklad;
    if (wejscie) wejscie.value = wejscieDomyslne.replace(/\\n/g, "\n");
    const pokazUwage = () => {
      const zmieniony = kod.value !== przyklad;
      uwaga.hidden = !zmieniony;
      uwaga.textContent = zmieniony
        ? "To twoja wersja kodu — zapamiętana tylko w tej przeglądarce" +
          (bZapisz ? " (żeby ją oddać albo przenieść, użyj „⤓ Zapisz .py”). " : ". ") + PRZYWROC : "";
    };
    pokazUwage();

    let zapisTimer = null;
    kod.addEventListener("input", () => {
      clearTimeout(zapisTimer);
      zapisTimer = setTimeout(() => { pisz(klucz, kod.value === przyklad ? null : kod.value); pokazUwage(); }, 400);
    });

    const dopasuj = podepnijEdytor(kod, () => uruchom());

    if (bZapisz) bZapisz.addEventListener("click", () => pobierzPlik(kod.value, nazwaPliku));

    /* Szkielet z pliku (data-plik) doczytujemy z serwera — jest tylko jedno
       źródło prawdy: ten sam plik, który uczeń może pobrać przyciskiem. */
    if (plik) {
      if (zapisany == null) { kod.value = "# Wczytuję szkielet…\n"; kod.readOnly = true; }
      fetch(new URL(plik, location.href))
        .then((r) => { if (!r.ok) throw new Error("HTTP " + r.status); return r.text(); })
        .then((t) => {
          przyklad = oczysc(t);
          if (zapisany == null) kod.value = przyklad;
          kod.readOnly = false; pokazUwage(); dopasuj();
        })
        .catch(() => {
          kod.readOnly = false;
          if (zapisany == null) kod.value = "# Nie udało się wczytać szkieletu — pobierz plik przyciskiem nad okienkiem.\n";
        });
    }

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
        const rada = podpowiedz(odp.rodzaj, String(odp.blad || "").trim().split("\n").pop());
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
            const odp = await silnik.uruchom(kod.value, t.wejscie ?? "", false,
              (s, typ) => { if (typ === "out") wyjscie += s; }, t.kod);
            const dobrze = odp.ok && zgodne(wyjscie, t.wynik);
            if (dobrze) zaliczone++;
            wiersze.push(`<li class="${dobrze ? "pyk-ok" : "pyk-zle"}">
              <strong>${dobrze ? "✔" : "✘"}</strong>
              ${t.kod ? `${esc(t.opis || "sprawdzam")}: <code>${esc(t.pokaz || t.kod)}</code> · ` : ""}
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
