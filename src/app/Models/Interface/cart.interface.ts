export interface cartItem {
  id: string;
  name: string;
  imageUrl: string;
  quantity: number;
  price: number;
}

export interface cart {
  items: cartItem[];
  totalPrice: number;
}
