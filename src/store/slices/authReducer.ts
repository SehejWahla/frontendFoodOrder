import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface user {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface authPayload {
  token: string;
  user: user;
}

export interface authInitialState {
  user: user | null;
  token: string | null;
  isLoading: boolean;
}

const initialState: authInitialState = {
  user: null,
  token: localStorage.getItem("token"),
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<authPayload>) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCredentials, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
