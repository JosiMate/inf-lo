# Podstawy pracy w środowisku Python — szkielet ćwiczeń
# Informatyka, zakres podstawowy, klasa 2LOA — PCEiKZ Szczucin
#
# Jak pracować:
#   1. Skopiuj zawartość tego pliku do edytora na stronie online-python.com
#   2. Wykonuj zadania po kolei. Uruchamiaj program po KAŻDEJ zmianie (Run / F8).
#   3. Zadanie, którego jeszcze nie robisz, zostaw zakomentowane znakiem #
#      — inaczej program będzie się zatrzymywał na każdym input().
#   4. Na koniec lekcji zapisz plik (Ctrl+S) — strona nie pamięta twojej pracy.


# =====================================================================
# ZADANIE 1. Wizytówka
# =====================================================================
# Utwórz trzy zmienne: imie, klasa, przedmiot.
# Wypisz trzy wiersze, używając f-napisów, np.:  Nazywam się Ala.
# Wynik ma się zmieniać po zmianie samej wartości zmiennej.

imie = "TODO"
# TODO: dopisz zmienne klasa i przedmiot

print(f"Nazywam się {imie}.")
# TODO: dopisz dwa kolejne wiersze print()


# =====================================================================
# ZADANIE 2. Rachunek za zakupy
# =====================================================================
# Program pyta o nazwę towaru, cenę za sztukę i liczbę sztuk,
# a potem wypisuje np.:   3 × zeszyt = 11.7 zł
#
# Uwaga: input() zwraca NAPIS. Cena może mieć grosze, liczba sztuk nie.

# towar = input("Nazwa towaru: ")
# cena = TODO       # wczytaj cenę i zamień na liczbę rzeczywistą
# sztuki = TODO     # wczytaj liczbę sztuk i zamień na liczbę całkowitą
# razem = TODO      # policz wartość zakupu
# print(f"{sztuki} × {towar} = {razem} zł")


# =====================================================================
# ZADANIE 3. Sekundy na czas
# =====================================================================
# Wczytaj liczbę sekund i wypisz ją jako godziny, minuty i sekundy.
# Dla 3725 program ma wypisać:  1 godz. 2 min 5 s
#
# Wskazówka: //  daje pełne jednostki,  %  daje resztę.
# Minuty licz z tego, co zostało PO odjęciu pełnych godzin.

# sekundy = int(input("Podaj liczbę sekund: "))
# godziny = TODO
# reszta = TODO
# minuty = TODO
# sekundy_koncowe = TODO
# print(f"{godziny} godz. {minuty} min {sekundy_koncowe} s")


# =====================================================================
# ZADANIE 4. Naprawa programu
# =====================================================================
# Poniższy program ma liczyć średnią z trzech ocen, ale są w nim TRZY błędy.
# Usuń znaki # z początku wierszy, uruchom program i poprawiaj po JEDNYM
# błędzie. Po każdej poprawce uruchom program ponownie i zapisz w karcie
# pracy, jaki komunikat pokazał Python i co go powodowało.

# ocena1 = input("Pierwsza ocena: ")
# ocena2 = input("Druga ocena: ")
# ocena3 = input("Trzecia ocena: ")
# suma = ocena1 + ocena2 + ocena3
# srednia = suma / liczba_ocen
# print(f"Średnia ocen: {srednia}"


# =====================================================================
# ZADANIE NA OCENĘ CELUJĄCĄ (wybierz jedno — opis w materiale na stronie)
# =====================================================================
# A. Rozmienianie kwoty na nominały 200, 100, 50, 20, 10, 5, 2, 1 zł
#    — tylko przy pomocy // oraz %
# B. Zamiana wartości zmiennych a i b: raz ze zmienną pomocniczą,
#    raz zapisem a, b = b, a
# C. Reszta z dzielenia przez 2 jako sposób na sprawdzenie parzystości
