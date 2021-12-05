import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Row, Col } from 'antd';

const Post = () => {
  const { posts } = useSelector((state) => state.post);

  return (
    <div className="site-card-wrapper">
      <Row>
        <Col xs={12} md={12}>
          <Card hoverable cover={<img alt="alt" />} />
        </Col>
        <Col xs={12} md={12}>
          <Card hoverable />
        </Col>{' '}
      </Row>
    </div>
  );
};

export default Post;
