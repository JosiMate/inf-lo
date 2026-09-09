# Bezpieczna praca z komputerem

!!! abstract "O tym temacie"

    **1 godzina lekcyjna** · Dział I. Organizacja pracy i bezpieczeństwo
    · podstawa programowa **IV.4, V.3, V.4**

    Temat, który wygląda na formalność, a dotyczy rzeczy, które naprawdę
    się zdarzają: przejęte konto, wyciek danych, utracona praca. Po tej
    lekcji masz umieć zabezpieczyć własne konto tak, żeby przejęcie go
    było trudne, a nie tylko „mało prawdopodobne”.

!!! success "Cele lekcji"

    Po tej lekcji potrafisz:

    1. stosować zasady bhp obowiązujące na stanowisku komputerowym i uzasadnić, przed czym każda z nich chroni
    2. rozpoznać dane osobowe i wskazać, które z nich RODO chroni mocniej niż pozostałe
    3. ułożyć hasło zgodne z aktualnymi zaleceniami i wyjaśnić, dlaczego jego długość znaczy więcej niż znaki specjalne
    4. włączyć uwierzytelnianie dwuskładnikowe i porównać bezpieczeństwo jego metod
    5. zaplanować kopię zapasową własnych danych według zasady 3-2-1

## 1. Stanowisko pracy — zanim dotkniesz klawiatury

Zasady bhp w pracowni to nie rytuał. Trzy z nich mają konkretne uzasadnienie:

- **nie jesz i nie pijesz przy komputerze** — rozlany napój niszczy klawiaturę,
  a przy zasilaczu może być groźny dla ciebie;
- **nie naprawiasz sprzętu sam** — uszkodzony przewód zgłaszasz nauczycielowi;
  otwieranie obudowy pod napięciem to realne ryzyko porażenia;
- **monitor na wysokości oczu, co najmniej 50 cm od twarzy, przerwa co jakiś czas** —
  to profilaktyka wad wzroku i kręgosłupa, a nie uprzejmość wobec ucznia.

Pełny wykaz zasad znajdziesz na stronie
[wymagania edukacyjne i bhp](wymagania-i-bhp.md).

## 2. Dane osobowe i RODO

**Dane osobowe** to każda informacja, która pozwala zidentyfikować konkretnego
człowieka — bezpośrednio albo w zestawieniu z innymi danymi. Imię i nazwisko,
PESEL, adres, numer telefonu, adres e-mail, zdjęcie twarzy, adres IP w powiązaniu
z kontem.

RODO wyróżnia **szczególne kategorie danych**, chronione mocniej niż pozostałe:
pochodzenie rasowe lub etniczne, poglądy polityczne, przekonania religijne,
przynależność do związków zawodowych, dane genetyczne i biometryczne, dane
o zdrowiu, o orientacji seksualnej.

!!! example "Co to znaczy w praktyce"

    Publikujesz w klasowej grupie zdjęcie z wycieczki, na którym widać twarze
    kolegów. To przetwarzanie ich danych osobowych. Zgoda jednej osoby nie
    obejmuje pozostałych, a „przecież wszyscy tak robią” nie jest podstawą
    prawną.

Twoje prawa wobec administratora danych: dostęp do danych, sprostowanie,
usunięcie („prawo do bycia zapomnianym”), ograniczenie przetwarzania,
przeniesienie danych i sprzeciw. Skargę składa się do Prezesa Urzędu Ochrony
Danych Osobowych.

## 3. Hasła — co się zmieniło

Reguły, których uczono przez dwadzieścia lat („osiem znaków, wielka litera,
cyfra, znak specjalny, zmieniaj co trzy miesiące”), zostały **wycofane**.
Amerykański instytut NIST, którego zalecenia są punktem odniesienia dla
większości branży, w finalnej wersji dokumentu SP 800-63B z sierpnia 2025 r.
mówi coś przeciwnego:

