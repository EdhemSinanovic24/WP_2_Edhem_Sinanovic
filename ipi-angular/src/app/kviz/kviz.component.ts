import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface QuizItem {
  question: string;
  options: string[];
  correct: number;
}

@Component({
  selector: 'app-kviz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kviz.component.html',
  styleUrl: './kviz.component.css'
})
export class KvizComponent {

  quizData: QuizItem[] = [
    {
      question: "Koji CSS property koristimo da postavimo element u sredinu horizontalno koristeći Flexbox?",
      options: [
        "align-items: center",
        "justify-content: center",
        "text-align: center",
        "margin: center"
      ],
      correct: 1
    },
    {
      question: "Što je 'callback funkcija' u JavaScriptu?",
      options: [
        "Funkcija koja se poziva sama od sebe rekurzivno",
        "Funkcija koja vraća broj kao rezultat",
        "Funkcija koja se proslijeđuje kao argument drugoj funkciji",
        "Funkcija koja briše podatke iz memorije"
      ],
      correct: 2
    },
    {
      question: "Koji HTTP status kod označava da je resurs uspješno kreiran na serveru?",
      options: [
        "200 OK",
        "301 Moved Permanently",
        "404 Not Found",
        "201 Created"
      ],
      correct: 3
    },
    {
      question: "Koja je razlika između '==' i '===' u JavaScriptu?",
      options: [
        "Nema razlike, oba operatora rade identično",
        "'===' provjerava i tip i vrijednost, '==' samo vrijednost",
        "'==' provjerava i tip i vrijednost, '===' samo vrijednost",
        "'===' se koristi samo za stringove"
      ],
      correct: 1
    },
    {
      question: "Što označava pojam 'responsive design' u web razvoju?",
      options: [
        "Web stranica koja se brzo učitava",
        "Web stranica koja šalje email odgovore automatski",
        "Web stranica koja mijenja izgled ovisno o veličini ekrana uređaja",
        "Web stranica koja koristi animacije i tranzicije"
      ],
      correct: 2
    }
  ];

  currentQuestion = 0;
  score = 0;
  selectedIndex: number | null = null;
  answered = false;
  showResults = false;

  get progressPercent(): number {
    if (this.showResults) return 100;
    return (this.currentQuestion / this.quizData.length) * 100;
  }

  get currentQuizItem(): QuizItem {
    return this.quizData[this.currentQuestion];
  }

  get resultPercent(): number {
    return Math.round((this.score / this.quizData.length) * 100);
  }

  selectOption(index: number): void {
    if (this.answered) return;

    this.selectedIndex = index;
    this.answered = true;

    if (index === this.currentQuizItem.correct) {
      this.score++;
    }
  }

  nextQuestion(): void {
    this.currentQuestion++;
    this.selectedIndex = null;
    this.answered = false;

    if (this.currentQuestion >= this.quizData.length) {
      this.showResults = true;
    }
  }

  restart(): void {
    this.currentQuestion = 0;
    this.score = 0;
    this.selectedIndex = null;
    this.answered = false;
    this.showResults = false;
  }
}
