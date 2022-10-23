import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += 1;
      console.log(action.payload.price, "price-",action.payload.qty);
      state.total += action.payload.price * action.payload.qty;
    },
    removeProduct: (state, action) => {
      state.quantity -= state.products[action.payload].qty;
      state.total -= state.products[action.payload].price * state.products[action.payload].qty;
      state.products.splice(action.payload, 1);
    },
    reset: () => {
      state = initialState;
    },
  },
});

export const { addProduct, removeProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
