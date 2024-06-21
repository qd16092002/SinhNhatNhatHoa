import classNames from 'classnames/bind'
import styles from './HistoryItem.module.sass'

const cx = classNames.bind(styles)

function HistoryItem({ Icon, title, children }) {
  return (
    <div className={cx('item')}>
      {Icon}
      <div className={cx('title')}>{title}</div>
      <div className={cx('value')}>{children}</div>
    </div>
  )
}

export default HistoryItem
