# Karta pracy — Python, część 1

!!! abstract "O tej karcie"

    **Zadanie domowe · praca obowiązkowa** · Dział II. Algorytmika
    i programowanie w Pythonie, tematy 1–5

    Pracę bieżącą z połowy działu piszesz w dwóch częściach. Na lekcji
    zostają krótkie polecenia: napisy i wycinki, proste funkcje, szyfr Cezara
    na kartce, kody znaków. **Ta karta to część domowa** — zadania, przy
    których trzeba napisać i przetestować dłuższy program: pętlę po znakach,
    wyszukiwanie wzorca, szyfrowanie i łamanie szyfru. W domu masz na to tyle
    czasu, ile potrzebujesz.

    Każdy ma **własne dane** — według numeru w dzienniku. Kartę oddajesz
    **na najbliższej lekcji po tej, na której ją zadałem**: przyciskiem
    **Wyślij do nauczyciela** albo jako dokument Word w **Zadaniach domowych
    w dzienniku VULCAN**. Potem obowiązuje 14 dni terminu dodatkowego —
    jak przy każdej pracy obowiązkowej ([wymagania](wymagania-i-bhp.md)).

## Co sprawdza ta karta

Karta ma **osobną ocenę bieżącą**, niezależną od części na lekcji. Liczy się
tak samo: każde zadanie to jeden poziom wymagań, a ocenę wyznacza najwyższy
poziom zaliczony w całości razem ze wszystkimi niższymi.

| Zadanie | Co sprawdza | Poziom | Ocena |
| :---: | --- | :---: | :---: |
| 1 | funkcja z `return`, `len()`, pierwszy i ostatni znak, wycinek `[::-1]`, `upper()` | K | 2 |
| 2 | pętla po znakach z licznikiem, liczba ustawień wzorca `n − m + 1` | P | 3 |
| 3 | budowanie napisu w pętli, algorytm naiwny, szyfr Cezara z `ord()`, `chr()` i `% 26` | R | 4 |
| 4 | funkcja logiczna (palindrom), łamanie szyfru atakiem siłowym, przypadek graniczny pętli | D | 5 |

Poziom jest zaliczony, gdy wykonasz wszystkie jego polecenia z wyjątkiem
najwyżej jednego; tolerancja nie obejmuje poleceń oznaczonych gwiazdką ★.
Przy poleceniach z kodem liczy się **kod i wynik** — sam wynik bez kodu nie
zalicza polecenia. Szóstki na tej karcie nie ma — zdobywa się ją zadaniem
działowym opisanym w [spisie tematów](index.md).