| Dawna reguła | Co obowiązuje dziś | Dlaczego |
| --- | --- | --- |
| 8 znaków wystarczy | **co najmniej 15 znaków**, gdy hasło jest jedynym zabezpieczeniem | krótkie hasła łamie się dziś w minuty |
| wymuszona wielka litera, cyfra, symbol | **żadnych wymuszonych reguł składu** | prowadziły do `Haslo123!` — przewidywalnego dla łamiących |
| zmiana co 30–90 dni | **zmiana tylko przy podejrzeniu wycieku** | wymuszona rotacja daje `Haslo124!`, czyli gorsze hasła |
| — | **obowiązkowe sprawdzanie wobec list wycieków** | hasło z wycieku jest złamane, choćby było długie |
| — | limit długości **co najmniej 64 znaki** | żeby dało się użyć frazy hasłowej |

Wniosek dla ciebie: **długość bije złożoność**. Cztery przypadkowe, niepowiązane
słowa (fraza hasłowa) są łatwiejsze do zapamiętania i trudniejsze do złamania
niż ośmioznakowy potworek z symbolami.

!!! danger "Nigdy nie wpisuj swojego prawdziwego hasła w „sprawdzarkę siły hasła”"

    Strony, które oceniają siłę hasła, wysyłają je na swój serwer albo — nawet
    jeśli liczą wszystko lokalnie — nie masz jak tego sprawdzić. Chcesz
    przetestować mechanizm? Wpisz hasło **podobnej budowy**, ale nie swoje.
    Ta sama zasada dotyczy wszelkich „generatorów”, „testerów” i „analizatorów”
    kont.

**Menedżer haseł** rozwiązuje problem, którego nie da się rozwiązać pamięcią:
inne, długie, losowe hasło do każdego serwisu. Zapamiętujesz jedno hasło główne
— do menedżera — i ono ma być frazą hasłową.

## 4. Uwierzytelnianie dwuskładnikowe

Hasło to **coś, co wiesz**. Drugi składnik to **coś, co masz** (telefon, klucz
sprzętowy) albo **coś, czym jesteś** (odcisk palca, twarz). Przejęcie samego
hasła przestaje wtedy wystarczać.

=== "Metody od najsłabszej"

    1. **Kod SMS** — lepszy niż nic, ale podatny na przejęcie numeru
       (tzw. *SIM swap*) i na wyłudzenie kodu przez telefon.
    2. **Aplikacja z kodami czasowymi** (TOTP) — kod generuje się na twoim
       urządzeniu, nie wędruje przez sieć operatora.
    3. **Klucz sprzętowy albo passkey** — najmocniejsze, bo są związane
       z adresem strony: nie zadziałają na podrobionej witrynie.

=== "Co to zmienia przy phishingu"

    Fałszywa strona logowania przejmie twoje hasło **i** kod SMS, jeśli
    wpiszesz oba. Klucz sprzętowy i passkey są odporne, bo sprawdzają, czy
    adres strony jest ten sam, dla którego zostały utworzone. Podrobiony
    adres — brak podpisu — brak logowania.

Do konta szkolnego, poczty i mediów społecznościowych włącz drugi składnik
**dziś**, a nie „kiedyś”. Odzyskanie przejętego konta trwa tygodniami, a czasem
nie udaje się wcale.

## 5. Kopie zapasowe i higiena systemu

- **Zasada 3-2-1**: trzy kopie danych, na dwóch różnych nośnikach, jedna poza
  domem (np. w chmurze). Dysk w laptopie i kopia na tym samym dysku to jedna kopia.
- **Aktualizacje** systemu i przeglądarki instaluj od razu — łatają dziury,
  o których atakujący już wiedzą.
- **Oprogramowanie** pobieraj wyłącznie ze strony producenta albo z oficjalnego
  sklepu. „Darmowa pełna wersja” z przypadkowego serwisu to najczęstsza droga
  wejścia złośliwego oprogramowania.
- **Uprawnienia aplikacji** przeglądaj raz na jakiś czas. Latarka nie potrzebuje
  dostępu do kontaktów.
- **Szyfrowanie dysku** (BitLocker, FileVault, LUKS) sprawia, że zgubiony laptop
  to strata sprzętu, a nie strata danych.

## Ćwiczenia

