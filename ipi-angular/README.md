# WP_2_Edhem_Sinanovic - Personal Life Dashboard

## Opis projekta

Ovaj projekat je izrađen u okviru predmeta **Web programiranje** na IPI Akademiji.
Projekat se sastoji od statičke web stranice IPI Akademije proširene sa Angular aplikacijom
koja nudi **Personal Life Dashboard** — personalizovani dashboard za praćenje svakodnevnih aktivnosti.

---

## Tehnologije

- HTML5, CSS3, JavaScript
- Angular 21
- Firebase (autentifikacija i baza podataka)
- localStorage (čuvanje korisničkih podataka)

---

## Funkcionalnosti

### Glavna stranica (HTML/CSS/JS)
- Prikaz informacija o IPI Akademiji
- Navigacija sa linkom za Login/Register
- Stranice: Početna, Kontakt, Popis, Raspored

### Angular aplikacija (Personal Life Dashboard)
- **Registracija i prijava** korisnika sa izborom teme
- **CSS teme**: zelena, plava, tamna (dark)
- **Dashboard moduli**:
  - 🔥 Habit Tracker — praćenje navika
  - 🌙 Sleep Tracker — praćenje sna
  - 💧 Water Tracker — praćenje unosa vode
  - 🧠 Mood Tracker — praćenje raspoloženja
  - 🍽️ Meal Planner — planiranje obroka
  - 📅 Calendar — kalendar aktivnosti
  - 📚 Study Planner — planiranje učenja
  - 🧘 Yoga/Fitness Planner — fitness plan
  - ✅ Task/Project Planner — upravljanje zadacima
  - 💰 Finance Tracker — praćenje finansija
  - 🙏 Gratitude Journal — dnevnik zahvalnosti
  - 📝 Daily Reflection — dnevna refleksija
- **Student Fun Zone** — Bingo, Kviz, Whiteboard, Kanban, Vision Board

---

## Pokretanje projekta

### Glavna stranica
Otvoriti `index.html` u browseru ili pokrenuti Live Server.

### Angular aplikacija
```bash
cd ipi-angular
npm install
ng serve
```
Aplikacija će biti dostupna na `http://localhost:4200`

---

## Struktura projekta

```
WP_2_Edhem_Sinanovic/
├── index.html              # Glavna stranica
├── style.css               # Stilovi glavne stranice
├── kontakt.html            # Stranica za kontakt
├── popis.html              # Stranica popisa
├── raspored.html           # Stranica rasporeda
├── slike/                  # Slike projekta
└── ipi-angular/            # Angular aplikacija
    └── src/
        ├── app/
        │   ├── auth/       # Login i Register komponente
        │   ├── funzone/    # Student Fun Zone
        │   └── modules/    # Dashboard moduli
        └── dashboard/      # Glavni dashboard
```

---

## Autor

Edhem Sinanovic
IPI Akademija — Web programiranje, 2025/2026
