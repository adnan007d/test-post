import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { FC, FormEvent, FormEventHandler, useEffect, useState } from "react";
import { onCloseModal, selectOpen } from "../slices/modalSlice";
import { useAppDispatch, useAppSelector } from "../app/hook";
import {
  IPost,
  addPost,
  selectPost,
  updatePosts,
  setSelectedPost,
} from "../slices/postSlice";
import { createPost, updatePost } from "../actions/postsActions";

const AddEdit: FC = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectOpen);
  const { id, title, description } = useAppSelector(selectPost);

  const [pageType, setPageType] = useState<string>("Add");

  const [post, setPost] = useState<IPost>({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (id) setPageType("Edit");
    else setPageType("Add");
    setPost({
      title: title,
      description: description,
    });
  }, [id, title, description]);

  const [loading, setLoading] = useState<boolean>(false);

  const clear = () => {
    setPost({
      title: "",
      description: "",
    });
  };

  const handleSubmit: FormEventHandler = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (post.title.trim() === "" || post.description.trim() === "") return;

    setLoading(true);
    if (id) {
      const response = await updatePost({
        ...post,
        id: id,
      });
      if (!response.error) {
        clear();
        dispatch(updatePosts(response.data));
        dispatch(onCloseModal());
      }
    } else {
      const response = await createPost(post);
      if (!response.error) {
        clear();
        dispatch(addPost(response.data));
        dispatch(onCloseModal());
      }
    }

    setLoading(false);
  };

  const handleModalClose = () => {
    dispatch(onCloseModal());
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleModalClose}
        classNames={{
          modal: "rounded-sm",
        }}
        center
      >
        <form
          onSubmit={handleSubmit}
          className="mt-5 p-5 flex flex-col space-y-4 "
        >
          <h2 className="text-3xl font text-center">{pageType}</h2>
          <div className="border-t border-gray-700 w-full"></div>

          <input
            type="text"
            className="bg-gray-400 rounded-md p-2 px-4 focus:outline-none placeholder-gray-700"
            placeholder="Title"
            value={post.title}
            onChange={(e) => {
              setPost({
                ...post,
                title: e.target.value,
              });
            }}
          />
          <input
            type="text"
            className="bg-gray-400 rounded-md p-2 px-4 focus:outline-none placeholder-gray-700"
            placeholder="Description"
            value={post.description}
            onChange={(e) => {
              setPost({
                ...post,
                description: e.target.value,
              });
            }}
          />
          <div
            className={`flex bg-blue-500 p-2 w-max rounded-md ${
              loading && "bg-blue-300"
            }`}
          >
            <button
              type="submit"
              className="focus:outline-none"
              disabled={loading}
            >
              {pageType}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddEdit;
