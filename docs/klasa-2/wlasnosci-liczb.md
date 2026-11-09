# Badanie własności liczb całkowitych

!!! abstract "O tym temacie"

    **2 godziny lekcyjne** · Dział II. Algorytmika i programowanie w Pythonie
    · podstawa programowa **I.1, I.2.a, I.3**

    Liczby pierwsze wyglądają na matematyczną ciekawostkę, a pilnują twoich
    pieniędzy: na wielkich liczbach pierwszych opiera się szyfrowanie RSA,
    którym zabezpiecza się połączenia w internecie. Dziś napiszesz funkcje, które
    badają liczby: wypisują dzielniki, sprawdzają, czy liczba jest pierwsza,
    rozkładają ją na czynniki. Zobaczysz też, że jeden pomysł potrafi
    przyspieszyć program **tysiąc razy** — i jak dobrać testy, żeby złapać
    błąd, którego nie widać na pierwszy rzut oka.

    ??? abstract "Plan dwóch lekcji"

        | Lekcja | Sekcje | Ćwiczenia |
        | :---: | --- | --- |
        | 1 | 1–4: dzielniki, liczby pierwsze, sprawdzanie do pierwiastka, testowanie | 1–3 |
        | 2 | 5–6: sito Eratostenesa, zadania o liczbach (przedział, rozkład na czynniki) | 4–6 |

??? rozgrzewka "Na rozgrzewkę — 3 minuty, bez zaglądania"

    Odpowiedz w zeszycie, zanim zaczniesz nowy temat. Odpowiedzi rozwiń
    dopiero wtedy, gdy wszyscy skończą — nie liczą się do oceny.

    1. **Z poprzedniej lekcji.** Podaj NWD(24, 36) i NWW(24, 36).
    2. **Sprzed kilku tygodni.** Co wypisze `print(91 % 7 == 0, 91 % 6)`?
    3. **Z matematyki.** Które z liczb 1, 2, 9, 11, 21 są pierwsze?

    ??? success "Odpowiedzi"

        1. NWD = **12**, NWW = **72** (24 · 36 / 12).
        2. `True 1` — 91 dzieli się przez 7 bez reszty, przez 6 z resztą 1.
           Dziś warunek `n % d == 0` będzie znaczył „d jest dzielnikiem n”.
        3. **2 i 11**. 1 nie jest liczbą pierwszą (ma tylko jeden dzielnik),
           9 = 3 · 3, a 21 = 3 · 7.

!!! success "Kryteria sukcesu — sprawdź się na koniec tematu"

    Po tych dwóch lekcjach:

    1. Wypiszę wszystkie dzielniki liczby, sprawdzając resztę z dzielenia.
    2. Wyjaśnię, czym jest liczba pierwsza, i napiszę funkcję, która to sprawdza.
    3. Przyspieszę sprawdzanie pierwszości, kończąc pętlę na pierwiastku z n, i wyjaśnię, dlaczego to wystarcza.
    4. Dobiorę dane testowe, które wyłapią błąd w funkcji: 0 i 1, najmniejszą liczbę pierwszą, kwadrat liczby pierwszej.
    5. Wyznaczę liczby pierwsze sitem Eratostenesa na kartce i opiszę, jak działa.
    6. Wykorzystam funkcję pierwszości w zadaniach o liczbach: policzę liczby pierwsze w przedziale i rozłożę liczbę na czynniki.

!!! tip "Przykłady uruchomisz na tej stronie"

    Pod przykładami są okienka z Pythonem: zmień kod i kliknij **▶ Uruchom**
    (albo ++ctrl+enter++). **Zanim klikniesz, przewiduj**, co wypisze program —
    wynik sprawdzisz w ramce „Przewiduj, potem sprawdź wynik”. W ćwiczeniach
    przycisk **✓ Sprawdź** wywoła twoje funkcje na kilku liczbach i powie,
    czy wynik się zgadza.

## 1. Dzielniki liczby

`d` jest **dzielnikiem** `n`, gdy `n` dzieli się przez `d` bez reszty, czyli
gdy `n % d == 0`. Żeby wypisać wszystkie dzielniki, wystarczy sprawdzić
kolejno liczby od 1 do `n`:

