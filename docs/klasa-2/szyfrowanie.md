# Szyfrowanie i deszyfrowanie tekstu

!!! abstract "O tym temacie"

    **2 godziny lekcyjne** · Dział II. Algorytmika i programowanie w Pythonie
    · podstawa programowa **I.1, I.2.b, I.3, II.1, IV.2**

    Hasło do dziennika, wiadomość w komunikatorze, płatność kartą w sklepie
    internetowym — wszystko to przechodzi przez sieć zaszyfrowane, żeby nikt po
    drodze nie mógł tego przeczytać. Dziś poznasz najprostszy szyfr, jaki
    istnieje: **szyfr Cezara**. Napiszesz program, który szyfruje
    i odszyfrowuje tekst, a potem złamiesz go w kilka sekund — i zobaczysz,
    dlaczego współczesne szyfry wyglądają zupełnie inaczej.

    ??? abstract "Plan dwóch lekcji"

        | Lekcja | Sekcje | Ćwiczenia |
        | :---: | --- | --- |
        | 1 | 1–4: pojęcia, szyfr Cezara na kartce, kody znaków, szyfrowanie w Pythonie | 1–3 |
        | 2 | 5–7: deszyfrowanie, łamanie szyfru, dlaczego Cezar jest słaby | 4–6 |

??? rozgrzewka "Na rozgrzewkę — 3 minuty, bez zaglądania"

    Odpowiedz w zeszycie, zanim zaczniesz nowy temat. Odpowiedzi rozwiń
    dopiero wtedy, gdy wszyscy skończą — nie liczą się do oceny.

    1. **Z poprzedniej lekcji.** Co wypisze `print("Kajak"[::-1])`?
    2. **Sprzed kilku tygodni.** Tekst ma 10 znaków, wzorzec 3. Ile ustawień wzorca sprawdza algorytm naiwny?
    3. **Z dawniejszych tematów.** Ile wynosi w Pythonie `27 % 26`, a ile `25 % 26`?

    ??? success "Odpowiedzi"

        1. `kajaK` — wycinek z krokiem −1 odwraca napis, a wielkość liter zostaje.
        2. 8, czyli n − m + 1.
        3. `1` i `25` — operator `%` daje resztę z dzielenia. Dziś dzięki niemu
           litery będą „zawijać się” z końca alfabetu na początek.

!!! success "Kryteria sukcesu — sprawdź się na koniec lekcji"

    Po tych dwóch lekcjach:

    1. Wyjaśnię pojęcia: tekst jawny, szyfrogram, klucz, szyfrowanie i deszyfrowanie.
    2. Zaszyfruję i odszyfruję krótki tekst szyfrem Cezara na kartce.
    3. Odczytam kod znaku funkcją `ord()` i zamienię kod na znak funkcją `chr()`.
    4. Napiszę funkcję, która szyfruje tekst szyfrem Cezara, korzystając z kodów znaków i reszty z dzielenia.
    5. Napiszę funkcję, która odszyfrowuje tekst, i wyjaśnię, dlaczego wystarczy przesunięcie o `-k`.
    6. Złamię szyfr Cezara, sprawdzając wszystkie klucze, i wyjaśnię, dlaczego taki szyfr jest słaby.

!!! tip "Przykłady uruchomisz na tej stronie"

    Pod przykładami są okienka z Pythonem, takie jak w poprzednich tematach:
    zmień kod i kliknij **▶ Uruchom** (albo ++ctrl+enter++). **Zanim
    klikniesz, przewiduj**, co wypisze program — wynik sprawdzisz potem
    w ramce „Przewiduj, potem sprawdź wynik”. W ćwiczeniach przycisk
    **✓ Sprawdź** wywoła twoje funkcje na kilku tekstach i powie, czy wynik
    się zgadza, a pod poleceniem są podpowiedzi — odsłaniaj je po kolei.

## 1. Szyfrowanie — najważniejsze pojęcia

