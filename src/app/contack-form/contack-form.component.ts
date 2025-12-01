import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ItemService } from '../service/item.service';
import { Item, ContactForm } from '../models/item.model';

@Component({
  selector: 'app-contack-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contack-form.component.html',
  styleUrls: ['./contack-form.component.css']
})
export class ContactFormComponent implements OnInit {
  item: Item | undefined;
  contactForm: ContactForm = {
    name: '',
    email: '',
    phone: '',
    message: '',
    itemId: 0
  };

  isSubmitted = false;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contactForm.itemId = id;

    this.itemService.getItemById(id).subscribe(item => {
      this.item = item;
    });
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      this.isLoading = true;

      // Simulate API call
      setTimeout(() => {
        this.itemService.submitContactForm(this.contactForm).subscribe(success => {
          this.isLoading = false;
          this.isSubmitted = true;

          // Reset form
          if (success) {
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 3000);
          }
        });
      }, 1000);
    }
  }

  isFormValid(): boolean {
    return !!this.contactForm.name &&
           !!this.contactForm.email &&
           !!this.contactForm.message;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  }
}
