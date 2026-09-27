/* Wątek roboczy konsoli Pythona.
 *
 * Interpreter (Pyodide — prawdziwy CPython skompilowany do WebAssembly) działa
 * tutaj, a nie na stronie. Dzięki temu nieskończona pętla ucznia nie zawiesza
 * karty: strona w każdej chwili może ten wątek zabić przyciskiem „Zatrzymaj”
 * i uruchomić nowy.
 *
 * Pliki interpretera leżą w repozytorium (assets/pyodide/), a nie na CDN —
 * szkolna sieć potrafi blokować zewnętrzne serwery.
 */
import { loadPyodide } from "../pyodide/pyodide.mjs";

const PLIK = "<twój program>";

/* input() w przeglądarce nie może czekać na klawiaturę tak jak w terminalu,
   więc dane przychodzą z pola „Dane wejściowe”, wiersz po wierszu. Żeby wynik
   wyglądał jak prawdziwa konsola, wpisaną wartość wypisujemy za pytaniem.
   Przy sprawdzaniu zadań pytań i danych nie wypisujemy — porównuje się
   wyłącznie to, co program wypisał sam. */
const PRELUDIUM = `
import builtins, sys

def _konsola_input(prompt=""):
    if _TRYB_ECHO:
        sys.stdout.write(str(prompt))
    linia = sys.stdin.readline()
    if not linia:
        raise EOFError("program czeka na kolejne dane, a pole „Dane wejściowe” się skończyło")
    linia = linia.rstrip("\\n")
    if _TRYB_ECHO:
        sys.stdout.write(linia + "\\n")
    return linia

builtins.input = _konsola_input
_TRYB_ECHO = True
`;

let py = null;

const start = (async () => {
  py = await loadPyodide({ indexURL: new URL("../pyodide/", import.meta.url).href });
  py.runPython(PRELUDIUM);
  postMessage({ typ: "gotowy", wersja: py.runPython("import sys; sys.version.split()[0]") });
})().catch((e) => {
  postMessage({ typ: "blad-startu", tekst: String(e && e.message || e) });
});

/* Z pełnego śladu wywołań zostawiamy to, co dotyczy programu ucznia —
   wiersze z wnętrza interpretera nic mu nie powiedzą. */
function skrocSlad(tekst) {
  const linie = String(tekst).split("\n");
  const pierwsza = linie.findIndex((l) => l.includes(`File "${PLIK}"`));
  if (pierwsza < 0) return linie.filter((l) => l.trim()).slice(-3).join("\n");
  return ["Traceback (most recent call last):", ...linie.slice(pierwsza)]
    .join("\n").trim().replaceAll(`"${PLIK}"`, "twój program");
}

function strumien(id, typ) {
  const dekoder = new TextDecoder();
  return {
    write: (bufor) => {
      postMessage({ id, typ, tekst: dekoder.decode(bufor, { stream: true }) });
      return bufor.length;
    },
  };
}

onmessage = async ({ data }) => {
  await start;
  if (!py) return;
  const { id, kod, wejscie, echo } = data;

  const tekst = String(wejscie ?? "").replace(/\r\n/g, "\n");
  const linie = tekst.trim() === "" ? [] : tekst.replace(/\n$/, "").split("\n");
  let i = 0;
  py.setStdin({ stdin: () => (i < linie.length ? linie[i++] : null) });
  py.setStdout(strumien(id, "out"));
  py.setStderr(strumien(id, "err"));
  py.globals.set("_TRYB_ECHO", echo !== false);

  // Każde uruchomienie dostaje czystą przestrzeń nazw — jak nowy plik.
  const przestrzen = py.runPython("dict()");
  try {
    await py.runPythonAsync(kod, { globals: przestrzen, filename: PLIK });
    py.runPython("import sys; sys.stdout.flush(); sys.stderr.flush()");
    postMessage({ id, typ: "koniec", ok: true });
  } catch (e) {
    try { py.runPython("import sys; sys.stdout.flush()"); } catch { /* nic */ }
    const pelny = String(e && e.message || e);
    const ostatni = pelny.trim().split("\n").pop();
    postMessage({ id, typ: "koniec", ok: false, blad: skrocSlad(pelny), rodzaj: ostatni.split(":")[0] });
  } finally {
    przestrzen.destroy();
  }
};
