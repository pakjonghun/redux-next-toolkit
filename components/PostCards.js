import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import postReducer from '../reducers/post';
import PostCard from './PostCard';

const PostCards = () => {
  const { postReducer: post, userReducer: user } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      postReducer.actions.getPostRequest({ content: 'abc', me: user.me })
    );
  }, [user.me]);

  return (
    <div className="site-card-wrapper">
      {post.mainPosts.map((item) => (
        <PostCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default PostCards;