| Pojęcie | Znaczenie | Przykład |
| --- | --- | --- |
| **tekst jawny** | wiadomość, którą każdy może przeczytać | `ALA MA KOTA` |
| **szyfrogram** | wiadomość po zaszyfrowaniu — nieczytelna bez klucza | `DOD PD NRWD` |
| **klucz** | tajna informacja potrzebna do szyfrowania i deszyfrowania | przesunięcie o 3 |
| **szyfrowanie** | zamiana tekstu jawnego w szyfrogram za pomocą klucza | |
| **deszyfrowanie** | odtworzenie tekstu jawnego z szyfrogramu **przy znajomości klucza** | |
| **łamanie szyfru** | odczytanie wiadomości **bez znajomości klucza** | |

Sposób szyfrowania nie jest tajemnicą — zna go każdy. Tajny jest tylko
**klucz**. W szyfrze Cezara ten sam klucz służy do szyfrowania
i deszyfrowania; takie szyfry nazywa się **symetrycznymi**.

## 2. Szyfr Cezara na kartce

Każdą literę zastępujemy literą, która stoi w alfabecie **k miejsc dalej** —
`k` to klucz. Pracujemy na alfabecie łacińskim: 26 wielkich liter od A do Z,
bez polskich znaków. Według rzymskiego historyka Swetoniusza Juliusz Cezar
przesuwał litery o 3.

```text
tekst jawny:  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
klucz k = 3:  D E F G H I J K L M N O P Q R S T U V W X Y Z A B C
```

Tak `ALA MA KOTA` zamienia się w `DOD PD NRWD`. Spacje zostają na swoich
miejscach. Na końcu alfabetu litery **zawijają się** na początek: X → A,
Y → B, Z → C.

!!! example "Przewiduj"

    Zaszyfruj na kartce słowo `ZEBRA` kluczem 3. Potem odszyfruj `NRW`
    zaszyfrowane tym samym kluczem.

    ??? success "Przewiduj, potem sprawdź wynik"

        `ZEBRA` → `CHEUD` — Z zawija się na C. `NRW` → `KOT`: przy
        odszyfrowaniu przesuwasz litery o 3 **wstecz**.

## 3. Każdy znak ma swój numer

Komputer przechowuje litery jako liczby — **kody znaków**. Dla liter
łacińskich, cyfr i znaków przestankowych kody pochodzą z tablicy **ASCII**.
Python ma dwie funkcje, które je przeliczają:

| Funkcja | Co robi | Przykład | Wynik |
| --- | --- | --- | --- |
| `ord(znak)` | podaje kod znaku | `ord("A")` | `65` |
| `chr(kod)` | podaje znak o danym kodzie | `chr(66)` | `"B"` |

Wielkie litery od A do Z mają **kolejne** kody od 65 do 90, małe od a do z —
od 97 do 122. Dzięki temu przesunięcie litery w alfabecie to zwykłe dodawanie.

```python
print(ord("A"), ord("Z"), ord("a"))
print(chr(67), chr(ord("K") + 1))
print(ord("Z") - ord("A"))
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    65 90 97
    C L
    25
    ```

    `ord("Z") - ord("A")` to 25, a nie 26: A ma numer 0, Z — numer 25
    w alfabecie z 26 liter.

## 4. Szyfrowanie w Pythonie

Samo `chr(ord(znak) + k)` nie wystarczy: dla `Z` z kluczem 3 dałoby kod 93,
czyli znak `]`. Trzeba zawinąć alfabet — i tu przydaje się reszta
z dzielenia przez 26.

!!! kroki "Krok po kroku: szyfrujemy literę Y kluczem 3"

    Zanim odsłonisz kolejny krok, spróbuj przewidzieć, jaka liczba wyjdzie.

    1. **Kod litery.** Funkcja `ord()` zamienia literę na liczbę:

        ```text
        ord("Y") = 89
        ```

        Na liczbach da się wykonywać działania, na literach — nie.

    2. **Numer w alfabecie.** Odejmujemy kod litery A:

        ```text
        89 − 65 = 24
        ```

        Teraz A ma numer 0, a Z — 25. Ten krok sprawia, że zawijanie da się
        zapisać jednym działaniem.

    3. **Przesunięcie o klucz.**

        ```text
        24 + 3 = 27
        ```

        Liter jest 26, więc numeru 27 nie ma — trzeba wrócić na początek.

    4. **Zawinięcie.** Reszta z dzielenia przez 26:

        ```text
        27 % 26 = 1
        ```

        Numery 26, 27, 28… zamieniają się w 0, 1, 2… — Z przechodzi w A.

    5. **Z powrotem na literę.** Dodajemy kod A i zamieniamy liczbę na znak:

        ```text
        1 + 65 = 66      chr(66) = "B"
        ```

        Sprawdzenie z tabelą z sekcji 2: Y z kluczem 3 to B.

