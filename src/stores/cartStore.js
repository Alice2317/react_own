import { createSlice } from '@reduxjs/toolkit';

export const carts = createSlice({
  name: 'carts',
  initialState: {
    carts: [],
    isLoading: true,
  },
  reducers: {
    addCart(state, action) {
      let addIndex = state.carts.findIndex(item => item.product_id === action.payload.product_id);

      // 避免重複的產品
      if (addIndex > -1) {
        let newCarts = state.carts.map((item, index) => {
          if (index === addIndex) {
            return { ...item, qty: action.payload.qty };
          }
          return item;
        });
        return { ...state, carts: newCarts };
      } else {
        return {
          ...state,
          carts: [...state.carts, action.payload],
        }
      }
    },
    removeCart(state, action) {
      let removeIndex = state.carts.findIndex(item => item.product_id === action.payload.product_id);
      state.carts.splice(removeIndex, 1);
      return { ...state };
    },
    clearCart(state) {
      return { ...state, carts: [] };
    },
    initCarts(state, action) {
      return {
        ...state,
        carts: action.payload,
        isLoading: false,
      };
    },
  }
});

export const { addCart, removeCart, clearCart, initCarts } = carts.actions;

export default carts.reducer;