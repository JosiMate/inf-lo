# Podsumowanie materiału

!!! abstract "O tym temacie"

    **Powtórka przed pracą bieżącą** · Dział II. Algorytmika i programowanie
    w Pythonie, tematy 1–5

    Za tobą pięć tematów z Pythonem: podstawy, funkcje, wyszukiwanie wzorca,
    przetwarzanie napisów i szyfrowanie. Ta strona zbiera je w jednym
    miejscu: lista tego, co trzeba umieć, ściąga z najważniejszymi
    konstrukcjami, krótkie zagadki, zadania z automatycznym sprawdzaniem
    i quiz. Na końcu przeczytasz, jak wygląda praca bieżąca i jak liczy się
    z niej ocena.

    ??? abstract "Jak korzystać z tej strony"

        | Ile masz czasu | Co zrobić |
        | --- | --- |
        | 10 minut | losowa rozgrzewka (sekcja 1) i quiz na końcu strony |
        | lekcję | dodatkowo zagadki z sekcji 4 i zadania 1–2 |
        | więcej | wszystkie zadania z sekcji 5 i arkusz próbny z sekcji 6 |

## 1. Losowa rozgrzewka

Przełącz na zakładkę **„Powtórka przed sprawdzianem”** i zaznacz tematy od
„Podstaw pracy w środowisku Python” do „Szyfrowania”. Na każde pytanie
odpowiedz w zeszycie, zanim odsłonisz odpowiedź.

<div class="rozgrzewka-losowa" data-klasa="klasa-2"></div>

## 2. Co musisz umieć

Przejdź listę i uczciwie oceń każdy punkt. Litera w nawiasie to poziom
wymagań na pracy bieżącej: **K** — ocena dopuszczająca, **P** —
dostateczna, **R** — dobra, **D** — bardzo dobra. Przy punktach, których nie
jesteś pewien, wróć do tematu — odnośnik prowadzi prosto do niego.
Samoocenę z kryteriów sukcesu w tematach zobaczysz też na stronie
[Mój postęp](../moj-postep.md).

**[Podstawy pracy w środowisku Python](podstawy-pythona.md)**

- [ ] (K) Wypisuję wynik instrukcją `print()` i wczytuję dane instrukcją `input()`.
- [ ] (K) Rozróżniam typy `int`, `float` i `str` i zamieniam jeden w drugi: `int("3")`, `str(5)`.
- [ ] (P) Używam operatorów `//`, `%` i `**` i wiem, co daje każdy z nich.
- [ ] (P) Czytam komunikat o błędzie: wskazuję numer wiersza i rodzaj błędu.

**[Definiowanie funkcji obliczeniowych](funkcje-obliczeniowe.md)**

- [ ] (K) Definiuję funkcję z parametrami i zwracam wynik instrukcją `return`.
- [ ] (P) Wyjaśniam różnicę między `return` a `print()` w funkcji.
- [ ] (P) Używam parametru z wartością domyślną.
- [ ] (R) Stawiam w funkcji instrukcję warunkową `if` / `elif` / `else`.

**[Wyszukiwanie wzorca w tekście](wyszukiwanie-wzorca.md)**

- [ ] (K) Sprawdzam operatorem `in`, czy wzorzec jest w tekście, i znajduję pozycję metodą `find()`.
- [ ] (P) Liczę ustawienia wzorca: `n − m + 1`.
- [ ] (R) Piszę algorytm naiwny pętlą `for` z wycinkiem `tekst[i:i + m]`.
- [ ] (D) Wyjaśniam, dlaczego `count()` nie liczy wystąpień nakładających się.

**[Przetwarzanie napisów](przetwarzanie-napisow.md)**

- [ ] (K) Odczytuję długość, pierwszy i ostatni znak napisu; odwracam napis wycinkiem `[::-1]`.
- [ ] (P) Przechodzę pętlą po znakach napisu i liczę znaki spełniające warunek.
- [ ] (R) Buduję nowy napis znak po znaku, zaczynając od `""`.
- [ ] (D) Piszę funkcję logiczną, która sprawdza, czy tekst jest palindromem.