Te same kroki zapisane w Pythonie — funkcja dla jednej litery i funkcja dla
całego tekstu, zbudowana jak napisy w poprzednim temacie:

```python
def przesun(znak, k):
    numer = ord(znak) - ord("A")       # A → 0, B → 1, …, Z → 25
    numer = (numer + k) % 26           # przesunięcie z zawinięciem
    return chr(numer + ord("A"))

def szyfruj(tekst, k):
    wynik = ""
    for znak in tekst:
        if "A" <= znak <= "Z":
            wynik = wynik + przesun(znak, k)
        else:
            wynik = wynik + znak       # spacje i znaki przestankowe bez zmian
    return wynik

print(szyfruj("ALA MA KOTA", 3))
print(szyfruj("XYZ", 3))
print(szyfruj("ZEBRA!", 1))
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    DOD PD NRWD
    ABC
    AFCSB!
    ```

    Warunek `"A" <= znak <= "Z"` porównuje kody znaków: jest prawdziwy tylko
    dla wielkich liter od A do Z. Spacja i wykrzyknik przechodzą bez zmian.

## 5. Deszyfrowanie

Odszyfrować znaczy przesunąć litery o `k` **wstecz**, czyli o `-k`. Nie trzeba
pisać nowego algorytmu — wystarczy wywołać `szyfruj` z kluczem ujemnym.
Działa to dzięki temu, że w Pythonie reszta z dzielenia przez 26 nigdy nie
jest ujemna:

```python
print(-2 % 26, (2 - 3) % 26)
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    24 25
    ```

    `-2 % 26` to 24: cofnięcie się o dwa miejsca od A (numer 0) prowadzi
    do Y (numer 24). `(2 - 3) % 26` to 25: C cofnięte o 3 daje Z.

Deszyfrowanie to więc jeden wiersz: `return szyfruj(szyfrogram, -k)`. Ten sam
efekt da przesunięcie o `26 - k` — obejście alfabetu dookoła.

## 6. Łamanie szyfru — atak siłowy

Ktoś przechwycił szyfrogram `CZYDUKXSO Y CSYNWOT`. Nie zna klucza, ale wie, że
to szyfr Cezara. Kluczy, które coś zmieniają, jest tylko **25** (od 1 do 25 —
klucz 26 to obrót o cały alfabet, czyli to samo co 0). Wystarczy sprawdzić
wszystkie i poszukać sensownego tekstu. Takie sprawdzanie wszystkich
możliwości nazywa się **atakiem siłowym** (*brute force*).

```python
def przesun(znak, k):
    numer = (ord(znak) - ord("A") + k) % 26
    return chr(numer + ord("A"))

def szyfruj(tekst, k):
    wynik = ""
    for znak in tekst:
        if "A" <= znak <= "Z":
            wynik = wynik + przesun(znak, k)
        else:
            wynik = wynik + znak
    return wynik

szyfrogram = "CZYDUKXSO Y CSYNWOT"
for k in range(1, 26):
    print(k, szyfruj(szyfrogram, -k))
```

<div class="py-konsola"></div>

!!! example "Przewiduj"

    Program wypisze 25 wierszy. Przy którym kluczu pojawi się sensowny tekst?
    Nie zgaduj — zaszyfruj na kartce pierwszą literę `C` przesunięciem
    wstecz o kilka miejsc i sprawdź, kiedy wychodzi coś, co może zaczynać
    polskie słowo.

    ??? success "Przewiduj, potem sprawdź wynik"

        Wiersz `10 SPOTKANIE O SIODMEJ`. Pozostałe 24 wiersze to bełkot,
        np. `9 TQPULBOJF P TJPENFK`. Komputer sprawdził wszystkie klucze
        w ułamku sekundy — człowiekowi wystarczy rzut oka na listę.

## 7. Dlaczego szyfr Cezara jest słaby

- **Za mało kluczy.** 25 możliwości sprawdzi komputer i cierpliwy uczeń
  z kartką.
