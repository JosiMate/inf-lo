# Algorytm Euklidesa w praktyce

!!! abstract "O tym temacie"

    **1 godzina lekcyjna** · Dział II. Algorytmika i programowanie w Pythonie
    · podstawa programowa **I.1, I.2.a, I.3**

    Łazienka ma wymiary 360 × 150 cm. Jakie największe kwadratowe płytki
    pokryją podłogę bez docinania? Dwa autobusy odjeżdżają z przystanku razem:
    jeden co 12, drugi co 18 minut. Kiedy znów odjadą jednocześnie? Za
    pierwszym pytaniem stoi **NWD**, za drugim — **NWW**. Dziś policzysz je
    algorytmem, który ma ponad 2300 lat i wciąż jest w użyciu, między innymi
    w kryptografii, a przy okazji poznasz nową pętlę — **`while`**.

??? rozgrzewka "Na rozgrzewkę — 3 minuty, bez zaglądania"

    Odpowiedz w zeszycie, zanim zaczniesz nowy temat. Odpowiedzi rozwiń
    dopiero wtedy, gdy wszyscy skończą — nie liczą się do oceny.

    1. **Z poprzedniego tematu.** W szyfrze Cezara A ma numer 0. Ile wynosi
       `(25 + 3) % 26` i jaka to litera?
    2. **Sprzed kilku tygodni.** Co wypisze `print(200 // 60, 200 % 60)`?
    3. **Z matematyki.** Podaj NWD(12, 18) i NWW(12, 18).

    ??? success "Odpowiedzi"

        1. `2`, czyli litera **C** — Z przesunięte o 3 zawija się na C.
        2. `3 20` — 200 sekund to 3 pełne minuty i 20 sekund reszty. Dziś
           reszta z dzielenia policzy NWD.
        3. NWD = **6**, NWW = **36**. Dziś te same liczby policzy program.

!!! success "Kryteria sukcesu — sprawdź się na koniec lekcji"

    Po tej lekcji:

    1. Wyjaśnię, czym są NWD i NWW, i podam przykład z życia, w którym się przydają.
    2. Policzę NWD na kartce algorytmem Euklidesa z odejmowaniem i z dzieleniem.
    3. Napiszę pętlę `while` i powiem, kiedy się zatrzyma.
    4. Napiszę funkcję `nwd(a, b)` z resztą z dzielenia i funkcję `nww(a, b)` korzystającą z NWD.
    5. Skrócę i dodam ułamki zwykłe w Pythonie, korzystając z NWD i NWW.

!!! tip "Przykłady uruchomisz na tej stronie"

    Pod przykładami są okienka z Pythonem: zmień kod i kliknij **▶ Uruchom**
    (albo ++ctrl+enter++). **Zanim klikniesz, przewiduj**, co wypisze program —
    wynik sprawdzisz w ramce „Przewiduj, potem sprawdź wynik”. W ćwiczeniach
    przycisk **✓ Sprawdź** wywoła twoje funkcje na kilku liczbach i powie,
    czy wynik się zgadza.

## 1. NWD i NWW — po co to komu

| Pojęcie | Znaczenie | Przykład z życia |
| --- | --- | --- |
| **NWD(a, b)** — największy wspólny dzielnik | największa liczba, przez którą dzielą się bez reszty i `a`, i `b` | największa kwadratowa płytka na podłogę 360 × 150 cm ma bok NWD(360, 150) = **30 cm** |
| **NWW(a, b)** — najmniejsza wspólna wielokrotność | najmniejsza liczba dodatnia, która dzieli się bez reszty i przez `a`, i przez `b` | autobusy co 12 i co 18 minut odjadą znów razem po NWW(12, 18) = **36 minutach** |

Na matematyce NWD liczyłeś, rozkładając liczby na czynniki albo wypisując
dzielniki. Dla 360 i 150 da się to zrobić w głowie, ale dla 1 234 567 i 7 654 321
— już nie. Komputer potrzebuje przepisu, który działa dla dowolnie dużych liczb
i kończy się szybko. Taki przepis opisał grecki matematyk **Euklides**
w „Elementach” około 300 roku p.n.e.