**[Szyfrowanie i deszyfrowanie tekstu](szyfrowanie.md)**

- [ ] (K) Szyfruję i odszyfrowuję krótki tekst szyfrem Cezara na kartce; znam pojęcia: tekst jawny, szyfrogram, klucz.
- [ ] (P) Odczytuję kod znaku funkcją `ord()` i zamieniam kod na znak funkcją `chr()`.
- [ ] (R) Piszę funkcję szyfrującą tekst szyfrem Cezara.
- [ ] (D) Odszyfrowuję tekst i łamię szyfr Cezara, sprawdzając wszystkie klucze.

## 3. Ściąga — konstrukcje z pięciu tematów

Ściągi nie wolno mieć na pracy bieżącej — ale opłaca się ją umieć napisać
z pamięci. Zakryj prawą kolumnę i sprawdź się.

| Chcę… | Zapis w Pythonie |
| --- | --- |
| wczytać liczbę całkowitą | `x = int(input())` |
| podzielić z resztą | `17 // 5` → `3`, `17 % 5` → `2` |
| zdefiniować funkcję z wartością domyślną | `def cena(netto, vat=23):` |
| zwrócić wynik z funkcji | `return wynik` — **nie** `print(wynik)` |
| sprawdzić warunek | `if x > 0:` … `elif x == 0:` … `else:` |
| powtórzyć dla kolejnych liczb | `for i in range(n):` — od 0 do n − 1 |
| przejść po znakach napisu | `for znak in tekst:` |
| przerwać pętlę | `break` |
| długość, pierwszy i ostatni znak | `len(tekst)`, `tekst[0]`, `tekst[-1]` |
| wyciąć fragment | `tekst[2:6]` — znaki 2, 3, 4, 5 |
| odwrócić napis | `tekst[::-1]` |
| sprawdzić, czy wzorzec jest w tekście | `wzorzec in tekst` |
| pozycja pierwszego wystąpienia | `tekst.find(wzorzec)` — albo `-1` |
| zmienić wielkość liter | `tekst.upper()`, `tekst.lower()` — zwracają **nowy** napis |
| podzielić na wyrazy | `tekst.split()` — lista wyrazów |
| zbudować napis w pętli | `wynik = ""`, potem `wynik = wynik + znak` |
| dopisać do listy | `lista.append(x)` |
| kod znaku i znak z kodu | `ord("A")` → `65`, `chr(66)` → `"B"` |
| przesunąć literę o `k` z zawinięciem | `chr((ord(z) - 65 + k) % 26 + 65)` |

## 4. Przewiduj — zagadki z pięciu tematów

Przy każdej zagadce najpierw zapisz w zeszycie, co wypisze program, dopiero
potem uruchom okienko.

```python
print(17 // 5, 17 % 5, 2 ** 5)
print("4" + "2", int("4") + 2)
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    3 2 32
    42 6
    ```

    `+` na dwóch napisach je skleja, a dopiero po `int()` dodaje liczby.

```python
def podwoj(x):
    print(x * 2)

wynik = podwoj(5)
print(wynik)
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    10
    None
    ```

    Funkcja wypisuje 10, ale niczego nie **zwraca** — brak `return` to
    `None`. Gdyby w funkcji było `return x * 2`, drugi wiersz pokazałby 10.

```python
tekst = "MATEMATYKA"
print(tekst.find("MAT"), tekst.count("MAT"), tekst[4:7])
print(tekst[::-1][:3])
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    0 2 MAT
    AKY
    ```

    `find()` podaje tylko pierwsze wystąpienie — na pozycji 0. `tekst[::-1]`
    to `AKYTAMETAM`, a z niego trzy pierwsze znaki.

```python
wynik = ""
for znak in "Ala ma 2 koty":
    if znak.isdigit() or znak == " ":
        wynik = wynik + "_"
    else:
        wynik = wynik + znak
print(wynik)
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    Ala_ma___koty
    ```

    Spacje i cyfra zamieniają się w podkreślenia; między „ma” a „koty” są
    trzy znaki: spacja, „2”, spacja.

