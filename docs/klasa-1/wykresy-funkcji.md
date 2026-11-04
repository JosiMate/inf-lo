# Wykresy funkcji w arkuszu

!!! abstract "O tym temacie"

    **1 godzina lekcyjna** · Dział II. Arkusz kalkulacyjny
    · podstawa programowa **II.3.c**

    Na matematyce rysujesz wykres funkcji na kartce: tabelka, kilka punktów,
    linijka. Arkusz robi to samo, tylko punktów może być sto, a po zmianie
    jednej liczby cały wykres przerysowuje się sam. Dzięki temu widać, **co
    robi każdy parametr wzoru** — czego z kartki nie zobaczysz.

    Na lekcji robisz wykres funkcji liniowej i kwadratowej (ćwiczenia 1–3).
    Ćwiczenia 4 i 5 — pokrętło i linia trendu — są na oceny 4–5; to, czego nie
    skończysz na lekcji, dokończysz w domu razem z kartą pracy.

??? rozgrzewka "Na rozgrzewkę — 3 minuty, bez zaglądania"

    Odpowiedz w zeszycie, zanim zaczniesz nowy temat. Odpowiedzi rozwiń
    dopiero wtedy, gdy wszyscy skończą — nie liczą się do oceny.

    1. **Z poprzedniej lekcji.** Formułę
       `=SUMA.JEŻELI(Zamówienia!$B$5:$B$19;A9;Zamówienia!$F$5:$F$19)`
       kopiujesz w dół na kolejne osoby. Dlaczego dolary są w zakresach,
       a przy `A9` ich nie ma?
    2. **Sprzed kilku tygodni.** Jaki typ wykresu pokazuje zależność jednej
       wielkości od drugiej?
    3. **Z matematyki.** Funkcja `y = 2x − 1`. Ile wynosi `y` dla `x = 3`
       i w którym punkcie wykres przecina oś Y?

    ??? success "Odpowiedzi"

        1. Zakresy mają zostać **te same** dla każdej osoby, a kryterium ma się
           zmieniać: `A9` → `A10` → `A11`. Dziś tak samo: parametry funkcji
           z dolarami, `x` bez.
        2. **Punktowy (XY).** Dziś narysujesz nim wykresy funkcji.
        3. `y = 2 · 3 − 1 = 5`. Oś Y wykres przecina w punkcie **(0; −1)** —
           dla `x = 0` zostaje samo `b`.

!!! success "Kryteria sukcesu — sprawdź się na koniec tematu"

    Po tym temacie:

    1. Przygotuję tabelę wartości funkcji: kolumna `x` z równym krokiem i formuła `y` z parametrami w osobnych komórkach.
    2. Narysuję wykres funkcji liniowej jako wykres punktowy z liniami, z tytułem i opisanymi osiami.
    3. Wyjaśnię na wykresie, co zmienia parametr `a`, a co `b` w funkcji `y = a·x + b`.
    4. Narysuję wykres funkcji kwadratowej i odczytam z niego miejsca zerowe i wierzchołek.
    5. Podłączę parametr funkcji do pokrętła i opiszę, jak zmienia się wykres.
    6. Dopasuję do danych z pomiarów linię trendu, odczytam jej równanie i policzę prognozę — z tytułem wykresu pobieranym z komórki.

## 1. Wykres zaczyna się od tabeli

Arkusz nie rysuje wzoru — rysuje **punkty z tabeli**. Najpierw więc budujesz
tabelę wartości: w jednej kolumnie `x`, w drugiej `y` policzone formułą.

| | A | B |
| ---: | :---: | :---: |
| **2** | a = | 2 |
| **3** | b = | −1 |
| **4** | **x** | **y** |
| **5** | −3,0 | `=$B$2*A5+$B$3` |
| **6** | −2,5 | `=$B$2*A6+$B$3` |
| **7** | −2,0 | … |

