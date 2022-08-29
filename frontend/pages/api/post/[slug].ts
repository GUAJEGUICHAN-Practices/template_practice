import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const { slug } = req.query
  console.log('req', req)
  console.log('req.query', req.query)
  if (req.method === "PUT") {
    const { content } = req.body
    try {
      const result = await prisma.post.update({
        where: {
          id: Number(slug)
        },
        data: {
          content
        }
      })
      console.log(result)
      res.json({ ok: true })

    } catch (e) {
      res.json({ ok: false })
    }

  } else if (req.method === "DELETE") {
    try {

      const result = await prisma.post.delete({
        where: {
          id: Number(slug)
        }
      })
      console.log(result)
      res.json({ ok: true })
    } catch (err) {
      res.json({ ok: false })
    }
  }
}