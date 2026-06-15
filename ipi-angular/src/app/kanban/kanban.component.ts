import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  id: string;
  text: string;
  date: string;
}

interface Column {
  id: string;
  title: string;
  colorClass: string;
  tasks: Task[];
}

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit, OnDestroy, AfterViewInit {

  showEmailPopup = false;
  targetEmail = '';
  draggedTaskId: string | null = null;
  draggedFromColumnId: string | null = null;

  columns: Column[] = [
    { id: 'todo',       title: 'To Do',       colorClass: 'color-todo',     tasks: [] },
    { id: 'inprogress', title: 'In Progress',  colorClass: 'color-progress', tasks: [] },
    { id: 'done',       title: 'Done',         colorClass: 'color-done',     tasks: [] },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadBoard();
    document.body.style.backgroundColor = '#1a3a7c';
    document.body.style.margin = '0';
  }

  ngOnDestroy(): void {
    document.body.style.backgroundColor = '';
    document.body.style.margin = '';
  }

  ngAfterViewInit(): void {}

  goBack(): void {
    this.router.navigateByUrl('/student-funzone');
  }

  // ---- Task CRUD ----

  addTask(): void {
    const col = this.columns.find(c => c.id === 'todo')!;
    col.tasks.push({
      id: 'task-' + Date.now(),
      text: 'Klikni ovdje da izmijeniš tekst zadatka...',
      date: new Date().toLocaleDateString('bs')
    });
    this.saveBoard();
  }

  deleteTask(columnId: string, taskId: string): void {
    const col = this.columns.find(c => c.id === columnId)!;
    col.tasks = col.tasks.filter(t => t.id !== taskId);
    this.saveBoard();
  }

  onTextBlur(task: Task): void {
    this.saveBoard();
  }

  clearBoard(): void {
    if (confirm('Da li ste sigurni da želite obrisati sve zadatke sa ploče?')) {
      this.columns.forEach(c => c.tasks = []);
      localStorage.removeItem('ipiKanbanState');
    }
  }

  // ---- Drag & Drop ----

  onDragStart(taskId: string, columnId: string): void {
    this.draggedTaskId = taskId;
    this.draggedFromColumnId = columnId;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent, targetColumnId: string): void {
    event.preventDefault();
    if (!this.draggedTaskId || !this.draggedFromColumnId) return;
    if (this.draggedFromColumnId === targetColumnId) return;

    const fromCol = this.columns.find(c => c.id === this.draggedFromColumnId)!;
    const toCol   = this.columns.find(c => c.id === targetColumnId)!;
    const task    = fromCol.tasks.find(t => t.id === this.draggedTaskId)!;

    fromCol.tasks = fromCol.tasks.filter(t => t.id !== this.draggedTaskId);
    toCol.tasks.push(task);

    this.draggedTaskId = null;
    this.draggedFromColumnId = null;
    this.saveBoard();
  }

  // ---- localStorage ----

  saveBoard(): void {
    const state = this.columns.map(c => ({ columnId: c.id, tasks: c.tasks }));
    localStorage.setItem('ipiKanbanState', JSON.stringify(state));
  }

  loadBoard(): void {
    const data = localStorage.getItem('ipiKanbanState');
    if (!data) return;
    const state: { columnId: string; tasks: Task[] }[] = JSON.parse(data);
    state.forEach(s => {
      const col = this.columns.find(c => c.id === s.columnId);
      if (col) col.tasks = s.tasks;
    });
  }

  // ---- Export PNG ----

  saveAsPng(): void {
    const board = document.getElementById('kanbanBoard');
    if (!board) return;
    (window as any).html2canvas(board, { backgroundColor: '#0f172a' }).then((canvas: HTMLCanvasElement) => {
      const link = document.createElement('a');
      link.download = 'kanban-izvjestaj.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }

  saveAsPdf(): void {
    const board = document.getElementById('kanbanBoard');
    if (!board) return;
    const opt = {
      margin: 10,
      filename: 'kanban-izvjestaj.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, backgroundColor: '#0f172a' },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };
    (window as any).html2pdf().set(opt).from(board).save();
  }

  // ---- Email ----

  toggleEmailPopup(): void {
    this.showEmailPopup = !this.showEmailPopup;
  }

  sendEmail(): void {
    if (!this.targetEmail) {
      alert('Molimo unesite validnu e-mail adresu!');
      return;
    }
    let mailBody = 'Moj trenutni Kanban Izvještaj:\n\n';
    this.columns.forEach(col => {
      mailBody += `--- ${col.title} ---\n`;
      if (col.tasks.length === 0) mailBody += '(Nema zadataka)\n';
      col.tasks.forEach((t, i) => { mailBody += `${i + 1}. ${t.text}\n`; });
      mailBody += '\n';
    });
    const subject = encodeURIComponent('IPI Kanban Ploča - Izvještaj zadataka');
    const body    = encodeURIComponent(mailBody);
    window.location.href = `mailto:${this.targetEmail}?subject=${subject}&body=${body}`;
    this.toggleEmailPopup();
  }
}
