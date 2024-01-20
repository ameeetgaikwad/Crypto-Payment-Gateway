import { NextApiRequest, NextApiResponse } from "next";

import User from "@/db/index";
import z from "zod";
export default async function addToDatabase(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const emailSchema = z.string().email();
  const body = req.body;
  const verifyEmail = emailSchema.safeParse(body.email);
  if (!verifyEmail.success) {
    res.status(404).json({ error: "Invalid email" });
    return;
  }
  if (req.method == "POST") {
    const { email } = req.body;
    const user = new User({ email });
    user.save();
    res.status(200).json({ email });
  }
}
