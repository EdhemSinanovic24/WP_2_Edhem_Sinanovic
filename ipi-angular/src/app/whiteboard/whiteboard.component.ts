import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-whiteboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './whiteboard.component.html',
  styleUrl: './whiteboard.component.css'
})
export class WhiteboardComponent implements AfterViewInit {

  @ViewChild('board') boardRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private drawing = false;

  currentColor = '#000000';
  brushSize = 3;
  isErasing = false;

  ngAfterViewInit(): void {
    const canvas = this.boardRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
  }

  // Funkcija za računanje tačnih koordinata miša/touch-a na platnu
  private getCoordinates(e: MouseEvent | TouchEvent): { x: number; y: number } {
    const canvas = this.boardRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX: number;
    let clientY: number;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      const mouseEvent = e as MouseEvent;
      clientX = mouseEvent.clientX;
      clientY = mouseEvent.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }

  startDraw(e: MouseEvent | TouchEvent): void {
    this.drawing = true;
    this.ctx.beginPath();
    const coords = this.getCoordinates(e);
    this.ctx.moveTo(coords.x, coords.y);
    this.draw(e);
  }

  endDraw(): void {
    this.drawing = false;
    this.ctx.beginPath();
  }

  draw(e: MouseEvent | TouchEvent): void {
    if (!this.drawing) return;

    const coords = this.getCoordinates(e);

    this.ctx.lineWidth = this.brushSize;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    // Ako brišemo, koristimo čisto bijelu boju pozadine platna
    this.ctx.strokeStyle = this.isErasing ? '#FFFFFF' : this.currentColor;

    this.ctx.lineTo(coords.x, coords.y);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(coords.x, coords.y);
  }

  onTouchStart(e: TouchEvent): void {
    this.startDraw(e);
    e.preventDefault();
  }

  onTouchEnd(e: TouchEvent): void {
    this.endDraw();
    e.preventDefault();
  }

  onTouchMove(e: TouchEvent): void {
    this.draw(e);
    e.preventDefault();
  }

  onColorChange(): void {
    this.isErasing = false;
  }

  toggleEraser(): void {
    this.isErasing = !this.isErasing;
  }

  clearBoard(): void {
    if (confirm('Da li želite obrisati cijelu ploču?')) {
      const canvas = this.boardRef.nativeElement;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  saveBoard(): void {
    const canvas = this.boardRef.nativeElement;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'moj_crtez.png';
    link.click();
  }
}
