# AGENTS.md — instrukcja dla agenta (Jules) · serwis inf-lo (informatyka, liceum)

Ten plik czytasz przed każdym zadaniem w tym repozytorium. Opisuje, jak ten
serwis jest zbudowany i jak dodawać do niego materiały tak, żeby wyglądały
i działały jak reszta. Jeśli polecenie w zadaniu jest sprzeczne z tym plikiem,
wykonaj polecenie z zadania, a sprzeczność opisz w opisie zmian (PR).

## 1. Co to jest i dla kogo piszesz

Serwis **inf-lo** — informatyka w liceum, **zakres podstawowy**, klasy
**1A** i **2LOA**, 1 godzina tygodniowo. Podręcznik: „Informatyka. Nowa
edycja” (WSiP). Programowanie w **Pythonie**, uruchamianym **w przeglądarce**
(Pyodide — konsola na stronie tematu; zapasowo online-python.com). Uczniowie
nie instalują niczego. Tematy odwołują się do podstawy programowej
(np. **I.1, I.2.b, II.1**).

- **Autor i odbiorca.** Materiały przygotowuje nauczyciel informatyki
  w PCEiKZ Szczucin. Czyta je **uczeń**, nie programista i nie nauczyciel.
- **Publikacja.** MkDocs Material na GitHub Pages; każdy push na `main`
  uruchamia `.github/workflows/deploy.yml`, który buduje stronę z
  `mkdocs build --strict` — każde ostrzeżenie zatrzymuje publikację.
- **Repozytorium jest publiczne.** Wszystko, co zapiszesz w repozytorium
  i w opisie PR, mogą przeczytać uczniowie.

## 2. Zasady pracy

1. **Najpierw przeczytaj wzorce** wskazane w sekcji 4 i odwzoruj ich
   konwencje — nagłówki, typy ramek, kolejność sekcji, format tabel i JSON.
   Nie wymyślaj własnej struktury.
2. **Zmieniaj tylko to, czego wymaga zadanie.** Nie przebudowuj istniejących
   tematów, motywu, `mkdocs.yml`, skryptów JS ani stylów, jeśli zadanie tego
   nie mówi wprost.
3. **Nic dla nauczyciela nie trafia do repozytorium ani do opisu PR:**
   rozwiązania i klucze do prac **oddawanych do oceny** (karty pracy,
   szkielety ćwiczeń oddawane z kartą, sprawdziany, prace klasowe) oraz
   scenariusze lekcji. Rozwiązania sprawdzaj w katalogu **poza
   repozytorium** (np. `/tmp/rozwiazania/`), a przed otwarciem PR uruchom
   `git status` i upewnij się, że żaden taki plik się nie dostał.
   Na stronie zostają celowo: trzecia, ostatnia podpowiedź pod ćwiczeniem
   (prawie gotowe rozwiązanie) i omówienia przykładów w ramkach „Przewiduj”.
4. **Nie zmyślaj faktów.** Liczby, wersje programów, daty, przepisy, limity
   i nazwy opcji podawaj tylko wtedy, gdy są w zadaniu, w repozytorium albo
   masz pewne źródło. W razie wątpliwości pisz opisowo i wypisz takie miejsca
   w opisie PR w części „Do sprawdzenia”. Fakty podane w zadaniu przez
   nauczyciela są sprawdzone — użyj ich dosłownie.
5. **Każdy wynik na stronie musi być prawdziwy.** Kod z przykładów
   i ćwiczeń uruchom, a wyniki w ramkach „Przewiduj” przepisz z uruchomienia,
   nie z pamięci.
6. **Końce linii pilnuje `.gitattributes`** (`* text=auto`): w repozytorium
   każdy plik tekstowy ma LF. Zapisuj pliki w UTF-8, z LF i pustym wierszem
   na końcu. Nie przepisuj całych plików — w diffie ma być widać tylko twoje
   zmiany.
7. **Stabilne identyfikatory.** Nie zmieniaj istniejących `id` pól w kartach
   pracy, nazw plików kart (`data-karta`) ani tekstu wierszy w spisach
   tematów — przeglądarki uczniów trzymają pod nimi zapisane odpowiedzi
   i odhaczone tematy. Zmiana kasuje uczniom ich pracę.

## 3. Język i styl

