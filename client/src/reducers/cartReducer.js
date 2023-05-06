import { createSlice } from '@reduxjs/toolkit';

function findIdx(mealboxes, totalId, targetId) {
  return mealboxes.findIndex((el) => String(el[totalId]) === String(targetId));
}

const initialState = { cart: { totalPrice: 0, mealboxes: [] } };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },

    addCartItem: (state, action) => {
      const { cart } = state;
      const newMealbox = action.payload;

      newMealbox.cartMealboxId =
        newMealbox.cartMealboxId || new Date().getTime();

      const existingMealbox = cart.mealboxes.find(
        (mealbox) => mealbox.mealboxId === newMealbox.mealboxId
      );

      if (existingMealbox) {
        existingMealbox.quantity++;
      } else {
        cart.mealboxes.push(newMealbox);
      }

      cart.totalPrice += newMealbox.price;
    },

    deleteCartItem: (state, action) => {
      const { cart } = state;
      const deleteIds = action.payload;
      deleteIds?.forEach((id) => {
        const idx = findIdx(cart.mealboxes, 'cartMealboxId', id);
        const deleteItem = cart.mealboxes[idx];
        cart.totalPrice -= deleteItem.price * deleteItem.quantity;
        cart.mealboxes.splice(idx, 1);
      });
    },

    setQuantity: (state, action) => {
      const { cart } = state;
      const idx = findIdx(cart.mealboxes, 'cartMealboxId', action.payload.id);
      const item = cart.mealboxes[idx];
      const amount = action.payload.amount;
      item.quantity += amount;
      cart.totalPrice += item.price * amount;
    },

    initializeCart: () => initialState,
  },
});

export const {
  setCart,
  addCartItem,
  deleteCartItem,
  setQuantity,
  initializeCart,
} = cartSlice.actions;

export default cartSlice.reducer;