Trzy zasady, które oszczędzą ci poprawiania:

- **parametry funkcji w osobnych komórkach** (`B2`, `B3`), nie wpisane w formułę
  — zmienisz liczbę w jednej komórce, a przeliczy się cała tabela i wykres;
- **dolary przy parametrach**, bez dolarów przy `x`: formułę kopiujesz w dół,
  `A5` ma się zmieniać na `A6`, `A7`…, a `$B$2` zostać na miejscu;
- **równy krok** w kolumnie `x`. Wpisz −3 i −2,5, zaznacz obie komórki
  i przeciągnij uchwyt w dół — arkusz sam doda kolejne wartości co 0,5.

## 2. Wykres punktowy, nie liniowy

Do wykresu funkcji zawsze wybierasz **wykres punktowy (XY)**. Tylko on bierze
wartości `x` z tabeli i stawia punkt dokładnie nad nimi. Wykres *liniowy*,
mimo nazwy, traktuje pierwszą kolumnę jak **podpisy** i rozstawia je
w równych odstępach — ile by w niej nie było.

!!! example "Przewiduj"

    Tabela funkcji `y = 2x + 1` ma `x` = 0, 1, 2, 5, 10 i `y` = 1, 3, 5, 11, 21.
    Jak będzie wyglądać ta funkcja liniowa na wykresie **liniowym**?

    ??? success "Przewiduj, potem sprawdź wynik"

        **Jak krzywa wygięta do góry**, a nie jak prosta. Wykres liniowy
        stawia 0, 1, 2, 5 i 10 w równych odstępach, więc między „2” a „5”
        i między „5” a „10” linia wznosi się bardziej stromo, choć funkcja
        rośnie cały czas tak samo. Na wykresie punktowym te same dane dają
        prostą.

**W Excelu:** zaznacz tabelę razem z nagłówkami (`A4:B17`), **Wstawianie →
Wykresy → Wstaw wykres punktowy (X, Y)** i wybierz wersję z liniami — dla
prostej *z liniami prostymi*, dla paraboli *z gładkimi liniami*. Tytuł i opisy
osi dodasz przyciskiem **+** obok wykresu albo przez **Projekt wykresu → Dodaj
element wykresu**.

**W LibreOffice Calc:** **Wstaw → Wykres…**, typ **XY (punktowy)**, wariant
*Punkty i linie* albo *Tylko linie*. W tym samym oknie przełączysz typ linii
z prostego na wygładzony.

## 3. Co robią parametry `a` i `b`

Teraz najciekawsze: zmieniasz liczbę w `B2` albo `B3` i patrzysz, jak
zachowuje się wykres.

- **`b`** przesuwa prostą w górę albo w dół. To punkt, w którym prosta
  przecina oś Y.
- **`a`** decyduje o nachyleniu: im większe, tym bardziej stromo. Przy `a`
  ujemnym prosta **opada**, przy `a = 0` jest pozioma.

!!! example "Przewiduj"

    W `B2` wpisujesz −1, w `B3` zostawiasz −1. W którą stronę pochyli się
    prosta i gdzie przetnie oś X?

    ??? success "Przewiduj, potem sprawdź wynik"

        Prosta **opada** z lewej do prawej, a oś X przetnie w punkcie
        **(−1; 0)**: `−1 · (−1) − 1 = 0`. W tabeli to wiersz z `x = −1`,
        w którym `y` wynosi dokładnie zero.

!!! warning "Osie się przesuwają"

    Arkusz sam dobiera zakres osi do danych. Po zmianie parametru prosta może
    wyglądać tak samo, a zmieniły się tylko liczby na osi Y. Zanim powiesz,
    że „nic się nie stało”, **spójrz na podziałkę**. Kto chce porównywać
    wykresy, ustawia granice osi na stałe: dwuklik na osi → **Opcje osi →
    Granice**.

## 4. Funkcja kwadratowa

