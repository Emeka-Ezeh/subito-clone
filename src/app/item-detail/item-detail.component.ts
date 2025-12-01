import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ItemService } from '../service/item.service';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  item: Item | undefined;
  currentImageIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.itemService.getItemById(id).subscribe(item => {
      this.item = item;
    });
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  }

  getConditionText(condition: string): string {
    switch(condition) {
      case 'new': return 'Nuovo';
      case 'like new': return 'Come nuovo';
      case 'used': return 'Usato';
      case 'for parts': return 'Per ricambi';
      default: return condition;
    }
  }

  getConditionClass(condition: string): string {
    switch(condition) {
      case 'new': return 'bg-success';
      case 'like new': return 'bg-primary';
      case 'used': return 'bg-warning text-dark';
      case 'for parts': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  nextImage(): void {
    if (this.item && this.item.images.length > 1) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.item.images.length;
    }
  }

  prevImage(): void {
    if (this.item && this.item.images.length > 1) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.item.images.length) % this.item.images.length;
    }
  }
}
