import { FC } from "react";
import { useAppDispatch } from "../app/hook";
import { onOpenModal } from "../slices/modalSlice";
import { setSelectedPost } from "../slices/postSlice";

const Header: FC = () => {
  const dispatch = useAppDispatch();
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

      <button
        onClick={handleOpen}
        className="bg-gray-500 p-2 rounded-md focus:outline-none"
      >
        Add
      </button>
    </div>
  );
};

export default Header;