```python
n = 12
for d in range(1, n + 1):
    if n % d == 0:
        print(d, end=" ")
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    1 2 3 4 6 12
    ```

    `range(1, n + 1)` kończy się na `n` — górna granica `range()` nie wchodzi
    do zakresu. `end=" "` sprawia, że `print()` zamiast przejścia do nowego
    wiersza wstawia spację, więc dzielniki stoją w jednym wierszu.

## 2. Liczba pierwsza

**Liczba pierwsza** ma dokładnie **dwa** dzielniki: 1 i samą siebie.
2, 3, 5, 7, 11, 13… są pierwsze. **1 nie jest liczbą pierwszą** — ma tylko
jeden dzielnik. Liczby większe od 1, które nie są pierwsze, nazywa się
**złożonymi**.

Najprostsza funkcja wprost przepisuje definicję: liczy dzielniki i sprawdza,
czy jest ich dwa.

```python
def czy_pierwsza(n):
    ile = 0
    for d in range(1, n + 1):
        if n % d == 0:
            ile = ile + 1
    return ile == 2

print(czy_pierwsza(1), czy_pierwsza(2), czy_pierwsza(9), czy_pierwsza(13))
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    False True False True
    ```

    `return ile == 2` zwraca wynik porównania — `True` albo `False`. Taką funkcję,
    która odpowiada „tak” albo „nie”, nazywa się **funkcją logiczną**.

## 3. Wystarczy sprawdzić do pierwiastka

Funkcja z sekcji 2 dla liczby 1 000 003 sprawdza ponad milion dzielników.
Da się szybciej. Dzielniki występują **w parach**: jeśli `d` dzieli `n`, to
dzieli je też `n // d`. Dla 36: 1 · 36, 2 · 18, 3 · 12, 4 · 9, 6 · 6. W każdej
parze jedna liczba jest **nie większa niż √n**. Jeśli więc do √n nie ma żadnego
dzielnika (poza 1), to nie ma go wcale.

Zamiast liczyć pierwiastek, sprawdzamy warunek `d * d <= n` — i tu przydaje
się pętla `while` z poprzedniego tematu:

```python
def czy_pierwsza_szybko(n):
    if n < 2:
        return False
    d = 2
    while d * d <= n:
        if n % d == 0:
            return False      # znaleziony dzielnik — od razu koniec
        d = d + 1
    return True

print(czy_pierwsza_szybko(97), czy_pierwsza_szybko(1000003), czy_pierwsza_szybko(1000001))
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    True True False
    ```

    1 000 001 = 101 · 9901, więc funkcja kończy się już przy `d = 101`.
    Dla 1 000 003 pętla obraca się 999 razy zamiast ponad miliona.

!!! example "Przewiduj"

    Ile razy obróci się pętla `while` w `czy_pierwsza_szybko(97)`?

    ??? success "Przewiduj, potem sprawdź wynik"

        **8 razy** — dla `d` od 2 do 9. Przy `d = 10` warunek `10 * 10 <= 97`
        jest fałszywy. Wersja z sekcji 2 sprawdza 97 dzielników.

## 4. Testowanie — szukamy danych, które obnażą błąd

Funkcja, która działa dla kilku „zwykłych” liczb, wcale nie musi być dobra.
Dobre testy celują w **przypadki brzegowe**: 0 i 1, najmniejszą liczbę pierwszą
2, kwadrat liczby pierwszej (4, 9, 49), dużą liczbę.

!!! example "Przewiduj"

    Kolega napisał warunek pętli `while d * d < n:` (bez `=`). Sprawdził funkcję
    dla 7, 10, 13 i 15 — wszystkie wyniki dobre. Dla której liczby z listy
    4, 11, 49, 97 jego funkcja się pomyli?

    ??? success "Przewiduj, potem sprawdź wynik"

        Dla **4** i **49** — odpowie `True`, choć to 2 · 2 i 7 · 7. Dla 49
        pętla kończy się przy `d = 7`, bo `7 * 7 < 49` jest fałszywe, więc
        dzielnik 7 nie zostaje sprawdzony. Błąd wychodzi tylko dla kwadratów
        liczb pierwszych — dlatego takie liczby zawsze dopisujemy do testów.