- Po polsku, do ucznia per „ty”. Rzeczowo i konkretnie: zdanie niesie
  informację albo go nie ma. Bez „warto pamiętać, że”, „w dzisiejszych
  czasach”, zachwytów nad technologią i emoji.
- Najpierw problem z życia albo z egzaminu, potem pojęcie. Przykłady
  z codzienności ucznia i z zawodu.
- Polskie cudzysłowy „…”, pauza — w zdaniach, półpauza – w zakresach
  (1–3). Klawisze zapisuj rozszerzeniem `pymdownx.keys`: `++ctrl+c++`.
- Tabele chętnie — przy porównaniach niosą więcej niż akapit.
- Każda ramka (admonicja) ma tytuł w cudzysłowie, treść wciętą 4 spacjami.

## 4. Budowa repozytorium i dodawanie tematu

| Katalog | Oddział | Uwagi |
| --- | --- | --- |
| `docs/klasa-1/` | 1A | informatyka, zakres podstawowy, 1 godz. tygodniowo |
| `docs/klasa-2/` | 2LOA | jw.; programowanie w Pythonie |

### Wzorce — przeczytaj przed pisaniem

1. `docs/klasa-2/wyszukiwanie-wzorca.md` — **pełny standard**: rozgrzewka,
   kryteria sukcesu, konsole z „Przewiduj”, ćwiczenia z testami
   i podpowiedziami, quiz, karta pracy, stopka.
2. `docs/assets/karty/wyszukiwanie-wzorca.json` — wzorzec karty pracy.
3. `docs/klasa-2/index.md` — spis tematów klasy (wiersze „gotowe” i „w przygotowaniu”).
4. `docs/klasa-2/.nav.yml` — nawigacja.

Tytuł ramki kryteriów sukcesu we wzorcu: `!!! success "Kryteria sukcesu — sprawdź się na koniec lekcji"` z wierszem „Po tej lekcji:”. Pod kryteriami wzorce
mają ramkę `!!! tip "Przykłady uruchomisz na tej stronie"` (▶ Uruchom,
++ctrl+enter++, ✓ Sprawdź) — dodaj ją w każdym temacie z konsolą.

### Pliki, które zmieniasz przy nowym temacie

- `docs/klasa-N/<plik>.md` — strona tematu. Nazwa: małe litery ASCII bez
  polskich znaków, słowa łączone myślnikiem (`funkcje-obliczeniowe.md`).
  Ta sama nazwa (`<plik>`) służy karcie pracy i atrybutowi `data-karta`.
- `docs/klasa-N/.nav.yml` — dopisz wiersz `  - "Krótki tytuł": <plik>.md`
  w odpowiednim miejscu listy `nav:`.
- `docs/klasa-N/index.md` — w tabeli działu zamień wiersz
  `| Tytuł | 1 | *w przygotowaniu* |` na
  `| **[Tytuł](<plik>.md)** | 1 | :material-check-circle:{ title="Materiał gotowy" } gotowe |`
  (kolumnę godzin zostaw bez zmian).
  **Tekstu tytułu nie zmieniaj** — pod nim przeglądarki uczniów pamiętają
  odhaczone tematy.
- `docs/index.md` — na kafelku klasy popraw licznik „gotowe N materiałów”:
  **policz** wiersze „gotowe” w spisie klasy (licznik bywa nieaktualny)
  i odmień słowo („gotowe 1 materiał”, „2–4 materiały”, „5 materiałów”).
- `docs/assets/karty/<plik>.json` — karta pracy (niżej).
- `docs/karty/index.md` — dopisz obiekt do tablicy JSON w
  `<div class="kp-przeglad">`:
  `{"plik": "<plik>", "tytul": "Klasa N · <tytuł>", "url": "../klasa-N/<plik>/#karta"}`.
- `docs/pliki/python-<temat>-2loa.py` — szkielet ćwiczeń do pobrania
  (jeśli temat ma ćwiczenia programistyczne). Ściągę `.docx` przygotowuje
  nauczyciel — wpisz ją w opisie PR w części „Dla nauczyciela”.
- `mkdocs.yml` i `docs/assets/` zmieniasz **tylko**, gdy zadanie każe dodać
  nowy widżet. Nowy skrypt musi startować przez
  `if (typeof document$ !== "undefined") document$.subscribe(start)` (włączone
  `navigation.instant`) i dopisuje się go do `extra_javascript`.

