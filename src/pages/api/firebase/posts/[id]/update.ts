import { NextApiResponse } from "next";
import { db } from "../../../../../../firebase-admin";
import withAuth, {
  CustomNextApiRequest,
} from "../../../../../authMiddleware/withAuth";
import { IPost } from "../../../../../slices/postSlice";

const handler: any = async (
  req: CustomNextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "PATCH")
    return res.status(400).json({ message: "BAD REQUEST" });

  const { id, description, title }: IPost = req.body;

  if (description.trim() === "" || title.trim() === "" || !id) {
    return res.status(400).json({ message: "All Fields are required" });
  }

  try {
    const postDoc = await db.collection("posts").doc(id).get();

    if (req.user.uid !== postDoc.data()?.user.uid)
      return res.status(401).json({ message: "UnAuthorized" });

    const updatePost = postDoc.ref.update({
      title: title.trim(),
      description: description.trim(),
    });
    return res.status(201).json({
      message: "Post Updated Successfully",
      data: {
        ...postDoc.data(),
        id: id,
        title: title,
        description: description,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong!!" });
  }
};

export default withAuth(handler);
