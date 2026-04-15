import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  { 
    path: 'dashboard', 
    loadComponent: () => import('../dashboard/dashboard')
      .then(m => {
        console.log('Dashboard module loaded successfully');
        return m.DashboardComponent;
      })
      .catch(error => {
        console.error('Failed to load dashboard:', error);
        return {
          template: '<h1>Dashboard Loading Error</h1><p>Component not found</p>',
          styles: ['']
        } as any;
      })
  },
  
  { 
    path: 'dashboard/habit', 
    loadComponent: () => import('../modules/habit/habit')
      .then(m => {
        console.log('Habit module loaded successfully');
        return m.HabitComponent;
      })
      .catch(error => {
        console.error('Failed to load habit:', error);
        return {
          template: '<h1>Habit Loading Error</h1>',
          styles: ['']
        } as any;
      })
  },
  
  { 
    path: 'dashboard/sleep', 
    loadComponent: () => import('../modules/sleep/sleep')
      .then(m => {
        console.log('Sleep module loaded successfully');
        return m.SleepComponent;
      })
      .catch(error => {
        console.error('Failed to load sleep:', error);
        return {
          template: '<h1>Sleep Loading Error</h1>',
          styles: ['']
        } as any;
      })
  },
  
  { 
    path: 'dashboard/mood', 
    loadComponent: () => import('../modules/mood/mood')
      .then(m => {
        console.log('Mood module loaded successfully');
        return m.MoodComponent;
      })
      .catch(error => {
        console.error('Failed to load mood:', error);
        return {
          template: '<h1>Mood Loading Error</h1>',
          styles: ['']
        } as any;
      })
  },
  
  { 
    path: 'dashboard/meal', 
    loadComponent: () => import('../modules/meal/meal')
      .then(m => {
        console.log('Meal module loaded successfully');
        return m.MealComponent;
      })
      .catch(error => {
        console.error('Failed to load meal:', error);
        return {
          template: '<h1>Meal Loading Error</h1>',
          styles: ['']
        } as any;
      })
  },
  
  { 
    path: 'dashboard/calendar', 
    loadComponent: () => import('../modules/calendar/calendar')
      .then(m => {
        console.log('Calendar module loaded successfully');
        return m.CalendarComponent;
      })
      .catch(error => {
        console.error('Failed to load calendar:', error);
        return {
          template: '<h1>Calendar Loading Error</h1>',
          styles: ['']
        } as any;
      })
  },
  
  { 
    path: 'dashboard/water', 
    loadComponent: () => import('../modules/water/water')
      .then(m => {
        console.log('Water module loaded successfully');
        return m.WaterComponent;
      })
      .catch(error => {
        console.error('Failed to load water:', error);
        return {
          template: '<h1>Water Loading Error</h1>',
          styles: ['']
        } as any;
      })
  },
  
  // ISPRAVLJENA RUTA ZA STUDENT FUN ZONE
  { 
    path: 'studentfunzone.html', 
    redirectTo: 'student-funzone',
    pathMatch: 'full'
  },
  
  { 
    path: 'student-funzone', 
    loadComponent: () => Promise.resolve({
      template: `
        <div style="
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #000428 0%, #004e92 100%);
          color: white;
          font-family: 'Inter', system-ui, sans-serif;
          overflow-y: auto;
        ">
          <!-- Back Button -->
          <button 
            onclick="history.back()"
            style="
              position: fixed;
              top: 25px;
              left: 25px;
              z-index: 100;
              padding: 12px 24px;
              background: rgba(255,255,255,0.15);
              border: 2px solid rgba(255,255,255,0.3);
              color: white;
              border-radius: 12px;
              cursor: pointer;
              font-weight: 600;
              font-size: 16px;
              backdrop-filter: blur(10px);
              transition: all 0.3s;
            "
            onmouseover="this.style.background='rgba(255,255,255,0.25)'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.3)';"
            onmouseout="this.style.background='rgba(255,255,255,0.15)'; this.style.transform='translateY(0)'; this.style.boxShadow='none';"
          >
            ⬅ Nazad na Dashboard
          </button>
          
          <div style="
            max-width: 1200px;
            margin: 0 auto;
            padding: 100px 40px 60px;
          ">
            <!-- Header -->
            <div style="
              text-align: center;
              margin-bottom: 60px;
            ">
              <h1 style="
                font-size: 56px;
                font-weight: 900;
                margin: 0 0 15px 0;
                background: linear-gradient(135deg, #00d4ff 0%, #0080ff 50%, #0044ff 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                letter-spacing: -1px;
              ">
                🎮 Student Fun Zone
              </h1>
              <p style="
                font-size: 22px;
                opacity: 0.9;
                margin: 0;
              ">
                Bingo • Kviz • Whiteboard • Kanban • Vision Board
              </p>
            </div>
            
            <!-- Tools Grid -->
            <div style="
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
              gap: 35px;
              margin-bottom: 70px;
            ">
              ${['🎯 Bingo', '❓ Kviz', '📋 Whiteboard', '📊 Kanban', '🌈 Vision Board']
                .map(tool => {
                  const [emoji, name] = tool.split(' ');
                  return `
                    <div style="
                      background: rgba(255,255,255,0.07);
                      border-radius: 24px;
                      padding: 35px 25px;
                      text-align: center;
                      cursor: pointer;
                      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                      border: 1px solid rgba(255,255,255,0.12);
                      backdrop-filter: blur(15px);
                      position: relative;
                      overflow: hidden;
                    "
                    onmouseover="
                      this.style.transform='translateY(-15px) scale(1.03)';
                      this.style.background='rgba(255,255,255,0.12)';
                      this.style.borderColor='rgba(0,212,255,0.5)';
                      this.style.boxShadow='0 25px 60px rgba(0,0,0,0.4)';
                      this.querySelector('.tool-icon').style.transform='scale(1.2) rotate(10deg)';
                    "
                    onmouseout="
                      this.style.transform='translateY(0) scale(1)';
                      this.style.background='rgba(255,255,255,0.07)';
                      this.style.borderColor='rgba(255,255,255,0.12)';
                      this.style.boxShadow='none';
                      this.querySelector('.tool-icon').style.transform='scale(1) rotate(0deg)';
                    "
                    onclick="alert('\\${name} će biti dostupno uskoro! 🚀')"
                    >
                      <div class="tool-icon" style="
                        font-size: 64px;
                        margin-bottom: 25px;
                        transition: all 0.4s;
                        filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));
                      ">${emoji}</div>
                      <h3 style="
                        font-size: 28px;
                        font-weight: 800;
                        margin-bottom: 15px;
                        color: #80ffff;
                        letter-spacing: 0.5px;
                      ">${name}</h3>
                      <p style="
                        opacity: 0.85;
                        line-height: 1.6;
                        font-size: 16px;
                        margin: 0;
                        padding: 0 10px;
                      ">${name === 'Bingo' ? 'Kreiraj custom bingo kartice za zabavno učenje' :
                         name === 'Kviz' ? 'Testiraj znanje sa interaktivnim kvizovima' :
                         name === 'Whiteboard' ? 'Digitalna tabla za beleške, skiciranje i brainstorming' :
                         name === 'Kanban' ? 'Organizuj zadatke i projekte sa tablom' :
                         'Vizuelizuj ciljeve i motivaciju sa inspiracijama'}</p>
                    </div>
                  `;
                }).join('')}
            </div>
            
            <!-- Coming Soon Message -->
            <div style="
              background: linear-gradient(135deg, rgba(255,193,7,0.15), rgba(255,107,107,0.15));
              border: 2px solid rgba(255,193,7,0.4);
              border-radius: 24px;
              padding: 50px;
              text-align: center;
              position: relative;
              overflow: hidden;
            ">
              <div style="
                position: absolute;
                top: 10px;
                right: 10px;
                font-size: 80px;
                opacity: 0.2;
              ">🚧</div>
              
              <h2 style="
                font-size: 36px;
                margin-bottom: 20px;
                color: #ffd700;
                font-weight: 800;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 15px;
              ">
                <span>🚀</span> U Pripremi
              </h2>
              
              <p style="
                font-size: 20px;
                opacity: 0.95;
                max-width: 700px;
                margin: 0 auto 30px;
                line-height: 1.7;
              ">
                <strong>Student Fun Zone</strong> je trenutno u punom razvoju!<br>
                Radimo na implementaciji svih zabavnih alata koji će učiniti učenje još zanimljivijim.
              </p>
              
              <div style="
                display: flex;
                flex-wrap: wrap;
                gap: 15px;
                justify-content: center;
                margin-top: 30px;
              ">
                <button 
                  onclick="history.back()"
                  style="
                    padding: 16px 40px;
                    background: linear-gradient(135deg, #00d4ff, #0080ff);
                    color: white;
                    border: none;
                    border-radius: 16px;
                    font-size: 18px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s;
                    flex: 1;
                    max-width: 300px;
                  "
                  onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 20px 40px rgba(0,212,255,0.4)';"
                  onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
                >
                  Vrati se na Dashboard
                </button>
                
                <button 
                  onclick="alert('Pratite nas za najnovije informacije! 📢')"
                  style="
                    padding: 16px 40px;
                    background: rgba(255,255,255,0.1);
                    border: 2px solid rgba(255,255,255,0.3);
                    color: white;
                    border-radius: 16px;
                    font-size: 18px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s;
                    flex: 1;
                    max-width: 300px;
                  "
                  onmouseover="this.style.background='rgba(255,255,255,0.2)'; this.style.transform='translateY(-3px)';"
                  onmouseout="this.style.background='rgba(255,255,255,0.1)'; this.style.transform='translateY(0)';"
                >
                  Obavijesti me
                </button>
              </div>
              
              <div style="
                margin-top: 40px;
                padding-top: 30px;
                border-top: 1px solid rgba(255,255,255,0.1);
              ">
                <p style="opacity: 0.7; font-size: 14px; margin: 0;">
                  ⏳ Očekivano lansiranje: <strong>Uskoro 2024</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      `,
      styles: ['']
    })
  },
  
  { path: '**', redirectTo: 'login' }
];