### Karta pracy — `docs/assets/karty/<plik>.json`

```json
{
 "id": "inf-lo-<plik>",
 "tytul": "<tytuł tematu>",
 "przedmiot": "PCEiKZ Szczucin · informatyka, zakres podstawowy · klasa 2",
 "klasa": "2LOA",
 "sufiks": "<KROTKI-SUFIKS>",
 "zadania": [
  {
   "nr": 1,
   "tytul": "…",
   "poziom": "wymagania konieczne · ocena 2",
   "polecenie": "Ćwiczenie 1. … (dozwolony HTML: <code>, <em>)",
   "pola": [
    {"typ": "tabela", "wiersze": [["z1_wynik", "Etykieta wiersza", "podpowiedź w polu"]]},
    {"typ": "tekst", "id": "z1_czemu", "wiersze": 3, "pytanie": "…"},
    {"typ": "wybor", "id": "z1_wybor", "pytanie": "…", "opcje": ["…", "…"]},
    {"typ": "zrzut", "id": "z1_zrzut", "opis": "co ma być na zrzucie"}
   ]
  }
 ]
}
```

- `poziom`: `wymagania konieczne · ocena 2`, `wymagania podstawowe · ocena 3`,
  `wymagania rozszerzające · ocena 4`, `wymagania dopełniające · ocena 5`
  albo łączone (`wymagania podstawowe i rozszerzające · oceny 3–4`).
- `id` pól: `z<nr zadania>_<nazwa>`. Liczbę zadań i zakończenie karty
  (zadanie na ocenę 5 albo samoocena) wzoruj na karcie wzorcowej.
  Pola `idPoprzedni` w nowych kartach nie ma.
- Wcięcie JSON: 1 spacja. Plik Worda z karty nazywa się
  `<klasa>_<nr>_<sufiks>.docx`.

### Zadania na ocenę celującą

Są **działowe**, nie tematyczne: `narzedzia/zadania6.json` (klucz = dokładny
nagłówek `### Dział …` ze spisu klasy). Blok między `<!-- zadania6:start -->`
a `<!-- zadania6:end -->` w `docs/klasa-N/index.md` jest generowany —
**nie edytuj go ręcznie**. Zmieniasz go tylko na polecenie: edytujesz JSON
i uruchamiasz `python3 narzedzia/zadania6.py docs/klasa-N/index.md`.
Skrypt zapisuje plik z końcami LF — jeśli plik miał CRLF, przywróć je.

## 5. Standard tematu — obowiązuje każdy nowy temat

Elementy w tej kolejności, od góry strony:

1. **Tytuł** `# …` — jak w rozkładzie materiału (spis tematów), może być
   lekko skrócony.
2. **„O tym temacie”** — `!!! abstract "O tym temacie"`: liczba godzin ·
   dział · efekty kształcenia albo podstawa programowa, potem 1–2 akapity:
   po co ten temat, z czym się łączy. W temacie na **2 i więcej godzin** plan
   lekcji jest **zwiniętym blokiem wewnątrz** tej ramki (ramka zostaje
   otwarta):

   ```markdown
   !!! abstract "O tym temacie"

       **3 godziny lekcyjne** · Dział … · efekty kształcenia **…**

       Akapit o tym, po co jest ten temat.

       ??? abstract "Plan trzech lekcji"

           | Lekcja | Sekcje | Ćwiczenia |
           | :---: | --- | --- |
           | 1 | 1–3: … | 1–2 |
   ```

