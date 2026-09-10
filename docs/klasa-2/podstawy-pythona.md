# Podstawy pracy w środowisku Python

!!! abstract "O tym temacie"

    **1 godzina lekcyjna** · Dział II. Algorytmika i programowanie w Pythonie
    · podstawa programowa **I.1, I.3, II.1**

    Pierwsza lekcja programowania nie jest o algorytmach — jest o tym, żeby
    komputer w ogóle zrobił to, co napisałeś. Uruchomienie programu, wypisanie
    wyniku, wczytanie danych od użytkownika i **przeczytanie komunikatu
    o błędzie zamiast zgadywania**. Na tym stoi wszystko, co będzie dalej.

!!! success "Cele lekcji"

    Po tej lekcji potrafisz:

    1. uruchomić program w środowisku Pythona i zapisać swoją pracę jako plik `.py`
    2. odróżnić tryb interaktywny (konsolę) od skryptu i wiedzieć, kiedy który jest wygodniejszy
    3. wypisać dane na ekran instrukcją `print()` i wczytać je instrukcją `input()`
    4. utworzyć zmienną, rozpoznać typ `int`, `float` i `str` oraz przekształcić jeden w drugi
    5. użyć operatorów arytmetycznych, w tym `//`, `%` i `**`
    6. odczytać komunikat o błędzie: wskazać numer wiersza i rodzaj błędu, a potem go poprawić
    7. opisać kod komentarzem

## 1. Środowisko — startujemy w przeglądarce

