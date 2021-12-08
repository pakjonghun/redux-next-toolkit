import { Card } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

const Follower = () => {
  const { me } = useSelector((state) => state.userReducer);
  return <Card title="follower">Follow{me.followers.length}명</Card>;
};

export default Follower;
