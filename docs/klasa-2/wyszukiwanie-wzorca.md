# Wyszukiwanie wzorca w tekście

!!! abstract "O tym temacie"

    **1 godzina lekcyjna** · Dział II. Algorytmika i programowanie w Pythonie
    · podstawa programowa **I.1, I.2.b, I.3, II.1**

    ++ctrl+f++ w przeglądarce, wyszukiwarka w dzienniku, sprawdzanie, czy
    w haśle jest twoje imię — za każdym razem program szuka krótkiego napisu
    w dłuższym. Dziś zobaczysz, jak zrobić to gotowymi narzędziami Pythona,
    a potem napiszesz to samo sam — **algorytmem naiwnym**, od którego
    zaczyna się każda rozmowa o wyszukiwaniu.

??? rozgrzewka "Na rozgrzewkę — 3 minuty, bez zaglądania"

    Odpowiedz w zeszycie, zanim zaczniesz nowy temat. Odpowiedzi rozwiń
    dopiero wtedy, gdy wszyscy skończą — nie liczą się do oceny.

    1. **Z poprzedniej lekcji.** Funkcja kończy się instrukcją `print(wynik)` zamiast `return wynik`. Co zwraca jej wywołanie?
    2. **Sprzed kilku tygodni.** Co wypisze `print("3" + "4")`, a co `print(int("3") + 4)`?
    3. **Z dawniejszych tematów.** Robisz prezentację na lekcję. Czy wolno ci użyć zdjęcia na licencji **CC BY-NC**, jeśli podasz autora?

    ??? success "Odpowiedzi"

        1. `None` — wynik pojawia się na ekranie, ale nie wraca do programu.
        2. `34` i `7` — `+` napisy skleja, a liczby dodaje.
        3. Tak — NC zakazuje tylko użytku komercyjnego, a BY wymaga podania autora, co robisz.

!!! success "Kryteria sukcesu — sprawdź się na koniec lekcji"

    Po tej lekcji:

    1. Wyjaśnię, czym są tekst, wzorzec i pozycja wystąpienia — i dlaczego pozycje liczy się od zera.
    2. Wytnę z napisu fragment `tekst[i:i + m]` i powiem, ile ma znaków.
    3. Sprawdzę operatorem `in`, czy wzorzec jest w tekście, znajdę jego pozycję metodą `find()` — i nie dam się złapać na pozycję 0 w warunku.
    4. Zapiszę pętlę `for` z `range()` i przerwę ją instrukcją `break`.
    5. Napiszę algorytm naiwny i wyjaśnię, dlaczego pętla to `range(n - m + 1)`, a nie `range(n - m)`.
    6. Znajdę wystąpienia nakładające się i powiem, czego nie liczy `count()`.

!!! tip "Przykłady uruchomisz na tej stronie"

    Pod przykładami są okienka z Pythonem, takie jak w poprzednich tematach:
    zmień kod i kliknij **▶ Uruchom** (albo ++ctrl+enter++). **Zanim
    klikniesz, przewiduj**, co wypisze program — wynik sprawdzisz potem
    w ramce „Przewiduj, potem sprawdź wynik”. W ćwiczeniach przycisk
    **✓ Sprawdź** wywoła twoje funkcje na kilku tekstach i powie, czy wynik
    się zgadza, a pod poleceniem są podpowiedzi — odsłaniaj je po kolei.

## 1. O co chodzi w wyszukiwaniu wzorca

Mamy dwa napisy: dłuższy **tekst** i krótszy **wzorzec**. Pytamy, czy wzorzec
występuje w tekście, a jeśli tak — **gdzie**.

| Pojęcie | Znaczenie | Przykład dla tekstu `ABRAKADABRA` |
| --- | --- | --- |
| **tekst** | napis, w którym szukamy | `ABRAKADABRA` — 11 znaków |
| **wzorzec** | napis, którego szukamy | `ABRA` — 4 znaki |
| **wystąpienie** | miejsce, w którym kolejne znaki tekstu są dokładnie takie jak wzorzec | są dwa |
| **pozycja** | indeks pierwszego znaku wystąpienia, **liczony od zera** | `0` i `7` |

