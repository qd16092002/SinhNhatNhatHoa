/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Link } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import moment from 'moment'
import classNames from 'classnames/bind'

import { userApi } from '../../userService'
import { isEmptyValue } from '@src/helpers/check'
import HistoryItem from '../HistoryItem'
import Status from '@src/components/Status'

import { ClockOpenIcon, LinkIcon } from '@src/assets/svgs'

import { SUBMISSION_TYPE } from '@src/configs'
import styles from './History.module.sass'

const cx = classNames.bind(styles)

function History({ isLoading, reloadData, data }) {
  const length = data?.length
  const [deleteSubmission, { isLoading: isDeleting }] = userApi.endpoints.deleteSubmission.useMutation()

  const handleDelete = async (data) => {
    const response = await deleteSubmission({
      path: {
        competitionId: process.env.COMPETITION_ID,
        submission: SUBMISSION_TYPE.PUBLIC_TEST,
        submission_time: data['Submission Time']
      }
    })

    if (response.error) {
      toast.error(response.error.data.detail || 'An error occurred')
    } else {
      toast.success('Delete successfully!')
      reloadData()
    }
  }
  return (
    <div className={cx('wrapper')}>
      <Toaster />
      <div className={cx('heading')}>
        <div className={cx('text')}>Submission history</div>
        {/* <Link className={cx('link')} to='/'>
          <p>View all</p>
          <ChevronRight />
        </Link> */}
      </div>
      <div className={cx('divider')}></div>
      <div className={cx('list')}>
        {!isEmptyValue(data) ? (
          data?.map((item, index) => {
            return (
              <div key={item['Submission Time']} className={cx('item')}>
                <div className={cx('heading')}>
                  <div className={cx('__left')}>
                    <div className={cx('order')}>{length - index}</div>
                    <div className={cx('info')}>
                      <div className={cx('date')}>
                        {moment.unix(item['Submission Time'] / 1000).format('MM/DD/YYYY')}
                      </div>
                      <div className={cx('name')}>Submission {length - index}</div>
                    </div>
                  </div>
                  <div onClick={() => handleDelete(item)} className={cx('status')}>
                    <Status>Delete</Status>
                  </div>
                </div>
                <div className={cx('body')}>
                  <HistoryItem Icon={<ClockOpenIcon />} title='Submitted time'>
                    {moment.unix(item['Submission Time'] / 1000).format('HH:mm:ss')}
                  </HistoryItem>
                  <HistoryItem Icon={<LinkIcon />} title='Symbol'>
                    BTCUSDT
                  </HistoryItem>
                </div>
              </div>
            )
          })
        ) : (
          <div className={cx('data-notify')}>No data</div>
        )}
      </div>
    </div>
  )
}

export default History
