import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { FC } from "react";
import AddEdit from "../components/AddEdit";
import Header from "../components/Header";
import PostFeed from "../components/PostFeed";
import { IPost, setPosts } from "../slices/postSlice";
import { useAppDispatch } from "../app/hook";

interface props {
  posts: IPost[];
}

const Home: FC<props> = ({ posts }) => {
  const dispatch = useAppDispatch();

  dispatch(setPosts(posts));

  return (
    <div className="bg-black min-h-screen">
      <Head>
        <title>TEST-POST</title>
        <meta name="description" content="TEST POST" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <PostFeed />

      <AddEdit />
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const posts: IPost[] = await fetch(
    `${process.env.HOST}/api/firebase/posts`
  ).then((res) => res.json());

  return {
    props: { posts },
  };
};
