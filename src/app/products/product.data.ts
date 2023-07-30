import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Product } from './Product';

export class ProductData implements InMemoryDbService {
  createDb() {
    const products: Product[] = [
      {
        id: 1,
        category: 'Laptops',
        title: 'Apple MacBook Pro',
        subtitle: '13-inch, M1 Chip, 8GB RAM, 256GB SSD',
        imageSrc: 'https://i.imgur.com/3VTaSeb.png',
        price: 1299,
      },
      {
        id: 2,
        category: 'Smartphones',
        title: 'Samsung Galaxy S21',
        subtitle: '128GB, Phantom Gray, 5G',
        imageSrc: 'https://i.imgur.com/3VTaSeb.png',
        price: 599,
      },
      {
        id: 3,
        category: 'Headphones',
        title: 'Sony WH-1000XM4',
        subtitle: 'Wireless Noise-Canceling Headphones',
        imageSrc: 'https://i.imgur.com/3VTaSeb.png',
        price: 399,
      },
      {
        id: 4,
        category: 'Drones',
        title: 'DJI Mavic Air 2',
        subtitle: '4K Drone Fly More Combo',
        imageSrc: 'https://i.imgur.com/3VTaSeb.png',
        price: 299,
      },
      {
        id: 5,
        category: 'Gaming Consoles',
        title: 'Nintendo Switch',
        subtitle: '32GB Console with Neon Blue and Red Joy-Con',
        imageSrc: 'https://i.imgur.com/3VTaSeb.png',
        price: 1699,
      },
    ];
    return { products };
  }
}
