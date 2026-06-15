import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface GratitudeEntry {
  id: number;
  text: string;
  date: string;
}

@Component({
  selector: 'app-gratitude',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './gratitude.html',
  styleUrls: ['./gratitude.css']
})
export class GratitudeComponent implements OnInit {

  entries: GratitudeEntry[] = [];
  newEntry = '';
  dailyGoal = 3;
  message = '';

  ngOnInit() {
    const saved = localStorage.getItem('gratitude_entries');
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

  todaysEntries(): GratitudeEntry[] {
    return this.entries.filter(e => e.date === this.todayKey);
  }

  addEntry() {
    if (!this.newEntry.trim()) return;
    this.entries.unshift({
      id: Date.now(),
      text: this.newEntry.trim(),
      date: this.todayKey
    });
    this.newEntry = '';
    this.save();
  }

  removeEntry(e: GratitudeEntry) {
    this.entries = this.entries.filter(x => x.id !== e.id);
    this.save();
  }

  clearAll() {
    this.entries = [];
    this.save();
  }

  percent(): number {
    if (this.dailyGoal <= 0) return 0;
    return Math.min(100, Math.round((this.todaysEntries().length / this.dailyGoal) * 100));
  }

  save() {
    localStorage.setItem('gratitude_entries', JSON.stringify(this.entries));
    this.updateMessage();
  }

  updateMessage() {
    const count = this.todaysEntries().length;
    if (count === 0) this.message = 'Na čemu si danas zahvalan/na? 🙏';
    else if (count < this.dailyGoal) this.message = 'Lijepo! Nastavi nizati zahvalnost';
    else this.message = 'Bravo! Dnevni cilj zahvalnosti ostvaren 🌟';
  }
}