Pracujemy w **[online-python.com](https://www.online-python.com/)**. Nie trzeba
się logować ani niczego instalować, więc ten sam program uruchomisz w pracowni,
na telefonie i na domowym komputerze.

| Co chcesz zrobić | Jak |
| --- | --- |
| uruchomić program | przycisk **Run** albo ++f8++ / ++ctrl+enter++ |
| zobaczyć wynik | okno **konsoli** pod edytorem |
| wpisać dane dla `input()` | klikasz w konsolę i piszesz, na koniec ++enter++ |
| zapisać pracę | ++ctrl+s++ albo ++f10++ — plik `.py` ląduje w folderze *Pobrane* |

!!! danger "Ta strona nie pamięta twojej pracy"

    Zamknięcie karty przeglądarki kasuje kod. **Pobierz plik `.py` na koniec
    lekcji** — inaczej za tydzień zaczniesz od pustego okna. Plik z kodem
    Pythona to zwykły tekst; otworzysz go w każdym edytorze, także w Notatniku.

W domu możesz pracować tak samo w przeglądarce albo zainstalować Pythona
z [python.org](https://www.python.org/downloads/) — instalator przynosi ze sobą
środowisko **IDLE**, w którym działa dokładnie ten sam kod. Wersja
w przeglądarce to Python 3.12, najnowsza do pobrania to 3.14; dla wszystkiego,
czego uczymy się w tym roku, różnicy nie ma.

## 2. Dwa tryby pracy

=== "Konsola (tryb interaktywny)"

    Piszesz jedno polecenie, wciskasz ++enter++ i **od razu widzisz odpowiedź**.
    Znak zachęty `>>>` oznacza: „czekam na polecenie”.

    ```text
    >>> 2 + 2
    4
    >>> 7 / 2
    3.5
    ```

    Do czego to służy: sprawdzić, ile wyjdzie, przypomnieć sobie, jak działa
    jakaś instrukcja, przetestować jeden wiersz. Nic się nie zapisuje.

=== "Skrypt (plik `.py`)"

    Piszesz cały program w edytorze i uruchamiasz go w całości. Wiersze
    wykonują się **po kolei, od góry do dołu**.

    ```python
    print(2 + 2)
    print(7 / 2)
    ```

    Do czego to służy: do wszystkiego, co ma zostać — do zadań, do oddania,
    do rozbudowywania w kolejnych lekcjach.

!!! warning "Różnica, która myli wszystkich na pierwszej lekcji"

    W konsoli sam zapis `2 + 2` wyświetli wynik. W skrypcie **nie wyświetli
    nic** — program policzy i wyrzuci wynik do kosza. W pliku musisz napisać
    `print(2 + 2)`.

## 3. `print()` — wypisywanie na ekran

```python
print("Cześć!")                  # napis w cudzysłowie
print(5 * 12)                    # wynik działania
print("Wynik:", 5 * 12)          # kilka rzeczy naraz — przecinek daje spację
```

```text
Cześć!
60
Wynik: 60
```

Napis (tekst) **zawsze** stoi w cudzysłowie: `"Cześć"` albo `'Cześć'` —
Python traktuje oba znaki tak samo, byle ten sam z obu stron.

Wygodniejszy sposób sklejania tekstu z wartościami to **f-napis**: przed
cudzysłowem stawiasz literę `f`, a to, co ma zostać obliczone, wstawiasz
w klamry.

```python
imie = "Ala"
wiek = 17
print(f"{imie} ma {wiek} lat.")     # Ala ma 17 lat.
```

## 4. Zmienne

Zmienna to **nazwa dla wartości**. Znak `=` nie jest tu równaniem z matematyki,
tylko poleceniem „zapamiętaj to pod tą nazwą”.

```python
cena = 12.50
sztuki = 3
razem = cena * sztuki
print(razem)          # 37.5
```

Nazwę czyta się jak etykietę na pudełku, więc:

- małe litery, wyrazy łączone podkreśleniem: `cena_biletu`, `liczba_uczniow`;
- **bez polskich znaków** — `liczba_uczniów` zadziała, ale przy przenoszeniu
  między systemami potrafi się rozsypać, więc się tego nie robi;
- nazwa mówi, co jest w środku: `x` po tygodniu nie znaczy już nic.

Ponowne przypisanie nadpisuje starą wartość — i o to chodzi:

```python
punkty = 10
punkty = punkty + 5      # teraz 15; prawa strona liczy się pierwsza
```

## 5. Typy danych

| Typ | Co to | Przykład |
| --- | --- | --- |
| `int` | liczba całkowita | `17`, `-4`, `0` |
| `float` | liczba z częścią dziesiętną | `12.5`, `3.0` |
| `str` | napis (tekst) | `"Ala"`, `"17"` |

**Część dziesiętną oddziela kropka, nie przecinek.** Zapis `12,50` Python
zrozumie jako dwie wartości, a nie jedną liczbę.

Typ sprawdzisz funkcją `type()`:

```python
>>> type(17)
<class 'int'>
>>> type("17")
<class 'str'>
```

`17` i `"17"` to dwie różne rzeczy: pierwsze jest liczbą, drugie napisem, który
tylko wygląda jak liczba. Przekształcanie jednego w drugie:

```python
int("17")        # 17     napis → liczba całkowita
float("3.5")     # 3.5    napis → liczba rzeczywista
str(17)          # "17"   liczba → napis
int(3.9)         # 3      obcina część dziesiętną, nie zaokrągla!
round(3.9)       # 4      to jest zaokrąglanie
```

## 6. Operatory arytmetyczne

| Operator | Działanie | Przykład | Wynik |
| :---: | --- | --- | --- |
| `+` `-` `*` | dodawanie, odejmowanie, mnożenie | `3 * 4` | `12` |
| `/` | dzielenie | `7 / 2` | `3.5` |
| `//` | dzielenie całkowite (ile razy się mieści) | `7 // 2` | `3` |
| `%` | reszta z dzielenia | `7 % 2` | `1` |
| `**` | potęgowanie | `2 ** 10` | `1024` |

Kolejność działań jest taka jak w matematyce: najpierw `**`, potem `*`, `/`,
`//`, `%`, na końcu `+` i `-`. Nawiasy zmieniają kolejność.

!!! tip "`//` i `%` to para, która rozbija liczbę na części"

    Masz 200 sekund. `200 // 60` daje **3** pełne minuty, `200 % 60` daje
    **20** sekund reszty. Tym samym sposobem rozmienisz kwotę na banknoty
    albo policzysz, ile pełnych paczek zapakujesz z danej liczby sztuk.

Uwaga na `/`: dzielenie **zawsze** daje `float`, nawet gdy dzieli się równo.
`10 / 5` to `2.0`, nie `2`.

Na napisach `+` i `*` też działają, ale znaczą co innego:

```python
"abc" + "def"      # "abcdef"   sklejanie
"ab" * 3           # "ababab"   powielanie
"abc" + 5          # BŁĄD — napisu nie da się dodać do liczby
```

## 7. `input()` — dane od użytkownika

```python
imie = input("Podaj imię: ")
print(f"Dzień dobry, {imie}!")
```

Program zatrzymuje się, czeka na wpisanie tekstu i ++enter++, a to, co
użytkownik wpisał, ląduje w zmiennej.

!!! danger "Najważniejsza pułapka tej lekcji"

    **`input()` zawsze zwraca napis** — nawet jeśli wpiszesz same cyfry.

    ```python
    a = input("Pierwsza liczba: ")     # wpisujesz 2
    b = input("Druga liczba: ")        # wpisujesz 3
    print(a + b)                       # 23, a nie 5 — to sklejanie napisów!
    ```

    Żeby liczyć, trzeba napis zamienić na liczbę:

    ```python
    a = int(input("Pierwsza liczba: "))
    b = int(input("Druga liczba: "))
    print(a + b)                       # 5
    ```

    `int()` dla liczb całkowitych, `float()` gdy dopuszczasz części
    dziesiętne (np. cenę).

## 8. Błędy — czytać, nie zgadywać

Komunikat o błędzie nie jest karą. To jedyna informacja, jaką masz, i zwykle
mówi wprost, co jest nie tak. Czytaj go **od dołu**: ostatni wiersz podaje
rodzaj błędu, wcześniejszy — numer wiersza, w którym Python się zatrzymał.

```text
  File "main.py", line 3
    print(a + b
         ^
SyntaxError: '(' was never closed
```

| Komunikat | Co znaczy | Częsta przyczyna |
| --- | --- | --- |
| `SyntaxError` | zapis niezgodny z zasadami języka | brak nawiasu, brak cudzysłowu |
| `NameError` | nie znam takiej nazwy | literówka w nazwie zmiennej albo użycie jej przed przypisaniem |
| `TypeError` | te typy do siebie nie pasują | `"abc" + 5`, dodawanie wyniku `input()` |
| `ValueError` | typ dobry, wartość zła | `int("dwa")`, `int("3.5")` |
| `ZeroDivisionError` | dzielenie przez zero | dzielnik wczytany od użytkownika |
| `IndentationError` | złe wcięcie | przypadkowa spacja na początku wiersza |

Zasada praktyczna: **poprawiaj pierwszy błąd, nie ostatni**. Jeden brakujący
nawias potrafi wygenerować kilka komunikatów naraz — po poprawieniu przyczyny
znika cała reszta.

## 9. Komentarze

Wszystko po znaku `#` do końca wiersza Python pomija.

```python
# Program przelicza sekundy na minuty i sekundy
sekundy = 200
minuty = sekundy // 60      # pełne minuty
reszta = sekundy % 60       # sekundy, które zostały
```

Komentarz ma mówić **dlaczego**, a nie powtarzać kod. `x = x + 1  # zwiększ x
o 1` jest bezużyteczny. Komentarz przydaje się też do chwilowego wyłączenia
wiersza podczas szukania błędu.

## Ćwiczenia

Pobierz szkielet — miejsca do uzupełnienia są oznaczone komentarzem `# TODO`.
Otwórz plik w Notatniku, skopiuj jego zawartość do edytora w przeglądarce
i uruchamiaj program po każdym zadaniu.

[:material-language-python: Szkielet ćwiczeń (.py)](../pliki/python-cwiczenia-2loa.py){ .md-button .md-button--primary download="python-cwiczenia-2loa.py" }
[:material-file-document-outline: Ściąga na jedną stronę (.docx)](../pliki/python-sciaga-2loa.docx){ .md-button download="python-sciaga-2loa.docx" }

!!! note "Ćwiczenie 1. Wizytówka"

    Napisz program, który wypisze trzy wiersze: twoje imię, klasę i ulubiony
    przedmiot. Użyj **trzech zmiennych** i jednego f-napisu, a nie trzech
    gotowych napisów wklepanych do `print()`.

    Sprawdzian poprawności: zmiana wartości zmiennej ma zmieniać wypisany
    tekst i nic poza tym.

!!! note "Ćwiczenie 2. Rachunek za zakupy"

    Program pyta o **nazwę towaru**, **cenę za sztukę** i **liczbę sztuk**,
    a potem wypisuje zdanie w rodzaju: `3 × zeszyt = 11.70 zł`.

    Cena ma być liczbą rzeczywistą, liczba sztuk — całkowitą. Zastanów się,
    którą funkcję przekształcającą zastosować w każdym z tych dwóch miejsc
    i dlaczego akurat tę.

!!! note "Ćwiczenie 3. Sekundy na czas"

    Program wczytuje liczbę sekund i wypisuje ją jako **godziny, minuty
    i sekundy** — 3725 ma dać `1 godz. 2 min 5 s`.

    Wystarczą do tego `//` i `%`. Wykonaj obliczenia po kolei: najpierw
    godziny, potem z tego, co zostało, minuty.

!!! note "Ćwiczenie 4. Naprawa programu"

    W szkielecie, w zadaniu 4, jest program z **trzema błędami**. Uruchom go,
    przeczytaj komunikat, popraw **jeden** błąd i uruchom ponownie — i tak,
    aż zadziała. Zapisz w karcie pracy, jaki błąd zgłosił Python za każdym
    razem i co go powodowało.

## Sprawdź się

<div class="quiz" markdown="0">
<script type="application/json">
[
  {
    "pytanie": "Program pyta o dwie liczby: a = input(\"a: \"), b = input(\"b: \"). Użytkownik wpisuje 2 i 3. Co wypisze print(a + b)?",
    "typ": "jedna",
    "opcje": ["5", "23", "2 3", "Błąd TypeError"],
    "poprawna": 1,
    "wyjasnienie": "input() zwraca napis, więc a to \"2\", b to \"3\". Dla napisów + oznacza sklejanie, stąd \"23\". Żeby wyszło 5, trzeba napisać int(input(...))."
  },
  {
    "pytanie": "Ile wynosi 7 // 2, a ile 7 % 2?",
    "typ": "jedna",
    "opcje": ["3.5 i 3.5", "3 i 1", "1 i 3", "3.5 i 1"],
    "poprawna": 1,
    "wyjasnienie": "// to dzielenie całkowite — dwójka mieści się w siódemce 3 razy. % to reszta z tego dzielenia, czyli 1. Zwykłe 7 / 2 dałoby 3.5."
  },
  {
    "pytanie": "W skrypcie zapisujesz sam wiersz 2 + 2 i uruchamiasz program. Co się stanie?",
    "typ": "jedna",
    "opcje": [
      "Wyświetli się 4",
      "Nie wyświetli się nic — wynik nie został nigdzie użyty",
      "Zgłosi SyntaxError",
      "Wyświetli się 2 + 2"
    ],
    "poprawna": 1,
    "wyjasnienie": "Wynik wyświetla się sam tylko w konsoli. W pliku trzeba napisać print(2 + 2) — inaczej Python policzy i o wyniku zapomni."
  },
  {
    "pytanie": "Który komunikat zobaczysz po uruchomieniu int(\"dwa\")?",
    "typ": "jedna",
    "opcje": ["NameError", "TypeError", "ValueError", "SyntaxError"],
    "poprawna": 2,
    "wyjasnienie": "Typ argumentu jest poprawny — to napis, a int() napisy przyjmuje. Zła jest wartość: \"dwa\" nie zapisuje liczby. Stąd ValueError."
  },
  {
    "pytanie": "Zmienna cena ma zawierać kwotę 12 zł 50 gr. Który zapis jest poprawny?",
    "typ": "jedna",
    "opcje": ["cena = 12,50", "cena = 12.50", "cena = \"12.50\"", "cena = int(12.50)"],
    "poprawna": 1,
    "wyjasnienie": "Część dziesiętną oddziela kropka. Przecinek zrobiłby z tego dwie wartości, cudzysłów — napis, którego nie da się pomnożyć przez liczbę sztuk, a int() obcięłoby grosze."
  },
  {
    "pytanie": "Ile wynosi int(3.9)?",
    "typ": "jedna",
    "opcje": ["4", "3", "3.9", "Błąd — int() nie przyjmuje liczb rzeczywistych"],
    "poprawna": 1,
    "wyjasnienie": "int() obcina część dziesiętną, a nie zaokrągla. Do zaokrąglania służy round(), które z 3.9 zrobi 4."
  },
  {
    "pytanie": "Python zgłasza NameError: name 'wynk' is not defined. Co to najczęściej oznacza?",
    "typ": "jedna",
    "opcje": [
      "Zmienna ma zły typ",
      "Literówka w nazwie albo użycie zmiennej, zanim coś do niej przypisano",
      "Brak nawiasu zamykającego",
      "Dzielenie przez zero"
    ],
    "poprawna": 1,
    "wyjasnienie": "NameError znaczy „nie znam takiej nazwy”. Nazwa w komunikacie jest wskazówką — tu widać przekręcone „wynik”."
  },
  {
    "pytanie": "Po uruchomieniu program pokazuje kilka komunikatów o błędach naraz. Od czego zaczynasz?",
    "typ": "jedna",
    "opcje": [
      "Od ostatniego, bo jest najświeższy",
      "Od pierwszego błędu w kolejności wierszy — poprawienie przyczyny często usuwa resztę",
      "Poprawiam wszystkie naraz i uruchamiam raz",
      "Piszę program od nowa"
    ],
    "poprawna": 1,
    "wyjasnienie": "Jeden brakujący nawias czy cudzysłów potrafi wygenerować lawinę komunikatów. Poprawiasz pierwszą przyczynę, uruchamiasz i patrzysz, co zostało."
  }
]
</script>
</div>

## Karta pracy

Wypełnij kartę na tej stronie, a potem pobierz gotowy dokument Worda i oddaj
go przez **Zadania domowe w dzienniku VULCAN**. Do zrzutów ekranu wystarczy
klawisz ++print-screen++ albo ++win+shift+s++.

<div class="karta-pracy" data-karta="podstawy-pythona"></div>

## Na ocenę celującą

Wybierz jedno zadanie i opisz rozwiązanie w karcie pracy.

**A. Rozmienianie kwoty.** Program wczytuje kwotę w pełnych złotych i wypisuje,
ile najmniej banknotów i monet trzeba wydać: 200, 100, 50, 20, 10, 5, 2, 1 zł.
Użyj wyłącznie `//` i `%`. Wyjaśnij, dlaczego kolejność od największego nominału
jest tu istotna.

**B. Zamiana wartości dwóch zmiennych.** Napisz program, który zamienia wartości
zmiennych `a` i `b` miejscami: raz z użyciem zmiennej pomocniczej, raz bez niej
(`a, b = b, a`). Wypisz stan przed i po. Wyjaśnij, dlaczego sam zapis
`a = b` i potem `b = a` **nie działa**.

**C. Sprawdzenie, czy liczba jest parzysta — bez instrukcji warunkowej.**
Program wczytuje liczbę i wypisuje `Reszta z dzielenia przez 2 wynosi: …`,
a potem — na podstawie tej reszty — wyjaśnia w komentarzu, po czym poznaje się
liczbę parzystą. To wstęp do instrukcji `if`, którą poznasz na kolejnych
lekcjach.

---

*Środowisko online-python.com uruchamia Python 3.12, najnowsza wersja do
pobrania z python.org to 3.14.4. Stan sprawdzony 10 września 2026 r.*
