# Stosowanie instrukcji warunkowych

!!! abstract "O tym temacie"

    **2 godziny lekcyjne** · Dział II. Arkusz kalkulacyjny
    · podstawa programowa **I.1, II.1, II.3.c, IV.2**

    Do tej pory arkusz liczył zawsze to samo. Teraz nauczysz się pisać formuły,
    które **same decydują, co policzyć** — inaczej dla ucznia z dwudziestoma
    punktami, inaczej dla ucznia z sześcioma. To ta sama myśl, na której stoi
    każdy program komputerowy: *jeżeli warunek jest spełniony, zrób to, a jeśli
    nie — zrób tamto*.

    ??? abstract "Plan dwóch lekcji"

        | Lekcja | Sekcje | Ćwiczenia |
        | :---: | --- | --- |
        | 1 | 1–3: warunek, `JEŻELI`, `JEŻELI` w `JEŻELI` | 1–2 |
        | 2 | 4–6: `ORAZ` i `LUB`, `LICZ.JEŻELI` i `SUMA.JEŻELI`, sprawdzanie formuł | 3–4 |

??? rozgrzewka "Na rozgrzewkę — 3 minuty, bez zaglądania"

    Odpowiedz w zeszycie, zanim zaczniesz nowy temat. Odpowiedzi rozwiń
    dopiero wtedy, gdy wszyscy skończą — nie liczą się do oceny.

    1. **Z poprzedniej lekcji.** W komórce `C7` stoi formuła `=B7/$B$4`.
       Kopiujesz ją o jeden wiersz w dół. Jak będzie wyglądać w `C8`?
    2. **Sprzed kilku tygodni.** Hasło jest jedynym zabezpieczeniem konta.
       Ile znaków powinno mieć co najmniej według obecnych zaleceń?
    3. **Z dawniejszych tematów.** Czy to prawda: 13 ≥ 13? A 13 > 13?

    ??? success "Odpowiedzi"

        1. `=B8/$B$4` — adres względny przesunął się o wiersz, a bezwzględny
           `$B$4` został na miejscu. Dziś tak samo zablokujesz próg zaliczenia.
        2. **Co najmniej 15 znaków.** To już jest warunek: *jeżeli hasło ma
           mniej niż 15 znaków, to jest za krótkie* — dziś zapiszesz takie
           zdania w arkuszu.
        3. 13 ≥ 13 — **prawda**, 13 > 13 — **fałsz**. Ta różnica zdecyduje
           dziś o tym, czy uczeń z 13 punktami zaliczy sprawdzian.

!!! success "Kryteria sukcesu — sprawdź się na koniec tematu"

    Po tym temacie:

    1. Zapiszę warunek operatorem porównania i przewidzę, czy da `PRAWDA`, czy `FAŁSZ`.
    2. Napiszę formułę `JEŻELI` i powiem, co robi każdy z trzech argumentów.
    3. Zbuduję zagnieżdżone `JEŻELI` od najwyższego progu i sprawdzę je na wartości równej progowi.
    4. Dobiorę `ORAZ` albo `LUB` po spójniku w treści warunku.
    5. Policzę i zsumuję dane spełniające warunek funkcjami `LICZ.JEŻELI` i `SUMA.JEŻELI`, z progiem pobieranym z komórki.
    6. Wykryję błąd formuły, która nie zgłasza błędu: wartością progową, przypadkami skrajnymi i kontrolą sumą.

## 1. Warunek, czyli zdanie prawdziwe albo fałszywe

Warunek to porównanie dwóch wartości. Arkusz sprawdza je i odpowiada jednym
z dwóch słów: `PRAWDA` albo `FAŁSZ`. Trzeciej możliwości nie ma.

