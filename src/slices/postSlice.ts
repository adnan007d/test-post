import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { IUser } from "./userSlice";

export interface IPost {
  id?: string;
  title: string;
  description: string;
  likeCount?: number;
  timestamp?: number;
  user?: IUser;
}

interface IInitialState {
  posts: IPost[];
  post: IPost;
}

const initialState: IInitialState = {
  posts: [],
  post: {
    title: "",
    description: "",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
    },
    updatePosts: (state, action: PayloadAction<IPost>) => {
      state.posts = state.posts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    },
    setSelectedPost: (state, action: PayloadAction<IPost>) => {
      state.post = {
        ...state.post,
        ...action.payload,
      };
    },
    addPost: (state, action: PayloadAction<IPost>) => {
      state.posts = [action.payload, ...state.posts];
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

export const { setSelectedPost, setPosts, updatePosts, addPost, deletePost } =
  postsSlice.actions;

export const selectPost = (state: RootState) => state.posts.post;
export const selectPosts = (state: RootState) => state.posts.posts;

const postsReducer = postsSlice.reducer;

export default postsReducer;