- **Litery zostają na swoich miejscach.** Każde A zamienia się zawsze w tę
  samą literę, więc najczęstsza litera szyfrogramu to najpewniej najczęstsza
  litera języka. Policzenie liter wystarcza, żeby odgadnąć klucz — nawet
  bez sprawdzania wszystkich.
- **Długość i układ wyrazów** są widoczne: jednoliterowe `Y` w przykładzie
  to najpewniej spójnik albo przyimek.

Współczesne szyfry symetryczne, takie jak **AES**, używają kluczy o długości
128 albo 256 bitów. Kluczy 128-bitowych jest 2^128^ — tyle, że ich
sprawdzenie po kolei jest niewykonalne dla wszystkich komputerów świata
razem wziętych. Zasada pozostaje jednak ta sama co u Cezara: algorytm jest
jawny, tajny jest tylko klucz.

!!! warning "Najczęstsze błędy przy szyfrowaniu"

    | Objaw | Przyczyna | Co zrobić |
    | --- | --- | --- |
    | `Z` z kluczem 3 zamienia się w `]` | brak zawinięcia alfabetu | `(numer + k) % 26` |
    | wszystkie litery wychodzą przesunięte o 65 albo zamienione w dziwne znaki | zapomniane `- ord("A")` albo `+ ord("A")` | przelicz: kod → numer 0–25 → przesunięcie → kod |
    | spacje zamieniają się w litery | przesuwane są wszystkie znaki | warunek `"A" <= znak <= "Z"` |
    | szyfrogram ma tylko jedną literę | `wynik = przesun(...)` zamiast `wynik = wynik + przesun(...)` | dopisuj do tego, co już jest |
    | `TypeError: can only concatenate str (not "int") to str` | dodawanie liczby do litery: `"A" + 3` | najpierw `ord()`, na końcu `chr()` |

## Ćwiczenia

Na pierwszej lekcji zrób ćwiczenia 1–3, na drugiej 4–5. Ćwiczenie 4 jest na
ocenę dobrą, 5 — na bardzo dobrą, a 6 jest dla chętnych. Każde ćwiczenie
możesz zrobić w okienku pod jego treścią: **✓ Sprawdź** uruchamia twój program
albo wywołuje twoje funkcje, a **⤓ Zapisz .py** zapisuje kod z okienka jako
plik. Możesz też pobrać cały szkielet i pracować w online-python.com.
Miejsca do uzupełnienia są oznaczone komentarzem `# TODO`.

[:material-language-python: Szkielet ćwiczeń (.py)](../pliki/python-szyfrowanie-2loa.py){ .md-button .md-button--primary download="python-szyfrowanie-2loa.py" }

!!! note "Ćwiczenie 1. Kody liter"

    Program wczytuje słowo instrukcją `input()` i dla każdej jego litery
    wypisuje w osobnym wierszu literę i jej kod, oddzielone spacją. Dla słowa
    `SZYFR`:

    ```text
    S 83
    Z 90
    Y 89
    F 70
    R 82
    ```

    W karcie pracy zaszyfruj na kartce słowo `INFORMATYKA` kluczem 3.

    ```python
    slowo = input()

    # TODO: pętla po znakach słowa; w każdym obrocie print(znak, kod znaku)
    ```

    <div class="py-konsola" data-nazwa="szyfr-cw1.py" data-wejscie="SZYFR"><script type="application/json" class="py-testy">[{"wejscie": "SZYFR", "wynik": "S 83\nZ 90\nY 89\nF 70\nR 82"}, {"wejscie": "ABC", "wynik": "A 65\nB 66\nC 67"}, {"wejscie": "kot", "wynik": "k 107\no 111\nt 116"}]</script></div>

    ??? tip "Podpowiedź 1"

        Pętlę po znakach napisu znasz z poprzedniego tematu, a kod znaku podaje funkcja z sekcji 3.

    ??? tip "Podpowiedź 2"

        `for znak in slowo:` — w środku jeden `print` z dwoma wartościami oddzielonymi przecinkiem.

    ??? tip "Podpowiedź 3"

        `print(znak, ord(znak))` — przecinek w `print` sam wstawia spację.

