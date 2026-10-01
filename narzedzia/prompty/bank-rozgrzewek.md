# Zadanie dla Julesa — bank rozgrzewek (pilotaż w inf-lo)

Skopiuj wszystko poniżej linii i wklej do Julesa po wybraniu repozytorium
`JosiMate/inf-lo` i gałęzi `main`.

---

Przeczytaj `AGENTS.md` w katalogu głównym repozytorium i postępuj według
niego — szczególnie według sekcji 2 „Zasady pracy”, 3 „Język i styl”,
5 „Standard tematu” (punkt o rozgrzewce), 6 „Widżety i składnia”,
7 „Czego nie ruszać” i 8 „Zanim oddasz zmiany”. To zadanie **wprost
pozwala** dodać nowy skrypt JS, plik danych, wpis w `mkdocs.yml`, sekcję na
stronach spisu tematów klas oraz uzupełnić `AGENTS.md` — poza tym
obowiązuje wszystko, co tam jest.

## Cel

Rozgrzewka (3 pytania na początek lekcji: z poprzedniej lekcji, sprzed
kilku tygodni, z dawniejszego tematu) jest w standardzie tematu, ale ma ją
dopiero kilka stron. Budujemy **bank krótkich pytań powtórkowych**
przypisanych do tematów i **widżet, który losuje z niego rozgrzewkę** na
dowolną lekcję oraz **powtórkę przed sprawdzianem**.

To **dodatek, nie zamiennik**: ręcznie pisane rozgrzewki w tematach
zostają bez zmian. Losowanie przydaje się na lekcjach, przed którymi temat
jeszcze nie ma rozgrzewki, i przy powtórkach. To pilotaż w jednym serwisie
— jeśli się sprawdzi, przeniesiemy go do pozostałych.

## 1. Bank — `docs/assets/rozgrzewki/klasa-1.json` i `klasa-2.json`

Osobny plik na klasę (klasa 1 = 1A, klasa 2 = 2LOA — nigdy nie mieszamy
pytań między klasami):

```json
{
  "klasa": "klasa-1",
  "kolejnosc": ["bezpieczna-praca", "podstawy-arkusza", "instrukcje-warunkowe", "porownywanie-ofert"],
  "pytania": [
    {
      "id": "lo1-arkusz-001",
      "temat": "podstawy-arkusza",
      "pytanie": "W komórce C7 stoi formuła =B7/$B$4. Jak będzie wyglądać po skopiowaniu do C8?",
      "odpowiedz": "=B8/$B$4 — adres względny przesuwa się o wiersz, bezwzględny $B$4 zostaje.",
      "kod": ""
    }
  ]
}
```

- `kolejnosc` — nazwy plików tematów (bez `.md`) **w kolejności z
  `docs/klasa-N/.nav.yml`**, bez `index` i `wymagania-i-bhp`. Według tej
  kolejności widżet ustala, co jest „poprzednim tematem”, a co
  „dawniejszym”.
- `id` — stałe, unikalne, nigdy nie zmieniane ani nie używane ponownie;
  wzór `lo<klasa>-<skrót tematu>-NNN`.
- `pytanie` — jedno zdanie albo dwa, na odpowiedź w zeszycie w minutę.
  Bez wariantów A–D: uczeń odpowiada sam.
- `odpowiedz` — krótka poprawna odpowiedź i jedno zdanie „dlaczego”.
- `kod` — opcjonalny fragment (formuła arkusza albo kilka wierszy
  Pythona) pokazywany pod pytaniem.

**Zakres pilotażu: po 4–6 pytań do każdego tematu z `kolejnosc`** w obu
klasach (dziś to 4 tematy w klasie 1 i 4 w klasie 2 — sprawdź w `.nav.yml`,
czy się nie zmieniło). Razem około 35–45 pytań.

Zasady treści:

- Pytaj o to, czego **uczy strona tematu** — przeczytaj ją całą, łącznie
  z ramkami „Przewiduj” i „Najczęstsze błędy”. Najlepsze pytania
  rozgrzewki dotykają typowych błędów (np. `>` zamiast `>=`, cudzysłowy
  zamieniające liczbę w tekst, `input()` zwracające napis).
- Mieszaj rodzaje: „co wypisze / co pokaże”, „znajdź błąd”, „dokończ
  formułę”, „wyjaśnij jednym zdaniem”. Najwyżej co trzecie pytanie typu
  „co to jest…”.
