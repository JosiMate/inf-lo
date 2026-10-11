# Przetwarzanie napisów

!!! abstract "O tym temacie"

    **1 godzina lekcyjna** · Dział II. Algorytmika i programowanie w Pythonie
    · podstawa programowa **I.1, I.2.b, I.3, II.1, IV.2**

    Formularz w sklepie poprawia „ jan KOWALSKI ” na „Jan Kowalski”, na
    paragonie widać tylko cztery ostatnie cyfry karty, a w telefonie
    wyszukiwarka kontaktów nie przejmuje się wielkością liter. Za każdym razem
    program **przerabia napis**: przechodzi po jego znakach, wycina fragmenty,
    składa nowy tekst. Dziś nauczysz się robić to samemu — a na koniec
    sprawdzisz, czy zdanie jest palindromem.

??? rozgrzewka "Na rozgrzewkę — 3 minuty, bez zaglądania"

    Odpowiedz w zeszycie, zanim zaczniesz nowy temat. Odpowiedzi rozwiń
    dopiero wtedy, gdy wszyscy skończą — nie liczą się do oceny.

    1. **Z poprzedniej lekcji.** Co wypisze `print("ABRAKADABRA".find("KAD"))`?
    2. **Sprzed kilku tygodni.** Funkcja zaczyna się od `def pole(a, b=2):` i zwraca `a * b`. Ile wynosi `pole(5)`?
    3. **Z dawniejszych tematów.** Jakiego typu jest wartość zwracana przez `input()` — nawet wtedy, gdy wpiszesz liczbę?

    ??? success "Odpowiedzi"

        1. `4` — „KAD” zaczyna się od piątego znaku, a pozycje liczy się od zera.
        2. `10` — parametr `b` dostaje wartość domyślną 2, więc wynik to 5 · 2.
        3. `str`, czyli napis. Dziś zobaczysz, co jeszcze da się z napisem zrobić.

!!! success "Kryteria sukcesu — sprawdź się na koniec lekcji"

    Po tej lekcji:

    1. Wytnę z napisu fragment wycinkiem — także z krokiem, np. `tekst[::-1]`.
    2. Przejdę pętlą `for` po znakach napisu i policzę znaki spełniające warunek.
    3. Zbuduję nowy napis znak po znaku, zaczynając od pustego `""`.
    4. Użyję metod `upper()`, `lower()`, `strip()`, `replace()` i `split()` — i wyjaśnię, dlaczego nie zmieniają oryginału.
    5. Napiszę funkcję logiczną, która sprawdza, czy tekst jest palindromem.

!!! tip "Przykłady uruchomisz na tej stronie"

    Pod przykładami są okienka z Pythonem, takie jak w poprzednich tematach:
    zmień kod i kliknij **▶ Uruchom** (albo ++ctrl+enter++). **Zanim
    klikniesz, przewiduj**, co wypisze program — wynik sprawdzisz potem
    w ramce „Przewiduj, potem sprawdź wynik”. W ćwiczeniach przycisk
    **✓ Sprawdź** wywoła twoje funkcje na kilku napisach i powie, czy wynik
    się zgadza, a pod poleceniem są podpowiedzi — odsłaniaj je po kolei.

## 1. Wycinki z krokiem

Z poprzedniej lekcji znasz indeksy i wycinki: `tekst[0]` to pierwszy znak,
`tekst[-1]` — ostatni, `tekst[1:4]` — znaki 1, 2 i 3. Wycinek ma jeszcze
trzecią liczbę — **krok**: `tekst[od:do:krok]`. Pominięte `od` i `do` znaczą
„od początku” i „do końca”.

| Zapis | Znaczenie |
| --- | --- |
| `tekst[::2]` | co drugi znak, od pierwszego |
| `tekst[1::2]` | co drugi znak, od drugiego |
| `tekst[::-1]` | cały napis od tyłu |
| `tekst[-3:]` | trzy ostatnie znaki |

```python
tekst = "PYTHON"
print(tekst[::2])
print(tekst[1::2])
print(tekst[::-1])
print(tekst[-3:])
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    PTO
    YHN
    NOHTYP
    HON
    ```

**Napisu nie da się zmienić w miejscu.** Instrukcja `tekst[0] = "K"` kończy
się błędem `TypeError: 'str' object does not support item assignment`. Każda
„zmiana” napisu to w rzeczywistości **nowy napis**, który zapisujesz w zmiennej.

