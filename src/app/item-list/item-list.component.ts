import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../service/item.service';
import { Item } from '../models/item.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];
  categories: string[] = [];
  locations: string[] = [];

  filters = {
    searchTerm: '',
    category: '',
    location: '',
    minPrice: 0,
    maxPrice: 10000
  };

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
      this.filteredItems = items;
    });

    this.itemService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.itemService.getLocations().subscribe(locations => {
      this.locations = locations;
    });
  }

  applyFilters(): void {
    this.itemService.filterItems(this.filters).subscribe(items => {
      this.filteredItems = items;
    });
  }

  clearFilters(): void {
    this.filters = {
      searchTerm: '',
      category: '',
      location: '',
      minPrice: 0,
      maxPrice: 10000
    };
    this.filteredItems = this.items;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  }

  getConditionClass(condition: string): string {
    switch(condition) {
      case 'new': return 'badge-success';
      case 'like new': return 'badge-primary';
      case 'used': return 'badge-warning';
      case 'for parts': return 'badge-danger';
      default: return 'badge-secondary';
    }
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
}