Wykres `y = a·x² + b·x + c` to **parabola**. Tabela i wykres powstają tak
samo, zmienia się tylko formuła:

```text
=$B$2*A7^2+$B$3*A7+$B$4
```

Znak `^` to potęgowanie: `A7^2` to „A7 do kwadratu”. Krok `x` ustaw mały
(0,5), a wykres wybierz *z gładkimi liniami* — przy kroku 2 zamiast paraboli
zobaczysz kanciastą łamaną z pięciu punktów.

!!! example "Przewiduj"

    Chcesz narysować `y = −x²`. W `A7` jest 3, a w `B7` wpisujesz `=-A7^2`.
    Co pokaże komórka?

    ??? success "Przewiduj, potem sprawdź wynik"

        **9**, a nie −9. W arkuszu minus przy liczbie liczy się **przed**
        potęgowaniem: `=-A7^2` znaczy `(−3)²`. Wykres takiej formuły otwiera się
        do góry zamiast w dół. Poprawnie: `=-(A7^2)` albo `=-1*A7^2`. Tak samo
        działa to w Excelu i w Calcu.

Z wykresu paraboli odczytasz dwie rzeczy, o które pyta matematyka:

- **miejsca zerowe** — tam, gdzie parabola przecina oś X (`y = 0`);
- **wierzchołek** — najniższy punkt paraboli otwartej do góry albo najwyższy
  otwartej w dół.

Wynik z wykresu sprawdzaj w tabeli: przy kroku 0,5 miejsce zerowe całkowite
albo „z połówką” znajdziesz w wierszu, w którym `y` wynosi dokładnie 0.

## 5. Pokrętło zamiast przepisywania

*Na ocenę 4.* Zamiast wpisywać kolejne wartości `a` z klawiatury, możesz je zmieniać
**pokrętłem** albo **suwakiem** — klikasz strzałkę, a parabola zmienia się na
oczach. Pokrętło nie zmienia `a` bezpośrednio: wpisuje liczbę do jednej
komórki (*łącze komórki*), a ty bierzesz ją do formuły.

**W Excelu** pokrętło jest na karcie **Deweloper**. Jeśli jej nie widzisz:
**Plik → Opcje → Dostosowywanie Wstążki** i zaznacz *Deweloper*. Dalej:

1. **Deweloper → Wstaw → Formanty formularza → Pokrętło** i narysuj je obok
   parametrów.
2. Prawy przycisk na pokrętle → **Formatuj formant… → Formant**: wartość
   minimalna, maksymalna, zmiana przyrostowa i **łącze komórki**.
3. Gotowe — kliknij komórkę obok, żeby odznaczyć pokrętło, i klikaj strzałki.

Pokrętło z formantów formularza podaje tylko **liczby całkowite od 0 wzwyż**.
Co zrobić, gdy `a` ma się zmieniać od −2 do 2 co 0,1? Przeliczyć:

```text
łącze komórki: E2, zakres 0–40, krok 1
w B2:  =(E2-20)/10          E2 = 0 → a = −2;  E2 = 20 → a = 0;  E2 = 40 → a = 2
```

**W LibreOffice Calc:** **Widok → Paski narzędzi → Formanty formularza**,
przycisk **pokrętła** (albo pasek przewijania). W trybie projektu otwórz
właściwości kontrolki i na zakładce *Dane* wskaż połączoną komórkę `E2`;
granice ustawisz na zakładce *Ogólne*. Potem wyłącz tryb projektu, inaczej
pokrętło się nie kręci.

## 6. Dane z pomiarów i linia trendu

*Na ocenę 5.* Do tej pory znałeś wzór i rysowałeś wykres. Teraz odwrotnie: masz **punkty
z życia** — osiem przejazdów taksówką, długość trasy i kwotę z paragonu —
i szukasz wzoru, który do nich pasuje.