## 2. Pętla po znakach

Pętla `for` z `range(len(tekst))` daje kolejne **indeksy**. Gdy indeks nie
jest potrzebny, można chodzić wprost po **znakach**:

```python
for znak in "KOT":
    print(znak)
```

`znak` przyjmuje po kolei wartości `"K"`, `"O"`, `"T"`. Najczęściej w środku
takiej pętli stoi warunek — i licznik albo nowy napis.

```python
zdanie = "Ala ma kota, a kot ma Alę."
samogloski = 0
for znak in zdanie.lower():
    if znak in "aąeęioóuy":
        samogloski += 1
print("samogłosek:", samogloski)

wynik = ""
for znak in "kot w butach":
    if znak != " ":
        wynik = wynik + znak.upper()
print(wynik)
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    samogłosek: 10
    KOTWBUTACH
    ```

    Warunek `znak in "aąeęioóuy"` sprawdza, czy znak należy do napisu
    z samogłoskami — to ten sam operator `in`, którym szukałeś wzorca.
    `zdanie.lower()` sprawia, że wielkie „A” też się liczy.

## 3. Budowanie napisu znak po znaku

Drugi przykład z sekcji 2 to schemat, który przyda się w wielu zadaniach —
także przy szyfrowaniu:

1. zacznij od **pustego napisu** `wynik = ""`;
2. w pętli dla każdego znaku zdecyduj, co dopisać;
3. dopisuj operatorem `+`: `wynik = wynik + coś`.

Kolejność w dodawaniu ma znaczenie. Dopisanie znaku **z przodu** odwraca napis:

```python
odwrotnie = ""
for znak in "kajak?":
    odwrotnie = znak + odwrotnie
print(odwrotnie)
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    ?kajak
    ```

    Każdy kolejny znak trafia **przed** to, co już jest, więc ostatni znak
    ląduje na początku. Ten sam efekt daje wycinek `"kajak?"[::-1]`.

## 4. Metody napisów

Napis ma wbudowane **metody** — wywołujesz je po kropce. Żadna z nich nie
zmienia oryginału: każda **zwraca nowy napis** (albo listę, albo `True`/`False`).

| Metoda | Co zwraca | Przykład | Wynik |
| --- | --- | --- | --- |
| `upper()`, `lower()` | napis wielkimi / małymi literami | `"Kot".upper()` | `"KOT"` |
| `title()` | każdy wyraz wielką literą | `"jan kowalski".title()` | `"Jan Kowalski"` |
| `strip()` | napis bez spacji na początku i końcu | `"  tak ".strip()` | `"tak"` |
| `replace(a, b)` | napis z każdym `a` zamienionym na `b` | `"2,5".replace(",", ".")` | `"2.5"` |
| `split()` | **listę** wyrazów rozdzielonych spacjami | `"Ala ma kota".split()` | `['Ala', 'ma', 'kota']` |
| `isdigit()` | `True`, gdy napis to same cyfry | `"2026".isdigit()` | `True` |

```python
imie = "  jan kowalski  "
print(imie.strip())
print(imie.strip().title())
print("2,5 kg".replace(",", "."))
print("Ala ma kota".split())
print(len("Ala ma kota".split()))
print("2026".isdigit(), "20a6".isdigit())
print(imie)
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    jan kowalski
    Jan Kowalski
    2.5 kg
    ['Ala', 'ma', 'kota']
    3
    True False
      jan kowalski  
    ```

    Ostatni wiersz pokazuje, że `imie` się **nie zmieniło** — razem ze
    spacjami na początku i końcu. `imie.strip().title()` to dwie metody
    jedna po drugiej: najpierw obcięcie spacji, potem wielkie litery.
    `len()` listy z `split()` to liczba wyrazów.

Elementy listy z `split()` odczytujesz tak jak znaki napisu:
`"Ala ma kota".split()[0]` to `"Ala"`, a `[-1]` — ostatni wyraz.

## 5. Palindrom — funkcja, która odpowiada „tak” albo „nie”

**Palindrom** to tekst, który czyta się tak samo od przodu i od tyłu: „kajak”,
„Kobyła ma mały bok”. Przy zdaniach pomija się spacje i wielkość liter.

