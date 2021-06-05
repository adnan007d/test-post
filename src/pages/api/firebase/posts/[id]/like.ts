import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../../../firebase-admin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH")
    return res.status(400).json({ message: "BAD REQUEST" });

  const id = req.query.id.toString();

  const post = await db.collection("posts").doc(id).get();

  if (post.exists) {
    const newPost = {
      ...post.data(),
      id: post.id,
      likeCount: post.data()?.likeCount + 1,
    };
    await post.ref.update({
      likeCount: newPost.likeCount,
    });
    return res.status(201).json({ message: "post liked", data: newPost });
  } else {
    return res.status(404).json({ message: "post not found" });
  }
};
