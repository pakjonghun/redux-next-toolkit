import { Card } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

const Follow = () => {
  const { me } = useSelector((state) => state.userReducer);
  return <Card title="follow">Follow{me.follows.length}명</Card>;
};

export default Follow;
