# Zakupy grupowe z arkuszem

!!! abstract "O tym temacie"

    **2 godziny lekcyjne** · Dział II. Arkusz kalkulacyjny
    · podstawa programowa **I.1, II.1, II.3.c, IV.2**

    Ola, Kuba, Maja i Szymon zamawiają rzeczy z jednego sklepu internetowego.
    Każde z nich osobno zapłaciłoby za kuriera i nie dostałoby rabatu. Razem
    przekraczają próg rabatu — ale teraz ktoś musi policzyć, **kto ile
    oddaje organizatorowi**, i to tak, żeby nikt nie dopłacił do cudzych
    zakupów.

    Ten temat jest o arkuszu, w którym **pisze kilka osób naraz**: jak go
    przygotować, żeby dało się z niego policzyć udział każdego, jak podzielić
    koszty wspólne i co zrobić z groszem, który przy dzieleniu zawsze gdzieś
    zostaje.

    ??? abstract "Plan dwóch lekcji"

        | Lekcja | Sekcje | Ćwiczenia |
        | :---: | --- | --- |
        | 1 | 1–3: tabela dla wielu osób, lista rozwijana, udział każdego z `LICZ.JEŻELI` i `SUMA.JEŻELI` | 1–2 |
        | 2 | 4–6: dostawa i rabat z `JEŻELI`, podział kosztów i `ZAOKR`, saldo i wniosek | 3–5 |

??? rozgrzewka "Na rozgrzewkę — 3 minuty, bez zaglądania"

    Odpowiedz w zeszycie, zanim zaczniesz nowy temat. Odpowiedzi rozwiń
    dopiero wtedy, gdy wszyscy skończą — nie liczą się do oceny.

    1. **Z poprzedniej lekcji.** W `F5:F7` są koszty 1945, 1712 i 1679. Co
       zwróci `=PODAJ.POZYCJĘ(MIN(F5:F7);F5:F7;0)`?
    2. **Sprzed kilku tygodni.** W `B2:B5` są liczby 8, 12, 10 i 5. Co zwróci
       `=SUMA.JEŻELI(B2:B5;">=10")`?
    3. **Z dawniejszych tematów.** Formułę `=B4*$C$1` kopiujesz o jedną
       kolumnę w prawo. Jak będzie wyglądać?

    ??? success "Odpowiedzi"

        1. **3** — najmniejszy koszt, 1679, stoi na trzecim miejscu zakresu.
        2. **22** — warunek spełniają 12 i 10. Dziś `SUMA.JEŻELI` policzy, ile
           wydała każda osoba.
        3. `=C4*$C$1` — adres względny przesunął się o kolumnę, `$C$1` został.

!!! success "Kryteria sukcesu — sprawdź się na koniec tematu"

    Po tym temacie:

    1. Przygotuję arkusz do wspólnego wpisywania: jedna tabela, jeden wiersz na pozycję, lista rozwijana z osobami.
    2. Policzę dla każdej osoby liczbę pozycji i wartość zamówienia funkcjami `LICZ.JEŻELI` i `SUMA.JEŻELI` i sprawdzę wynik sumą kontrolną.
    3. Użyję `JEŻELI`, żeby arkusz sam naliczył dostawę i rabat z progów zapisanych w komórkach.
    4. Podzielę koszt wspólny, zaokrąglę udziały funkcją `ZAOKR` i wyjaśnię, skąd bierze się grosz różnicy.
    5. Policzę saldo każdej osoby, zaznaczę długi formatowaniem warunkowym i napiszę wniosek, czy opłaca się dobrać coś do koszyka.

## 1. Jedna tabela, jeden wiersz na pozycję

Kiedy w arkuszu pisze kilka osób, najczęstszy pomysł to osobna tabelka dla
każdej: „kolumny Oli”, „kolumny Kuby”. Działa do pierwszej zmiany — nowa osoba
to nowe kolumny i przerabianie wszystkich formuł.