```python
print(ord("C") - ord("A"), chr(ord("A") + 25))
print((23 + 5) % 26, (1 - 4) % 26)
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    2 Z
    2 23
    ```

    To rachunek szyfru Cezara: X (numer 23) przesunięte o 5 daje C
    (numer 2), a B (numer 1) cofnięte o 4 daje X (numer 23).

## 5. Zadania powtórkowe

Każde zadanie zrobisz w okienku pod treścią. **✓ Sprawdź** wywoła twoją
funkcję na kilku danych i powie, co się zgadza. To nie są zadania z pracy
bieżącej — ale sprawdzają te same umiejętności. Litera przy tytule to poziom.

!!! note "Ćwiczenie 1. Cena brutto (K)"

    Napisz funkcję `cena_brutto(netto, vat=23)`, która **zwraca** cenę
    brutto zaokrągloną do groszy: netto powiększone o `vat` procent.
    `cena_brutto(100)` daje `123.0`, a `cena_brutto(100, 8)` — `108.0`.

    ```python
    def cena_brutto(netto, vat=23):
        return 0    # TODO: netto powiększone o vat procent, round(…, 2)


    print(cena_brutto(100))       # ma być 123.0
    print(cena_brutto(100, 8))    # ma być 108.0
    ```

    <div class="py-konsola" data-nazwa="powtorka-cw1.py"><script type="application/json" class="py-testy">[{"kod": "print(cena_brutto(100))", "wynik": "123.0", "opis": "wywołanie", "pokaz": "cena_brutto(100)"}, {"kod": "print(cena_brutto(100, 8))", "wynik": "108.0", "opis": "wywołanie", "pokaz": "cena_brutto(100, 8)"}, {"kod": "print(cena_brutto(19.99))", "wynik": "24.59", "opis": "wywołanie", "pokaz": "cena_brutto(19.99)"}, {"kod": "print(cena_brutto(50, 0))", "wynik": "50.0", "opis": "wywołanie", "pokaz": "cena_brutto(50, 0)"}]</script></div>

    ??? tip "Podpowiedź 1"

        23 procent z `netto` to `netto * 23 / 100`. Cena brutto to netto plus ten podatek.

    ??? tip "Podpowiedź 2"

        Zamiast liczby 23 użyj parametru `vat` — wtedy wartość domyślna zadziała sama.

    ??? tip "Podpowiedź 3"

        `return round(netto + netto * vat / 100, 2)`

!!! note "Ćwiczenie 2. Najdłuższy wyraz (P/R)"

    Napisz funkcję `najdluzszy(zdanie)`, która zwraca najdłuższy wyraz
    zdania. Gdy kilka wyrazów ma tę samą długość, zwraca **pierwszy** z nich.
    `najdluzszy("Ala ma bardzo grzecznego kota")` daje `"grzecznego"`.

    ```python
    def najdluzszy(zdanie):
        naj = ""
        # TODO: pętla po wyrazach; zapamiętaj wyraz dłuższy od dotychczasowego
        return naj


    print(najdluzszy("Ala ma bardzo grzecznego kota"))   # ma być grzecznego
    ```

    <div class="py-konsola" data-nazwa="powtorka-cw2.py"><script type="application/json" class="py-testy">[{"kod": "print(najdluzszy(\"Ala ma bardzo grzecznego kota\"))", "wynik": "grzecznego", "opis": "wywołanie", "pokaz": "najdluzszy(\"Ala ma bardzo grzecznego kota\")"}, {"kod": "print(najdluzszy(\"kot pies\"))", "wynik": "pies", "opis": "wywołanie", "pokaz": "najdluzszy(\"kot pies\")"}, {"kod": "print(najdluzszy(\"ala ola ela\"))", "wynik": "ala", "opis": "wywołanie", "pokaz": "najdluzszy(\"ala ola ela\")"}, {"kod": "print(najdluzszy(\"Python\"))", "wynik": "Python", "opis": "wywołanie", "pokaz": "najdluzszy(\"Python\")"}]</script></div>

    ??? tip "Podpowiedź 1"

        Wyrazy daje `split()`. Przechodzisz po nich pętlą i porównujesz długość każdego z długością najdłuższego dotąd.

    ??? tip "Podpowiedź 2"

        `for wyraz in zdanie.split():`, a w środku `if len(wyraz) > len(naj):`.

    ??? tip "Podpowiedź 3"

        W warunku `naj = wyraz`. Znak `>` (a nie `>=`) sprawia, że przy równej długości zostaje pierwszy wyraz.

