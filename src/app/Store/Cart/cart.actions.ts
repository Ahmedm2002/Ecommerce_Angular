import { createAction, props } from '@ngrx/store';
import { CartItem } from './cart.state';

export const addItem = createAction(
  '[cart] Add Item',
  props<{ item: CartItem }>()
);
export const removeItem = createAction(
  '[cart] Remove Item',
  props<{ productId: number }>()
);
export const updateItem = createAction(
  '[cart] Update Item',
  props<{ item: CartItem }>()
);

export const emptyCart = createAction('[cart] Empty Cart');
