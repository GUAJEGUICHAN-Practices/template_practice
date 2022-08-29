import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  console.log(data)
  await bcrypt.hash(data.password, 10, function (err, hash) {
    prisma.user.create({
      data: {
        email: data.email,
        name: data.username,
        password: hash
      }
    }).then(data => {
      console.log(data)
      res.json({ ok: true })
    }
    ).catch((err) => {
      res.json({ ok: false, err })
      throw err
    })
    // Store hash in your password DB.
  });

  // const res = await prisma

  // console.log()
  // const id = 1;
  // const foundUser = findUser(id);
  // const foundUser = { data };

  // res.json({ ok: true, foundUser });
}