!!! note "Ćwiczenie 2. Przesunięcie jednej litery"

    Napisz funkcję `przesun(znak, k)`, która dla wielkiej litery od A do Z
    zwraca literę przesuniętą o `k` miejsc w alfabecie, z zawinięciem:
    `przesun("A", 3)` daje `"D"`, a `przesun("Y", 3)` — `"B"`. Funkcja ma
    działać także dla ujemnego `k`.

    ```python
    def przesun(znak, k):
        # TODO: kod → numer 0–25 → przesunięcie z zawinięciem → litera
        return znak


    print(przesun("A", 3))   # ma być D
    print(przesun("Y", 3))   # ma być B
    ```

    <div class="py-konsola" data-nazwa="szyfr-cw2.py"><script type="application/json" class="py-testy">[{"kod": "print(przesun(\"A\", 3))", "wynik": "D", "opis": "wywołanie", "pokaz": "przesun(\"A\", 3)"}, {"kod": "print(przesun(\"Y\", 3))", "wynik": "B", "opis": "wywołanie", "pokaz": "przesun(\"Y\", 3)"}, {"kod": "print(przesun(\"Z\", 1))", "wynik": "A", "opis": "wywołanie", "pokaz": "przesun(\"Z\", 1)"}, {"kod": "print(przesun(\"M\", 13))", "wynik": "Z", "opis": "wywołanie", "pokaz": "przesun(\"M\", 13)"}, {"kod": "print(przesun(\"C\", -3))", "wynik": "Z", "opis": "wywołanie", "pokaz": "przesun(\"C\", -3)"}]</script></div>

    ??? tip "Podpowiedź 1"

        Przejdź kroki z ramki „Krok po kroku” w sekcji 4: kod, numer w alfabecie, przesunięcie, zawinięcie, litera.

    ??? tip "Podpowiedź 2"

        `numer = ord(znak) - ord("A")`, potem `numer = (numer + k) % 26`.

    ??? tip "Podpowiedź 3"

        Ostatni wiersz: `return chr(numer + ord("A"))`. Dla ujemnego `k` nic nie trzeba dopisywać — `%` w Pythonie nie daje wyniku ujemnego.

!!! note "Ćwiczenie 3. Szyfrowanie całego tekstu"

    Napisz funkcję `szyfruj(tekst, k)`, która szyfruje tekst szyfrem Cezara:
    wielkie litery od A do Z przesuwa o `k`, a wszystkie inne znaki (spacje,
    cyfry, znaki przestankowe) zostawia bez zmian.

    Skopiuj na początek okienka swoją funkcję `przesun` z ćwiczenia 2 —
    `szyfruj` będzie z niej korzystać.

    ```python
    # Tu wklej swoją funkcję przesun() z ćwiczenia 2.


    def szyfruj(tekst, k):
        wynik = ""
        # TODO: pętla po znakach; litery A–Z przesuń, inne znaki dopisz bez zmian
        return wynik


    print(szyfruj("ALA MA KOTA", 3))   # ma być DOD PD NRWD
    print(szyfruj("XYZ", 3))           # ma być ABC
    ```

    <div class="py-konsola" data-nazwa="szyfr-cw3.py"><script type="application/json" class="py-testy">[{"kod": "print(szyfruj(\"ALA MA KOTA\", 3))", "wynik": "DOD PD NRWD", "opis": "wywołanie", "pokaz": "szyfruj(\"ALA MA KOTA\", 3)"}, {"kod": "print(szyfruj(\"XYZ\", 3))", "wynik": "ABC", "opis": "wywołanie", "pokaz": "szyfruj(\"XYZ\", 3)"}, {"kod": "print(szyfruj(\"ZEBRA!\", 1))", "wynik": "AFCSB!", "opis": "wywołanie", "pokaz": "szyfruj(\"ZEBRA!\", 1)"}, {"kod": "print(szyfruj(\"KLASA 2LOA\", 5))", "wynik": "PQFXF 2QTF", "opis": "wywołanie", "pokaz": "szyfruj(\"KLASA 2LOA\", 5)"}]</script></div>

    ??? tip "Podpowiedź 1"

        To schemat budowania napisu z poprzedniego tematu: pusty `wynik`, pętla po znakach, dopisywanie. Różnica — przed dopisaniem trzeba zdecydować, co dopisać.

    ??? tip "Podpowiedź 2"

        W pętli warunek `if "A" <= znak <= "Z":` — wtedy dopisujesz `przesun(znak, k)`, w przeciwnym razie sam `znak`.

    ??? tip "Podpowiedź 3"

        ```python
        for znak in tekst:
            if "A" <= znak <= "Z":
                wynik = wynik + przesun(znak, k)
            else:
                wynik = wynik + znak
        ```

