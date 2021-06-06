import axios from "axios";
import { IUser } from "../slices/userSlice";

const createUser = async (user: IUser) => {
  const response = await axios.post("/api/firebase/create_user", user);
  return response;
};

export { createUser };
