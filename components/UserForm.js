import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar, Button } from 'antd';
import Meta from 'antd/lib/card/Meta';
import userReducer from '../reducers/user';

const UserForm = () => {
  const dispatch = useDispatch();
  const { isLogoutLoading, me } = useSelector((state) => state.userReducer);
  const onClick = useCallback(() => {
    dispatch(userReducer.actions.logoutRequest());
  }, []);
  return (
    <Card
      actions={[
        <div key="post">게시글{me.posts.length}</div>,
        <div key="follow">팔로우{me.follows.length}</div>,
        <div key="follower">팔로워 {me.followers.length}</div>,
      ]}
    >
      <Meta
        avatar={<Avatar src={me.avatar} />}
        title={me.email}
        description={me.nickName}
      />
      <Button
        style={{ marginTop: 10 }}
        loading={isLogoutLoading}
        onClick={onClick}
      >
        로그아웃
      </Button>
    </Card>
  );
};

export default UserForm;
