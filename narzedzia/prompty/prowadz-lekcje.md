# Zadanie dla Julesa — tryb „Prowadź lekcję” (temat jako slajdy, pilotaż w inf-lo)

Skopiuj wszystko poniżej linii i wklej do Julesa po wybraniu repozytorium
`JosiMate/inf-lo` i gałęzi `main`.

---

Przeczytaj `AGENTS.md` w katalogu głównym repozytorium i postępuj według
niego, szczególnie według sekcji:

- 2 „Zasady pracy”;
- 3 „Język i styl”;
- 6 „Widżety i składnia”;
- 7 „Czego nie ruszać”;
- 8 „Zanim oddasz zmiany”.

To zadanie **wprost pozwala** na:

- dodanie nowego skryptu `docs/assets/js/slajdy.js` i wpisu w `mkdocs.yml`;
- zmiany w `docs/assets/js/tablica.js`, `docs/assets/js/quiz.js` i
  `docs/assets/extra.css`;
- uzupełnienie `AGENTS.md`.

**Nie zmieniaj żadnego pliku `.md` z tematami.** Do testów znacznika
`<!-- slajd -->` (punkt 4) dopisz go lokalnie i **nie commituj**. Poza tym
obowiązuje wszystko, co jest w `AGENTS.md`.

## Cel

Nauczyciel prowadzi lekcję na projektorze prosto ze strony tematu, slajd po
slajdzie, bez osobnej prezentacji. Strona tematu zostaje jedynym źródłem
treści. Tryb ma działać na istniejących tematach bez żadnych zmian w
Markdownie, a znacznik `<!-- slajd -->` jest tylko opcjonalnym dodatkiem.

Budujesz na trybie „Na tablicę” (`tablica.js`). Ten tryb już działa:

- nakładka na pełny ekran z klasą `md-typeset`;
- powiększenie przez `zoom` (`liczZoom()`);
- przenoszenie **oryginałów** elementów do nakładki i odkładanie ich na
  miejsce przez znaczniki `data-tb-miejsce`;
- przywracanie stanu `details` i blokada przewijania strony.

Przeczytaj `tablica.js` przed planowaniem. To pilotaż w inf-lo. Jeśli się
sprawdzi, przeniesiemy go do inf-tt, wiai, asso i inf-sb, więc pisz kod
tak, żeby dało się go skopiować bez zmian.

## 1. Wspólny kod z `tablica.js`

Nie kopiuj logiki przenoszenia i odkładania elementów. Wydziel ją w
`tablica.js` do funkcji udostępnionych przez `window.Tablica`, np.:

- `przenies(el, cel)`: wstawia znacznik miejsca, zapamiętuje stan
  `details`, przenosi element i zwraca uchwyt;
- `odloz(uchwyt)`: przywraca stan `details`, odkłada element na miejsce i
  usuwa znacznik;
- `liczZoom()`.

`Tablica.otworz` ma po refaktoryzacji działać **dokładnie tak jak teraz**.
Sprawdź to testami z punktu 9.

Różnice między trybem slajdów a tablicą:

- **Konsola Pythona** (`.py-konsola`) w slajdach zostaje **widoczna i
  działa**, bo nauczyciel może uruchomić kod na żywo. Na tablicy nadal ją
  ukrywamy. Dodaj do `przenies` opcję, która to rozróżnia.
- Wyniki („Przewiduj…”, „Odpowiedzi”) startują zwinięte, tak jak na
  tablicy.

## 2. Przycisk „Prowadź lekcję”

- Pojawia się **tylko na stronach tematów**, czyli na stronach z ramką
  `abstract` o tytule zaczynającym się od „O tym temacie” albo z ramką
  `success` o tytule „Kryteria sukcesu…”.
- Na spisach tematów, wymaganiach i stronie głównej go nie ma.
- Stoi pod tytułem `h1`, w stylu `.pdp-przycisk` z ikonką ekranu
  (`.tb-ikona-ekran`).
- Nie drukuje się.
- Start przez `document$.subscribe(start)` z ochroną przed podwójnym
  zbudowaniem, jak w pozostałych widżetach.

## 3. Podział na slajdy (automatyczny)

Skrypt przechodzi po **elementach najwyższego poziomu** treści artykułu
(dzieci `.md-content__inner`). Pomija `h1`, odnośniki `a.headerlink`,
stopkę strony i własne elementy widżetów.

Kolejność slajdów:

1. **Tytułowy:** tekst `h1` (jako napis na slajdzie, nie przenoszony
   element) i ramka „O tym temacie”. Zwinięty w niej „Plan lekcji” zostaje
   zwinięty.
