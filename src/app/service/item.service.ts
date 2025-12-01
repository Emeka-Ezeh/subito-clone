import { Injectable } from '@angular/core';
import { Item, ContactForm } from '../models/item.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private items: Item[] = [
    {
      id: 1,
      title: 'iPhone 13 Pro 256GB',
      description: 'iPhone 13 Pro in ottime condizioni, batteria al 92%, con scatola originale e caricatore.',
      price: 750,
      category: 'Smartphones',
      location: 'Milano',
      date: new Date('2024-01-15'),
      seller: 'MarcoR',
      sellerRating: 4.8,
      images: ['https://via.placeholder.com/400x300/3f51b5/ffffff?text=iPhone+13+Pro'],
      condition: 'like new',
      features: ['Batteria 92%', 'Scatola originale', 'Garanzia 1 mese']
    },
    {
      id: 2,
      title: 'Samsung Galaxy S22 Ultra',
      description: 'Telefono in perfette condizioni, acquistato 6 mesi fa, mai riparato.',
      price: 650,
      category: 'Smartphones',
      location: 'Roma',
      date: new Date('2024-01-10'),
      seller: 'LauraB',
      sellerRating: 4.9,
      images: ['https://via.placeholder.com/400x300/ff4081/ffffff?text=Samsung+S22+Ultra'],
      condition: 'like new',
      features: ['S-Pen inclusa', 'Vetrino protettivo', 'Custodia originale']
    },
    {
      id: 3,
      title: 'PlayStation 5 Digital Edition',
      description: 'Console PS5 edition digitale, con 2 controller e 3 giochi inclusi.',
      price: 450,
      category: 'Console & Videogiochi',
      location: 'Torino',
      date: new Date('2024-01-05'),
      seller: 'GamerPro',
      sellerRating: 4.7,
      images: ['https://via.placeholder.com/400x300/4caf50/ffffff?text=PS5+Digital'],
      condition: 'used',
      features: ['2 controller', '3 giochi', 'Garantita']
    },
    {
      id: 4,
      title: 'MacBook Air M1 2020',
      description: 'MacBook Air con chip M1, 8GB RAM, 256GB SSD. Ottime condizioni.',
      price: 850,
      category: 'Computer',
      location: 'Firenze',
      date: new Date('2024-01-12'),
      seller: 'AppleFan',
      sellerRating: 4.6,
      images: ['https://via.placeholder.com/400x300/ff9800/ffffff?text=MacBook+Air+M1'],
      condition: 'used',
      features: ['Batteria 95%', 'Caricatore originale', 'MacOS Monterey']
    },
    {
      id: 5,
      title: 'Bicicletta Mountain Bike',
      description: 'Mountain bike usata poche volte, taglia L, cambio Shimano 24 velocità.',
      price: 320,
      category: 'Sport',
      location: 'Bologna',
      date: new Date('2024-01-08'),
      seller: 'Ciclista',
      sellerRating: 4.5,
      images: ['https://via.placeholder.com/400x300/9c27b0/ffffff?text=Mountain+Bike'],
      condition: 'used',
      features: ['Taglia L', '24 velocità', 'Freni a disco']
    }
  ];

  private categories = ['Smartphones', 'Computers', 'Console & Videogiochi', 'Sport', 'Casa', 'Auto & Moto'];
  private locations = ['Milano', 'Roma', 'Torino', 'Firenze', 'Bologna', 'Napoli'];

  getItems(): Observable<Item[]> {
    return of(this.items);
  }

  getItemById(id: number): Observable<Item | undefined> {
    const item = this.items.find(item => item.id === id);
    return of(item);
  }

  getCategories(): Observable<string[]> {
    return of(this.categories);
  }

  getLocations(): Observable<string[]> {
    return of(this.locations);
  }

  filterItems(filters: any): Observable<Item[]> {
    let filteredItems = [...this.items];

    if (filters.category) {
      filteredItems = filteredItems.filter(item => item.category === filters.category);
    }

    if (filters.location) {
      filteredItems = filteredItems.filter(item => item.location === filters.location);
    }

    if (filters.minPrice) {
      filteredItems = filteredItems.filter(item => item.price >= filters.minPrice);
    }

    if (filters.maxPrice) {
      filteredItems = filteredItems.filter(item => item.price <= filters.maxPrice);
    }

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filteredItems = filteredItems.filter(item =>
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
      );
    }

    return of(filteredItems);
  }

  submitContactForm(formData: ContactForm): Observable<boolean> {
    console.log('Form submitted:', formData);
    // In a real app, you would send this to a backend API
    return of(true);
  }
}