| Operator | Znaczenie | Przykład |
| :---: | --- | --- |
| `=` | równe | `=B5=17` |
| `<>` | różne | `=B5<>17` |
| `>` | większe | `=B5>13` |
| `<` | mniejsze | `=B5<13` |
| `>=` | większe lub równe | `=B5>=17` |
| `<=` | mniejsze lub równe | `=B5<=13` |

!!! example "Przewiduj"

    W komórce `B5` jest liczba **17**. Który z sześciu przykładów z tabeli da
    `PRAWDA`, a który `FAŁSZ`? Zapisz odpowiedzi, zanim rozwiniesz.

    ??? success "Przewiduj, potem sprawdź wynik"

        | Przykład | Wynik dla `B5 = 17` |
        | --- | --- |
        | `=B5=17` | `PRAWDA` |
        | `=B5<>17` | `FAŁSZ` |
        | `=B5>13` | `PRAWDA` |
        | `=B5<13` | `FAŁSZ` |
        | `=B5>=17` | `PRAWDA` — równość też się liczy |
        | `=B5<=13` | `FAŁSZ` |

Wpisz w dowolnej pustej komórce `=5>3` i naciśnij ++enter++. Zobaczysz `PRAWDA`.
To pełnoprawna wartość, tak samo jak liczba albo tekst — tyle że są tylko dwie.

!!! warning "Różnica między `>` a `>=` kosztuje jednego ucznia"

    Próg zaliczenia to 13 punktów. Uczeń ma dokładnie 13. Warunek `B5>13` da
    `FAŁSZ` i uczeń nie zaliczy, choć próg osiągnął. Poprawny jest `B5>=13`.

    Zawsze sprawdzaj formułę na wartości **równej progowi** — to tam mieszka błąd.

## 2. JEŻELI — trzy argumenty i tyle

```text
=JEŻELI(warunek; co_gdy_prawda; co_gdy_fałsz)
```

Trzy argumenty oddzielone średnikami:

1. **warunek** — porównanie z tabelki wyżej,
2. **co zrobić, gdy warunek jest prawdziwy**,
3. **co zrobić, gdy jest fałszywy**.

```text
=JEŻELI(B8>=13;"zaliczone";"niezaliczone")
```

Tekst w argumentach **musi stać w cudzysłowach**. Liczb się nie cudzysłowuje.

!!! example "Przewiduj"

    W kolumnie `C` przy 18 uczniach stoi formuła `=JEŻELI(B8>=13;"1";"0")`,
    skopiowana w dół. Zaliczyło 12 osób. Co pokaże `=SUMA(C8:C25)`?

    ??? success "Przewiduj, potem sprawdź wynik"

        **0.** Cudzysłowy zrobiły z jedynek i zer **tekst** — wygląda jak
        liczba, ale stoi przy lewej krawędzi komórki, a `SUMA` tekstu nie
        dodaje. Formuła `=JEŻELI(B8>=13;1;0)` zwróci liczby i suma wyjdzie 12.

W argumentach mogą stać nie tylko stałe, ale i całe obliczenia:

```text
=JEŻELI(B8>=$C$4;"-";$C$4-B8)     ile punktów brakuje do progu
```

!!! example "Przewiduj"

    Próg w `C4` to 13. Co pokaże ta formuła dla ucznia z **10** punktami,
    a co dla ucznia z **13**?

    ??? success "Przewiduj, potem sprawdź wynik"

        Dla 10 punktów: **3** — warunek jest fałszywy, więc liczy się
        `13 − 10`. Dla 13 punktów: **-** (myślnik) — warunek `13>=13` jest
        prawdziwy.

Przy odwołaniu do progu znowu przydaje się **adres bezwzględny** — `$C$4`
z poprzedniej lekcji. Bez dolarów formuła skopiowana w dół zacznie porównywać
punkty z przypadkowymi komórkami.

## 3. JEŻELI w JEŻELI — więcej niż dwa wyniki

