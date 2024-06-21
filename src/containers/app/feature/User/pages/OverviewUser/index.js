/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames/bind'
import styles from './OverviewUser.module.sass'
import { useSelector } from 'react-redux'
// import { useGetPersonalPerformationQuery } from '../../userService'

const cx = classNames.bind(styles)

function OverviewUser() {
  const userInfo = useSelector((state) => state.auth.user)

  return (
    <div className={cx('profile-wrapper')}>
      <div className={cx('content')}>
        <div className={cx('head')}>
          <h3>Overview</h3>
        </div>
        <div className={cx('details')}>
          <div className={cx('__head')}>Profile details</div>
          <div>
            <div className={cx('__info')}>
              <div className={cx('item')}>
                <p>Last name</p>
                <p
                  style={{
                    color: '#FFFFFF'
                  }}
                >
                  {userInfo?.last_name}
                </p>
              </div>
              <div className={cx('item')}>
                <p>First name</p>
                <p
                  style={{
                    color: '#FFFFFF'
                  }}
                >
                  {userInfo?.first_name}
                </p>{' '}
              </div>
              <div className={cx('item')}>
                <p>Team Name</p>
                <p>{userInfo?.team_name}</p>
              </div>
            </div>
            ;
          </div>
        </div>
      </div>
    </div>
  )
}

export default OverviewUser
