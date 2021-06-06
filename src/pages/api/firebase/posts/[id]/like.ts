import { NextApiResponse } from "next";
import { db } from "../../../../../../firebase-admin";
import withAuth, {
  CustomNextApiRequest,
} from "../../../../../authMiddleware/withAuth";

const handler: any = async (
  req: CustomNextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "PATCH")
    return res.status(400).json({ message: "BAD REQUEST" });

  const id = req.query.id.toString();

  const post = await db.collection("posts").doc(id).get();

  const postData = post.data();

  if (!post.exists || !postData)
    return res.status(404).json({ message: "post not found" });

  const alreadyLiked = await (
    await db
      .collection("likes")
      .where("userId", "==", req.user.uid)
      .where("postId", "==", id)
      .get()
  ).docs;

  // Post is Already liked need to delete it
  if (alreadyLiked.length && alreadyLiked[0].exists) {
    await db.collection("likes").doc(alreadyLiked[0].id).delete();
    postData.likeCount = postData?.likeCount - 1;
  } else {
    await db.collection("likes").add({
      postId: post.id,
      userId: req.user.uid,
    });
    postData.likeCount = postData?.likeCount + 1;
  }

  await post.ref.update({
    id: post.id,
    likeCount: postData.likeCount,
  });
  return res.status(201).json({ message: "post liked", data: postData });
};

export default withAuth(handler);