!!! note "Ćwiczenie 4. Deszyfrowanie"

    Napisz funkcję `deszyfruj(szyfrogram, k)`, która odtwarza tekst jawny.
    Użyj w niej swojej funkcji `szyfruj` — wklej ją do okienka razem
    z `przesun`. Odszyfruj wiadomość `NRQLHF ZBFLHFCNL` zaszyfrowaną kluczem 3
    i zapisz wynik w karcie pracy.

    ```python
    # Tu wklej swoje funkcje przesun() i szyfruj() z ćwiczeń 2 i 3.


    def deszyfruj(szyfrogram, k):
        return szyfrogram    # TODO: jeden wiersz z wywołaniem szyfruj()


    print(deszyfruj("DOD PD NRWD", 3))   # ma być ALA MA KOTA
    ```

    <div class="py-konsola" data-nazwa="szyfr-cw4.py"><script type="application/json" class="py-testy">[{"kod": "print(deszyfruj(\"DOD PD NRWD\", 3))", "wynik": "ALA MA KOTA", "opis": "wywołanie", "pokaz": "deszyfruj(\"DOD PD NRWD\", 3)"}, {"kod": "print(deszyfruj(\"ABC\", 3))", "wynik": "XYZ", "opis": "wywołanie", "pokaz": "deszyfruj(\"ABC\", 3)"}, {"kod": "print(deszyfruj(\"CZYDUKXSO Y CSYNWOT\", 10))", "wynik": "SPOTKANIE O SIODMEJ", "opis": "wywołanie", "pokaz": "deszyfruj(\"CZYDUKXSO Y CSYNWOT\", 10)"}, {"kod": "print(deszyfruj(szyfruj(\"PYTHON 3\", 7), 7))", "wynik": "PYTHON 3", "opis": "tam i z powrotem", "pokaz": "deszyfruj(szyfruj(\"PYTHON 3\", 7), 7)"}]</script></div>

    ??? tip "Podpowiedź 1"

        Deszyfrowanie to przesunięcie w drugą stronę. Przeczytaj jeszcze raz sekcję 5.

    ??? tip "Podpowiedź 2"

        Nie potrzebujesz pętli — `szyfruj` już ją ma. Wystarczy wywołać ją z innym kluczem.

    ??? tip "Podpowiedź 3"

        `return szyfruj(szyfrogram, -k)`. Jeśli okienko zgłasza `NameError: name 'szyfruj' is not defined`, nie wkleiłeś funkcji z ćwiczeń 2 i 3.