!!! note "Ćwiczenie 3. Ostatnie wystąpienie (R)"

    Napisz funkcję `ostatnie(tekst, wzorzec)`, która zwraca pozycję
    **ostatniego** wystąpienia wzorca albo `-1`, gdy go nie ma — algorytmem
    naiwnym, bez `find()` i `rfind()`. `ostatnie("ABRAKADABRA", "ABRA")` daje `7`.

    ```python
    def ostatnie(tekst, wzorzec):
        n, m = len(tekst), len(wzorzec)
        poz = -1
        # TODO: sprawdź każde ustawienie wzorca i zapamiętaj ostatnie trafienie
        return poz


    print(ostatnie("ABRAKADABRA", "ABRA"))   # ma być 7
    print(ostatnie("ABRAKADABRA", "KOT"))    # ma być -1
    ```

    <div class="py-konsola" data-nazwa="powtorka-cw3.py"><script type="application/json" class="py-testy">[{"kod": "print(ostatnie(\"ABRAKADABRA\", \"ABRA\"))", "wynik": "7", "opis": "wywołanie", "pokaz": "ostatnie(\"ABRAKADABRA\", \"ABRA\")"}, {"kod": "print(ostatnie(\"ABRAKADABRA\", \"KOT\"))", "wynik": "-1", "opis": "wywołanie", "pokaz": "ostatnie(\"ABRAKADABRA\", \"KOT\")"}, {"kod": "print(ostatnie(\"banana\", \"ana\"))", "wynik": "3", "opis": "wywołanie", "pokaz": "ostatnie(\"banana\", \"ana\")"}, {"kod": "print(ostatnie(\"xyzab\", \"ab\"))", "wynik": "3", "opis": "wywołanie", "pokaz": "ostatnie(\"xyzab\", \"ab\")"}, {"kod": "print(ostatnie(\"kot\", \"kot\"))", "wynik": "0", "opis": "wywołanie", "pokaz": "ostatnie(\"kot\", \"kot\")"}]</script></div>

    ??? tip "Podpowiedź 1"

        Algorytm naiwny przechodzi ustawienia od lewej do prawej. Jeśli przy każdym trafieniu zapamiętasz pozycję, na końcu zostanie ta ostatnia.

    ??? tip "Podpowiedź 2"

        `for i in range(n - m + 1):`, a w środku `if tekst[i:i + m] == wzorzec:`.

    ??? tip "Podpowiedź 3"

        W warunku `poz = i` — bez `return` i bez `break`, bo pętla ma dojść do końca.

