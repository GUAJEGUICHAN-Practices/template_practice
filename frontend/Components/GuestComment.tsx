import { PrismaClient } from '@prisma/client';
import { Avatar, Button, Comment, Form, Input, List } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const { TextArea } = Input;

interface CommentItem {
  author: string;
  avatar: string;
  content: React.ReactNode;
  datetime: string;
}

interface EditorProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string;
}

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={(props: any) =>
      <Comment
        // {...props}
        author={props.author.name}
        avatar={""}
        content={props.content}
        datetime={moment(props.createdAt).fromNow()}
      />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }: EditorProps) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const GuestComment = ({ comments, postId, session_email }) => {
  // const [comments, setComments] = useState<CommentItem[]>([]);

  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const router = useRouter()

  const handleSubmit = async () => {
    if (!value) return;

    setSubmitting(true);

    setTimeout(async () => {
      setSubmitting(false);
      setValue('');
      try {
        const result = await axios.post('/api/comment', {
          postId,
          content: value,
          author_email: session_email
        })
        setValue("")
        if (result.data.ok) {

        } else {
          throw new Error("댓글 쓰기 실패")
        }
        router.replace(router.asPath, undefined, {
          scroll: false
        })
      } catch (err) {
        console.log(err)
        return
      }
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={""}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </>
  );
};

export default GuestComment;