Lepiej jest odwrotnie: **jedna tabela**, a w niej **jeden wiersz na każdą
zamówioną rzecz**. Kto zamawia, mówi kolumna *Osoba*.

| Lp. | Osoba | Produkt | Ilość | Cena | Wartość |
| :---: | --- | --- | ---: | ---: | ---: |
| 1 | Ola | Bidon 0,75 l | 1 | 29,99 zł | 29,99 zł |
| 2 | Ola | Skarpety sportowe, 3 pary | 2 | 24,90 zł | 49,80 zł |
| 3 | Kuba | Piłka do siatkówki | 1 | 89,00 zł | 89,00 zł |
| … | … | … | … | … | … |

Taka tabela ma trzy zalety:

- **każdy dopisuje się na dole** i nie rusza cudzych wierszy;
- **nowa osoba nic nie psuje** — to po prostu nowe wiersze z jej imieniem;
- **wszystko, co trzeba policzyć dla jednej osoby, da się wyciągnąć jedną
  funkcją** z warunkiem na kolumnę *Osoba* (sekcja 3).

Zostaw w tabeli kilka **pustych wierszy** i obejmij je formułami od razu.
Kiedy ktoś dopisze pozycję, wszystko przeliczy się samo.

!!! tip "W chmurze to samo działa jeszcze lepiej"

    Gdy taki plik leży w chmurze (Arkusze Google, Excel w OneDrive), każdy
    wpisuje swoje pozycje ze swojego komputera i wszyscy od razu widzą sumy.
    Zasada się nie zmienia: jedna tabela, jeden wiersz na pozycję.

## 2. Lista rozwijana — imię musi być zawsze takie samo

Funkcje z warunkiem porównują tekst **znak po znaku**. Dla arkusza `Kuba`
i `Kuba ` (ze spacją na końcu) to dwie różne osoby — a na ekranie nie widać
różnicy.

!!! example "Przewiduj"

    Kuba ma w tabeli trzy pozycje o wartości 89,00 zł, 12,99 zł i 19,47 zł.
    Przy ostatniej ktoś wpisał jego imię ze spacją na końcu. Ile pokaże dla
    niego `=SUMA.JEŻELI(B5:B19;"Kuba";F5:F19)`?

    ??? success "Przewiduj, potem sprawdź wynik"

        **101,99 zł** zamiast 121,46 zł. Pozycja z „Kuba ” nie pasuje do
        warunku „Kuba”, więc wypada z sumy — bez żadnego komunikatu o błędzie.
        Te 19,47 zł nie zostaną przypisane nikomu.

Dlatego kolumny *Osoba* nie wypełnia się z ręki. Robisz w niej **listę
rozwijaną** — tak samo jak przy porównywaniu ofert: **Dane → Poprawność**
(w Excelu **Poprawność danych**), lista, a jako źródło zakres z imionami
uczestników, np. `$H$5:$H$8`. Imię wybrane z listy jest zawsze identyczne.

## 3. Kto ile zamówił — `LICZ.JEŻELI` i `SUMA.JEŻELI`

Obie funkcje znasz z tematu o instrukcjach warunkowych. Teraz warunek to
**imię z sąsiedniej komórki**, a zakresy leżą na drugiej zakładce:

```text
=LICZ.JEŻELI(Zamówienia!$B$5:$B$19;A9)                       ile pozycji ma osoba z A9
=SUMA.JEŻELI(Zamówienia!$B$5:$B$19;A9;Zamówienia!$D$5:$D$19)  ile sztuk
=SUMA.JEŻELI(Zamówienia!$B$5:$B$19;A9;Zamówienia!$F$5:$F$19)  za ile
```

Zakresy mają **dolary**, bo formułę kopiujesz w dół na kolejne osoby — zakres
ma zostać ten sam, zmienia się tylko `A9` → `A10` → `A11`. Odwołanie do innej
zakładki wpiszesz najwygodniej klikając: zacznij formułę, przejdź na zakładkę
*Zamówienia* i zaznacz zakres myszką.