2. **Rozgrzewka**: ramka `.rozgrzewka`.
3. **Kryteria sukcesu.**
4. **Sekcje `##`.** Każda sekcja to `h2` z treścią do następnego `h2`.
   W sekcji osobne slajdy dostają:
   - ramka `!!! example "Przewiduj…"`;
   - grupa „przykład z konsolą”: blok kodu, `div.py-konsola` i
     `??? success "Przewiduj…"`. Rozpoznawaj ją tak jak `tablica.js`;
   - `.kroki`;
   - `!!! note "Ćwiczenie…"`.

   Pozostała treść sekcji (akapity, tabele, kod, „Najczęstsze błędy”)
   tworzy slajdy w kolejności, w jakiej stoi na stronie, poprzedzielane
   tymi osobnymi slajdami. Każdy slajd sekcji ma u góry małą etykietę z
   tytułem `h2`, np. „3. JEŻELI w JEŻELI”. Sam element `h2` przenieś tylko
   na pierwszy slajd sekcji. Pustych slajdów nie twórz.
5. **„Sprawdź się” (quiz):** każde pytanie na osobnym slajdzie, w takim
   samym widoku jak quiz na tablicy (kafelki A–D, „Pokaż odpowiedź”).
   - Wydziel w `quiz.js` funkcję rysującą widok jednego pytania do
     podanego kontenera, wspólną dla tablicy i slajdów, np.
     `window.Quiz.widokPytania(host, pytanie, nr, ile)`.
   - Dane czytaj z tego samego JSON-a. Nie zmieniaj formatu.
   - Quiz na stronie (sprawdzanie i punkty) ma działać bez zmian.
6. **„Karta pracy”:** zamiast formularza slajd „Pracujemy na komputerach”
   z dużym adresem bieżącej strony i krótką instrukcją: „Otwórz ten temat
   i przewiń do Karty pracy”. Kod QR będzie osobnym zadaniem, więc go
   **nie** dodawaj.
7. Sekcje po „Karcie pracy”, jeśli są, idą normalnie według punktu 4.
8. **Ostatni slajd:** ponownie „Kryteria sukcesu” z napisem „Kciuki: co
   już umiem?”. Ten sam element może trafić na dwa slajdy, bo widoczny
   jest zawsze tylko jeden. Przy zmianie slajdu elementy wracają na swoje
   miejsce na stronie (`odloz`) i są przenoszone na nowy slajd (`przenies`).

Jeśli jakiejś ramki ze standardu w temacie nie ma, odpowiedni slajd
pomijasz.

## 4. Wymuszony podział: `<!-- slajd -->`

Python-Markdown zostawia komentarz HTML w wygenerowanej stronie jako węzeł
`Comment`. Sprawdziłem to: `<!-- slajd -->` między akapitami trafia do HTML
bez zmian.

- Komentarz `<!-- slajd -->` **na najwyższym poziomie treści** (nie wcięty
  w ramce) zaczyna nowy slajd w tym miejscu. Działa razem z podziałem
  automatycznym, nie zamiast niego.
- Wariant z etykietą: `<!-- slajd: Tytuł slajdu -->` ustawia etykietę tego
  slajdu zamiast tytułu sekcji.
- Wielkość liter i spacje wokół słowa „slajd” nie mają znaczenia. Inne
  komentarze ignoruj.
- Komentarz wewnątrz ramki (wcięty) jest ignorowany. Opisz to w
  `AGENTS.md`.
- Na zwykłej stronie znacznik jest niewidoczny i niczego nie zmienia.

## 5. Nawigacja i odsłanianie po kolei

Klawisze, także z pilota do prezentacji, który wysyła PageDown/PageUp:

| Klawisz | Działanie |
|---|---|
| → , PageDown, spacja | najpierw **odsłoń następny element** na slajdzie; gdy nie ma już nic do odsłonięcia, przejdź do następnego slajdu |
| ← , PageUp | poprzedni slajd (bez cofania odsłonięć) |
| Shift + → | następny slajd bez odsłaniania |
| Home / End | pierwszy / ostatni slajd |
| M | spis slajdów (lista etykiet, klik przenosi; Escape zamyka najpierw spis) |
| Escape | wyjście z trybu |

Spacja i Enter na przycisku mają nacisnąć przycisk, a nie zmienić slajd.
Strzałki w polu tekstowym lub edytorze konsoli mają działać jak zwykle.
Pilnuj, żeby klawisze nie uruchamiały się dwa razy: `tablica.js` też
nasłuchuje Escape'a.

„Odsłanianie po kolei” obejmuje, w kolejności na slajdzie:

1. zwinięte `details` z wynikiem lub odpowiedziami: „Przewiduj…”,
   „Odpowiedzi”;
2. kolejny krok w `.kroki`, czyli kliknięcie jego przycisku „Pokaż krok”;
3. kolejną podpowiedź, **tylko jeśli** blok „Podpowiedzi (N)” jest już
   rozwinięty. Zwiniętych podpowiedzi nie odsłaniamy automatycznie, bo są
   dla uczniów, którzy ich potrzebują;
4. w quizie: „Pokaż odpowiedź”.

## 6. Wygląd

- Pasek na dole slajdu:
  - „Slajd 4 z 12”;
  - cienki pasek postępu w kolorze `--ui-akcent`;
  - przyciski „Poprzedni”, „Spis”, „Następny” i „Zakończ”.

  Zostaw w pasku miejsce na przyszły minutnik.
