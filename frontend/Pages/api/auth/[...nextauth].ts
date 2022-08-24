import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

export default NextAuth({
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
            name: true,
            password: true
          }
        })

        const match = await bcrypt.compare(password, result.password);
        if (match) {
          return {
            email,
            name: result.name,
            state: "good"
          }
          // res.json({ ok: true });
        } else {
          throw new Error("로그인 정보가 일치하지 않습니다")
        }
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token, user }) {
      return session
    },

  }
})