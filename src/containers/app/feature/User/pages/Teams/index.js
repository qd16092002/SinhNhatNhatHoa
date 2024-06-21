/* eslint-disable react/jsx-no-undef */
import classNames from 'classnames/bind'
import styles from './Teams.module.sass'
import { v4 as uuidv4 } from 'uuid'
// import { IconThreeDotTeams } from '@src/assets/svgs'
// import { Link } from 'react-router-dom'
// import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Col } from 'antd'
import { useEffect } from 'react'
import { useLazyGetTeamMembersQuery, useLazyGetTeamInformationQuery } from '../../userService'
import Avatar from '@src/components/Avatar'
import { useSelector } from 'react-redux'
const cx = classNames.bind(styles)

function Teams() {
  const [getTeamName, { data: teamif }] = useLazyGetTeamInformationQuery()
  const userInfo = useSelector((state) => state.auth.user)

  const [getTeamMember, { data: teammember }] = useLazyGetTeamMembersQuery()
  useEffect(() => {
    getTeamMember({}, false)
  }, [getTeamMember])
  console.log(teammember)
  useEffect(() => {
    getTeamName({}, false)
  }, [getTeamName])

  useEffect(() => {
    if (teamif) {
      console.log('teamif:: ')
    }
  }, [teamif])

  return (
    <div>
      <Col lg={24} md={0} xs={0} sm={0}>
        <div className={cx('profile-wrapper')}>
          <div className={cx('content')}>
            <div className={cx('head')}>
              <h3>Team</h3>
            </div>
            <div
              style={{
                marginTop: '40px',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              {teamif?.team_name && (
                <div
                  style={{
                    display: 'flex'
                  }}
                >
                  <div className={cx('avatar')}>
                    <Avatar username={teamif?.team_name} />
                  </div>
                  <div className={cx('teams')}>
                    <div className={cx('nameteams')}>{teamif?.team_name}</div>
                    {/* <div className={cx('number-of-members')}>6 members</div> */}
                  </div>
                </div>
              )}
            </div>
            <div className={cx('details')}>
              <div className={cx('__head')}>Team member</div>
              <div className={cx('__info')}>
                {/* <div className={cx('item')}>
                  <p
                    style={{
                      display: 'flex'
                    }}
                  >
                    <div className={cx('avatar')}>{userInfo?.username && userInfo?.username[0]?.toUpperCase()}</div>
                    <div className={cx('name-position')}>
                      <div
                        style={{
                          color: '#FFFF',
                          marginBottom: '5px'
                        }}
                      >
                        {userInfo?.username}
                        {'  ( You )'}
                      </div>
                    </div>
                  </p>
                </div> */}
                {teammember?.map((item, index) => {
                  return (
                    <div key={uuidv4(index)} className={cx('item')}>
                      <p
                        style={{
                          display: 'flex'
                        }}
                      >
                        <div className={cx('avatar')}>{item?.username && item?.username[0]?.toUpperCase()}</div>
                        <div className={cx('name-position')}>
                          <div
                            style={{
                              color: '#FFFF',
                              marginBottom: '5px',
                              display: 'flex'
                            }}
                          >
                            {item?.username}
                            {item?.username == userInfo?.username && (
                              <div
                                style={{
                                  marginLeft: '5px'
                                }}
                              >
                                {' '}
                                {'( You )'}
                              </div>
                            )}
                          </div>
                        </div>
                      </p>

                      {/* <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                          <button className={cx('button')}>
                            <IconThreeDotTeams />
                          </button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                          <Link to='/overview/user'>
                            <DropdownMenu.Content className={cx('TooltipContent')} side='left'>
                              View profile
                            </DropdownMenu.Content>
                          </Link>
                        </DropdownMenu.Portal>
                      </DropdownMenu.Root> */}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </Col>
      <Col lg={0} md={24} xs={24} sm={24}>
        <div className={cx('profile-wrapper-mobile')}>
          <div className={cx('content-mobile')}>
            <div className={cx('head-mobile')}>
              <h3>Team</h3>
            </div>
            <div
              style={{
                marginTop: '40px',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <div
                style={{
                  display: 'flex'
                }}
              >
                <div className={cx('avatar')}>
                  <Avatar username={teamif?.team_name} />
                </div>
                <div className={cx('teams')}>
                  <div className={cx('nameteams')}>{teamif?.team_name}</div>
                  {/* <div className={cx('number-of-members')}>6 members</div> */}
                </div>
              </div>
            </div>
            <div className={cx('details-mobile')}>
              <div className={cx('__head-mobile')}>Team member</div>
              <div className={cx('__info-mobile')}>
                {/* <div className={cx('item-mobile')}>
                  <p
                    style={{
                      display: 'flex'
                    }}
                  >
                    <div className={cx('avatar-mobile')}>
                      {userInfo?.username && userInfo?.username[0]?.toUpperCase()}
                    </div>
                    <div className={cx('name-position-mobile')}>
                      <div
                        style={{
                          color: '#FFFF',
                          marginLeft: '5px'
                        }}
                      >
                        {userInfo?.username}
                        {'  ( You )'}
                      </div>
                    </div>
                  </p>
                </div> */}
                {teammember?.map((item, index) => {
                  return (
                    <div key={uuidv4(index)} className={cx('item-mobile')}>
                      <p
                        style={{
                          display: 'flex'
                        }}
                      >
                        <div className={cx('avatar-mobile')}>{item?.username && item?.username[0]?.toUpperCase()}</div>

                        <div className={cx('name-position-mobile')}>
                          <div
                            style={{
                              color: '#FFFF',
                              marginLeft: '5px',
                              display: 'flex'
                            }}
                          >
                            {item?.username}
                            {item?.username == userInfo?.username && (
                              <div
                                style={{
                                  marginLeft: '5px'
                                }}
                              >
                                {' '}
                                {'( You )'}
                              </div>
                            )}
                          </div>
                        </div>
                      </p>

                      {/* <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                          <button className={cx('button-mobile')}>
                            <IconThreeDotTeams />
                          </button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                          <Link to='/overview/user'>
                            <DropdownMenu.Content className={cx('TooltipContent-mobile')} side='left'>
                              View profile
                            </DropdownMenu.Content>
                          </Link>
                        </DropdownMenu.Portal>
                      </DropdownMenu.Root> */}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </Col>
    </div>
  )
}

export default Teams