Funkcja **logiczna** zwraca `True` albo `False`. Porównanie `==` samo ma
wartość `True` albo `False`, więc można je zwrócić wprost:

```python
def czy_palindrom(tekst):
    t = tekst.lower().replace(" ", "")
    return t == t[::-1]

print(czy_palindrom("kajak"))
print(czy_palindrom("Kobyła ma mały bok"))
print(czy_palindrom("Python"))
print(czy_palindrom("Może jutro ta dama da tortu jeżom"))
```

<div class="py-konsola"></div>

??? success "Przewiduj, potem sprawdź wynik"

    ```text
    True
    True
    False
    True
    ```

    Najpierw tekst jest **przygotowany** — małe litery, bez spacji — a dopiero
    potem porównany ze swoim odwróceniem. Bez `lower()` „Kobyła…” nie byłaby
    palindromem, bo „K” i „k” to dla Pythona różne znaki.

!!! warning "Najczęstsze błędy przy napisach"

    | Objaw | Przyczyna | Co zrobić |
    | --- | --- | --- |
    | `TypeError: 'str' object does not support item assignment` | próba zmiany znaku: `tekst[0] = "K"` | zbuduj nowy napis i zapisz go w zmiennej |
    | po `tekst.upper()` tekst dalej ma małe litery | wynik metody nie został zapisany | `tekst = tekst.upper()` |
    | licznik zawsze wynosi 0 albo 1 | licznik zerowany w środku pętli | `licznik = 0` stoi **przed** pętlą |
    | zbudowany napis ma tylko ostatni znak | `wynik = znak` zamiast `wynik = wynik + znak` | dopisuj do tego, co już jest |
    | „Ala” nie jest palindromem | wielkość liter | najpierw `lower()` |

## Ćwiczenia

Na lekcji zrób ćwiczenia 1–3. Ćwiczenie 4 jest na ocenę dobrą, 5 — na bardzo
dobrą; możesz je dokończyć w domu. Każde ćwiczenie możesz zrobić w okienku pod
jego treścią: **✓ Sprawdź** uruchamia twój program albo wywołuje twoje
funkcje na kilku napisach, a **⤓ Zapisz .py** zapisuje kod z okienka jako
plik. Możesz też pobrać cały szkielet i pracować w online-python.com. Miejsca
do uzupełnienia są oznaczone komentarzem `# TODO`.

[:material-language-python: Szkielet ćwiczeń (.py)](../pliki/python-napisy-2loa.py){ .md-button .md-button--primary download="python-napisy-2loa.py" }

!!! note "Ćwiczenie 1. Słowo na trzy sposoby"

    Program wczytuje jedno słowo instrukcją `input()` i wypisuje — każdy wynik
    w osobnym wierszu, w tej kolejności: liczbę jego znaków, słowo od tyłu
    i słowo wielkimi literami. Dla słowa `informatyka`:

    ```text
    11
    akytamrofni
    INFORMATYKA
    ```

    ```python
    slowo = input()

    print()    # TODO: liczba znaków
    print()    # TODO: słowo od tyłu
    print()    # TODO: słowo wielkimi literami
    ```

    <div class="py-konsola" data-nazwa="napisy-cw1.py" data-wejscie="informatyka"><script type="application/json" class="py-testy">[{"wejscie": "informatyka", "wynik": "11\nakytamrofni\nINFORMATYKA"}, {"wejscie": "kot", "wynik": "3\ntok\nKOT"}, {"wejscie": "Szprycha", "wynik": "8\nahcyrpzS\nSZPRYCHA"}]</script></div>

    ??? tip "Podpowiedź 1"

        Długość podaje `len()`, odwrócenie — wycinek z krokiem z sekcji 1, wielkie litery — metoda z sekcji 4.

    ??? tip "Podpowiedź 2"

        `print(len(slowo))` w pierwszym wierszu. W drugim wycinek `[::-1]`.

    ??? tip "Podpowiedź 3"

        `print(slowo[::-1])` i `print(slowo.upper())`.