## 2. Algorytm Euklidesa z odejmowaniem

Pomysł: **wspólny dzielnik dwóch liczb dzieli też ich różnicę**. Płytka, która
mieści się równo w 360 cm i w 150 cm, zmieści się równo w 360 − 150 = 210 cm.
Można więc zastąpić większą liczbę różnicą i szukać NWD mniejszych liczb.

> Dopóki liczby są różne, od większej odejmij mniejszą. Kiedy będą równe —
> to jest NWD.

| Krok | a | b | Co robimy |
| :---: | ---: | ---: | --- |
| 0 | 360 | 150 | a > b, więc a = 360 − 150 |
| 1 | 210 | 150 | a = 210 − 150 |
| 2 | 60 | 150 | b > a, więc b = 150 − 60 |
| 3 | 60 | 90 | b = 90 − 60 |
| 4 | 60 | 30 | a = 60 − 30 |
| 5 | 30 | 30 | równe — **NWD = 30** |

!!! example "Przewiduj"

    Policz na kartce NWD(12, 18) algorytmem z odejmowaniem. Ile odejmowań
    wykonasz?

    ??? success "Przewiduj, potem sprawdź wynik"

        Dwa: (12, 18) → (12, 6) → (6, 6). NWD = **6**.

## 3. Pętla `while` — powtarzaj, dopóki…

Pętla `for` z poprzednich tematów przechodzi po znakach napisu albo po liczbach
z `range()` — **wiadomo z góry**, ile razy się wykona. W algorytmie Euklidesa
nie wiadomo, ile będzie odejmowań. Tu potrzebna jest pętla **`while`**
(„dopóki”): powtarza swoje wnętrze, **dopóki warunek jest prawdziwy**.

```python
def nwd_odejmowanie(a, b):
    while a != b:          # dopóki liczby są różne
        if a > b:
            a = a - b
        else:
            b = b - a
    return a               # tu a == b

print(nwd_odejmowanie(360, 150))
print(nwd_odejmowanie(12, 18))
print(nwd_odejmowanie(17, 5))
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    30
    6
    1
    ```

    NWD(17, 5) = 1 — liczby, które nie mają wspólnego dzielnika większego niż 1,
    nazywa się **względnie pierwszymi**.

Warunek sprawdzany jest **przed** każdym obrotem. Gdy przestaje być prawdziwy,
program przechodzi do instrukcji za pętlą — tutaj do `return a`.

!!! warning "Pętla bez końca"

    Pętla `while` kończy się tylko wtedy, gdy coś w jej wnętrzu w końcu zmieni
    warunek na fałsz. Wywołaj `nwd_odejmowanie(5, 0)`: 5 − 0 = 5, i tak bez
    końca — `a` nigdy nie zrówna się z `b`. Program „wisi”, a okienko na tej
    stronie przerwie go po 10 sekundach. Dlatego wersja z odejmowaniem jest
    **tylko dla liczb dodatnich**.

## 4. Szybciej: Euklides z dzieleniem

Odejmowanie bywa bardzo wolne. Dla 100 i 1 trzeba odjąć jedynkę 99 razy,
a przecież od razu widać, że wynik to 1. Kolejne odejmowanie tej samej liczby
to po prostu **dzielenie z resztą** — zostaje reszta. Dlatego w każdym kroku
parę `(a, b)` zastępujemy parą `(b, a % b)`, aż reszta wyjdzie zero.

!!! kroki "Krok po kroku: NWD(360, 150) z resztą z dzielenia"

    Zanim odsłonisz kolejny krok, policz resztę samodzielnie.

    1. **Pierwsza reszta.**

        ```text
        360 % 150 = 60      (a, b) = (150, 60)
        ```

        Dwa odejmowania z sekcji 2 (360 → 210 → 60) zrobiły się w jednym kroku.

    2. **Druga reszta.**

        ```text
        150 % 60 = 30       (a, b) = (60, 30)
        ```

        Znów dwa odejmowania w jednym kroku.

    3. **Trzecia reszta.**

        ```text
        60 % 30 = 0         (a, b) = (30, 0)
        ```

        Reszta zero: 30 mieści się w 60 bez reszty.

    4. **Koniec.** Gdy `b` jest zerem, NWD to `a`:

        ```text
        NWD(360, 150) = 30
        ```

        Trzy kroki zamiast pięciu — a dla 1 000 000 i 3 dwa kroki zamiast
        333 335 odejmowań.

