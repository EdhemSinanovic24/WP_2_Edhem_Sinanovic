import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  theme = 'dark';
  error = '';
  loading = false;
  passwordStrength = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    const sessionLoggedIn = sessionStorage.getItem('isLoggedIn');
    const localLoggedIn = localStorage.getItem('isLoggedIn');
    const loggedIn = localStorage.getItem('loggedIn');
    
    const isLoggedIn = (sessionLoggedIn === 'true') || 
                       (localLoggedIn === 'true') || 
                       (loggedIn === 'true');
    
    if (isLoggedIn) {
      console.log('⚠️ User is already logged in, but staying on register page');
    }
  }

  submit(): void {
    this.error = '';
    
    if (!this.name || !this.email || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.error = 'Please enter a valid email address';
      return;
    }
    
    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters long';
      return;
    }

    this.loading = true;

    setTimeout(() => {
      try {
        const userData = {
          name: this.name,
          email: this.email,
          password: this.password,
          theme: this.theme,
          registeredAt: new Date().toISOString()
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('✅ Registration successful! User saved:', userData);
        
        this.loading = false;
        this.showSuccessMessage();
        
        this.name = '';
        this.email = '';
        this.password = '';
        this.passwordStrength = 0;
        
        setTimeout(() => {
          console.log('🔄 Redirecting to LOGIN page...');
          this.router.navigate(['/login'])
            .then(success => {
              if (!success) {
                window.location.href = '/login';
              }
            })
            .catch(error => {
              window.location.href = '/login';
            });
        }, 2000);
        
      } catch (error) {
        console.error('❌ Registration error:', error);
        this.error = 'An error occurred during registration';
        this.loading = false;
      }
    }, 1000);
  }

  private showSuccessMessage(): void {
    const successElement = document.createElement('div');
    successElement.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
      ">
        Registration successful! Redirecting to login...
      </div>
    `;
    document.body.appendChild(successElement);
    
    setTimeout(() => {
      if (successElement.parentNode) {
        successElement.parentNode.removeChild(successElement);
      }
    }, 2000);
    
    if (!document.querySelector('#success-animation')) {
      const style = document.createElement('style');
      style.id = 'success-animation';
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  goLogin(): void {
    console.log('🔗 Going to login page...');
    this.router.navigate(['/login']);
  }

  goBack(): void {
    console.log('🔙 Going back...');
    this.router.navigate(['/']);
  }

  checkPasswordStrength(): void {
    if (!this.password) {
      this.passwordStrength = 0;
      return;
    }

    let strength = 0;
    if (this.password.length >= 8) strength += 25;
    if (/[A-Z]/.test(this.password)) strength += 25;
    if (/[0-9]/.test(this.password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(this.password)) strength += 25;
    
    this.passwordStrength = strength;
  }

  getStrengthText(): string {
    if (this.passwordStrength < 25) return 'Weak';
    if (this.passwordStrength < 50) return 'Fair';
    if (this.passwordStrength < 75) return 'Good';
    return 'Strong';
  }

  clearLoginStatus(): void {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('user');
    console.log('🧹 All login status cleared');
    alert('Login status cleared! Now you can register properly.');
  }
  
  forceClearAndRegister(): void {
    console.log('💣 Force clearing everything...');
    sessionStorage.clear();
    localStorage.clear();
    this.name = '';
    this.email = '';
    this.password = '';
    this.passwordStrength = 0;
    this.error = '';
    console.log('✅ Everything cleared. You can now register.');
    alert('Everything cleared! Refresh the page and try registering again.');
  }
}