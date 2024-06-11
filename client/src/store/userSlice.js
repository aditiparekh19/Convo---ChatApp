import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    LOGIN: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      console.log(action.payload);
      state.user = action.payload;
    },
    LOGOUT: (state) => {
      localStorage.removeItem("token");
      state.user = null;
    },
  },
});

export default userSlice.reducer;
export const { LOGIN, LOGOUT } = userSlice.actions;
