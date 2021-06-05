import { FC, useState } from "react";
import { PencilIcon, ThumbUpIcon, TrashIcon } from "@heroicons/react/solid";
import {
  IPost,
  updatePosts,
  deletePost as delPost,
  setSelectedPost,
} from "../slices/postSlice";
import { useAppDispatch } from "../app/hook";
import { deletePost, likePost } from "../actions/postsActions";
import { onOpenModal } from "../slices/modalSlice";

const Post: FC<IPost> = ({ id, title, description, likeCount }) => {
  const [likeLoading, setLikeLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleLikeClick = async () => {
    setLikeLoading(true);
    const response = await likePost(id);

    if (!response.error) dispatch(updatePosts(response.data));
    setLikeLoading(false);
  };

  const handleDeleteClick = async () => {
    setDeleteLoading(true);
    const response = await deletePost(id);

    if (!response.error) dispatch(delPost(response.data));

    setDeleteLoading(false);
  };

  const handleEditClick = async () => {
    dispatch(
      setSelectedPost({
        id,
        title,
        description,
      })
    );
    dispatch(onOpenModal());
  };

  return (
    <div className="bg-gray-800 text-white my-4 p-5 rounded-2xl w-10/12 max-w-screen-xl">
      {/* title  and edit bar*/}

      <div className="border-b border-gray-400 pb-1 flex justify-between items-center">
        <h1 className="text-2xl">{title}</h1>
        <button className="icon_button" onClick={handleEditClick}>
          <PencilIcon className="h-5" />
        </button>
      </div>

      {/* description */}

      <p className="text-sm mt-2 bg-gray-600 p-2 rounded-md mb-1 shadow-lg">
        {description}
      </p>

      <div className="flex justify-between bg-gray-700 p-2 rounded-md items-center">
        {/* like button */}
        <button
          className="icon_button"
          disabled={likeLoading}
          onClick={handleLikeClick}
        >
          <ThumbUpIcon className="h-5" /> <span>{likeCount}</span>
        </button>
        <button
          className="icon_button"
          disabled={deleteLoading}
          onClick={handleDeleteClick}
        >
          <TrashIcon className="h-5" />
        </button>
        {/* delete button */}
      </div>
    </div>
  );
};

export default Post;
