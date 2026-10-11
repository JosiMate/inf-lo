# Przetwarzanie napisów — szkielet ćwiczeń
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
# Przypomnienie: tekst[::-1] to napis od tyłu, a nowy napis budujesz
# od pustego "" i dopisujesz: wynik = wynik + znak.


# =====================================================================
# ĆWICZENIE 1. Słowo na trzy sposoby
# =====================================================================
# Program wczytuje jedno słowo instrukcją input() i wypisuje — każdy
# wynik w osobnym wierszu, w tej kolejności: liczbę jego znaków, słowo
# od tyłu i słowo wielkimi literami.

slowo = input()

print()    # TODO: liczba znaków
print()    # TODO: słowo od tyłu
print()    # TODO: słowo wielkimi literami


# =====================================================================
# ĆWICZENIE 2. Ile cyfr?
# =====================================================================
# Napisz funkcję ile_cyfr(tekst), która zwraca, ile cyfr jest w napisie
# — przechodząc pętlą po jego znakach. Dla "Pokój 214, piętro 2" ma
# wyjść 4.

def ile_cyfr(tekst):
    licznik = 0
    # TODO: pętla po znakach tekstu; cyfrę rozpoznasz metodą isdigit()
    return licznik


print(ile_cyfr("Pokój 214, piętro 2"))    # ma być 4
print(ile_cyfr("brak"))                   # ma być 0


# =====================================================================
# ĆWICZENIE 3. Inicjały
# =====================================================================
# Napisz funkcję inicjaly(osoba), która dla imienia i nazwiska zwraca
# inicjały — wielkie litery, każda z kropką: inicjaly("Jan Kowalski")
# daje "J.K.". Funkcja ma działać także dla małych liter i dla dwóch
# imion: inicjaly("anna maria nowak") daje "A.M.N.".

def inicjaly(osoba):
    wynik = ""
    # TODO: podziel napis na wyrazy i z każdego weź pierwszą literę
    return wynik


print(inicjaly("Jan Kowalski"))       # ma być J.K.
print(inicjaly("anna maria nowak"))   # ma być A.M.N.


# =====================================================================
# ĆWICZENIE 4. Numer karty na paragonie
# =====================================================================
# Na paragonie widać tylko cztery ostatnie cyfry karty, a pozostałe są
# zastąpione gwiazdkami. Napisz funkcję maskuj(numer), która zwraca taki
# napis: maskuj("1234567812345678") daje "5678". Gdy numer ma cztery
# znaki albo mniej, funkcja zwraca go bez zmian.

def maskuj(numer):
    # TODO: gwiazdki w miejsce wszystkich znaków poza czterema ostatnimi
    return numer


print(maskuj("1234567812345678"))   # ma być ************5678
print(maskuj("12345"))              # ma być *2345


# =====================================================================
# ĆWICZENIE 5. Palindrom bez wycinka
# =====================================================================
# Napisz funkcję czy_palindrom(tekst) bez wycinka [::-1]: odwrócony
# tekst zbuduj pętlą, tak jak w sekcji 3. Funkcja ma pomijać spacje i
# wielkość liter i zwracać True albo False.

def czy_palindrom(tekst):
    t = tekst.lower().replace(" ", "")
    odwrotnie = ""
    # TODO: zbuduj odwrotnie pętlą po znakach t
    return False    # TODO: porównaj t z odwrotnie


print(czy_palindrom("Kobyła ma mały bok"))   # ma być True
print(czy_palindrom("Python"))               # ma być False