- Pytania z istniejących ręcznych rozgrzewek możesz przejąć do banku
  (przypisz je do tematu, którego dotyczą), ale **stron tematów nie
  zmieniaj**.
- **Każdy wynik sprawdź**: kod Pythona uruchom (Python 3.12+), formuły
  arkusza przelicz ręcznie albo w LibreOffice Calc, jeśli masz.
  Odpowiedź przepisz z wyniku, nie z pamięci. Wątpliwe pytania wypisz
  z `id` w „Do sprawdzenia”.
- Nazwy funkcji arkusza po polsku, jak na stronach (`JEŻELI`,
  `LICZ.JEŻELI`), separator argumentów `;`.
- Bez faktów spoza strony tematu (liczby, przepisy, daty). Jeśli pytanie
  ich wymaga — pomiń je.

## 2. Widżet — `docs/assets/js/rozgrzewka-losowa.js`

Znacznik:

```html
<div class="rozgrzewka-losowa" data-klasa="klasa-1"></div>
```

Dwa tryby w zakładkach wewnątrz widżetu:

**„Rozgrzewka na lekcję”**

- Lista rozwijana „Dziś zaczynamy temat:” z tematami z `kolejnosc`
  (tytuły z pierwszego nagłówka strony albo z `.nav.yml` — zapisz je
  w JSON-ie jako `tytuly`, żeby widżet nie musiał czytać innych plików).
- Losuje 3 pytania z tematów **wcześniejszych** niż wybrany:
  1. z tematu bezpośrednio poprzedniego,
  2. z tematu 2–3 pozycje wcześniej,
  3. z dowolnego jeszcze dawniejszego.

  Gdy wcześniejszych tematów jest za mało, dobiera z tych, które są,
  bez powtórzeń; dla pierwszego tematu w kolejności — komunikat, że
  rozgrzewki jeszcze nie ma z czego zrobić.
- Etykiety pytań jak w ręcznej rozgrzewce: **„Z poprzedniej lekcji.”**,
  **„Sprzed kilku tygodni.”**, **„Z dawniejszych tematów.”**
- Odpowiedzi schowane; przycisk „Pokaż odpowiedzi” (wszystkie naraz).
- Przycisk „Losuj inne” — nowy zestaw, bez pytań z poprzedniego
  losowania, dopóki się da.

**„Powtórka przed sprawdzianem”**

- Pola wyboru z tematami i liczba pytań (5 / 10 / wszystkie z wybranych).
- Pytania po kolei, odpowiedź pod przyciskiem przy każdym pytaniu.

Wspólne:

- **Tryb tablicy**: przycisk „Na tablicę” — duża czcionka, widżet na cały
  ekran (Fullscreen API z obsługą braku wsparcia), wyjście klawiszem
  ++esc++ i przyciskiem. Nauczyciel wyświetla rozgrzewkę na projektorze.
- Wygląd spójny z ręczną rozgrzewką: akcent z ramki `rozgrzewka`
  (`--rz-akcent` z `docs/assets/extra.css`), ikona mózgu, oba motywy,
  telefon 375 px bez przewijania strony w bok.
- Pytania z polem `kod` — blok `<pre><code>` (bez podświetlania
  składni, żeby nie dokładać bibliotek).
- Brak localStorage — widżet niczego nie zapamiętuje.
- Dane wczytywane `fetch` z adresu **liczonego raz, przy wczytaniu
  skryptu, jako adres bezwzględny**:
  `new URL('../rozgrzewki/' + klasa + '.json', document.currentScript.src)`
  — `document.currentScript` odczytaj na górze skryptu i zapamiętaj.
- **Serwis ma `navigation.instant`.** Inicjalizacja przez
  `document$.subscribe(start)`, gdy `document$` istnieje (tak startują
  `quiz.js` i `postep.js`), z zabezpieczeniem przed podwójnym
  zbudowaniem tego samego znacznika. W innym serwisie pominięcie tego
  sprawiło, że widżet nie wyświetlał się po przejściu z menu.
- Losowanie przez `Math.random` wystarczy.

Dopisz skrypt na końcu `extra_javascript` w `mkdocs.yml`, z komentarzem
jak przy innych skryptach.

