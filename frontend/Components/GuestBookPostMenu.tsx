import React from 'react'
import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, Menu, message, Popconfirm, Space } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';

const GuestBookPostMenu = ({
  id,
  setEditMode
}) => {
  const router = useRouter()
  const deleteConfirm = async (e) => {
    e.preventDefault()
    console.log("삭제 버튼 클릭")
    try {
      const result = await axios.delete(`/api/post/${id}`)
      if (result.data.ok) {
        message.destroy('Clicked on Yes.');
        await router.replace(router.asPath)
      } else {
        throw new Error("삭제에 실패했습니다.")
      }
    } catch (e) {
      message.error(e)
    } finally {
      message.destroy('Clicked on Yes.');
    }
  };
  const handleUpdate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setEditMode(true)
  }

  const menu = (
    <Menu
      items={[
        {
          label: <a
            onClick={handleUpdate}
          >수정하기</a>,
          key: '0',
        },
        {
          label: <Popconfirm
            placement="topRight"
            title={"정말 삭제하시겠습니까?"}
            onConfirm={deleteConfirm}
            okText="Yes"
            cancelText="No"
          >
            삭제하기
          </Popconfirm>,
          key: '1',
        },
      ]}
    />
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a onClick={e => e.preventDefault()}>
        <Space>
          <MoreOutlined />
        </Space>
      </a>
    </Dropdown>)
}


export default GuestBookPostMenu