!!! warning "Suma kontrolna — zawsze"

    Dodaj kwoty wszystkich osób i porównaj z sumą całej tabeli zamówień. Muszą
    być **równe co do grosza**. Jeżeli nie są, któraś pozycja nie trafiła do
    nikogo — najczęściej przez literówkę albo spację w imieniu. To jedyny
    sposób, żeby taki błąd w ogóle zobaczyć.

## 4. Dostawa i rabat — progi zapisane w komórkach

Sklep ma dwie reguły, które zależą od wartości **całego** zamówienia:

| Reguła | Próg | Jeśli spełniona |
| --- | ---: | --- |
| darmowa dostawa | od 400 zł | dostawa 0 zł, inaczej 24,99 zł |
| rabat | od 300 zł | 10% wartości towaru |

Progi i kwoty wpisujesz **do osobnych komórek** (`B3:B6`), a formuły tylko się
do nich odwołują. Sklep zmieni regulamin — poprawiasz jedną komórkę.

```text
=JEŻELI(B15>=B4;0;B3)                  dostawa dla całego zamówienia
=JEŻELI(B15>=B5;ZAOKR(B15*B6;2);0)     rabat w złotych
```

`>=`, a nie `>`: zamówienie za **dokładnie** 400 zł ma już darmową dostawę.

## 5. Podział kosztów — i grosz, który zostaje

Rabat dostaje każdy **od swojej części** — 10% własnych zakupów. Dostawę
dzielimy **po równo**, bo kurier przyjeżdża raz dla wszystkich.

```text
=ZAOKR(D9*$B$6;2)       rabat jednej osoby, do pełnych groszy
=ZAOKR($B$16/4;2)       udział w dostawie
```

`ZAOKR(liczba; 2)` zaokrągla do dwóch miejsc po przecinku, czyli do groszy.
Bez niej w komórce siedzi 6,2475 zł — kwota, której nie da się przelać.

!!! example "Przewiduj"

    Dostawa kosztuje 24,99 zł i dzielą ją cztery osoby. Każda dostaje
    `=ZAOKR(24,99/4;2)`. Ile razem zbiorą na dostawę?

    ??? success "Przewiduj, potem sprawdź wynik"

        **25,00 zł** — o grosz więcej, niż kosztuje kurier. 24,99 / 4 =
        6,2475, po zaokrągleniu 6,25, a 4 × 6,25 = 25,00. Przy dzieleniu na
        części **zawsze** może zostać grosz w jedną albo drugą stronę.

Na grosz różnicy są dwa uczciwe sposoby:

1. **Organizator bierze go na siebie** — płaci o grosz mniej albo więcej
   i zapisuje to przy rozliczeniu.
2. **Ostatnia osoba płaci resztę**: jej udział to nie `ZAOKR(…)`, tylko
   *dostawa minus udziały pozostałych*. Wtedy suma zgadza się zawsze.

Nieuczciwy sposób jest jeden: udawać, że różnicy nie ma. Dlatego w arkuszu
zostaw komórkę, która ją **pokazuje** — zebrane minus faktura.

## 6. Kto już oddał pieniądze

Ostatnia kolumna to **saldo**: wpłacono minus do zapłaty. Zero — rozliczony,
liczba ujemna — jeszcze tyle jest winien, dodatnia — nadpłacił.

Długi zaznacz **formatowaniem warunkowym**: zakres `I9:I12`, reguła z formułą
`=I9<0` i czerwone tło. Kolor zniknie sam, gdy ktoś dopłaci.

