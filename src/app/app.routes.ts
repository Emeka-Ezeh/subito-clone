import { Routes } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ContactFormComponent } from './contack-form/contack-form.component';

export const routes: Routes = [
  { path: '', component: ItemListComponent },
  { path: 'item/:id', component: ItemDetailComponent },
  { path: 'contact/:id', component: ContactFormComponent },
  { path: '**', redirectTo: '' }
];
