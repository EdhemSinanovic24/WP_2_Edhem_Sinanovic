import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: 'income' | 'expense';
}

@Component({
  selector: 'app-finance',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './finance.html',
  styleUrls: ['./finance.css']
})
export class FinanceComponent implements OnInit {

  transactions: Transaction[] = [];
  newTitle = '';
  newAmount = 0;
  newType: 'income' | 'expense' = 'expense';
  monthlyBudget = 500;
  message = '';

  ngOnInit() {
    const saved = localStorage.getItem('finance_transactions');
    if (saved) {
      try {
        this.transactions = JSON.parse(saved);
      } catch {
        this.transactions = [];
      }
    }
    const budget = localStorage.getItem('finance_budget');
    if (budget) this.monthlyBudget = Number(budget);
    this.updateMessage();
  }

  addTransaction() {
    if (!this.newTitle.trim() || !this.newAmount) return;
    this.transactions.push({
      id: Date.now(),
      title: this.newTitle.trim(),
      amount: Math.abs(this.newAmount),
      type: this.newType
    });
    this.newTitle = '';
    this.newAmount = 0;
    this.save();
  }

  removeTransaction(t: Transaction) {
    this.transactions = this.transactions.filter(x => x.id !== t.id);
    this.save();
  }

  clearAll() {
    this.transactions = [];
    this.save();
  }

  totalIncome(): number {
    return this.transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  }

  totalExpense(): number {
    return this.transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  }

  balance(): number {
    return this.totalIncome() - this.totalExpense();
  }

  budgetPercent(): number {
    if (this.monthlyBudget <= 0) return 0;
    return Math.min(100, Math.round((this.totalExpense() / this.monthlyBudget) * 100));
  }

  save() {
    localStorage.setItem('finance_transactions', JSON.stringify(this.transactions));
    localStorage.setItem('finance_budget', this.monthlyBudget.toString());
    this.updateMessage();
  }

  updateMessage() {
    const p = this.budgetPercent();
    if (this.transactions.length === 0) {
      this.message = 'Dodaj prvi prihod ili trošak 💰';
      return;
    }
    if (p < 50) this.message = 'Troškovi su pod kontrolom 👍';
    else if (p < 80) this.message = 'Pažljivo, približavaš se budžetu';
    else if (p < 100) this.message = 'Skoro si dostigao budžet ⚠️';
    else this.message = 'Budžet je prekoračen! Razmisli o troškovima';
  }
}