!!! warning "Co wolno — i co sprawdzam"

    Wolno korzystać ze stron tematów, dokumentacji, pomocy innych osób
    i asystentów AI — tak jak przy każdej pracy (zasady na stronie
    [wymagań](wymagania-i-bhp.md#samodzielnosc-pracy-i-weryfikacja)).
    Warunek jest jeden: **masz rozumieć kod, który oddajesz**.

    - Na lekcji po terminie mogę poprosić, żebyś przy komputerze zmienił
      jedną rzecz w swoim kodzie albo uruchomił go na innych danych.
    - Wyniki liczone dla cudzych danych nie są zaliczane — sprawdzam je
      według numeru z nagłówka karty.
    - W zadaniu 5 napisz, z czego korzystałeś. Uczciwa odpowiedź niczego
      nie obniża.

## Twoje dane

Wspólne dla wszystkich:

- zdanie do zadania 2: `Ala i Ola od rana Analizują Algorytmy, a Ewa Opisuje Ich Efekty Na Tablicy`
- tekst DNA do zadań 2–4: `BANANANAKAJAKAJAKANANA` (22 znaków)

Pozostałe dane znajdziesz w tabeli w wierszu ze swoim numerem w dzienniku.

??? info "Tabela danych — znajdź swój numer"

    | Nr | Słowo | Litera | Wzorzec | Klucz | Przechwycona wiadomość | Słowo w wiadomości |
    | :---: | --- | :---: | --- | :---: | --- | --- |
    | 1 | klawiatura | **a** | `ANAN` | 8 | `KIVEZEX GIQVEZVJZFEP ER JIFUV` | `TRENING` |
    | 2 | monitor | **e** | `NAN` | 15 | `URZHUB CRVWDMD SRG VCNROD` | `ROWERY` |
    | 3 | procesor | **i** | `AKAJA` | 22 | `KMQWSQNYO FIGNO C CGASX` | `OSMEJ` |
    | 4 | drukarka | **n** | `ANANA` | 4 | `JNMBDQS V ZTKH` | `AULI` |
    | 5 | router | **o** | `NANA` | 11 | `TMEXA FA ZUQNUQEWU EXAZ` | `SLON` |
    | 6 | serwer | **t** | `ANA` | 18 | `LWYVGW YVAGW S OAGNAPWNEWYEA` | `PACZKA` |
    | 7 | program | **a** | `KAJAK` | 25 | `HMJZIVQM AIUWZHILC E XQIBMS` | `SAMORZADU` |
    | 8 | algorytm | **e** | `AJAKA` | 7 | `SUBHKDT IKSR UKTFBX` | `BRAMIE` |
    | 9 | zmienna | **i** | `ANAN` | 14 | `GNGQNTYJPF HEDSSF IT UNJYSFXYJO` | `BIBLIOTEKA` |
    | 10 | funkcja | **n** | `NAN` | 21 | `ABKSP ZUIJ FET TEDYSPAQ` | `KLUCZ` |
    | 11 | tablica | **o** | `AKAJA` | 3 | `OGEB Q UKGFGOPCUVGL` | `MECZ` |
    | 12 | licznik | **t** | `ANANA` | 10 | `GDCHYOBWS DC ZSYQXOQV` | `LEKCJACH` |
    | 13 | kompilator | **a** | `NANA` | 17 | `RPCLGLE NPXCLGCQGMLW LY QPMBC` | `TRENING` |
    | 14 | myszka | **e** | `ANA` | 24 | `BYGOBI JYCDKTK ZYN CJUYVK` | `ROWERY` |
    | 15 | ekran | **i** | `KAJAK` | 6 | `RTXDZXUFV MPNUV J JNHZE` | `OSMEJ` |
    | 16 | skaner | **n** | `AJAKA` | 12 | `RVUJLYA D HBSP` | `AULI` |
    | 17 | kamera | **o** | `ANAN` | 20 | `ZSKDG LG FAWTAWKCA KDGF` | `SLON` |
    | 18 | modem | **t** | `NAN` | 2 | `TEGDOE GDIOE A WIOVIXEVMEGMI` | `PACZKA` |
    | 19 | kursor | **a** | `AKAJA` | 9 | `OTQGPCXT HPBDGOPSJ L EXPITZ` | `SAMORZADU` |
    | 20 | piksel | **e** | `ANANA` | 16 | `ACJPSLB QSAZ CSBNJF` | `BRAMIE` |
    | 21 | folder | **i** | `NANA` | 23 | `NUNXUAFQWM OLKZZM PA BUQFZMEFQV` | `BIBLIOTEKA` |
    | 22 | dokument | **n** | `ANA` | 5 | `HIRZW GBPQ MLA ALKFZWHX` | `KLUCZ` |
    | 23 | tabela | **o** | `KAJAK` | 12 | `VNLI X BRNMNVWJBCNS` | `MECZ` |
    | 24 | wykres | **t** | `AJAKA` | 19 | `MJINEUHCY JI FYEWDUWB` | `LEKCJACH` |
    | 25 | formularz | **a** | `ANAN` | 1 | `ZXKTOTM VXFKTOKYOUTE TG YXUJK` | `TRENING` |
    | 26 | pulpit | **e** | `NAN` | 8 | `IFNVIP QFJKRAR GFU JQBFCR` | `ROWERY` |
    | 27 | obraz | **i** | `AKAJA` | 15 | `ZBFLHFCND UXVCD R RVPHM` | `OSMEJ` |
    | 28 | kabel | **n** | `ANANA` | 22 | `YCBQSFH K OIZW` | `AULI` |
    | 29 | zasilacz | **o** | `NANA` | 4 | `GZRKN SN MHDAHDRJH RKNM` | `SLON` |
    | 30 | przycisk | **t** | `ANA` | 11 | `BMOLWM OLQWM I EQWDQFMDUMOUQ` | `PACZKA` |
    | 31 | terminal | **a** | `KAJAK` | 18 | `VAXNWJEA OWIKNVWZQ S LEWPAG` | `SAMORZADU` |
    | 32 | kontroler | **e** | `AJAKA` | 25 | `HJQWZSI XZHG JZIUQM` | `BRAMIE` |
    | 33 | interfejs | **i** | `ANAN` | 7 | `UBUEBHMXDT VSRGGT WH IBXMGTLMXC` | `BIBLIOTEKA` |
    | 34 | aplikacja | **n** | `NAN` | 14 | `PQZHE OJXY UTI ITSNHEPF` | `KLUCZ` |
    | 35 | sterownik | **o** | `AKAJA` | 21 | `CUSP E IYUTUCDQIJUZ` | `MECZ` |

    Nie ma Twojego numeru? Napisz do mnie w dzienniku — dopiszę wiersz.

## Zadania

Kod piszesz w okienkach poniżej. Przycisk **✓ Sprawdź** uruchamia Twoją
funkcję na przykładach — ale **nie na Twoich danych**. Wynik dla swoich danych
dopisujesz w okienku sam (np. `print(skrot("monitor"))`) i przepisujesz do
karty. Do karty wklejasz też cały kod funkcji.

!!! note "Zadanie 1 (K). Funkcje na napisach"

    a) ★ Napisz funkcję `skrot(tekst)`, która **zwraca** napis złożony
    z pierwszego znaku, ostatniego znaku i długości tekstu:
    `skrot("python")` daje `pn6`, a `skrot("kot")` — `kt3`.

    b) ★ Napisz funkcję `odwroc(tekst)`, która zwraca tekst **od tyłu,
    wielkimi literami**: `odwroc("python")` daje `NOHTYP`.

    Podaj wyniki obu funkcji dla **swojego słowa**.

    ```python
    def skrot(tekst):
        return ""    # TODO: pierwszy znak + ostatni znak + długość (str)


    def odwroc(tekst):
        return ""    # TODO: od tyłu i wielkimi literami


    print(skrot("python"))     # ma być pn6
    print(odwroc("python"))    # ma być NOHTYP
    ```

    <div class="py-konsola" data-nazwa="karta-python-z1.py"><script type="application/json" class="py-testy">[{"kod": "print(skrot(\"python\"))", "wynik": "pn6", "opis": "wywołanie", "pokaz": "skrot(\"python\")"}, {"kod": "print(skrot(\"kot\"))", "wynik": "kt3", "opis": "wywołanie", "pokaz": "skrot(\"kot\")"}, {"kod": "print(skrot(\"Informatyka\"))", "wynik": "Ia11", "opis": "wywołanie", "pokaz": "skrot(\"Informatyka\")"}, {"kod": "print(odwroc(\"python\"))", "wynik": "NOHTYP", "opis": "wywołanie", "pokaz": "odwroc(\"python\")"}, {"kod": "print(odwroc(\"Ala\"))", "wynik": "ALA", "opis": "wywołanie", "pokaz": "odwroc(\"Ala\")"}, {"kod": "print(odwroc(\"kot i pies\"))", "wynik": "SEIP I TOK", "opis": "wywołanie", "pokaz": "odwroc(\"kot i pies\")"}]</script></div>

