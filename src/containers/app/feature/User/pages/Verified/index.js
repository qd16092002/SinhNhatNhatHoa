import React from 'react'
import styles from './Verified.module.sass'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function EmailVerificationPage() {
  return (
    <div className={cx('wrapper')}>
      {' '}
      <h1>Your Email has been Verified</h1>
      <p>Thank you for verifying your email address. You can now access all the features of our website.</p>
    </div>
  )
}

export default EmailVerificationPage
