# Definiowanie funkcji obliczeniowych — szkielet ćwiczeń
# Informatyka, zakres podstawowy, klasa 2LOA — PCEiKZ Szczucin
#
# Jak pracować:
#   1. Skopiuj zawartość tego pliku do edytora na stronie online-python.com
#   2. Wykonuj zadania po kolei. Uruchamiaj program po KAŻDEJ zmianie (Run / F8).
#   3. Zadanie, którego jeszcze nie robisz, zostaw zakomentowane znakiem #
#   4. Na koniec lekcji zapisz plik (Ctrl+S) — strona nie pamięta twojej pracy.
#
# Przypomnienie: funkcja ma ZWRACAĆ wynik (return), a nie go wypisywać.
# O wypisaniu decyduje program, który ją wywołał.


# =====================================================================
# ZADANIE 1. Pole i obwód prostokąta
# =====================================================================
# Napisz dwie funkcje, obie z instrukcją return.
# Wypisz wyniki jednym print() z f-napisem, np.:
#     Prostokąt 3 × 4: pole 12, obwód 14

def pole_prostokata(a, b):
    return 0    # TODO: poprawny wzór na pole


# TODO: dopisz funkcję obwod_prostokata(a, b)


# print(f"Prostokąt 3 × 4: pole {TODO}, obwód {TODO}")
# TODO: to samo dla boków 12.5 i 2


# =====================================================================
# ZADANIE 2. Przelicznik walut z wartością domyślną
# =====================================================================
# na_zlotowki(kwota, kurs=4.30) zwraca wartość kwoty w złotych.
# Sprawdź trzy razy: bez kursu, z kursem 4.15 i z kursem 0.
# W karcie pracy zapisz, co wyszło za trzecim razem i czy to ma sens.

# def na_zlotowki(kwota, kurs=TODO):
#     return TODO

# print(na_zlotowki(100))
# print(na_zlotowki(100, 4.15))
# print(na_zlotowki(100, 0))


# =====================================================================
# ZADANIE 3. Cena biletu — warunki w funkcji
# =====================================================================
#   do 6 lat włącznie ....  0 zł
#   7-18 lat .............. 12 zł
#   19-64 lata ............ 25 zł
#   65 lat i więcej ....... 15 zł
#
# UWAGA: sprawdź funkcję na GRANICACH, nie w środku przedziałów.

# def cena_biletu(wiek):
#     if wiek TODO:
#         return TODO
#     TODO

# for w in [6, 7, 18, 19, 64, 65]:
#     print(w, "lat ->", cena_biletu(w), "zl")


# =====================================================================
# ZADANIE 4. Naprawa funkcji
# =====================================================================
# Każda z trzech funkcji niżej ma JEDEN błąd. Odkomentuj pierwszą,
# uruchom, przeczytaj komunikat, popraw — i dopiero potem następną.
# W karcie pracy zapisz rodzaj błędu i na czym polegała pomyłka.

# --- funkcja A ---
# def podwoj(x):
# return x * 2
#
# print(podwoj(5))

# --- funkcja B ---
# print(potroj(5))
#
# def potroj(x):
#     return x * 3

# --- funkcja C ---
# def suma_kwadratow(a, b):
#     print(a ** 2 + b ** 2)
#
# print(suma_kwadratow(3, 4) + 1)


# =====================================================================
# ZADANIE 5. Złóż z części
# =====================================================================
# koszt_paneli(a, b, cena_za_m2) ma zwrócić koszt wyłożenia podłogi.
# W środku WYWOŁAJ pole_prostokata z zadania 1 — nie licz pola od nowa.

# def koszt_paneli(a, b, cena_za_m2):
#     return TODO

# print(koszt_paneli(4, 5, 89))