„Dokładnie takie” znaczy znak w znak: `abra` i `ABRA` to dla komputera dwa
różne napisy, a spacja też jest znakiem.

## 2. Napis to ciąg ponumerowanych znaków

Żeby cokolwiek w napisie znaleźć, trzeba umieć sięgnąć po jego fragment.
Każdy znak ma numer — **indeks** — liczony od zera:

```text
indeks:   0   1   2   3   4   5
znak:     A   N   A   N   A   S
```

```python
tekst = "ANANAS"
print(len(tekst))          # długość napisu
print(tekst[0], tekst[5])  # pierwszy i ostatni znak
print(tekst[-1])           # ostatni znak, licząc od końca
print(tekst[1:4])          # wycinek: znaki 1, 2, 3 — bez czwartego
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    6
    A S
    S
    NAN
    ```

**Wycinek** `tekst[a:b]` zawiera znaki od indeksu `a` do `b − 1` — prawy koniec
się nie liczy. Dzięki temu `tekst[i:i + m]` to dokładnie **m znaków od
pozycji i**, a właśnie tego będziemy za chwilę potrzebować.

## 3. Gotowe narzędzia Pythona

| Zapis | Co zwraca | Gdy wzorca nie ma |
| --- | --- | --- |
| `wzorzec in tekst` | `True` albo `False` | `False` |
| `tekst.find(wzorzec)` | pozycję **pierwszego** wystąpienia | `-1` |
| `tekst.count(wzorzec)` | liczbę wystąpień | `0` |
| `tekst.index(wzorzec)` | jak `find()` | błąd `ValueError` |
| `tekst.lower()` | ten sam tekst małymi literami | — |

```python
zdanie = "Ala ma kota, a kot ma Alę."
print("kot" in zdanie)
print(zdanie.find("kot"))
print(zdanie.find("pies"))
print(zdanie.count("ma"))
print(zdanie.count("a"))
print("ala" in zdanie, "ala" in zdanie.lower())
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    True
    7
    -1
    2
    5
    False True
    ```

Warto zwrócić uwagę na dwie rzeczy. `find("kot")` zwróciło 7, choć „kot” stoi
w zdaniu dwa razy — `find()` podaje tylko **pierwsze** wystąpienie. A liter
„a” jest w zdaniu pięć, bo wielkie `A` w „Ala” i „Alę” to dla Pythona inny
znak. Szukanie bez względu na wielkość liter to zamiana obu napisów na małe
litery **przed** porównaniem.

!!! danger "Pułapka: wynik `find()` w warunku"

    ```python
    zdanie = "Ala ma kota."
    if zdanie.find("Ala"):
        print("znalazłem")
    else:
        print("nie ma")
    ```

    <div class="py-konsola"></div>

    Przewiduj: „znalazłem” czy „nie ma”? Dopiero potem uruchom.

    ??? success "Przewiduj, potem sprawdź wynik"

        Program wypisze **„nie ma”**, choć „Ala” stoi na samym początku.
        `find()` zwróciło pozycję `0`, a zero w warunku znaczy tyle co fałsz.
        Brak wzorca to `-1`, które w warunku jest prawdą. Do pytania „czy jest”
        służy `in`; wynik `find()` porównuj jawnie:
        `if zdanie.find("Ala") != -1:`.

## 4. Pętla `for` — to samo dla kolejnych liczb

Żeby przyłożyć wzorzec po kolei w każdym miejscu tekstu, potrzebne jest
polecenie „zrób to samo dla i = 0, 1, 2, …”. W Pythonie robi to **pętla
`for`** z funkcją `range()`:

| Zapis | Kolejne wartości `i` |
| --- | --- |
| `for i in range(5):` | 0, 1, 2, 3, 4 — pięć liczb, **bez** piątki |
| `for i in range(2, 6):` | 2, 3, 4, 5 — od 2 do 5 |
| `for i in range(len(tekst)):` | wszystkie indeksy napisu |

Wszystko, co wcięte pod `for`, wykonuje się raz dla każdej wartości `i` —
tak samo jak ciało funkcji pod `def`. Instrukcja **`break`** przerywa pętlę
wcześniej, a `licznik += 1` to skrót od `licznik = licznik + 1`.