!!! note "Zadanie 2 (P). Pętla po znakach i ustawienia wzorca"

    a) ★ Napisz funkcję `ile_razy(tekst, litera)`, która **pętlą po znakach**
    liczy, ile razy litera występuje w tekście — **bez względu na wielkość
    liter** i bez metody `count()`. `ile_razy("Ala ma kota", "a")` daje
    `4`. Podaj wynik dla **wspólnego zdania i swojej litery**.

    b) Ile ustawień **Twojego wzorca** sprawdzi algorytm naiwny w tekście DNA?
    Pokaż obliczenie.

    ```python
    def ile_razy(tekst, litera):
        ile = 0
        # TODO: pętla po znakach, porównanie bez względu na wielkość liter
        return ile


    print(ile_razy("Ala ma kota", "a"))    # ma być 4
    ```

    <div class="py-konsola" data-nazwa="karta-python-z2.py"><script type="application/json" class="py-testy">[{"kod": "print(ile_razy(\"Ala ma kota\", \"a\"))", "wynik": "4", "opis": "wywołanie", "pokaz": "ile_razy(\"Ala ma kota\", \"a\")"}, {"kod": "print(ile_razy(\"Programowanie\", \"o\"))", "wynik": "2", "opis": "wywołanie", "pokaz": "ile_razy(\"Programowanie\", \"o\")"}, {"kod": "print(ile_razy(\"BANAN\", \"n\"))", "wynik": "2", "opis": "wywołanie", "pokaz": "ile_razy(\"BANAN\", \"n\")"}, {"kod": "print(ile_razy(\"kot\", \"x\"))", "wynik": "0", "opis": "wywołanie", "pokaz": "ile_razy(\"kot\", \"x\")"}]</script></div>

