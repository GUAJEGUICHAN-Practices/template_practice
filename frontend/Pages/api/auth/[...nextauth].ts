import axios from "axios"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: 'Credentials',
      type: "credentials",
      credentials: {},
      authorize: async (credentials, req) => {
        const prisma = new PrismaClient();

        const { email, password } = credentials as {
          email: string,
          password: string
        }

        const result = await prisma.user.findUnique({
          where: {
            email: email
          },
          select: {
            password: true
          }
        })

        const match = await bcrypt.compare(password, result.password);
        // bcrypt.compare(password, result.password, function (err, result) {
        //   console.log('bcrypt result', result)
        if (match) {
          return {
            email,
            state: "good"
          }
          // res.json({ ok: true });
        } else {
          throw new Error("로그인 정보가 일치하지 않습니다")
          // throw err
          // throw new Error(err)
          // res.json({ ok: false, msg: "비밀번호가 틀립니다." });
        }
        // console.log('credentials', email, password)
        // const res = await axios.post('/api/login', {
        //   email,
        //   password
        // })
        // if (res.data.ok) {
        //   return {
        //     email,
        //     state: "good"
        //   }
        // } else {
        //   throw new Error(res.data.msg)
        // }
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET
})