`JEŻELI` rozdziela wynik na dwa przypadki. Ocen jest sześć, więc jedna funkcja
nie wystarczy. Rozwiązanie: w miejsce argumentu „co, gdy fałsz" wstawiamy
**kolejne `JEŻELI`**.

Zacznij od dwóch progów i sprawdź, czy działa:

```text
=JEŻELI(C15>=50%;3;2)
```

Dopiero potem dokładaj kolejne, zawsze **od najwyższego progu**:

```text
=JEŻELI(C15>=95%;6;
 JEŻELI(C15>=85%;5;
 JEŻELI(C15>=70%;4;
 JEŻELI(C15>=50%;3;
 JEŻELI(C15>=30%;2;1)))))
```

Czyta się to z góry na dół jak listę pytań: *czy co najmniej 95%? jeżeli nie, to
czy co najmniej 85%?* — i tak dalej. Pierwszy warunek, który okaże się
prawdziwy, kończy sprawę; dalsze nie są już sprawdzane.

!!! example "Przewiduj"

    Jaką ocenę wystawi ta formuła uczniowi z wynikiem **68%**? A uczniowi
    z wynikiem dokładnie **70%**?

    ??? success "Przewiduj, potem sprawdź wynik"

        68% → **3**: warunki 95%, 85% i 70% są fałszywe, pierwszy prawdziwy
        to `C15>=50%`. 70% → **4**: `C15>=70%` jest już prawdziwy, bo równość
        się liczy.

!!! danger "Kolejność decyduje o wszystkim"

    Odwróć kolejność i zacznij od `JEŻELI(C15>=30%;2; …)`. Wynik: **każdy**,
    kto ma choć 30%, dostanie dwóję, bo pierwszy warunek jest dla niego
    prawdziwy i sprawdzanie się kończy. Formuła nie zgłosi błędu — po prostu
    policzy nie to, o co ci chodziło.

    Dlatego zagnieżdżone `JEŻELI` sprawdza się zawsze na trzech przypadkach:
    najlepszym, najgorszym i takim dokładnie na progu.

Przy sześciu progach formuła robi się długa i trudna do poprawienia. W praktyce
zastępuje się ją wtedy funkcją wyszukującą po tabeli progów — ale to temat na
później; teraz chodzi o to, żebyś rozumiał sam mechanizm zagnieżdżania.

## 4. ORAZ, LUB, NIE — kiedy warunków jest kilka

Czasem o jednej rzeczy decydują dwie liczby naraz. Uczeń jest klasyfikowany,
gdy ma dość wysoką frekwencję **i** dość dużo ocen. Jest zagrożony, gdy ma
niską średnią **albo** niską frekwencję — wystarczy jedno.

| Funkcja | Zwraca `PRAWDA`, gdy | Po polsku |
| --- | --- | --- |
| `ORAZ(w1; w2)` | **oba** warunki są prawdziwe | „i” |
| `LUB(w1; w2)` | **co najmniej jeden** jest prawdziwy | „albo” |
| `NIE(w)` | warunek jest fałszywy | „nieprawda, że” |

Same w sobie zwracają `PRAWDA` lub `FAŁSZ`, więc wkłada się je **w miejsce
warunku** w `JEŻELI`:

```text
=JEŻELI(ORAZ(B10>=$E$4;C10>=$E$5);"klasyfikowany";"nieklasyfikowany")
=JEŻELI(LUB(D10<$E$6;B10<$E$7);"zagrożenie";"-")
```

!!! example "Przewiduj"

    Progi: frekwencja co najmniej 50% i co najmniej 3 oceny, a zagrożenie
    przy średniej poniżej 2 albo frekwencji poniżej 60%. Uczeń ma frekwencję
    **70%**, **2 oceny** i średnią **4,0**. Co pokażą obie formuły?

    ??? success "Przewiduj, potem sprawdź wynik"

        **nieklasyfikowany** — `ORAZ` wymaga obu warunków, a dwie oceny to
        mniej niż trzy. Zagrożenie: **-** — `LUB` szuka choć jednego
        prawdziwego warunku, a tu średnia 4,0 nie jest poniżej 2, a frekwencja
        70% nie jest poniżej 60%.

