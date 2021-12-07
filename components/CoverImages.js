import React, { useCallback } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import postReducer from '../reducers/post';
import ZoomImageContainer from './ZoomImages/ZoomImageContainer';

const CoverImages = ({ images }) => {
  const dispatch = useDispatch();
  const { isZoomImagesShow } = useSelector((state) => state.postReducer);
  const onOpenZoomImages = useCallback(() => {
    dispatch(postReducer.actions.toggleZoomImages());
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img
          onClick={onOpenZoomImages}
          style={{ display: 'inline-block', width: '100%' }}
          alt={images[0].src}
          src={images[0].src}
          key={images[0].id}
          role="presentation"
        />
        {isZoomImagesShow && <ZoomImageContainer images={images} />}
      </>
    );
  } else if (images.length === 2) {
    return (
      <>
        <img
          onClick={onOpenZoomImages}
          style={{ display: 'inline-block', width: '50%' }}
          alt={images[0].src}
          src={images[0].src}
          key={images[0].id}
          role="presentation"
        />
        <img
          onClick={onOpenZoomImages}
          style={{ display: 'inline-block', width: '50%' }}
          alt={images[0].src}
          src={images[0].src}
          key={images[0].id}
          role="presentation"
        />
        {isZoomImagesShow && <ZoomImageContainer images={images} />}
      </>
    );
  } else if (images.length > 2) {
    return (
      <div
        style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          onClick={onOpenZoomImages}
          style={{ display: 'inline-block', width: '50%', cursor: 'pointer' }}
          alt={images[0].src}
          src={images[0].src}
          key={images[0].id}
          role="presentation"
        />
        <div
          onClick={onOpenZoomImages}
          style={{
            border: ' 1px solid lightGray',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            width: '50%',
          }}
        >
          <PlusCircleOutlined style={{ fontSize: '1.2rem' }} />
        </div>
        {isZoomImagesShow && <ZoomImageContainer images={images} />}
      </div>
    );
  }
};

CoverImages.prototype = {
  images: PropTypes.array.isRequired,
};

export default CoverImages;
