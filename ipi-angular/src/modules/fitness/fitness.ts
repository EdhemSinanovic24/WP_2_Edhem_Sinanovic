import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Workout {
  id: number;
  name: string;
  type: string;
  duration: number; // minutes
  done: boolean;
}

@Component({
  selector: 'app-fitness',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './fitness.html',
  styleUrls: ['./fitness.css']
})
export class FitnessComponent implements OnInit {

  workouts: Workout[] = [];
  newName = '';
  newType = 'Yoga';
  newDuration = 20;
  types = ['Yoga', 'Cardio', 'Snaga', 'Stretching', 'Hodanje', 'Ostalo'];
  dailyGoalMinutes = 30;
  message = '';

  ngOnInit() {
    const saved = localStorage.getItem('fitness_workouts');
    if (saved) {
      try {
        this.workouts = JSON.parse(saved);
      } catch {
        this.workouts = [];
      }
    }
    const goal = localStorage.getItem('fitness_goal');
    if (goal) this.dailyGoalMinutes = Number(goal);
    this.updateMessage();
  }

  addWorkout() {
    if (!this.newName.trim()) return;
    this.workouts.push({
      id: Date.now(),
      name: this.newName.trim(),
      type: this.newType,
      duration: this.newDuration || 10,
      done: false
    });
    this.newName = '';
    this.newDuration = 20;
    this.save();
  }

  toggleDone(w: Workout) {
    w.done = !w.done;
    this.save();
  }

  removeWorkout(w: Workout) {
    this.workouts = this.workouts.filter(x => x.id !== w.id);
    this.save();
  }

  clearAll() {
    this.workouts = [];
    this.save();
  }

  completedMinutes(): number {
    return this.workouts.filter(w => w.done).reduce((sum, w) => sum + w.duration, 0);
  }

  percent(): number {
    if (this.dailyGoalMinutes <= 0) return 0;
    return Math.min(100, Math.round((this.completedMinutes() / this.dailyGoalMinutes) * 100));
  }

  save() {
    localStorage.setItem('fitness_workouts', JSON.stringify(this.workouts));
    localStorage.setItem('fitness_goal', this.dailyGoalMinutes.toString());
    this.updateMessage();
  }

  updateMessage() {
    const p = this.percent();
    if (this.workouts.length === 0) this.message = 'Dodaj svoju prvu vježbu za danas 🧘';
    else if (p === 0) this.message = 'Vrijeme za pokret – tijelo ti zahvaljuje 💪';
    else if (p < 50) this.message = 'Dobar ritam, nastavi dalje!';
    else if (p < 100) this.message = 'Skoro si na cilju, još malo 🔥';
    else this.message = 'Sjajno! Dnevni cilj aktivnosti ostvaren 🎉';
  }
}
