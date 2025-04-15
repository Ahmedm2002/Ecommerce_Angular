export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalPrice : number
}

export const initialCartState: CartState = {
  items: [],
  totalPrice : 0
};
