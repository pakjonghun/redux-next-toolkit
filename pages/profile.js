import React, { useEffect } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import UserInputForm from '../components/UserInputForm';
import Follow from '../components/Follow';
import Follower from '../components/Follower';

const Profile = () => {
  const { me } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (!me.id) Router.push('/');
  }, [me && me.id]);

  return (
    <AppLayout>
      <Head>
        <title>Profile | NodeBird2</title>
      </Head>
      <UserInputForm />
      <Follow />
      <Follower />
    </AppLayout>
  );
};

export default Profile;
