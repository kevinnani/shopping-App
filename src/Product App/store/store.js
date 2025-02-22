import { createStore } from "redux";

// Initial State
const initialState = {
  cart: [],
  products: [] // This will hold the stock data
};

// Reducer
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const product = state.products.find((p) => p.id === action.payload.id);
      if (!product || product.stock < action.payload.quantity) {
        return state; // Prevent adding if stock is insufficient
      }

      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
          products: state.products.map((p) =>
            p.id === action.payload.id ? { ...p, stock: p.stock - action.payload.quantity } : p
          )
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload }],
          products: state.products.map((p) =>
            p.id === action.payload.id ? { ...p, stock: p.stock - action.payload.quantity } : p
          )
        };
      }
    }

    case "INCREASE_QUANTITY": {
      const product = state.products.find((p) => p.id === action.payload);
      if (!product || product.stock <= 0) return state;

      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
        products: state.products.map((p) =>
          p.id === action.payload ? { ...p, stock: p.stock - 1 } : p
        )
      };
    }

    case "DECREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0),
        products: state.products.map((p) =>
          p.id === action.payload ? { ...p, stock: p.stock + 1 } : p
        )
      };

    case "REMOVE_FROM_CART":
      const removedItem = state.cart.find((item) => item.id === action.payload);
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
        products: state.products.map((p) =>
          p.id === action.payload ? { ...p, stock: p.stock + removedItem.quantity } : p
        )
      };

    case "SET_PRODUCTS":
      return { ...state, products: action.payload };

    default:
      return state;
  }
};

// Create Store
const store = createStore(cartReducer);

export default store;
