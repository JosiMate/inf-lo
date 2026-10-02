# Zadanie dla Julesa — tryb „Na tablicę” dla ramek i quizu (pilotaż w inf-lo)

Skopiuj wszystko poniżej linii i wklej do Julesa po wybraniu repozytorium
`JosiMate/inf-lo` i gałęzi `main`.

---

Przeczytaj `AGENTS.md` w katalogu głównym repozytorium i postępuj według
niego, szczególnie według sekcji:

- 2 „Zasady pracy”;
- 3 „Język i styl”;
- 6 „Widżety i składnia”;
- 7 „Czego nie ruszać”;
- 8 „Zanim oddasz zmiany”.

To zadanie **wprost pozwala** na:

- dodanie nowego skryptu JS i wpisu w `mkdocs.yml`;
- zmiany w `docs/assets/js/quiz.js`, `docs/assets/js/rozgrzewka-losowa.js` i `docs/assets/extra.css`;
- uzupełnienie `AGENTS.md`.

**Nie zmieniaj żadnego pliku `.md` z tematami.** Całość ma działać na
istniejącym Markdownie. Poza tym obowiązuje wszystko, co jest w `AGENTS.md`.

## Cel

Nauczyciel wyświetla stronę tematu na projektorze. Zwykły widok jest za
drobny: czcionka strony, menu po bokach, ramki wąskie. Widżet losowania
rozgrzewki (`rozgrzewka-losowa.js`) ma już przycisk **„Na tablicę”**.
Włącza on pełny ekran (Fullscreen API), powiększa treść, a zamyka się
przyciskiem „Zamknij” albo klawiszem Escape. Ten sposób rozszerzamy na:

- **A.** wybrane ramki w tematach;
- **B.** quiz „Sprawdź się” w trybie „jedno pytanie naraz”.

To pilotaż w jednym serwisie. Jeśli sprawdzi się na lekcji, przeniesiemy
go do inf-tt, wiai, asso i inf-sb. Pisz kod tak, żeby dało się go
skopiować bez zmian.

## 1. Wspólny tryb tablicy — `docs/assets/js/tablica.js`

Nowy skrypt udostępnia jedną funkcję, np. `window.Tablica.otworz(element, opcje)`, która:

- pokazuje podaną treść w nakładce na cały ekran (`requestFullscreen` na
  nakładce; gdy przeglądarka odmówi, nakładka zostaje jako
  `position: fixed; inset: 0`);
- ma u góry pasek z tytułem i przyciskiem „Zamknij”, a zamyka się też
  Escape'em i wyjściem z pełnego ekranu;
- po zamknięciu przywraca stronę dokładnie do stanu sprzed otwarcia:
  przewinięcie, fokus na przycisku, który otworzył tablicę;
- blokuje przewijanie strony pod nakładką, a sama nakładka przewija się,
  gdy treść jest dłuższa niż ekran;
- powiększa treść: bazowa czcionka około 2× (`clamp(…)` zależny od
  szerokości ekranu), kod i tabele też większe, szerokość treści do
  około 1400 px, wyśrodkowana;
- działa w obu motywach (jasny i `slate`): kolory biorą się ze zmiennych
  Materiala (`--md-default-bg-color`, `--md-default-fg-color` itd.).

**Przepnij `rozgrzewka-losowa.js` na `tablica.js`**, jeśli da się to
zrobić bez zmiany wyglądu i działania jego trybu tablicy. Jeśli to zbyt
ryzykowne, zostaw go bez zmian i napisz o tym w opisie PR.

Skrypt startuje jak pozostałe widżety:

- przez `document$.subscribe(start)`, gdy `document$` istnieje, z ochroną
  przed podwójnym zbudowaniem (np. `dataset.tablicaGotowa`);
- serwis ma `navigation.instant`, więc bez tego przyciski znikną po
  przejściu z menu.

Wzoruj się na `docs/assets/js/podpowiedzi.js` i `docs/assets/js/kroki.js`.

## 2. Część A — ikonka „Na tablicę” przy ramkach

Skrypt sam dokłada mały przycisk „Na tablicę” (ikonka ekranu z napisem
lub dymkiem `title`) w prawym górnym rogu tytułu ramki. Dotyczy to tylko
tych ramek na stronach tematów:

