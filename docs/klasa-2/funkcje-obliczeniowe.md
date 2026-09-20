# Definiowanie funkcji obliczeniowych

!!! abstract "O tym temacie"

    **1 godzina lekcyjna** · Dział II. Algorytmika i programowanie w Pythonie
    · podstawa programowa **I.1, I.3, II.1**

    Na poprzedniej lekcji program liczył jedną rzecz raz. Dziś nauczysz się
    **nadawać rachunkowi nazwę** i używać go tyle razy, ile trzeba — z różnymi
    danymi, bez przepisywania wzoru. To jest moment, w którym program przestaje
    być listą poleceń, a zaczyna być zbudowany z części.

!!! success "Cele lekcji"

    Po tej lekcji potrafisz:

    1. zdefiniować własną funkcję instrukcją `def` i poprawnie ją wciąć
    2. przekazać do funkcji dane przez parametry i wywołać ją z argumentami
    3. zwrócić wynik instrukcją `return` i użyć go w dalszych obliczeniach
    4. wyjaśnić, czym różni się `return` od `print()` i co to znaczy, że funkcja zwraca `None`
    5. rozpoznać zmienną lokalną i wyjaśnić, dlaczego nie widać jej poza funkcją
    6. zastosować wartość domyślną parametru
    7. umieścić w funkcji instrukcję warunkową i zwrócić różny wynik w zależności od danych
    8. skorzystać z funkcji wbudowanych oraz z modułu `math`
    9. sprawdzić własną funkcję na kilku danych, w tym na przypadku brzegowym

## 1. Po co komu własna funkcja

Kalkulator ocen klasowych ma policzyć średnią dla trzech osób:

```python
oceny_ali = [4, 5, 3]
print(sum(oceny_ali) / len(oceny_ali))

oceny_bartka = [2, 3, 3, 4]
print(sum(oceny_bartka) / len(oceny_bartka))

oceny_celiny = [5, 5]
print(sum(oceny_celiny) / len(oceny_celiny))
```

Wzór jest przepisany trzy razy. Gdyby średnia miała być ważona, trzeba by go
poprawić w trzech miejscach — i w jednym na pewno byś zapomniał. **Funkcja jest
rachunkiem, który ma nazwę i stoi w programie raz.**

```python
def srednia(oceny):
    return sum(oceny) / len(oceny)

print(srednia([4, 5, 3]))
print(srednia([2, 3, 3, 4]))
print(srednia([5, 5]))
```

```text
4.0
3.0
5.0
```

Trzy powody, dla których warto:

| Powód | Co to znaczy w praktyce |
| --- | --- |
| **jedno miejsce zmiany** | poprawiasz wzór raz, a działa wszędzie |
| **czytelność** | `srednia(oceny)` mówi, co się dzieje; `sum(x)/len(x)` trzeba rozszyfrować |
| **testowalność** | funkcję sprawdzisz osobno, na kilku danych, zanim wstawisz ją do programu |

## 2. Budowa funkcji

```python
def pole_prostokata(a, b):
    return a * b
```

| Element | Nazwa | Uwaga |
| --- | --- | --- |
| `def` | słowo kluczowe | zawsze na początku, małymi literami |
| `pole_prostokata` | nazwa funkcji | te same zasady co dla zmiennych: małe litery, podkreślenia, bez polskich znaków |
| `(a, b)` | **parametry** | dane, których funkcja potrzebuje; mogą być zero, jeden albo więcej |
| `:` | dwukropek | bez niego `SyntaxError` |
| wcięcie | ciało funkcji | wszystko, co wcięte, należy do funkcji |
| `return` | zwrócenie wyniku | oddaje wartość temu, kto funkcję wywołał |

!!! warning "Wcięcie nie jest ozdobą"

    W Pythonie wcięcie **decyduje**, co należy do funkcji. Przyjęte są
    **cztery spacje**. Edytor wstawia je sam po dwukropku, ale jeżeli zaczniesz
    mieszać spacje z tabulatorami, dostaniesz `IndentationError` albo — gorzej —
    program, który działa inaczej, niż wygląda.

Samo zdefiniowanie funkcji **niczego nie wykonuje**. To jak przepis w książce
kucharskiej: leży, dopóki ktoś do niego nie zajrzy. Funkcja uruchamia się dopiero
przy **wywołaniu**:

