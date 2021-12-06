import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import postReducer from '../reducers/post';
import PostCard from './PostCard';
import PostForm from './PostForm';

const PostCards = () => {
  const { postReducer: post, userReducer: user } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.userReducer);
  useEffect(() => {
    dispatch(
      postReducer.actions.getPostRequest({ content: 'abc', me: user.me })
    );
  }, []);

  return (
    <div className="site-card-wrapper">
      {me && me.id && <PostForm />}
      {post.mainPosts.map((item) => (
        <PostCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default PostCards;
