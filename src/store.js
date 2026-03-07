import { configureStore } from "@reduxjs/toolkit";
import toastStore from './stores/toastStore';
import cartStore from './stores/cartStore';

export default configureStore({
  reducer:{
    toasts: toastStore,
    carts: cartStore,
  }
})