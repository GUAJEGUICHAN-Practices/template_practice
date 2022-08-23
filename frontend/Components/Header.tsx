import React from 'react'
import style from '../styles/index.module.css'

import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/react'

export const Header = ({ title, page_number }) => {
  const { data: session } = useSession()
  const router = useRouter()
  console.log('session', session)
  return (
    <header className={style.two_rows_grid}>
      <div className={style.top_header}>
        <div
          className={style.grid1}
          onClick={() => {
            router.push(`/`)
          }}
        >
          Home
        </div>
        <div
          className={style.grid9}
          onClick={() => {
            router.push('/guestbook')
          }}
        >
          방명록
        </div>
        {session ?
          <div className={style.grid10}
            onClick={() => {
              signOut()
            }}
          >로그아웃</div>
          :
          <div className={style.grid10}
            onClick={() => {
              signIn()
            }}
          >로그인</div>
        }
      </div>
      <div className={style.header_position}>
        <div>
          <span></span>
        </div>
        <div className={[style.font_ShinGrapic_3rem, style.header_middle].join(' ')}>
          <span>{title}</span>
        </div>
        <div className={[style.header_right, style.font_JoongMyongJo_3rem].join(' ')}>
          <span>{page_number}</span>
        </div>
      </div>
    </header>
  )
}
