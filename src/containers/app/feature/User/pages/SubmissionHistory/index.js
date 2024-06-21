import classNames from 'classnames/bind'
import styles from './SubmissionHistory.module.sass'
import { SearchIcon } from '@src/assets/svgs'
import HistoryTable from '../../components/HistoryTable'

const cx = classNames.bind(styles)

function SubmissionHistory() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('heading')}>
        <div className={cx('text')}>History</div>
        <div className={cx('filter')}>
          <div className={cx('option-list')}>
            <div className={cx('option-active')}>All</div>
            <div className={cx('option')}>Active</div>
            <div className={cx('option')}>Inactive</div>
          </div>
          <div className={cx('search')}>
            <input type='text' placeholder='Search' />
            <div className={cx('icon')}>
              <SearchIcon />
            </div>
          </div>
        </div>
      </div>
      <div className={cx('body')}>
        <HistoryTable />
      </div>
    </div>
  )
}

export default SubmissionHistory
