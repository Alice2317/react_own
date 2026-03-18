import { createSlice,current } from '@reduxjs/toolkit';

export const carts = createSlice({
  name: 'carts',
  initialState: {
    carts: [],
    isLoading: true,
    isAdd:false,
    total:0,
    final_total:0,
  },
  reducers: {
    addCart(state, action) {
      let addIndex = state.carts.findIndex(item => item.id === action.payload.product_id);
      // 避免重複的產品
      if (addIndex !== -1) {
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
          carts: [...state.carts, action.payload]
        }
      }
    },
    removeCart(state, action) {
      let newCarts = state.carts.filter(item => item.id !== action.payload);
      return { ...state, carts: newCarts };
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
    initTotal(state, action) {
      return {
        ...state,
        total: action.payload,
      }
    },
    initFinal_total(state,action){
      return {
        ...state,
        final_total: action.payload,
      }
    },
    changeAdd(state,action){
      state.isAdd = action.payload;
    },
  }
});

export const { addCart, removeCart, clearCart, initCarts, initFinal_total, initTotal, changeAdd } = carts.actions;

export default carts.reducer;