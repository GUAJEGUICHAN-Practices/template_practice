import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  const { author_email, content } = req.body
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: author_email
    },
    select: {
      id: true,
      name: true
    }
  })
  const post = await prisma.post.create({
    data: {
      title: "",
      content,
      authorId: user.id,
      published: true,
      authorName: user.name
    }
  })
  console.log('post', post)

  res.json({ ok: true });
}