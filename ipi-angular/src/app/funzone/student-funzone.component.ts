import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-funzone',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="funzone-wrapper">
      <button class="back-btn" (click)="goBack()">⬅ Nazad na Dashboard</button>

      <div class="funzone-content">
        <!-- Header -->
        <div class="funzone-header">
          <h1 class="funzone-title">🎮 Student Fun Zone</h1>
          <p class="funzone-subtitle">Bingo • Kviz • Whiteboard • Kanban • Vision Board</p>
        </div>

        <!-- Tools Grid -->
        <div class="tools-grid">
          <div 
            class="tool-card" 
            *ngFor="let tool of tools"
            (click)="openTool(tool)"
          >
            <div class="tool-icon">{{ tool.icon }}</div>
            <h3 class="tool-name">{{ tool.name }}</h3>
            <p class="tool-desc">{{ tool.desc }}</p>
          </div>
        </div>

        <!-- Coming Soon -->
        <div class="coming-soon">
          <h2>🚀 U Razvoju</h2>
          <p>
            <strong>Student Fun Zone</strong> je trenutno u punom razvoju!
            Radimo na implementaciji svih zabavnih alata.
          </p>
          <button class="back-btn-2" (click)="goBack()">Vrati se na Dashboard</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .funzone-wrapper {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(135deg, #000428 0%, #004e92 100%);
      color: white;
      font-family: 'Inter', system-ui, sans-serif;
      overflow-y: auto;
    }

    .back-btn {
      position: fixed;
      top: 25px; left: 25px;
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
    }

    .back-btn:hover {
      background: rgba(255,255,255,0.25);
      transform: translateY(-2px);
    }

    .funzone-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 100px 40px 60px;
    }

    .funzone-header {
      text-align: center;
      margin-bottom: 60px;
    }

    .funzone-title {
      font-size: 56px;
      font-weight: 900;
      margin: 0 0 15px 0;
      background: linear-gradient(135deg, #00d4ff 0%, #0080ff 50%, #0044ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .funzone-subtitle {
      font-size: 22px;
      opacity: 0.9;
      margin: 0;
    }

    .tools-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 30px;
      margin-bottom: 60px;
    }

    .tool-card {
      background: rgba(255,255,255,0.07);
      border-radius: 24px;
      padding: 35px 25px;
      text-align: center;
      cursor: pointer;
      transition: all 0.4s;
      border: 1px solid rgba(255,255,255,0.12);
      backdrop-filter: blur(15px);
    }

    .tool-card:hover {
      transform: translateY(-12px) scale(1.03);
      background: rgba(255,255,255,0.12);
      border-color: rgba(0,212,255,0.5);
      box-shadow: 0 25px 60px rgba(0,0,0,0.4);
    }

    .tool-icon {
      font-size: 60px;
      margin-bottom: 20px;
      transition: transform 0.4s;
    }

    .tool-card:hover .tool-icon {
      transform: scale(1.2) rotate(10deg);
    }

    .tool-name {
      font-size: 24px;
      font-weight: 800;
      margin-bottom: 12px;
      color: #80ffff;
    }

    .tool-desc {
      opacity: 0.85;
      line-height: 1.6;
      font-size: 15px;
      margin: 0;
    }

    .coming-soon {
      background: linear-gradient(135deg, rgba(255,193,7,0.15), rgba(255,107,107,0.15));
      border: 2px solid rgba(255,193,7,0.4);
      border-radius: 24px;
      padding: 50px;
      text-align: center;
    }

    .coming-soon h2 {
      font-size: 32px;
      color: #ffd700;
      margin-bottom: 20px;
    }

    .coming-soon p {
      font-size: 18px;
      opacity: 0.95;
      max-width: 600px;
      margin: 0 auto 30px;
      line-height: 1.7;
    }

    .back-btn-2 {
      padding: 16px 40px;
      background: linear-gradient(135deg, #00d4ff, #0080ff);
      color: white;
      border: none;
      border-radius: 16px;
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s;
    }

    .back-btn-2:hover {
      transform: translateY(-3px);
      box-shadow: 0 20px 40px rgba(0,212,255,0.4);
    }
  `]
})
export class StudentFunzoneComponent {

  tools = [
    { icon: '🎯', name: 'Bingo', desc: 'Kreiraj custom bingo kartice za zabavno učenje', route: '/student-funzone/bingo' },
    { icon: '❓', name: 'Kviz', desc: 'Testiraj znanje sa interaktivnim kvizovima', route: '/student-funzone/kviz' },
    { icon: '📋', name: 'Whiteboard', desc: 'Digitalna tabla za bilješke i brainstorming', route: '/student-funzone/whiteboard' },
    { icon: '📊', name: 'Kanban', desc: 'Organizuj zadatke i projekte sa tablom', route: '/student-funzone/kanban' },
    { icon: '🌈', name: 'Vision Board', desc: 'Vizuelizuj ciljeve i motivaciju', route: '/student-funzone/vision-board' },
  ];

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigateByUrl('/dashboard');
  }

  openTool(tool: { name: string; route?: string }): void {
    if (tool.route) {
      this.router.navigateByUrl(tool.route);
    } else {
      alert(`${tool.name} će biti dostupno uskoro! 🚀`);
    }
  }
}
