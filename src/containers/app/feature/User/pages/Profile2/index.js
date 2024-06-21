/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { OverviewIcon, UserIcon } from '@src/assets/svgs'
import classNames from 'classnames/bind'
import { Link, useLocation } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import styles from './Profile2.module.sass'
import { useSelector } from 'react-redux'
import Avatar from '@src/components/Avatar'

const cx = classNames.bind(styles)

const menu = [
  {
    icon: <OverviewIcon />,
    title: 'Overview',
    link: '/overview/user'
  },

  {
    icon: <UserIcon />,
    title: 'Team',
    link: '/teams/user'
  }
]

function Profile2() {
  const location = useLocation()
  const userInfo = useSelector((state) => state.auth.user)

  return (
    <div className={cx('profile-wrapper')}>
      <div className={cx('user-card')}>
        <div className={cx('head')}>
          <div className={cx('avatar')}>
            <Avatar username={userInfo?.last_name} />
          </div>
          <div className={cx('info')}>
            <div className={cx('__name')}>{`${userInfo?.first_name} ${userInfo?.last_name}`}</div>
            <div className={cx('__position')}>{userInfo?.team_name}</div>
          </div>
        </div>
        <ul className={cx('menu')}>
          {menu.map((item, index) => {
            return (
              <Link key={uuidv4(item.link)} to={item.link}>
                <li className={cx(location.pathname === item.link ? 'active' : '')} key={uuidv4(index)}>
                  <div className={cx('icon')}>{item.icon}</div>
                  <p>{item.title}</p>
                </li>
              </Link>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Profile2
