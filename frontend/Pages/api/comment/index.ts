import { Comment } from 'antd';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  const { postId, author_email, content } = req.body
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: author_email
      },
      select: {
        id: true,
        name: true
      }
    })
    const comment = await prisma.comment.create({
      data: {
        postId,
        content,
        authorId: user.id,
        published: true,
      }
    })
    console.log('comment', comment)
    res.json({ ok: true });
  } catch (err) {
    res.json({ ok: false, err: err })
  }
}