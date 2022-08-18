import React from 'react'
import { useRouter } from 'next/router'
import style from '../styles/PostGate.module.css'
import font from '../styles/index.module.css'

export const PostGate = ({ number, title, description, date, slug }) => {
  const router = useRouter()
  return (
    <div
      className={[style.container, font.font_JoongMyongJo].join(' ')}
      onClick={() => {
        router.push(`/detail/${slug}`)
      }}
    >
      <div className={style.title_container}>
        {number}. {title}
      </div>
      <div>{description}</div>
      <div className={style.date_container}>
        {date}
      </div>
    </div>
  )
}
