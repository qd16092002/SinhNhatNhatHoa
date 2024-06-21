import classNames from 'classnames/bind'
import styles from './Trend.module.sass'
import { TrendingDown, TrendingUp } from 'lucide-react'

const cx = classNames.bind(styles)

function Trend({ up = true, value }) {
  return (
    <div className={cx('trend', up ? 'up' : 'down')}>
      <div>{up ? <TrendingUp size={18} /> : <TrendingDown size={18} />}</div>
      <div>{value}</div>
    </div>
  )
}

export default Trend