!!! note "Ćwiczenie 2. Ile cyfr?"

    Napisz funkcję `ile_cyfr(tekst)`, która **zwraca**, ile cyfr jest
    w napisie — przechodząc pętlą po jego znakach. Dla
    `"Pokój 214, piętro 2"` ma wyjść 4.

    ```python
    def ile_cyfr(tekst):
        licznik = 0
        # TODO: pętla po znakach tekstu; cyfrę rozpoznasz metodą isdigit()
        return licznik


    print(ile_cyfr("Pokój 214, piętro 2"))    # ma być 4
    print(ile_cyfr("brak"))                   # ma być 0
    ```

    <div class="py-konsola" data-nazwa="napisy-cw2.py"><script type="application/json" class="py-testy">[{"kod": "print(ile_cyfr(\"Pokój 214, piętro 2\"))", "wynik": "4", "opis": "wywołanie", "pokaz": "ile_cyfr(\"Pokój 214, piętro 2\")"}, {"kod": "print(ile_cyfr(\"brak\"))", "wynik": "0", "opis": "wywołanie", "pokaz": "ile_cyfr(\"brak\")"}, {"kod": "print(ile_cyfr(\"2026\"))", "wynik": "4", "opis": "wywołanie", "pokaz": "ile_cyfr(\"2026\")"}, {"kod": "print(ile_cyfr(\"\"))", "wynik": "0", "opis": "wywołanie", "pokaz": "ile_cyfr(\"\")"}, {"kod": "print(ile_cyfr(\"tel. 600 700 800\"))", "wynik": "9", "opis": "wywołanie", "pokaz": "ile_cyfr(\"tel. 600 700 800\")"}]</script></div>

    ??? tip "Podpowiedź 1"

        To ten sam schemat co liczenie samogłosek w sekcji 2 — zmienia się tylko warunek.

    ??? tip "Podpowiedź 2"

        `for znak in tekst:`, a w środku `if znak.isdigit():`.

    ??? tip "Podpowiedź 3"

        W warunku `licznik += 1`. `return licznik` zostaje na końcu funkcji — **poza** pętlą.

!!! note "Ćwiczenie 3. Inicjały"

    Napisz funkcję `inicjaly(osoba)`, która dla imienia i nazwiska zwraca
    inicjały — wielkie litery, każda z kropką: `inicjaly("Jan Kowalski")` daje
    `"J.K."`. Funkcja ma działać także dla małych liter i dla dwóch imion:
    `inicjaly("anna maria nowak")` daje `"A.M.N."`.

    ```python
    def inicjaly(osoba):
        wynik = ""
        # TODO: podziel napis na wyrazy i z każdego weź pierwszą literę
        return wynik


    print(inicjaly("Jan Kowalski"))       # ma być J.K.
    print(inicjaly("anna maria nowak"))   # ma być A.M.N.
    ```

    <div class="py-konsola" data-nazwa="napisy-cw3.py"><script type="application/json" class="py-testy">[{"kod": "print(inicjaly(\"Jan Kowalski\"))", "wynik": "J.K.", "opis": "wywołanie", "pokaz": "inicjaly(\"Jan Kowalski\")"}, {"kod": "print(inicjaly(\"anna maria nowak\"))", "wynik": "A.M.N.", "opis": "wywołanie", "pokaz": "inicjaly(\"anna maria nowak\")"}, {"kod": "print(inicjaly(\"Ola\"))", "wynik": "O.", "opis": "wywołanie", "pokaz": "inicjaly(\"Ola\")"}, {"kod": "print(inicjaly(\"  piotr   zieliński \"))", "wynik": "P.Z.", "opis": "wywołanie", "pokaz": "inicjaly(\"  piotr   zieliński \")"}]</script></div>

    ??? tip "Podpowiedź 1"

        Wyrazy rozdzielisz metodą `split()` z sekcji 4 — dostaniesz listę, po której można chodzić pętlą `for`.

    ??? tip "Podpowiedź 2"

        Pierwsza litera wyrazu to `wyraz[0]`. Do `wynik` dopisuj tę literę wielką i kropkę.

    ??? tip "Podpowiedź 3"

        ```python
        for wyraz in osoba.split():
            wynik = wynik + wyraz[0].upper() + "."
        ```

        `split()` bez argumentu pomija nadmiarowe spacje, więc działa też dla „  piotr   zieliński ”.