!!! note "Ćwiczenie 1. Fraza hasłowa"

    Ułóż frazę hasłową z czterech niepowiązanych ze sobą słów — takich, których
    nie da się powiązać z tobą (nie imię psa, nie ulubiony zespół). Policz jej
    długość w znakach. Następnie zapisz **regułę**, według której ją zbudowałeś,
    tak żeby dało się nią ułożyć kolejne frazy.

    Frazy, której naprawdę użyjesz, **nie zapisuj w karcie pracy**.

!!! note "Ćwiczenie 2. Wyciek danych"

    Sprawdź w serwisie `haveibeenpwned.com`, czy twój adres e-mail pojawił się
    w znanych wyciekach. Serwis pyta o **adres e-mail**, nie o hasło. Zapisz
    liczbę wycieków i nazwy dwóch serwisów, z których pochodziły dane. Jeżeli
    twój adres wystąpił — zmień hasła w tych serwisach.

!!! note "Ćwiczenie 3. Przegląd zabezpieczeń konta"

    Wejdź w ustawienia bezpieczeństwa swojego konta pocztowego. Sprawdź trzy
    rzeczy: czy włączone jest logowanie dwuskładnikowe i jaką metodą; jakie
    urządzenia są zalogowane; jakie aplikacje mają dostęp do konta. Wyloguj
    urządzenia, których nie rozpoznajesz, i odbierz dostęp aplikacjom,
    z których nie korzystasz.

## Sprawdź się

<div class="quiz" markdown="0">
<script type="application/json">
[
  {
    "pytanie": "Które hasło jest najtrudniejsze do złamania?",
    "typ": "jedna",
    "opcje": [
      "P@ssw0rd!",
      "Kw3!zX",
      "granit-mandarynka-parasol-wiolonczela",
      "Informatyka2026!"
    ],
    "poprawna": 2,
    "wyjasnienie": "Decyduje długość i nieprzewidywalność. Fraza z czterech niepowiązanych słów ma 36 znaków i nie występuje w żadnym słowniku haseł; pozostałe trzy to typowe wzorce, których łamiące programy szukają w pierwszej kolejności."
  },
  {
    "pytanie": "Co mówią aktualne zalecenia NIST o okresowej zmianie haseł?",
    "typ": "jedna",
    "opcje": [
      "Hasło należy zmieniać co 30 dni",
      "Hasło zmienia się tylko wtedy, gdy istnieje podejrzenie, że wyciekło",
      "Hasło należy zmieniać co pół roku",
      "Hasło trzeba zmieniać po każdym logowaniu z nowego urządzenia"
    ],
    "poprawna": 1,
    "wyjasnienie": "Wymuszona rotacja pogarszała hasła — ludzie zmieniali w nich jedną cyfrę. Zmiana ma być reakcją na zdarzenie, nie elementem kalendarza."
  },
  {
    "pytanie": "Dlaczego nie należy wpisywać swojego prawdziwego hasła w internetową „sprawdzarkę siły hasła”?",
    "typ": "jedna",
    "opcje": [
      "Bo wynik i tak zawsze jest zaniżony",
      "Bo hasło może zostać wysłane na cudzy serwer, a ty nie masz jak tego sprawdzić",
      "Bo takie strony działają tylko dla haseł krótszych niż 12 znaków",
      "Bo przeglądarka zapamięta hasło w historii"
    ],
    "poprawna": 1,
    "wyjasnienie": "Nie da się zweryfikować, czy strona liczy wszystko lokalnie. Testuj hasło o podobnej budowie, nigdy to, którego naprawdę używasz."
  },
  {
    "pytanie": "Które z poniższych to szczególna kategoria danych osobowych w rozumieniu RODO?",
    "typ": "jedna",
    "opcje": [
      "Numer telefonu",
      "Adres zamieszkania",
      "Informacja o stanie zdrowia",
      "Data urodzenia"
    ],
    "poprawna": 2,
    "wyjasnienie": "Dane o zdrowiu należą do szczególnych kategorii, chronionych mocniej. Pozostałe to zwykłe dane osobowe — też chronione, ale na ogólnych zasadach."
  },
  {
    "pytanie": "Która metoda drugiego składnika jest odporna na phishing?",
    "typ": "jedna",
    "opcje": [
      "Kod przysłany SMS-em",
      "Kod z aplikacji generującej kody czasowe",
      "Klucz sprzętowy albo passkey",
      "Pytanie pomocnicze o nazwisko panieńskie matki"
    ],
    "poprawna": 2,
    "wyjasnienie": "Klucz i passkey są związane z adresem strony — na podrobionej witrynie po prostu nie zadziałają. Kod SMS i kod z aplikacji można wyłudzić i przepisać na fałszywej stronie."
  },
  {
    "pytanie": "Zasada 3-2-1 dotyczy kopii zapasowych. Co oznacza „1”?",
    "typ": "jedna",
    "opcje": [
      "Jedna kopia przechowywana poza miejscem, w którym są oryginały",
      "Jedna kopia robiona raz w miesiącu",
      "Jeden nośnik, na którym trzymamy wszystko",
      "Jedno hasło chroniące wszystkie kopie"
    ],
    "poprawna": 0,
    "wyjasnienie": "Trzy kopie, na dwóch różnych nośnikach, jedna poza domem lub szkołą — żeby pożar, zalanie albo kradzież nie zabrały wszystkich naraz."
  },
  {
    "pytanie": "Dlaczego menedżer haseł zwiększa bezpieczeństwo, choć trzyma wszystkie hasła w jednym miejscu?",
    "typ": "jedna",
    "opcje": [
      "Bo szyfruje ruch sieciowy przeglądarki",
      "Bo pozwala mieć inne, długie i losowe hasło w każdym serwisie, czego nie da się zapamiętać",
      "Bo blokuje strony phishingowe",
      "Bo automatycznie zmienia hasła co miesiąc"
    ],
    "poprawna": 1,
    "wyjasnienie": "Największym realnym zagrożeniem jest to samo hasło w wielu serwisach: jeden wyciek otwiera wszystkie konta. Menedżer usuwa tę zależność, a on sam jest chroniony frazą hasłową i drugim składnikiem."
  },
  {
    "pytanie": "Serwis haveibeenpwned.com pozwala sprawdzić, czy twoje dane wyciekły. O co pyta?",
    "typ": "jedna",
    "opcje": [
      "O hasło do konta",
      "O adres e-mail lub numer telefonu",
      "O numer PESEL",
      "O odpowiedź na pytanie pomocnicze"
    ],
    "poprawna": 1,
    "wyjasnienie": "Wyszukiwanie odbywa się po adresie e-mail albo numerze telefonu. Gdyby serwis pytał o hasło, sam byłby zagrożeniem."
  }
]
</script>
</div>

