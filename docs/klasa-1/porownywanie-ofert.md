# Porównywanie ofert w arkuszu

!!! abstract "O tym temacie"

    **2 godziny lekcyjne** · Dział II. Arkusz kalkulacyjny
    · podstawa programowa **I.1, I.3, II.1, II.3.c, IV.2**

    Dwa opakowania tego samego proszku, trzy oferty na ten sam telefon, dwa
    sklepy z tą samą listą zakupów. Każda strona pokazuje jedną ładną liczbę —
    i żadna z tych liczb nie da się porównać z pozostałymi wprost.

    Ta lekcja jest o tym, jak **sprowadzić oferty do wspólnej miary**, policzyć
    to w arkuszu tak, żeby dało się zmienić założenia jednym kliknięciem, i na
    koniec powiedzieć, czego policzona kwota **nie obejmuje**.

!!! success "Cele lekcji"

    Po tej lekcji potrafisz:

    1. wskazać, co trzeba wyrównać między ofertami, zanim zaczniesz je porównywać
    2. policzyć **cenę jednostkową** i wyjaśnić, dlaczego większe opakowanie bywa droższe
    3. policzyć **koszt całkowity** oferty ratalnej za ten sam okres
    4. nadać komórce i zakresowi **nazwę** i użyć jej w formule zamiast adresu
    5. ograniczyć wpisywanie **listą rozwijaną** przez poprawność danych
    6. wskazać najlepszą ofertę funkcjami `MIN`, `INDEKS` i `PODAJ.POZYCJĘ`, a nie wzrokiem
    7. podświetlić wynik **formatowaniem warunkowym**
    8. policzyć cały koszyk jedną formułą `SUMA.ILOCZYNÓW`
    9. napisać wniosek, który mówi też, czego ta liczba nie uwzględnia

## 1. Zanim policzysz: sprowadź oferty do wspólnej miary

Porównywać wolno tylko rzeczy **tak samo policzone**. Zanim wpiszesz cokolwiek
do arkusza, sprawdź trzy rzeczy:

| Co wyrównać | Pytanie, które sobie zadajesz | Przykład niezgodności |
| --- | --- | --- |
| **Ilość** | ile tego dostaję? | 300 ml obok 1 litra |
| **Okres** | na jak długo się wiążę? | 12 rat obok 24 rat |
| **Zakres** | co jest w cenie, a co dopłacam? | dostawa wliczona albo nie |

Reklama pokazuje zwykle liczbę najkorzystniejszą dla sprzedawcy — cenę
opakowania zamiast ceny za kilogram, ratę zamiast całości, cenę towaru bez
dostawy. To nie jest oszustwo; to jest **inna liczba niż ta, której
potrzebujesz**.

!!! tip "Dwie liczby, które w Polsce sprzedawca musi ci pokazać"

    Ustawa z 9 maja 2014 r. o informowaniu o cenach towarów i usług każe podać
    obok ceny sprzedaży także **cenę jednostkową** — za litr, kilogram, metr,
    metr kwadratowy albo sztukę (wolno też za 100 g czy 100 ml). Właśnie po to,
    żeby dało się porównać opakowania różnej wielkości.

    Od początku 2023 roku przy każdej obniżce trzeba dodatkowo podać
    **najniższą cenę z 30 dni przed obniżką**. Dzięki temu widać, czy „−40%"
    liczy się od ceny, która naprawdę obowiązywała.

## 2. Cena jednostkowa — najprostsze wyrównanie

```text
cena jednostkowa = cena opakowania / zawartość
```

W arkuszu to jedna formuła skopiowana w dół:

```text
=C5/D5        cena podzielona przez zawartość
=C5/D5/10     to samo przeliczone na 100 g albo 100 ml
```

| Produkt | Cena | Zawartość | Za kilogram |
| --- | ---: | ---: | ---: |
| Płatki owsiane, mała paczka | 4,29 zł | 0,5 kg | **8,58 zł** |
| Płatki owsiane, duża paczka | 7,99 zł | 1 kg | **7,99 zł** |
| Proszek do prania, mniejszy | 39,99 zł | 2,6 kg | **15,38 zł** |
| Proszek do prania, większy | 71,99 zł | 4,5 kg | **16,00 zł** |

Przy płatkach większe opakowanie rzeczywiście się opłaca. Przy proszku —
**nie**: kilogram z dużego pudełka kosztuje o 62 grosze więcej. Reguła „większe
zawsze tańsze" jest regułą kciuka, a nie prawem natury; dlatego się to liczy,
a nie zgaduje.

