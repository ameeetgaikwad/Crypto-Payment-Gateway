import { NextApiRequest, NextApiResponse } from "next";

import mongoose from "mongoose";
import User from "@/db/index";
export default async function addToDatabase(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  if (req.method == "POST") {
    const { email } = req.body;

    const approve = await User.where("email").equals(email);

    if (approve.length == 0) {
      res.status(200).json({ data: false });
    } else {
      res.status(200).json({ data: true });
    }
  }
}
