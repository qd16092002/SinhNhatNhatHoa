import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ImageWe.module.sass';

const cx = classNames.bind(styles);

// Dynamically import all images from the 'images' folder
const importAll = (requireContext) => requireContext.keys().map(requireContext);
const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

function ImageWe() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  const openModal = (image) => {
    setCurrentImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentImage('');
  };

  return (
    <div className={cx('image-wrapper')}>
      {images.map((image, index) => (
        <button key={index} className={cx('image-container')} onClick={() => openModal(image)}>
          <img src={image.default} alt={`${index + 1}`} className={cx('image')} />
          <div className={cx('overlay')}>
            <div className={cx('text')}>Yêu em ❤️❤️❤️</div>
          </div>
        </button>
      ))}

      {isModalOpen && (
        <button className={cx('modal')} onClick={closeModal}>
          <button className={cx('close')} onClick={closeModal}>&times;</button>
          <img className={cx('modal-content')} src={currentImage.default} alt="Enlarged" />
        </button>
      )}
    </div>
  );
}

export default ImageWe;
