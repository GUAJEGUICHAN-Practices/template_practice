import { Input, Button } from 'antd';
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
  const handleSubmit = (e) => {
    axios.post('/post/addPost', {
      content,
      author_email
    })
  }
  // const
  return (
    <div className="m-8 grid grid-rows-[auto_auto]">
      <TextArea showCount maxLength={100} onChange={onChange} />
      <div className="flex justify-end gap-1 mt-6">
        <Button type='primary' >올리기</Button>
        {/* <Button type='primary' ghost  >비밀글</Button> */}
      </div>
    </div>
  )
}

export default GatebookInput