```python
tekst = "KOT"
for i in range(len(tekst)):
    print(i, tekst[i])

licznik = 0
for i in range(10):
    if i == 4:
        break                  # przy czwórce przerywamy pętlę
    licznik += 1
print("obroty pętli:", licznik)
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    0 K
    1 O
    2 T
    obroty pętli: 4
    ```

## 5. Algorytm naiwny

Gotowe metody to wygoda, ale nie wyjaśniają, **jak** komputer szuka. Najprostszy
pomysł jest taki, jak zrobiłby to człowiek z kartką:

1. przyłóż wzorzec do początku tekstu;
2. porównuj znak po znaku; jeśli wszystkie się zgadzają — to wystąpienie;
3. przesuń wzorzec **o jedno miejsce** w prawo i powtórz;
4. skończ, gdy wzorzec wystawałby poza tekst.

Nazywa się to **algorytmem naiwnym** — nie dlatego, że jest zły, tylko dlatego,
że niczego nie zapamiętuje: po każdym przesunięciu zaczyna porównywać od nowa.
Prześledź go krok po kroku, a potem wpisz własny tekst i wzorzec:

<div class="wzorzec-wiz" markdown="0">
<script type="application/json">
{ "tekst": "ABRAKADABRA", "wzorzec": "ABRA", "tryby": ["naiwny"] }
</script>
</div>

W Pythonie porównanie „znak po znaku” załatwia wycinek: `tekst[i:i + m]` to
fragment tekstu dokładnie pod przyłożonym wzorcem.

```python
def wystapienia(tekst, wzorzec):
    n, m = len(tekst), len(wzorzec)
    wynik = []
    for i in range(n - m + 1):            # każde możliwe ustawienie wzorca
        if tekst[i:i + m] == wzorzec:
            wynik.append(i)
    return wynik

print(wystapienia("ABRAKADABRA", "ABRA"))
print(wystapienia("ABRAKADABRA", "KOT"))
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    [0, 7]
    []
    ```

`wynik` zaczyna jako pusta lista `[]`, a `wynik.append(i)` dopisuje na jej
koniec pozycję każdego znalezionego wystąpienia.

### Ile jest ustawień wzorca

Tekst ma `n` znaków, wzorzec `m`. Pierwsze ustawienie to pozycja `0`, ostatnie —
takie, przy którym koniec wzorca trafia w koniec tekstu, czyli `n − m`.
Ustawień jest więc **n − m + 1**:

| Tekst | n | Wzorzec | m | Ustawienia | Ile |
| --- | :---: | --- | :---: | --- | :---: |
| `ABRAKADABRA` | 11 | `ABRA` | 4 | 0, 1, …, 7 | 8 |
| `ANANAS` | 6 | `AS` | 2 | 0, 1, …, 4 | 5 |
| `KOT` | 3 | `KOT` | 3 | tylko 0 | 1 |

Dlatego pętla to `range(n - m + 1)`. Napisz `range(n - m)`, a algorytm pominie
ostatnie ustawienie — i nie znajdzie wzorca stojącego na samym końcu tekstu.
To **błąd o jeden**, jeden z najczęstszych w całym programowaniu. Sprawdź go
w okienku wyżej: zmień pętlę i poszukaj `"BRA"`.

### Znak po znaku

Wycinek ukrywa, co naprawdę się dzieje. Ta sama funkcja bez wycinka pokazuje
to, co widać było w wizualizacji: porównujemy kolejne znaki i **przerywamy**
przy pierwszej różnicy. To pętla w pętli: zewnętrzna wybiera ustawienie `i`,
wewnętrzna przechodzi po znakach wzorca `j`.

```python
def wystapienia(tekst, wzorzec):
    n, m = len(tekst), len(wzorzec)
    wynik = []
    for i in range(n - m + 1):
        zgodne = 0
        for j in range(m):
            if tekst[i + j] != wzorzec[j]:
                break                     # różnica — porzucamy to ustawienie
            zgodne += 1
        if zgodne == m:                   # zgodne były wszystkie znaki
            wynik.append(i)
    return wynik

print(wystapienia("ABRAKADABRA", "ABRA"))
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    [0, 7]
    ```

    Wynik ten sam co z wycinkiem — zmienił się tylko sposób porównywania.

