
export interface ItemColor {
  id: number;
  name: string;
  hex?: string;
  photos: string[];
}

export interface Item {
  id: number;
  title: string;
  description: string;
  price: string; // or number if you store it as a number
  rating: number;
  reviews: number;
  colors: ItemColor[];
}
