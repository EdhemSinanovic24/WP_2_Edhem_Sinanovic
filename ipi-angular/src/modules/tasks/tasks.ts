import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

type Priority = 'Nizak' | 'Srednji' | 'Visok';

interface ProjectTask {
  id: number;
  title: string;
  project: string;
  priority: Priority;
  done: boolean;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.css']
})
export class TasksComponent implements OnInit {

  tasks: ProjectTask[] = [];
  newTitle = '';
  newProject = '';
  newPriority: Priority = 'Srednji';
  priorities: Priority[] = ['Nizak', 'Srednji', 'Visok'];
  message = '';

  ngOnInit() {
    const saved = localStorage.getItem('project_tasks');
    if (saved) {
      try {
        this.tasks = JSON.parse(saved);
      } catch {
        this.tasks = [];
      }
    }
    this.updateMessage();
  }

  addTask() {
    if (!this.newTitle.trim()) return;
    this.tasks.push({
      id: Date.now(),
      title: this.newTitle.trim(),
      project: this.newProject.trim() || 'Opšte',
      priority: this.newPriority,
      done: false
    });
    this.newTitle = '';
    this.newProject = '';
    this.newPriority = 'Srednji';
    this.save();
  }

  toggleDone(t: ProjectTask) {
    t.done = !t.done;
    this.save();
  }

  removeTask(t: ProjectTask) {
    this.tasks = this.tasks.filter(x => x.id !== t.id);
    this.save();
  }

  clearCompleted() {
    this.tasks = this.tasks.filter(t => !t.done);
    this.save();
  }

  clearAll() {
    this.tasks = [];
    this.save();
  }

  completedCount(): number {
    return this.tasks.filter(t => t.done).length;
  }

  percent(): number {
    if (this.tasks.length === 0) return 0;
    return Math.round((this.completedCount() / this.tasks.length) * 100);
  }

  priorityClass(p: Priority): string {
    if (p === 'Visok') return 'high';
    if (p === 'Srednji') return 'mid';
    return 'low';
  }

  save() {
    localStorage.setItem('project_tasks', JSON.stringify(this.tasks));
    this.updateMessage();
  }

  updateMessage() {
    if (this.tasks.length === 0) {
      this.message = 'Dodaj svoj prvi zadatak ili projekat 🗂️';
      return;
    }
    const p = this.percent();
    if (p === 0) this.message = 'Vrijeme za akciju – počni s prvim zadatkom 🚀';
    else if (p < 50) this.message = 'Dobar napredak, nastavi tako!';
    else if (p < 100) this.message = 'Skoro gotovo, samo malo još 🔥';
    else this.message = 'Svi zadaci završeni! Odlično obavljen posao 🎉';
  }
}
