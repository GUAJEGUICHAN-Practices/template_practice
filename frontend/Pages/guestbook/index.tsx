import React from 'react'

import style from '../../styles/guestbook.module.css'
import { Header } from '../../Components/Header'
import GatebookInput from '../../Components/GatebookInput'
import GatebookPost from '../../Components/GatebookPost'
import { Input } from 'antd'
import { useSession } from 'next-auth/react'

const guestbook = () => {
  const { data: session } = useSession()

  return (
    <div className={[style.position].join(' ')}>
      <Header title='블 로 그' page_number={""} />
      <main className='grid grid-rows-[auto_1fr]'>
        {/* 글쓰기 */}
        <div className='grid place-items-center'>
          {session ?
            <GatebookInput
              author_email={session.user.email} /> :
            <div>
              <span
                className='text-base'
              >로그인을 하셔야 방명록 글을 쓸 수 있습니다.</span>
            </div>
          }

        </div>
        {/* <Input.TextArea showCount maxLength={100} onChange={onChange} /> */}
        {/* 조회 */}
        <div>
          <GatebookPost
            author={'test'}
            content={'test'}
            date={'test'}
            id={1}
            key={1}
          />
          <GatebookPost
            author={'test'}
            content={'test'}
            date={'test'}
            id={1}
            key={1}
          />
          <GatebookPost
            author={'test'}
            content={'test'}
            date={'test'}
            id={1}
            key={1}
          />

        </div>
      </main>
    </div>
  )
}

export default guestbook