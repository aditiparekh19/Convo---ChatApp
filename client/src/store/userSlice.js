import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

let initialUser = null;
const token = localStorage.getItem('token');
if(token){
  const decodedToken = jwtDecode(token);
  const expiresAt = new Date(decodedToken.exp * 1000);
  if(new Date() > expiresAt){
    localStorage.removeItem('token');
  }
  else{
    initialUser = decodedToken
  }
}else console.log('No token found')


const userSlice = createSlice({
  name: "user",
  initialState: {
    user: initialUser,
  },
  reducers: {
    LOGIN: (state, action) => {
      localStorage.setItem("token", action.payload.token);
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
