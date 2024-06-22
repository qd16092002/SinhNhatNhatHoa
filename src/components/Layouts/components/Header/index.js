/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.sass';
import { Link, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { IconBirthday, IconImage, IconTimeLine } from '@src/assets/svgs/Header';

const cx = classNames.bind(styles);

// Thời gian đích: 0h ngày 23/6
const targetDate = new Date('2024-06-23T00:00:00');

const menuUserTemplate = [
  {
    title: 'Birthday bé iu',
    link: '/birthday',
    icon: <IconBirthday />,
  },
  {
    title: 'Ảnh chúng mình nè',
    link: '/image',
    icon: <IconImage />,
  },
  {
    title: 'Timeline ngày của bé',
    link: '/timeline',
    icon: <IconTimeLine />,
  },
];

function Header() {
  const location = useLocation();
  const [isBeforeTargetDate, setIsBeforeTargetDate] = useState(new Date() < targetDate);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBeforeTargetDate(new Date() < targetDate);
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

  const menuUser = menuUserTemplate.map(item => ({
    ...item,
    disabled: isBeforeTargetDate,
  }));

  return (
    <div className={cx('header-wrapper')}>
      <div className={cx('link')}>
        {menuUser.map((item, index) => {
          return (
            <div key={uuidv4(index)} className={cx('itemsnavbar', { disabled: item.disabled })}>
              <Link
                to={item.disabled ? '#' : item.link}
                className={cx(location.pathname === item.link ? 'active' : 'inactive')}
                onClick={(e) => {
                  if (item.disabled) {
                    e.preventDefault();
                  }
                }}
              >
                <div>{item.icon}</div>
                <p className={cx('titleitems')}>{item.title}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Header;
