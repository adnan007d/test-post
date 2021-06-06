import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../../firebase-admin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET")
    return res.status(400).json({ message: "BAD REQUEST" });

  const uid = req.query.uid;

  try {
    const user = await db.collection("users").doc(uid.toString()).get();
    return res.status(200).json({
      ...user.data(),
      uid: user.id,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong!!" });
  }
};
