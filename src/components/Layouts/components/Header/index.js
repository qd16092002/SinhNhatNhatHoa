/* eslint-disable jsx-a11y/no-static-element-interactions */

import classNames from 'classnames/bind'
import styles from './Header.module.sass'
import { Link, useLocation } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { IconBirthday, IconImage, IconTimeDown, IconTimeLine } from '@src/assets/svgs/Header'
const cx = classNames.bind(styles)
const menuUser = [
  {
    title: 'Birthday bé iu',
    link: '/birthday',
    icon: <IconBirthday />
  },
  {
    title: 'Ảnh chúng mình nè',
    link: '/image',
    icon: <IconImage />
  },
  {
    title: 'Timeline ngày của bé',
    link: '/timeline',
    icon: <IconTimeLine />
  },
  {
    title: 'Đếm ngược nha',
    link: '/timedown',
    icon: <IconTimeDown />
  }
]
function Header() {
  const location = useLocation()
  return (
    <div className={cx('header-wrapper')}>
      <div className={cx('link')}>
        {menuUser.map((item, index) => {
          return (
            <Link className={cx('itemsnavbar')} key={uuidv4(index)} to={item.link}>
              <div className={cx(location.pathname === item.link ? 'active' : 'inactive')}>
                <div>{item.icon}</div>
                <p className={cx('titleitems')}>{item.title}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Header