!!! note "Ćwiczenie 5. Złam szyfr"

    Napisz funkcję `zlam(szyfrogram, slowo)`, która znajduje klucz, wiedząc
    tylko, że w tekście jawnym występuje podane słowo. Funkcja sprawdza klucze
    od 1 do 25 i zwraca **pierwszy**, przy którym odszyfrowany tekst zawiera
    `slowo`. Gdy żaden klucz nie pasuje, zwraca `-1`.

    W karcie pracy złam szyfrogram `VLCEVZHVL UFECZ H DLWT 12`, wiedząc,
    że w wiadomości jest słowo `JUTRO` — podaj klucz i cały tekst jawny.

    ```python
    # Tu wklej swoje funkcje przesun(), szyfruj() i deszyfruj().


    def zlam(szyfrogram, slowo):
        # TODO: sprawdź klucze od 1 do 25
        return -1


    print(zlam("CZYDUKXSO Y CSYNWOT", "SPOTKANIE"))   # ma być 10
    print(zlam("ABC", "KOT"))                         # ma być -1
    ```

    <div class="py-konsola" data-nazwa="szyfr-cw5.py"><script type="application/json" class="py-testy">[{"kod": "print(zlam(\"CZYDUKXSO Y CSYNWOT\", \"SPOTKANIE\"))", "wynik": "10", "opis": "wywołanie", "pokaz": "zlam(\"CZYDUKXSO Y CSYNWOT\", \"SPOTKANIE\")"}, {"kod": "print(zlam(\"DOD PD NRWD\", \"KOTA\"))", "wynik": "3", "opis": "wywołanie", "pokaz": "zlam(\"DOD PD NRWD\", \"KOTA\")"}, {"kod": "print(zlam(\"ABC\", \"XYZ\"))", "wynik": "3", "opis": "wywołanie", "pokaz": "zlam(\"ABC\", \"XYZ\")"}, {"kod": "print(zlam(\"ABC\", \"KOT\"))", "wynik": "-1", "opis": "wywołanie", "pokaz": "zlam(\"ABC\", \"KOT\")"}]</script></div>

    ??? tip "Podpowiedź 1"

        To atak siłowy z sekcji 6 — tylko zamiast wypisywać każdą wersję, funkcja sama sprawdza, czy jest w niej szukane słowo.

    ??? tip "Podpowiedź 2"

        `for k in range(1, 26):`, a w środku `if slowo in deszyfruj(szyfrogram, k):` — operator `in` znasz z wyszukiwania wzorca.

    ??? tip "Podpowiedź 3"

        W warunku `return k` — funkcja kończy się przy pierwszym trafieniu. `return -1` stoi **za** pętlą, więc wykona się tylko wtedy, gdy żaden klucz nie pasował.

!!! note "Ćwiczenie 6. Także małe litery (dla chętnych)"

    Napisz funkcję `szyfruj2(tekst, k)`, która przesuwa i wielkie, i małe
    litery — każde w swoim alfabecie: `szyfruj2("Ala ma kota", 3)` daje
    `"Dod pd nrwd"`. Małe litery mają kody od 97 (`a`) do 122 (`z`).

    ```python
    def szyfruj2(tekst, k):
        wynik = ""
        # TODO: osobno wielkie litery (od "A"), osobno małe (od "a"), reszta bez zmian
        return wynik


    print(szyfruj2("Ala ma kota", 3))   # ma być Dod pd nrwd
    ```

    <div class="py-konsola" data-nazwa="szyfr-cw6.py"><script type="application/json" class="py-testy">[{"kod": "print(szyfruj2(\"Ala ma kota\", 3))", "wynik": "Dod pd nrwd", "opis": "wywołanie", "pokaz": "szyfruj2(\"Ala ma kota\", 3)"}, {"kod": "print(szyfruj2(\"xyz XYZ\", 3))", "wynik": "abc ABC", "opis": "wywołanie", "pokaz": "szyfruj2(\"xyz XYZ\", 3)"}, {"kod": "print(szyfruj2(\"Dod pd nrwd\", -3))", "wynik": "Ala ma kota", "opis": "wywołanie", "pokaz": "szyfruj2(\"Dod pd nrwd\", -3)"}]</script></div>

    ??? tip "Podpowiedź 1"

        Małe litery to drugi alfabet z 26 znakami. Zmienia się tylko kod, od którego liczysz numer litery.

    ??? tip "Podpowiedź 2"

        Dwa warunki: `if "A" <= znak <= "Z":` z `ord("A")` oraz `elif "a" <= znak <= "z":` z `ord("a")`.

    ??? tip "Podpowiedź 3"

        Dla małej litery: `wynik = wynik + chr((ord(znak) - ord("a") + k) % 26 + ord("a"))`.

## Sprawdź się

