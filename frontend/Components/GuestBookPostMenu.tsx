import React from 'react'
import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';

const GuestBookPostMenu = () => {

  const menu = (
    <Menu
      items={[
        {
          label: <a href="https://www.antgroup.com">수정하기</a>,
          key: '0',
        },
        {
          label: <a href="https://www.aliyun.com">삭제하기</a>,
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