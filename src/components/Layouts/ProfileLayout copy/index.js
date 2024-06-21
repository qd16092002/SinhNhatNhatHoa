import { Col } from 'antd'
import { Container } from '@mui/material'
import cn from 'classnames/bind'
import styles from '../ProfileLayout/ProfileLayout.module.sass'

import ProfileCoppy from '@src/containers/app/feature/User/pages/Profile copy'
import Profile from '@src/containers/app/feature/User/pages/Profile'
import Header from '../components/Header'

const cx = cn.bind(styles)

function ProfileLayoutCoppy({ children }) {
  return (
    <>
      <Header />
      <Container>
        <div className={cx('profile-layout')}>
          <Col lg={0} md={24} xs={24} sm={24}>
            <div className={cx('main-content')}>
              <div className={cx('left')}>
                <ProfileCoppy />
              </div>
              <div className={cx('right')}>{children}</div>
            </div>
          </Col>
          <Col lg={24} md={0} xs={0} sm={0}>
            <div className={cx('main-content')}>
              <div className={cx('left')}>
                <Profile />
              </div>
              <div className={cx('right')}>{children}</div>
            </div>
          </Col>
        </div>
      </Container>
    </>
  )
}

export default ProfileLayoutCoppy
