import React from 'react'
import style from '../styles/guestbook.module.css'
import GuestBookPostMenu from './GuestBookPostMenu'
const GatebookPost = ({
  id,
  author,
  content,
  comments,
  date
}) => {
  const date_string = date.toString().slice(0, 10);
  // console.log(date_string)
  // console.log(typeof date)
  return (
    <main className='grid grid-rows-[auto_1fr_auto] mx-8 py-4 border-b-gray-500 border-b-[1px]
    first:border-t-[1px]  first:border-t-gray-500
    '>
      <div className='flex justify-between'>
        <div className=' font-bold text-base'>{author}</div>
        <GuestBookPostMenu />
      </div>
      <div className='text-base mb-4'>{content}</div>
      <footer className='flex justify-between '>
        <div className='text-xs text-zinc-700'>{date_string}</div>
        <div className='text-xs text-zinc-700'>댓글</div>
      </footer>
    </main>
  )
}

export default GatebookPost