3. **Rozgrzewka** — zwinięta ramka z trzema pytaniami na przypomnienie,
   **bez oceny**. Zastępuje bilety wyjścia (wyjściówek nie dodajemy nigdzie).
   Dokładnie ten układ:

   ```markdown
   ??? rozgrzewka "Na rozgrzewkę — 3 minuty, bez zaglądania"

       Odpowiedz w zeszycie, zanim zaczniesz nowy temat. Odpowiedzi rozwiń
       dopiero wtedy, gdy wszyscy skończą — nie liczą się do oceny.

       1. **Z poprzedniej lekcji.** …
       2. **Sprzed kilku tygodni.** …
       3. **Z dawniejszych tematów.** …

       ??? success "Odpowiedzi"

           1. …
           2. …
           3. …
   ```

   - Pytanie 1 dotyczy **poprzedniego tematu tej samej klasy**, pytanie 2 —
     tematu sprzed kilku tygodni, pytanie 3 — dawniejszego (wcześniejszy
     dział, poprzedni rok, inny przedmiot tej klasy). Kolejność tematów
     odczytasz ze spisu tematów i z `.nav.yml` — **przeczytaj te strony**,
     zanim ułożysz pytania.
   - Pytania krótkie, z jednoznaczną odpowiedzią (wynik, liczba, nazwa,
     jedno zdanie). Najlepiej takie, które przygotowują dzisiejszy temat —
     odpowiedź może się kończyć zdaniem „dziś do tego wrócimy”.
   - Każdy nowy albo dostosowywany temat dopisuje 4–6 pytań do
     `docs/assets/rozgrzewki/klasa-N.json` (i uzupełnia `kolejnosc` oraz `tytuly`,
     jeśli temat jest nowy), po czym uruchamia `python3 narzedzia/sprawdz_rozgrzewki.py`.
4. **Kryteria sukcesu** — `!!! success` z listą numerowaną, pisaną językiem
   ucznia, w pierwszej osobie czasu przyszłego: „Napiszę…”, „Wyjaśnię…”,
   „Rozpoznam…”, „Dobiorę…”. Od 4 do 7 punktów, każdy do sprawdzenia
   w ćwiczeniach albo w karcie pracy. Dokładny tytuł ramki — jak we
   wzorcu z sekcji 4.
5. **Sekcje treści** `## 1. …`, `## 2. …` (separatory `---` między nimi —
   tak jak we wzorcu tego repozytorium). Na końcu treści zestawienie
   najczęstszych błędów (objaw, przyczyna, co zrobić) — w formie, jakiej
   używa wzorzec (tabela albo ramka `!!! warning`).
6. **„Przewiduj, potem sprawdź”** — wynik przykładu nigdy nie stoi na
   widoku przed pytaniem. Uczeń najpierw przewiduje, potem odsłania wynik
   w zwiniętej ramce. Składnia — sekcja 6.
7. **Ćwiczenia** (`## Ćwiczenia`) — od łatwych do trudnych; napisz, które
   są minimum dla wszystkich, a które na wyższą ocenę. Pod trudniejszymi
   ćwiczeniami **trzy stopniowane podpowiedzi**:

   ```markdown
   ??? tip "Podpowiedź 1"

       Kierunek: od czego zacząć, o co zapytać.

   ??? tip "Podpowiedź 2"

       Konkretne narzędzie: funkcja, polecenie, konstrukcja.

   ??? tip "Podpowiedź 3"

       Prawie gotowe rozwiązanie z jednym zdaniem wyjaśnienia.
   ```

8. **„Sprawdź się”** — quiz z natychmiastową odpowiedzią (7–8 pytań), składnia
   w sekcji 6. Każde `wyjasnienie` mówi, dlaczego poprawna odpowiedź jest
   poprawna, a kusząca błędna — błędna.
9. **Karta pracy** i sposób oddania — jak we wzorcu (sekcja 4 i 6).
   Prace oddaje się przez **Zadania domowe w dzienniku VULCAN**, termin —
   najbliższa lekcja.
10. **Zakończenie strony** jak we wzorcu tego repozytorium (stopka kursywą
    ze źródłami i datą sprawdzenia albo odsyłacze do sąsiednich tematów
    i „Materiały uzupełniające”).

Scenariusz lekcji w Wordzie należy do standardu, ale przygotowuje go
nauczyciel **poza repozytorium** — nie twórz go tutaj.

### Dostosowanie istniejącego tematu do standardu

Tylko wtedy, gdy zadanie o to prosi. Dodajesz brakujące elementy (rozgrzewka,
kryteria sukcesu zamiast „Cele lekcji”, ramki „Przewiduj” wokół wyników,
podpowiedzi pod trudniejszymi ćwiczeniami), **nie przepisujesz** reszty.
Nie zmieniaj numeracji ćwiczeń ani `id` pól w karcie pracy — uczniowie mogą
mieć już zapisane odpowiedzi.