!!! tip "Jak rozpoznać, której użyć"

    Przeczytaj warunek na głos i posłuchaj spójnika. „Frekwencja co najmniej 50
    procent **i** co najmniej trzy oceny” to `ORAZ`. „Średnia poniżej dwóch
    **albo** frekwencja poniżej sześćdziesięciu” to `LUB`.

    Pomyłka jest cicha: `LUB` tam, gdzie miało być `ORAZ`, przepuści wszystkich,
    którzy spełniają choć jeden warunek. Zobaczysz to dopiero, licząc wyniki.

## 5. LICZ.JEŻELI i SUMA.JEŻELI — warunek dla całej kolumny

Poprzednie funkcje oceniały **jeden wiersz**. Te dwie przeglądają cały zakres
i zajmują się tylko tym, co pasuje do warunku.

```text
=LICZ.JEŻELI(zakres; kryterium)
=SUMA.JEŻELI(zakres; kryterium; zakres_sumowania)
```

| Zapis | Co liczy |
| --- | --- |
| `=LICZ.JEŻELI(C7:C24;3)` | ile osób ma ocenę 3 |
| `=LICZ.JEŻELI(B7:B24;">=13")` | ile osób ma co najmniej 13 punktów |
| `=SUMA.JEŻELI(B7:B24;">=13")` | ile punktów zdobyli razem ci, którzy zaliczyli |
| `=SUMA.JEŻELI(C7:C24;1;B7:B24)` | ile punktów zdobyli razem ci z oceną 1 |

W `SUMA.JEŻELI` trzeci argument jest potrzebny tylko wtedy, gdy **warunek
sprawdzasz w jednej kolumnie, a dodajesz liczby z innej**. Jeżeli obie są tą
samą kolumną, wystarczą dwa argumenty.

!!! example "Przewiduj"

    W komórkach `B7:B11` są punkty: 12, 13, 20, 8, 15. Co zwróci
    `=LICZ.JEŻELI(B7:B11;">=13")`, a co `=SUMA.JEŻELI(B7:B11;">=13")`?

    ??? success "Przewiduj, potem sprawdź wynik"

        **3** i **48**. Warunek spełniają 13, 20 i 15 — `LICZ.JEŻELI` liczy
        te komórki, `SUMA.JEŻELI` dodaje ich wartości: 13 + 20 + 15 = 48.

!!! warning "Kryterium z komórki — jedyna trudna rzecz w tym temacie"

    `">=13"` to tekst, więc próg jest w nim zapisany na sztywno. Zmienisz go
    w komórce `C4` i nic się nie przeliczy.

    Żeby kryterium brało wartość z komórki, trzeba **skleić** znak porównania
    z adresem. Służy do tego znak `&`:

    ```text
    =LICZ.JEŻELI(B7:B24;">="&$C$4)
    ```

    Znak porównania zostaje w cudzysłowie, adres wychodzi poza cudzysłów, a `&`
    skleja jedno z drugim w napis `">=13"`. Gdy w `C4` zmienisz próg na 15,
    formuła przeliczy się sama.

Średniej warunkowej nie musisz znać osobno — składasz ją z tych dwóch:

```text
=SUMA.JEŻELI(B7:B24;">="&$C$4) / LICZ.JEŻELI(B7:B24;">="&$C$4)
```

## 6. Sprawdź, zanim uwierzysz

Formuła warunkowa prawie nigdy nie zgłasza błędu — ona po prostu liczy coś
innego, niż miała. Dlatego każdą sprawdzasz tak samo:

1. **Przypadek graniczny.** Wartość dokładnie równa progowi. Tu wychodzi
   pomylenie `>` z `>=`.
