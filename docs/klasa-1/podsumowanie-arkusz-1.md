# Karta pracy — arkusz kalkulacyjny, część 1

!!! abstract "O tej karcie"

    **1 godzina lekcyjna** · Dział II. Arkusz kalkulacyjny · praca na lekcji, oceniana

    Jedna karta, cztery zadania i wszystko, co do tej pory umiesz w arkuszu:
    formuły i adresy bezwzględne, `JEŻELI` i `LICZ.JEŻELI`, porównywanie
    ofert z `MIN`, `INDEKS` i `PODAJ.POZYCJĘ`, formatowanie warunkowe,
    `SUMA.JEŻELI` i dzielenie kosztów z `ZAOKR`. Wszystko na jednym
    przykładzie: klasa jedzie do parku trampolin.

    Kartę wypełniasz **na lekcji, przy komputerze**, i oddajesz **na koniec
    lekcji**. Masz na nią około **35 minut**; przy każdym zadaniu jest podany
    czas orientacyjny.

## Co sprawdza ta karta

Zadania idą od wymagań koniecznych do dopełniających. Ocena wynika z tego,
**dokąd doszedłeś samodzielnie** — wymagania są kumulatywne, więc zadanie na
ocenę wyższą liczy się dopiero wtedy, gdy wcześniejsze są zrobione.

| Zadanie | Zakładka | Co sprawdza | Ocena |
| :---: | --- | --- | :---: |
| 1 | *Koszty* | formuła skopiowana w dół, adres bezwzględny, `SUMA`, `MAX` | 2 |
| 2 | *Wpłaty* | `JEŻELI` z tekstem i z obliczeniem, `LICZ.JEŻELI` | 3 |
| 3 | *Przewoźnicy* | koszt całkowity oferty, `ZAOKR`, `MIN` z `INDEKS` i `PODAJ.POZYCJĘ`, formatowanie warunkowe | 4 |
| 4 | *Wydatki* | `SUMA.JEŻELI`, podział kosztu z `ZAOKR`, saldo, suma kontrolna, wniosek | 5 |

Zadania na ocenę celującą są poza tą kartą — masz je w
[spisie tematów](index.md) i oddajesz osobno w dzienniku VULCAN.

!!! warning "Wolno korzystać z materiałów — nie wolno z cudzej pracy"

    Możesz zaglądać do stron z tematami i do swoich skoroszytów z lekcji.
    Nie wolno korzystać z pomocy kolegów, asystentów AI ani komunikatorów.
    Rozwiązanie ma być Twoje: przy sprawdzaniu mogę poprosić, żebyś pokazał
    w arkuszu, jak doszedłeś do wyniku.

!!! tip "Każdą formułę sprawdź zmianą danych"

    Przy zadaniach 1 i 3 jest polecenie, żeby zmienić jedną liczbę i zobaczyć,
    czy arkusz przeliczył się cały. Jeśli coś nie drgnęło — w formule jest
    liczba wpisana na sztywno albo brakuje `$`. Po sprawdzeniu **przywróć
    pierwotną wartość** i dopiero wtedy przepisuj wyniki do karty.

[:material-file-excel: Skoroszyt do karty (.xlsx)](../pliki/arkusz-podsumowanie-1a.xlsx){ .md-button .md-button--primary download="arkusz-podsumowanie-1a.xlsx" }

## Zadania

!!! note "Zadanie 1. Ile kosztuje wyjazd — zakładka *Koszty* · ok. 5 minut"

    W kolumnie **Razem dla klasy** policz koszt każdej pozycji dla wszystkich
    uczniów — jedną formułą skopiowaną w dół, z liczbą uczniów z `B3`. Policz
    sumy w wierszu 10 i najdroższą pozycję na osobę w `B11`.

    Sprawdź: zmień `B3` na 20 — kolumna C ma się przeliczyć cała. Przywróć 16.

!!! note "Zadanie 2. Kto już wpłacił — zakładka *Wpłaty* · ok. 8 minut"

    W kolumnie **Status** wpisz formułę, która pokazuje „rozliczony”, gdy
    uczeń wpłacił co najmniej kwotę z `B3`, a w przeciwnym razie „brakuje”.
    W kolumnie **Brakuje** pokaż, ile mu brakuje (rozliczonym 0).

    Pod tabelą policz sumę wpłat, liczbę rozliczonych (`LICZ.JEŻELI`) i ile
    brakuje razem.

!!! note "Zadanie 3. Który przewoźnik — zakładka *Przewoźnicy* · ok. 10 minut"

    Każdy przewoźnik liczy inaczej: opłata stała, stawka za kilometr (jazda
    w obie strony) albo cena za osobę. Policz **koszt całkowity** każdej
    oferty i koszt **na osobę** zaokrąglony do groszy. W `B11` pokaż najniższy
    koszt, a w `B12` nazwę najtańszego przewoźnika formułą z `INDEKS`
    i `PODAJ.POZYCJĘ`. Wiersz najtańszej oferty zaznacz na zielono
    formatowaniem warunkowym.

    Sprawdź: zmień liczbę osób w `B3` na 24. Zwycięzca ma się **zmienić sam**,
    a zielony — przeskoczyć. Zapisz w karcie, kto wygrywa przy 24 osobach,
    i przywróć 18.

!!! note "Zadanie 4. Kto komu oddaje — zakładka *Wydatki* · ok. 12 minut"

    Cztery osoby kupiły rzeczy na wyjazd za własne pieniądze, a koszt dzielą
    po równo. Policz, ile wydała każda osoba (`SUMA.JEŻELI`), jej udział
    (całość podzielona na cztery, zaokrąglona do groszy) i saldo. Ujemne
    salda zaznacz na czerwono. W `D20` policz sumę sald.

    W karcie napisz, **kto komu i ile oddaje**, i wyjaśnij wynik w `D20`.

## Karta

Zostaw sobie **3 minuty przed dzwonkiem**. Kliknij pod kartą **Wyślij do
nauczyciela** albo **Pobierz jako dokument Word** i oddaj plik przez
**Zadania domowe w dzienniku VULCAN** — tak, jak powiem na lekcji.
Odpowiedzi zostają też w tej przeglądarce; jeśli lekcja się urwie, użyj
**Zapisz do pliku**, żeby nic nie przepadło.

<div class="kp-podsumowanie" data-karta="podsumowanie-arkusz-1"></div>

<span id="karta" class="kp-kotwica"></span>

???+ karta "Rozwiń kartę pracy"

    <div class="karta-pracy" data-karta="podsumowanie-arkusz-1"></div>

Wcześniejszy temat: [Zakupy grupowe z arkuszem](zakupy-grupowe.md).

---

*Nazwy funkcji podane są w polskiej wersji Excela (w polskim LibreOffice
`MAX` to `MAKS`). W angielskim interfejsie to kolejno `SUM`, `MAX`, `IF`,
`COUNTIF`, `ROUND`, `MIN`, `INDEX`, `MATCH` i `SUMIF`. Dane w skoroszycie są
przykładowe, przygotowane na potrzeby karty. Stan sprawdzony 21 października 2026 r.*
