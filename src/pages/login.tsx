import { auth, GoogleProvider } from "../../firebase";
import { FC } from "react";
import nookies, { setCookie } from "nookies";
import { useRouter } from "next/router";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { adminAuth } from "../../firebase-admin";
import { createUser } from "../actions/userActions";

const Login: FC = () => {
  const router = useRouter();

  const signIn = async () => {
    try {
      const result = await auth.signInWithPopup(GoogleProvider);
      const user = await result.user;
      const token = await user?.getIdToken();
      await setCookie(null, "token", token || "", { path: "/" });
      //   localStorage.setItem("user", JSON.stringify(user));
      await createUser({
        displayName: user?.displayName || "",
        photoURL: user?.photoURL || "",
        email: user?.email || "",
        uid: user?.uid || "",
      });
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen w-screen grid place-items-center bg-black">
      <button onClick={signIn} className="btn border border-white">
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const cookies = nookies.get(context);

    if (!cookies.token)
      return {
        props: {},
      };

    const token = await adminAuth.verifyIdToken(cookies.token);

    const { uid, email, picture } = token;

    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } catch (err) {
    console.error(err);
  }

  return {
    props: {},
  };
};
