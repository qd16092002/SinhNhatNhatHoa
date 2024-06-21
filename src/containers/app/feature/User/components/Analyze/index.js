/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import analyze from '@src/assets/images/analyze.png'
import { CloseIcon, FileIcon } from '@src/assets/svgs'
import AppButton from '@src/components/AppButton'
import AppModal from '@src/components/AppModal/AppModal'
import { SUBMISSION_TYPE, dataSelection } from '@src/configs'
import { Col, Row } from 'antd'
import classNames from 'classnames/bind'
import moment from 'moment'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Bar, CartesianGrid, ComposedChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { userApi } from '../../userService'
import styles from './Analyze.module.sass'
import { isEmptyValue } from '@src/helpers/check'
import ReactLoading from 'react-loading'
import useMediaQuery from '@src/hooks/useMediaQuery'

const cx = classNames.bind(styles)
const competitionId = process.env.COMPETITION_ID

function Analyze({ data }) {
  const closeModal = useRef()
  const [filter, setFilter] = useState('Movement Score')
  const [timeId, setTimeId] = useState()
  const maxSm = useMediaQuery('(max-width: 992px)')
  const [getModelPerformance, { data: modelPerformance, isFetching: isGettingModelPerformance }] =
    userApi.endpoints.getModelPerformance.useLazyQuery()
  const submissionCount = data?.length
  useEffect(() => {
    if (!isEmptyValue(data))
      getModelPerformance(
        {
          path: { competitionId: competitionId, submission: SUBMISSION_TYPE.PUBLIC_TEST },
          params: { submission_time: timeId ? timeId : data[0]['Submission Time'] }
        },
        false
      )
  }, [data, timeId])

  const handleFilter = (name) => {
    setFilter(name)
  }

  const tickFormatter = (unixTime) => {
    return moment(unixTime).format('MM/DD/YYYY')
  }

  return (
    <div className={cx('analyze')}>
      <div className={cx('content')}>
        <img src={analyze} alt='analyzing' />
        <div className={cx('text')}>
          <div className={cx('top')}>Deep Analysis</div>
          <p className={cx('bottom')}>Analyze the model outcomes from the previous round and backtesting process.</p>
        </div>
      </div>
      <div className={cx('btn')}>
        <AppModal
          ref={closeModal}
          width={maxSm ? '90%' : '80%'}
          height={maxSm ? '90%' : 'auto'}
          triggerBtn={
            <AppButton
              style={{ width: '100%', background: 'linear-gradient(96.06deg, #526AEA 4.1%, #B0AEFF 146.32%)' }}
            >
              Analyze now
            </AppButton>
          }
          contentStyle={{
            borderRadius: '20px',
            padding: '24px',
            border: 'none',
            backgroundColor: '#29384E'
          }}
        >
          <div className={cx('content-wrapper')}>
            <div className={cx('heading')}>
              <h4 className={cx('text')}>Analyzing model</h4>
              <div onClick={() => closeModal.current.click()} className={cx('close')}>
                <CloseIcon />
              </div>
            </div>
            <Row gutter={[24, 24]}>
              <Col lg={7} md={24} sm={24} xs={24}>
                <div className={cx('history')}>
                  <div className={cx('heading')}>
                    <FileIcon />
                    <p>Submitted</p>
                  </div>

                  <div className={cx('submit-list')}>
                    {data?.map((item, index) => {
                      return (
                        <Fragment key={item['Submission Time']}>
                          <div
                            onClick={() => {
                              setTimeId(item['Submission Time'])
                            }}
                            className={cx(timeId === item['Submission Time'] ? 'submit-item--active' : 'submit-item')}
                          >
                            <div className={cx('__left')}>Submission {submissionCount - index}</div>
                            <div className={cx('__right')}>
                              <p>{moment.unix(item['Submission Time'] / 1000).format('MM/DD/YYYY')}</p>
                              <p>{moment.unix(item['Submission Time'] / 1000).format('HH:mm:ss')}</p>
                            </div>
                          </div>
                          {submissionCount !== index + 1 && <div className={cx('divider')}></div>}
                        </Fragment>
                      )
                    })}
                  </div>
                </div>
              </Col>
              <Col lg={17} md={24} sm={24} xs={24}>
                <div className={cx('score-wrapper')}>
                  <Row gutter={[12, 12]}>
                    <Col span={8}>
                      <div className={cx('score')}>
                        <div className={cx('name')}>Movement score</div>
                        {isGettingModelPerformance ? (
                          <div className={cx('data-notify')}>
                            <ReactLoading type='bubbles' height={32} width={32} />
                          </div>
                        ) : modelPerformance ? (
                          <div className={cx('value')}>
                            {Number(modelPerformance['Mean Score']['Movement Score']).toFixed(6)}
                          </div>
                        ) : (
                          <div className={cx('data-notify')}>No data</div>
                        )}
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className={cx('score')}>
                        <div className={cx('name')}>Correlation</div>
                        {isGettingModelPerformance ? (
                          <div className={cx('data-notify')}>
                            <ReactLoading type='bubbles' height={32} width={32} />
                          </div>
                        ) : modelPerformance ? (
                          <div className={cx('value')}>
                            {Number(modelPerformance['Mean Score']['Correlation']).toFixed(6)}
                          </div>
                        ) : (
                          <div className={cx('data-notify')}>No data</div>
                        )}
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className={cx('score')}>
                        <div className={cx('name')}>True Contribution</div>
                        {isGettingModelPerformance ? (
                          <div className={cx('data-notify')}>
                            <ReactLoading type='bubbles' height={32} width={32} />
                          </div>
                        ) : modelPerformance ? (
                          <div className={cx('value')}>
                            {Number(modelPerformance['Mean Score']['True Contribution']).toFixed(6)}
                          </div>
                        ) : (
                          <div className={cx('data-notify')}>No data</div>
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className={cx('chart')}>
                  <div className={cx('filter')}>
                    <div
                      onClick={() => handleFilter('Movement Score')}
                      className={cx(filter === 'Movement Score' ? 'item-active' : 'item')}
                    >
                      Movement Score
                    </div>
                    <div
                      onClick={() => handleFilter('Correlation')}
                      className={cx(filter === 'Correlation' ? 'item-active' : 'item')}
                    >
                      Correlation
                    </div>
                    <div
                      onClick={() => handleFilter('True Contribution')}
                      className={cx(filter === 'True Contribution' ? 'item-active' : 'item')}
                    >
                      True Contribution
                    </div>
                  </div>
                  {isGettingModelPerformance ? (
                    <div style={{ height: '250px' }} className={cx('data-notify')}>
                      <ReactLoading type='bubbles' height={32} width={32} />
                    </div>
                  ) : modelPerformance ? (
                    <div style={{ height: '250px' }}>
                      <ResponsiveContainer width='100%' height={250}>
                        <ComposedChart height={250} data={modelPerformance[filter]}>
                          <XAxis dataKey='DAY' tickFormatter={tickFormatter} />
                          <YAxis />
                          <Tooltip
                            labelFormatter={(value) => `Day ${moment.unix(value / 1000).format('MM/DD/YYYY')}`}
                          />
                          <Legend />
                          <CartesianGrid stroke='#29384E' vertical={false} strokeDasharray='3 3' />
                          <Bar dataKey={dataSelection[filter]} barSize={20} fill='#fff' />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div style={{ height: '250px' }} className={cx('data-notify')}>
                      No data
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </AppModal>
      </div>
    </div>
  )
}

export default Analyze