!!! note "Zadanie 3 (R). Nowy napis, wszystkie wystąpienia, szyfrowanie"

    a) Napisz funkcję `bez_samoglosek(tekst)`, która **buduje i zwraca nowy
    napis** bez samogłosek (a, ą, e, ę, i, o, ó, u, y — także wielkich).
    Podaj wynik dla swojego słowa.

    ```python
    def bez_samoglosek(tekst):
        wynik = ""
        # TODO: dopisuj do wyniku znaki, które nie są samogłoskami
        return wynik


    print(bez_samoglosek("informatyka"))    # ma być nfrmtk
    ```

    <div class="py-konsola" data-nazwa="karta-python-z3a.py"><script type="application/json" class="py-testy">[{"kod": "print(bez_samoglosek(\"informatyka\"))", "wynik": "nfrmtk", "opis": "wywołanie", "pokaz": "bez_samoglosek(\"informatyka\")"}, {"kod": "print(bez_samoglosek(\"Ala ma kota\"))", "wynik": "l m kt", "opis": "wywołanie", "pokaz": "bez_samoglosek(\"Ala ma kota\")"}, {"kod": "print(bez_samoglosek(\"łódź\"))", "wynik": "łdź", "opis": "wywołanie", "pokaz": "bez_samoglosek(\"łódź\")"}]</script></div>

    b) ★ Napisz funkcję `wystapienia(tekst, wzorzec)`, która **algorytmem
    naiwnym** — bez `find()` i `count()` — zwraca listę pozycji wszystkich
    wystąpień wzorca, także nakładających się. Podaj wynik dla tekstu DNA
    i swojego wzorca.

    ```python
    def wystapienia(tekst, wzorzec):
        wynik = []
        # TODO: sprawdź każde ustawienie wzorca i dopisz pasujące pozycje
        return wynik


    print(wystapienia("ANANAS I BANANY", "ANA"))    # ma być [0, 2, 10]
    ```

    <div class="py-konsola" data-nazwa="karta-python-z3b.py"><script type="application/json" class="py-testy">[{"kod": "print(wystapienia(\"ANANAS I BANANY\", \"ANA\"))", "wynik": "[0, 2, 10]", "opis": "wywołanie", "pokaz": "wystapienia(\"ANANAS I BANANY\", \"ANA\")"}, {"kod": "print(wystapienia(\"ABABABA\", \"ABA\"))", "wynik": "[0, 2, 4]", "opis": "wywołanie", "pokaz": "wystapienia(\"ABABABA\", \"ABA\")"}, {"kod": "print(wystapienia(\"KAJAK\", \"AK\"))", "wynik": "[3]", "opis": "wywołanie", "pokaz": "wystapienia(\"KAJAK\", \"AK\")"}, {"kod": "print(wystapienia(\"KOT\", \"PIES\"))", "wynik": "[]", "opis": "wywołanie", "pokaz": "wystapienia(\"KOT\", \"PIES\")"}]</script></div>

    c) ★ Napisz funkcję `szyfruj(tekst, k)`, która szyfruje tekst szyfrem
    Cezara z kluczem `k`, korzystając z `ord()`, `chr()` i reszty z dzielenia.
    Wielkie litery A–Z przesuwa, pozostałe znaki zostawia. Podaj wynik dla
    **swojego słowa zapisanego wielkimi literami** i swojego klucza. Do karty
    wklej też zrzut ekranu okienka po kliknięciu **✓ Sprawdź**, z wywołaniem
    dla swoich danych.

    ```python
    def szyfruj(tekst, k):
        wynik = ""
        # TODO: przesuń każdą wielką literę o k miejsc, inne znaki przepisz
        return wynik


    print(szyfruj("XYZ", 3))    # ma być ABC
    ```

    <div class="py-konsola" data-nazwa="karta-python-z3c.py"><script type="application/json" class="py-testy">[{"kod": "print(szyfruj(\"ABC\", 1))", "wynik": "BCD", "opis": "wywołanie", "pokaz": "szyfruj(\"ABC\", 1)"}, {"kod": "print(szyfruj(\"XYZ\", 3))", "wynik": "ABC", "opis": "wywołanie", "pokaz": "szyfruj(\"XYZ\", 3)"}, {"kod": "print(szyfruj(\"ALA MA KOTA\", 2))", "wynik": "CNC OC MQVC", "opis": "wywołanie", "pokaz": "szyfruj(\"ALA MA KOTA\", 2)"}, {"kod": "print(szyfruj(\"KOT\", 26))", "wynik": "KOT", "opis": "wywołanie", "pokaz": "szyfruj(\"KOT\", 26)"}]</script></div>

