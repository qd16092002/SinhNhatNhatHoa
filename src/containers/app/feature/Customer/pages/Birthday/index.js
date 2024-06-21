import classNames from 'classnames/bind';
import styles from './Birthday.module.sass';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Birthday() {
  const [isLetterVisible, setIsLetterVisible] = useState(false);

  const toggleLetterVisibility = () => {
    setIsLetterVisible(!isLetterVisible);
  };


  return (
    <div className={cx('home-wrapper')}>
      {!isLetterVisible ?
        (
          <div style={{
            width: '12%',
            height: '20%',
            display: 'flex',
            marginLeft: '42%',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <button
              className={cx('button_letter', 'fade-up')}
              onClick={toggleLetterVisibility}
            >
              <img
                src='https://firebasestorage.googleapis.com/v0/b/investy-b17a1.appspot.com/o/Hoa%2Flove-letter_1f48c.png?alt=media&token=abadd707-4f2d-482d-bb1e-65788a228b8b'
                alt='letter'
                className={cx('image_button')}
              ></img>
            </button>
          </div>
        )
        :
        (<div className={cx('letter')}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <div>
              <div className={cx('thangui')}>Gửi em bé Nhật Hoa</div>
              <div className={cx('content')}>Hôm nay là một ngày đặc biệt, ngày mà em cảm thấy hạnh phúc nhất vì được được nhận những lời chúc mừng sinh nhật từ những người mà em yêu thương và trân trọng. Và anh cũng muốn gửi tới em một lời chúc yêu thương em nhất.</div>
            </div>
            <img src='https://firebasestorage.googleapis.com/v0/b/investy-b17a1.appspot.com/o/Hoa%2Fimage%2034.png?alt=media&token=42d58dcc-3d1e-4b3f-b71c-3321b4bad471' alt='image_letter'
              className={cx('image_letter')}></img>
          </div>
          <div className={cx('content_2')}>Chúc em luôn luôn hạnh phúc, vui vẻ và tràn đầy sức khỏe. Anh biết rằng cuộc sống của mình có thể có lúc khó khăn lúc vui vẻ nhưng em vẫn giúp đỡ anh, anh cũng tin rằng với tình yêu và sự ủng hộ của mình, chúng ta có thể vượt qua tất cả. Anh luôn ở bên em, yêu em, thương em, dù là trong những khoảnh khắc vui vẻ hay khi em cần một bờ vai để tựa vào.</div>
          <div className={cx('content_2')}>Anh cảm ơn em vì đã đến bên cuộc đời anh, mang lại cho anh niềm vui và hạnh phúc mà trước đây anh không biết đến. Chỉ vừa qua 3 tháng nhưng anh đã cảm thấy thật sự may mắn khi có em ở bên cạnh. Có những lúc anh làm em buồn, lúc anh làm em vui nhưng anh chỉ muốn là em không phải khóc. Mong em luôn hạnh phúc và vui tươi.</div>
          <div className={cx('content_2')}>Chúc em có một ngày sinh nhật thật ấm áp và tràn ngập niềm vui. Hãy luôn cười tươi như em vẫn thường làm, vì nụ cười của em làm cho thế giới này của anh thêm rạng rỡ.</div>
          <div className={cx('content_2')}>Anh yêu em rất nhiều!</div>
        </div>)}
    </div>
  );
}

export default Birthday;