!!! warning "Jednostki muszą być te same w całej kolumnie"

    Jeżeli w jednym wierszu wpiszesz zawartość w gramach (`150`), a w innym
    w kilogramach (`0,4`), formuła policzy oba tak samo i wyjdą liczby różniące
    się tysiąc razy — bez żadnego komunikatu o błędzie.

    Ustal jedną jednostkę dla całej kolumny i przelicz do niej wszystko przy
    **wpisywaniu**, a nie później. Gramy na kilogramy: `=150/1000`.

## 3. Koszt całkowity — rata to nie cena

Oferta rozłożona w czasie ma zwykle trzy składniki: coś na start, coś co
miesiąc i coś jednorazowo z boku.

```text
koszt całkowity = opłata na start + rata × liczba miesięcy + opłaty jednorazowe
=C5 + D5*$B$2 + E5
```

Liczba miesięcy stoi w **jednej komórce** `B2` i wchodzi do formuły adresem
bezwzględnym. Dzięki temu zmiana okresu z 24 na 12 przelicza całą tabelę.

Trzy oferty na ten sam telefon:

| Oferta | Na start | Rata | Aktywacja | **Za 24 mies.** | **Za 12 mies.** |
| --- | ---: | ---: | ---: | ---: | ---: |
| A. Tania rata | 0 zł | 79 zł | 49 zł | 1945 zł | **997 zł** |
| B. Rabat na start | 299 zł | 59 zł | 0 zł | 1715 zł | 1007 zł |
| C. Wszystko w cenie | 599 zł | 45 zł | 0 zł | **1679 zł** | 1139 zł |

Na dwa lata najtańsza jest oferta **C**. Na rok — **A**, a C jest najdroższa
z całej trójki. To nie jest sztuczka z liczbami, tylko sedno sprawy: **ranking
ofert zależy od okresu**, dla którego liczysz. Dlatego okres ustala się raz,
na początku, i taki sam dla wszystkich ofert.

!!! danger "RRSO porównuje się tylko przy tej samej kwocie i tym samym okresie"

    Przy kredytach i pożyczkach ustawa każe podać **RRSO** — rzeczywistą roczną
    stopę oprocentowania. Wchodzą do niej nie tylko odsetki, ale i prowizje
    oraz koszty dodatkowych usług, więc jedna liczba obejmuje całość.

    Tylko że jest to stopa **roczna**. Pożyczka rozłożona na dłużej potrafi
    mieć niższe RRSO i mimo to kosztować w sumie znacznie więcej, bo odsetki
    naliczają się przez dwa razy dłuższy czas. Zestawiaj RRSO wyłącznie dla
    ofert o tej samej kwocie i tym samym okresie spłaty, a obok trzymaj
    **całkowitą kwotę do zapłaty** — tę drugą liczbę policzysz w arkuszu sam.

## 4. Nazwy komórek i zakresów — formuła, którą da się przeczytać

`=C5 + D5*$B$2 + E5` działa, ale za pół roku nie będziesz wiedział, co stoi
w `B2`. Komórce można nadać **nazwę** i używać jej w formułach:

```text
=C5 + D5*Okres + E5
```

Zaznacz komórkę, kliknij w **Pole nazwy** (ten prostokąt po lewej nad
arkuszem, gdzie normalnie widać `B2`), wpisz nazwę i naciśnij ++enter++.
To samo działa dla całego zakresu.

=== "LibreOffice Calc"

    Pełne okno: **Arkusz → Nazwane zakresy i wyrażenia → Definiuj…**

    Lista wszystkich nazw z możliwością poprawiania: **… → Zarządzaj**.

=== "Microsoft Excel"

    Pełne okno: **Formuły → Definiuj nazwę**.

    Lista wszystkich nazw: **Formuły → Menedżer nazw** (++ctrl+f3++).

Zasady nazywania: bez spacji (zamiast nich `_`), nie zaczynamy od cyfry i nazwa
nie może wyglądać jak adres komórki — `Rata` wolno, `R2` nie.

!!! tip "Nazwa jest z natury bezwzględna"

    Nazwany zakres nie przesuwa się przy kopiowaniu formuły, tak jak `$B$2`.
    To znaczy, że w miejscach, gdzie do tej pory musiałeś pamiętać o dolarach,
    wystarczy użyć nazwy — i jedno źródło pomyłek znika.