```python
def pole_prostokata(a, b):
    return a * b

print(pole_prostokata(3, 4))
print(pole_prostokata(10, 2))
```

```text
12
20
```

## 3. Parametry a argumenty

To dwa różne słowa na dwie różne rzeczy, i warto je rozróżniać, bo komunikaty
o błędach posługują się nimi dosłownie.

| Pojęcie | Gdzie występuje | Przykład |
| --- | --- | --- |
| **parametr** | w definicji, w nawiasie po nazwie | `def pole_prostokata(a, b):` — `a` i `b` |
| **argument** | w wywołaniu | `pole_prostokata(3, 4)` — `3` i `4` |

Parametr to puste miejsce, argument to wartość, która w nie wchodzi.
**Kolejność ma znaczenie**: pierwszy argument trafia do pierwszego parametru.

```python
def dzielenie(a, b):
    return a / b

print(dzielenie(10, 2))
print(dzielenie(2, 10))
```

```text
5.0
0.2
```

Jeżeli podasz złą liczbę argumentów, Python powie to wprost:

```text
TypeError: pole_prostokata() missing 1 required positional argument: 'b'
```

Komunikat podaje **nazwę brakującego parametru** — nie trzeba zgadywać.

## 4. `return` kontra `print()`

To najważniejsza rzecz na tej lekcji i najczęstszy błąd na sprawdzianach.

=== "Funkcja, która wypisuje"

    ```python
    def pole_zle(a, b):
        print(a * b)

    wynik = pole_zle(3, 4)
    print(wynik)
    print(pole_zle(3, 4) * 2)
    ```

    ```text
    12
    None
    12
    Traceback (most recent call last):
    TypeError: unsupported operand type(s) for *: 'NoneType' and 'int'
    ```

    Liczba pojawia się na ekranie, ale **nie wraca do programu**. Funkcja bez
    `return` zwraca `None` — „nic”. Takiego wyniku nie da się pomnożyć, dodać
    ani zapisać do zmiennej w sensowny sposób.

=== "Funkcja, która zwraca"

    ```python
    def pole(a, b):
        return a * b

    wynik = pole(3, 4)
    print(wynik)
    print(pole(3, 4) * 2)
    print(pole(2, 5) + pole(3, 3))
    ```

    ```text
    12
    24
    19
    ```

    Wynik jest **wartością**: można go zapisać, użyć w działaniu, przekazać do
    kolejnej funkcji.

!!! tip "Zasada kciuka"

    Funkcja **liczy** — więc `return`. O tym, czy coś pokazać użytkownikowi,
    decyduje program, który ją wywołał. Dzięki temu tej samej funkcji użyjesz
    i do wypisania wyniku, i do narysowania wykresu, i do zapisania do pliku.

`return` **kończy działanie funkcji natychmiast**. Wiersze pod nim już się nie
wykonają:

```python
def test(x):
    return x * 2
    print("tego nikt nie zobaczy")

print(test(5))
```

```text
10
```

## 5. Zmienne lokalne

Zmienna utworzona w funkcji istnieje **tylko w niej**. Nazywa się lokalną.

```python
def podatek(kwota):
    stawka = 23
    return kwota * stawka / 100

print(podatek(200))
print(stawka)
```

```text
46.0
Traceback (most recent call last):
NameError: name 'stawka' is not defined
```

To nie jest utrudnienie, tylko zabezpieczenie: funkcja nie może przypadkiem
popsuć zmiennej o tej samej nazwie w reszcie programu. Wszystko, czego funkcja
potrzebuje, ma dostać **przez parametry**, a wszystko, co ma oddać — przez
`return`.

## 6. Wartość domyślna parametru

Parametr może mieć wartość używaną wtedy, gdy nie podasz argumentu.

```python
def cena_brutto(netto, vat=23):
    return netto * (100 + vat) / 100

print(cena_brutto(200))
print(cena_brutto(200, 8))
print(cena_brutto(200, 0))
```

```text
246.0
216.0
200.0
```

Parametry z wartością domyślną stoją **na końcu** listy — inaczej Python nie
wiedziałby, do którego parametru trafił pojedynczy argument.

## 7. Warunek w środku funkcji

Funkcja obliczeniowa rzadko liczy jednym wzorem. Zwykle najpierw sprawdza,
w którym jest przypadku.

