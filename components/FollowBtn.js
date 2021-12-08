import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import postReducer from '../reducers/post';

const FollowBtn = ({ postId }) => {
  const { me } = useSelector((state) => state.userReducer);
  if (!me.id) return null;
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch(postReducer.actions.followRequest({ postId, me }));
  }, []);
  const { isFollowLoading } = useSelector((state) => state.userReducer);
  return (
    <>
      <Button loading={isFollowLoading} onClick={onClick}>
        Follow
      </Button>
    </>
  );
};

FollowBtn.prototype = {
  postId: PropTypes.string.isRequired,
};

export default FollowBtn;
