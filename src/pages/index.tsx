import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { FC } from "react";
import AddEdit from "../components/AddEdit";
import Header from "../components/Header";
import PostFeed from "../components/PostFeed";
import { IPost, setPosts } from "../slices/postSlice";
import { useAppDispatch } from "../app/hook";
import nookies from "nookies";
import { adminAuth } from "../../firebase-admin";
import { IUser, signIn } from "../slices/userSlice";
interface props {
  posts: IPost[];
  user: IUser | null;
}

const Home: FC<props> = ({ posts, user: propUser }) => {
  const dispatch = useAppDispatch();

  dispatch(setPosts(posts));

  if (propUser) dispatch(signIn(propUser));

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

  let user = null;

  try {
    const cookies = nookies.get(context);

    if (!cookies.token)
      return {
        props: { posts, user },
      };

    const token = await adminAuth.verifyIdToken(cookies.token);

    const { uid, email, picture } = token;

    user = await fetch(`${process.env.HOST}/api/firebase/user/${uid}`).then(
      (res) => res.json()
    );
    user["idToken"] = cookies.token;
  } catch (err) {
    console.error(err);
  }

  return {
    props: { posts, user },
  };
};