Takie dane rysujesz **samymi punktami, bez łączenia ich linią**. Punkty to
osobne przejazdy, a linia łamana między nimi udawałaby, że między 5,9 km
a 7,4 km cena zmieniała się zygzakiem.

Na punkty nakładasz **linię trendu** — prostą, która przechodzi między
punktami najbliżej wszystkich naraz:

- **Excel:** zaznacz serię → prawy przycisk → **Dodaj linię trendu…** →
  *Liniowa* i zaznacz **Wyświetl równanie na wykresie**;
- **Calc:** w trybie edycji wykresu prawy przycisk na serii → **Wstaw linię
  trendu…** → *Liniowa*, **Pokaż równanie** (Calc podpisuje je jako `f(x) = …`).

Równanie ma postać `y = a·x + b`, czyli funkcję liniową z poprzednich sekcji:
`a` to **stawka za kilometr**, `b` — **opłata startowa**. Arkusz poda je
z kilkoma miejscami po przecinku; do pieniędzy zaokrąglij do groszy i wpisz do
komórek. Prognozę liczysz już zwykłą formułą: `=E5*E8+E6`.

!!! warning "Prognoza to nie pomiar"

    Linia trendu dobrze przewiduje kwoty **w zakresie, w którym masz dane**
    (tu od 1,8 do 12,3 km). Za 15 km to już zgadywanie, że taryfa się nie
    zmienia — a za 150 km na pewno się zmieni. Przy każdej prognozie napisz,
    z jakiego zakresu danych pochodzi wzór.

### Tytuł, który zmienia się sam

Tytuł wykresu albo osi może pobierać tekst z komórki. Napisz w komórce formułę
składającą tytuł:

```text
="Prognoza za "&E8&" km: "&ZAOKR(E9;2)&" zł"
```

**W Excelu** zaznacz tytuł wykresu (albo tytuł osi), w **pasku formuły**
wpisz `=`, kliknij komórkę z tekstem i naciśnij ++enter++. Od teraz zmiana
długości trasy w `E8` przepisuje tytuł. Calc nie w każdej wersji łączy tytuł
z komórką — jeśli u ciebie się nie da, zrób ten krok w Excelu.

!!! warning "Najczęstsze błędy przy wykresach funkcji"

    | Objaw | Przyczyna | Co zrobić |
    | --- | --- | --- |
    | Prosta wygląda jak krzywa, a na osi X są „1, 2, 3…” zamiast wartości `x` | wykres liniowy zamiast punktowego | zmień typ: **Zmień typ wykresu → Punktowy (XY)** |
    | Po skopiowaniu formuły w dół wszystkie `y` wychodzą 0 albo błąd | parametr bez dolara — formuła odwołuje się do pustych komórek | `$B$2`, `$B$3` — klawisz ++f4++ |
    | Zmiana `a` nie zmienia wykresu | liczba wpisana w formułę na sztywno | parametr z komórki: `=$B$2*A5+$B$3` |
    | Parabola kanciasta | za duży krok `x` albo linie proste | krok 0,5 i wersja *z gładkimi liniami* |
    | Wykres `y = −x²` otwiera się do góry | `=-A7^2` liczy `(−A7)²` | `=-(A7^2)` |
    | Pokrętło nie daje wartości ujemnych ani ułamków | formant formularza zna tylko liczby całkowite od 0 | przelicz w komórce: `=(E2-20)/10` |
    | Punkty pomiarów połączone zygzakiem | wykres z liniami zamiast samych znaczników | wersja *tylko znaczniki*, a trend — linią trendu |

## Ćwiczenia

Pobierz skoroszyt — dane są już wpisane, ty dodajesz formuły i wykresy. Żółte
komórki są do wypełnienia, niebieskie liczby to dane, które wolno zmieniać.

Ćwiczenia 1 i 2 robi każdy — to wymagania na oceny 2–3. Ćwiczenie 3 jest na
ocenę 4, ćwiczenia 4 i 5 — na oceny 4–5.