W najgorszym razie przy każdym z `n − m + 1` ustawień trzeba porównać wszystkie
`m` znaków — na przykład szukając `aaab` w tekście `aaaaaaaaab`. Dla długiego
tekstu i długiego wzorca to dużo pracy i dlatego istnieją sprytniejsze
algorytmy — omawia się je w zakresie rozszerzonym. W zwykłym tekście niezgodność pojawia
się zwykle już na pierwszym albo drugim znaku, więc algorytm naiwny radzi
sobie całkiem dobrze.

## 6. Wystąpienia, które na siebie zachodzą

```python
def wystapienia(tekst, wzorzec):
    n, m = len(tekst), len(wzorzec)
    wynik = []
    for i in range(n - m + 1):
        if tekst[i:i + m] == wzorzec:
            wynik.append(i)
    return wynik

print("banana".count("ana"))
print(wystapienia("banana", "ana"))
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    1
    [1, 3]
    ```

Ile razy „ana” jest w „banana”? Zależy, jak liczyć. Wystąpienia na pozycjach
1 i 3 **dzielą** środkowe „a”. `count()` po znalezieniu wystąpienia przeskakuje
za nie i szuka dalej — liczy tylko wystąpienia **rozłączne**. Algorytm naiwny
przesuwa wzorzec zawsze o jedno miejsce, więc znajduje także te nakładające
się. Nie ma tu dobrej i złej odpowiedzi — trzeba wiedzieć, o które pytanie
chodzi w zadaniu.

!!! warning "Najczęstsze błędy przy wyszukiwaniu"

    | Objaw | Przyczyna |
    | --- | --- |
    | nie znajduje wzorca stojącego na końcu tekstu | pętla `range(n - m)` zamiast `range(n - m + 1)` |
    | `IndexError: string index out of range` | w wersji znak po znaku pętla po `range(n)` — gdy końcówka tekstu pasuje do początku wzorca, `tekst[i + j]` wychodzi poza tekst |
    | nie znajduje „Ala” w „ala ma kota” | wielkość liter; zamień oba napisy przez `lower()` |
    | warunek z `find()` działa odwrotnie, gdy wzorzec jest na początku | pozycja `0` w warunku to fałsz; porównaj z `-1` albo użyj `in` |
    | funkcja zwraca tylko pierwsze wystąpienie albo zawsze `-1` | `return` wcięty do środka pętli |

## Ćwiczenia

Na lekcji zrób ćwiczenia 1–3. Ćwiczenia 4 i 5 są na ocenę bardzo dobrą —
możesz je dokończyć w domu. Każde ćwiczenie możesz zrobić w okienku pod jego
treścią. Przycisk
**✓ Sprawdź** uruchamia twój program albo wywołuje twoje funkcje na kilku
tekstach — także takich, na których łatwo się pomylić — i pokazuje, co się
zgadza. **⤓ Zapisz .py** zapisuje kod z okienka jako plik. Możesz też pobrać
cały szkielet i pracować w online-python.com. Miejsca do uzupełnienia są
oznaczone komentarzem `# TODO`.

[:material-language-python: Szkielet ćwiczeń (.py)](../pliki/python-wzorzec-2loa.py){ .md-button .md-button--primary download="python-wzorzec-2loa.py" }
[:material-file-document-outline: Ściąga na jedną stronę (.docx)](../pliki/python-wzorzec-sciaga-2loa.docx){ .md-button download="python-wzorzec-sciaga-2loa.docx" }