| Ramka | Jak ją rozpoznać |
|---|---|
| Rozgrzewka | `.admonition.rozgrzewka` / `details.rozgrzewka` |
| Kryteria sukcesu | typ `success`, tytuł zaczyna się od „Kryteria sukcesu” |
| Ćwiczenie | typ `note`, tytuł zaczyna się od „Ćwiczenie” |
| Przewiduj | blok kodu z konsolą, po którym stoi `??? success "Przewiduj…"` |
| Krok po kroku | `.kroki` |

Zasady:

- **Tylko ramki najwyższego poziomu**, czyli niezagnieżdżone w innej
  ramce. Podpowiedzi, „Odpowiedzi” w rozgrzewce i „Przewiduj” w ćwiczeniu
  nie dostają własnej ikonki: jadą na tablicę razem z ramką nadrzędną.
- **„Przewiduj”**: na tablicę trafia przykład (blok kodu nad ramką)
  razem z ramką „Przewiduj…” pod nim. **Wynik ma pozostać zwinięty.**
  Nauczyciel odsłania go klikiem, gdy klasa już przewidziała.
- **Wszystkie zwinięte bloki** (`details`) wewnątrz ramki zostają na
  tablicy zwinięte i dają się rozwijać klikiem. Dotyczy to odpowiedzi w
  rozgrzewce, podpowiedzi i wyniku „Przewiduj”. Podpowiedzi
  (`podpowiedzi.js`) i kroki (`kroki.js`) mają na tablicy działać tak samo
  jak na stronie, łącznie z przyciskami „Pokaż podpowiedź / krok”.
- Na tablicę idzie **klon** ramki (`cloneNode(true)`), żeby nie ruszać
  strony. Jeśli klonowanie psuje podpowiedzi lub kroki (np. zdarzenia
  przypięte do oryginału), wymyśl bezpieczne rozwiązanie, np. przenieś
  oryginał do nakładki i odłóż go na miejsce po zamknięciu. Opisz wybór w
  PR.
- **Konsola Pythona** (`.py-konsola`) w klonie nie musi działać. Na
  tablicy wystarczy kod przykładu, więc konsolę w klonie ukryj.
- Kliknięcie ikonki **nie może** zwijać ani rozwijać ramki, przy której
  stoi: `stopPropagation` i `preventDefault` na `summary`.
- Ikonka **nie drukuje się** (`@media print`) i jest wygodna do kliknięcia
  na telefonie, ale nie zasłania tytułu przy 375 px szerokości.

## 3. Część B — quiz „Sprawdź się” na tablicę

Quiz (`docs/assets/js/quiz.js`) bierze pytania z
`<script type="application/json">` wewnątrz `<div class="quiz">`. Są dwa
rodzaje pytań:

- **zamknięte**: `opcje` (tablica) i `poprawna` (indeks);
- **otwarte**: `odpowiedz` (lista dopuszczalnych odpowiedzi).

Oba mają `pytanie` i `wyjasnienie`.

Nad quizem dodaj przycisk **„Na tablicę”** (w stylu `.pdp-przycisk`,
jak „Pokaż podpowiedź”). Otwiera on tryb tablicy z jednym pytaniem
naraz:

- u góry „Pytanie 3 z 10”, pod spodem treść pytania dużą czcionką;
- **pytanie zamknięte**: odpowiedzi jako duże kafelki z literami
  **A, B, C, D** (klasa pokazuje literę palcami albo kartką);
- **pytanie otwarte**: tylko treść i pusta przestrzeń, bez pola do
  wpisywania;
- przycisk **„Pokaż odpowiedź”**:
  - pytanie zamknięte: wyróżnia poprawny kafelek, przyciemnia pozostałe i
    pokazuje `wyjasnienie`;
  - pytanie otwarte: pokazuje pierwszą odpowiedź z listy `odpowiedz` i
    `wyjasnienie`;
- przyciski **„Poprzednie”** i **„Następne”**;
- klawiatura (i pilot do prezentacji, który wysyła te same klawisze):
  - strzałki ← → oraz PageUp/PageDown: zmiana pytania;
  - spacja lub Enter: „Pokaż odpowiedź”;
  - Escape: zamknięcie;
- tryb tablicy **nie liczy punktów** i nie zmienia stanu quizu na stronie.
  Po zamknięciu quiz na stronie wygląda tak samo jak przed otwarciem.