Przycisk **✓ Sprawdź** w ćwiczeniach robi właśnie to: wywołuje funkcję dla
liczb dobranych tak, żeby złapać typowe błędy.

## 5. Sito Eratostenesa

Gdy potrzebujesz **wszystkich** liczb pierwszych do jakiejś granicy, szybciej
niż sprawdzać każdą osobno jest je **przesiać**. Sposób opisał Eratostenes
z Cyreny w III wieku p.n.e.

!!! kroki "Krok po kroku: liczby pierwsze do 30"

    Wypisz na kartce liczby od 2 do 30. Przed każdym krokiem przewidź,
    które liczby znikną.

    1. **Pierwsza nieskreślona liczba to 2 — jest pierwsza.** Skreśl jej
       wielokrotności, zaczynając od 2 · 2 = 4:

        ```text
        4 6 8 10 12 14 16 18 20 22 24 26 28 30
        ```

        Wszystkie liczby parzyste poza 2 nie są pierwsze.

    2. **Następna nieskreślona to 3.** Skreśl wielokrotności od 3 · 3 = 9:

        ```text
        9 15 21 27       (12, 18, 24, 30 już skreślone)
        ```

        Zaczynamy od 9, bo 6 skreśliła już dwójka.

    3. **Następna nieskreślona to 5.** Skreśl wielokrotności od 5 · 5 = 25:

        ```text
        25               (30 już skreślone)
        ```

        Kolejną nieskreśloną jest 7, a 7 · 7 = 49 to już więcej niż 30.

    4. **Koniec — tak samo jak przy sprawdzaniu do pierwiastka.** Wszystko,
       co zostało, jest pierwsze:

        ```text
        2 3 5 7 11 13 17 19 23 29
        ```

        10 liczb pierwszych do 30.

W Pythonie potrzebujesz **listy** — ciągu wartości w nawiasach kwadratowych.
`[True] * (n + 1)` tworzy listę z `n + 1` wartościami `True`; `pierwsza[w]` to
element o numerze `w`, a `wynik.append(i)` dopisuje `i` na końcu listy.
`range(p * p, n + 1, p)` podaje liczby od `p * p` do `n` **co `p`** — trzeci
argument to krok.

```python
def sito(n):
    pierwsza = [True] * (n + 1)      # pierwsza[i] mówi, czy i jest jeszcze nieskreślone
    pierwsza[0] = False
    pierwsza[1] = False
    p = 2
    while p * p <= n:
        if pierwsza[p]:
            for w in range(p * p, n + 1, p):
                pierwsza[w] = False  # skreślamy wielokrotności p
        p = p + 1
    wynik = []
    for i in range(n + 1):
        if pierwsza[i]:
            wynik.append(i)
    return wynik

print(sito(30))
print(len(sito(1000)))
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
    168
    ```

    `len()` podaje długość listy — do tysiąca jest 168 liczb pierwszych.

## 6. Zadania o liczbach

Mając funkcję `czy_pierwsza_szybko()`, odpowiesz na wiele pytań kilkoma
wierszami kodu. Przykład: **rozkład na czynniki pierwsze**. Dzielimy liczbę
przez najmniejszy dzielnik, dopóki się da, a potem przechodzimy do następnego:

```python
n = 360
d = 2
while n > 1:
    if n % d == 0:
        print(d, end=" ")
        n = n // d
    else:
        d = d + 1
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    2 2 2 3 3 5
    ```

    360 = 2 · 2 · 2 · 3 · 3 · 5. Czynniki wychodzą pierwsze same z siebie:
    zanim `d` dojdzie do 4, wszystkie dwójki są już z liczby usunięte.

Inne pytania tego samego typu: ile jest liczb pierwszych w przedziale, które
pary liczb pierwszych różnią się o 2 (3 i 5, 11 i 13 — tak zwane **liczby
bliźniacze**), czy liczba jest **doskonała** — równa sumie swoich dzielników
mniejszych od niej (6 = 1 + 2 + 3).