!!! note "Ćwiczenie 1. Gotowe narzędzia"

    W zdaniu `"Na szkolnym boisku gramy w piłkę, a po lekcjach gramy w kosza."`
    sprawdź gotowymi narzędziami Pythona i wypisz — każdy wynik w osobnym
    wierszu, w tej kolejności:

    1. czy w zdaniu jest słowo `boisku` (`True` albo `False`),
    2. na której pozycji zaczyna się pierwsze `gramy`,
    3. ile razy występuje `gramy`,
    4. co zwraca `find()` dla słowa `siatkówkę`.

    ```python
    zdanie = "Na szkolnym boisku gramy w piłkę, a po lekcjach gramy w kosza."

    print()    # TODO: czy w zdaniu jest słowo "boisku"
    print()    # TODO: pozycja pierwszego "gramy"
    print()    # TODO: ile razy występuje "gramy"
    print()    # TODO: co zwraca find() dla słowa "siatkówkę"
    ```

    <div class="py-konsola" data-nazwa="wzorzec-cw1.py"><script type="application/json" class="py-testy">[{"wejscie": "", "wynik": "True\n19\n2\n-1"}]</script></div>

    ??? tip "Podpowiedź 1"

        `in` daje `True` albo `False`, `find()` — pozycję, `count()` — liczbę wystąpień.

    ??? tip "Podpowiedź 2"

        Każdy wynik w osobnym `print()`, w kolejności z polecenia. Szukany napis piszesz w cudzysłowie.

    ??? tip "Podpowiedź 3"

        Pierwszy wiersz: `print("boisku" in zdanie)`. Kolejne tak samo, z `find()` i `count()`.

!!! note "Ćwiczenie 2. Bez względu na wielkość liter"

    Napisz funkcję `zawiera(tekst, wzorzec)`, która zwraca `True`, gdy wzorzec
    występuje w tekście, **niezależnie od wielkości liter** — `zawiera("Ala ma
    kota", "ALA")` ma dać `True`. Funkcja ma zwracać wynik, a nie go wypisywać.

    ```python
    def zawiera(tekst, wzorzec):
        return wzorzec in tekst     # TODO: ma nie zależeć od wielkości liter


    print(zawiera("Ala ma kota", "ALA"))    # ma być True
    print(zawiera("Ala ma kota", "pies"))   # ma być False
    ```

    <div class="py-konsola" data-nazwa="wzorzec-cw2.py"><script type="application/json" class="py-testy">[{"kod": "print(zawiera(\"Ala ma kota\", \"ALA\"))", "wynik": "True", "opis": "wywołanie", "pokaz": "zawiera(\"Ala ma kota\", \"ALA\")"}, {"kod": "print(zawiera(\"Ala ma kota\", \"pies\"))", "wynik": "False", "opis": "wywołanie", "pokaz": "zawiera(\"Ala ma kota\", \"pies\")"}, {"kod": "print(zawiera(\"KOT\", \"kot\"))", "wynik": "True", "opis": "wywołanie", "pokaz": "zawiera(\"KOT\", \"kot\")"}, {"kod": "print(zawiera(\"Ala ma kota\", \"Kota\"))", "wynik": "True", "opis": "wywołanie", "pokaz": "zawiera(\"Ala ma kota\", \"Kota\")"}, {"kod": "print(zawiera(\"kot\", \"kot \"))", "wynik": "False", "opis": "wywołanie", "pokaz": "zawiera(\"kot\", \"kot \")"}]</script></div>

    ??? tip "Podpowiedź 1"

        Wielkość liter przestaje mieć znaczenie, gdy oba napisy zapiszesz tak samo — na przykład małymi literami.

    ??? tip "Podpowiedź 2"

        `lower()` zwraca nowy napis małymi literami. Trzeba go użyć i dla tekstu, i dla wzorca.

    ??? tip "Podpowiedź 3"

        `return wzorzec.lower() in tekst.lower()`