<div class="quiz" markdown="0">
<script type="application/json">
[
  {
    "pytanie": "Jak nazywa się tajna informacja, bez której nie da się odszyfrować wiadomości?",
    "opcje": ["szyfrogram", "algorytm", "klucz", "tekst jawny"],
    "poprawna": 2,
    "wyjasnienie": "Algorytm szyfrowania może być powszechnie znany — tajny jest tylko klucz. Szyfrogram to zaszyfrowana wiadomość, a tekst jawny — wiadomość przed zaszyfrowaniem."
  },
  {
    "pytanie": "Zaszyfruj szyfrem Cezara z kluczem 3 słowo KOT.",
    "odpowiedz": ["NRW"],
    "wyjasnienie": "K → N, O → R, T → W — każda litera trzy miejsca dalej w alfabecie."
  },
  {
    "pytanie": "Co wypisze print(chr(ord(\"B\") + 2))?",
    "opcje": ["D", "C", "67", "B2"],
    "poprawna": 0,
    "wyjasnienie": "ord(\"B\") to 66, plus 2 daje 68, a chr(68) to D. Bez chr() wynikiem byłaby liczba 68."
  },
  {
    "pytanie": "Po co w przesunięciu litery jest reszta z dzielenia: (numer + k) % 26?",
    "opcje": [
      "Żeby po Z wrócić na początek alfabetu",
      "Żeby zamienić literę na liczbę",
      "Żeby pominąć spacje",
      "Żeby szyfr był trudniejszy do złamania"
    ],
    "poprawna": 0,
    "wyjasnienie": "Numery liter to 0–25. Bez % numer po przesunięciu mógłby wyjść 26 albo więcej — reszta z dzielenia zawija go z powrotem na początek. Zamianę na liczbę robi ord()."
  },
  {
    "pytanie": "Jak najprościej odszyfrować tekst zaszyfrowany funkcją szyfruj(tekst, k)?",
    "opcje": ["szyfruj(szyfrogram, k)", "szyfruj(szyfrogram, -k)", "szyfruj(szyfrogram[::-1], k)", "szyfruj(szyfrogram, 0)"],
    "poprawna": 1,
    "wyjasnienie": "Deszyfrowanie to przesunięcie w drugą stronę, czyli o −k. Klucz 0 niczego nie zmienia, a odwrócenie napisu nie ma z szyfrem Cezara nic wspólnego."
  },
  {
    "pytanie": "Ile różnych kluczy trzeba sprawdzić, żeby na pewno złamać szyfr Cezara (alfabet z 26 liter)?",
    "opcje": ["3", "25", "26 · 26", "nieskończenie wiele"],
    "poprawna": 1,
    "wyjasnienie": "Klucze od 1 do 25 dają różne szyfrogramy; klucz 26 to obrót o cały alfabet — tekst się nie zmienia. 25 prób to chwila nawet bez komputera."
  },
  {
    "pytanie": "Co wypisze print(-1 % 26) w Pythonie?",
    "odpowiedz": ["25"],
    "wyjasnienie": "W Pythonie reszta z dzielenia przez liczbę dodatnią jest zawsze nieujemna: −1 = −1 · 26 + 25. Dzięki temu A cofnięte o 1 to Z."
  },
  {
    "pytanie": "Dlaczego szyfr Cezara łatwo złamać nawet bez sprawdzania wszystkich kluczy?",
    "opcje": [
      "Bo każda litera zawsze zamienia się w tę samą, więc widać częstość liter",
      "Bo szyfrogram jest dłuższy od tekstu jawnego",
      "Bo litery zamieniają się w cyfry",
      "Bo klucz jest zapisany na początku szyfrogramu"
    ],
    "poprawna": 0,
    "wyjasnienie": "Najczęstsza litera szyfrogramu odpowiada najczęstszej literze języka — to wystarcza, żeby odgadnąć przesunięcie. Długość tekstu się nie zmienia, a klucza nikt nie dopisuje."
  }
]
</script>
</div>

## Karta pracy

Kartę wypełniasz przez obie lekcje: zadania 1–3 na pierwszej, 4–5 na
drugiej. Potem pobierz gotowy dokument Worda i oddaj go przez **Zadania
domowe w dzienniku VULCAN**. Do zrzutów ekranu wystarczy klawisz
++print-screen++ albo ++win+shift+s++.

<div class="kp-podsumowanie" data-karta="szyfrowanie"></div>

<span id="karta" class="kp-kotwica"></span>

???+ karta "Rozwiń kartę pracy"

    <div class="karta-pracy" data-karta="szyfrowanie"></div>

---

*Szyfrogramy i wyniki przykładów policzono programami z tej strony; okienka
używają Pythona 3.14, a online-python.com — 3.12, i w obu wyniki są takie
same. O przesunięciu o 3 u Juliusza Cezara pisze Swetoniusz w „Żywotach
cezarów”. Stan sprawdzony 11 października 2026 r.*