2. **Oba skrajne.** Najlepszy i najgorszy wiersz w tabeli. Jeśli obu zostaje
   przypisany ten sam wynik, kolejność warunków jest zła.
3. **Kontrola sumą.** Jeśli policzyłeś, ile osób ma każdą ocenę, dodaj te
   liczby. Musi wyjść tyle, ilu jest uczniów. Nie wychodzi — któreś kryterium
   jest źle zapisane.
4. **Zmiana danych wejściowych.** Podnieś próg w komórce i patrz, czy wyniki
   się przeliczyły. Jeśli nie drgnęły, próg jest wpisany w formułę na sztywno
   zamiast pobierany z komórki.

!!! warning "Najczęstsze błędy w formułach warunkowych"

    | Objaw | Przyczyna | Co zrobić |
    | --- | --- | --- |
    | Uczeń z wynikiem równym progowi nie zalicza | `>` zamiast `>=` | sprawdź formułę na wartości progowej |
    | Prawie wszyscy dostają tę samą ocenę | zagnieżdżone `JEŻELI` zaczyna się od najniższego progu | ustaw progi od najwyższego |
    | Po skopiowaniu w dół wyniki są przypadkowe | próg bez znaków `$` przesunął się razem z formułą | `$C$4` — klawisz ++f4++ |
    | Po zmianie progu nic się nie przelicza | próg wpisany w formułę na sztywno, np. `">=13"` | `">="&$C$4` albo `B8>=$C$4` |
    | `SUMA` wyników daje 0 | liczby w cudzysłowach, czyli tekst | `1` zamiast `"1"` |
    | Klasyfikowani są prawie wszyscy | `LUB` tam, gdzie miało być `ORAZ` | przeczytaj spójnik w treści warunku |
    | `#NAZWA?` | literówka w nazwie funkcji albo tekst bez cudzysłowu | popraw nazwę, tekst weź w `"…"` |

## Ćwiczenia

Pobierz skoroszyt — dane są już wpisane, ty dodajesz formuły. Żółte komórki są
do wypełnienia, niebieskie liczby to dane wejściowe, które wolno zmieniać.

[:material-file-excel: Skoroszyt do ćwiczeń (.xlsx)](../pliki/arkusz-warunki-1a.xlsx){ .md-button .md-button--primary download="arkusz-warunki-1a.xlsx" }

!!! note "Ćwiczenie 1. Zaliczony czy nie — zakładka *Zaliczenie*"

    Komórka `C8` jest wypełniona jako wzór. Skopiuj ją w dół, a potem wypełnij
    kolumnę **Ile brakuje do progu** — dla tych, którzy zaliczyli, ma się
    pojawić myślnik, a nie liczba ujemna.

    Na koniec zmień próg w `C4` z 13 na 15. Liczba zaliczeń ma spaść z **12**
    na **10**. Jeżeli nic się nie zmieniło, w formule stoi liczba zamiast
    odwołania do `C4`.

    ??? tip "Podpowiedź 1"

        Kolumna **Ile brakuje do progu** to też jedno `JEŻELI` z tym samym
        warunkiem co w `C8`. Zmieniają się tylko dwa wyniki: co pokazać, gdy
        uczeń zaliczył, a co, gdy nie.

    ??? tip "Podpowiedź 2"

        Myślnik to tekst, więc stoi w cudzysłowie: `"-"`. Brakujące punkty to
        próg minus punkty ucznia — próg z `$C$4`, ze znakami `$`.

    ??? tip "Podpowiedź 3"

        W `D8`: `=JEŻELI(B8>=$C$4;"-";$C$4-B8)`, potem skopiuj w dół do
        wiersza 25.

