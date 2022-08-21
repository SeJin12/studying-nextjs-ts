// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  content?: string
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, query } = req;
  console.log(method, query);

  res.status(200).json({ name: "John Doe", content: "hello api" });
}
