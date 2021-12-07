import React from 'react';
import Proptypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';
import wrapper from '../storeConfig';
import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick-theme.css';

const App = ({ Component }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <title>NodeBird2</title>
    </Head>
    <Component />
  </>
);

App.prototype = {
  Component: Proptypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