## 5. Lista rozwijana — żeby nie dało się wpisać byle czego

Porównanie sypie się od literówki: `Sklep A` z dodatkową spacją na końcu to dla
arkusza **inny tekst** niż `Sklep A`, więc `LICZ.JEŻELI` go nie znajdzie,
a `PODAJ.POZYCJĘ` zwróci błąd. Lekarstwem jest niewpisywanie z ręki.

**Dane → Poprawność danych** (tak samo w Calcu i w Excelu) → *Zezwalaj:*
**Lista** albo **Zakres komórek** → wskaż zakres z dopuszczalnymi wartościami.
W komórce pojawi się strzałka i lista do wyboru.

Na karcie **Komunikat o błędzie** warto ustawić *Zatrzymaj* — wtedy wartość
spoza listy w ogóle nie wejdzie. Przy ustawieniu *Ostrzeżenie* wejdzie po
potwierdzeniu, a to zwykle nie o to chodzi.

## 6. Niech arkusz sam wskaże najlepszą ofertę

`MIN` podaje **najniższą kwotę**, ale nie mówi, czyja ona jest:

```text
=MIN(Koszty)          1679
```

Nazwę oferty wyciąga się dwiema funkcjami złożonymi w jedną:

```text
=INDEKS(Oferty; PODAJ.POZYCJĘ(MIN(Koszty); Koszty; 0))
```

Czyta się to od środka:

