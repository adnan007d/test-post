import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { destroyCookie } from "nookies";

export interface IUser {
  displayName: string;
  email: string;
  uid: string;
  photoURL: string;
  idToken?: string;
}

interface IInitialState {
  user: IUser | null;
}

const initialState: IInitialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    signIn: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = null;
      destroyCookie(null, "token");
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

const userReducer = userSlice.reducer;

export default userReducer;
