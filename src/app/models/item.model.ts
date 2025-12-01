export interface Item {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  date: Date;
  seller: string;
  sellerRating: number;
  images: string[];
  condition: 'new' | 'like new' | 'used' | 'for parts';
  features: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  itemId: number;
}