!!! warning "Najczęstsze błędy"

    | Objaw | Przyczyna | Co zrobić |
    | --- | --- | --- |
    | 1 wychodzi pierwsza | brak osobnego warunku dla `n < 2` | `if n < 2: return False` na początku funkcji |
    | 4, 9, 49 wychodzą pierwsze | `d * d < n` zamiast `d * d <= n` | warunek z `<=`; testuj kwadratami liczb pierwszych |
    | każda liczba wychodzi złożona | pętla zaczyna od `d = 1` — a 1 dzieli wszystko | w wersji szybkiej sprawdzaj od `d = 2` |
    | funkcja zwraca wynik po pierwszym obrocie | `return True` w środku pętli | `return True` dopiero **za** pętlą — gdy żaden dzielnik się nie znalazł |
    | program „wisi” | w `while` brak `d = d + 1` | coś w pętli musi zbliżać ją do końca |
    | dzielniki bez `n` na końcu | `range(1, n)` | `range(1, n + 1)` |

## Ćwiczenia

Na pierwszej lekcji zrób ćwiczenia 1–3, na drugiej 4–6. Ćwiczenia 1–2 robi
każdy (oceny 2–3), 3–4 są na ocenę dobrą, 5–6 — na bardzo dobrą, a 7 jest dla
chętnych. **✓ Sprawdź** uruchamia twój program albo wywołuje twoje funkcje,
a **⤓ Zapisz .py** zapisuje kod jako plik. Miejsca do uzupełnienia są
oznaczone komentarzem `# TODO`.

[:material-language-python: Szkielet ćwiczeń (.py)](../pliki/python-liczby-2loa.py){ .md-button .md-button--primary download="python-liczby-2loa.py" }

!!! note "Ćwiczenie 1. Dzielniki"

    Program wczytuje liczbę całkowitą dodatnią `n` i wypisuje w jednym wierszu
    wszystkie jej dzielniki od najmniejszego, oddzielone spacjami. Dla 12:
    `1 2 3 4 6 12`.

    W karcie pracy wypisz dzielniki liczby 2026 i napisz, czy jest pierwsza.

    ```python
    n = int(input())

    # TODO: sprawdź liczby od 1 do n; dzielniki wypisuj w jednym wierszu (end=" ")
    ```

    <div class="py-konsola" data-nazwa="liczby-cw1.py" data-wejscie="12"><script type="application/json" class="py-testy">[{"wejscie": "12", "wynik": "1 2 3 4 6 12"}, {"wejscie": "7", "wynik": "1 7"}, {"wejscie": "1", "wynik": "1"}, {"wejscie": "36", "wynik": "1 2 3 4 6 9 12 18 36"}]</script></div>

    ??? tip "Podpowiedź 1"

        To program z sekcji 1 — z tą różnicą, że `n` pochodzi z `input()`.

    ??? tip "Podpowiedź 2"

        `for d in range(1, n + 1):`, a w środku warunek `if n % d == 0:`.

    ??? tip "Podpowiedź 3"

        W warunku `print(d, end=" ")`. Bez `end` każdy dzielnik trafi do osobnego wiersza.

!!! note "Ćwiczenie 2. Czy liczba jest pierwsza?"

    Napisz funkcję `czy_pierwsza(n)`, która zwraca `True`, gdy `n` jest liczbą
    pierwszą, i `False` w przeciwnym razie. Policz dzielniki tak jak w sekcji 2 —
    liczba pierwsza ma ich dokładnie dwa.

    ```python
    def czy_pierwsza(n):
        ile = 0
        # TODO: policz dzielniki n
        return False    # TODO: zwróć wynik porównania ile z liczbą 2


    print(czy_pierwsza(13))   # ma być True
    print(czy_pierwsza(1))    # ma być False
    ```

    <div class="py-konsola" data-nazwa="liczby-cw2.py"><script type="application/json" class="py-testy">[{"kod": "print(czy_pierwsza(2))", "wynik": "True", "opis": "wywołanie", "pokaz": "czy_pierwsza(2)"}, {"kod": "print(czy_pierwsza(1))", "wynik": "False", "opis": "wywołanie", "pokaz": "czy_pierwsza(1)"}, {"kod": "print(czy_pierwsza(9))", "wynik": "False", "opis": "wywołanie", "pokaz": "czy_pierwsza(9)"}, {"kod": "print(czy_pierwsza(13))", "wynik": "True", "opis": "wywołanie", "pokaz": "czy_pierwsza(13)"}, {"kod": "print(czy_pierwsza(97))", "wynik": "True", "opis": "wywołanie", "pokaz": "czy_pierwsza(97)"}, {"kod": "print(czy_pierwsza(91))", "wynik": "False", "opis": "wywołanie", "pokaz": "czy_pierwsza(91)"}]</script></div>

    ??? tip "Podpowiedź 1"

        Zamiast wypisywać dzielniki jak w ćwiczeniu 1, zwiększaj licznik `ile`.

    ??? tip "Podpowiedź 2"

        W pętli `if n % d == 0: ile = ile + 1`. Po pętli porównaj `ile` z 2.

    ??? tip "Podpowiedź 3"

        Ostatni wiersz: `return ile == 2` — porównanie samo jest wartością `True` albo `False`.