W Pythonie to cztery wiersze:

```python
def nwd(a, b):
    while b != 0:
        a, b = b, a % b
    return a

print(nwd(360, 150), nwd(1071, 462), nwd(100, 1), nwd(17, 0))
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    30 21 1 17
    ```

    Ta wersja działa także, gdy jedna z liczb jest zerem: NWD(17, 0) = 17,
    bo każda liczba dzieli zero.

Wiersz `a, b = b, a % b` to **przypisanie równoległe**: Python najpierw liczy
obie wartości po prawej stronie (`b` oraz `a % b` ze **starych** `a` i `b`),
a dopiero potem wpisuje je do zmiennych.

!!! example "Przewiduj"

    Kolega zamiast `a, b = b, a % b` napisał dwa wiersze:

    ```python
    a = b
    b = a % b
    ```

    Co zwróci jego funkcja dla 360 i 150?

    ??? success "Przewiduj, potem sprawdź wynik"

        **150**, a nie 30. Po `a = b` obie zmienne mają 150, więc `b = a % b`
        to `150 % 150 = 0`. Pętla kończy się po pierwszym obrocie z wynikiem 150.
        Stara wartość `a` przepadła, zanim została użyta — dlatego potrzebne jest
        przypisanie równoległe.

## 5. NWW z NWD

Dla dwóch liczb dodatnich zachodzi zależność **NWD(a, b) · NWW(a, b) = a · b**.
NWW nie trzeba więc liczyć osobnym algorytmem:

```python
def nwd(a, b):
    while b != 0:
        a, b = b, a % b
    return a

def nww(a, b):
    return a * b // nwd(a, b)

print(nww(12, 18), nww(4, 6), nww(7, 5))
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    36 12 35
    ```

    Autobusy odjadą razem po 36 minutach. NWW liczb względnie pierwszych
    (7 i 5) to po prostu ich iloczyn.

Dzielimy przez `//`, a nie przez `/`: wynik ma być liczbą całkowitą, a `/`
zawsze daje liczbę zmiennoprzecinkową (`36.0`).

## 6. Ułamki: skracanie i dodawanie

Tu NWD i NWW pracują razem:

- **skracanie** — licznik i mianownik dzielimy przez ich NWD:
  360/150 → NWD = 30 → **12/5**;
- **dodawanie** — sprowadzamy do wspólnego mianownika, którym jest NWW
  mianowników, a wynik skracamy:
  1/12 + 1/18 → NWW = 36 → 3/36 + 2/36 = **5/36**.

```python
def nwd(a, b):
    while b != 0:
        a, b = b, a % b
    return a

licznik, mianownik = 360, 150
d = nwd(licznik, mianownik)
print(licznik // d, "/", mianownik // d)
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    12 / 5
    ```

    Python ma też gotowe funkcje `math.gcd()` i `math.lcm()` (moduł `math`
    znasz z tematu o funkcjach). Przydają się do sprawdzenia własnego wyniku —
    ale na lekcji piszesz algorytm sam.

!!! warning "Najczęstsze błędy"

    | Objaw | Przyczyna | Co zrobić |
    | --- | --- | --- |
    | program „wisi”, okienko przerywa go po 10 s | pętla `while`, której warunek nigdy nie staje się fałszywy — np. odejmowanie z zerem | sprawdź, co w pętli zmienia warunek; wersja z odejmowaniem tylko dla liczb dodatnich |
    | NWD wychodzi równe drugiej liczbie | `a = b` i `b = a % b` w dwóch wierszach | przypisanie równoległe `a, b = b, a % b` |
    | `ZeroDivisionError` | zwracane `b` zamiast `a`, a potem dzielenie przez to zero | po pętli `return a` — w `b` jest wtedy 0 |
    | NWW wychodzi `36.0` | dzielenie `/` | `a * b // nwd(a, b)` |
    | `return` w środku pętli — wynik po pierwszym obrocie | wcięcie `return` takie jak instrukcji w pętli | `return` na poziomie `while`, nie w jej wnętrzu |

