/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames/bind'
import styles from './SettingsPC.module.sass'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { authApi } from '@src/containers/authentication/feature/Auth/authService'
import { setUser } from '@src/containers/authentication/feature/Auth/authSlice'
import { EyeClose, EyeShow } from '@src/assets/svgs'
import { Toaster, toast } from 'react-hot-toast'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import {
  useChangeTeamInformationMutation,
  // useChangeTeamInformationMutation,
  useChangeUserInformationMutation,
  useChangeUserPassWordMutation,
  useLazyGetTeamInformationQuery
} from '../../../userService'

const cx = classNames.bind(styles)

const registerSchema = Yup.object({
  new_password: Yup.string().min(8).required(),
  rePassword: Yup.string()
    .min(8)
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.new_password === value
    })
    .required()
})

function SettingsPC() {
  const [changeShow, setChangeShow] = useState(false)
  const [eyeShow, setEyeshow] = useState(false)
  const userInfo = useSelector((state) => state.auth.user)
  const [updateUser, { isLoading: isUpdating }] = useChangeUserInformationMutation()
  const [updateTeamName] = useChangeTeamInformationMutation()
  // const [updateTeamName, { isLoading: isUpdateteamname }] = useChangeTeamInformationMutation()
  const [updatePassWord, { isLoading: isUpdatepassword }] = useChangeUserPassWordMutation()
  const {
    register: registerFormPwd,
    handleSubmit: handleSubmitFormPwd,
    formState: { errors: errorsPwd }
  } = useForm({ resolver: yupResolver(registerSchema) })

  const {
    register,
    handleSubmit
    // formState: { errors }
  } = useForm()
  const [getTeamName, { data: teamif }] = useLazyGetTeamInformationQuery({})

  const formInput = useRef()
  const dispatch = useDispatch()
  const [getProfile] = authApi.endpoints.getProfile.useLazyQuery()
  const onSubmit = async (data, e) => {
    const updateResponse = await updateUser(data)
    e.preventDefault()
    const updateTeamNameResponse = await updateTeamName({
      team_name: teamif?.team_name,
      new_team_name: data.team_name
    })

    if (!updateResponse?.error) {
      getTeamName()
      toast.success('Update information successfully!')
      const response = await getProfile({}, false)
      if (!response?.error) {
        dispatch(setUser(response.data))
      }
    } else {
      toast.error('Something went wrong, please try again')
    }
  }
  const onUpdatePassword = async (data, e) => {
    e.preventDefault()
    const updatepasswordresponse = await updatePassWord({
      username: userInfo?.username,
      old_password: data.old_password,
      new_password: data.new_password
    })

    if (!updatepasswordresponse?.error) {
      toast.success('Changes updated successully!')
      setChangeShow(!changeShow)
    } else {
      toast.error('Password went wrong, please try again')
    }
  }
  useEffect(() => {
    getTeamName()
  }, [getTeamName])
  useEffect(() => {
    if (teamif) {
      console.log('teamif:: ')
    }
  }, [teamif])
  return (
    <div>
      <Toaster position='top-center' />
      <div className={cx('profile-wrapper')}>
        <div className={cx('content')}>
          <div className={cx('head')}>
            <h3>Settings</h3>
            <div>
              <div>
                <button
                  onClick={() => {
                    formInput.current.click()
                  }}
                  type='submit'
                  disabled={isUpdating}
                  className={cx('buttonsave')}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={cx('details')}>
            <div className={cx('__head')}>Profile details</div>
            <div className={cx('__info')}>
              <div className={cx('item')}>
                <p>First name</p>
                <input
                  className={cx('inputsettings')}
                  placeholder='Add First name'
                  type='text'
                  {...register('first_name')}
                  defaultValue={userInfo?.first_name}
                  style={{
                    color: '#FFFFFF'
                  }}
                ></input>
              </div>
              <div className={cx('item')}>
                <p>Last name</p>
                <input
                  className={cx('inputsettings')}
                  placeholder='Add Last name'
                  type='text'
                  {...register('last_name')}
                  defaultValue={userInfo?.last_name}
                  style={{
                    color: '#FFFFFF'
                  }}
                ></input>
              </div>
              <div className={cx('item')}>
                <p>Team Name</p>
                <input
                  id='team_name'
                  className={cx('inputsettings')}
                  placeholder='Add Team name'
                  type='text'
                  {...register('team_name')}
                  defaultValue={teamif?.team_name}
                  style={{
                    color: '#FFFFFF'
                  }}
                ></input>
              </div>
              <div className={cx('item')}>
                <p>Location</p>
                <input
                  className={cx('inputsettings')}
                  type='text'
                  placeholder='Add a location'
                  {...register('country')}
                  defaultValue={userInfo?.country}
                  style={{
                    color: '#FFFFFF'
                  }}
                ></input>
              </div>
              <div className={cx('item')}>
                <p>Birthday</p>
                <input
                  className={cx('inputsettings')}
                  type='text'
                  placeholder='MM/DD/YYYY'
                  {...register('date_of_birth')}
                  defaultValue={userInfo?.date_of_birth}
                  style={{
                    color: '#FFFFFF'
                  }}
                ></input>
              </div>
            </div>
            <button ref={formInput} type='submit' style={{ display: 'none' }}></button>
          </form>
          <div
            className={cx('details')}
            style={{
              marginTop: '43px'
            }}
          >
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
                      color: '#FFFF',
                      marginRight: '2px'
                    }}
                  >
                    {userInfo?.email}
                  </div>{' '}
                </p>
              </div>
              <div className={cx('item')}>
                {changeShow ? (
                  <form
                    className={cx('change-pwd-form')}
                    id='change-pwd'
                    onSubmit={handleSubmitFormPwd(onUpdatePassword)}
                  >
                    <div
                      className={cx('content-input')}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div
                        style={{
                          width: '30%',
                          position: 'relative'
                        }}
                      >
                        <div className={cx('title-input')}>Current password</div>
                        <input
                          id='old_password'
                          {...registerFormPwd('old_password', { required: 'old_password is required' })}
                          placeholder='Enter your password'
                          type={eyeShow === true ? 'text' : 'password'}
                          className={cx('input-changepassword')}
                        />

                        <div className={cx('eye-icon')} onClick={() => setEyeshow(!eyeShow)}>
                          {eyeShow ? <EyeShow /> : <EyeClose />}
                        </div>
                        {errorsPwd.password && (
                          <p
                            style={{
                              fontFamily: 'Be Vietnam Pro',
                              color: '#ff0000',
                              fontSize: '12px'
                            }}
                            role='alert'
                          >
                            {errorsPwd.password?.message}
                          </p>
                        )}
                      </div>
                      <div
                        style={{
                          width: '30%',
                          position: 'relative'
                        }}
                      >
                        <div className={cx('title-input')}>New password</div>
                        <input
                          id='new_password'
                          {...registerFormPwd('new_password', { required: 'new_password is required' })}
                          placeholder='Enter new password'
                          type={eyeShow === true ? 'text' : 'password'}
                          className={cx('input-changepassword')}
                        />

                        <div className={cx('eye-icon')} onClick={() => setEyeshow(!eyeShow)}>
                          {eyeShow ? <EyeShow /> : <EyeClose />}
                        </div>
                        {errorsPwd.password && (
                          <p
                            style={{
                              fontFamily: 'Be Vietnam Pro',
                              color: '#ff0000',
                              fontSize: '12px'
                            }}
                            role='alert'
                          >
                            {errorsPwd.password?.message}
                          </p>
                        )}
                      </div>

                      <div
                        style={{
                          width: '30%',
                          position: 'relative'
                        }}
                      >
                        <div className={cx('title-input')}>Confirm new password</div>
                        <input
                          id='rePassword'
                          {...registerFormPwd('rePassword', { required: 'rePassword is required' })}
                          placeholder='Enter new password'
                          type={eyeShow === true ? 'text' : 'password'}
                          className={cx('input-changepassword')}
                        />
                        <div className={cx('eye-icon')} onClick={() => setEyeshow(!eyeShow)}>
                          {eyeShow ? <EyeShow /> : <EyeClose />}
                        </div>{' '}
                        {errorsPwd.rePassword && (
                          <p
                            style={{
                              fontFamily: 'Be Vietnam Pro',
                              color: '#ff0000',
                              fontSize: '12px'
                            }}
                            role='alert'
                          >
                            {errorsPwd.rePassword?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div
                      className={cx('buttonchanges')}
                      style={{
                        marginBottom: '5px',
                        justifyContent: 'flex-start'
                      }}
                    >
                      <button type='submit' disabled={isUpdatepassword} className={cx('buttonsave')} form='change-pwd'>
                        Update password
                      </button>
                      <div className={cx('buttondiscard')} onClick={() => setChangeShow(!changeShow)}>
                        Cancel
                      </div>
                    </div>
                  </form>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%'
                    }}
                  >
                    <div
                      style={{
                        marginTop: '10px',
                        fontWeight: '600',
                        fontSize: '1.6rem',
                        lineHeight: '24px',
                        color: '#9DA7BA'
                      }}
                    >
                      Password
                    </div>
                    <div
                      style={{
                        display: 'flex'
                      }}
                    >
                      <div
                        style={{
                          marginRight: '16px',
                          marginTop: '10px',
                          display: 'flex'
                        }}
                      >
                        <div
                          className={cx('inputsettings')}
                          style={{
                            marginRight: '10px',
                            marginTop: '10px',
                            color: '#FFFF'
                          }}
                        >
                          *********
                        </div>

                        <button className={cx('changeif')} onClick={() => setChangeShow(!changeShow)}>
                          Change password
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <div className={cx('buttonchanges')}>
          <div>
            <button
              onClick={() => {
                formInput.current.click()
              }}
              type='submit'
              disabled={isUpdating}
              className={cx('buttonsave')}
            >
              Save changes
            </button>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default SettingsPC
