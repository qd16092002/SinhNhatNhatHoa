import classNames from 'classnames/bind'
import styles from './TimeLine.module.sass'
import { IconTymTimeline } from '@src/assets/svgs'


const cx = classNames.bind(styles)

function TimeLine() {

  return (
    <div className={cx('home-wrapper')}>

      <div>
        <div className={cx('box1')}></div>
        <div className={cx('box2')}></div>
      </div>
      <IconTymTimeline />
      <div>
        <div className={cx('box3')}></div>
        <div className={cx('box4')}></div>
      </div>
    </div>
  )
}

export default TimeLine