!!! note "Ćwiczenie 4. Szyfr Atbasz (D)"

    W szyfrze **Atbasz** alfabet się odwraca: A zamienia się w Z, B w Y,
    C w X i tak dalej. Klucza nie ma. Napisz funkcję `atbasz(tekst)`, która
    szyfruje wielkie litery od A do Z, a inne znaki zostawia bez zmian.
    `atbasz("ABC")` daje `"ZYX"`.

    Sprawdź, co daje `atbasz(atbasz("KOT"))`, i zastanów się, dlaczego tak
    wychodzi.

    ```python
    def atbasz(tekst):
        wynik = ""
        # TODO: litera o numerze n (A = 0) zamienia się w literę o numerze 25 - n
        return wynik


    print(atbasz("ABC"))           # ma być ZYX
    print(atbasz("ALA MA KOTA"))   # ma być ZOZ NZ PLGZ
    ```

    <div class="py-konsola" data-nazwa="powtorka-cw4.py"><script type="application/json" class="py-testy">[{"kod": "print(atbasz(\"ABC\"))", "wynik": "ZYX", "opis": "wywołanie", "pokaz": "atbasz(\"ABC\")"}, {"kod": "print(atbasz(\"ALA MA KOTA\"))", "wynik": "ZOZ NZ PLGZ", "opis": "wywołanie", "pokaz": "atbasz(\"ALA MA KOTA\")"}, {"kod": "print(atbasz(\"XYZ!\"))", "wynik": "CBA!", "opis": "wywołanie", "pokaz": "atbasz(\"XYZ!\")"}, {"kod": "print(atbasz(atbasz(\"KOT\")))", "wynik": "KOT", "opis": "wywołanie", "pokaz": "atbasz(atbasz(\"KOT\"))"}]</script></div>

    ??? tip "Podpowiedź 1"

        Schemat jest ten sam co w szyfrze Cezara: kod → numer litery → nowy numer → litera. Zmienia się tylko wzór na nowy numer.

    ??? tip "Podpowiedź 2"

        Numer litery to `ord(znak) - ord("A")`. Nowy numer to `25 - numer` — zawijanie nie jest potrzebne, bo wynik zawsze mieści się w 0–25.

    ??? tip "Podpowiedź 3"

        Dla wielkiej litery: `wynik = wynik + chr(25 - (ord(znak) - ord("A")) + ord("A"))`; inne znaki dopisujesz bez zmian.

## 6. Jak wygląda praca bieżąca

