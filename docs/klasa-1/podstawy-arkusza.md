# Podstawy pracy z arkuszem

!!! abstract "O tym temacie"

    **1 godzina lekcyjna** · Dział II. Arkusz kalkulacyjny
    · podstawa programowa **I.1, II.1, II.3.c, IV.2**

    Arkusz to nie tabela do ładnego wpisywania liczb — to kalkulator,
    który przelicza się sam, kiedy zmieniasz dane. Cała lekcja sprowadza
    się do jednej umiejętności: **napisać formułę raz i skopiować ją tak,
    żeby wszędzie działała poprawnie**.

!!! success "Cele lekcji"

    Po tej lekcji potrafisz:

    1. wskazać w arkuszu komórkę, zakres, wiersz, kolumnę i arkusz oraz odczytać adres komórki
    2. rozróżnić dane liczbowe, tekstowe i daty oraz nadać im właściwy format
    3. zastosować funkcje SUMA, ŚREDNIA, MIN, MAKS i JEŻELI do konkretnego zestawienia
    4. napisać formułę z adresowaniem względnym i bezwzględnym i skopiować ją tak, żeby wszędzie liczyła poprawnie
    5. dobrać typ wykresu do rodzaju danych i uzasadnić wybór
    6. zinterpretować wynik obliczeń i ocenić, czy jest sensowny

## 1. Z czego składa się arkusz

| Pojęcie | Co to jest |
| --- | --- |
| **Komórka** | jedno pole; ma adres z litery kolumny i numeru wiersza — `B7` |
| **Zakres** | prostokąt komórek zapisany dwoma narożnikami — `B5:B12` |
| **Arkusz** | jedna zakładka na dole okna |
| **Skoroszyt** | cały plik, czyli wszystkie zakładki razem |

**Każda formuła zaczyna się od znaku `=`.** Bez niego arkusz potraktuje wpis
jak zwykły tekst i po prostu go wyświetli.

```text
=B5+B6          dodaje dwie komórki
=B5*C5          mnoży
=SUMA(B5:B12)   dodaje cały zakres
```

Nazwy funkcji zależą od języka programu: w polskim Excelu i LibreOffice Calc
piszesz `SUMA`, w wersji angielskiej `SUM`. Plik zapisany w jednej wersji
otworzy się w drugiej — nazwy przetłumaczą się same.

## 2. Typy danych i formatowanie

Arkusz rozpoznaje, co wpisałeś, i od tego zależy, co potrafi z tym zrobić:

- **liczba** — wyrównuje się do **prawej**, można na niej liczyć;
- **tekst** — wyrównuje się do **lewej**;
- **data** — to w rzeczywistości liczba dni, dlatego daty można od siebie odejmować;
- **procent** — `0,15` sformatowane jako procent wyświetli się jako `15%`.

!!! warning "Najczęstsza pułapka: liczba, która jest tekstem"

    Wklejasz dane ze strony internetowej, `SUMA` zwraca zero, a liczby wyglądają
    normalnie. Spójrz na **wyrównanie**: jeśli stoją przy lewej krawędzi, to nie
    są liczby, tylko tekst. Zwykle winny jest separator dziesiętny — w polskiej
    wersji częścią dziesiętną oddziela **przecinek**, a kropka robi z liczby tekst.

Formatowanie zmienia **wygląd, nie wartość**. Liczba wyświetlona jako `3,14`
może w środku być równa `3,14159265` — i właśnie ta pełna wartość bierze udział
w obliczeniach. Jeżeli chcesz naprawdę zaokrąglić, użyj funkcji `ZAOKR`.

## 3. Funkcje, które wystarczą na start

| Funkcja | Do czego | Przykład |
| --- | --- | --- |
| `SUMA` | dodaje zakres | `=SUMA(B5:B12)` |
| `ŚREDNIA` | średnia arytmetyczna | `=ŚREDNIA(B5:B12)` |
| `MIN` / `MAX` | wartość najmniejsza i największa | `=MAX(B5:B12)` |
| `ILE.LICZB` | liczy komórki zawierające liczby | `=ILE.LICZB(B5:B12)` |
| `ZAOKR` | zaokrągla do podanej liczby miejsc | `=ZAOKR(B5;2)` |

Argumenty oddziela się **średnikiem** (w wersji angielskiej — przecinkiem).

## 4. Adresowanie — sedno tej lekcji

Kiedy kopiujesz formułę, arkusz **przesuwa adresy razem z nią**. Zwykle o to
właśnie chodzi, ale nie zawsze.

=== "Względny — `B5`"

    Przesuwa się przy kopiowaniu. Skopiowana o wiersz w dół stanie się `B6`.

    Używasz go, gdy każdy wiersz ma liczyć na **swoich własnych** danych:
    `=B5*C5` w kolejnych wierszach ma dotyczyć kolejnych produktów.

=== "Bezwzględny — `$B$4`"

    Nie przesuwa się wcale. Znak `$` blokuje to, co stoi za nim.

    Używasz go, gdy wszystkie wiersze mają sięgać do **jednej wspólnej**
    komórki: kursu waluty, stawki VAT, wysokości rabatu.

    ```text
    =B7/$B$4     cena w euro — kurs zawsze z B4,
                 choćbyś skopiował formułę na sto wierszy w dół
    ```

