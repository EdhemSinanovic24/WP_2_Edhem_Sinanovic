Personal Life Dashboard
Autor: Edhem Sinanović
Predmet: Web programiranje – Projekat 2
O projektu

Proširena verzija stranice IPI Akademije nadograđena Angular aplikacijom koja uključuje sistem registracije/logina, Personal Life Dashboard, Student Fun Zone i statistiku sa grafikonima.
Struktura projekta

WP_2_Edhem_Sinanovic3/
│
├── index.html              # Glavna stranica IPI Akademije
├── kontakt.html            # Stranica za kontakt
├── popis.html              # Popis stranica
├── raspored.html           # Raspored
├── style.css               # Globalni CSS
├── favicon.ico
├── WP_2_Edhem_Sinanovic.pdf  # PDF izvještaj
│
├── slike/                  # Slike korištene na stranici
│   ├── logo-ipi.png
│   ├── srce.jpg
│   ├── tecajevi1.png
│   ├── tecajevi2.jpg
│   └── tecajevi3.jpg
│
└── ipi-angular/            # Angular aplikacija
    ├── src/
    │   ├── modules/
    │   │   ├── Whiteboard/
    │   │   ├── sleep/
    │   │   ├── study/
    │   │   ├── tasks/
    │   │   ├── water/
    │   │   └── reflection/
    │   └── styles.css
    ├── angular.json
    └── package.json
    Setup i pokretanje projekta
Preduslovi

Node.js (v18+)
Angular CLI
npm install -g @angular/cli
Pokretanje angulara:
cd ipi-angular
npm install
ng serve
Angular će biti dostupna na: http://localhost:4200
Funkcionalnosti
1. HTML stranice

Glavna stranica IPI Akademije sa navigacijom
Kontakt, raspored i popis stranica
Dodan link Login/Register u navigacijski meni

2. Registracija / Login

Forma sa poljima: Ime, E-mail, Password, Izbor teme
Više CSS tema (zelena, plava, tamna, cyberpunk)
Podaci se čuvaju u localStorage
Angular dinamički mijenja temu pri loginu

3. Personal Life Dashboard (Angular)
Moduli prikazani kao clickable cards - korisnik bira koje aktivira:
| Modul | Opis |
|---|---|
| Habit tracker | Praćenje dnevnih navika |
| Sleep tracker | Praćenje sati spavanja |
| Study planner | Planiranje učenja |
| Yoga / Fitness planner | Fitness aktivnosti |
| Task / Project planner | Upravljanje zadacima |
| Meal planner | Planiranje obroka |
| Mood tracker | Praćenje raspoloženja |
| Calendar tracker | Kalendar aktivnosti |
| Finance mini-tracker | Praćenje finansija |
| Gratitude journal | Dnevnik zahvalnosti |
| Daily reflection | Dnevna refleksija |
| Water intake | Praćenje unosa vode |
Svaki modul je zasebna Angular komponenta. Podaci se čuvaju u localStorage po korisniku.
4. Student Fun Zone (Angular)

Bingo, Kviz, Whiteboard, Kanban, Vision board

5. Statistika

Bar chart – sati spavanja
Line chart – vrijeme učenja
Pie chart – komplet pregled
Poređenje napretka sedmica/mjesec
Filter po danima

Teme:
Plava ·  Tamna/Dark ·  Cyberpunk
Tehnologije

HTML5 / CSS3 / JavaScript
Angular 17+
TypeScript
Chart.js
localStorage
Napomena
node_modules nije uključen u repo. Nakon preuzimanja pokrenuti npm install unutar ipi-angular/ foldera.