## 6. Widżety i składnia

### Konsola Pythona na stronie (Pyodide, Python 3.14)

Pusty znacznik **bezpośrednio pod** blokiem ```` ```python ````. Konsola bierze
kod z bloku nad sobą, uczeń go uruchamia i zmienia:

````markdown
```python
imie = input()
print("Cześć,", imie)
```

<div class="py-konsola" data-wejscie="Ola"></div>
````

- `data-wejscie="2&#10;3"` — dane dla `input()`, kolejne wiersze przez `&#10;`;
- `data-nazwa="temat-cw1.py"` — dodaje przycisk „⤓ Zapisz .py”;
- `data-plik="../../pliki/x-szkielet.py"` — kod z pliku zamiast z bloku
  (ścieżka względem adresu strony, stąd `../../`);
- w ramce (np. w ćwiczeniu) znacznik jest wcięty 4 spacjami jak reszta treści;
- program działający dłużej niż 10 s jest przerywany.

**Testy do ćwiczenia** (przycisk ✓ Sprawdź) — skrypt JSON wewnątrz znacznika:

```html
<div class="py-konsola" data-nazwa="temat-cw2.py"><script type="application/json" class="py-testy">[
 {"wejscie": "3\n4", "wynik": "7"},
 {"kod": "print(pole(3, 4))", "wynik": "12", "opis": "prostokąt 3 × 4", "pokaz": "pole(3, 4)"}
]</script></div>
```

- `{wejscie, wynik}` — uruchamia cały program z podanym wejściem i porównuje
  wypisany tekst (w JSON kolejne wiersze wejścia rozdziela `\n`; encja
  `&#10;` działa tylko w atrybucie `data-wejscie`);
- `{kod, wynik, opis?, pokaz?}` — do sprawdzania funkcji: program ucznia
  wykonuje się po cichu, potem `kod` w tej samej przestrzeni nazw;
  porównywane jest tylko to, co wypisał `kod`. `pokaz` — co zobaczy uczeń
  zamiast kodu, `opis` — słowo przed nim;
- porównanie ignoruje nadmiarowe odstępy, liczby porównuje po wartości;
- program ucznia działa z `__name__ == "__main__"`.

**Obowiązkowo sprawdź testy:** szkielet ćwiczenia (z `# TODO`) **nie może**
ich przechodzić, a twoje rozwiązanie (którego nie commitujesz) — musi.
Uruchom to lokalnie zwykłym `python3`; unikaj składni nowszej niż 3.12,
bo część uczniów pracuje też w online-python.com.

### Ćwiczenie w ramce

````markdown
!!! note "Ćwiczenie 2. Tytuł"

    Treść polecenia: co ma robić funkcja, jakie dane, jaki wynik.

    ```python
    def pole(a, b):
        # TODO
        pass
    ```

    <div class="py-konsola" data-nazwa="temat-cw2.py"><script type="application/json" class="py-testy">[…]</script></div>

    ??? tip "Podpowiedź 1"

        …
````

Podpowiedzi są wcięte razem z resztą ćwiczenia.

### „Przewiduj, potem sprawdź wynik” — przy przykładach z konsolą

````markdown
```python
print("3" + "4")
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    34
    ```
````

### Wizualizator wyszukiwania wzorca (`wzorzec.js`)

```html
<div class="wzorzec-wiz" markdown="0">
<script type="application/json">
{ "tekst": "ABRAKADABRA", "wzorzec": "ABRA", "tryby": ["naiwny"] }
</script>
</div>
```

### Widżet losowej rozgrzewki i powtórki (`rozgrzewka-losowa.js`)

```html
<div class="rozgrzewka-losowa" data-klasa="klasa-1"></div>
```

Widżet ładuje pytań z `docs/assets/rozgrzewki/klasa-N.json` zawierającego pola `klasa`, `kolejnosc`, `tytuly` oraz tablicę obiektów `pytania` (`id`, `temat`, `pytanie`, `odpowiedz`, opcjonalnie `kod`).

### Quiz „Sprawdź się”