!!! note "Ćwiczenie 3. Ile razy — naprawdę"

    Napisz funkcję `ile_wystapien(tekst, wzorzec)`, która zwraca, ile razy
    wzorzec występuje w tekście, **licząc także wystąpienia nakładające się** —
    algorytmem naiwnym, bez `find()` i `count()`. Dla `("banana", "ana")` ma
    wyjść 2, choć `count()` daje 1.

    W karcie pracy porównaj swoją funkcję z `count()` dla `("banana", "ana")`
    i `("aaaa", "aa")`, podaj wynik dla `("Mama ma mamę", "ma")` i wyjaśnij,
    dlaczego pierwsze „Ma” nie zostało policzone.

    ```python
    def ile_wystapien(tekst, wzorzec):
        n, m = len(tekst), len(wzorzec)
        ile = 0
        # TODO: algorytm naiwny — sprawdź każde ustawienie wzorca
        return ile


    print(ile_wystapien("banana", "ana"), "banana".count("ana"))
    print(ile_wystapien("Mama ma mamę", "ma"))
    ```

    <div class="py-konsola" data-nazwa="wzorzec-cw3.py"><script type="application/json" class="py-testy">[{"kod": "print(ile_wystapien(\"banana\", \"ana\"))", "wynik": "2", "opis": "wywołanie", "pokaz": "ile_wystapien(\"banana\", \"ana\")"}, {"kod": "print(ile_wystapien(\"aaaa\", \"aa\"))", "wynik": "3", "opis": "wywołanie", "pokaz": "ile_wystapien(\"aaaa\", \"aa\")"}, {"kod": "print(ile_wystapien(\"ABRAKADABRA\", \"ABRA\"))", "wynik": "2", "opis": "wywołanie", "pokaz": "ile_wystapien(\"ABRAKADABRA\", \"ABRA\")"}, {"kod": "print(ile_wystapien(\"xyzab\", \"ab\"))", "wynik": "1", "opis": "wywołanie", "pokaz": "ile_wystapien(\"xyzab\", \"ab\")"}, {"kod": "print(ile_wystapien(\"kot\", \"pies\"))", "wynik": "0", "opis": "wywołanie", "pokaz": "ile_wystapien(\"kot\", \"pies\")"}, {"kod": "print(ile_wystapien(\"Mama ma mamę\", \"ma\"))", "wynik": "3", "opis": "wywołanie", "pokaz": "ile_wystapien(\"Mama ma mamę\", \"ma\")"}]</script></div>

    ??? tip "Podpowiedź 1"

        Zacznij od funkcji `wystapienia` z sekcji 5. Zamiast dopisywać pozycję do listy, zwiększaj licznik.

    ??? tip "Podpowiedź 2"

        Pętla po `range(n - m + 1)`, a w niej warunek `if tekst[i:i + m] == wzorzec:`.

    ??? tip "Podpowiedź 3"

        W warunku `ile += 1`. `return ile` stoi na końcu funkcji — **poza** pętlą.

!!! note "Ćwiczenie 4. Ile pracy wykonuje algorytm"

    Napisz funkcję `porownania(tekst, wzorzec)`, która przechodzi algorytmem
    naiwnym znak po znaku, przerywa ustawienie przy pierwszej różnicy
    i **zwraca liczbę porównań znaków**. Sprawdź, ile porównań potrzeba do
    przeszukania `"ABRAKADABRA"` wzorcem `"ABRA"`, a ile — `"aaaaaaaaab"`
    wzorcem `"aaab"`. Wyniki możesz porównać z licznikiem w wizualizacji
    z sekcji 5.

    ```python
    def porownania(tekst, wzorzec):
        n, m = len(tekst), len(wzorzec)
        licznik = 0
        # TODO: algorytm naiwny znak po znaku; przy każdym porównaniu
        #       dwóch znaków zwiększ licznik o 1, a przy pierwszej różnicy
        #       przerwij to ustawienie (break)
        return licznik


    print(porownania("ABRAKADABRA", "ABRA"))
    print(porownania("aaaaaaaaab", "aaab"))
    ```

    <div class="py-konsola" data-nazwa="wzorzec-cw4.py"><script type="application/json" class="py-testy">[{"kod": "print(porownania(\"ABRAKADABRA\", \"ABRA\"))", "wynik": "16", "opis": "wywołanie", "pokaz": "porownania(\"ABRAKADABRA\", \"ABRA\")"}, {"kod": "print(porownania(\"aaaaaaaaab\", \"aaab\"))", "wynik": "28", "opis": "wywołanie", "pokaz": "porownania(\"aaaaaaaaab\", \"aaab\")"}, {"kod": "print(porownania(\"banana\", \"ana\"))", "wynik": "8", "opis": "wywołanie", "pokaz": "porownania(\"banana\", \"ana\")"}, {"kod": "print(porownania(\"abc\", \"d\"))", "wynik": "3", "opis": "wywołanie", "pokaz": "porownania(\"abc\", \"d\")"}, {"kod": "print(porownania(\"Mama ma mamę\", \"ma\"))", "wynik": "15", "opis": "wywołanie", "pokaz": "porownania(\"Mama ma mamę\", \"ma\")"}]</script></div>

    ??? tip "Podpowiedź 1"

        Potrzebna jest pętla w pętli: zewnętrzna po ustawieniach `i`, wewnętrzna po znakach wzorca `j` — jak w sekcji „Znak po znaku”.

    ??? tip "Podpowiedź 2"

        Licznik zwiększaj **przed** porównaniem znaków — wtedy policzysz też to ostatnie, nieudane.

    ??? tip "Podpowiedź 3"

        ```python
        for i in range(n - m + 1):
            for j in range(m):
                licznik += 1
                if tekst[i + j] != wzorzec[j]:
                    break
        ```