!!! note "Ćwiczenie 3. Szybciej — do pierwiastka"

    Napisz funkcję `czy_pierwsza_szybko(n)`, która sprawdza dzielniki od 2,
    dopóki `d * d <= n` — pętlą `while`. Dla `n < 2` od razu zwraca `False`.
    Testy sprawdzą też 49 i liczby powyżej miliona.

    W karcie pracy wyjaśnij, po co w testach jest liczba 49.

    ```python
    def czy_pierwsza_szybko(n):
        if n < 2:
            return False
        d = 2
        # TODO: dopóki d * d <= n — jeśli d dzieli n, zwróć False; potem zwiększ d
        return True


    print(czy_pierwsza_szybko(97))   # ma być True
    print(czy_pierwsza_szybko(49))   # ma być False
    ```

    <div class="py-konsola" data-nazwa="liczby-cw3.py"><script type="application/json" class="py-testy">[{"kod": "print(czy_pierwsza_szybko(1))", "wynik": "False", "opis": "wywołanie", "pokaz": "czy_pierwsza_szybko(1)"}, {"kod": "print(czy_pierwsza_szybko(2))", "wynik": "True", "opis": "wywołanie", "pokaz": "czy_pierwsza_szybko(2)"}, {"kod": "print(czy_pierwsza_szybko(49))", "wynik": "False", "opis": "wywołanie", "pokaz": "czy_pierwsza_szybko(49)"}, {"kod": "print(czy_pierwsza_szybko(97))", "wynik": "True", "opis": "wywołanie", "pokaz": "czy_pierwsza_szybko(97)"}, {"kod": "print(czy_pierwsza_szybko(1000003))", "wynik": "True", "opis": "wywołanie", "pokaz": "czy_pierwsza_szybko(1000003)"}, {"kod": "print(czy_pierwsza_szybko(1000001))", "wynik": "False", "opis": "wywołanie", "pokaz": "czy_pierwsza_szybko(1000001)"}]</script></div>

    ??? tip "Podpowiedź 1"

        Pętla `while` z sekcji 3. Znaleziony dzielnik kończy funkcję od razu.

    ??? tip "Podpowiedź 2"

        `while d * d <= n:` — w środku `if n % d == 0: return False`, a potem `d = d + 1`.

    ??? tip "Podpowiedź 3"

        `return True` zostaje **za** pętlą: wykona się tylko wtedy, gdy żaden dzielnik się nie znalazł. Gdy program „wisi”, brakuje `d = d + 1`.