- **Forma.** Piszesz przy komputerze, przez **45 minut**, na stronie
  [Sprawdzian przy komputerze](https://josimate.github.io/sprawdziany/).
  Na początku lekcji dostajesz plik arkusza swojej grupy, wczytujesz go
  i odpowiadasz w polach na stronie. Na koniec klikasz **Wyślij do
  nauczyciela**.
- **Zakres.** Pięć tematów z tej strony. Zadania są takie jak ćwiczenia
  z lekcji: napisać krótki program albo funkcję, podać wynik jej wywołania,
  zaszyfrować coś na kartce, wyjaśnić coś jednym zdaniem.
- **Programy uruchamiasz** w online-python.com. Kod wklejasz w pole
  odpowiedzi razem z wynikiem, który wypisał.
- **Ocenianie bez punktów.** Każde polecenie ma poziom: K, P, R albo D.
  Ocenę wyznacza najwyższy poziom zaliczony w całości razem ze wszystkimi
  niższymi. Poziom jest zaliczony, gdy wykonasz wszystkie jego polecenia
  z wyjątkiem najwyżej jednego; poleceń oznaczonych gwiazdką ★ ta
  tolerancja nie obejmuje.

| Poziom | Wymagania | Ocena |
| :---: | --- | :---: |
| K | konieczne | 2 |
| P | podstawowe | 3 |
| R | rozszerzające | 4 |
| D | dopełniające | 5 |

Opłaca się więc najpierw domknąć poziom niższy, a dopiero potem sięgać
wyżej. Szóstki na tej pracy nie ma — zdobywa się ją zadaniem działowym
opisanym w [spisie tematów](index.md).
Ocena z tej pracy jest **oceną bieżącą** i nie podlega poprawie — poprawiać
można sprawdziany z całego działu, a ten zakres wróci na sprawdzianie
kończącym dział II.

!!! tip "Przećwicz obsługę strony przed pracą bieżącą"

    Na stronie sprawdzianu pobierz **arkusz próbny** i wczytaj go — zobaczysz
    pola na odpowiedzi, zapis i wysyłanie. Nic w nim nie jest oceniane.

## Sprawdź się

<div class="quiz" markdown="0">
<script type="application/json">
[
  {
    "pytanie": "Co wypisze print(17 % 5)?",
    "opcje": ["3", "2", "3.4", "85"],
    "poprawna": 1,
    "wyjasnienie": "% daje resztę z dzielenia: 17 = 3 · 5 + 2. Wynik dzielenia całkowitego, 3, daje operator //."
  },
  {
    "pytanie": "Funkcja kończy się instrukcją print(wynik) zamiast return wynik. Co zwraca jej wywołanie?",
    "opcje": ["wynik", "0", "None", "napis \"wynik\""],
    "poprawna": 2,
    "wyjasnienie": "Bez return funkcja zwraca None. print() pokazuje wartość na ekranie, ale nie przekazuje jej dalej do programu."
  },
  {
    "pytanie": "Funkcja ma nagłówek def cena(netto, vat=23):. Co oznacza vat=23?",
    "opcje": [
      "vat zawsze wynosi 23",
      "vat wynosi 23, gdy przy wywołaniu nie podasz drugiego argumentu",
      "funkcja zwraca 23",
      "netto musi być większe od 23"
    ],
    "poprawna": 1,
    "wyjasnienie": "To wartość domyślna parametru. cena(100) przyjmie vat = 23, a cena(100, 8) — vat = 8."
  },
  {
    "pytanie": "Tekst ma 12 znaków, wzorzec 4. Ile ustawień wzorca sprawdza algorytm naiwny?",
    "odpowiedz": ["9", "dziewięć"],
    "wyjasnienie": "n − m + 1 = 12 − 4 + 1 = 9: od pozycji 0 do pozycji 8."
  },
  {
    "pytanie": "Co wypisze print(\"INFORMATYKA\"[2:6])?",
    "opcje": ["FORM", "NFOR", "FORMA", "ORMA"],
    "poprawna": 0,
    "wyjasnienie": "Wycinek obejmuje znaki o indeksach 2, 3, 4, 5 — prawy koniec się nie liczy. Indeks 2 to F, bo liczymy od zera: I (0), N (1), F (2)."
  },
  {
    "pytanie": "Jaki napis zbuduje pętla: wynik = \"\", for znak in \"kot\": wynik = wynik + znak.upper()?",
    "opcje": ["kot", "KOT", "TOK", "T"],
    "poprawna": 1,
    "wyjasnienie": "Każdy znak jest dopisywany na końcu, zamieniony na wielką literę. Gdyby było wynik = znak.upper(), zostałoby tylko ostatnie T."
  },
  {
    "pytanie": "Zaszyfruj szyfrem Cezara z kluczem 2 słowo ZOO.",
    "odpowiedz": ["BQQ"],
    "wyjasnienie": "Z zawija się na początek: Z → A → B. O → P → Q. Wynik: BQQ."
  },
  {
    "pytanie": "Co wypisze print(ord(\"B\"), chr(65))?",
    "opcje": ["66 A", "65 B", "2 A", "B 65"],
    "poprawna": 0,
    "wyjasnienie": "ord() podaje kod znaku — B ma kod 66. chr() zamienia kod na znak — 65 to A."
  },
  {
    "pytanie": "Dlaczego \"banana\".count(\"ana\") daje 1, a algorytm naiwny znajduje 2 wystąpienia?",
    "opcje": [
      "count() rozróżnia wielkość liter",
      "count() liczy tylko wystąpienia, które na siebie nie zachodzą",
      "algorytm naiwny liczy też wystąpienia, których nie ma",
      "count() szuka od końca tekstu"
    ],
    "poprawna": 1,
    "wyjasnienie": "Po znalezieniu „ana” na pozycji 1 count() przeskakuje za nie, więc pomija wystąpienie na pozycji 3, które dzieli z pierwszym środkowe „a”."
  },
  {
    "pytanie": "Ktoś przechwycił szyfrogram zaszyfrowany szyfrem Cezara, ale nie zna klucza. Co wystarczy zrobić?",
    "opcje": [
      "Odwrócić szyfrogram",
      "Sprawdzić 25 możliwych kluczy",
      "Zamienić każdą literę na jej kod",
      "Nic się nie da zrobić bez klucza"
    ],
    "poprawna": 1,
    "wyjasnienie": "Kluczy, które coś zmieniają, jest tylko 25. Sprawdzenie wszystkich to atak siłowy — komputer robi to w ułamku sekundy."
  }
]
</script>
</div>

---

Poprzedni temat: [Szyfrowanie i deszyfrowanie tekstu](szyfrowanie.md).
Następny temat: Algorytm Euklidesa w praktyce — po pracy bieżącej.

*Wyniki zagadek i zadań sprawdzono w Pythonie 3. Stan sprawdzony
11 października 2026 r.*