!!! note "Ćwiczenie 5. Naprawa funkcji"

    Funkcja `pierwsze(tekst, wzorzec)` ma zwracać pozycję pierwszego
    wystąpienia wzorca albo `-1`, gdy go nie ma — tak jak `find()`. Są w niej
    **dwa** błędy. Znajdź je, sprawdzając funkcję na różnych tekstach, i popraw.
    W karcie pracy zapisz, na jakim tekście każdy z błędów wychodzi na jaw.

    ```python
    def pierwsze(tekst, wzorzec):
        n, m = len(tekst), len(wzorzec)
        for i in range(n - m):
            if tekst[i:i + m] == wzorzec:
                return i
            return -1


    print(pierwsze("ABRAKADABRA", "ABRA"))   # ma być 0
    print(pierwsze("ABRAKADABRA", "KAD"))    # ma być 4
    ```

    <div class="py-konsola" data-nazwa="wzorzec-cw5.py"><script type="application/json" class="py-testy">[{"kod": "print(pierwsze(\"ABRAKADABRA\", \"ABRA\"))", "wynik": "0", "opis": "wywołanie", "pokaz": "pierwsze(\"ABRAKADABRA\", \"ABRA\")"}, {"kod": "print(pierwsze(\"ABRAKADABRA\", \"KAD\"))", "wynik": "4", "opis": "wywołanie", "pokaz": "pierwsze(\"ABRAKADABRA\", \"KAD\")"}, {"kod": "print(pierwsze(\"xyzab\", \"ab\"))", "wynik": "3", "opis": "wywołanie", "pokaz": "pierwsze(\"xyzab\", \"ab\")"}, {"kod": "print(pierwsze(\"kot\", \"kot\"))", "wynik": "0", "opis": "wywołanie", "pokaz": "pierwsze(\"kot\", \"kot\")"}, {"kod": "print(pierwsze(\"abc\", \"d\"))", "wynik": "-1", "opis": "wywołanie", "pokaz": "pierwsze(\"abc\", \"d\")"}]</script></div>

    ??? tip "Podpowiedź 1"

        Sprawdź funkcję na wzorcu stojącym na samym końcu tekstu, na przykład `pierwsze("xyzab", "ab")`.

    ??? tip "Podpowiedź 2"

        Sprawdź na wzorcu, który nie stoi na pozycji 0: `"KAD"` w `"ABRAKADABRA"`. Po którym ustawieniu funkcja się kończy?

    ??? tip "Podpowiedź 3"

        Jeden błąd siedzi w `range`, drugi we wcięciu `return -1` — ta instrukcja ma stać **za** pętlą.

## Sprawdź się

