import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../../firebase-admin";
import { IPost } from "../../../../slices/postSlice";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST")
    return res.status(400).json({ message: "BAD REQUEST" });

  const { description, title }: IPost = req.body;

  if (description.trim() === "" || title.trim() === "") {
    return res.status(400).json({ message: "All Fields are required" });
  }
  const post = {
    description: description,
    title: title,
    likeCount: 0,
  };
  try {
    const postDoc = await db.collection("posts").add(post);
    return res.status(201).json({
      message: "Post Created Successfully",
      data: { id: postDoc.id, ...post },
    });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong!!" });
  }
};
