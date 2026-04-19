// update code
import { RootState } from "@/store/store";
import { TUser } from "@/store/storeTypes/user";
import { createSlice } from "@reduxjs/toolkit";

type Tstate = {
  user: TUser | null;
  accessToken: string | null;
  refreshToken?: string | null;
};

const initialState: Tstate = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, refresh, access } = action.payload || {};

      if (!user || !access) {
        console.error("Invalid payload received:", action.payload);
        return;
      }

      state.accessToken = access;
      state.user = user;

      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("accessToken", access);
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("persist:auth");
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth?.user;
export const selectToken = (state: RootState) => state.auth?.accessToken;

const authReducer = authSlice.reducer;
export default authReducer;
