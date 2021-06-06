import { NextApiResponse } from "next";
import { db } from "../../../../../../firebase-admin";
import withAuth, {
  CustomNextApiRequest,
} from "../../../../../authMiddleware/withAuth";

const handler: any = async (
  req: CustomNextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "DELETE")
    return res.status(400).json({ message: "BAD REQUEST" });

  const id = req.query.id.toString();

  const post = await db.collection("posts").doc(id).get();

  if (post.exists) {
    if (req.user.uid !== post.data()?.user.uid)
      return res.status(401).json({ message: "UnAuthorized" });
    await post.ref.delete();
    return res.status(201).json({ message: "post deleted", data: post.id });
  } else {
    return res.status(404).json({ message: "post not found" });
  }
};

export default withAuth(handler);