## Ćwiczenia

Ćwiczenia 1–2 robi każdy — to wymagania na oceny 2–3. Ćwiczenia 3 i 4 są na
ocenę dobrą, 5 — na bardzo dobrą. Każde ćwiczenie możesz zrobić w okienku pod
jego treścią: **✓ Sprawdź** uruchamia twój program albo wywołuje twoje
funkcje, a **⤓ Zapisz .py** zapisuje kod jako plik. Możesz też pobrać cały
szkielet i pracować w online-python.com. Miejsca do uzupełnienia są oznaczone
komentarzem `# TODO`.

[:material-language-python: Szkielet ćwiczeń (.py)](../pliki/python-euklides-2loa.py){ .md-button .md-button--primary download="python-euklides-2loa.py" }

!!! note "Ćwiczenie 1. NWD z odejmowaniem"

    Napisz funkcję `nwd_odejmowanie(a, b)`, która liczy NWD dwóch liczb
    dodatnich algorytmem z sekcji 2: dopóki liczby są różne, od większej odejmuje
    mniejszą. Funkcja **zwraca** wynik (`return`), a nie wypisuje go.

    ```python
    def nwd_odejmowanie(a, b):
        # TODO: dopóki a i b są różne, od większej odejmij mniejszą
        return a


    print(nwd_odejmowanie(360, 150))   # ma być 30
    print(nwd_odejmowanie(12, 18))     # ma być 6
    ```

    <div class="py-konsola" data-nazwa="euklides-cw1.py"><script type="application/json" class="py-testy">[{"kod": "print(nwd_odejmowanie(360, 150))", "wynik": "30", "opis": "wywołanie", "pokaz": "nwd_odejmowanie(360, 150)"}, {"kod": "print(nwd_odejmowanie(12, 18))", "wynik": "6", "opis": "wywołanie", "pokaz": "nwd_odejmowanie(12, 18)"}, {"kod": "print(nwd_odejmowanie(7, 7))", "wynik": "7", "opis": "wywołanie", "pokaz": "nwd_odejmowanie(7, 7)"}, {"kod": "print(nwd_odejmowanie(17, 5))", "wynik": "1", "opis": "wywołanie", "pokaz": "nwd_odejmowanie(17, 5)"}, {"kod": "print(nwd_odejmowanie(1071, 462))", "wynik": "21", "opis": "wywołanie", "pokaz": "nwd_odejmowanie(1071, 462)"}]</script></div>

    ??? tip "Podpowiedź 1"

        Przejdź algorytm z tabeli w sekcji 2: co się powtarza i kiedy przestaje?

    ??? tip "Podpowiedź 2"

        Powtarzanie „dopóki liczby są różne” to `while a != b:`. W środku `if a > b:` — odejmij od `a`, w przeciwnym razie od `b`.

    ??? tip "Podpowiedź 3"

        ```python
        while a != b:
            if a > b:
                a = a - b
            else:
                b = b - a
        return a
        ```

        `return` stoi **za** pętlą — na poziomie słowa `while`.

