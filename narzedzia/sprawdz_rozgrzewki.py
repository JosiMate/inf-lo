#!/usr/bin/env python3
r"""
Skrypt walidujący banki pytań rozgrzewkowych (docs/assets/rozgrzewki/klasa-1.json i klasa-2.json).

Sprawdza:
1. Poprawność JSON-a, pola i typy danych.
2. Zgodność listy 'kolejnosc' z kolejnością tematów w 'docs/klasa-N/.nav.yml'
   (z uwzględnieniem zachowania awesome-nav / append_unmatched).
3. Istnienie plików .md dla wszystkich tematów z 'kolejnosc'.
4. Ostrzeżenie, gdy temat z nav/pliku nie ma pytań.
5. Poprawność pole 'temat' w każdym pytaniu (musi należeć do 'kolejnosc').
6. Unikalność 'id' i wzorzec ^lo[12]-[a-z]+-\d{3}$.
7. Zdublowane treści pytań.
8. Porównanie id pytań z poprzednim commitem (git show HEAD:...):
   - zniknięcie id -> ostrzeżenie,
   - użycie tego samego id dla zmienionej treści -> błąd.
9. Podsumowanie: liczba pytań per temat, ostrzeżenie gdy < 3 pytania.
"""

import json
import os
import re
import subprocess
import sys


def parse_nav_yml(nav_path):
    """
    Prosty parser .nav.yml do odczytania wpisów w sekcji nav:
    - "Tytuł": plik.md
    Pomiata index.md oraz wymagania-i-bhp.md.
    """
    tematy = []
    if not os.path.exists(nav_path):
        return tematy

    in_nav = False
    with open(nav_path, "r", encoding="utf-8") as f:
        for line in f:
            stripped = line.strip()
            if stripped.startswith("nav:"):
                in_nav = True
                continue
            if in_nav and line.startswith("  - "):
                # Wyciągamy plik .md z wiersza
                # np. - "Spis tematów": index.md
                # lub - "Bezpieczna praca z komputerem": bezpieczna-praca.md
                match = re.search(r':\s*([a-zA-Z0-9_-]+\.md)', line)
                if match:
                    md_file = match.group(1)
                    slug = md_file.replace(".md", "")
                    if slug not in ("index", "wymagania-i-bhp"):
                        tematy.append(slug)
    return tematy


def find_extra_md_files(klasa_dir, nav_tematy):
    """
    Wyszukuje pliki .md w katalogu klasy spoza nav_tematy
    (z wyjątkiem index.md i wymagania-i-bhp.md), posortowane alfabetycznie.
    Odtwarza działanie append_unmatched: true.
    """
    extra = []
    if not os.path.exists(klasa_dir):
        return extra

    for fname in sorted(os.listdir(klasa_dir)):
        if fname.endswith(".md"):
            slug = fname[:-3]
            if slug in ("index", "wymagania-i-bhp"):
                continue
            if slug not in nav_tematy:
                extra.append(slug)
    return extra


def get_expected_kolejnosc(klasa_nr):
    klasa_dir = f"docs/klasa-{klasa_nr}"
    nav_path = os.path.join(klasa_dir, ".nav.yml")

    nav_tematy = parse_nav_yml(nav_path)
    extra_tematy = find_extra_md_files(klasa_dir, nav_tematy)
    return nav_tematy + extra_tematy


def get_git_head_json(rel_path):
    """
    Próbuje odczytać plik JSON z poprzedniego commita (HEAD).
    """
    try:
        res = subprocess.run(
            ["git", "show", f"HEAD:{rel_path}"],
            capture_output=True,
            text=True,
            check=True
        )
        return json.loads(res.stdout)
    except Exception:
        return None


