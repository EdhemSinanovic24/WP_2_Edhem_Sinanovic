import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface ReflectionEntry {
  id: number;
  date: string;
  highlight: string;
  challenge: string;
  improvement: string;
  rating: number; // 1-5
}

@Component({
  selector: 'app-reflection',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reflection.html',
  styleUrls: ['./reflection.css']
})
export class ReflectionComponent implements OnInit {

  entries: ReflectionEntry[] = [];

  highlight = '';
  challenge = '';
  improvement = '';
  rating = 3;

  message = '';

  ngOnInit() {
    const saved = localStorage.getItem('reflection_entries');
    if (saved) {
      try {
        this.entries = JSON.parse(saved);
      } catch {
        this.entries = [];
      }
    }
    this.updateMessage();
  }

  get todayKey(): string {
    return new Date().toDateString();
  }

  hasTodayEntry(): boolean {
    return this.entries.some(e => e.date === this.todayKey);
  }

  saveEntry() {
    if (!this.highlight.trim() && !this.challenge.trim() && !this.improvement.trim()) return;

    // remove existing entry for today, allow overwrite
    this.entries = this.entries.filter(e => e.date !== this.todayKey);

    this.entries.unshift({
      id: Date.now(),
      date: this.todayKey,
      highlight: this.highlight.trim(),
      challenge: this.challenge.trim(),
      improvement: this.improvement.trim(),
      rating: this.rating
    });

    this.highlight = '';
    this.challenge = '';
    this.improvement = '';
    this.rating = 3;
    this.save();
  }

  removeEntry(e: ReflectionEntry) {
    this.entries = this.entries.filter(x => x.id !== e.id);
    this.save();
  }

  clearAll() {
    this.entries = [];
    this.save();
  }

  setRating(n: number) {
    this.rating = n;
  }

  save() {
    localStorage.setItem('reflection_entries', JSON.stringify(this.entries));
    this.updateMessage();
  }

  updateMessage() {
    if (this.entries.length === 0) {
      this.message = 'Kako je prošao tvoj dan? Zapiši refleksiju 📝';
      return;
    }
    if (this.hasTodayEntry()) this.message = 'Današnja refleksija je sačuvana ✅';
    else this.message = 'Nisi još zapisao refleksiju za danas';
  }
}