```python
def rabat(kwota):
    if kwota >= 500:
        return kwota * 0.8
    elif kwota >= 200:
        return kwota * 0.9
    else:
        return kwota

print(rabat(600))
print(rabat(300))
print(rabat(100))
```

```text
480.0
270.0
100
```

Ponieważ `return` kończy funkcję, można też pisać bez `else` — wykonanie i tak
nie dojdzie dalej:

```python
def rabat(kwota):
    if kwota >= 500:
        return kwota * 0.8
    if kwota >= 200:
        return kwota * 0.9
    return kwota
```

!!! danger "Każda droga musi coś zwracać"

    ```python
    def ocena(punkty):
        if punkty >= 50:
            return "zaliczone"

    print(ocena(70))
    print(ocena(30))
    ```

    ```text
    zaliczone
    None
    ```

    Dla 30 punktów żaden warunek nie jest spełniony, więc funkcja kończy się
    bez `return` i oddaje `None`. Sprawdzaj **wszystkie** przypadki, nie tylko
    ten, który miałeś na myśli, pisząc funkcję.

## 8. Funkcje gotowe i moduł `math`

Zanim napiszesz własną funkcję, sprawdź, czy Python już jej nie ma.

| Funkcja | Co robi | Przykład |
| --- | --- | --- |
| `abs(x)` | wartość bezwzględna | `abs(-7)` → `7` |
| `round(x, n)` | zaokrągla do `n` miejsc | `round(3.14159, 2)` → `3.14` |
| `max()`, `min()` | największa, najmniejsza | `max(3, 9, 1)` → `9` |
| `sum(lista)` | suma elementów | `sum([1, 2, 3])` → `6` |
| `len(lista)` | ile elementów | `len([1, 2, 3])` → `3` |
| `int()`, `float()`, `str()` | zmiana typu | `int("12")` → `12` |

Więcej matematyki mieszka w **module** `math`, który trzeba najpierw wczytać:

```python
import math

print(math.sqrt(16))
print(round(math.pi, 4))
print(math.ceil(4.1))
print(math.floor(4.9))
```

```text
4.0
3.1416
5
4
```

!!! tip "`round()` zaokrągla inaczej, niż uczyli w podstawówce"

    ```python
    print(round(2.5))
    print(round(3.5))
    ```

    ```text
    2
    4
    ```

    Przy dokładnej połówce Python zaokrągla **do liczby parzystej**. Tak robi
    norma stosowana w obliczeniach naukowych — chodzi o to, żeby przy tysiącach
    zaokrągleń błędy się znosiły, a nie sumowały. W zadaniach na tej lekcji nie
    ma to znaczenia, ale warto wiedzieć, skąd „dziwny” wynik.

## 9. Sprawdzanie własnej funkcji

Funkcja, której nie sprawdziłeś, nie jest gotowa. Sprawdza się na **trzech
rodzajach danych**:

| Rodzaj | Po co | Przykład dla `rabat()` |
| --- | --- | --- |
| typowe | czy w ogóle liczy | `rabat(300)` |
| **brzegowe** | dokładnie na granicy warunku | `rabat(200)`, `rabat(500)` |
| nietypowe | zero, liczba ujemna, pusta lista | `rabat(0)` |

```python
def rabat(kwota):
    if kwota >= 500:
        return kwota * 0.8
    if kwota >= 200:
        return kwota * 0.9
    return kwota

print(rabat(199))
print(rabat(200))
print(rabat(499))
print(rabat(500))
print(rabat(0))
```

```text
199
180.0
449.1
400.0
0
```

Widać tu dwie rzeczy warte zauważenia. Po pierwsze, granica działa tak, jak
zapisano ją w warunku: 200 już dostaje rabat, bo użyto `>=`. Po drugie, dla 199
wynikiem jest `199`, a nie `199.0` — funkcja zwróciła wtedy nietkniętą liczbę
całkowitą, a nie wynik mnożenia.

!!! warning "Najczęstsze błędy przy funkcjach"

    | Objaw | Przyczyna |
    | --- | --- |
    | `IndentationError` | ciało funkcji niewcięte albo wcięte nierówno |
    | `NameError: name 'pole' is not defined` | wywołanie stoi **przed** definicją; `def` musi być wyżej |
    | `TypeError: … missing 1 required positional argument` | za mało argumentów w wywołaniu |
    | `TypeError: … 'NoneType' and 'int'` | funkcja nie ma `return`, więc zwróciła `None` |
    | program nic nie wypisuje | wywołałeś funkcję, ale nie wypisałeś jej wyniku |