[:material-file-excel: Skoroszyt do ćwiczeń (.xlsx)](../pliki/arkusz-wykresy-1a.xlsx){ .md-button .md-button--primary download="arkusz-wykresy-1a.xlsx" }

!!! note "Ćwiczenie 1. Funkcja liniowa — zakładka *Liniowa*"

    W `B5:B17` wpisz formułę funkcji `y = a·x + b` z parametrami z `B2`
    i `B3` (napisz ją raz w `B5` i skopiuj w dół). Dla `x = 3` ma wyjść **5**.

    Wstaw obok tabeli **wykres punktowy z liniami prostymi**, nadaj mu tytuł
    `y = 2x − 1` i podpisz osie `x` i `y`. Odczytaj z wykresu, w którym punkcie
    prosta przecina oś X, i sprawdź to w tabeli.

!!! note "Ćwiczenie 2. Parametry `a` i `b` — zakładka *Liniowa*"

    Zmieniaj **tylko** `B2` i `B3`. Wpisz kolejno:

    1. `a = −1`, `b = 2` — zapisz `y` dla `x = 3` i miejsce zerowe;
    2. `a = 0`, `b = 3` — opisz, jak wygląda wykres;
    3. wymyśl własną parę `a` i `b`, dla której prosta przechodzi przez punkt (0; 0).

    Na koniec napisz jednym zdaniem, co na wykresie zmienia `a`, a co `b`.

!!! note "Ćwiczenie 3. Funkcja kwadratowa — zakładka *Kwadratowa*"

    W `B7:B23` wpisz formułę `y = a·x² + b·x + c` z parametrami z `B2:B4`
    (`a = 1`, `b = −2`, `c = −3`). Dla `x = −3` i dla `x = 5` ma wyjść **12**.

    Wstaw **wykres punktowy z gładkimi liniami** i odczytaj z niego miejsca
    zerowe oraz wierzchołek paraboli. Potem wpisz `a = −1`, `b = 2`, `c = 3`:
    co się zmieniło, a co zostało?

    ??? tip "Podpowiedź 1"

        Formuła ma trzy składniki: `a` razy `x` do kwadratu, `b` razy `x`
        i samo `c`. Parametry bierzesz z `B2`, `B3`, `B4`, a `x` — z kolumny `A`
        tego samego wiersza.

    ??? tip "Podpowiedź 2"

        Kwadrat to `A7^2`. Parametry muszą mieć dolary, bo kopiujesz w dół:
        `$B$2`, `$B$3`, `$B$4`. Przy `A7` dolarów nie ma.

    ??? tip "Podpowiedź 3"

        `B7`: `=$B$2*A7^2+$B$3*A7+$B$4`, potem skopiuj do `B23`. Miejsca zerowe
        to wiersze, w których `y = 0`; wierzchołek — wiersz z najmniejszym `y`.

!!! note "Ćwiczenie 4. Pokrętło — zakładka *Kwadratowa*"

    Wstaw pokrętło (sekcja 5), połącz je z komórką `E2` i ustaw zakres
    **0–40** z krokiem 1. W `B2` zamiast liczby wpisz `=(E2-20)/10`.
    Przywróć `b = −2` i `c = −3`.

    Kręć pokrętłem i odpowiedz w karcie: jak wygląda wykres przy `a = 0`
    i dlaczego; ile miejsc zerowych ma funkcja przy `a = −1`; co dzieje się
    z parabolą, gdy `a` rośnie od 0,1 do 2.

    ??? tip "Podpowiedź 1"

        Brak karty *Deweloper* to nie błąd — włączasz ją w **Plik → Opcje →
        Dostosowywanie Wstążki**. W Calcu pokrętło jest na pasku *Formanty
        formularza*.

    ??? tip "Podpowiedź 2"

        Ustawienia są w **Formatuj formant… → Formant**: wartość minimalna 0,
        maksymalna 40, zmiana przyrostowa 1, łącze komórki `$E$2`. Pokrętło
        wpisuje liczbę do `E2`, a `a` liczy formuła w `B2`.

    ??? tip "Podpowiedź 3"

        Przy `E2 = 20` jest `a = 0`, a wtedy `a·x²` znika i zostaje
        `y = −2x − 3` — funkcja liniowa. Przy `a = −1` sprawdź w tabeli, czy
        w kolumnie `y` w ogóle pojawia się zero albo zmiana znaku.

