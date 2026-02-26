import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const STORAGE_KEY = "shopping-cart";

function loadState() {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) return undefined;
    return { cart: JSON.parse(serialized) };
  } catch {
    return undefined;
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
  } catch {
    // ignore write errors
  }
}

export function makeStore() {
  const preloadedState =
    typeof window !== "undefined" ? loadState() : undefined;

  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState,
  });

  if (typeof window !== "undefined") {
    store.subscribe(() => saveState(store.getState()));
  }

  return store;
}
