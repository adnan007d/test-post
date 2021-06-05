import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../../../firebase-admin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "DELETE")
    return res.status(400).json({ message: "BAD REQUEST" });

  const id = req.query.id.toString();

  const post = await db.collection("posts").doc(id).get();

  if (post.exists) {
    await post.ref.delete();
    return res.status(201).json({ message: "post deleted", data: post.id });
  } else {
    return res.status(404).json({ message: "post not found" });
  }
};
