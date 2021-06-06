import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../firebase-admin";
import { IUser } from "../../../slices/userSlice";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST")
    return res.status(400).json({ message: "BAD REQUEST" });

  const user: IUser = req.body;

  try {
    const userDoc = await db.collection("users").doc(user.uid).get();
    if (!userDoc.exists) {
      await userDoc.ref.set(user);
    }
    return res.status(201).json({ message: "User created Successfully" });
  } catch (err) {
    console.error(err);

    return res.status(500).json({ message: "Something went wrong!!" });
  }
};