=== "Mieszany — `$B5` albo `B$5`"

    Blokuje tylko kolumnę albo tylko wiersz.

    Potrzebny wtedy, gdy kopiujesz formułę **w dwóch kierunkach naraz** —
    w dół i w prawo. Klasyczny przykład to tabliczka mnożenia: jedna formuła
    `=$A2*B$1` wypełnia całą siatkę, bo mnożnik pobiera zawsze z kolumny A,
    a mnożną zawsze z wiersza 1.

**Skrót `F4`** przełącza zaznaczony adres w kółko: `B4` → `$B$4` → `B$4` →
`$B4` → `B4`. Działa w Excelu i w LibreOffice Calc; jeżeli w twojej wersji
Calca nic się nie dzieje, spróbuj ++shift+f4++.

!!! tip "Jak sprawdzić, czy formuła jest dobra"

    Skopiuj ją i kliknij w komórkę w środku tabeli — nie w pierwszą.
    Popatrz, na co teraz pokazuje. Błąd adresowania widać dopiero
    w kopiach, nigdy w oryginale.

## 5. Wykres — dobór typu do danych

Wykres nie jest ozdobą; ma pokazać to, czego nie widać w tabeli. Typ dobiera
się do **pytania**, na które wykres ma odpowiedzieć:

| Co pokazujesz | Typ wykresu |
| --- | --- |
| Porównanie kilku kategorii | słupkowy albo kolumnowy |
| Zmiana wielkości w czasie | liniowy |
| Udział części w całości | kołowy — sensowny do mniej więcej pięciu kategorii |
| Zależność dwóch wielkości od siebie | punktowy (XY) |

Każdy wykres potrzebuje **tytułu i opisanych osi wraz z jednostką**. Wykres bez
podpisanych osi nie znaczy nic — i tak samo jest oceniany.

## 6. Liczba to jeszcze nie odpowiedź

Ostatni krok należy do ciebie: arkusz policzy, ale to ty masz powiedzieć,
co z tego wynika.

Uważaj na **średnią przy wartościach odstających**. Jeden nietypowy pomiar
potrafi przesunąć średnią tak, że przestaje opisywać cokolwiek. W takiej
sytuacji warto podać obok **medianę** (wartość środkową) albo **rozstęp**
(różnicę między największą a najmniejszą wartością) — i zapytać, skąd wzięła
się ta jedna dziwna liczba.

## Ćwiczenia

Pobierz przygotowany skoroszyt — dane są już wpisane, ty dodajesz formuły.
Żółte komórki są do wypełnienia.

[:material-file-excel: Skoroszyt do ćwiczeń (.xlsx)](../pliki/arkusz-cwiczenia-1a.xlsx){ .md-button .md-button--primary download="arkusz-cwiczenia-1a.xlsx" }

!!! note "Ćwiczenie 1. Rozliczenie wycieczki — zakładka *Wycieczka*"

    Uzupełnij kolumnę **Koszt na osobę** (komórka `D5` jest wypełniona jako
    przykład — skopiuj ją w dół), a potem policz dla kolumny *Koszt*: sumę,
    średnią, wartość najniższą, najwyższą i liczbę pozycji. Sformatuj kwoty
    tak, żeby wszystkie miały dwa miejsca po przecinku.

    Sprawdź na koniec: czy suma kosztów na osobę pomnożona przez liczbę osób
    daje sumę całkowitą? Jeśli nie — dlaczego?

!!! note "Ćwiczenie 2. Cennik w dwóch walutach — zakładka *Cennik*"

    Przelicz ceny na euro według kursu z komórki `B4` i policz cenę po
    piętnastoprocentowym rabacie. **Napisz formułę raz, w pierwszym wierszu,
    i skopiuj ją w dół** — musi działać bez poprawiania.

    Kiedy tabela jest gotowa, zmień kurs w `B4` na `4,60` i sprawdź, czy
    przeliczyła się cała kolumna. Jeśli zmieniła się tylko jedna komórka albo
    pojawiły się dziwne wyniki — masz błąd w adresowaniu.

!!! note "Ćwiczenie 3. Temperatura w pracowni — zakładka *Pomiary*"

    Policz dla każdego dnia średnią, wartość najwyższą, najniższą i rozstęp.
    Wstaw wykres pokazujący, jak temperatura zmieniała się w ciągu dnia —
    dobierz typ do tego, co pokazujesz, i podpisz osie wraz z jednostką.

    W środę o 13:00 jest pomiar, który odstaje od reszty. **Nie usuwaj go.**
    Policz środową średnią z nim i bez niego, porównaj wyniki i zastanów się,
    co ten pomiar mógł oznaczać.

## Sprawdź się

