# EcommerceAngular

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

/\* Got it! Since you're using Angular 19, which has introduced **standalone components** and no longer requires the use of `@NgModule`, we'll adjust the state management structure accordingly. We'll still use **NgRx** for state management, but with the updated Angular 19 approach that makes use of standalone components and other new features.

Here’s how you can structure your project with **NgRx** and **standalone components** in Angular 19:

### Updated Project Structure for Standalone Components with NgRx

```
src/
├── app/
│   ├── core/
│   │   ├── models/
│   │   │   ├── user.model.ts
│   │   │   └── cart.model.ts
│   │   ├── services/
│   │   │   └── user.service.ts
│   │   └── store/
│   │       ├── user/
│   │       │   ├── actions/
│   │       │   │   └── user.actions.ts
│   │       │   ├── reducers/
│   │       │   │   └── user.reducer.ts
│   │       │   ├── effects/
│   │       │   │   └── user.effects.ts
│   │       │   └── selectors/
│   │       │       └── user.selectors.ts
│   │       ├── cart/
│   │       │   ├── actions/
│   │       │   │   └── cart.actions.ts
│   │       │   ├── reducers/
│   │       │   │   └── cart.reducer.ts
│   │       │   ├── effects/
│   │       │   │   └── cart.effects.ts
│   │       │   └── selectors/
│   │       │       └── cart.selectors.ts
│   ├── user/
│   │   ├── user.component.ts (standalone)
│   │   └── user.component.scss
│   ├── cart/
│   │   ├── cart.component.ts (standalone)
│   │   └── cart.component.scss
│   ├── app.component.ts (standalone)
│   └── main.ts
└── index.html
```

### Key Differences in Angular 19 (with Standalone Components):

- **Standalone Components**: Each component is declared as a standalone component (using the `standalone: true` property).
- **No `@NgModule`**: We no longer need the `@NgModule` decorator to define modules. Instead, we directly declare standalone components.
- **Store Integration**: NgRx is integrated just like before, but the store setup will work with the Angular 19 approach.

### Steps for Setting Up State Management (NgRx) in Angular 19:

### 1. **Install NgRx**

Install the necessary NgRx packages:

```bash
ng add @ngrx/store
ng add @ngrx/effects
```

### 2. **Define Your Models**

In your `models` folder, create the models for **user** and **cart** data.

**user.model.ts**:

```typescript
export interface User {
  id: number;
  name: string;
  email: string;
  // Add other user-specific fields
}
```

**cart.model.ts**:

```typescript
export interface CartItem {
  productId: number;
  name: string;
  quantity: number;
  price: number;
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
}
```

### 3. **Create State Management Actions**

Define the actions for **user** and **cart** in their respective folders.

**user.actions.ts**:

```typescript
import { createAction, props } from "@ngrx/store";
import { User } from "../../models/user.model";

export const loadUser = createAction("[User] Load User");
export const loadUserSuccess = createAction("[User] Load User Success", props<{ user: User }>());
export const loadUserFailure = createAction("[User] Load User Failure", props<{ error: string }>());
```

**cart.actions.ts**:

```typescript
import { createAction, props } from "@ngrx/store";
import { CartItem } from "../../models/cart.model";

export const addItemToCart = createAction("[Cart] Add Item", props<{ item: CartItem }>());
export const removeItemFromCart = createAction("[Cart] Remove Item", props<{ itemId: number }>());
export const clearCart = createAction("[Cart] Clear Cart");
export const updateCart = createAction("[Cart] Update Cart", props<{ items: CartItem[] }>());
```

### 4. **Create Reducers**

Define the reducers to manage changes in the state when actions are dispatched.

**user.reducer.ts**:

```typescript
import { createReducer, on } from "@ngrx/store";
import { loadUserSuccess, loadUserFailure } from "./user.actions";
import { User } from "../../models/user.model";

export const initialState: User = null;

const _userReducer = createReducer(
  initialState,
  on(loadUserSuccess, (state, { user }) => user),
  on(loadUserFailure, () => null)
);

export function userReducer(state, action) {
  return _userReducer(state, action);
}
```

