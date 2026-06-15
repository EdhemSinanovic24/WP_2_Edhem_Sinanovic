import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type BoardItemType = 'note' | 'quote' | 'image';

interface BoardItem {
  id: string;
  type: BoardItemType;
  content: string;
  rotation: number;
  date: string;
}

const STORAGE_KEY = 'ipiVisionBoardState';
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500';

@Component({
  selector: 'app-vision-board',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './visionboard.component.html',
  styleUrl: './visionboard.component.css'
})
export class VisionBoardComponent implements OnInit {

  items: BoardItem[] = [];

  showImageOverlay = false;
  imageUrl = '';

  fallbackImage = FALLBACK_IMAGE;

  ngOnInit(): void {
    this.loadBoard();
  }

  addNote(): void {
    this.createBoardItem('note', 'Kliknite ovdje da napišete bilješku...');
  }

  addQuote(): void {
    this.createBoardItem('quote', '„Upišite vaš omiljeni motivacioni citat ovdje...“');
  }

  toggleImagePopup(): void {
    this.showImageOverlay = !this.showImageOverlay;
    this.imageUrl = '';
  }

  handleAddImage(): void {
    const url = this.imageUrl.trim();
    if (!url) {
      alert('Molimo unesite ispravan URL slike!');
      return;
    }
    this.createBoardItem('image', url);
    this.toggleImagePopup();
  }

  private createBoardItem(type: BoardItemType, content: string, id: string | null = null, date: string | null = null): void {
    const item: BoardItem = {
      id: id || 'item-' + Date.now(),
      type,
      content,
      rotation: Number((Math.random() * 8 - 4).toFixed(1)),
      date: date || new Date().toLocaleDateString('bs')
    };

    this.items.push(item);

    if (!id) {
      this.saveBoard();
    }
  }

  onImageError(item: BoardItem): void {
    item.content = this.fallbackImage;
  }

  onTextBlur(item: BoardItem, event: FocusEvent): void {
    const target = event.target as HTMLElement;
    item.content = target.innerText;
    this.saveBoard();
  }

  deleteItem(id: string): void {
    this.items = this.items.filter(item => item.id !== id);
    this.saveBoard();
  }

  clearBoard(): void {
    if (confirm('Da li ste sigurni da želite ukloniti sve elemente sa Vision Board-a?')) {
      this.items = [];
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  private saveBoard(): void {
    const data = this.items.map(item => ({
      id: item.id,
      type: item.type,
      content: item.content
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  private loadBoard(): void {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;

    try {
      const parsed: { id: string; type: BoardItemType; content: string }[] = JSON.parse(data);
      parsed.forEach(item => {
        this.createBoardItem(item.type, item.content, item.id);
      });
    } catch {
      // Ignoriši neispravne podatke u localStorage
    }
  }
}