1. `MIN(Koszty)` — ile wynosi najniższy koszt,
2. `PODAJ.POZYCJĘ(…; Koszty; 0)` — **którym z kolei** w zakresie jest ten koszt
   (trzeci argument `0` znaczy „dopasowanie dokładne"),
3. `INDEKS(Oferty; …)` — co stoi na tej samej pozycji w kolumnie z nazwami.

Oba zakresy — `Oferty` i `Koszty` — muszą mieć **tyle samo wierszy** i zaczynać
się w tym samym miejscu, bo inaczej pozycja z jednego wskaże nie ten wiersz
w drugim.

!!! warning "Remis i ręczne przepisywanie"

    Gdy dwie oferty wychodzą równo, `PODAJ.POZYCJĘ` zwróci **pierwszą z nich**
    i o drugiej nigdy się nie dowiesz. Dlatego obok warto trzymać `MAX(Koszty)`
    i różnicę `=MAX(Koszty)-MIN(Koszty)`: gdy różnica jest groszowa, ofert
    praktycznie nie różnicuje cena i decydują inne rzeczy.

    Nigdy nie wpisuj zwycięzcy ręcznie. Po zmianie okresu w `B2` nazwa
    przeliczy się sama — a ręcznie wpisany tekst zostanie taki, jaki był,
    i będzie kłamał.

## 7. Formatowanie warunkowe — żeby wynik było widać

Formatowanie warunkowe maluje komórkę wtedy, gdy warunek jest prawdziwy.
Zaznacz kolumnę z kosztami i dodaj regułę typu **Formuła jest**:

```text
=$F5=MIN($F$5:$F$7)
```

Dolar przed kolumną (`$F5`) sprawia, że reguła zawsze patrzy na kolumnę F,
a numer wiersza bez dolara przesuwa się wraz z kolejnymi komórkami zakresu —
to dokładnie to samo adresowanie mieszane, co w tabliczce mnożenia.
Zakres w `MIN` musi być w pełni bezwzględny, bo porównujesz się do **całej**
kolumny, nie do jej fragmentu.

!!! warning "Kolor niczego nie liczy"

    Formatowanie warunkowe jest **tylko dla oka**. `SUMA` nie potrafi dodać
    „komórek na zielono", a wydruk czarno-biały zrówna wszystko z powrotem.
    Kolor dokłada się do wyniku, nigdy go nie zastępuje — wniosek i tak musi
    stać wypisany słowami.

## 8. Cały koszyk jedną formułą

Gdy pozycji jest kilkanaście, kuszące jest dopisanie kolumny pomocniczej
`=ilość × cena` i zsumowanie jej na dole. Da się bez niej:

```text
=SUMA.ILOCZYNÓW(Ilosci; Ceny)
```

Funkcja mnoży pierwszą liczbę z pierwszą, drugą z drugą i tak dalej, a wyniki
od razu dodaje. Jedna formuła zamiast kolumny plus sumy.

Warunki są dwa: oba zakresy muszą mieć **dokładnie tyle samo komórek** (inaczej
dostaniesz błąd) i muszą zawierać **liczby** — pusta komórka liczy się jak
zero, ale wpisane „brak" albo cena z kropką zamiast przecinka zaniży wynik po
cichu.

!!! tip "Kiedy mimo wszystko kolumna pomocnicza jest lepsza"

    Wtedy, gdy chcesz **zobaczyć**, która pozycja ile kosztuje — przy szukaniu
    błędu albo przy tłumaczeniu komuś wyniku. `SUMA.ILOCZYNÓW` daje jedną
    liczbę i nie pokazuje, skąd się wzięła.

## 9. Liczba to jeszcze nie decyzja

Arkusz policzy dokładnie to, co mu dałeś — i ani grosza więcej. Zanim ogłosisz
zwycięzcę, dopisz, co zostało poza tabelą:

- **koszty dojazdu i dostawy** — 4 złote taniej w sklepie, do którego jedzie
  się autobusem za 18, to nie jest oszczędność;
- **czas i wygoda** — godzina w drugim końcu miasta też jest kosztem;
- **warunki wyjścia** — ile kosztuje zerwanie umowy przed końcem okresu;
- **jakość i gwarancja** — tańszy sprzęt wymieniany po roku nie jest tańszy;
- **zmienność założeń** — sprawdź, czy ranking wytrzymuje zmianę okresu albo
  ilości. Jeśli po zmianie jednej liczby wygrywa ktoś inny, napisz to wprost.

Dobry wniosek ma trzy zdania: **która oferta wygrywa, o ile, i przy jakim
założeniu**. „Najtańsza jest C" to za mało. „Przy 24 ratach najtańsza jest C —
o 266 zł od najdroższej; przy 12 ratach wygrywa A, więc wybór zależy od tego,
jak długo chcę być związany umową" — to jest odpowiedź.

## Ćwiczenia

Pobierz skoroszyt — dane są już wpisane, ty dodajesz formuły. Żółte komórki są
do wypełnienia, niebieskie liczby to dane wejściowe, które wolno zmieniać.

[:material-file-excel: Skoroszyt do ćwiczeń (.xlsx)](../pliki/arkusz-oferty-1a.xlsx){ .md-button .md-button--primary download="arkusz-oferty-1a.xlsx" }

!!! note "Ćwiczenie 1. Które opakowanie jest tańsze — zakładka *Opakowania*"

    Wypełnij kolumny **Cena za jednostkę** i **Za 100 g / 100 ml**. Jedna
    formuła skopiowana w dół obsługuje wszystkie osiem wierszy.

    Cztery produkty występują w dwóch wielkościach. W **trzech** parach opłaca
    się większe opakowanie, w jednej — mniejsze. Znajdź tę jedną i zapisz, o ile
    groszy na kilogram różnią się oba pudełka.

!!! note "Ćwiczenie 2. Trzy oferty na telefon — zakładka *Telefon*"

    Policz kolumnę **Koszt całkowity**, biorąc liczbę miesięcy z komórki `B2`
    adresem bezwzględnym. Przy 24 miesiącach najtańsza oferta ma wyjść
    **1679 zł**, najdroższa **1945 zł**.

    Teraz wpisz w `B2` liczbę **12**. Jeżeli wyniki nie drgnęły, okres jest
    wklepany w formułę na sztywno. Zapisz, która oferta wygrywa teraz — i o ile.

!!! note "Ćwiczenie 3. Nazwy i automatyczny werdykt — zakładka *Telefon*"

    Nazwij zakres z nazwami ofert `Oferty`, a zakres z kosztami `Koszty`
    (komórka `B2` ma już nazwę `Okres` — podejrzyj ją w Menedżerze nazw).

    Wypełnij pole podsumowania pod tabelą: najniższy koszt, nazwa najtańszej
    oferty formułą z `INDEKS` i `PODAJ.POZYCJĘ`, oraz różnica między najdroższą
    a najtańszą. Na koniec dodaj formatowanie warunkowe zaznaczające na zielono
    wiersz z najniższym kosztem — i sprawdź, czy zielony przeskakuje, gdy
    zmienisz `Okres` na 12.

!!! note "Ćwiczenie 4. Dwa sklepy, jeden koszyk — zakładka *Koszyk*"

    Policz wartość koszyka w obu sklepach **jedną formułą** `SUMA.ILOCZYNÓW`
    dla każdego sklepu — bez kolumny pomocniczej. Powinno wyjść **297,86 zł**
    i **293,66 zł**.

    Zwróć uwagę na wynik zliczenia nad tabelą: sklep A jest tańszy w **pięciu
    z ośmiu** pozycji, a mimo to cały koszyk jest w nim droższy o 4,20 zł.
    Zapisz w jednym zdaniu, dlaczego liczenie pozycji zawodzi.

!!! note "Ćwiczenie 5. Wybór sklepu i koszt dojazdu — zakładka *Koszyk*"

    W komórce `B2` zrób listę rozwijaną z dwiema wartościami (poprawność danych,
    źródło: zakres `H4:H5`). Obok wstaw formułę, która pokazuje sumę wybranego
    sklepu — przyda się `JEŻELI` z poprzedniej lekcji.

    Dolicz do każdego sklepu koszt dojazdu z wiersza 15 i policz sumę końcową
    w wierszu 16. Który sklep wygrywa teraz? Na koniec zmień koszt dojazdu do
    sklepu B tak, żeby obie sumy końcowe były równe — zapisz tę kwotę.

## Sprawdź się

<div class="quiz" markdown="0">
<script type="application/json">
[
  {
    "pytanie": "Opakowanie 0,3 l kosztuje 2,19 zł, a karton 1 l — 4,59 zł. Które jest tańsze w przeliczeniu na litr?",
    "typ": "jedna",
    "opcje": [
      "Karton: 4,59 zł/l wobec 7,30 zł/l",
      "Butelka: 2,19 zł to mniej niż 4,59 zł",
      "Oba tak samo — to ten sam sok",
      "Nie da się porównać, bo opakowania są różne"
    ],
    "poprawna": 0,
    "wyjasnienie": "2,19 / 0,3 = 7,30 zł za litr, a 4,59 / 1 = 4,59 zł za litr. Cena opakowania mówi tylko, ile zapłacisz przy kasie — porównywać można dopiero ceny jednostkowe."
  },
  {
    "pytanie": "W kolumnie „Zawartość” jeden wiersz ma wpisane 150 (gramy), a pozostałe 0,4 i 1 (kilogramy). Co zrobi formuła =C5/D5 ?",
    "typ": "jedna",
    "opcje": [
      "Zgłosi błąd #ARG!, bo jednostki się nie zgadzają",
      "Sama rozpozna gramy po wielkości liczby",
      "Policzy wynik tysiąc razy za mały i nic nie zgłosi",
      "Zwróci zero w tym wierszu"
    ],
    "poprawna": 2,
    "wyjasnienie": "Arkusz nie wie nic o jednostkach — dzieli liczby. 8,49/150 da 0,06 zamiast 56,60. Formuła nie zgłosi niczego, bo z jej punktu widzenia wszystko jest w porządku."
  },
  {
    "pytanie": "Oferta A: 0 zł na start, 79 zł rata, 49 zł aktywacji. Oferta C: 599 zł na start, 45 zł rata. Która jest tańsza?",
    "typ": "jedna",
    "opcje": [
      "A — ma niższą opłatę początkową",
      "C — ma niższą ratę",
      "Zawsze C, bo opłata na start to jednorazowy wydatek",
      "Zależy od liczby miesięcy: do 16 rat tańsza jest A, od 17 — C"
    ],
    "poprawna": 3,
    "wyjasnienie": "Koszty zrównują się mniej więcej po 16 ratach (550 zł różnicy na starcie dzielone przez 34 zł różnicy w racie). Pytanie „która tańsza” nie ma sensu bez podania okresu."
  },
  {
    "pytanie": "Liczba miesięcy stoi w komórce B2. Który zapis pozwoli przeliczyć całą tabelę po zmianie okresu?",
    "typ": "jedna",
    "opcje": [
      "=C5 + D5*24 + E5",
      "=C5 + D5*$B$2 + E5",
      "=C5 + D5*B2 + E5 skopiowane w dół",
      "=SUMA(C5:E5)*B2"
    ],
    "poprawna": 1,
    "wyjasnienie": "Wpisana liczba 24 nie zareaguje na zmianę. Adres względny B2 przesunie się przy kopiowaniu na B3, B4 i formuła zacznie mnożyć przez przypadkowe komórki. Potrzebny jest adres bezwzględny albo nazwa."
  },
  {
    "pytanie": "Po co nadaje się komórce nazwę, skoro adres $B$2 działa tak samo?",
    "typ": "jedna",
    "opcje": [
      "Nazwa przyspiesza przeliczanie arkusza",
      "Nazwa pozwala pominąć znak równości na początku formuły",
      "Formuła staje się czytelna, a nazwa nie przesuwa się przy kopiowaniu",
      "Bez nazwy nie da się użyć funkcji INDEKS"
    ],
    "poprawna": 2,
    "wyjasnienie": "Nazwa jest z natury bezwzględna, więc zastępuje dolary, a przy okazji z =D5*Okres widać, co się mnoży — z =D5*$B$2 nie widać nic."
  },
  {
    "pytanie": "Co zwróci formuła =INDEKS(Oferty; PODAJ.POZYCJĘ(MIN(Koszty); Koszty; 0)) ?",
    "typ": "jedna",
    "opcje": [
      "Nazwę oferty o najniższym koszcie",
      "Najniższy koszt spośród ofert",
      "Numer wiersza, w którym stoi najtańsza oferta",
      "Listę wszystkich ofert posortowaną od najtańszej"
    ],
    "poprawna": 0,
    "wyjasnienie": "MIN daje kwotę, PODAJ.POZYCJĘ zamienia ją na pozycję w zakresie, a INDEKS wyjmuje to, co stoi na tej samej pozycji w kolumnie z nazwami. Efekt: nazwa, nie liczba."
  },
  {
    "pytanie": "Sklep A ma niższą cenę w pięciu z ośmiu pozycji koszyka, a mimo to cały koszyk jest w nim droższy. Jak to możliwe?",
    "typ": "jedna",
    "opcje": [
      "To niemożliwe — ktoś pomylił się w formule",
      "Bo SUMA.ILOCZYNÓW pomija pierwszy wiersz zakresu",
      "Bo sklep A dolicza koszt dojazdu",
      "Bo liczy się nie liczba tańszych pozycji, tylko ilość razy różnica ceny"
    ],
    "poprawna": 3,
    "wyjasnienie": "Trzy pozycje, w których tańszy jest sklep B, kupujemy w dużych ilościach, więc ich przewaga przeważa pięć drobnych oszczędności w sklepie A. Dlatego koszyk się liczy, a nie zlicza."
  },
  {
    "pytanie": "Zakres Ilosci ma 8 komórek, a Ceny — 9. Co zrobi =SUMA.ILOCZYNÓW(Ilosci; Ceny) ?",
    "typ": "jedna",
    "opcje": [
      "Policzy osiem par i dziewiątą cenę pominie",
      "Zgłosi błąd, bo zakresy mają różną wielkość",
      "Potraktuje brakującą ilość jak jedynkę",
      "Zsumuje oba zakresy osobno i pomnoży wyniki"
    ],
    "poprawna": 1,
    "wyjasnienie": "Funkcja mnoży komórki parami, więc musi mieć z czym parować. Różna wielkość zakresów kończy się błędem — co akurat jest dobrą wiadomością, bo widać go od razu."
  },
  {
    "pytanie": "Zaznaczyłeś na zielono formatowaniem warunkowym wiersz z najniższym kosztem. Co jeszcze musi znaleźć się w opracowaniu?",
    "typ": "jedna",
    "opcje": [
      "Nic — kolor jest wystarczającym wnioskiem",
      "Wykres kołowy z udziałem każdej oferty",
      "Wypisany słowami wniosek: która oferta, o ile i przy jakim założeniu",
      "Suma komórek zaznaczonych na zielono"
    ],
    "poprawna": 2,
    "wyjasnienie": "Formatowanie warunkowe działa tylko na oko: nie da się go zsumować, a na wydruku czarno-białym znika. Wniosek zawsze zapisuje się słowami, razem z założeniem, przy którym jest prawdziwy."
  }
]
</script>
</div>

## Karta pracy

Wypełnij kartę na tej stronie, a potem pobierz gotowy dokument Worda i oddaj
go przez **Zadania domowe w dzienniku VULCAN**.

<div class="kp-podsumowanie" data-karta="porownywanie-ofert"></div>

<span id="karta" class="kp-kotwica"></span>

???+ karta "Rozwiń kartę pracy"

    <div class="karta-pracy" data-karta="porownywanie-ofert"></div>

---

*Nazwy funkcji podane są w wersji polskiej. W angielskim interfejsie to kolejno
`MIN`, `MAX`, `INDEX`, `MATCH`, `SUMPRODUCT` i `IF`. Ceny w skoroszycie są
przykładowe i służą wyłącznie do ćwiczenia metody — do zadania z karty pracy
zbierasz własne, aktualne.*