!!! note "Ćwiczenie 2. Od punktów do oceny — zakładka *Oceny*"

    Policz kolumnę **Wynik (%)**, a potem wystaw ocenę **jedną formułą**
    z zagnieżdżonymi `JEŻELI`, według tabeli progów z lewej strony.

    Buduj ją stopniowo: najpierw dwa progi, sprawdź wyniki, dopiero potem
    dokładaj kolejne. Gotowa formuła ma dać taki rozkład ocen: jedna jedynka,
    pięć dwójek, pięć trójek, trzy czwórki, dwie piątki i dwie szóstki.

    ??? tip "Podpowiedź 1"

        **Wynik (%)** to punkty podzielone przez maksimum z `C4` — maksimum jest
        jedno dla wszystkich, więc adres bezwzględny. Komórce nadaj format
        procentowy.

    ??? tip "Podpowiedź 2"

        `=B15/$C$4`. Ocenę zacznij od `=JEŻELI(C15>=50%;3;2)` i sprawdź. Każdy
        wyższy próg dokładasz **z przodu**, a dotychczasowa formuła staje się
        argumentem „co, gdy fałsz”:
        `=JEŻELI(C15>=70%;4;JEŻELI(C15>=50%;3;2))`. Najniższy próg (30%) dopisujesz
        na końcu, w miejsce ostatniej dwójki.

    ??? tip "Podpowiedź 3"

        Cała formuła wygląda jak ta z sekcji 3 i kończy się pięcioma nawiasami
        `)))))` — tyle, ile funkcji `JEŻELI`. Sprawdź ją na trzech uczniach:
        z wynikiem 88% (ma wyjść 5), 100% (6) i 24% (1).

!!! note "Ćwiczenie 3. Dwa warunki naraz — zakładka *Klasyfikacja*"

    Wypełnij kolumnę **Klasyfikowany?** (`ORAZ`) i **Zagrożenie?** (`LUB`).
    Wszystkie cztery progi bierz z komórek `E4:E7` adresami bezwzględnymi.

    Powinno wyjść **15 klasyfikowanych** i **6 zagrożonych**. Zwróć uwagę, że
    trzech uczniów jest jednocześnie klasyfikowanych i zagrożonych — to nie
    pomyłka, tylko dwa różne pytania o tego samego ucznia.

    ??? tip "Podpowiedź 1"

        W obu kolumnach jest `JEŻELI`, a w miejscu warunku stoi `ORAZ` albo `LUB`
        z dwoma porównaniami. Przeczytaj legendę w zakładce: „nie mniejsza niż”
        to `>=`, „poniżej” to `<`.

    ??? tip "Podpowiedź 2"

        Klasyfikowany: `ORAZ(B10>=$E$4;C10>=$E$5)`. Zagrożenie:
        `LUB(D10<$E$6;B10<$E$7)`. Każdy próg ma znaki `$`, bo formułę kopiujesz
        w dół.

    ??? tip "Podpowiedź 3"

        `=JEŻELI(ORAZ(B10>=$E$4;C10>=$E$5);"klasyfikowany";"nieklasyfikowany")`
        i `=JEŻELI(LUB(D10<$E$6;B10<$E$7);"zagrożenie";"-")` — to te same formuły
        co w sekcji 4, skopiowane w dół do wiersza 27.

!!! note "Ćwiczenie 4. Policz, ilu i za ile — zakładka *Statystyka*"

    Wypełnij zestawienie po prawej stronie: `LICZ.JEŻELI` do zliczania,
    `SUMA.JEŻELI` do sumowania punktów, iloraz jednego przez drugie do średniej
    warunkowej.

    Próg w `C4` wciągnij do kryterium sklejeniem `">="&$C$4`. Ostatni wiersz to
    kontrola — suma liczby ocen od 1 do 6 musi wyjść **18**. Jeśli wychodzi
    mniej, któreś kryterium nie łapie wszystkich.

    ??? tip "Podpowiedź 1"

        Każdy wiersz zestawienia to jedna funkcja. Pytanie „ile” — `LICZ.JEŻELI`,
        pytanie „za ile” — `SUMA.JEŻELI`. Punkty są w `B7:B24`, oceny w `C7:C24`.

    ??? tip "Podpowiedź 2"

        Zaliczyli: kryterium `">="&$C$4`. Nie zaliczyli: `"<"&$C$4`. Ocena 1:
        zakres `C7:C24` i kryterium po prostu `1` — bez cudzysłowu i bez `&`.

    ??? tip "Podpowiedź 3"

        `=LICZ.JEŻELI(B7:B24;">="&$C$4)` i `=SUMA.JEŻELI(B7:B24;">="&$C$4)`.
        Średnią policz, dzieląc komórkę z sumą przez komórkę z liczbą osób.
        Kontrola to zwykła `SUMA` sześciu komórek z liczbami ocen.

