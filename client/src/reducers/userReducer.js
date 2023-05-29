import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { imagePath: null, name: '', email: '' },
  reducers: {
    setProfile: (state, action) => {
      state.imagePath = action.payload.imagePath;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    setImage: (state, action) => {
      state.imagePath = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setProfile, setImage, setName, setEmail } = userSlice.actions;
export default userSlice.reducer;