## 3. Gdzie widżet stoi

Na stronach `docs/klasa-1/index.md` i `docs/klasa-2/index.md` **pod**
tabelą spisu tematów dodaj sekcję:

```markdown
## Losowa rozgrzewka i powtórka

Krótki wstęp: do czego służy, że nie jest oceniana, że pytania pochodzą
z tematów tej klasy.

<div class="rozgrzewka-losowa" data-klasa="klasa-1"></div>
```

**Nie zmieniaj tabeli spisu tematów** ani tekstu jej wierszy — pod nimi
przeglądarki uczniów trzymają odhaczony postęp. Nie zmieniaj stron
tematów.

## 4. Kontrola — `narzedzia/sprawdz_rozgrzewki.py`

Bez zależności spoza biblioteki standardowej (`.nav.yml` czytaj prostym
parserem wierszy albo wyrażeniem regularnym — format jest stały). Kod
wyjścia 1 przy błędzie:

- poprawny JSON, wszystkie pola, typy;
- `kolejnosc` zgodna z kolejnością tematów w `docs/klasa-N/.nav.yml`
  (bez `index` i `wymagania-i-bhp`); każdy temat ma swój plik `.md`;
  każdy temat z `.nav.yml` jest w `kolejnosc` (nowy temat bez pytań to
  **ostrzeżenie**, nie błąd);
- `temat` każdego pytania jest w `kolejnosc`;
- unikalne `id` zgodne ze wzorem; brak zdublowanych treści;
- `id` z poprzedniego commita (`git show HEAD:…`): zniknięte —
  ostrzeżenie, użyte ponownie dla innej treści — błąd;
- podsumowanie: liczba pytań na temat, tematy z mniej niż 3 pytaniami.

## 5. Bank rośnie z tematami — `AGENTS.md` i szablony

- W `AGENTS.md`, w sekcji 5, przy punkcie o rozgrzewce, dopisz: **każdy
  nowy albo dostosowywany temat dopisuje 4–6 pytań do
  `docs/assets/rozgrzewki/klasa-N.json`** (i uzupełnia `kolejnosc`
  oraz `tytuly`, jeśli temat jest nowy), potem uruchamia
  `python3 narzedzia/sprawdz_rozgrzewki.py`.
- W sekcji 6 opisz widżet `rozgrzewka-losowa`.
- W sekcji 8 dopisz uruchomienie `sprawdz_rozgrzewki.py`.
- W `narzedzia/prompty/nowy-temat.md` i `dostosuj-temat.md` dopisz jedną
  linię przypominającą o pytaniach do banku rozgrzewek.

Nie zmieniaj `.github/workflows/` ani `.github/scripts/kontrola.py` —
są wspólne dla siedmiu serwisów.

## Czego nie robić

- Nie zmieniaj stron tematów, ręcznych rozgrzewek, quizów, kart pracy
  ani tabel spisu tematów.
- Nie mieszaj pytań klasy 1 i klasy 2.
- Nie dodawaj bibliotek JS ani CDN.

## Zanim oddasz

1. `python3 narzedzia/sprawdz_rozgrzewki.py` — zero błędów; wynik wklej
   do opisu PR.
2. `mkdocs build --strict` — bez ostrzeżeń.
3. W przeglądarce (Playwright/Chromium, jeśli masz): ustaw na czas testu
   `site_url` na adres lokalnego serwera (bez tego `navigation.instant`
   lokalnie się nie włącza), wejdź na stronę startową i **przejdź do
   spisu tematów klasy kliknięciem w menu**, nie przez odświeżenie.
   Widżet musi się zbudować w obu klasach. Wylosuj rozgrzewkę dla
   pierwszego, drugiego i ostatniego tematu, pokaż odpowiedzi, „Losuj
   inne”, powtórkę z dwóch tematów, tryb tablicy. Telefon 375 px i oba
   motywy. Przywróć `site_url` przed commitem.
4. `git status` — tylko pliki z tego zadania.
5. Opis PR z częściami **„Do sprawdzenia”** (każde pytanie, co do którego
   masz wątpliwość — `id` i powód) i **„Dla nauczyciela”** (liczba pytań
   na temat, jak dopisać pytanie, jak uruchomić kontrolę, co trzeba
   zrobić, żeby przenieść widżet do innego serwisu).
