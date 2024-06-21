/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames/bind'
import styles from './Overview.module.sass'
import { useSelector } from 'react-redux'
import { Col } from 'antd'
import { useLazyGetTeamInformationQuery } from '../../userService'
import { useEffect } from 'react'

const cx = classNames.bind(styles)

function Overview() {
  const userInfo = useSelector((state) => state.auth.user)
  const [getTeamName, { data: teamif }] = useLazyGetTeamInformationQuery({})

  useEffect(() => {
    if (teamif) {
      console.log('teamif:: ')
    }
  }, [teamif])
  useEffect(() => {
    getTeamName()
  }, [getTeamName])
  return (
    <div>
      <Col lg={0} md={24} xs={24} sm={24}>
        <div className={cx('profile-wrapper-mobile')}>
          <div className={cx('content-mobile')}>
            <div className={cx('head-mobile')}>
              <h3>Overview</h3>
            </div>
            <div className={cx('details-mobile')}>
              <div className={cx('__head-mobile')}>Profile details</div>
              <div className={cx('__info-mobile')}>
                <div className={cx('item-mobile')}>
                  <p>First name</p>
                  <p
                    style={{
                      color: '#FFFFFF',
                      paddingBottom: '2px'
                    }}
                  >
                    {userInfo?.first_name}
                  </p>
                </div>
                <div className={cx('item-mobile')}>
                  <p>Last name</p>
                  <p
                    style={{
                      color: '#FFFFFF',
                      paddingBottom: '2px'
                    }}
                  >
                    {userInfo?.last_name}
                  </p>
                </div>
                <div className={cx('item-mobile')}>
                  <p>Team Name</p>
                  <p
                    style={{
                      color: '#FFFFFF',
                      paddingBottom: '2px'
                    }}
                  >
                    {teamif?.team_name}
                  </p>
                </div>
                <div className={cx('item-mobile')}>
                  <p>Location</p>
                  <p
                    style={{
                      color: '#FFFFFF',
                      paddingBottom: '2px'
                    }}
                  >
                    {userInfo?.country}
                  </p>
                </div>
                <div className={cx('item-mobile')}>
                  <p>Birthday</p>
                  <p
                    style={{
                      color: '#FFFFFF',
                      paddingBottom: '2px'
                    }}
                  >
                    {userInfo?.date_of_birth}
                  </p>
                </div>
              </div>
            </div>
            <div className={cx('details-mobile')}>
              <div className={cx('__head-mobile')}>Sign in method</div>
              <div className={cx('__info-mobile')}>
                <div className={cx('item-mobile')}>
                  <p>Email</p>
                  <p
                    style={{
                      display: 'flex'
                    }}
                  >
                    <div
                      style={{
                        marginTop: '5px',
                        color: '#FFFF'
                      }}
                    >
                      {userInfo?.email}
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
      <Col lg={24} md={0} xs={0} sm={0}>
        <div className={cx('profile-wrapper')}>
          <div className={cx('content')}>
            <div className={cx('head')}>
              <h3>Overview</h3>
            </div>
            <div className={cx('details')}>
              <div className={cx('__head')}>Profile details</div>
              <div className={cx('__info')}>
                <div className={cx('item')}>
                  <p>First name</p>
                  <p
                    style={{
                      color: '#FFFFFF',
                      paddingBottom: '2px'
                    }}
                  >
                    {userInfo?.first_name}
                  </p>
                </div>
                <div className={cx('item')}>
                  <p>Last name</p>
                  <p
                    style={{
                      color: '#FFFFFF',
                      paddingBottom: '2px'
                    }}
                  >
                    {userInfo?.last_name}
                  </p>
                </div>
                <div className={cx('item')}>
                  <p>Team Name</p>
                  <p
                    style={{
                      color: '#FFFFFF',
                      paddingBottom: '2px'
                    }}
                  >
                    {teamif?.team_name}
                  </p>
                </div>
                <div className={cx('item')}>
                  <p>Location</p>
                  <p
                    style={{
                      color: '#FFFFFF',
                      paddingBottom: '2px'
                    }}
                  >
                    {userInfo?.country}
                  </p>
                </div>
                <div className={cx('item')}>
                  <p>Birthday</p>
                  <p
                    style={{
                      color: '#FFFFFF',
                      paddingBottom: '2px'
                    }}
                  >
                    {userInfo?.date_of_birth}
                  </p>
                </div>
              </div>
            </div>
            <div className={cx('details')}>
              <div className={cx('__head')}>Sign in method</div>
              <div className={cx('__info')}>
                <div className={cx('item')}>
                  <p>Email</p>
                  <p
                    style={{
                      display: 'flex'
                    }}
                  >
                    <div
                      style={{
                        marginTop: '5px',
                        color: '#FFFF'
                      }}
                    >
                      {userInfo?.email}
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </div>
  )
}

export default Overview
