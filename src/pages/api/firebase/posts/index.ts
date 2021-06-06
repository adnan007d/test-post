import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../../firebase-admin";
import { IPost } from "../../../../slices/postSlice";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") res.status(400).json({ message: "BAD REQUEST" });

  const postsDoc = await (await db.collection("posts").get()).docs;

  const posts: IPost[] = postsDoc.map((postDoc) => ({
    title: postDoc.data().title,
    description: postDoc.data().description,
    likeCount: postDoc.data().likeCount,
    id: postDoc.id,
    user: postDoc.data().user,
  }));

  res.status(200).json(posts);
};