<div class="quiz" markdown="0">
<script type="application/json">
[
  {
    "pytanie": "Od czego musi zaczynać się każda formuła?",
    "typ": "jedna",
    "opcje": ["Od nazwy funkcji", "Od znaku =", "Od znaku $", "Od nawiasu"],
    "poprawna": 1,
    "wyjasnienie": "Bez znaku równości arkusz uzna wpis za zwykły tekst i wyświetli go dosłownie, zamiast policzyć."
  },
  {
    "pytanie": "W komórce C2 jest formuła =A2*B$1. Kopiujesz ją do komórki D3. Jak będzie wyglądać po skopiowaniu?",
    "typ": "jedna",
    "opcje": ["=A2*B$1", "=B3*C$1", "=A3*C$1", "=B3*B$1"],
    "poprawna": 1,
    "wyjasnienie": "Przesuwasz się o jedną kolumnę w prawo i jeden wiersz w dół. A2 jest w pełni względny, więc staje się B3. W B$1 dolar blokuje wiersz, ale nie kolumnę — kolumna przesuwa się na C, wiersz zostaje 1."
  },
  {
    "pytanie": "W B4 jest kurs euro. Piszesz w C7 formułę przeliczającą cenę i chcesz skopiować ją w dół. Który zapis jest poprawny?",
    "typ": "jedna",
    "opcje": ["=B7/B4", "=B7/$B$4", "=$B$7/B4", "=$B7/$B4"],
    "poprawna": 1,
    "wyjasnienie": "Cena ma się zmieniać wiersz po wierszu (B7 względne), a kurs ma zostać w B4 przy każdej kopii — stąd $B$4."
  },
  {
    "pytanie": "SUMA zwraca zero, choć w kolumnie widać liczby. Co sprawdzisz najpierw?",
    "typ": "jedna",
    "opcje": [
      "Czy zakres w formule jest zapisany dwukropkiem",
      "Czy wartości są wyrównane do prawej, czyli czy to naprawdę liczby",
      "Czy arkusz ma włączone automatyczne przeliczanie",
      "Czy kolumna jest dość szeroka"
    ],
    "poprawna": 1,
    "wyjasnienie": "Wartości wyrównane do lewej to tekst, a tekstu SUMA nie dodaje. Najczęstsza przyczyna to kropka zamiast przecinka jako separator dziesiętny."
  },
  {
    "pytanie": "Który skrót przełącza adres między względnym, bezwzględnym i mieszanym?",
    "typ": "jedna",
    "opcje": ["F2", "F4", "Ctrl + D", "Alt + Enter"],
    "poprawna": 1,
    "wyjasnienie": "F4 przechodzi w kółko: B4 → $B$4 → B$4 → $B4 → B4. Działa w Excelu i w LibreOffice Calc."
  },
  {
    "pytanie": "Chcesz pokazać, jak temperatura zmieniała się od 8:00 do 15:00. Jaki wykres?",
    "typ": "jedna",
    "opcje": ["Kołowy", "Liniowy", "Punktowy XY", "Słupkowy skumulowany"],
    "poprawna": 1,
    "wyjasnienie": "Wykres liniowy pokazuje przebieg wielkości w czasie. Kołowy pokazywałby udział w całości, co dla temperatury nie ma sensu."
  },
  {
    "pytanie": "Komórka wyświetla 3,14, bo ustawiono format z dwoma miejscami po przecinku. Jaka wartość weźmie udział w obliczeniach?",
    "typ": "jedna",
    "opcje": [
      "3,14 — arkusz liczy na tym, co widać",
      "Pełna wartość wpisana do komórki, na przykład 3,14159265",
      "Zależy od tego, czy włączone jest zaokrąglanie wyników",
      "Zero, bo format zamienia liczbę w tekst"
    ],
    "poprawna": 1,
    "wyjasnienie": "Formatowanie zmienia tylko wygląd. Żeby naprawdę zmienić wartość, trzeba użyć funkcji ZAOKR."
  },
  {
    "pytanie": "W serii pomiarów jeden wynik mocno odstaje od pozostałych. Co robisz?",
    "typ": "jedna",
    "opcje": [
      "Usuwasz go, żeby nie psuł średniej",
      "Zostawiasz, podajesz obok medianę lub rozstęp i szukasz przyczyny",
      "Zastępujesz go średnią z sąsiednich pomiarów",
      "Ignorujesz — jeden pomiar nie ma znaczenia"
    ],
    "poprawna": 1,
    "wyjasnienie": "Wartość odstająca bywa najciekawszą informacją w zestawie — może wskazywać błąd pomiaru albo realne zdarzenie. Usunięcie danych, które nie pasują, jest fałszowaniem wyników."
  }
]
</script>
</div>

## Karta pracy

Wypełnij kartę na tej stronie, a potem pobierz gotowy dokument Worda i oddaj
go przez **Zadania domowe w dzienniku VULCAN**.

<div class="kp-podsumowanie" data-karta="podstawy-arkusza"></div>

<span id="karta" class="kp-kotwica"></span>

???+ karta "Rozwiń kartę pracy"

    <div class="karta-pracy" data-karta="podstawy-arkusza"></div>

---

*Skrót `F4` działa tak samo w Microsoft Excel i w LibreOffice Calc. Dane
w skoroszycie do ćwiczeń są przykładowe, przygotowane na potrzeby lekcji.*
