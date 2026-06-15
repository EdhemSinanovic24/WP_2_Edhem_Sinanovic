import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private router: Router) {}

  debugLocalStorage(): void {
    console.log('=== DEBUG LOCALSTORAGE ===');
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key || '');
      console.log(`${key}:`, value);
    }
    console.log('=== END DEBUG ===');
  }

  submit(): void {
    this.debugLocalStorage();
    this.error = '';
    
    if (!this.email.trim() || !this.password.trim()) {
      this.error = 'Please fill in all fields';
      return;
    }
    
    this.loading = true;
    
    const userData = localStorage.getItem('user');
    
    console.log('Looking for user with email:', this.email);
    console.log('User data in localStorage:', userData);
    
    if (!userData) {
      setTimeout(() => {
        this.error = 'No account found. Please register first.';
        this.loading = false;
        console.log('❌ No user found in localStorage');
      }, 1000);
      return;
    }
    
    setTimeout(() => {
      try {
        const user = JSON.parse(userData);
        
        console.log('Stored user:', user);
        console.log('Login attempt - Input:', {
          email: this.email,
          password: this.password
        });
        console.log('Login attempt - Stored:', {
          email: user.email,
          password: user.password
        });
        
        const emailMatch = user.email.toLowerCase() === this.email.toLowerCase();
        const passwordMatch = user.password === this.password;
        
        console.log('Match results:', { emailMatch, passwordMatch });
        
        if (emailMatch && passwordMatch) {
          console.log('✅ Login successful! Setting auth flags...');
          
          sessionStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('loggedIn', 'true');
          
          const userInfo = {
            email: this.email,
            name: user.name || 'User'
          };
          
          sessionStorage.setItem('currentUser', JSON.stringify(userInfo));
          localStorage.setItem('currentUser', JSON.stringify(userInfo));
          
          console.log('✅ Auth flags set:', {
            isLoggedIn: localStorage.getItem('isLoggedIn'),
            loggedIn: localStorage.getItem('loggedIn'),
            currentUser: localStorage.getItem('currentUser')
          });
          
          console.log('Current route:', window.location.pathname);
          
          this.loading = false;
          
          console.log('🔄 FORCING redirect to /dashboard using window.location');
          
          setTimeout(() => {
            console.log('Executing window.location.href = /dashboard');
            window.location.href = '/dashboard';
          }, 100);
          
        } else {
          this.error = 'Invalid email or password';
          this.loading = false;
          console.log('❌ Login failed - credentials do not match');
        }
      } catch (e) {
        console.error('Error parsing user data:', e);
        this.error = 'Account data error';
        this.loading = false;
        localStorage.removeItem('user');
      }
    }, 1000);
  }

  goRegister(): void {
    this.router.navigate(['/register']);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
  
  clearAllStorage(): void {
    localStorage.clear();
    sessionStorage.clear();
    console.log('🧹 All storage cleared');
    this.router.navigate(['/login']);
  }

  backToHome(): void {
    console.log('🔙 Going back to main IPI website...');
    
    const possiblePorts = [5500, 3000, 8080, 8000, 5501];
    const protocols = ['http://', 'https://'];
    const baseHost = 'localhost';
    
    const defaultUrl = 'http://localhost:5500/index.html';
    
    console.log(`🔄 Redirecting to main website: ${defaultUrl}`);
    
    window.open(defaultUrl, '_blank');
  }

  testMainSite(): void {
    console.log('🔍 Testing main site location...');
    
    const testUrls = [
      'http://localhost:5500/index.html',
      'http://127.0.0.1:5500/index.html',
      'http://localhost:3000/index.html',
      'http://localhost:8080/index.html'
    ];
    
    testUrls.forEach(url => {
      fetch(url, { method: 'HEAD' })
        .then(response => {
          console.log(`${url}: ${response.ok ? '✅ FOUND' : '❌ NOT FOUND'}`);
        })
        .catch(() => {
          console.log(`${url}: ❌ ERROR`);
        });
    });
  }
}