!!! note "Ćwiczenie 4. Liczby pierwsze w przedziale"

    Napisz funkcję `ile_pierwszych(a, b)`, która zwraca, ile liczb pierwszych
    jest w przedziale od `a` do `b` **włącznie**. Skorzystaj z funkcji
    `czy_pierwsza_szybko()` — wklej ją do okienka.

    W karcie pracy policz liczby pierwsze od 1 do 1000 i od 2000 do 2100.

    ```python
    # Tu wklej swoją funkcję czy_pierwsza_szybko() z ćwiczenia 3.


    def ile_pierwszych(a, b):
        ile = 0
        # TODO: sprawdź każdą liczbę od a do b włącznie
        return ile


    print(ile_pierwszych(1, 100))   # ma być 25
    ```

    <div class="py-konsola" data-nazwa="liczby-cw4.py"><script type="application/json" class="py-testy">[{"kod": "print(ile_pierwszych(1, 100))", "wynik": "25", "opis": "wywołanie", "pokaz": "ile_pierwszych(1, 100)"}, {"kod": "print(ile_pierwszych(100, 200))", "wynik": "21", "opis": "wywołanie", "pokaz": "ile_pierwszych(100, 200)"}, {"kod": "print(ile_pierwszych(1, 10))", "wynik": "4", "opis": "wywołanie", "pokaz": "ile_pierwszych(1, 10)"}, {"kod": "print(ile_pierwszych(2, 2))", "wynik": "1", "opis": "wywołanie", "pokaz": "ile_pierwszych(2, 2)"}, {"kod": "print(ile_pierwszych(14, 16))", "wynik": "0", "opis": "wywołanie", "pokaz": "ile_pierwszych(14, 16)"}]</script></div>

    ??? tip "Podpowiedź 1"

        Pętla po wszystkich liczbach przedziału i licznik — jak w ćwiczeniu 2, tylko zamiast dzielników liczysz liczby pierwsze.

    ??? tip "Podpowiedź 2"

        `for liczba in range(a, b + 1):` — `b + 1`, bo przedział jest domknięty.

    ??? tip "Podpowiedź 3"

        W pętli `if czy_pierwsza_szybko(liczba): ile = ile + 1`. Jeśli okienko zgłasza `NameError`, nie wkleiłeś funkcji z ćwiczenia 3.

!!! note "Ćwiczenie 5. Rozkład na czynniki pierwsze"

    Napisz funkcję `rozklad(n)`, która dla `n >= 2` zwraca **napis** z czynnikami
    pierwszymi `n` od najmniejszego, połączonymi znakiem `*`: `rozklad(360)` daje
    `"2*2*2*3*3*5"`, a `rozklad(97)` — `"97"`.

    W karcie pracy rozłóż 2026 i 9991.

    ```python
    def rozklad(n):
        wynik = ""
        d = 2
        # TODO: dopóki n > 1 — jeśli d dzieli n, dopisz d do wyniku i podziel n; inaczej zwiększ d
        return wynik


    print(rozklad(360))   # ma być 2*2*2*3*3*5
    ```

    <div class="py-konsola" data-nazwa="liczby-cw5.py"><script type="application/json" class="py-testy">[{"kod": "print(rozklad(360))", "wynik": "2\u002a2\u002a2\u002a3\u002a3\u002a5", "opis": "wywołanie", "pokaz": "rozklad(360)"}, {"kod": "print(rozklad(97))", "wynik": "97", "opis": "wywołanie", "pokaz": "rozklad(97)"}, {"kod": "print(rozklad(1001))", "wynik": "7\u002a11\u002a13", "opis": "wywołanie", "pokaz": "rozklad(1001)"}, {"kod": "print(rozklad(1024))", "wynik": "2\u002a2\u002a2\u002a2\u002a2\u002a2\u002a2\u002a2\u002a2\u002a2", "opis": "wywołanie", "pokaz": "rozklad(1024)"}, {"kod": "print(rozklad(2))", "wynik": "2", "opis": "wywołanie", "pokaz": "rozklad(2)"}]</script></div>

    ??? tip "Podpowiedź 1"

        Schemat jest w sekcji 6 — tam czynniki są wypisywane. Teraz trzeba je dopisywać do napisu `wynik`.

    ??? tip "Podpowiedź 2"

        Liczbę zamienisz na napis funkcją `str(d)`. Gwiazdkę dopisuj **przed** każdym czynnikiem oprócz pierwszego — czyli gdy `wynik` nie jest pusty.

    ??? tip "Podpowiedź 3"

        ```python
        while n > 1:
            if n % d == 0:
                if wynik != "":
                    wynik = wynik + "*"
                wynik = wynik + str(d)
                n = n // d
            else:
                d = d + 1
        ```

