import { createAction, props } from '@ngrx/store';
import { cartItem } from '../../Models/Interface/cart.interface';

export const addItem = createAction(
  '[cart] Add Item',
  props<{ item: cartItem }>()
);
export const removeItem = createAction(
  '[cart] Remove Item',
  props<{ productId: string }>()
);
export const updateItem = createAction(
  '[cart] Update Item',
  props<{ item: cartItem }>()
);

export const emptyCart = createAction('[cart] Empty Cart');
