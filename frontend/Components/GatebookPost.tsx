import { Button, Input, message } from 'antd';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import style from '../styles/guestbook.module.css'
import GuestBookPostMenu from './GuestBookPostMenu'
import GuestComment from './GuestComment'
const GatebookPost = ({
  is_mine,
  id,
  author,
  content,
  comments,
  date,
  session_email
}) => {
  const date_string = date.toString().slice(0, 10);
  const [editMode, setEditMode] = useState(false)
  const [newContent, setNewContent] = useState(content)
  const [commentToggle, setCommentToggle] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewContent(e.target.value)
  };

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const result = await axios.put(`/api/post/${id}`, {
        content: newContent
      })
      if (result.data.ok) {
        await router.replace(router.asPath)//getServerSideProps를 다시 부른다.
        setEditMode(false)//상태는 그대로이까 false로 변경해준다.
        message.success("수정에 성공했습니다.")
      }
    } catch (e) {
      message.error(e)
    }
  }

  return (
    <main className='grid grid-rows-[auto_1fr_auto_auto] mx-8 py-4 border-b-gray-500 border-b-[1px]
    first:border-t-[1px]  first:border-t-gray-500
    '>
      <div className='flex justify-between'>
        <div className=' font-bold text-base'>{author}</div>
        {is_mine && !editMode ?
          <GuestBookPostMenu
            id={id}
            setEditMode={setEditMode}
          /> : <div></div>
        }
      </div>

      {
        editMode ?
          <Input.TextArea
            showCount
            maxLength={100}
            value={newContent}
            onChange={handleChange}
          /> :
          <div className='text-base mb-4'>
            {content}
          </div>
      }
      {
        editMode ?
          <div className='flex flex-end'>
            <Button

              onClick={() => {
                setEditMode(false)
              }}
            >
              수정 취소
            </Button>
            <Button
              onClick={handleUpdate}
            >
              수정 완료
            </Button>
          </div> :
          <footer className='flex justify-between '>
            <div className='text-xs text-zinc-700'>{date_string}</div>
            <div
              className='text-xs text-zinc-700'
              onClick={() => { setCommentToggle(!commentToggle) }}>
              댓글
              {comments.length > 0 && <span className=' text-green-500'> {comments.length}개 </span>}
            </div>
          </footer>
      }
      <div>
        {commentToggle &&
          <GuestComment
            postId={id}
            comments={comments}
            session_email={session_email}
          />
        }
      </div>

    </main>
  )
}

export default GatebookPost