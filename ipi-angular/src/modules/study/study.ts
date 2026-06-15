import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface StudyTask {
  id: number;
  subject: string;
  topic: string;
  duration: number; // minutes
  done: boolean;
}

@Component({
  selector: 'app-study',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './study.html',
  styleUrls: ['./study.css']
})
export class StudyComponent implements OnInit {

  tasks: StudyTask[] = [];
  newSubject = '';
  newTopic = '';
  newDuration = 30;
  dailyGoalMinutes = 120;
  message = '';

  ngOnInit() {
    const saved = localStorage.getItem('study_tasks');
    if (saved) {
      try {
        this.tasks = JSON.parse(saved);
      } catch {
        this.tasks = [];
      }
    }
    const goal = localStorage.getItem('study_goal');
    if (goal) this.dailyGoalMinutes = Number(goal);
    this.updateMessage();
  }

  addTask() {
    if (!this.newSubject.trim()) return;
    this.tasks.push({
      id: Date.now(),
      subject: this.newSubject.trim(),
      topic: this.newTopic.trim(),
      duration: this.newDuration || 30,
      done: false
    });
    this.newSubject = '';
    this.newTopic = '';
    this.newDuration = 30;
    this.save();
  }

  toggleDone(task: StudyTask) {
    task.done = !task.done;
    this.save();
  }

  removeTask(task: StudyTask) {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
    this.save();
  }

  clearAll() {
    this.tasks = [];
    this.save();
  }

  totalPlannedMinutes(): number {
    return this.tasks.reduce((sum, t) => sum + t.duration, 0);
  }

  completedMinutes(): number {
    return this.tasks.filter(t => t.done).reduce((sum, t) => sum + t.duration, 0);
  }

  percent(): number {
    if (this.dailyGoalMinutes <= 0) return 0;
    return Math.min(100, Math.round((this.completedMinutes() / this.dailyGoalMinutes) * 100));
  }

  save() {
    localStorage.setItem('study_tasks', JSON.stringify(this.tasks));
    localStorage.setItem('study_goal', this.dailyGoalMinutes.toString());
    this.updateMessage();
  }

  updateMessage() {
    const p = this.percent();
    if (this.tasks.length === 0) this.message = 'Dodaj svoj prvi zadatak za učenje 📖';
    else if (p === 0) this.message = 'Vrijeme je da počneš s učenjem 💪';
    else if (p < 50) this.message = 'Dobar početak, nastavi tako!';
    else if (p < 100) this.message = 'Skoro gotovo, ostani fokusiran 🔥';
    else this.message = 'Bravo! Dnevni cilj učenja ostvaren 🎉';
  }
}
