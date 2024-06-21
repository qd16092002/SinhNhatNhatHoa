/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind'
import styles from './Signup.module.sass'
import { Row, Col } from 'antd'
import login_bg from '@src/assets/images/login_bg.png'
// import { Vector1, Vector2, Vector3, Vector4, Vector5, Vector6, Vector7, Vector8 } from '@src/assets/svgs'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useForm } from 'react-hook-form'
// import { FacebookLogo, GoogleLogo } from '@src/assets/svgs'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSignupMutation } from '../authService'
import * as Yup from 'yup'
import ReactLoading from 'react-loading'
import { useSelector } from 'react-redux'
import { EyeClose, EyeShow } from '@src/assets/svgs'

const cx = classNames.bind(styles)

const registerSchema = Yup.object({
  email: Yup.string().email().required(),
  username: Yup.string().min(4).required(),
  // firstName: Yup.string().required(),
  // lastName: Yup.string().required(),
  password: Yup.string().min(8).required(),
  rePassword: Yup.string()
    .min(8)
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value
    })
    .required()
})

function Signup() {
  const [signup, { isLoading }] = useSignupMutation()
  const [notAgree, setNotAgree] = useState(false)
  const [formData, setFormData] = useState({
    email: null,
    password: null,
    isAgree: false
  })
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const navigate = useNavigate()
  const [eyeShow, setEyeShow] = useState(false)

  useEffect(() => {
    if (isLoggedIn) navigate('/')
  }, [isLoggedIn])

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(registerSchema)
  })

  const onSubmit = async (data) => {
    if (!formData.isAgree) {
      setNotAgree(true)
    } else {
      try {
        const response = await signup({
          username: data.username,
          email: data.email,
          // first_name: data.firstName,
          // last_name: data.lastName,
          password: data.password
        }).unwrap()

        if (!response.error) {
          //redirect login page
          navigate('/login')
        }
      } catch (error) {
        if (error.data.detail === 'Username already exists')
          setError('username', { type: 'manual', message: error.data.detail }, { shouldFocus: true })
        else setError('email', { type: 'manual', message: error.data.detail }, { shouldFocus: true })
        console.log('error: ', error)
      }
    }
  }

  return (
    <div className={cx('login-wrapper')}>
      <Row>
        <Col md={12} sm={0} xs={0}>
          <div className={cx('background-wrapper')}>
            <div className={cx('background')}>
              {/* <div className={cx('vector1')}>
                <Vector1 />
              </div>
              <div className={cx('vector2')}>
                <Vector2 />
              </div>
              <div className={cx('vector3')}>
                <Vector3 />
              </div>
              <div className={cx('vector4')}>
                <Vector4 />
              </div>
              <div className={cx('vector5')}>
                <Vector5 />
              </div>
              <div className={cx('vector6')}>
                <Vector6 />
              </div>
              <div className={cx('vector7')}>
                <Vector7 />
              </div>
              <div className={cx('vector8')}>
                <Vector8 />
              </div> */}
              <div className={cx('img')} style={{ backgroundImage: `url(${login_bg})` }}>
                <div className={cx('gradient')}></div>
              </div>
            </div>
          </div>
        </Col>
        <Col md={12} sm={24} xs={24}>
          <div className={cx('form-wrapper')}>
            <div className={cx('form')}>
              <h3>Welcome to NestQuant!</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row gutter={24}>
                  <Col xs={24}>
                    <div className={cx('form-field')}>
                      <label htmlFor='username'>Username</label>
                      <input
                        className={cx(errors.username ? 'error' : '')}
                        {...register('username', { required: 'Username is required' })}
                        id='username'
                        type='text'
                        placeholder='Enter your username'
                      />
                      {errors.username && (
                        <p className={cx('error-text')} role='alert'>
                          {errors.username?.message}
                        </p>
                      )}
                    </div>
                  </Col>
                  <Col xs={24}>
                    <div className={cx('form-field')}>
                      <label htmlFor='email-login'>Email</label>
                      <input
                        // onChange={(e) => {
                        //   setFormData({ ...formData, email: e.target.value })
                        // }}
                        className={cx(errors.email ? 'error' : '')}
                        {...register('email', { required: 'Email address is required' })}
                        id='email-login'
                        type='email'
                        placeholder='Enter your email'
                      />
                      {errors.email && (
                        <p className={cx('error-text')} role='alert'>
                          {errors.email?.message}
                        </p>
                      )}
                    </div>
                  </Col>
                  <Col xs={24}>
                    <div className={cx('form-field')}>
                      <label htmlFor='password-login'>Password</label>
                      <input
                        className={cx(errors.password ? 'error' : '')}
                        // onChange={(e) => {
                        //   setFormData({ ...formData, password: e.target.value })
                        // }}
                        {...register('password', { required: 'Password is required' })}
                        id='password-login'
                        type={eyeShow ? 'text' : 'password'}
                        placeholder='Enter your password (+8 characters)'
                      />
                      <div className={cx('eye-icon')} onClick={() => setEyeShow(!eyeShow)}>
                        {eyeShow ? <EyeShow /> : <EyeClose />}
                      </div>
                      {errors.password && (
                        <p className={cx('error-text')} role='alert'>
                          {errors.password?.message}
                        </p>
                      )}
                      {/* <div className={cx('error-text')}>*Wrong password</div> */}
                    </div>
                  </Col>
                  <Col xs={24}>
                    <div className={cx('form-field')}>
                      <label htmlFor='re-password-login'>Re-enter password</label>
                      <input
                        className={cx(errors.rePassword ? 'error' : '')}
                        // onChange={(e) => {
                        //   setFormData({ ...formData, password: e.target.value })
                        // }}
                        {...register('rePassword', { required: 'Password is not match' })}
                        id='re-password-login'
                        type={eyeShow ? 'text' : 'password'}
                        placeholder='Enter your password again (+8 characters)'
                      />
                      <div className={cx('eye-icon')} onClick={() => setEyeShow(!eyeShow)}>
                        {eyeShow ? <EyeShow /> : <EyeClose />}
                      </div>
                      {errors.rePassword && (
                        <p className={cx('error-text')} role='alert'>
                          {errors.rePassword?.message}
                        </p>
                      )}
                      {/* <div className={cx('error-text')}>*Wrong password</div> */}
                    </div>
                  </Col>
                </Row>

                <div className={cx('password-check')}>
                  <div className={cx('checkbox')}>
                    <label htmlFor='remember-login'>
                      <div
                        style={
                          formData.isAgree
                            ? { background: 'linear-gradient(96.06deg, #526AEA 4.1%, #B0AEFF 146.32%)' }
                            : { background: '#29384E' }
                        }
                        className={cx('check-icon')}
                      >
                        {formData.isAgree && <CheckIcon />}
                      </div>
                      <div className={cx('text')}>I agree to Nestquant Terms and Privacy policy</div>
                    </label>
                    <input
                      id='remember-login'
                      onChange={(e) => {
                        setNotAgree(false)
                        setFormData({ ...formData, isAgree: e.target.checked })
                      }}
                      type='checkbox'
                    />
                  </div>
                </div>
                {notAgree && <div className={cx('error-message-input')}>You must agree to sign up!</div>}
                <button className={cx('button')} type='submit' disabled={isLoading}>
                  {isLoading ? <ReactLoading type='bubbles' height={32} width={32} /> : 'Sign up'}
                </button>
              </form>
              <div className={cx('navigate-guide')}>
                {/* <div className={cx('heading')}>Or sign up with</div>
                <div className={cx('oauth')}>
                  <Link className={cx('service')}>
                    <div>
                      <GoogleLogo />
                    </div>
                    Google
                  </Link>
                  <Link className={cx('service')}>
                    <div>
                      <FacebookLogo />
                    </div>
                    Facebook
                  </Link>
                </div> */}
                Already have an account? <Link to='/login'>Sign in</Link>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Signup
