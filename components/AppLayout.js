import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Menu, Input } from 'antd';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';
import userReducer from '../reducers/user';

const { Search } = Input;

const AppLayout = ({ children }) => {
  const { value, onChange } = useInput('');
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(userReducer.actions.loginRequest({ id: 1, pw: 1 }));
  }, [value]);

  return (
    <>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a>Home</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="signup">
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="search">
          <Search
            style={{ verticalAlign: 'middle' }}
            onSearch={onClick}
            value={value}
            onChange={onChange}
            placeholder="search"
          />
        </Menu.Item>
      </Menu>
      <Row>
        <Col xs={24} md={6}>
          1번행
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://www.naver.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            블로그
          </a>
        </Col>
      </Row>
    </>
  );
};

AppLayout.prototype = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