```html
<div class="quiz" markdown="0">
<script type="application/json">
[
 {
  "pytanie": "…",
  "opcje": ["…", "…", "…", "…"],
  "poprawna": 1,
  "wyjasnienie": "…"
 },
 {
  "pytanie": "Pytanie z odpowiedzią wpisywaną",
  "odpowiedz": ["wariant 1", "wariant 2"],
  "wyjasnienie": "…"
 }
]
</script>
</div>
```

`poprawna` liczy się od 0. `odpowiedz` porównywana jest bez wielkości liter,
polskich znaków i interpunkcji. Klucz `"typ"` jest ignorowany — nie dodawaj go.

### Karta pracy na stronie tematu

```markdown
## Karta pracy

Wypełnij kartę na tej stronie, a potem pobierz gotowy dokument Worda i oddaj
go przez **Zadania domowe w dzienniku VULCAN**. Do zrzutów ekranu wystarczy
klawisz ++print-screen++ albo ++win+shift+s++.

<div class="kp-podsumowanie" data-karta="<plik>"></div>

<span id="karta" class="kp-kotwica"></span>

???+ karta "Rozwiń kartę pracy"

    <div class="karta-pracy" data-karta="<plik>"></div>
```

Strony mogą odsyłać do zadania karty: `#zadanie-3` (kotwice powstają
w przeglądarce; ich sprawdzanie jest wyłączone w `mkdocs.yml`).

### Przyciski do pobierania plików

```markdown
[:material-language-python: Szkielet ćwiczeń (.py)](../pliki/python-<temat>-2loa.py){ .md-button .md-button--primary download="python-<temat>-2loa.py" }
```

Nazwa pliku w odnośniku musi być dokładnie nazwą pliku w `docs/pliki/` —
inaczej `mkdocs build --strict` zatrzyma się na martwym odnośniku.

## 7. Czego nie ruszać

- `Claude outputs/` — stary katalog roboczy z kluczami odpowiedzi; nic do
  niego nie dodawaj i niczego z niego nie przenoś do `docs/`.
- `docs/assets/pyodide/` — dołączony interpreter; nie edytuj.
- `docs/assets/js/docx.umd.js` — biblioteka (1,1 MB), ładowana leniwie;
  nie dopisuj jej do `extra_javascript`.
- `qr/`, `site/`, `docs/pliki/*.docx` (gotowe dokumenty nauczyciela).
- Rozwiązania wzorcowe szkieletów (`*-rozwiazanie*.py`) — nigdy w repozytorium.

## 8. Zanim oddasz zmiany

1. `pip install -r requirements.txt` i `mkdocs build --strict` — **bez
   ostrzeżeń**. Martwy link albo plik poza nawigacją też jest błędem.
2. Każdy JSON jest poprawny: karta pracy (`python3 -m json.tool plik.json`)
   i tablica quizu wewnątrz strony (wytnij ją i sprawdź tak samo).
3. Kod z przykładów i ćwiczeń uruchomiony; wyniki na stronie zgadzają się
   z uruchomieniem.
   Szkielety ćwiczeń nie przechodzą testów konsoli, rozwiązania (lokalne,
   niecommitowane) przechodzą wszystkie.
4. `python3 narzedzia/sprawdz_rozgrzewki.py` — zero błędów.
5. Lista kontrolna standardu — każdy punkt odhacz w opisie PR:
   - [ ] „O tym temacie” (+ zwinięty plan lekcji, jeśli temat ma 2+ godziny)
   - [ ] rozgrzewka: 3 pytania (poprzednia lekcja / kilka tygodni / dawniej) z odpowiedziami
   - [ ] kryteria sukcesu w pierwszej osobie
   - [ ] „Przewiduj” — żaden wynik nie stoi na widoku przed pytaniem
   - [ ] trzy podpowiedzi pod trudniejszymi ćwiczeniami
   - [ ] quiz, karta pracy, sposób oddania, zakończenie strony
   - [ ] spis tematów i nawigacja zaktualizowane
   - [ ] `git status`: w zmianach nie ma rozwiązań, kluczy, scenariuszy ani plików tymczasowych
6. **Opis PR** po polsku: co dodałeś, lista zmienionych plików, część
   „Do sprawdzenia” (fakty, których nie byłeś pewien) i część „Dla
   nauczyciela” (np. pliki do przygotowania ręcznie, jak ściąga .docx).
   Nie wklejaj do opisu rozwiązań — repozytorium jest publiczne.
