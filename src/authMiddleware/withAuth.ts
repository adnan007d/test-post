import next, { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { adminAuth, db } from "../../firebase-admin";
import { IUser } from "../slices/userSlice";

export interface CustomNextApiRequest extends NextApiRequest {
  user: IUser;
}

const withAuth = (handler: NextApiHandler) => {
  return async (req: CustomNextApiRequest, res: NextApiResponse) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (token) {
        const { uid } = await adminAuth.verifyIdToken(token);

        const user = await (await db.collection("users").doc(uid).get()).data();
        req.user = {
          displayName: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
          uid,
        };
        return handler(req, res);
      } else {
        return res.status(401).json({ message: "UnAuthorized" });
      }
    } catch {
      return res.status(401).json({ message: "UnAuthorized" });
    }
  };
};

export default withAuth;
