import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem(state, action) {
      const product = action.payload;
      const existing = state.items.find((item) => item.product.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product, quantity: 1 });
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
    },
    updateQuantity(state, action) {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter(
          (item) => item.product.id !== productId
        );
      } else {
        const item = state.items.find((item) => item.product.id === productId);
        if (item) item.quantity = quantity;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export const selectItems = (state) => state.cart.items;

export const selectTotalItems = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectTotalPrice = (state) =>
  state.cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

export default cartSlice.reducer;
