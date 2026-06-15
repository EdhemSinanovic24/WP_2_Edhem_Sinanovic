# 🎓 WP_2_Edhem_Sinanovic - Personal Life Dashboard

> **Web programiranje - Projekat 2**               
> Internacionalna poslovno-informaciona akademija Tuzla  
> Student: **Edhem Sinanovic** | Akademska godina: 2025/2026

---

## 📌 O projektu

Ovaj projekat predstavlja nadogradnju statičke web stranice **IPI Akademije** sa dinamičkom Angular aplikacijom. Projekat kombinuje klasičan HTML/CSS/JS pristup sa modernim Angular frameworkom, čime se demonstrira prelaz sa statičkog web dizajna na full-stack web development.

Centralni dio projekta je **Personal Life Dashboard** - personalizovani korisnički dashboard koji omogućava praćenje svakodnevnih životnih navika, aktivnosti i produktivnosti.

---

## 🛠️ Tehnologije

| Tehnologija | Svrha |
|-------------|-------|
| HTML5 | Struktura stranica |
| CSS3 | Stilizacija i animacije |
| JavaScript | Interaktivnost na glavnoj stranici |
| Angular 21 | SPA Dashboard aplikacija |
| Firebase | Autentifikacija korisnika |
| localStorage | Čuvanje korisničkih podataka |
| TypeScript | Tipiziran JavaScript za Angular |

---

## 📁 Struktura projekta

| Fajl/Folder | Opis |
|-------------|------|
| index.html | Glavna stranica IPI Akademije |
| style.css | Stilovi glavne stranice |
| kontakt.html | Stranica za kontakt |
| popis.html | Stranica sa popisom studenata |
| raspored.html | Stranica sa rasporedom |
| favicon.ico | Ikonica stranice |
| slike/ | Folder sa slikama |
| ipi-angular/ | Angular aplikacija |
| ipi-angular/src/app/auth/login/ | Komponenta za prijavu |
| ipi-angular/src/app/auth/register/ | Komponenta za registraciju |
| ipi-angular/src/app/funzone/ | Student Fun Zone |
| ipi-angular/src/app/app.routes.ts | Definicija ruta aplikacije |
| ipi-angular/src/app/auth.service.ts | Servis za autentifikaciju |
| ipi-angular/src/dashboard/ | Glavni dashboard |
| ipi-angular/src/modules/ | Svi tracker moduli |

---

## ✨ Funkcionalnosti

### 🌐 Glavna stranica
- Prikaz informacija o IPI Akademiji
- Responzivan dizajn sa navigacijom
- Stranice: Početna, Kontakt, Popis studenata, Raspored
- Link za Login/Register koji otvara Angular aplikaciju

### 🔐 Autentifikacija
- Registracija korisnika sa unosom: Ime, Email, Lozinka, Izbor teme
- Prijava korisnika sa validacijom
- Čuvanje podataka u localStorage
- Zaštita ruta pomoću AuthGuard

### 🎨 CSS Teme
- 🌙 Tamna (Dark) tema
- 💙 Plava tema
- 💚 Zelena tema

### 📊 Personal Life Dashboard

| Modul | Opis |
|-------|------|
| 🔥 Habit Tracker | Praćenje dnevnih navika i streaka |
| 🌙 Sleep Tracker | Bilježenje sati spavanja |
| 💧 Water Tracker | Praćenje unosa vode |
| 🧠 Mood Tracker | Praćenje raspoloženja |
| 🍽️ Meal Planner | Planiranje dnevnih obroka |
| 📅 Calendar | Kalendar aktivnosti |
| 📚 Study Planner | Planiranje učenja |
| 🧘 Yoga/Fitness | Fitness i yoga plan |
| ✅ Task/Project | Upravljanje zadacima |
| 💰 Finance Tracker | Praćenje finansija |
| 🙏 Gratitude Journal | Dnevnik zahvalnosti |
| 📝 Daily Reflection | Dnevna refleksija |

### 🎮 Student Fun Zone
- 🎯 Bingo
- ❓ Kviz
- 📋 Whiteboard
- 📊 Kanban
- 🌈 Vision Board

---

## 🚀 Pokretanje projekta

### Glavna stranica
Otvoriti index.html u browseru ili koristiti Live Server u VS Code.

### Angular aplikacija
cd ipi-angular
npm install
ng serve

Otvoriti u browseru: http://localhost:4200

---

## 👤 Kako koristiti

1. Otvoriti index.html u browseru
2. Kliknuti na Login/Register u navigaciji
3. Registrovati se sa imenom, emailom, lozinkom i odabirom teme
4. Nakon prijave otvorit će se Personal Life Dashboard
5. Kliknuti na željeni modul za praćenje aktivnosti
6. Posjetiti Student Fun Zone za zabavne alate

---

## 📝 Napomene

- Svi podaci se čuvaju u localStorage pregledača
- Aplikacija je optimizovana za desktop pregledače
- Tema se primjenjuje automatski nakon prijave

---

## 📧 Kontakt

**Student:** Edhem Sinanovic  
**Predmet:** Web programiranje  
**Akademska godina:** 2025/2026
