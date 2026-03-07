
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const toasts = createSlice({
  name: 'toasts',
  initialState: [],
  reducers: {
    addToast(state, action) {
      if (action.payload.success) {
        state.push({
          id: action.payload.id,
          color: 'success',
          title: '成功',
          content: action.payload.message,
        });
      } else {
        state.push({
          id: action.payload.id,
          color: 'error',
          title: '失敗',
          content: Array.isArray(action.payload?.message ? action.payload?.message.join('、') : action.payload?.message),
        });
      }
    },
    removeToast(state, action) {
      const index = state.findIndex(item => item.id === action.payload);
      state.splice(index, 1)
    },
  }
});

export const createAsyncMsg = createAsyncThunk(
  'msg/createAsyncMsg',
  async function (payload, { dispatch, requestId }) { 
    dispatch(toasts.actions.addToast(
      {
        ...payload,
        id: requestId
      }
    ));

    setTimeout(() => {
      dispatch(toasts.actions.removeToast(requestId))
    }, 3000)
  });

export const { addToast } = toasts.actions;

export default toasts.reducer;