## Sprawdź się

<div class="quiz" markdown="0">
<script type="application/json">
[
  {
    "pytanie": "Ile argumentów ma funkcja JEŻELI i co oznacza drugi z nich?",
    "typ": "jedna",
    "opcje": [
      "Dwa: warunek i wynik",
      "Trzy: warunek, wynik gdy prawda, wynik gdy fałsz",
      "Trzy: zakres, kryterium i zakres sumowania",
      "Tyle, ile progów chcemy rozróżnić"
    ],
    "poprawna": 1,
    "wyjasnienie": "JEŻELI(warunek; co_gdy_prawda; co_gdy_fałsz). Drugi argument to wynik zwracany wtedy, gdy warunek okaże się prawdziwy."
  },
  {
    "pytanie": "Próg zaliczenia to 13 punktów. Uczeń ma dokładnie 13. Której formuły użyjesz, żeby zaliczył?",
    "typ": "jedna",
    "opcje": [
      "=JEŻELI(B8>13;\"zaliczone\";\"niezaliczone\")",
      "=JEŻELI(B8<13;\"zaliczone\";\"niezaliczone\")",
      "=JEŻELI(B8>=13;\"zaliczone\";\"niezaliczone\")",
      "=JEŻELI(B8=13;\"zaliczone\";\"niezaliczone\")"
    ],
    "poprawna": 2,
    "wyjasnienie": "Przy zapisie > uczeń z wynikiem równym progowi nie zalicza. Osiągnięcie progu to >=. To najczęstszy błąd w tym temacie."
  },
  {
    "pytanie": "W formule =JEŻELI(B8>=13;1;0) zamieniasz jedynkę i zero na \"1\" i \"0\". Co się zmieni?",
    "typ": "jedna",
    "opcje": [
      "Wynik stanie się tekstem, więc SUMA przestanie go dodawać",
      "Nic — cudzysłowy są opcjonalne",
      "Formuła zwróci błąd #ARG!",
      "Wynik zostanie zaokrąglony do liczby całkowitej"
    ],
    "poprawna": 0,
    "wyjasnienie": "Cudzysłowy robią z wartości tekst. Wygląda jak liczba, wyrówna się do lewej i nie wejdzie do żadnego obliczenia."
  },
  {
    "pytanie": "Progi ocen: 95% → 6, 85% → 5, 70% → 4, 50% → 3, 30% → 2, reszta → 1. Uczeń ma 88%. Co zwróci formuła, która zaczyna się od =JEŻELI(C15>=30%;2; … ?",
    "typ": "jedna",
    "opcje": [
      "5",
      "4",
      "Błąd, bo warunki się wykluczają",
      "2"
    ],
    "poprawna": 3,
    "wyjasnienie": "Pierwszy prawdziwy warunek kończy sprawdzanie. 88% jest większe od 30%, więc formuła zwraca 2 i do dalszych progów nigdy nie dochodzi. Zagnieżdżone JEŻELI buduje się od najwyższego progu."
  },
  {
    "pytanie": "Uczeń jest klasyfikowany, gdy ma frekwencję co najmniej 50% i co najmniej trzy oceny. Którą funkcję wstawisz w miejsce warunku?",
    "typ": "jedna",
    "opcje": [
      "LUB",
      "ORAZ",
      "NIE",
      "LICZ.JEŻELI"
    ],
    "poprawna": 1,
    "wyjasnienie": "Oba warunki muszą być spełnione jednocześnie — to spójnik „i”, czyli ORAZ. Przy LUB wystarczyłoby spełnić jeden z nich."
  },
  {
    "pytanie": "Co policzy formuła =SUMA.JEŻELI(C7:C24;1;B7:B24) ?",
    "typ": "jedna",
    "opcje": [
      "Ile osób ma ocenę 1",
      "Sumę ocen równych 1",
      "Sumę punktów z kolumny B tych osób, które w kolumnie C mają 1",
      "Średnią punktów osób z oceną 1"
    ],
    "poprawna": 2,
    "wyjasnienie": "Warunek sprawdzany jest w pierwszym zakresie, a dodawane są liczby z trzeciego. Do samego zliczania osób służy LICZ.JEŻELI."
  },
  {
    "pytanie": "Próg jest w komórce C4. Chcesz, żeby zliczanie przeliczało się po jego zmianie. Który zapis kryterium jest poprawny?",
    "typ": "jedna",
    "opcje": [
      "=LICZ.JEŻELI(B7:B24;\">=C4\")",
      "=LICZ.JEŻELI(B7:B24;\"$C$4\")",
      "=LICZ.JEŻELI(B7:B24;>=$C$4)",
      "=LICZ.JEŻELI(B7:B24;\">=\"&$C$4)"
    ],
    "poprawna": 3,
    "wyjasnienie": "Znak porównania zostaje w cudzysłowie, adres wychodzi poza niego, a & skleja oba w napis. Zapis \">=C4\" traktuje C4 jak zwykłe litery, nie jak adres."
  },
  {
    "pytanie": "Policzyłeś funkcją LICZ.JEŻELI, ile osób ma każdą z sześciu ocen. Suma tych liczb daje 16, a w klasie jest 18 uczniów. Co to znaczy?",
    "typ": "jedna",
    "opcje": [
      "Któreś kryterium jest źle zapisane i dwóch uczniów nie trafiło do żadnej grupy",
      "Dwie osoby nie mają wystawionej oceny — to normalne",
      "LICZ.JEŻELI zawsze pomija pierwszy i ostatni wiersz zakresu",
      "Trzeba użyć SUMA.JEŻELI zamiast LICZ.JEŻELI"
    ],
    "poprawna": 0,
    "wyjasnienie": "Każdy uczeń ma dokładnie jedną ocenę, więc sześć zliczeń musi się zsumować do liczby uczniów. Różnica oznacza błąd w kryterium albo źle dobrany zakres."
  }
]
</script>
</div>

## Karta pracy

Wypełnij kartę na tej stronie, a potem pobierz gotowy dokument Worda i oddaj
go przez **Zadania domowe w dzienniku VULCAN**. Do zrzutów ekranu wystarczy
klawisz ++print-screen++ albo ++win+shift+s++.

<div class="kp-podsumowanie" data-karta="instrukcje-warunkowe"></div>

<span id="karta" class="kp-kotwica"></span>

???+ karta "Rozwiń kartę pracy"

    <div class="karta-pracy" data-karta="instrukcje-warunkowe"></div>

---

*Nazwy funkcji podane są w wersji polskiej. W angielskim interfejsie to
kolejno `IF`, `AND`, `OR`, `NOT`, `COUNTIF` i `SUMIF` — plik zapisany w jednej
wersji otworzy się w drugiej, nazwy przetłumaczą się same. Dane w skoroszycie
do ćwiczeń są przykładowe, przygotowane na potrzeby lekcji; wyniki podane
w ćwiczeniach policzono na tych danych. Stan sprawdzony 30 września 2026 r.*