!!! note "Zadanie 4 (D). Palindromy, łamanie szyfru, granice pętli"

    a) ★ Napisz funkcję logiczną `czy_palindrom(tekst)`, która zwraca `True`,
    gdy tekst czytany od tyłu jest taki sam — **bez względu na spacje
    i wielkość liter** — a w przeciwnym razie `False`. Podaj wyniki dla
    `"Kobyła ma mały bok"`, `"Python"` i swojego słowa.

    ```python
    def czy_palindrom(tekst):
        return False    # TODO


    print(czy_palindrom("Kobyła ma mały bok"))    # ma być True
    ```

    <div class="py-konsola" data-nazwa="karta-python-z4a.py"><script type="application/json" class="py-testy">[{"kod": "print(czy_palindrom(\"Kobyła ma mały bok\"))", "wynik": "True", "opis": "wywołanie", "pokaz": "czy_palindrom(\"Kobyła ma mały bok\")"}, {"kod": "print(czy_palindrom(\"Zakopane na pokaz\"))", "wynik": "True", "opis": "wywołanie", "pokaz": "czy_palindrom(\"Zakopane na pokaz\")"}, {"kod": "print(czy_palindrom(\"Python\"))", "wynik": "False", "opis": "wywołanie", "pokaz": "czy_palindrom(\"Python\")"}, {"kod": "print(czy_palindrom(\"kajak\"))", "wynik": "True", "opis": "wywołanie", "pokaz": "czy_palindrom(\"kajak\")"}]</script></div>

    b) ★ Napisz funkcję `zlam(szyfrogram, slowo)`, która sprawdza **wszystkie
    klucze** od 1 do 25 i zwraca ten, po którego cofnięciu w tekście pojawia
    się podane słowo. Złam swoją przechwyconą wiadomość: podaj klucz, którym
    ją zaszyfrowano, i cały tekst jawny.

    ```python
    # Wklej tu swoją funkcję szyfruj() z zadania 3c.


    def zlam(szyfrogram, slowo):
        # TODO: dla każdego klucza od 1 do 25 odszyfruj i sprawdź, czy jest słowo
        return 0


    print(zlam("KHOOR", "HELLO"))    # ma być 3
    ```

    <div class="py-konsola" data-nazwa="karta-python-z4b.py"><script type="application/json" class="py-testy">[{"kod": "print(zlam(szyfruj(\"ALA MA KOTA\", 5), \"KOTA\"))", "wynik": "5", "opis": "wywołanie", "pokaz": "zlam(szyfruj(\"ALA MA KOTA\", 5), \"KOTA\")"}, {"kod": "print(zlam(\"KHOOR\", \"HELLO\"))", "wynik": "3", "opis": "wywołanie", "pokaz": "zlam(\"KHOOR\", \"HELLO\")"}, {"kod": "print(zlam(szyfruj(\"SZKOLA\", 25), \"SZKOLA\"))", "wynik": "25", "opis": "wywołanie", "pokaz": "zlam(szyfruj(\"SZKOLA\", 25), \"SZKOLA\")"}]</script></div>

    c) W swojej funkcji `wystapienia()` z zadania 3b zmień `range(n - m + 1)`
    na `range(n - m)` (albo usuń `+ 1` z Twojej wersji). Podaj wynik dla tekstu
    DNA i swojego wzorca. Zmienił się czy nie? Wyjaśnij na swoich danych, po
    co w pętli jest `+ 1` — i dlaczego taki błąd łatwo przeoczyć.

