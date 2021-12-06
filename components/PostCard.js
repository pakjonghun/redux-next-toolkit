import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { List, Avatar, Card, Popover, Button } from 'antd';
import {
  RetweetOutlined,
  EllipsisOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import CoverImages from './CoverImages';

const PostCard = ({ item }) => {
  const [isCommentOpened, setCommentOpened] = useState(false);
  const onCommentClick = useCallback(() => {
    setCommentOpened(!isCommentOpened);
  }, [isCommentOpened]);
  const { me } = useSelector((state) => state.userReducer);
  return (
    <>
      <Card
        style={{ marginBottom: 15 }}
        actions={[
          <RetweetOutlined key="reload" />,
          <CommentOutlined onClick={onCommentClick} key="comment" />,
          <Popover
            content={
              me && me.id ? (
                <>
                  <Button type="danger">삭제</Button>
                  <Button>편집</Button>
                </>
              ) : (
                <Button>신고</Button>
              )
            }
          >
            <EllipsisOutlined key="ellip" />
          </Popover>,
        ]}
        cover={<CoverImages images={item.images} />}
      >
        <Card.Meta
          avatar={<Avatar src={item.user.me.avatar} />}
          title={item.user.me.id}
          description={item.title}
        />
      </Card>
      {isCommentOpened && (
        <List
          itemLayout="vertical"
          dataSource={item.comments}
          renderItem={(comment) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={comment.user.avatar} />}
                title={comment.user.id}
                description={comment.content}
              />
            </List.Item>
          )}
        />
      )}
    </>
  );
};

PostCard.prototype = {
  item: PropTypes.objectOf({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    user: PropTypes.objectOf({
      me: PropTypes.objectOf({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      }),
    }),
    comments: PropTypes.array.isRequired,
  }),
};

export default PostCard;