def waliduj_klase(klasa_nr):
    json_rel_path = f"docs/assets/rozgrzewki/klasa-{klasa_nr}.json"
    print(f"=== Sprawdzanie {json_rel_path} ===")

    errors = []
    warnings = []

    if not os.path.exists(json_rel_path):
        errors.append(f"Plik {json_rel_path} nie istnieje.")
        return errors, warnings

    # 1. Poprawność JSON
    try:
        with open(json_rel_path, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        errors.append(f"Niepoprawny JSON w {json_rel_path}: {e}")
        return errors, warnings

    # Sprawdzenie głównych pól
    required_keys = ["klasa", "kolejnosc", "pytania"]
    for k in required_keys:
        if k not in data:
            errors.append(f"Brak pola '{k}' w {json_rel_path}.")

    if errors:
        return errors, warnings

    klasa_val = data.get("klasa")
    if klasa_val != f"klasa-{klasa_nr}":
        errors.append(f"Pole 'klasa' powinno wynosić 'klasa-{klasa_nr}', a jest '{klasa_val}'.")

    kolejnosc = data.get("kolejnosc", [])
    if not isinstance(kolejnosc, list):
        errors.append("Pole 'kolejnosc' musi być listą.")
        kolejnosc = []

    pytania = data.get("pytania", [])
    if not isinstance(pytania, list):
        errors.append("Pole 'pytania' musi być listą.")
        pytania = []

    # 2. Kolejność i spójność z .nav.yml + append_unmatched
    expected_kolejnosc = get_expected_kolejnosc(klasa_nr)
    if kolejnosc != expected_kolejnosc:
        errors.append(
            f"Kolejność w JSON {kolejnosc} niezgodna z oczekiwaną {expected_kolejnosc}."
        )

    # 3. Istnienie plików .md dla tematów z kolejnosc
    for t in kolejnosc:
        md_file = f"docs/klasa-{klasa_nr}/{t}.md"
        if not os.path.exists(md_file):
            errors.append(f"Temat '{t}' w 'kolejnosc' nie ma odpowiadającego pliku {md_file}.")

    # 4 & 5. Sprawdzanie pytań
    id_pattern = re.compile(rf"^lo{klasa_nr}-[a-z]+-\d{{3}}$")
    seen_ids = {}
    seen_tresci = {}
    pytania_per_temat = {t: 0 for t in kolejnosc}

    for i, q in enumerate(pytania):
        prefix = f"Pytanie #{i + 1}"
        if not isinstance(q, dict):
            errors.append(f"{prefix} nie jest obiektem.")
            continue

        q_id = q.get("id")
        q_temat = q.get("temat")
        q_pytanie = q.get("pytanie")
        q_odpowiedz = q.get("odpowiedz")

        prefix = f"Pytanie ID '{q_id}'" if q_id else f"Pytanie #{i + 1}"

        # Pola wymagane
        for field in ["id", "temat", "pytanie", "odpowiedz"]:
            if field not in q or not isinstance(q[field], str) or not q[field].strip():
                errors.append(f"{prefix}: Brak lub pusty napis w polu '{field}'.")

        # Wzór ID
        if q_id:
            if not id_pattern.match(q_id):
                errors.append(f"{prefix}: ID nie pasuje do wzorca ^lo{klasa_nr}-[a-z]+-\\d{{3}}$.")
            if q_id in seen_ids:
                errors.append(f"{prefix}: Zdublowane ID '{q_id}'.")
            else:
                seen_ids[q_id] = q

        # Temat w kolejnosc
        if q_temat:
            if q_temat not in kolejnosc:
                errors.append(f"{prefix}: Temat '{q_temat}' nie znajduje się w 'kolejnosc'.")
            else:
                pytania_per_temat[q_temat] += 1

        # Zdublowana treść pytania
        if q_pytanie:
            q_pytanie_clean = q_pytanie.strip().lower()
            if q_pytanie_clean in seen_tresci:
                errors.append(
                    f"{prefix}: Zdublowana treść pytania (taka sama jak w {seen_tresci[q_pytanie_clean]})."
                )
            else:
                seen_tresci[q_pytanie_clean] = q_id or f"#{i + 1}"

    # Ostrzeżenia o liczbie pytań na temat
    for t, count in pytania_per_temat.items():
        if count == 0:
            warnings.append(f"Temat '{t}' nie posiada żadnych pytań w banku.")
        elif count < 3:
            warnings.append(f"Temat '{t}' ma mniej niż 3 pytania (ma {count}).")

    # 8. Porównanie z HEAD w git
    git_head_data = get_git_head_json(json_rel_path)
    if git_head_data and isinstance(git_head_data.get("pytania"), list):
        old_pytania = {q["id"]: q for q in git_head_data["pytania"] if isinstance(q, dict) and "id" in q}
        for old_id, old_q in old_pytania.items():
            if old_id not in seen_ids:
                warnings.append(f"ID '{old_id}' z poprzedniego commita zniknęło w bieżącym banku.")
            else:
                new_q = seen_ids[old_id]
                if old_q.get("pytanie") != new_q.get("pytanie"):
                    errors.append(
                        f"ID '{old_id}' zostało użyte ponownie dla innej treści pytania "
                        f"(stara: '{old_q.get('pytanie')}', nowa: '{new_q.get('pytanie')}')."
                    )

    # Podsumowanie
    print("Podsumowanie pytań per temat:")
    for t in kolejnosc:
        print(f"  - {t}: {pytania_per_temat.get(t, 0)} pytań")

    return errors, warnings


def main():
    all_errors = []
    all_warnings = []

    for k in (1, 2):
        errs, warns = waliduj_klase(k)
        all_errors.extend(errs)
        all_warnings.extend(warns)
        print()

    if all_warnings:
        print("--- OSTRZEŻENIA ---")
        for w in all_warnings:
            print(f"[OSTRZEŻENIE] {w}")
        print()

    if all_errors:
        print("--- BŁĘDY ---")
        for e in all_errors:
            print(f"[BŁĄD] {e}")
        print("\nWalidacja zakończona niepowodzeniem!")
        sys.exit(1)
    else:
        print("Walidacja zakonczona sukcesem — zero błędów!")
        sys.exit(0)


if __name__ == "__main__":
    main()