!!! example "Przewiduj"

    Całe zamówienie kosztuje 396,77 zł — brakuje 3,23 zł do darmowej dostawy.
    Szymon chce dorzucić długopis za 4,20 zł. Czy faktura dla całej grupy
    **wzrośnie**, czy **spadnie** — i o ile?

    ??? success "Przewiduj, potem sprawdź wynik"

        **Spadnie o 21,21 zł** — z 382,08 zł do 360,87 zł. Zamówienie
        przekroczy 400 zł, więc dostawa za 24,99 zł znika, a długopis po
        rabacie kosztuje tylko 3,78 zł. Kupując więcej, wszyscy zapłacą mniej —
        i tego nie widać bez arkusza, który przelicza się po dopisaniu jednego
        wiersza.

!!! warning "Najczęstsze błędy przy zakupach grupowych"

    | Objaw | Przyczyna | Co zrobić |
    | --- | --- | --- |
    | Suma osób mniejsza niż suma zamówienia | imię wpisane inaczej (spacja, literówka) | lista rozwijana w kolumnie *Osoba*, potem suma kontrolna |
    | Po skopiowaniu w dół zakres „jedzie” razem z formułą | zakres bez `$` | `Zamówienia!$B$5:$B$19` — klawisz ++f4++ |
    | Nowa pozycja nie wchodzi do sum | zakres kończy się na ostatnim wypełnionym wierszu | zakresy z zapasem pustych wierszy |
    | Dostawa naliczona przy zamówieniu za dokładnie 400 zł | `>` zamiast `>=` | sprawdź formułę na wartości progowej |
    | Udział 6,2475 zł | brak zaokrąglenia | `ZAOKR(…;2)` |
    | Zebrane różni się od faktury o grosz | zaokrąglenie udziałów | pokaż różnicę i zdecyduj, kto ją bierze |

## Ćwiczenia

Pobierz skoroszyt — dane są już wpisane, ty dodajesz formuły. Żółte komórki są
do wypełnienia, niebieskie liczby to dane wejściowe, które wolno zmieniać.

Ćwiczenia 1 i 2 robi każdy — to wymagania na oceny 2–3 i pierwsza lekcja.
Ćwiczenia 3–5 są na oceny 4–5 i na drugą lekcję.

[:material-file-excel: Skoroszyt do ćwiczeń (.xlsx)](../pliki/arkusz-zakupy-1a.xlsx){ .md-button .md-button--primary download="arkusz-zakupy-1a.xlsx" }

!!! note "Ćwiczenie 1. Wspólne zamówienie — zakładka *Zamówienia*"

    Wypełnij kolumnę **Wartość** (ilość razy cena) i sumę w `F20`. Formuła ma
    obejmować także puste wiersze 17–19. Suma ma wyjść **396,77 zł**.

    Potem zrób w `B5:B19` listę rozwijaną ze źródłem `$H$5:$H$8`.

!!! note "Ćwiczenie 2. Kto ile zamówił — zakładka *Rozliczenie*"

    Wypełnij kolumny **Liczba pozycji**, **Sztuk** i **Wartość towaru**
    funkcjami `LICZ.JEŻELI` i `SUMA.JEŻELI` oraz wiersz 13 z sumami.

    Porównaj `D13` z sumą zamówienia. **Nie zgadzają się** — w tabeli zamówień
    jest jedna źle wpisana osoba. Znajdź ją, popraw wyborem z listy rozwijanej
    i zapisz, czego brakowało. Po poprawce Kuba ma **3 pozycje** za
    **121,46 zł**, a `D13` = 396,77 zł.

    ??? tip "Podpowiedź 1"

        Warunek to imię z kolumny `A` tego samego wiersza, a zakresy są na
        zakładce *Zamówienia*: osoby w `B5:B19`, sztuki w `D5:D19`, wartości
        w `F5:F19`.

    ??? tip "Podpowiedź 2"

        Zakresy muszą mieć dolary, bo kopiujesz w dół:
        `Zamówienia!$B$5:$B$19`. Kryterium `A9` — bez dolarów.

    ??? tip "Podpowiedź 3"

        `B9`: `=LICZ.JEŻELI(Zamówienia!$B$5:$B$19;A9)`,
        `D9`: `=SUMA.JEŻELI(Zamówienia!$B$5:$B$19;A9;Zamówienia!$F$5:$F$19)`.
        Brakuje 19,47 zł — szukaj wiersza z tą wartością i przyjrzyj się
        imieniu.

