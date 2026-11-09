# Badanie własności liczb całkowitych — szkielet ćwiczeń
# Informatyka, zakres podstawowy, klasa 2LOA — PCEiKZ Szczucin
#
# Jak pracować:
#   1. Skopiuj zawartość tego pliku do edytora na stronie online-python.com
#      albo rób każde ćwiczenie w okienku pod jego treścią na stronie tematu.
#   2. Wykonuj ćwiczenia po kolei. Uruchamiaj program po KAŻDEJ zmianie.
#   3. Wiersze z komentarzem „ma być …” mówią, jaki wynik jest poprawny.
#   4. Na koniec lekcji zapisz plik — strona online-python.com nie pamięta
#      twojej pracy.
#   5. Ćwiczenie 1 czeka na liczbę z klawiatury (input) — wpisz ją
#      i naciśnij Enter, a dalsze ćwiczenia wykonają się po niej.
#
# Przypomnienie: d jest dzielnikiem n, gdy n % d == 0.
# Liczba pierwsza ma dokładnie dwa dzielniki; 1 nie jest pierwsza.


# =====================================================================
# ĆWICZENIE 1. Dzielniki
# =====================================================================
# Program wczytuje liczbę całkowitą dodatnią n i wypisuje w jednym
# wierszu wszystkie jej dzielniki od najmniejszego, oddzielone spacjami.

n = int(input())

# TODO: sprawdź liczby od 1 do n; dzielniki wypisuj w jednym wierszu (end=" ")


# =====================================================================
# ĆWICZENIE 2. Czy liczba jest pierwsza?
# =====================================================================
# Napisz funkcję czy_pierwsza(n), która zwraca True, gdy n jest liczbą
# pierwszą, i False w przeciwnym razie. Policz dzielniki — liczba
# pierwsza ma ich dokładnie dwa.

def czy_pierwsza(n):
    ile = 0
    # TODO: policz dzielniki n
    return False    # TODO: zwróć wynik porównania ile z liczbą 2


print(czy_pierwsza(13))   # ma być True
print(czy_pierwsza(1))    # ma być False


# =====================================================================
# ĆWICZENIE 3. Szybciej — do pierwiastka
# =====================================================================
# Napisz funkcję czy_pierwsza_szybko(n), która sprawdza dzielniki od 2,
# dopóki d * d <= n. Dla n < 2 od razu zwraca False.

def czy_pierwsza_szybko(n):
    if n < 2:
        return False
    d = 2
    # TODO: dopóki d * d <= n — jeśli d dzieli n, zwróć False; potem zwiększ d
    return True


print(czy_pierwsza_szybko(97))   # ma być True
print(czy_pierwsza_szybko(49))   # ma być False


# =====================================================================
# ĆWICZENIE 4. Liczby pierwsze w przedziale
# =====================================================================
# Napisz funkcję ile_pierwszych(a, b), która zwraca, ile liczb
# pierwszych jest w przedziale od a do b włącznie. Skorzystaj z funkcji
# czy_pierwsza_szybko().

# Funkcja czy_pierwsza_szybko() z ćwiczenia 3 jest wyżej w tym pliku.


def ile_pierwszych(a, b):
    ile = 0
    # TODO: sprawdź każdą liczbę od a do b włącznie
    return ile


print(ile_pierwszych(1, 100))   # ma być 25


# =====================================================================
# ĆWICZENIE 5. Rozkład na czynniki pierwsze
# =====================================================================
# Napisz funkcję rozklad(n), która dla n >= 2 zwraca napis z czynnikami
# pierwszymi n od najmniejszego, połączonymi znakiem *: rozklad(360)
# daje "2*2*2*3*3*5", a rozklad(97) — "97".

def rozklad(n):
    wynik = ""
    d = 2
    # TODO: dopóki n > 1 — jeśli d dzieli n, dopisz d do wyniku i podziel n; inaczej zwiększ d
    return wynik


print(rozklad(360))   # ma być 2*2*2*3*3*5


# =====================================================================
# ĆWICZENIE 6. Sito Eratostenesa
# =====================================================================
# Uzupełnij funkcję sito(n), która zwraca listę liczb pierwszych nie
# większych od n. Brakuje pętli, która skreśla wielokrotności p.

def sito(n):
    pierwsza = [True] * (n + 1)
    pierwsza[0] = False
    pierwsza[1] = False
    p = 2
    while p * p <= n:
        if pierwsza[p]:
            pass    # TODO: skreśl (ustaw False) wielokrotności p, zaczynając od p * p
        p = p + 1
    wynik = []
    for i in range(n + 1):
        if pierwsza[i]:
            wynik.append(i)
    return wynik


print(sito(30))   # ma być [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]


# =====================================================================
# ĆWICZENIE 7. Liczby bliźniacze (dla chętnych)
# =====================================================================
# Napisz funkcję blizniacze(n), która zwraca listę par (p, p + 2) liczb
# pierwszych, w których p + 2 <= n. Parę zapisz jako (p, p + 2) i dopisz
# do listy metodą append().

# Funkcje sito() i czy_pierwsza_szybko() są wyżej w tym pliku.


def blizniacze(n):
    pary = []
    # TODO: dla każdej liczby pierwszej p sprawdź, czy p + 2 też jest pierwsza i nie większa od n
    return pary


print(blizniacze(20))   # ma być [(3, 5), (5, 7), (11, 13), (17, 19)]

