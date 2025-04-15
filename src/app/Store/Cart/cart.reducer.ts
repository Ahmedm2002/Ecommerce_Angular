import { createReducer, on } from '@ngrx/store';
import { CartItem } from './cart.state';
import { addItem, removeItem, updateItem, emptyCart } from './cart.actions';
import { initialCartState } from './cart.state';



const cartReducer = createReducer(
  initialCartState,
  on(addItem, (state, { item }) => ({
    ...state,
    items: [...state.items, item],
    totalPrice: state.totalPrice + item.price,
  })),
  on(removeItem, (state, { productId }) => {
    const updatedCart = [
      ...state.items.filter((item: CartItem) => item.id !== productId),
    ];
    const updatedPrice = state.items.reduce(
      (total, item) => total + item.price,
      0
    );
    return {
      ...state,
      items: updatedCart,
      totalPrice: updatedPrice,
    };
  }),
  on(emptyCart, () => ({ items: [], totalPrice: 0 })),
  on(updateItem, (state, { item }) => ({
    ...state,
    item,
    totalPrice: state.items.reduce((total, item) => total + item.price, 0),
  }))
);
