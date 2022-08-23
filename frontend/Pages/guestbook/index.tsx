import React from 'react'

import style from '../../styles/guestbook.module.css'
import { Header } from '../../Components/Header'
import GatebookInput from '../../Components/GatebookInput'
import GatebookPost from '../../Components/GatebookPost'
import { useSession } from 'next-auth/react'
import { PrismaClient } from '@prisma/client'
import { Spin } from 'antd'

const guestbook = ({ posts, }) => {
  const { data: session, status } = useSession()
  console.log('useSession', session, status)
  if (status === "loading") {
    return (
      <div className="flex-1">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div className={[style.position].join(' ')}>
      <Header title='블 로 그' page_number={""} />
      <main className='grid grid-rows-[auto_1fr]'>
        <div>
          {session ?
            <GatebookInput
              author_email={session.user.email} /> :
            <div>
              <span
                className='text-base self-center'
              >로그인을 하셔야 방명록 글을 쓸 수 있습니다.</span>
            </div>
          }
        </div>
        <div>
          {
            posts.length === 0 ?
              <span>방명록 글이 없습니다.</span>
              :
              posts.map(post => (
                <GatebookPost
                  is_mine={post.author.email === session?.user?.email}
                  author={post.author.name}
                  content={post.content}
                  date={post.createdAt}
                  comments={post.comments}
                  id={post.id}
                  key={post.id}
                />
              ))
          }
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps = async ({ }) => {
  const prisma = new PrismaClient();
  const posts = await prisma.post.findMany({
    orderBy: [
      {
        id: 'desc'
      }
    ],
    where: {
      published: true
    },
    select: {
      author: {
        select: {
          email: true,
          name: true
        }
      },
      content: true,
      comments: true,
      createdAt: true,
      id: true
    }
  })
  console.log(posts)
  return {
    props: {
      posts,
    }
  }
}

export default guestbook