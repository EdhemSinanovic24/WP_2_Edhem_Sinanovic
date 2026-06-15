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
    { key: 'study', label: 'Study Planner', icon: '📚' },
    { key: 'fitness', label: 'Yoga/Fitness', icon: '🧘' },
    { key: 'tasks', label: 'Task/Project', icon: '✅' },
    { key: 'finance', label: 'Finance', icon: '💰' },
    { key: 'gratitude', label: 'Gratitude Journal', icon: '🙏' },
    { key: 'reflection', label: 'Daily Reflection', icon: '📝' },
  ];

  constructor(private router: Router) {
    console.log('🔍 Dashboard constructor - checking login...');
    
    const loggedIn = localStorage.getItem('loggedIn');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    console.log('loggedIn:', loggedIn);
    console.log('isLoggedIn:', isLoggedIn);
    
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
    
    if (module === 'funzone') {
      this.openStudentFunZone();
    } else {
      this.router.navigateByUrl('/dashboard/' + module);
    }
  }

  logout(): void {
    console.log('Logging out...');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login');
  }

  runCommand(cmd: string): void {
    console.log('Running command:', cmd);
    this.open(cmd.toLowerCase());
    this.cmdOpen = false;
  }

  // ✅ POPRAVLJENO: Koristi Angular router umjesto window.open
  openStudentFunZone(): void {
    console.log('🎮 Opening Student Fun Zone...');
    this.router.navigateByUrl('/student-funzone');
  }
}
