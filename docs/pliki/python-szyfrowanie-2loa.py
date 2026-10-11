# Szyfrowanie i deszyfrowanie tekstu — szkielet ćwiczeń
# Informatyka, zakres podstawowy, klasa 2LOA — PCEiKZ Szczucin
#
# Jak pracować:
#   1. Skopiuj zawartość tego pliku do edytora na stronie online-python.com
#      albo rób każde ćwiczenie w okienku pod jego treścią na stronie tematu.
#   2. Wykonuj ćwiczenia po kolei. Uruchamiaj program po KAŻDEJ zmianie.
#   3. Wiersze z komentarzem „ma być …” mówią, jaki wynik jest poprawny.
#   4. Na koniec lekcji zapisz plik — strona online-python.com nie pamięta
#      twojej pracy.
#   5. Ćwiczenie 1 czeka na dane z klawiatury (input) — wpisz słowo
#      i naciśnij Enter, a dalsze ćwiczenia wykonają się po nim.
#
# Przypomnienie: ord("A") = 65, chr(65) = "A".
# Przesunięcie litery: numer = ord(znak) - 65, potem (numer + k) % 26,
# na końcu chr(numer + 65).


# =====================================================================
# ĆWICZENIE 1. Kody liter
# =====================================================================
# Program wczytuje słowo instrukcją input() i dla każdej jego litery
# wypisuje w osobnym wierszu literę i jej kod, oddzielone spacją.

slowo = input()

# TODO: pętla po znakach słowa; w każdym obrocie print(znak, kod znaku)


# =====================================================================
# ĆWICZENIE 2. Przesunięcie jednej litery
# =====================================================================
# Napisz funkcję przesun(znak, k), która dla wielkiej litery od A do Z
# zwraca literę przesuniętą o k miejsc w alfabecie, z zawinięciem:
# przesun("A", 3) daje "D", a przesun("Y", 3) — "B". Funkcja ma działać
# także dla ujemnego k.

def przesun(znak, k):
    # TODO: kod → numer 0–25 → przesunięcie z zawinięciem → litera
    return znak


print(przesun("A", 3))   # ma być D
print(przesun("Y", 3))   # ma być B


# =====================================================================
# ĆWICZENIE 3. Szyfrowanie całego tekstu
# =====================================================================
# Napisz funkcję szyfruj(tekst, k), która szyfruje tekst szyfrem Cezara:
# wielkie litery od A do Z przesuwa o k, a wszystkie inne znaki (spacje,
# cyfry, znaki przestankowe) zostawia bez zmian.

# Funkcje z poprzednich ćwiczeń są wyżej w tym pliku.


def szyfruj(tekst, k):
    wynik = ""
    # TODO: pętla po znakach; litery A–Z przesuń, inne znaki dopisz bez zmian
    return wynik


print(szyfruj("ALA MA KOTA", 3))   # ma być DOD PD NRWD
print(szyfruj("XYZ", 3))           # ma być ABC


# =====================================================================
# ĆWICZENIE 4. Deszyfrowanie
# =====================================================================
# Napisz funkcję deszyfruj(szyfrogram, k), która odtwarza tekst jawny.
# Użyj w niej swojej funkcji szyfruj — wklej ją do okienka razem z
# przesun. Odszyfruj wiadomość NRQLHF ZBFLHFCNL zaszyfrowaną kluczem 3 i
# zapisz wynik w karcie pracy.

# Funkcje z poprzednich ćwiczeń są wyżej w tym pliku.


def deszyfruj(szyfrogram, k):
    return szyfrogram    # TODO: jeden wiersz z wywołaniem szyfruj()


print(deszyfruj("DOD PD NRWD", 3))   # ma być ALA MA KOTA


# =====================================================================
# ĆWICZENIE 5. Złam szyfr
# =====================================================================
# Napisz funkcję zlam(szyfrogram, slowo), która znajduje klucz, wiedząc
# tylko, że w tekście jawnym występuje podane słowo. Funkcja sprawdza
# klucze od 1 do 25 i zwraca pierwszy, przy którym odszyfrowany tekst
# zawiera slowo. Gdy żaden klucz nie pasuje, zwraca -1.

# Funkcje z poprzednich ćwiczeń są wyżej w tym pliku.


def zlam(szyfrogram, slowo):
    # TODO: sprawdź klucze od 1 do 25
    return -1


print(zlam("CZYDUKXSO Y CSYNWOT", "SPOTKANIE"))   # ma być 10
print(zlam("ABC", "KOT"))                         # ma być -1


# =====================================================================
# ĆWICZENIE 6. Także małe litery (dla chętnych)
# =====================================================================
# Napisz funkcję szyfruj2(tekst, k), która przesuwa i wielkie, i małe
# litery — każde w swoim alfabecie: szyfruj2("Ala ma kota", 3) daje "Dod
# pd nrwd". Małe litery mają kody od 97 (a) do 122 (z).

def szyfruj2(tekst, k):
    wynik = ""
    # TODO: osobno wielkie litery (od "A"), osobno małe (od "a"), reszta bez zmian
    return wynik


print(szyfruj2("Ala ma kota", 3))   # ma być Dod pd nrwd