!!! note "Ćwiczenie 5. Linia trendu i prognoza — zakładka *Taksówka*"

    1. Wstaw **wykres punktowy z samymi znacznikami** z `A4:B12`. Dodaj linię
       trendu liniową z równaniem.
    2. Z równania odczytaj stawkę za kilometr i opłatę startową, zaokrąglij do
       groszy i wpisz do `E5` i `E6`.
    3. W `E9` policz formułą prognozę kwoty za przejazd o długości z `E8`
       (15 km), a w `E10` — tekst tytułu (sekcja 6).
    4. Połącz tytuł wykresu z `E10`, a tytuł osi poziomej — z nagłówkiem `A4`.
       Wpisz w `E8` 20 km i sprawdź, czy tytuł zmienił się sam.

    W karcie napisz, dlaczego punktów nie łączy się linią i na ile wierzysz
    prognozie za 20 km.

    ??? tip "Podpowiedź 1"

        Równanie linii trendu ma postać `y = a·x + b`. `x` to kilometry,
        `y` — kwota. Która z liczb mówi, ile kosztuje każdy kolejny kilometr?

    ??? tip "Podpowiedź 2"

        `E5` to liczba przy `x`, `E6` — liczba bez `x`. Prognoza:
        stawka razy kilometry plus opłata startowa, wszystko z komórek.

    ??? tip "Podpowiedź 3"

        `E9`: `=E5*E8+E6`, `E10`: `="Prognoza za "&E8&" km: "&ZAOKR(E9;2)&" zł"`.
        Tytuł: zaznacz go, w pasku formuły wpisz `=`, kliknij `E10`, ++enter++.

## Sprawdź się