!!! note "Ćwiczenie 3. Dostawa i rabat — zakładka *Rozliczenie*"

    W `B15:B18` policz: wartość całego zamówienia (odwołaniem do zakładki
    *Zamówienia*), dostawę, rabat i fakturę sklepu. Progi i kwoty bierz
    z `B3:B6`. Faktura ma wyjść **382,08 zł**.

    Sprawdź formuły: wpisz w `B4` próg **390**. Dostawa ma spaść do zera,
    a faktura — do 357,09 zł. Potem przywróć 400.

    ??? tip "Podpowiedź 1"

        Dostawa zależy od tego, czy `B15` dochodzi do progu z `B4`. Jeśli tak —
        0, jeśli nie — kwota z `B3`.

    ??? tip "Podpowiedź 2"

        Rabat to 10% wartości, ale tylko od progu `B5`; w przeciwnym razie 0.
        Kwotę rabatu zaokrąglij do groszy.

    ??? tip "Podpowiedź 3"

        `B16`: `=JEŻELI(B15>=B4;0;B3)`, `B17`: `=JEŻELI(B15>=B5;ZAOKR(B15*B6;2);0)`,
        `B18`: `=B15-B17+B16`.

!!! note "Ćwiczenie 4. Podział kosztów — zakładka *Rozliczenie*"

    Wypełnij kolumny **Rabat**, **Udział w dostawie** i **Do zapłaty** dla
    każdej osoby oraz komórkę `B19`. Kuba ma zapłacić **115,56 zł**.

    W `B19` wyjdzie **0,01 zł**, a nie zero. Zapisz w karcie, skąd się wziął
    ten grosz i jak byś go rozliczył.

    ??? tip "Podpowiedź 1"

        Rabat osoby to jej wartość towaru razy stawka z `B6` — ale tylko wtedy,
        gdy całe zamówienie (`B15`) przekracza próg z `B5`.

    ??? tip "Podpowiedź 2"

        Udział w dostawie: dostawa z `B16` podzielona przez 4 i zaokrąglona
        do groszy. Do zapłaty: wartość minus rabat plus udział.

    ??? tip "Podpowiedź 3"

        `E9`: `=JEŻELI($B$15>=$B$5;ZAOKR(D9*$B$6;2);0)`, `F9`: `=ZAOKR($B$16/4;2)`,
        `G9`: `=D9-E9+F9`, `B19`: `=G13-B18`.

!!! note "Ćwiczenie 5. Saldo i jeden długopis — obie zakładki"

    Wypełnij kolumnę **Saldo** (wpłacono minus do zapłaty) i zaznacz długi
    na czerwono formatowaniem warunkowym. Na czerwono mają być **dwie** osoby.

    Teraz dopisz w zakładce *Zamówienia*, w wierszu 17, długopis żelowy dla
    Szymona: 1 sztuka po 4,20 zł. Zapisz nową fakturę i odpowiedz w karcie:
    czy grupa powinna dobrać coś do koszyka, gdy brakuje niewiele do progu?

## Sprawdź się

