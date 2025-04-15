import { createFeatureSelector, createSelector } from "@ngrx/store"
import { CartState } from "./cart.state"

export const selectCart = createFeatureSelector<CartState>('cart');


export const selectCartItems = createSelector(
  selectCart, 
  (state) => {state.items}
)

export const selectCartTotal = createSelector(
  selectCart, 
  (state) => state.items.reduce((total, item) => total + item.price * item.quantity, 0)
)