import { useRouter } from "next/router";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { onOpenModal } from "../slices/modalSlice";
import { setSelectedPost } from "../slices/postSlice";
import { selectUser, signOut } from "../slices/userSlice";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const user = useAppSelector(selectUser);
  const handleAuthClick = () => {
    if (user) {
      dispatch(signOut());
    } else router.push("/login");
  };

  const handleOpen = () => {
    dispatch(
      setSelectedPost({
        title: "",
        description: "",
        id: "",
      })
    );
    dispatch(onOpenModal());
  };
  return (
    <div className=" flex bg-[#1B1B1B] text-gray-100 font-bold p-5 justify-between">
      <h1>Test Post</h1>

      <div className="flex space-x-2">
        {user && (
          <button onClick={handleOpen} className="btn">
            Add
          </button>
        )}
        <button onClick={handleAuthClick} className="btn">
          {user ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Header;