??? tip "Gdzie to było"

    - pętla po znakach, budowanie napisu, palindrom —
      [Przetwarzanie napisów](przetwarzanie-napisow.md), sekcje 2, 3 i 5
    - liczba ustawień i algorytm naiwny —
      [Wyszukiwanie wzorca w tekście](wyszukiwanie-wzorca.md), sekcje 5 i 6
    - `ord()`, `chr()`, `% 26`, łamanie szyfru —
      [Szyfrowanie i deszyfrowanie tekstu](szyfrowanie.md), sekcje 3–6
    - wszystko naraz — [Wiesz, umiesz, zdasz](powtorka-dzial-2-czesc-1.md)

## Karta

Na górze karty wpisz **numer w dzienniku** — bez niego nie da się sprawdzić
Twoich wyników. Odpowiedzi zostają w tej przeglądarce; jeśli pracujesz na
kilku komputerach, użyj **Zapisz do pliku** i **Wczytaj z pliku**.

<div class="kp-podsumowanie" data-karta="podsumowanie-python-1"></div>

<span id="karta" class="kp-kotwica"></span>

???+ karta "Rozwiń kartę pracy"

    <div class="karta-pracy" data-karta="podsumowanie-python-1"></div>

Wcześniejszy temat: [Wiesz, umiesz, zdasz — połowa działu II](powtorka-dzial-2-czesc-1.md).

---

*Słowa, zdanie, tekst DNA i wiadomości w tabeli są przykładowe, przygotowane na
potrzeby karty; wyniki w przykładach policzono, uruchamiając kod wzorcowy.
Stan sprawdzony 25 października 2026 r.*
