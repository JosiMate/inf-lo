# Wyszukiwanie wzorca w tekście — szkielet ćwiczeń
# Informatyka, zakres podstawowy, klasa 2LOA — PCEiKZ Szczucin
#
# Jak pracować:
#   1. Skopiuj zawartość tego pliku do edytora na stronie online-python.com
#      albo rób każde ćwiczenie w okienku pod jego treścią na stronie tematu.
#   2. Wykonuj ćwiczenia po kolei. Uruchamiaj program po KAŻDEJ zmianie.
#   3. Wiersze z komentarzem „ma być …” mówią, jaki wynik jest poprawny.
#   4. Na koniec lekcji zapisz plik — strona online-python.com nie pamięta
#      twojej pracy.
#
# Przypomnienie: tekst[i:i + m] to m znaków tekstu od pozycji i,
# a ustawień wzorca jest n - m + 1 (od 0 do n - m).


# =====================================================================
# ĆWICZENIE 1. Gotowe narzędzia
# =====================================================================
# Wypisz cztery wyniki, każdy w osobnym wierszu, w tej kolejności.
# Użyj gotowych narzędzi: in, find(), count().

zdanie = "Na szkolnym boisku gramy w piłkę, a po lekcjach gramy w kosza."

print()    # TODO: czy w zdaniu jest słowo "boisku"
print()    # TODO: pozycja pierwszego "gramy"
print()    # TODO: ile razy występuje "gramy"
print()    # TODO: co zwraca find() dla słowa "siatkówkę"


# =====================================================================
# ĆWICZENIE 2. Bez względu na wielkość liter
# =====================================================================
# Funkcja zwraca True, gdy wzorzec jest w tekście — bez względu na
# wielkość liter. Zwraca wynik, nie wypisuje go.

def zawiera(tekst, wzorzec):
    return wzorzec in tekst     # TODO: ma nie zależeć od wielkości liter


print(zawiera("Ala ma kota", "ALA"))    # ma być True
print(zawiera("Ala ma kota", "pies"))   # ma być False


# =====================================================================
# ĆWICZENIE 3. Ile razy — naprawdę
# =====================================================================
# Ile razy wzorzec występuje w tekście, licząc także wystąpienia
# nakładające się. Bez find() i count() — algorytmem naiwnym.

def ile_wystapien(tekst, wzorzec):
    n, m = len(tekst), len(wzorzec)
    ile = 0
    # TODO: algorytm naiwny — sprawdź każde ustawienie wzorca
    return ile


print(ile_wystapien("banana", "ana"), "banana".count("ana"))
print(ile_wystapien("Mama ma mamę", "ma"))


# =====================================================================
# ĆWICZENIE 4. Ile pracy wykonuje algorytm
# =====================================================================
# Ile porównań znaków wykonuje algorytm naiwny, który przy pierwszej
# różnicy przerywa ustawienie. Każde porównanie się liczy — także nieudane.

def porownania(tekst, wzorzec):
    n, m = len(tekst), len(wzorzec)
    licznik = 0
    # TODO: algorytm naiwny znak po znaku; przy każdym porównaniu
    #       dwóch znaków zwiększ licznik o 1, a przy pierwszej różnicy
    #       przerwij to ustawienie (break)
    return licznik


print(porownania("ABRAKADABRA", "ABRA"))
print(porownania("aaaaaaaaab", "aaab"))


# =====================================================================
# ĆWICZENIE 5. Naprawa funkcji
# =====================================================================
# Funkcja ma działać jak find(): pozycja pierwszego wystąpienia albo -1.
# Są w niej DWA błędy. Znajdź je, sprawdzając na różnych tekstach.

def pierwsze(tekst, wzorzec):
    n, m = len(tekst), len(wzorzec)
    for i in range(n - m):
        if tekst[i:i + m] == wzorzec:
            return i
        return -1


print(pierwsze("ABRAKADABRA", "ABRA"))   # ma być 0
print(pierwsze("ABRAKADABRA", "KAD"))    # ma być 4
