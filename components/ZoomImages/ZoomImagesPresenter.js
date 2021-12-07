import React, { useCallback, useState } from 'react';
import Slider from '@ant-design/react-slick';
import { CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import postReducer from '../../reducers/post';

const ZoomImagesPresenter = ({ images }) => {
  const dispatch = useDispatch();
  const { isZoomImagesShow } = useSelector((state) => state.postReducer);
  const onCancel = useCallback(() => {
    dispatch(postReducer.actions.toggleZoomImages());
  }, []);

  return (
    <Container isShow={isZoomImagesShow}>
      <Header>
        <CloseOutlined
          style={{ fontSize: '1rem', cursor: 'pointer' }}
          onClick={onCancel}
        />
      </Header>
      <Slider
        dots={true}
        infinite
        speed={400}
        initialSlide={0}
        autoplay={true}
        slidesToShow={1}
      >
        {images.map((item) => (
          <img
            alt={item.src}
            key={item.id}
            role="presentation"
            src={item.src}
          />
        ))}
      </Slider>
    </Container>
  );
};

export default ZoomImagesPresenter;

const Container = styled.div`
  position: fixed;
  top: 0;
  display: ${({ isShow }) => (isShow ? 'block' : 'none')};
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 1;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.9rem;
  background-color: gray;
`;
