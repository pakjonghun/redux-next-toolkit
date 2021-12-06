import React from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const CoverImages = ({ images }) => {
  if (images.length === 1) {
    return (
      <img
        style={{ display: 'inline-block', width: '100%' }}
        alt={images[0].src}
        src={images[0].src}
        key={images[0].id}
        role="presentation"
      />
    );
  } else if (images.length === 2) {
    return (
      <>
        <img
          style={{ display: 'inline-block', width: '50%' }}
          alt={images[0].src}
          src={images[0].src}
          key={images[0].id}
          role="presentation"
        />
        <img
          style={{ display: 'inline-block', width: '50%' }}
          alt={images[0].src}
          src={images[0].src}
          key={images[0].id}
          role="presentation"
        />
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
          style={{ display: 'inline-block', width: '50%', cursor: 'pointer' }}
          alt={images[0].src}
          src={images[0].src}
          key={images[0].id}
          role="presentation"
        />
        <div
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
      </div>
    );
  }
};

CoverImages.prototype = {
  images: PropTypes.array.isRequired,
};

export default CoverImages;
