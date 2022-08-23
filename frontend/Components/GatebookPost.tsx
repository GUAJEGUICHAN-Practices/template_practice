import React from 'react'
import style from '../styles/guestbook.module.css'
import GuestBookPostMenu from './GuestBookPostMenu'
const GatebookPost = ({
  id,
  author,
  content,
  date
}) => {
  return (
    <main className='grid grid-rows-[auto_1fr_auto] mx-8 py-4 border-b-gray-500 border-b-[1px]
    first:border-t-[1px]  first:border-t-gray-500
    '>
      <div className='flex justify-between'>
        <div className=' font-bold text-base'>이름</div>
        <GuestBookPostMenu />
      </div>
      <div className='text-base mb-4'>내용</div>
      <footer className='flex justify-between '>
        <div className='text-xs text-zinc-700'>날짜</div>
        <div className='text-xs text-zinc-700'>댓글</div>
      </footer>
    </main>
  )
}

export default GatebookPost