## Ćwiczenia

Pobierz szkielet — miejsca do uzupełnienia są oznaczone komentarzem `# TODO`.
Otwórz plik w Notatniku, skopiuj jego zawartość do edytora w przeglądarce
i uruchamiaj program po każdym zadaniu.

[:material-language-python: Szkielet ćwiczeń (.py)](../pliki/python-funkcje-2loa.py){ .md-button .md-button--primary download="python-funkcje-2loa.py" }
[:material-file-document-outline: Ściąga na jedną stronę (.docx)](../pliki/python-funkcje-sciaga-2loa.docx){ .md-button download="python-funkcje-sciaga-2loa.docx" }

!!! note "Ćwiczenie 1. Pole i obwód"

    Napisz dwie funkcje: `pole_prostokata(a, b)` oraz `obwod_prostokata(a, b)`.
    Obie mają **zwracać** wynik, nie wypisywać go.

    Wywołaj je dla boków 3 i 4, a potem dla 12,5 i 2. Wypisz wyniki jednym
    `print()` z f-napisem, w rodzaju: `Prostokąt 3 × 4: pole 12, obwód 14`.

!!! note "Ćwiczenie 2. Przelicznik walut z wartością domyślną"

    Funkcja `na_zlotowki(kwota, kurs=4.30)` zwraca wartość podanej kwoty
    w złotych.

    Sprawdź ją trzy razy: bez podania kursu, z kursem 4.15 i z kursem 0.
    Zapisz w karcie pracy, co wyszło w trzecim przypadku i czy taki wynik ma
    sens — a jeśli nie, co powinna zrobić funkcja.

!!! note "Ćwiczenie 3. Kategoria wiekowa biletu"

    Funkcja `cena_biletu(wiek)` zwraca cenę według cennika:

    | Wiek | Cena |
    | --- | ---: |
    | do 6 lat włącznie | 0 zł |
    | 7–18 lat | 12 zł |
    | 19–64 lata | 25 zł |
    | 65 lat i więcej | 15 zł |

    Sprawdź funkcję na **granicach**: 6, 7, 18, 19, 64, 65. Zapisz wyniki
    w karcie pracy. Jeżeli któraś granica wyjdzie źle, popraw warunek i napisz,
    co było nie tak.

!!! note "Ćwiczenie 4. Naprawa funkcji"

    W szkielecie, w zadaniu 4, są trzy funkcje — każda z innym błędem.
    Uruchamiaj po jednej, czytaj komunikat i poprawiaj. Zapisz w karcie pracy,
    jaki błąd zgłosił Python i na czym polegała pomyłka.

!!! note "Ćwiczenie 5. Złóż z części"

    Mając gotowe `pole_prostokata(a, b)` z ćwiczenia 1, napisz funkcję
    `koszt_paneli(a, b, cena_za_m2)`, która zwraca koszt wyłożenia podłogi.
    **Nie licz pola od nowa** — wywołaj w środku funkcję z ćwiczenia 1.

    Policz koszt dla pokoju 4 × 5 m przy cenie 89 zł/m². Wyjaśnij w karcie
    pracy, co się stanie z `koszt_paneli()`, jeżeli ktoś poprawi wzór
    w `pole_prostokata()`.

## Sprawdź się