<div class="quiz" markdown="0">
<script type="application/json">
[
  {
    "pytanie": "Chcesz narysować wykres funkcji y = 2x − 1 z tabeli wartości. Który typ wykresu wybierzesz?",
    "opcje": [
      "Liniowy — bo funkcja jest liniowa",
      "Kolumnowy",
      "Punktowy (XY) z liniami",
      "Kołowy"
    ],
    "poprawna": 2,
    "wyjasnienie": "Tylko wykres punktowy stawia punkty nad prawdziwymi wartościami x z tabeli. Wykres liniowy traktuje x jak podpisy w równych odstępach — nazwa myli."
  },
  {
    "pytanie": "W tabeli x = 0, 1, 2, 5, 10, a y policzone ze wzoru y = 2x + 1. Na wykresie liniowym ta funkcja wygląda jak krzywa. Dlaczego?",
    "opcje": [
      "Wykres liniowy rozstawia wartości x w równych odstępach, choć różnice między nimi są różne",
      "Formuła liczy y z błędem zaokrąglenia",
      "Arkusz wygładza linie na wykresie liniowym",
      "Funkcja y = 2x + 1 nie jest liniowa"
    ],
    "poprawna": 0,
    "wyjasnienie": "Odstęp między 2 a 5 i między 5 a 10 jest na osi taki sam jak między 0 a 1, więc linia na tych odcinkach wznosi się bardziej stromo. Wykres punktowy pokaże prostą."
  },
  {
    "pytanie": "W B5 jest =$B$2*A5+$B$3. Jak będzie wyglądać ta formuła po skopiowaniu do B6?",
    "opcje": [
      "=$B$3*A6+$B$4",
      "=$B$2*A5+$B$3",
      "=$B$2*A6+$B$4",
      "=$B$2*A6+$B$3"
    ],
    "poprawna": 3,
    "wyjasnienie": "Adresy z dolarami ($B$2, $B$3) zostają na miejscu, adres względny A5 przesuwa się o wiersz na A6."
  },
  {
    "pytanie": "W A7 jest 3. Co pokaże komórka z formułą =-A7^2? Wpisz liczbę.",
    "odpowiedz": ["9"],
    "wyjasnienie": "Minus przy liczbie liczy się przed potęgowaniem, więc to (−3)² = 9. Żeby dostać −9, napisz =-(A7^2)."
  },
  {
    "pytanie": "Parabola y = x² − 2x − 3 wyszła kanciasta, jak łamana z kilku odcinków. Co najpewniej poprawi wygląd?",
    "opcje": [
      "Zmiana typu wykresu na kolumnowy",
      "Mniejszy krok x (np. 0,5) i wykres z gładkimi liniami",
      "Większy krok x, żeby punktów było mniej",
      "Usunięcie tytułów osi"
    ],
    "poprawna": 1,
    "wyjasnienie": "Arkusz łączy tylko punkty z tabeli. Przy kroku 2 punktów jest pięć i widać kąty; przy kroku 0,5 i gładkich liniach parabola wygląda jak parabola."
  },
  {
    "pytanie": "Pokrętło z formantów formularza podaje liczby całkowite od 0 wzwyż i jest połączone z E2. Jak uzyskać w B2 parametr a od −2 do 2 co 0,1?",
    "opcje": [
      "Ustawić w pokrętle wartość minimalną −2",
      "Wpisać w B2 liczbę ręcznie po każdym kliknięciu",
      "Zakres pokrętła 0–40 i w B2 formuła =(E2-20)/10",
      "Zakres pokrętła 0–4 i w B2 formuła =E2-2"
    ],
    "poprawna": 2,
    "wyjasnienie": "E2 od 0 do 40 minus 20 daje −20…20, a podzielone przez 10 — od −2 do 2 co 0,1. Wersja 0–4 i =E2-2 też daje −2…2, ale tylko co 1."
  },
  {
    "pytanie": "Masz osiem przejazdów taksówką: długość i kwotę z paragonu. Jak najlepiej pokazać, ile kosztuje kilometr?",
    "opcje": [
      "Wykres punktowy z samymi znacznikami i linią trendu z równaniem",
      "Wykres punktowy z punktami połączonymi łamaną",
      "Wykres kołowy kwot",
      "Wykres kolumnowy z kilometrami na osi Y"
    ],
    "poprawna": 0,
    "wyjasnienie": "Pomiary to osobne punkty — łamana między nimi nic nie znaczy. Linia trendu pokazuje zależność, a jej równanie y = a·x + b podaje stawkę (a) i opłatę startową (b)."
  }
]
</script>
</div>

## Karta pracy

Wypełnij kartę na tej stronie, a potem pobierz gotowy dokument Worda i oddaj
go przez **Zadania domowe w dzienniku VULCAN**. Do zrzutów ekranu wystarczy
klawisz ++print-screen++ albo ++win+shift+s++.

<div class="kp-podsumowanie" data-karta="wykresy-funkcji"></div>

<span id="karta" class="kp-kotwica"></span>

???+ karta "Rozwiń kartę pracy"

    <div class="karta-pracy" data-karta="wykresy-funkcji"></div>

Następny temat w dziale: *Komputerowe wspomaganie pomiarów* — w przygotowaniu.

---

*Nazwy funkcji i poleceń podane są w polskiej wersji Excela i LibreOffice
Calc. Kwoty przejazdów w skoroszycie są przykładowe,
przygotowane na potrzeby lekcji; wyniki podane w ćwiczeniach policzono na tych
danych. Stan sprawdzony 4 listopada 2026 r.*
