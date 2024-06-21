import classNames from 'classnames/bind'
import Trend from '../Trend'
import styles from './HistoryTable.module.sass'

const cx = classNames.bind(styles)

const HistoryTable = () => (
  <div className={cx('wrapper')}>
    <table>
      <tr>
        <th>STT</th>
        <th>NAME</th>
        <th>SUBMITTED TIME</th>
        <th>DATE</th>
        <th>ROUND</th>
        <th>STATUS</th>
        <th>VIEW</th>
      </tr>
      <tr>
        <td>1</td>
        <td>NestQuant 1</td>
        <td>-0.0137</td>
        <td className={cx('tc')}>0.0036</td>
        <td className={cx('stake')}>0.0036</td>
        <td className={cx('trend')}>
          <Trend up value={0.04} />
        </td>
        <td className={cx('status')}>
          <div className={cx('active')}>Active</div>
        </td>
      </tr>
      <tr>
        <td>1</td>
        <td>NestQuant 1</td>
        <td>-0.0137</td>
        <td className={cx('tc')}>0.0036</td>
        <td className={cx('stake')}>0.0036</td>
        <td className={cx('trend')}>
          <Trend up value={0.04} />
        </td>
        <td className={cx('status')}>
          <div className={cx('active')}>Active</div>
        </td>
      </tr>
      <tr>
        <td>1</td>
        <td>NestQuant 1</td>
        <td>-0.0137</td>
        <td className={cx('tc')}>0.0036</td>
        <td className={cx('stake')}>0.0036</td>
        <td className={cx('trend')}>
          <Trend up value={0.04} />
        </td>
        <td className={cx('status')}>
          <div className={cx('active')}>Active</div>
        </td>
      </tr>
      <tr>
        <td>1</td>
        <td>NestQuant 1</td>
        <td>-0.0137</td>
        <td className={cx('tc')}>0.0036</td>
        <td className={cx('stake')}>0.0036</td>
        <td className={cx('trend')}>
          <Trend up value={0.04} />
        </td>
        <td className={cx('status')}>
          <div className={cx('active')}>Active</div>
        </td>
      </tr>
    </table>
  </div>
)

export default HistoryTable
