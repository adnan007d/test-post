import { FC } from "react";
import Post from "./Post";
import { useAppSelector } from "../app/hook";
import { selectPosts } from "../slices/postSlice";

const PostFeed: FC = () => {
  const posts = useAppSelector(selectPosts);

  return (
    <div className="flex flex-col items-center mx-10 bg-black">
      {posts?.map((post, i) => (
        <Post
          key={post.id || i}
          id={post.id}
          title={post.title}
          description={post.description}
          likeCount={post.likeCount}
          user={post.user}
        />
      ))}
    </div>
  );
};

export default PostFeed;
