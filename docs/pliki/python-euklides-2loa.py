# Algorytm Euklidesa w praktyce — szkielet ćwiczeń
# Informatyka, zakres podstawowy, klasa 2LOA — PCEiKZ Szczucin
#
# Jak pracować:
#   1. Skopiuj zawartość tego pliku do edytora na stronie online-python.com
#      albo rób każde ćwiczenie w okienku pod jego treścią na stronie tematu.
#   2. Wykonuj ćwiczenia po kolei. Uruchamiaj program po KAŻDEJ zmianie.
#   3. Wiersze z komentarzem „ma być …” mówią, jaki wynik jest poprawny.
#   4. Na koniec lekcji zapisz plik — strona online-python.com nie pamięta
#      twojej pracy.
#   5. Ćwiczenie 2 czeka na dwie liczby z klawiatury (input) — wpisz każdą
#      i naciśnij Enter, a dalsze ćwiczenia wykonają się po nich.
#
# Przypomnienie: a % b to reszta z dzielenia, a // b — dzielenie całkowite.
# Pętla while powtarza swoje wnętrze, dopóki warunek jest prawdziwy.


# =====================================================================
# ĆWICZENIE 1. NWD z odejmowaniem
# =====================================================================
# Napisz funkcję nwd_odejmowanie(a, b), która liczy NWD dwóch liczb
# dodatnich algorytmem Euklidesa z odejmowaniem: dopóki liczby są różne,
# od większej odejmuje mniejszą.

def nwd_odejmowanie(a, b):
    # TODO: dopóki a i b są różne, od większej odejmij mniejszą
    return a


print(nwd_odejmowanie(360, 150))   # ma być 30
print(nwd_odejmowanie(12, 18))     # ma być 6


# =====================================================================
# ĆWICZENIE 2. Kroki algorytmu
# =====================================================================
# Program wczytuje dwie liczby dodatnie (każdą w osobnym wierszu) i
# wypisuje kolejne pary (a, b) z algorytmu z odejmowaniem — zaczynając
# od wczytanej pary — a na końcu wiersz NWD = …

a = int(input())
b = int(input())

# TODO: wypisz parę a b, a potem — dopóki liczby są różne — odejmuj i wypisuj kolejne pary

print("NWD =", a)


# =====================================================================
# ĆWICZENIE 3. NWD z dzieleniem
# =====================================================================
# Napisz funkcję nwd(a, b), która liczy NWD algorytmem Euklidesa z
# resztą z dzielenia. Ma działać także wtedy, gdy jedna z liczb jest
# zerem.

def nwd(a, b):
    # TODO: dopóki b nie jest zerem, zastąp parę (a, b) parą (b, a % b)
    return a


print(nwd(360, 150))   # ma być 30
print(nwd(1071, 462))  # ma być 21


# =====================================================================
# ĆWICZENIE 4. NWW
# =====================================================================
# Napisz funkcję nww(a, b), która liczy najmniejszą wspólną
# wielokrotność dwóch liczb dodatnich, korzystając z funkcji nwd() z
# ćwiczenia 3.

# Funkcja nwd() z ćwiczenia 3 jest wyżej w tym pliku.


def nww(a, b):
    return 0    # TODO: jeden wiersz z wywołaniem nwd()


print(nww(12, 18))   # ma być 36


# =====================================================================
# ĆWICZENIE 5. Ułamki
# =====================================================================
# Napisz funkcje skroc(licznik, mianownik) i dodaj(l1, m1, l2, m2). Obie
# zwracają napis w postaci licznik/mianownik, z ułamkiem skróconym —
# także wtedy, gdy mianownik wyjdzie 1 (np. 1/1).

# Funkcje nwd() i nww() z ćwiczeń 3 i 4 są wyżej w tym pliku.


def skroc(licznik, mianownik):
    # TODO: podziel licznik i mianownik przez ich NWD
    return str(licznik) + "/" + str(mianownik)


def dodaj(l1, m1, l2, m2):
    # TODO: wspólny mianownik = NWW(m1, m2), dodaj liczniki, wynik skróć
    return ""


print(skroc(360, 150))       # ma być 12/5
print(dodaj(1, 12, 1, 18))   # ma być 5/36

