/* eslint-disable jsx-a11y/no-static-element-interactions */

import classNames from 'classnames/bind'
import styles from './Header.module.sass'
import { Link, useLocation } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { IconBirthday, IconImage, IconTimeLine } from '@src/assets/svgs/Header'

const cx = classNames.bind(styles)

// Thời gian đích: 0h ngày 23/6
const targetDate = new Date('2024-06-23T00:00:00')

// Thời gian hiện tại
const currentDate = new Date()

// Kiểm tra xem thời gian hiện tại đã đạt đến thời gian đích chưa
const isBeforeTargetDate = currentDate < targetDate

const menuUser = [
  {
    title: 'Birthday bé iu',
    link: '/birthday',
    icon: <IconBirthday />,
    disabled: isBeforeTargetDate
  },
  {
    title: 'Ảnh chúng mình nè',
    link: '/image',
    icon: <IconImage />,
    disabled: isBeforeTargetDate
  },
  {
    title: 'Timeline ngày của bé',
    link: '/timeline',
    icon: <IconTimeLine />,
    disabled: isBeforeTargetDate
  },
]

function Header() {
  const location = useLocation()
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
                    e.preventDefault()
                  }
                }}
              >
                <div>{item.icon}</div>
                <p className={cx('titleitems')}>{item.title}</p>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Header