!!! note "Ćwiczenie 2. Kroki algorytmu"

    Program wczytuje dwie liczby dodatnie, każdą w osobnym wierszu, i wypisuje
    kolejne pary `a b` z algorytmu z odejmowaniem — zaczynając od wczytanej pary —
    a na końcu wiersz `NWD = …`. Dla 12 i 18:

    ```text
    12 18
    12 6
    6 6
    NWD = 6
    ```

    W karcie pracy zapisz, ile odejmowań program wykonał dla 1071 i 462.

    ```python
    a = int(input())
    b = int(input())

    # TODO: wypisz parę a b, a potem — dopóki liczby są różne — odejmuj i wypisuj kolejne pary

    print("NWD =", a)
    ```

    <div class="py-konsola" data-nazwa="euklides-cw2.py" data-wejscie="12&#10;18"><script type="application/json" class="py-testy">[{"wejscie": "12\n18", "wynik": "12 18\n12 6\n6 6\nNWD = 6"}, {"wejscie": "360\n150", "wynik": "360 150\n210 150\n60 150\n60 90\n60 30\n30 30\nNWD = 30"}, {"wejscie": "9\n9", "wynik": "9 9\nNWD = 9"}]</script></div>

    ??? tip "Podpowiedź 1"

        To pętla z ćwiczenia 1, ale zamiast funkcji — zwykły program. Pierwszą parę trzeba wypisać jeszcze **przed** pętlą.

    ??? tip "Podpowiedź 2"

        `print(a, b)` stoi dwa razy: raz przed `while`, raz na końcu wnętrza pętli — po odejmowaniu.

    ??? tip "Podpowiedź 3"

        ```python
        print(a, b)
        while a != b:
            if a > b:
                a = a - b
            else:
                b = b - a
            print(a, b)
        ```

        Liczbę odejmowań policzysz z liczby wypisanych wierszy: wierszy z parami jest o jeden więcej niż odejmowań.

!!! note "Ćwiczenie 3. NWD z dzieleniem"

    Napisz funkcję `nwd(a, b)`, która liczy NWD algorytmem z sekcji 4 — z resztą
    z dzielenia. Ma działać także wtedy, gdy jedna z liczb jest zerem.

    ```python
    def nwd(a, b):
        # TODO: dopóki b nie jest zerem, zastąp parę (a, b) parą (b, a % b)
        return a


    print(nwd(360, 150))   # ma być 30
    print(nwd(1071, 462))  # ma być 21
    ```

    <div class="py-konsola" data-nazwa="euklides-cw3.py"><script type="application/json" class="py-testy">[{"kod": "print(nwd(360, 150))", "wynik": "30", "opis": "wywołanie", "pokaz": "nwd(360, 150)"}, {"kod": "print(nwd(1071, 462))", "wynik": "21", "opis": "wywołanie", "pokaz": "nwd(1071, 462)"}, {"kod": "print(nwd(100, 1))", "wynik": "1", "opis": "wywołanie", "pokaz": "nwd(100, 1)"}, {"kod": "print(nwd(17, 0))", "wynik": "17", "opis": "wywołanie", "pokaz": "nwd(17, 0)"}, {"kod": "print(nwd(0, 5))", "wynik": "5", "opis": "wywołanie", "pokaz": "nwd(0, 5)"}, {"kod": "print(nwd(1000000, 3))", "wynik": "1", "opis": "wywołanie", "pokaz": "nwd(1000000, 3)"}]</script></div>

    ??? tip "Podpowiedź 1"

        Pętla kręci się, dopóki reszta nie wyjdzie zero. Która zmienna przechowuje resztę po każdym kroku?

    ??? tip "Podpowiedź 2"

        Warunek: `while b != 0:`. W środku jeden wiersz — przypisanie równoległe z sekcji 4.

    ??? tip "Podpowiedź 3"

        ```python
        while b != 0:
            a, b = b, a % b
        return a
        ```

!!! note "Ćwiczenie 4. NWW"

    Napisz funkcję `nww(a, b)`, która liczy najmniejszą wspólną wielokrotność
    dwóch liczb dodatnich, korzystając z funkcji `nwd()`. Wklej do okienka swoją
    funkcję `nwd()` z ćwiczenia 3.

    W karcie pracy rozwiąż zadanie: tramwaj odjeżdża z pętli co 15 minut,
    a autobus co 25 minut. O 7:00 odjechały razem. O której znów odjadą razem?

    ```python
    # Tu wklej swoją funkcję nwd() z ćwiczenia 3.


    def nww(a, b):
        return 0    # TODO: jeden wiersz z wywołaniem nwd()


    print(nww(12, 18))   # ma być 36
    ```

    <div class="py-konsola" data-nazwa="euklides-cw4.py"><script type="application/json" class="py-testy">[{"kod": "print(nww(12, 18))", "wynik": "36", "opis": "wywołanie", "pokaz": "nww(12, 18)"}, {"kod": "print(nww(4, 6))", "wynik": "12", "opis": "wywołanie", "pokaz": "nww(4, 6)"}, {"kod": "print(nww(7, 5))", "wynik": "35", "opis": "wywołanie", "pokaz": "nww(7, 5)"}, {"kod": "print(nww(21, 6))", "wynik": "42", "opis": "wywołanie", "pokaz": "nww(21, 6)"}]</script></div>

    ??? tip "Podpowiedź 1"

        Zależność z sekcji 5: NWD · NWW = a · b.

    ??? tip "Podpowiedź 2"

        NWW = a · b podzielone przez NWD. Dzielenie całkowite to `//`.

    ??? tip "Podpowiedź 3"

        `return a * b // nwd(a, b)`. Jeśli okienko zgłasza `NameError: name 'nwd' is not defined`, nie wkleiłeś funkcji z ćwiczenia 3.

