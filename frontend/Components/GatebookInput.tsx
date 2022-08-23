import { Input, Button, notification, message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react'
import style from '../styles/PostGate.module.css'
const GatebookInput = ({ author_email
}) => {
  const [content, setContent] = useState('')
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // console.log('Change:', e.target.value);
    setContent(e.target.value)
  };
  // const { TextArea } = Input
  const { TextArea } = Input;
  const handleSubmit = async (e) => {
    if (author_email) {
      const res = await axios.post('/api/post/addPost', {
        content,
        author_email
      })
      console.log('res', res)
      if (res.data.ok) {
        notification.open({
          message: '방명록에 성공적으로 글을 남겼습니다.',
          description:
            '',
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      } else {
        message.error('글올리기에 실패했습니다.');
      }
    } else {
      message.error('글올리기에 실패했습니다.');
    }
  }
  return (
    <div className="m-8 grid grid-rows-[auto_auto]">
      <TextArea showCount maxLength={100} onChange={onChange} />
      <div className="flex justify-end gap-1 mt-6">
        <Button type='primary' onClick={handleSubmit} >올리기</Button>
        {/* <Button type='primary' ghost  >비밀글</Button> */}
      </div>
    </div>
  )
}

export default GatebookInput