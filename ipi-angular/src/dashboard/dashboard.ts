import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit, AfterViewInit {

  username = 'User';
  timeOfDay = 'Day';
  cmdOpen = false;

  modules = [
    { key: 'habit', label: 'Habit', icon: '🔥' },
    { key: 'sleep', label: 'Sleep', icon: '🌙' },
    { key: 'water', label: 'Water', icon: '💧' },
    { key: 'mood', label: 'Mood', icon: '🧠' },
    { key: 'meal', label: 'Meal', icon: '🍽️' },
    { key: 'calendar', label: 'Calendar', icon: '📅' },
    // UKLONI OVO ILI OSTAVI - ovisi kako hoćeš
    // { key: 'funzone', label: 'Fun Zone', icon: '🎮' }
  ];

  constructor(private router: Router) {
    console.log('🔍 Dashboard constructor - checking login...');
    
    // ✅ POPRAVLJENO: Provjeri oba ključa
    const loggedIn = localStorage.getItem('loggedIn');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    console.log('loggedIn:', loggedIn);
    console.log('isLoggedIn:', isLoggedIn);
    
    // Ako nije logovan ni na jedan način, redirect
    if (loggedIn !== 'true' && isLoggedIn !== 'true') {
      console.log('❌ User not logged in, redirecting to login...');
      this.router.navigateByUrl('/login');
    } else {
      console.log('✅ User is logged in!');
    }

    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.cmdOpen = !this.cmdOpen;
      }
    });
  }

  ngOnInit(): void {
    console.log('🟢 Dashboard ngOnInit');
    
    const h = new Date().getHours();
    this.timeOfDay = h < 12 ? 'Morning' : h < 18 ? 'Afternoon' : 'Evening';

    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsed = JSON.parse(user);
        this.username = parsed.name || 'User';
        console.log('👤 Username set to:', this.username);
      } catch (e) {
        console.error('Error parsing user:', e);
      }
    }
  }

  ngAfterViewInit(): void {
    console.log('🟡 Dashboard ngAfterViewInit');
    
    const el = document.querySelector('.dashboard') as HTMLElement;
    if (!el) {
      console.warn('⚠️ .dashboard element not found');
      return;
    }

    document.addEventListener('mousemove', (e) => {
      const x = (window.innerWidth / 2 - e.clientX) / 35;
      const y = (window.innerHeight / 2 - e.clientY) / 35;
      el.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });
  }

  open(module: string): void {
    console.log('Opening module:', module);
    
    // POSEBNO RUČENJE ZA FUN ZONE
    if (module === 'funzone') {
      this.openFunZone();
    } else {
      this.router.navigateByUrl('/dashboard/' + module);
    }
  }

  logout(): void {
    console.log('Logging out...');
    // ✅ Očisti OBA ključa
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isLoggedIn');
    this.router.navigateByUrl('/login');
  }

  runCommand(cmd: string): void {
    console.log('Running command:', cmd);
    this.open(cmd.toLowerCase());
    this.cmdOpen = false;
  }

  // ========== FUN ZONE FUNKCIJE ==========

  // 1. Funkcija za veliku Student Fun Zone karticu - DODAJ OVO
  openStudentFunZone(): void {
    console.log('🎮 Opening Student Fun Zone...');
    // Direktno otvori HTML fajl u novom tabu
    window.open('/assets/modules/funzone/studentfunzone.html', '_blank');
    
    // ILI probaj ove putanje ako gornja ne radi:
    // window.open('/modules/funzone/studentfunzone.html', '_blank');
    // window.open('./modules/funzone/studentfunzone.html', '_blank');
    // window.location.href = '/assets/modules/funzone/studentfunzone.html';
  }

  // 2. Glavna Fun Zone funkcija - OTVARA HTML DIREKTNO
  openFunZone(): void {
    console.log('🎮 Opening Student Fun Zone HTML...');
    // Ovo je za staru malu karticu ako je ostaviš
    window.open('/assets/modules/funzone/studentfunzone.html', '_blank');
  }

  // 3. Opcionalno: test putanja
  testFunZonePath(): void {
    console.log('🔍 Testing Fun Zone path...');
    // Proveri da li fajl postoji
    fetch('/assets/modules/funzone/studentfunzone.html')
      .then(response => {
        if (response.ok) {
          console.log('✅ Fun Zone HTML found');
          this.openFunZone();
        } else {
          console.log('❌ Fun Zone HTML not found');
          // Probaj drugu putanju
          window.open('/modules/funzone/studentfunzone.html', '_blank');
        }
      })
      .catch(error => {
        console.error('Error checking Fun Zone:', error);
        // Probaj treću putanju
        window.open('./modules/funzone/studentfunzone.html', '_blank');
      });
  }
}