<div class="quiz" markdown="0">
<script type="application/json">
[
  {
    "pytanie": "Co wypisze print(\"ABRAKADABRA\".find(\"BRA\"))?",
    "typ": "jedna",
    "opcje": ["1", "2", "8", "1 i 8"],
    "poprawna": 0,
    "wyjasnienie": "find() zwraca pozycję pierwszego wystąpienia, liczoną od zera. „BRA” zaczyna się od drugiego znaku, czyli od indeksu 1. Drugiego wystąpienia find() nie zgłasza."
  },
  {
    "pytanie": "Tekst ma 10 znaków, wzorzec 3. Ile ustawień wzorca sprawdza algorytm naiwny?",
    "typ": "jedna",
    "opcje": ["7", "8", "10", "30"],
    "poprawna": 1,
    "wyjasnienie": "Ustawień jest n − m + 1 = 10 − 3 + 1 = 8: od pozycji 0 do pozycji 7, przy której koniec wzorca trafia w ostatni znak tekstu."
  },
  {
    "pytanie": "Co zwraca \"banana\".count(\"ana\")?",
    "typ": "jedna",
    "opcje": ["0", "1", "2", "3"],
    "poprawna": 1,
    "wyjasnienie": "count() liczy wystąpienia rozłączne: po znalezieniu „ana” na pozycji 1 przeskakuje za nie i dalej ma już tylko „na”. Nakładające się wystąpienie na pozycji 3 pomija."
  },
  {
    "pytanie": "Czym jest tekst[i:i + m] w algorytmie naiwnym?",
    "typ": "jedna",
    "opcje": [
      "Znakiem na pozycji i + m",
      "Fragmentem od początku tekstu do pozycji i + m",
      "Fragmentem m znaków tekstu od pozycji i",
      "Wzorcem przesuniętym o i miejsc"
    ],
    "poprawna": 2,
    "wyjasnienie": "Wycinek obejmuje znaki od i do i + m − 1 — prawy koniec się nie liczy. To dokładnie ten fragment tekstu, który leży pod przyłożonym wzorcem."
  },
  {
    "pytanie": "Program zawiera warunek if zdanie.find(\"Ala\"): i wypisuje „nie ma”, choć zdanie zaczyna się od „Ala”. Dlaczego?",
    "typ": "jedna",
    "opcje": [
      "find() rozróżnia wielkość liter",
      "find() zwraca -1, gdy wzorzec jest na początku",
      "Warunek musi mieć nawiasy wokół find()",
      "find() zwraca 0, a 0 w warunku to fałsz"
    ],
    "poprawna": 3,
    "wyjasnienie": "Wzorzec stoi na pozycji 0, więc find() zwraca 0 — a ono w warunku jest fałszem. Do pytania „czy jest” służy operator in albo porównanie find(...) != -1."
  },
  {
    "pytanie": "Jak sprawdzić, czy w tekście jest słowo „kot”, niezależnie od wielkości liter?",
    "typ": "jedna",
    "opcje": [
      "\"kot\" in tekst",
      "tekst.find(\"KOT\") > 0",
      "\"kot\" in tekst.lower()",
      "tekst.count(\"kot\") == 1"
    ],
    "poprawna": 2,
    "wyjasnienie": "lower() zamienia cały tekst na małe litery, więc „Kot” i „KOT” stają się „kot”. Wzorzec też musi być zapisany małymi literami."
  },
  {
    "pytanie": "Dlaczego algorytm nazywa się naiwnym?",
    "typ": "jedna",
    "opcje": [
      "Bo po każdym przesunięciu zaczyna porównywać od nowa",
      "Bo czasem pomija wystąpienia na końcu tekstu",
      "Bo działa poprawnie tylko dla krótkich tekstów",
      "Bo nie rozróżnia wielkich i małych liter"
    ],
    "poprawna": 0,
    "wyjasnienie": "Algorytm naiwny jest poprawny — zawsze znajdzie wszystkie wystąpienia. Jest tylko rozrzutny: przesuwa wzorzec o jedno miejsce i zapomina, co porównał przy poprzednim ustawieniu."
  }
]
</script>
</div>

## Karta pracy

Wypełnij kartę na tej stronie, a potem pobierz gotowy dokument Worda i oddaj
go przez **Zadania domowe w dzienniku VULCAN**. Do zrzutów ekranu wystarczy
klawisz ++print-screen++ albo ++win+shift+s++.

<div class="kp-podsumowanie" data-karta="wyszukiwanie-wzorca"></div>

<span id="karta" class="kp-kotwica"></span>

???+ karta "Rozwiń kartę pracy"

    <div class="karta-pracy" data-karta="wyszukiwanie-wzorca"></div>

---

*Wyniki przykładów sprawdzono w Pythonie 3.14, którego używają okienka na tej
stronie; w online-python.com (Python 3.12) są takie same. Stan sprawdzony
27 września 2026 r.*
