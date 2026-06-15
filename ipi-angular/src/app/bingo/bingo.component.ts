import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface QuizQuestion {
  q: string;
  a: string;
}

@Component({
  selector: 'app-bingo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bingo.component.html',
  styleUrl: './bingo.component.css'
})
export class BingoComponent {

  // Lista IT pojmova koji će se naći na Bingo ploči
  poolOfTerms: string[] = [
    "HTML", "CSS", "JavaScript", "SQL", "Git",
    "Java", "Python", "PHP", "Bootstrap", "Linux",
    "API", "JSON", "Canvas", "Local Storage", "HTTP",
    "GitHub", "Database", "Node.js", "DOM", "Array",
    "Variable", "Loop", "Function", "Button", "iframe"
  ];

  // Pitanja i tačni odgovori povezani sa pojmovima
  quizQuestions: QuizQuestion[] = [
    { q: "Koja platforma za hostovanje koda koristi Git i omogućava timsku saradnju na projektima putem repozitorija?", a: "GitHub" },
    { q: "Koja server-side JavaScript platforma omogućava pokretanje JavaScript koda izvan pretraživača?", a: "Node.js" },
    { q: "Koji popularan CSS framework pruža gotove klase za brzi responzivni dizajn web stranica?", a: "Bootstrap" },
    { q: "Koji programski konstrukt koristimo kada želimo ponavljati isti blok koda određeni broj puta?", a: "Loop" },
    { q: "Kako nazivamo višekratno upotrebljiv blok koda koji prima parametre i vraća rezultat?", a: "Function" }
  ];

  boardState: boolean[] = Array(25).fill(false);
  cellTerms: string[] = [];
  currentQuestionIndex = 0;
  score = 0;
  activeQuestions: QuizQuestion[] = [];

  gameStarted = false;
  showWinOverlay = false;
  wrongIndex: number | null = null;

  get currentQuestionText(): string {
    if (!this.gameStarted) {
      return "Kliknite na dugme ispod da započnete kviz!";
    }
    if (this.currentQuestionIndex < this.activeQuestions.length) {
      return this.activeQuestions[this.currentQuestionIndex].q;
    }
    return "Nestalo je pitanja! Kliknite 'Igraj ponovo' za novu partiju.";
  }

  get remaining(): number {
    return Math.max(this.activeQuestions.length - this.currentQuestionIndex, 0);
  }

  // Pokretanje igre
  initGame(): void {
    this.gameStarted = true;
    this.showWinOverlay = false;
    this.score = 0;
    this.boardState = Array(25).fill(false);

    // Centralno polje (indeks 12) je uvijek "FREE SPACE" (automatski pogodak)
    this.boardState[12] = true;

    // Promiješaj pojmove i uzmi prvih 25 za ploču
    this.cellTerms = [...this.poolOfTerms].sort(() => Math.random() - 0.5);
    this.cellTerms[12] = "FREE SPACE"; // Sredina je slobodna

    // Promiješaj pitanja za ovu partiju
    this.activeQuestions = [...this.quizQuestions].sort(() => Math.random() - 0.5);
    this.currentQuestionIndex = 0;
  }

  restartGame(): void {
    this.showWinOverlay = false;
    this.initGame();
  }

  // Klik na polje ploče
  handleCellClick(index: number): void {
    // Ako je polje već pogođeno ili igra nije počela, ignoriši
    if (this.boardState[index] || this.activeQuestions.length === 0 || this.currentQuestionIndex >= this.activeQuestions.length) {
      return;
    }

    const currentAnswer = this.activeQuestions[this.currentQuestionIndex].a;
    const clickedTerm = this.cellTerms[index];

    // Provjera da li je kliknuti pojam tačan odgovor na trenutno pitanje
    if (clickedTerm === currentAnswer) {
      this.boardState[index] = true;
      this.score++;
      this.currentQuestionIndex++;

      // Provjeri da li imamo pobjedu (Bingo)
      if (this.checkBingo()) {
        this.showWinOverlay = true;
      }
    } else {
      // Efekat pogrešnog klika (kratko crveno blinkanje)
      this.wrongIndex = index;
      setTimeout(() => {
        this.wrongIndex = null;
      }, 300);
    }
  }

  // Provjera spojenih linija (Bingo provjera)
  private checkBingo(): boolean {
    // Kombinacije indexa koje donose pobjedu (5 vodoravno, 5 uspravno, 2 dijagonale)
    const winningLines = [
      // Vodoravno
      [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24],
      // Uspravno
      [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24],
      // Dijagonale
      [0, 6, 12, 18, 24], [4, 8, 12, 16, 20]
    ];

    return winningLines.some(line => line.every(i => this.boardState[i]));
  }
}