!!! note "Ćwiczenie 6. Sito Eratostenesa"

    Uzupełnij funkcję `sito(n)`, która zwraca listę liczb pierwszych nie większych
    od `n`. Brakuje najważniejszego — pętli, która skreśla wielokrotności `p`.
    Porównaj swój kod z sekcją 5 dopiero wtedy, gdy utkniesz.

    ```python
    def sito(n):
        pierwsza = [True] * (n + 1)
        pierwsza[0] = False
        pierwsza[1] = False
        p = 2
        while p * p <= n:
            if pierwsza[p]:
                pass    # TODO: skreśl (ustaw False) wielokrotności p, zaczynając od p * p
            p = p + 1
        wynik = []
        for i in range(n + 1):
            if pierwsza[i]:
                wynik.append(i)
        return wynik


    print(sito(30))   # ma być [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
    ```

    <div class="py-konsola" data-nazwa="liczby-cw6.py"><script type="application/json" class="py-testy">[{"kod": "print(sito(30))", "wynik": "[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]", "opis": "wywołanie", "pokaz": "sito(30)"}, {"kod": "print(sito(10))", "wynik": "[2, 3, 5, 7]", "opis": "wywołanie", "pokaz": "sito(10)"}, {"kod": "print(sito(2))", "wynik": "[2]", "opis": "wywołanie", "pokaz": "sito(2)"}, {"kod": "print(len(sito(1000)))", "wynik": "168", "opis": "wywołanie", "pokaz": "len(sito(1000))"}]</script></div>

    ??? tip "Podpowiedź 1"

        Skreślić to ustawić `pierwsza[w] = False` dla każdej wielokrotności `w` liczby `p`. Wielokrotności to `p * p`, `p * p + p`, `p * p + 2p`…

    ??? tip "Podpowiedź 2"

        Taki ciąg da `range(p * p, n + 1, p)` — trzeci argument to krok.

    ??? tip "Podpowiedź 3"

        Zamiast `pass`:

        ```python
        for w in range(p * p, n + 1, p):
            pierwsza[w] = False
        ```

!!! note "Ćwiczenie 7. Liczby bliźniacze (dla chętnych)"

    Napisz funkcję `blizniacze(n)`, która zwraca listę par `(p, p + 2)` liczb
    pierwszych, w których `p + 2 <= n`: `blizniacze(20)` daje
    `[(3, 5), (5, 7), (11, 13), (17, 19)]`. Parę zapisz jako `(p, p + 2)`
    i dopisz do listy metodą `append()`. Możesz użyć `sito()` albo
    `czy_pierwsza_szybko()`.

    ```python
    # Tu wklej funkcję, z której skorzystasz: sito() albo czy_pierwsza_szybko().


    def blizniacze(n):
        pary = []
        # TODO: dla każdej liczby pierwszej p sprawdź, czy p + 2 też jest pierwsza i nie większa od n
        return pary


    print(blizniacze(20))   # ma być [(3, 5), (5, 7), (11, 13), (17, 19)]
    ```

    <div class="py-konsola" data-nazwa="liczby-cw7.py"><script type="application/json" class="py-testy">[{"kod": "print(blizniacze(20))", "wynik": "[(3, 5), (5, 7), (11, 13), (17, 19)]", "opis": "wywołanie", "pokaz": "blizniacze(20)"}, {"kod": "print(len(blizniacze(100)))", "wynik": "8", "opis": "wywołanie", "pokaz": "len(blizniacze(100))"}, {"kod": "print(blizniacze(5))", "wynik": "[(3, 5)]", "opis": "wywołanie", "pokaz": "blizniacze(5)"}, {"kod": "print(blizniacze(4))", "wynik": "[]", "opis": "wywołanie", "pokaz": "blizniacze(4)"}]</script></div>

## Sprawdź się