**cart.reducer.ts**:

```typescript
import { createReducer, on } from "@ngrx/store";
import { addItemToCart, removeItemFromCart, clearCart, updateCart } from "./cart.actions";
import { Cart, CartItem } from "../../models/cart.model";

export const initialState: Cart = { items: [], totalPrice: 0 };

const _cartReducer = createReducer(
  initialState,
  on(addItemToCart, (state, { item }) => ({
    ...state,
    items: [...state.items, item],
    totalPrice: state.totalPrice + item.price,
  })),
  on(removeItemFromCart, (state, { itemId }) => {
    const updatedItems = state.items.filter((item) => item.productId !== itemId);
    const updatedTotal = updatedItems.reduce((total, item) => total + item.price, 0);
    return { ...state, items: updatedItems, totalPrice: updatedTotal };
  }),
  on(clearCart, () => ({ items: [], totalPrice: 0 })),
  on(updateCart, (state, { items }) => ({
    ...state,
    items,
    totalPrice: items.reduce((total, item) => total + item.price, 0),
  }))
);

export function cartReducer(state, action) {
  return _cartReducer(state, action);
}
```

### 5. **Create Selectors**

Selectors are used to get the state from the store.

**user.selectors.ts**:

```typescript
import { createSelector } from "@ngrx/store";
import { AppState } from "../reducers"; // Define your root state structure

export const selectUser = createSelector(
  (state: AppState) => state.user,
  (user) => user
);
```

**cart.selectors.ts**:

```typescript
import { createSelector } from "@ngrx/store";
import { AppState } from "../reducers"; // Define your root state structure

export const selectCart = createSelector(
  (state: AppState) => state.cart,
  (cart) => cart
);
```

### 6. **Create Effects for Asynchronous Operations**

Effects handle side effects like fetching data from APIs or performing asynchronous tasks.

**user.effects.ts**:

```typescript
import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { switchMap, catchError, map } from "rxjs/operators";
import { UserService } from "../../services/user.service";
import { loadUser, loadUserSuccess, loadUserFailure } from "./user.actions";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      switchMap(() =>
        this.userService.getUser().pipe(
          map((user) => loadUserSuccess({ user })),
          catchError((error) => loadUserFailure({ error: error.message }))
        )
      )
    )
  );
}
```

### 7. **Integrating Store in Standalone Components**

Since you're using standalone components, you can directly use the store in the components by importing `StoreModule` in your component. You don’t need an `@NgModule` setup.

**user.component.ts (Standalone Component)**:

```typescript
import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { User } from "../core/models/user.model";
import { loadUser } from "../core/store/user/actions/user.actions";
import { selectUser } from "../core/store/user/selectors/user.selectors";

@Component({
  selector: "app-user",
  standalone: true,
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent {
  private store = inject(Store);
  user$: Observable<User> = this.store.select(selectUser);

  constructor() {
    this.store.dispatch(loadUser());
  }
}
```

Similarly, for the **cart component**, you can follow the same pattern to access and dispatch cart-related actions.

### 8. **Configure Store in `main.ts`**

In Angular 19, we no longer use `@NgModule`. However, we need to provide the store at the application root. This can be done in the `main.ts` file.

```typescript
import { bootstrapApplication } from "@angular/platform-browser";
import { provideStore } from "@ngrx/store";
import { userReducer } from "./core/store/user/reducers/user.reducer";
import { cartReducer } from "./core/store/cart/reducers/cart.reducer";
import { UserComponent } from "./user/user.component";
import { CartComponent } from "./cart/cart.component";
import { UserEffects } from "./core/store/user/effects/user.effects";
import { CartEffects } from "./core/store/cart/effects/cart.effects";

bootstrapApplication(UserComponent, {
  providers: [provideStore({ user: userReducer, cart: cartReducer }), UserEffects, CartEffects],
});
```

### Conclusion:

By using **standalone components** and **NgRx**, your Angular 19 application can remain modular and maintainable. Each component has its own independent setup, and the store is configured directly in the root application file (`main.ts`). This approach embraces the latest Angular features while maintaining a clean state management structure. \*/
