import React from 'react';
import classNames from 'classnames/bind';
import styles from './ImageWe.module.sass';

const cx = classNames.bind(styles);

function ImageWe() {
  const images = [
    'https://firebasestorage.googleapis.com/v0/b/investy-b17a1.appspot.com/o/Hoa%2FN%E1%BB%81n.jpg?alt=media&token=51ce0a6e-7718-447f-8b06-bf9631023077',
    'https://firebasestorage.googleapis.com/v0/b/investy-b17a1.appspot.com/o/Hoa%2Flove-letter_1f48c.png?alt=media&token=abadd707-4f2d-482d-bb1e-65788a228b8b',
    'https://firebasestorage.googleapis.com/v0/b/investy-b17a1.appspot.com/o/Hoa%2Fbacknew.png?alt=media&token=97b5a371-2eae-4f13-9c67-327ac7422c43',
  ];

  return (
    <div className={cx('image-wrapper')}>
      {images.map((image, index) => (
        <div key={index} className={cx('image-container')}>
          <img src={image} alt={`${index + 1}`} className={cx('image')}></img>
        </div>
      ))}
    </div>
  );
}

export default ImageWe;