!!! note "Ćwiczenie 4. Numer karty na paragonie"

    Na paragonie widać tylko cztery ostatnie cyfry karty, a pozostałe są
    zastąpione gwiazdkami. Napisz funkcję `maskuj(numer)`, która zwraca taki
    napis: `maskuj("1234567812345678")` daje `"************5678"`. Gdy numer
    ma cztery znaki albo mniej, funkcja zwraca go bez zmian.

    W karcie pracy wyjaśnij, czy twoja funkcja działa dla numeru z trzema
    cyframi i dlaczego.

    ```python
    def maskuj(numer):
        # TODO: gwiazdki w miejsce wszystkich znaków poza czterema ostatnimi
        return numer


    print(maskuj("1234567812345678"))   # ma być ************5678
    print(maskuj("12345"))              # ma być *2345
    ```

    <div class="py-konsola" data-nazwa="napisy-cw4.py"><script type="application/json" class="py-testy">[{"kod": "print(maskuj(\"1234567812345678\"))", "wynik": "************5678", "opis": "wywołanie", "pokaz": "maskuj(\"1234567812345678\")"}, {"kod": "print(maskuj(\"12345\"))", "wynik": "*2345", "opis": "wywołanie", "pokaz": "maskuj(\"12345\")"}, {"kod": "print(maskuj(\"1234\"))", "wynik": "1234", "opis": "wywołanie", "pokaz": "maskuj(\"1234\")"}, {"kod": "print(maskuj(\"987\"))", "wynik": "987", "opis": "wywołanie", "pokaz": "maskuj(\"987\")"}]</script></div>

    ??? tip "Podpowiedź 1"

        Wynik składa się z dwóch części: gwiazdek i czterech ostatnich znaków. Ile ma być gwiazdek, jeśli numer ma `len(numer)` znaków?

    ??? tip "Podpowiedź 2"

        Cztery ostatnie znaki to wycinek `numer[-4:]`. Gwiazdki zbudujesz pętlą albo krócej: napis razy liczba — `"*" * 3` daje `"***"`.

    ??? tip "Podpowiedź 3"

        `return "*" * (len(numer) - 4) + numer[-4:]` — przy krótkim numerze liczba gwiazdek wychodzi ujemna, a napis razy liczba ujemna to `""`.

!!! note "Ćwiczenie 5. Palindrom bez wycinka"

    Napisz funkcję `czy_palindrom(tekst)` **bez** wycinka `[::-1]`: odwrócony
    tekst zbuduj pętlą, tak jak w sekcji 3. Funkcja ma pomijać spacje
    i wielkość liter i zwracać `True` albo `False`.

    W karcie pracy podaj własny przykład palindromu, który ma co najmniej dwa
    wyrazy, i sprawdź go swoją funkcją.

    ```python
    def czy_palindrom(tekst):
        t = tekst.lower().replace(" ", "")
        odwrotnie = ""
        # TODO: zbuduj odwrotnie pętlą po znakach t
        return False    # TODO: porównaj t z odwrotnie


    print(czy_palindrom("Kobyła ma mały bok"))   # ma być True
    print(czy_palindrom("Python"))               # ma być False
    ```

    <div class="py-konsola" data-nazwa="napisy-cw5.py"><script type="application/json" class="py-testy">[{"kod": "print(czy_palindrom(\"Kobyła ma mały bok\"))", "wynik": "True", "opis": "wywołanie", "pokaz": "czy_palindrom(\"Kobyła ma mały bok\")"}, {"kod": "print(czy_palindrom(\"Python\"))", "wynik": "False", "opis": "wywołanie", "pokaz": "czy_palindrom(\"Python\")"}, {"kod": "print(czy_palindrom(\"kajak\"))", "wynik": "True", "opis": "wywołanie", "pokaz": "czy_palindrom(\"kajak\")"}, {"kod": "print(czy_palindrom(\"Może jutro ta dama da tortu jeżom\"))", "wynik": "True", "opis": "wywołanie", "pokaz": "czy_palindrom(\"Może jutro ta dama da tortu jeżom\")"}, {"kod": "print(czy_palindrom(\"ab\"))", "wynik": "False", "opis": "wywołanie", "pokaz": "czy_palindrom(\"ab\")"}]</script></div>

    ??? tip "Podpowiedź 1"

        Odwracanie pętlą masz w sekcji 3: każdy kolejny znak dopisujesz **z przodu**.

    ??? tip "Podpowiedź 2"

        W pętli `for znak in t:` zapisz `odwrotnie = znak + odwrotnie`. Po pętli zostaje porównać dwa napisy.

    ??? tip "Podpowiedź 3"

        Ostatni wiersz funkcji: `return t == odwrotnie` — porównanie samo daje `True` albo `False`.

