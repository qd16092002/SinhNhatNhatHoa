import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './TimeDown.module.sass';
import Confetti from 'react-confetti';

const cx = classNames.bind(styles);

function TimeDown() {
  const navigate = useNavigate();
  const targetDate = new Date('2024-06-22T09:46:00');
  // const targetDate = new Date('2024-06-22T09:46:00');

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        setIsTimeUp(true);
        setShowConfetti(true);
        setTimeout(() => {
          navigate('/home');
        }, 5000); // Show confetti for 10 seconds before navigating
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, navigate]);

  useEffect(() => {
    if (new Date() >= targetDate) {
      setIsTimeUp(true);
      setShowConfetti(true);
      setTimeout(() => {
        navigate('/home');
      }, 10000); // Show confetti for 10 seconds before navigating
    }
  }, [targetDate, navigate]);

  useEffect(() => {
    if (isTimeUp) {
      setTimeout(() => {
        navigate('/home');
      }, 10000);
    }
  }, [isTimeUp, navigate]);

  if (isTimeUp) {
    return (
      <div className={cx('home-wrapper')}>
        <div >
          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <img src='https://firebasestorage.googleapis.com/v0/b/investy-b17a1.appspot.com/o/Hoa%2Fe7ad7534-ac9f-415b-9511-c8a57367f1f6.jpg?alt=media&token=4a1c909d-21a4-4f1d-9eda-6d62ec82d591'
              alt='nhathoa'
              className={cx('iamge_nhathoa')}
            ></img>
          </div>
          <div className={cx('message')}>
            Chúc mừng sinh nhật em bé Nhật Hoa, website này là dành riêng cho em. Yêu em!!!!!
          </div>
        </div>
        {showConfetti && <Confetti />}
      </div>
    );
  }

  return (
    <div className={cx('home-wrapper')}>
      <div className={cx('timer')}>
        <div className={cx('timer-segment')}>
          <div className={cx('time')}>{String(timeLeft.days).padStart(2, '0')}</div>
          <div className={cx('label')}>NGÀY</div>
        </div>
        <div className={cx('separator')}>:</div>
        <div className={cx('timer-segment')}>
          <div className={cx('time')}>{String(timeLeft.hours).padStart(2, '0')}</div>
          <div className={cx('label')}>GIỜ</div>
        </div>
        <div className={cx('separator')}>:</div>
        <div className={cx('timer-segment')}>
          <div className={cx('time')}>{String(timeLeft.minutes).padStart(2, '0')}</div>
          <div className={cx('label')}>PHÚT</div>
        </div>
        <div className={cx('separator')}>:</div>
        <div className={cx('timer-segment')}>
          <div className={cx('time')}>{String(timeLeft.seconds).padStart(2, '0')}</div>
          <div className={cx('label')}>GIÂY</div>
        </div>
      </div>
    </div>
  );
}

export default TimeDown;