!!! note "Ćwiczenie 5. Ułamki"

    Napisz dwie funkcje, które zwracają napis w postaci `licznik/mianownik`,
    z ułamkiem **skróconym** — także wtedy, gdy mianownik wyjdzie 1 (`"1/1"`):

    - `skroc(licznik, mianownik)` — `skroc(360, 150)` daje `"12/5"`;
    - `dodaj(l1, m1, l2, m2)` — dodaje `l1/m1 + l2/m2`: `dodaj(1, 12, 1, 18)`
      daje `"5/36"`.

    Wklej do okienka swoje funkcje `nwd()` i `nww()`. W karcie pracy skróć 84/126
    i dodaj 7/12 + 5/18.

    ```python
    # Tu wklej swoje funkcje nwd() i nww() z ćwiczeń 3 i 4.


    def skroc(licznik, mianownik):
        # TODO: podziel licznik i mianownik przez ich NWD
        return str(licznik) + "/" + str(mianownik)


    def dodaj(l1, m1, l2, m2):
        # TODO: wspólny mianownik = NWW(m1, m2), dodaj liczniki, wynik skróć
        return ""


    print(skroc(360, 150))       # ma być 12/5
    print(dodaj(1, 12, 1, 18))   # ma być 5/36
    ```

    <div class="py-konsola" data-nazwa="euklides-cw5.py"><script type="application/json" class="py-testy">[{"kod": "print(skroc(360, 150))", "wynik": "12/5", "opis": "wywołanie", "pokaz": "skroc(360, 150)"}, {"kod": "print(skroc(6, 8))", "wynik": "3/4", "opis": "wywołanie", "pokaz": "skroc(6, 8)"}, {"kod": "print(skroc(5, 7))", "wynik": "5/7", "opis": "wywołanie", "pokaz": "skroc(5, 7)"}, {"kod": "print(dodaj(1, 12, 1, 18))", "wynik": "5/36", "opis": "wywołanie", "pokaz": "dodaj(1, 12, 1, 18)"}, {"kod": "print(dodaj(1, 2, 1, 3))", "wynik": "5/6", "opis": "wywołanie", "pokaz": "dodaj(1, 2, 1, 3)"}, {"kod": "print(dodaj(1, 4, 1, 4))", "wynik": "1/2", "opis": "wywołanie", "pokaz": "dodaj(1, 4, 1, 4)"}, {"kod": "print(dodaj(3, 4, 1, 4))", "wynik": "1/1", "opis": "wywołanie", "pokaz": "dodaj(3, 4, 1, 4)"}]</script></div>

    ??? tip "Podpowiedź 1"

        Skracanie: licznik i mianownik dzielisz przez tę samą liczbę — ich NWD. Dodawanie: najpierw wspólny mianownik, potem suma liczników, na końcu skracanie.

    ??? tip "Podpowiedź 2"

        Napis składasz z liczb funkcją `str()`: `str(12) + "/" + str(5)`. Wspólny mianownik `m = nww(m1, m2)`, a pierwszy licznik mnożysz przez `m // m1`.

    ??? tip "Podpowiedź 3"

        ```python
        def dodaj(l1, m1, l2, m2):
            m = nww(m1, m2)
            licznik = l1 * (m // m1) + l2 * (m // m2)
            return skroc(licznik, m)
        ```

## Sprawdź się

