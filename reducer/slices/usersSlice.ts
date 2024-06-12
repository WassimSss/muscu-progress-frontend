import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  value: {
    token: string,
    roles: string[],
    darkMode: boolean
  };
}

const initialState: UserState = {
  value: {
    token: "",
    roles: [],
    darkMode: true
  }
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    connectUser: (state, action: PayloadAction<{token: string, roles: string[]}>) => {
      state.value.token = action.payload.token;
      state.value.roles = action.payload.roles;
    },
    disconnect: (state) => {
      state.value.token = ""
    },
    toggleDarkMode: (state) => {
      state.value.darkMode = !state.value.darkMode;
    }

  },
});

export const { connectUser, disconnect, toggleDarkMode } = usersSlice.actions;
export const userReducer = usersSlice.reducer;