## Karta pracy

Wypełnij kartę na tej stronie, a potem pobierz gotowy dokument Worda i oddaj
go przez **Zadania domowe w dzienniku VULCAN**.

<div class="karta-pracy" data-karta="bezpieczna-praca"></div>

## Na ocenę celującą

Wybierz jedno zadanie i opisz wyniki w karcie pracy.

**A. Ile trwa złamanie hasła.** Znajdź trzy różne źródła podające szacowany czas
łamania haseł metodą siłową. Porównaj ich założenia (jaki sprzęt, jaki algorytm
skrótu) i wyjaśnij, dlaczego wyniki się różnią nawet o rzędy wielkości.

**B. Audyt bezpieczeństwa domowego routera.** Sprawdź: czy hasło administratora
zostało zmienione z fabrycznego, jaki standard szyfrowania sieci jest ustawiony,
czy oprogramowanie routera jest aktualne. Opisz, co znalazłeś, i co poprawiłeś
(w porozumieniu z domownikami).

**C. Rozbiór wiadomości phishingowej.** Znajdź w swojej skrzynce (albo
w publicznej kolekcji przykładów) wiadomość wyłudzającą dane. Wskaż w niej pięć
sygnałów ostrzegawczych: adres nadawcy, adres odnośnika, presja czasu, błędy
językowe, żądanie danych. Zaproponuj, jak wyglądałaby ta sama wiadomość, gdyby
była prawdziwa.

---

*Źródła danych o hasłach: NIST Special Publication 800-63B, rewizja 4 (wersja
finalna, sierpień 2025). Zasady ochrony danych osobowych: RODO — rozporządzenie
Parlamentu Europejskiego i Rady (UE) 2016/679.*