<div class="quiz" markdown="0">
<script type="application/json">
[
  {
    "pytanie": "Podłoga ma wymiary 240 × 180 cm. Jaki największy bok mogą mieć kwadratowe płytki, żeby pokryły ją bez docinania?",
    "odpowiedz": ["60", "60 cm"],
    "wyjasnienie": "To NWD(240, 180) = 60: (240, 180) → (180, 60) → (60, 0)."
  },
  {
    "pytanie": "Kiedy kończy się pętla while a != b: …?",
    "opcje": [
      "Po wykonaniu tylu obrotów, ile wynosi a",
      "Gdy warunek a != b przestanie być prawdziwy, czyli gdy a == b",
      "Po jednym obrocie",
      "Gdy a stanie się zerem"
    ],
    "poprawna": 1,
    "wyjasnienie": "while powtarza wnętrze, dopóki warunek jest prawdziwy. Warunek sprawdzany jest przed każdym obrotem."
  },
  {
    "pytanie": "Ile kroków (obrotów pętli) wykona algorytm Euklidesa z dzieleniem dla liczb 360 i 150?",
    "opcje": ["5", "1", "30", "3"],
    "poprawna": 3,
    "wyjasnienie": "(360, 150) → (150, 60) → (60, 30) → (30, 0). Wersja z odejmowaniem potrzebuje pięciu kroków."
  },
  {
    "pytanie": "Co się stanie po wywołaniu nwd_odejmowanie(5, 0)?",
    "opcje": [
      "Funkcja zwróci 5",
      "Funkcja zwróci 0",
      "Pętla nigdy się nie skończy",
      "Python zgłosi ZeroDivisionError"
    ],
    "poprawna": 2,
    "wyjasnienie": "5 − 0 = 5 w każdym obrocie, a nie zrówna się z b = 0. W wersji z odejmowaniem nie ma dzielenia, więc nie ma też ZeroDivisionError — jest pętla bez końca."
  },
  {
    "pytanie": "Jak policzyć NWW, gdy masz już funkcję nwd()?",
    "opcje": [
      "a * b // nwd(a, b)",
      "nwd(a, b) * 2",
      "a + b - nwd(a, b)",
      "a * b * nwd(a, b)"
    ],
    "poprawna": 0,
    "wyjasnienie": "NWD · NWW = a · b, więc NWW = a · b / NWD. Dzielenie // daje liczbę całkowitą."
  },
  {
    "pytanie": "Po a, b = 360, 150 wykonano a, b = b, a % b. Ile wynoszą teraz a i b?",
    "opcje": ["a = 150, b = 0", "a = 150, b = 60", "a = 60, b = 150", "a = 210, b = 150"],
    "poprawna": 1,
    "wyjasnienie": "Obie wartości po prawej liczone są ze starych a i b: b = 150, a % b = 360 % 150 = 60. Dopiero potem trafiają do zmiennych."
  },
  {
    "pytanie": "Do jakiego mianownika sprowadzisz ułamki 1/12 i 1/18, żeby je dodać jak najmniejszymi liczbami?",
    "odpowiedz": ["36"],
    "wyjasnienie": "Najmniejszy wspólny mianownik to NWW(12, 18) = 36: 1/12 = 3/36, 1/18 = 2/36, razem 5/36."
  }
]
</script>
</div>

## Karta pracy

Wypełnij kartę na lekcji, a potem pobierz gotowy dokument Worda i oddaj go
przez **Zadania domowe w dzienniku VULCAN** — albo kliknij **Wyślij do
nauczyciela**. Do zrzutów ekranu wystarczy klawisz ++print-screen++ albo
++win+shift+s++.

<div class="kp-podsumowanie" data-karta="algorytm-euklidesa"></div>

<span id="karta" class="kp-kotwica"></span>

???+ karta "Rozwiń kartę pracy"

    <div class="karta-pracy" data-karta="algorytm-euklidesa"></div>

---

*Wyniki przykładów i testy ćwiczeń policzono programami z tej strony; okienka
używają Pythona 3.14, a online-python.com — 3.12, i w obu wyniki są takie
same. Stan sprawdzony 9 listopada 2026 r..*
