import React, { useEffect, useLayoutEffect, memo } from 'react';
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
  const { isPostAddLoading, mainPosts } = useSelector(
    (state) => state.postReducer
  );

  useEffect(() => {
    dispatch(postReducer.actions.getPostRequest({ me: user.me }));
  }, []);

  useLayoutEffect(() => {
    const con = () => {
      const cur = window.scrollY;
      const total = document.documentElement.scrollHeight;
      const innerHeight = document.scrollingElement.clientHeight;
      const isNeedMort = mainPosts.length >= 50;
      if (cur + innerHeight + 500 > total && !isPostAddLoading && !isNeedMort) {
        dispatch(postReducer.actions.getPostRequest({ me: user.me }));
      }
    };

    window.addEventListener('scroll', con);
    return () => window.removeEventListener('scroll', con);
  }, [isPostAddLoading, mainPosts]);

  const items = () => {
    if (me && me.id) {
      return (
        <>
          <PostForm />
          {mainPosts.map((item) => (
            <PostCard key={item.id} item={item} />
          ))}
        </>
      );
    } else {
      return (
        <>
          {mainPosts.map((item) => (
            <PostCard key={item.id} item={item} />
          ))}
        </>
      );
    }
  };

  return <>{mainPosts.map(items)}</>;
};

export default PostCards;
