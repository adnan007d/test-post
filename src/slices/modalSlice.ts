import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface IInitialState {
  open: boolean;
}

const initialState: IInitialState = {
  open: false,
};

// interface IReducer  {
//     setPosts: (_posts: IPost[] | null) => void,
//     setPost: (_post: IPost | null) =>  void
// }

const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    onCloseModal: (state) => {
      state.open = false;
    },
    onOpenModal: (state) => {
      state.open = true;
    },
  },
});

export const { onCloseModal, onOpenModal } = modalSlice.actions;

export const selectOpen = (state: RootState) => state.modal.open;

const modalReducer = modalSlice.reducer;

export default modalReducer;