<div class="quiz" markdown="0">
<script type="application/json">
[
  {
    "pytanie": "Funkcja kończy się instrukcją print(wynik) zamiast return wynik. Co zwróci jej wywołanie?",
    "typ": "jedna",
    "opcje": [
      "Wypisaną liczbę",
      "Napis z tą liczbą",
      "None",
      "Zgłosi błąd już przy definiowaniu"
    ],
    "poprawna": 2,
    "wyjasnienie": "print() tylko pokazuje wartość na ekranie. Funkcja bez return zwraca None, więc wyniku nie da się użyć w dalszych obliczeniach."
  },
  {
    "pytanie": "def rabat(kwota, procent=10). Które wywołanie jest niepoprawne?",
    "typ": "jedna",
    "opcje": [
      "rabat(200)",
      "rabat(200, 15)",
      "rabat()",
      "rabat(0, 0)"
    ],
    "poprawna": 2,
    "wyjasnienie": "Parametr kwota nie ma wartości domyślnej, więc argument trzeba podać zawsze. Python zgłosi TypeError o brakującym argumencie i wymieni jego nazwę."
  },
  {
    "pytanie": "Co wypisze ten program?\n\ndef f(x):\n    return x + 1\n    return x + 100\n\nprint(f(5))",
    "typ": "jedna",
    "opcje": ["6", "105", "6 i 105", "Zgłosi błąd — dwa return w jednej funkcji"],
    "poprawna": 0,
    "wyjasnienie": "Pierwszy return kończy działanie funkcji natychmiast. Drugiego wiersza Python nigdy nie wykona — to tak zwany kod martwy."
  },
  {
    "pytanie": "Wewnątrz funkcji utworzono zmienną stawka. Program próbuje ją wypisać po wywołaniu funkcji. Co się stanie?",
    "typ": "jedna",
    "opcje": [
      "Wypisze jej wartość",
      "Wypisze None",
      "Zgłosi NameError — zmienna lokalna nie istnieje poza funkcją",
      "Wypisze 0"
    ],
    "poprawna": 2,
    "wyjasnienie": "Zmienna utworzona w funkcji znika po jej zakończeniu. Żeby wartość wydostała się na zewnątrz, funkcja musi ją zwrócić instrukcją return."
  },
  {
    "pytanie": "def ocena(p):\n    if p >= 50:\n        return \"zaliczone\"\n\nCo zwróci ocena(30)?",
    "typ": "jedna",
    "opcje": ["\"niezaliczone\"", "None", "Pusty napis", "Zgłosi błąd"],
    "poprawna": 1,
    "wyjasnienie": "Warunek nie jest spełniony, więc funkcja kończy się bez return i oddaje None. Każda droga przez funkcję powinna coś zwracać."
  },
  {
    "pytanie": "Czym różni się parametr od argumentu?",
    "typ": "jedna",
    "opcje": [
      "Parametr jest w definicji funkcji, argument w jej wywołaniu",
      "Argument jest w definicji, parametr w wywołaniu",
      "To dwa słowa na to samo",
      "Parametr zawsze ma wartość domyślną"
    ],
    "poprawna": 0,
    "wyjasnienie": "Parametr to puste miejsce zadeklarowane po nazwie funkcji, argument to konkretna wartość wstawiona w to miejsce przy wywołaniu."
  },
  {
    "pytanie": "Który zestaw danych najlepiej sprawdzi funkcję cena_biletu(wiek) z progiem „7–18 lat”?",
    "typ": "jedna",
    "opcje": [
      "10, 20, 30 — po jednej liczbie z każdego przedziału",
      "6, 7, 18, 19 — wartości dokładnie na granicach progu",
      "Jedna dowolna liczba, na przykład 15",
      "Same liczby ujemne"
    ],
    "poprawna": 1,
    "wyjasnienie": "Błędy w warunkach prawie zawsze siedzą na granicy — pomylone > z >= widać tylko dla wartości brzegowej, nigdy dla liczby ze środka przedziału."
  },
  {
    "pytanie": "Program zgłasza: NameError: name 'pole' is not defined, choć funkcja pole jest w pliku. Co jest najbardziej prawdopodobną przyczyną?",
    "typ": "jedna",
    "opcje": [
      "Funkcja nie ma instrukcji return",
      "Wywołanie stoi wyżej niż definicja funkcji",
      "Funkcja ma za dużo parametrów",
      "Brakuje modułu math"
    ],
    "poprawna": 1,
    "wyjasnienie": "Python czyta plik od góry do dołu. W chwili wywołania definicja musi być już wykonana, więc każde def musi stać przed pierwszym użyciem funkcji."
  }
]
</script>
</div>

## Karta pracy

Wypełnij kartę na tej stronie, a potem pobierz gotowy dokument Worda i oddaj
go przez **Zadania domowe w dzienniku VULCAN**. Do zrzutów ekranu wystarczy
klawisz ++print-screen++ albo ++win+shift+s++.

<div class="kp-podsumowanie" data-karta="funkcje-obliczeniowe"></div>

<span id="karta" class="kp-kotwica"></span>

???+ karta "Rozwiń kartę pracy"

    <div class="karta-pracy" data-karta="funkcje-obliczeniowe"></div>

---

*Wszystkie wyniki w przykładach sprawdzono w Pythonie 3.12 — tej wersji używa
środowisko online-python.com. Stan sprawdzony 20 września 2026 r.*