## Sprawdź się

<div class="quiz" markdown="0">
<script type="application/json">
[
  {
    "pytanie": "Co wypisze print(\"PYTHON\"[::2])?",
    "opcje": ["PY", "PTO", "YHN", "NOHTYP"],
    "poprawna": 1,
    "wyjasnienie": "Krok 2 bierze co drugi znak, zaczynając od indeksu 0: P (0), T (2), O (4). YHN dałby wycinek [1::2], a NOHTYP — [::-1]."
  },
  {
    "pytanie": "Zmienna imie ma wartość \"ola\". Co wypisze program: imie.upper(), a potem print(imie)?",
    "opcje": ["OLA", "ola", "Ola", "błąd"],
    "poprawna": 1,
    "wyjasnienie": "upper() zwraca nowy napis, a nie zmienia starego. Wynik nie został zapisany, więc imie dalej to „ola”. Trzeba napisać imie = imie.upper()."
  },
  {
    "pytanie": "Ile elementów ma lista \"Ala ma kota\".split()?",
    "odpowiedz": ["3", "trzy"],
    "wyjasnienie": "split() bez argumentu dzieli napis w miejscach spacji: ['Ala', 'ma', 'kota'] — trzy wyrazy."
  },
  {
    "pytanie": "Jaki napis zbuduje ta pętla: wynik = \"\", a potem for znak in \"abc\": wynik = znak + wynik?",
    "opcje": ["abc", "cba", "c", "aabbcc"],
    "poprawna": 1,
    "wyjasnienie": "Każdy znak trafia przed to, co już jest: a → ba → cba. Gdyby było wynik = wynik + znak, powstałoby z powrotem abc."
  },
  {
    "pytanie": "Dlaczego funkcja z return t == t[::-1] uznaje „Ala” za palindrom dopiero po dodaniu lower()?",
    "opcje": [
      "Bo [::-1] nie działa na wielkich literach",
      "Bo „A” i „a” to dla Pythona różne znaki",
      "Bo lower() usuwa spacje",
      "Bo == porównuje tylko długości napisów"
    ],
    "poprawna": 1,
    "wyjasnienie": "Odwrócone „Ala” to „alA” — różni się od oryginału wielkością liter. Po lower() oba napisy to „ala”. Spacje usuwa replace(), nie lower()."
  },
  {
    "pytanie": "Co się stanie po wykonaniu tekst = \"kot\" i tekst[0] = \"p\"?",
    "opcje": [
      "tekst będzie równy \"pot\"",
      "tekst będzie równy \"pkot\"",
      "Python zgłosi błąd TypeError",
      "Nic — instrukcja zostanie pominięta"
    ],
    "poprawna": 2,
    "wyjasnienie": "Napisu nie da się zmienić w miejscu. Żeby dostać „pot”, trzeba zbudować nowy napis, np. tekst = \"p\" + tekst[1:]."
  },
  {
    "pytanie": "Który zapis daje trzy ostatnie znaki napisu tekst?",
    "opcje": ["tekst[3:]", "tekst[:3]", "tekst[-3:]", "tekst[::3]"],
    "poprawna": 2,
    "wyjasnienie": "Indeks −3 to trzeci znak od końca, a pominięte „do” znaczy „do końca”. tekst[:3] to trzy pierwsze znaki, a tekst[3:] — wszystko od czwartego."
  }
]
</script>
</div>

## Karta pracy

Wypełnij kartę na tej stronie, a potem pobierz gotowy dokument Worda i oddaj
go przez **Zadania domowe w dzienniku VULCAN**. Do zrzutów ekranu wystarczy
klawisz ++print-screen++ albo ++win+shift+s++.

<div class="kp-podsumowanie" data-karta="przetwarzanie-napisow"></div>

<span id="karta" class="kp-kotwica"></span>

???+ karta "Rozwiń kartę pracy"

    <div class="karta-pracy" data-karta="przetwarzanie-napisow"></div>

---

*Wyniki przykładów sprawdzono w Pythonie 3; okienka na tej stronie używają
Pythona 3.14, a online-python.com — 3.12, i w obu wyniki są takie same.
Stan sprawdzony 11 października 2026 r.*