<div class="quiz" markdown="0">
<script type="application/json">
[
  {
    "pytanie": "Który warunek w Pythonie znaczy „d jest dzielnikiem n”?",
    "opcje": ["n // d == 0", "n % d == 0", "d % n == 0", "n / d == 0"],
    "poprawna": 1,
    "wyjasnienie": "% daje resztę z dzielenia. Reszta zero oznacza, że n dzieli się przez d bez reszty. n // d == 0 jest prawdziwe tylko wtedy, gdy d > n."
  },
  {
    "pytanie": "Czy 1 jest liczbą pierwszą?",
    "opcje": [
      "Tak, bo dzieli się tylko przez 1 i przez siebie",
      "Nie, bo liczba pierwsza ma dokładnie dwa dzielniki, a 1 ma jeden",
      "Tak, bo jest najmniejszą liczbą naturalną dodatnią",
      "To zależy od języka programowania"
    ],
    "poprawna": 1,
    "wyjasnienie": "Liczba pierwsza ma dokładnie dwa różne dzielniki. 1 ma jeden, więc nie jest ani pierwsza, ani złożona."
  },
  {
    "pytanie": "Do jakiej liczby wystarczy sprawdzać dzielniki, żeby stwierdzić, czy 101 jest liczbą pierwszą?",
    "odpowiedz": ["10"],
    "wyjasnienie": "Do √101, czyli do 10: 10 · 10 = 100 ≤ 101, a 11 · 11 = 121 > 101. Żaden z dzielników od 2 do 10 nie pasuje, więc 101 jest pierwsza."
  },
  {
    "pytanie": "Funkcja z warunkiem while d * d < n: daje dobre wyniki dla 7, 10, 13 i 15. Która liczba ujawni błąd?",
    "opcje": ["11", "21", "49", "97"],
    "poprawna": 2,
    "wyjasnienie": "49 = 7 · 7. Pętla z < kończy się, zanim sprawdzi d = 7, więc funkcja uzna 49 za pierwszą. Kwadraty liczb pierwszych to obowiązkowy test."
  },
  {
    "pytanie": "Co wypisze program: for d in range(1, 7): if 6 % d == 0: print(d, end=\" \")",
    "opcje": ["1 2 3 6", "1 2 3", "2 3", "1 6"],
    "poprawna": 0,
    "wyjasnienie": "range(1, 7) to liczby od 1 do 6. Szóstkę dzielą 1, 2, 3 i 6."
  },
  {
    "pytanie": "W sicie Eratostenesa do 30 skreślasz wielokrotności 2, 3 i 5. Dlaczego nie trzeba skreślać wielokrotności 7?",
    "opcje": [
      "Bo 7 jest liczbą nieparzystą",
      "Bo 7 · 7 = 49 to więcej niż 30 — mniejsze wielokrotności 7 są już skreślone",
      "Bo 7 nie jest liczbą pierwszą",
      "Bo sito działa tylko dla liczb jednocyfrowych"
    ],
    "poprawna": 1,
    "wyjasnienie": "Wielokrotności 7 mniejsze od 49 (14, 21, 28) mają mniejszy dzielnik — 2 albo 3 — i zostały skreślone wcześniej. To ta sama zasada co sprawdzanie do pierwiastka."
  },
  {
    "pytanie": "Jaki jest rozkład liczby 1001 na czynniki pierwsze?",
    "opcje": ["7 · 11 · 13", "7 · 143", "11 · 91", "1001 — to liczba pierwsza"],
    "poprawna": 0,
    "wyjasnienie": "1001 = 7 · 143 = 7 · 11 · 13. 143 i 91 nie są pierwsze (143 = 11 · 13, 91 = 7 · 13), więc 7 · 143 i 11 · 91 to nie rozkład na czynniki pierwsze."
  },
  {
    "pytanie": "Ile razy obróci się pętla while d * d <= n w funkcji czy_pierwsza_szybko(97)? Wpisz liczbę.",
    "odpowiedz": ["8"],
    "wyjasnienie": "Dla d od 2 do 9 — przy d = 10 jest 100 > 97. Wersja sprawdzająca wszystkie liczby od 1 do 97 potrzebuje 97 obrotów."
  }
]
</script>
</div>

## Karta pracy

Kartę wypełniasz przez obie lekcje: zadania 1–3 na pierwszej, 4–6 na
drugiej. Potem pobierz gotowy dokument Worda i oddaj go przez **Zadania
domowe w dzienniku VULCAN** — albo kliknij **Wyślij do nauczyciela**. Do
zrzutów ekranu wystarczy klawisz ++print-screen++ albo ++win+shift+s++.

<div class="kp-podsumowanie" data-karta="wlasnosci-liczb"></div>

<span id="karta" class="kp-kotwica"></span>

???+ karta "Rozwiń kartę pracy"

    <div class="karta-pracy" data-karta="wlasnosci-liczb"></div>

---

*Wyniki przykładów i testy ćwiczeń policzono programami z tej strony; okienka
używają Pythona 3.14, a online-python.com — 3.12, i w obu wyniki są takie
same. Stan sprawdzony 9 listopada 2026 r..*
