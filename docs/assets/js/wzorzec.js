/* Wizualizator wyszukiwania wzorca w tekście — algorytm naiwny, KMP
 * i Boyer–Moore–Horspool, krok po kroku.
 *
 * Autorowanie w Markdownie — kontener z danymi w znaczniku script:
 *
 *     <div class="wzorzec-wiz" markdown="0">
 *     <script type="application/json">
 *     {
 *       "tekst": "ABABDABACDABABCABAB",
 *       "wzorzec": "ABABCABAB",
 *       "tryby": ["naiwny", "kmp", "horspool"],
 *       "tryb": "naiwny"
 *     }
 *     </script>
 *     </div>
 *
 * „tryby” wybiera przyciski algorytmów (domyślnie wszystkie trzy; przy
 * jednym trybie przełącznik znika), „tryb” — algorytm startowy.
 * Uczeń może wpisać własny tekst i wzorzec; nic nie jest wysyłane.
 *
 * Jeden krok = jedno porównanie znaku albo jedno przesunięcie wzorca.
 * Liczniki liczą porównania znaków dokładnie tak jak funkcje w szkieletach
 * ćwiczeń, więc wynik z okienka i z programu ucznia da się porównać.
 */
(function () {
  "use strict";

  const NAZWY = { naiwny: "Naiwny", kmp: "KMP", horspool: "Horspool" };
  const MAKS_TEKST = 60, MAKS_WZORZEC = 20;

  function odmien(n, poj, mn, dop) {
    if (n === 1) return poj;
    const j = n % 10, d = n % 100;
    return (j >= 2 && j <= 4 && !(d >= 12 && d <= 14)) ? mn : dop;
  }
  const esc = (s) => String(s).replace(/[&<>"]/g, (z) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[z]));
  const widoczny = (z) => (z === " " ? "␣" : z);

  /* ───────────────────────────────────────── tablice pomocnicze */
  function tablicaPi(p) {
    const pi = new Array(p.length).fill(0);
    let k = 0;
    for (let q = 1; q < p.length; q++) {
      while (k > 0 && p[k] !== p[q]) k = pi[k - 1];
      if (p[k] === p[q]) k++;
      pi[q] = k;
    }
    return pi;
  }

  function tablicaHorspool(p) {
    const m = p.length, t = {};
    for (let k = 0; k < m - 1; k++) t[p[k]] = m - 1 - k;
    return t;
  }

  /* ───────────────────────────────────────── algorytmy jako generatory
     Każdy yield to jedno zdarzenie do pokazania: porównanie albo
     przesunięcie. Stan widoku (ustawienie wzorca, znaki już porównane)
     niesie samo zdarzenie, więc rysowanie nie musi znać algorytmu. */
  function* naiwny(t, p) {
    const n = t.length, m = p.length;
    for (let s = 0; s <= n - m; s++) {
      const wyniki = {};
      let j = 0;
      for (; j < m; j++) {
        const ok = t[s + j] === p[j];
        wyniki[j] = ok ? "ok" : "zle";
        yield { typ: "por", s, j, ok, wyniki: { ...wyniki },
          opis: `Porównuję tekst[${s + j}] = „${widoczny(t[s + j])}” ze wzorzec[${j}] = „${widoczny(p[j])}” — ${ok ? "**zgodne**" : "**różne**, przerywam to ustawienie"}.` };
        if (!ok) break;
      }
      if (j === m) yield { typ: "traf", s, wyniki: { ...wyniki }, opis: `Wszystkie ${m} znaki zgodne — **wystąpienie na pozycji ${s}**.` };
      if (s < n - m) yield { typ: "przes", s: s + 1, wyniki: {},
        opis: `Przesuwam wzorzec o **1** — na pozycję ${s + 1}. Algorytm naiwny zapomina wszystko, co przed chwilą porównał.` };
    }
  }

  function* kmp(t, p) {
    const n = t.length, m = p.length, pi = tablicaPi(p);
    let q = 0;
    const znane = (q) => { const w = {}; for (let j = 0; j < q; j++) w[j] = "znane"; return w; };
    for (let i = 0; i < n; i++) {
      while (true) {
        const s = i - q;
        const ok = t[i] === p[q];
        const w = znane(q); w[q] = ok ? "ok" : "zle";
        yield { typ: "por", s, j: q, ok, wyniki: w,
          opis: `Porównuję tekst[${i}] = „${widoczny(t[i])}” ze wzorzec[${q}] = „${widoczny(p[q])}” — ${ok ? "**zgodne**" : "**różne**"}.` +
            (q > 0 && !ok ? ` Dopasowanych było ${q} ${odmien(q, "znak", "znaki", "znaków")}, a π[${q - 1}] = ${pi[q - 1]}.` : "") };
        if (ok) { q++; break; }
        if (q === 0) {
          if (i + 1 < n) yield { typ: "przes", s: i + 1, wyniki: {}, opis: "Nic nie było dopasowane — przesuwam wzorzec o 1." };
          break;
        }
        const stare = q; q = pi[q - 1];
        yield { typ: "przes", s: i - q, wyniki: znane(q),
          opis: `Przesuwam wzorzec o **${stare - q}**: ${q ? `pierwsze ${q} ${odmien(q, "znak", "znaki", "znaków")} wzorca na pewno pasuje (to π), więc ich **nie porównuję** ponownie` : "żaden prefiks nie pasuje, zaczynam wzorzec od początku"} — a w tekście **nie cofam się**.` };
      }
      if (q === m) {
        const s = i - m + 1;
        yield { typ: "traf", s, wyniki: znane(m), opis: `Dopasowane wszystkie ${m} znaki — **wystąpienie na pozycji ${s}**.` };
        const stare = q; q = pi[m - 1];
        if (i + 1 < n) yield { typ: "przes", s: i + 1 - q, wyniki: znane(q),
          opis: `Szukam dalej: przesuwam o **${stare - q}**, bo π[${m - 1}] = ${q}${q ? " — koniec tego wystąpienia może być początkiem następnego" : ""}.` };
      }
    }
  }

  function* horspool(t, p) {
    const n = t.length, m = p.length, tab = tablicaHorspool(p);
    let s = 0;
    while (s <= n - m) {
      const wyniki = {};
      let j = m - 1;
      while (j >= 0) {
        const ok = t[s + j] === p[j];
        wyniki[j] = ok ? "ok" : "zle";
        yield { typ: "por", s, j, ok, wyniki: { ...wyniki },
          opis: `Porównuję **od końca**: tekst[${s + j}] = „${widoczny(t[s + j])}” ze wzorzec[${j}] = „${widoczny(p[j])}” — ${ok ? "**zgodne**" : "**różne**"}.` };
        if (!ok) break;
        j--;
      }
      if (j < 0) yield { typ: "traf", s, wyniki: { ...wyniki }, opis: `Wszystkie znaki zgodne — **wystąpienie na pozycji ${s}**.` };
      const z = t[s + m - 1], o = tab[z] ?? m;
      if (s + o <= n - m) yield { typ: "przes", s: s + o, wyniki: {},
        opis: `Znak tekstu pod końcem wzorca to „${widoczny(z)}”. ${z in tab ? `W tablicy przesunięć ma wartość ${o}` : `Nie ma go we wzorcu (poza ostatnim miejscem), więc przesunięcie to cała długość: ${o}`} — przesuwam o **${o}**.` };
      s += o;
    }
  }

  const ALG = { naiwny, kmp, horspool };

  /* ───────────────────────────────────────── widok */
  function zbuduj(host, tryby) {
    host.innerHTML = `
      <div class="wz">
        <div class="wz-dane">
          <label>Tekst <input type="text" class="wz-tekst" maxlength="${MAKS_TEKST}" spellcheck="false" autocomplete="off"></label>
          <label>Wzorzec <input type="text" class="wz-wzorzec" maxlength="${MAKS_WZORZEC}" spellcheck="false" autocomplete="off"></label>
        </div>
        <div class="wz-sterowanie">
          <div class="wz-tryby" role="group" aria-label="Wybór algorytmu" ${tryby.length < 2 ? "hidden" : ""}>
            ${tryby.map((t) => `<button type="button" class="wz-tryb" data-tryb="${t}">${NAZWY[t]}</button>`).join("")}
          </div>
          <div class="wz-przyciski">
            <button type="button" class="wz-krok">Krok</button>
            <button type="button" class="wz-graj">Do końca</button>
            <button type="button" class="wz-reset">Od nowa</button>
          </div>
        </div>
        <div class="wz-plansza" role="img" aria-label="Tekst i przykładany do niego wzorzec"></div>
        <div class="wz-tablica" hidden></div>
        <p class="wz-opis"></p>
        <div class="wz-liczniki">
          <span><b class="wz-por">0</b> <span class="wz-por-sl">porównań</span> znaków</span>
          <span><b class="wz-ust">1</b> <span class="wz-ust-sl">ustawienie</span> wzorca</span>
          <span>pozycje wystąpień: <b class="wz-traf">—</b></span>
        </div>
        <p class="wz-legenda">
          <span class="wz-poz"><span class="wz-kl wz-ok"></span> zgodne</span>
          <span class="wz-poz"><span class="wz-kl wz-zle"></span> różne</span>
          <span class="wz-poz" data-tylko="kmp"><span class="wz-kl wz-znane"></span> znane bez porównania</span>
          <span class="wz-poz"><span class="wz-kl wz-trafienie"></span> znalezione wystąpienie</span>
        </p>
      </div>`;
  }

  /* KMP nie cofa się w tekście, więc pod koniec wzorzec potrafi wystawać
     poza tekst — dla niego plansza ma m − 1 dodatkowych kolumn. */
  function rysujPlansze(host, t, p, zd, trafienia, kolumny) {
    const n = t.length, m = p.length, s = zd ? zd.s : 0;
    const wTrafieniu = new Set();
    trafienia.forEach((x) => { for (let k = 0; k < m; k++) wTrafieniu.add(x + k); });
    const cz = zd && zd.typ === "por" ? s + zd.j : -1;
    let h = '<div class="wz-rzad wz-indeksy">';
    for (let i = 0; i < kolumny; i++) h += `<span>${i < n ? i : ""}</span>`;
    h += '</div><div class="wz-rzad wz-t">';
    for (let i = 0; i < kolumny; i++) h += i >= n ? '<span class="wz-poza"></span>' : `<span class="${wTrafieniu.has(i) ? "wz-trafienie" : ""}${i === cz ? " wz-teraz" : ""}">${esc(widoczny(t[i]))}</span>`;
    h += '</div><div class="wz-rzad wz-p">';
    for (let i = 0; i < kolumny; i++) {
      const j = i - s;
      if (j < 0 || j >= m) { h += "<span></span>"; continue; }
      const w = zd && zd.wyniki[j];
      h += `<span class="wz-zw${w ? " wz-" + w : ""}${i === cz ? " wz-teraz" : ""}">${esc(widoczny(p[j]))}</span>`;
    }
    h += "</div>";
    const pl = host.querySelector(".wz-plansza");
    pl.style.setProperty("--wz-n", kolumny);
    pl.innerHTML = h;
  }

  function rysujTablice(host, tryb, p) {
    const el = host.querySelector(".wz-tablica");
    if (tryb === "kmp") {
      const pi = tablicaPi(p);
      el.innerHTML = `<table class="wz-tab"><tr><th>j</th>${[...p].map((_, j) => `<td>${j}</td>`).join("")}</tr>
        <tr><th>wzorzec[j]</th>${[...p].map((z) => `<td>${esc(widoczny(z))}</td>`).join("")}</tr>
        <tr><th>π[j]</th>${pi.map((v) => `<td>${v}</td>`).join("")}</tr></table>`;
      el.hidden = false;
    } else if (tryb === "horspool") {
      const tab = tablicaHorspool(p);
      const kl = Object.keys(tab);
      el.innerHTML = `<table class="wz-tab"><tr><th>znak</th>${kl.map((z) => `<td>${esc(widoczny(z))}</td>`).join("")}<td>inny</td></tr>
        <tr><th>przesunięcie</th>${kl.map((z) => `<td>${tab[z]}</td>`).join("")}<td>${p.length}</td></tr></table>`;
      el.hidden = false;
    } else el.hidden = true;
  }

  function uruchom(host) {
    if (host.dataset.gotowe) return;
    host.dataset.gotowe = "1";
    let dane = {};
    try { dane = JSON.parse(host.querySelector("script[type='application/json'], script:not([src])").textContent); } catch { /* domyślne */ }
    const tryby = (dane.tryby || ["naiwny", "kmp", "horspool"]).filter((t) => ALG[t]);
    zbuduj(host, tryby);

    const poleT = host.querySelector(".wz-tekst"), poleP = host.querySelector(".wz-wzorzec");
    poleT.value = dane.tekst || "ABRAKADABRA";
    poleP.value = dane.wzorzec || "ABRA";
    let tryb = tryby.includes(dane.tryb) ? dane.tryb : tryby[0];
    let t, p, gen, zd, por, ust, trafienia, koniec, kolumny, timer = null;

    const liczniki = () => {
      host.querySelector(".wz-por").textContent = por;
      host.querySelector(".wz-por-sl").textContent = odmien(por, "porównanie", "porównania", "porównań");
      host.querySelector(".wz-ust").textContent = ust;
      host.querySelector(".wz-ust-sl").textContent = odmien(ust, "ustawienie", "ustawienia", "ustawień");
      host.querySelector(".wz-traf").textContent = koniec || trafienia.length ? (trafienia.join(", ") || "brak") : "—";
      host.querySelector(".wz-krok").disabled = koniec;
      host.querySelector(".wz-graj").disabled = koniec;
      host.querySelectorAll(".wz-tryb").forEach((b) => b.classList.toggle("wz-wybrany", b.dataset.tryb === tryb));
      host.querySelectorAll("[data-tylko]").forEach((e) => { e.hidden = e.dataset.tylko !== tryb; });
    };
    const opis = (tekst) => {
      host.querySelector(".wz-opis").innerHTML = esc(tekst).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    };
    const stop = () => { clearInterval(timer); timer = null; host.querySelector(".wz-graj").textContent = "Do końca"; };

    function odNowa() {
      stop();
      t = poleT.value.slice(0, MAKS_TEKST); p = poleP.value.slice(0, MAKS_WZORZEC);
      por = 0; ust = 1; trafienia = []; zd = null; koniec = false;
      if (!p || !t || p.length > t.length) {
        koniec = true; ust = 0;
        host.querySelector(".wz-plansza").innerHTML = "";
        host.querySelector(".wz-tablica").hidden = true;
        opis(!p ? "Wpisz wzorzec." : !t ? "Wpisz tekst." : "Wzorzec jest dłuższy niż tekst — nie ma gdzie go przyłożyć.");
        liczniki(); return;
      }
      gen = ALG[tryb](t, p);
      kolumny = tryb === "kmp" ? t.length + p.length - 1 : t.length;
      rysujPlansze(host, t, p, { s: 0, wyniki: {} }, trafienia, kolumny);
      rysujTablice(host, tryb, p);
      opis(`Przykładam wzorzec (${p.length} ${odmien(p.length, "znak", "znaki", "znaków")}) do początku tekstu (${t.length} ${odmien(t.length, "znak", "znaki", "znaków")}). Kliknij **Krok**.`);
      liczniki();
    }

    function krok() {
      if (koniec) return;
      const r = gen.next();
      if (r.done) {
        koniec = true;
        rysujPlansze(host, t, p, zd && { ...zd, typ: "koniec" }, trafienia, kolumny);
        opis(`Koniec. ${trafienia.length ? `Wystąpienia na pozycjach: **${trafienia.join(", ")}**.` : "Wzorzec **nie występuje** w tekście."} Porównań znaków: **${por}**.`);
        liczniki(); return;
      }
      zd = r.value;
      if (zd.typ === "por") por++;
      if (zd.typ === "przes") ust++;
      if (zd.typ === "traf") trafienia.push(zd.s);
      rysujPlansze(host, t, p, zd, trafienia, kolumny);
      opis(zd.opis);
      liczniki();
    }

    host.querySelector(".wz-krok").addEventListener("click", () => { stop(); krok(); });
    host.querySelector(".wz-graj").addEventListener("click", (e) => {
      if (timer) { stop(); return; }
      e.currentTarget.textContent = "Zatrzymaj";
      timer = setInterval(() => { krok(); if (koniec) stop(); }, 260);
    });
    host.querySelector(".wz-reset").addEventListener("click", odNowa);
    host.querySelectorAll(".wz-tryb").forEach((b) => b.addEventListener("click", () => { tryb = b.dataset.tryb; odNowa(); }));
    [poleT, poleP].forEach((el) => el.addEventListener("change", odNowa));
    [poleT, poleP].forEach((el) => el.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); odNowa(); } }));

    odNowa();
  }

  function start() { document.querySelectorAll(".wzorzec-wiz").forEach(uruchom); }
  if (typeof document$ !== "undefined") document$.subscribe(start);
  else if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