Kod trybu tablicy quizu może być w `quiz.js` albo w `tablica.js`. Wybierz
prostsze rozwiązanie, które po skopiowaniu do innych serwisów nie wymaga
zmian. Nie zmieniaj formatu danych quizu.

**Długie odpowiedzi** (formuły arkusza, kod) nie mogą rozpychać ekranu
w poziomie. Zawijaj je (`overflow-wrap: anywhere`, `min-width: 0` w
elementach flex) tak, jak to już jest w `.qz-opcja > span`.

## 4. CSS

Wszystkie nowe style dopisz w **`docs/assets/extra.css`**, w nowej,
podpisanej sekcji „tryb Na tablicę”. **Nie zmieniaj
`docs/stylesheets/extra.css`**: ten plik jest wspólny dla pięciu serwisów
i nauczyciel synchronizuje go sam.

- Klasy z przedrostkiem `tb-` (np. `.tb-nakladka`, `.tb-ikona`,
  `.tb-kafelek`).
- Używaj istniejących zmiennych: `--ui-akcent`, `--ui-promien`,
  `--ui-promien-maly`. Przyciski wyglądają jak `.pdp-przycisk`.
- Kafelki A–D: duża litera w kółku po lewej (jak kółka kroków w
  `.kroki`), treść po prawej. Poprawny kafelek po „Pokaż odpowiedź” ma
  zielony akcent, pozostałe są przygaszone (`opacity`), ale czytelne.
- Sprawdź oba motywy (jasny i `slate`) oraz kontrast tekstu na projektorze:
  bez cienkich, jasnoszarych napisów.

## 5. Dokumentacja — `AGENTS.md`

W sekcji 6 „Widżety i składnia” dopisz podsekcję **„Tryb »Na tablicę«
(`tablica.js`)”**. Ma zawierać:

- które ramki dostają ikonkę i jak skrypt je rozpoznaje;
- że autor tematu **niczego nie dopisuje** w Markdownie, a ikonka pojawi
  się sama, gdy temat trzyma się standardowych tytułów („Kryteria
  sukcesu…”, „Ćwiczenie…”, „Przewiduj…”);
- jak działa tablica przy quizie (klawisze).

## 6. Sprawdzenie

1. `mkdocs build --strict` bez ostrzeżeń.
2. Test w przeglądarce (Playwright albo ręcznie) na
   `klasa-1/instrukcje-warunkowe/` i `klasa-2/podstawy-pythona/`:
   - wejście **przez kliknięcie w menu** z innej strony, nie przez
     bezpośredni adres; ikonki i przycisk quizu muszą się pojawić. Lokalnie
     ustaw na czas testu `site_url` na adres lokalnego serwera, inaczej
     `navigation.instant` się nie włączy. **Nie commituj tej zmiany.**
   - po kolejnym przejściu z menu i powrocie nie ma podwójnych ikonek;
   - otwarcie i zamknięcie każdego rodzaju ramki: wynik „Przewiduj” i
     odpowiedzi rozgrzewki zwinięte do kliknięcia; podpowiedzi i kroki
     działają; po zamknięciu strona jak przedtem;
   - quiz: przejście przez wszystkie pytania strzałkami, „Pokaż
     odpowiedź” spacją, zamknięcie Escape'em, potem zwykłe rozwiązywanie
     quizu na stronie działa i liczy punkty;
   - szerokość 375 px (telefon): brak poziomego przewijania strony
     (`document.documentElement.scrollWidth <= 375`);
   - szerokość 1920 × 1080 (projektor): zrzuty ekranu tablicy w obu
     motywach. **Dołącz je do opisu PR.**
3. Losowanie rozgrzewki (`rozgrzewka-losowa.js`) nadal działa w trybie
   „Na tablicę”.
4. Wydruk strony (`emulateMedia({ media: 'print' })`) nie pokazuje ikonek
   ani przycisku „Na tablicę”.

## 7. Opis PR

Po polsku:

- co dodałeś i lista zmienionych plików;
- zrzuty ekranu z punktu 6;
- **„Decyzje”**: klon czy przenoszenie ramki; tryb quizu w `quiz.js` czy w
  `tablica.js`; czy rozgrzewka korzysta już z `tablica.js`;
- **„Dla nauczyciela”**: które pliki trzeba będzie skopiować do
  pozostałych serwisów i jakie wpisy dodać w ich `mkdocs.yml`.