<div class="quiz" markdown="0">
<script type="application/json">
[
  {
    "pytanie": "Cztery osoby wpisują swoje zamówienia do jednego arkusza. Który układ najłatwiej policzyć funkcjami z warunkiem?",
    "opcje": [
      "Osobna tabelka dla każdej osoby, jedna obok drugiej",
      "Osobny plik dla każdej osoby",
      "Jedna tabela, jeden wiersz na pozycję, kolumna z imieniem",
      "Jeden wiersz na osobę, wszystkie produkty w jednej komórce"
    ],
    "poprawna": 2,
    "wyjasnienie": "Gdy każda pozycja ma swój wiersz i kolumnę z imieniem, SUMA.JEŻELI wyciąga dla każdej osoby jej część jedną formułą, a nowa osoba to tylko nowe wiersze."
  },
  {
    "pytanie": "Suma kwot wszystkich osób wyszła o 19,47 zł mniejsza niż suma całego zamówienia. Co jest najbardziej prawdopodobną przyczyną?",
    "opcje": [
      "Imię przy jednej pozycji wpisano inaczej, np. ze spacją na końcu",
      "SUMA.JEŻELI źle zaokrągla grosze",
      "Za mało miejsc po przecinku w formacie komórki",
      "Arkusz nie przeliczył się automatycznie"
    ],
    "poprawna": 0,
    "wyjasnienie": "Pozycja z imieniem, które nie pasuje do żadnego warunku, wypada ze wszystkich sum osób. Brakująca kwota to dokładnie wartość tej pozycji."
  },
  {
    "pytanie": "Darmowa dostawa przysługuje od 400 zł. Który warunek jest poprawny?",
    "opcje": [
      "=JEŻELI(B15>B4;0;B3)",
      "=JEŻELI(B15<B4;0;B3)",
      "=JEŻELI(B15=B4;0;B3)",
      "=JEŻELI(B15>=B4;0;B3)"
    ],
    "poprawna": 3,
    "wyjasnienie": "„Od 400 zł” obejmuje także dokładnie 400 zł, więc potrzebny jest znak >=. Przy samym > zamówienie za równe 400 zł zapłaciłoby za dostawę."
  },
  {
    "pytanie": "Dostawa 24,99 zł dzielona na cztery osoby funkcją =ZAOKR(24,99/4;2). Ile zbierze się razem?",
    "opcje": ["24,99 zł", "25,00 zł", "24,96 zł", "24,98 zł"],
    "poprawna": 1,
    "wyjasnienie": "Każdy udział to 6,2475 zaokrąglone do 6,25 zł, a 4 × 6,25 = 25,00 zł. Grosz różnicy trzeba pokazać i komuś przypisać."
  },
  {
    "pytanie": "Po co progi rabatu i dostawy wpisuje się do osobnych komórek, a nie wprost do formuł?",
    "opcje": [
      "Bo formuła z liczbą w środku nie zadziała",
      "Żeby po zmianie regulaminu poprawić jedną komórkę, a wszystkie wyniki przeliczyły się same",
      "Bo funkcja JEŻELI nie przyjmuje liczb",
      "Żeby arkusz liczył szybciej"
    ],
    "poprawna": 1,
    "wyjasnienie": "Liczba wpisana w formułę na sztywno zostaje tam po zmianie warunków. Odwołanie do komórki z progiem sprawia, że cały arkusz reaguje na jedną zmianę."
  }
]
</script>
</div>

## Karta pracy

Wypełnij kartę na tej stronie, a potem pobierz gotowy dokument Worda i oddaj
go przez **Zadania domowe w dzienniku VULCAN**. Do zrzutów ekranu wystarczy
klawisz ++print-screen++ albo ++win+shift+s++.

<div class="kp-podsumowanie" data-karta="zakupy-grupowe"></div>

<span id="karta" class="kp-kotwica"></span>

???+ karta "Rozwiń kartę pracy"

    <div class="karta-pracy" data-karta="zakupy-grupowe"></div>

Następny krok: [Karta pracy — arkusz kalkulacyjny, część 1](podsumowanie-arkusz-1.md).

---

*Nazwy funkcji podane są w polskiej wersji Excela i LibreOffice Calc.
W angielskim interfejsie to kolejno `COUNTIF`, `SUMIF`, `IF` i `ROUND`.
Imiona, ceny i regulamin sklepu w skoroszycie są przykładowe, przygotowane na
potrzeby lekcji; wyniki podane w ćwiczeniach policzono na tych danych.
Stan sprawdzony 21 października 2026 r.*