- Etykieta sekcji u góry slajdu: mała, wersalikami, przygaszona (jak
  „PYTANIE 1 Z 8” w quizie na tablicy).
- **Za długi slajd:**
  1. Zmniejszaj powiększenie (od `liczZoom()` w dół, ale nie poniżej 1),
     aż slajd zmieści się na ekranie.
  2. Jeśli nie zmieści się nawet przy 1, slajd się przewija.
  3. Przelicz to przy zmianie slajdu, rozmiaru okna i odsłonięciu elementu.
- Klasy z przedrostkiem `sl-`. Style w `docs/assets/extra.css`, w nowej
  sekcji „tryb Prowadź lekcję”. **Nie zmieniaj
  `docs/stylesheets/extra.css`.**
- Oba motywy (jasny i `slate`) i czytelny kontrast na projektorze.

## 7. Wyjście

Po Escape, „Zakończ”, wyjściu z pełnego ekranu albo przejściu z menu
(`navigation.instant`):

- wszystkie elementy wracają na swoje miejsca;
- stan `details`, kroków i podpowiedzi jest taki jak przed startem;
- konsola działa;
- strona przewija się do miejsca, w którym w treści stoi pierwszy element
  ostatnio oglądanego slajdu.

## 8. Dokumentacja — `AGENTS.md`

W sekcji 6 dopisz podsekcję **„Tryb »Prowadź lekcję« (`slajdy.js`)”**:

- jak powstają slajdy i że temat zgodny ze standardem nie wymaga żadnych
  dopisków;
- znacznik `<!-- slajd -->` i `<!-- slajd: Tytuł -->`: kiedy go używać
  (długa sekcja, którą lepiej pokazać w dwóch częściach) i że działa tylko
  na najwyższym poziomie, nie w ramce;
- klawisze.

## 9. Sprawdzenie

1. `mkdocs build --strict` bez ostrzeżeń.
2. Testy w Playwright na `klasa-1/instrukcje-warunkowe/`,
   `klasa-2/podstawy-pythona/` i `klasa-2/wyszukiwanie-wzorca/`. Wejście
   **kliknięciem w menu**. Lokalnie ustaw na czas testu `site_url` na adres
   lokalnego serwera i **nie commituj tej zmiany**.
   - Przycisk „Prowadź lekcję” jest na tematach, a na `klasa-1/` (spis)
     go nie ma.
   - Wypisz listę etykiet slajdów każdego tematu i wklej ją do opisu PR.
   - Przejdź cały temat samym klawiszem →. Każdy wynik „Przewiduj” musi
     zostać odsłonięty dopiero po naciśnięciu, nie od razu po wejściu na
     slajd.
   - **Strona po wyjściu jest taka sama jak przed startem.** Zapamiętaj
     listę dzieci `.md-content__inner` (referencje do węzłów) i stan
     `open` wszystkich `details`, a po wyjściu porównaj. Musi się zgadzać.
     Nie zostają żadne znaczniki `[data-tb-miejsce]` ani elementy `sl-`.
   - Konsola Pythona na slajdzie uruchamia kod, a po wyjściu działa na
     stronie.
   - Quiz na stronie po wyjściu nadal sprawdza odpowiedzi i liczy punkty.
   - Lokalnie dopisz `<!-- slajd -->` i `<!-- slajd: Próba -->` w środku
     jednej sekcji: powstają dwa slajdy z właściwymi etykietami. Komentarz
     wcięty w ramce niczego nie dzieli. **Tych zmian nie commituj.**
   - Tryb „Na tablicę” (ramki, quiz, losowanie rozgrzewki) działa po
     refaktoryzacji jak wcześniej.
   - Szerokość 375 px: przycisk nie powoduje poziomego przewijania strony.
   - Wydruk (`emulateMedia({ media: 'print' })`): przycisku nie ma.
3. Zrzuty ekranu w 1920 × 1080, w obu motywach, do opisu PR: slajd
   tytułowy, rozgrzewka, „Przewiduj” przed i po odsłonięciu, krok po
   kroku, pytanie quizu, „Pracujemy na komputerach”, spis slajdów (M).

Znany błąd, którego **nie naprawiaj** w tym zadaniu: na
`wyszukiwanie-wzorca` w konsoli występuje „Failed to execute 'replaceWith'
… Unexpected token ':'”, a strona ma na telefonie 400 px szerokości.
Odnotuj tylko, jeśli zachowanie się zmieni.

## 10. Opis PR

Po polsku:

- co dodałeś i lista zmienionych plików;
- listy slajdów i zrzuty z punktu 9;
- **„Decyzje”**: co wydzieliłeś z `tablica.js` i `quiz.js` i dlaczego, jak
  rozwiązałeś za długie slajdy, przypadki, których podział automatyczny
  nie obsługuje dobrze;
- **„Dla nauczyciela”**: w których tematach warto wstawić
  `<!-- slajd -->` (sekcje, które wyszły za długie) i co skopiować do
  pozostałych serwisów.
