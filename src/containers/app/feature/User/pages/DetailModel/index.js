import { ClockCloseIcon, ClockOpenIcon, LinkIcon, UploadImg } from '@src/assets/svgs'
import AppButton from '@src/components/AppButton'
import AppModal from '@src/components/AppModal/AppModal'
import Status from '@src/components/Status'
import { Col, Row } from 'antd'
import classNames from 'classnames/bind'
import { useRef } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import HistoryItem from '../../components/HistoryItem'
import Trend from '../../components/Trend'
import styles from './DetailModel.module.sass'

const cx = classNames.bind(styles)

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
]
function DetailModel() {
  const closeModal = useRef(null)

  return (
    <div className={cx('wrapper')}>
      <Row gutter={32}>
        <Col xs={8}>
          <div className={cx('curr-round')}>
            <div className={cx('heading')}>
              <div className={cx('top')}>
                <p>Current round</p>
                <Status active>Opening</Status>
              </div>
              <div className={cx('bottom')}>Round 123</div>
            </div>
            <div className={cx('content-list')}>
              <HistoryItem Icon={<ClockOpenIcon />} title='Open time'>
                7h00
              </HistoryItem>
              <HistoryItem Icon={<ClockCloseIcon />} title='Close time'>
                7h00
              </HistoryItem>
              <HistoryItem Icon={<LinkIcon />} title='My models submitted'>
                <p>436</p>
                <Trend up value='10%' />
              </HistoryItem>
            </div>
            <div className={cx('btn')}>
              {/* <AppButton
                style={{ width: '100%', background: 'linear-gradient(96.06deg, #526AEA 4.1%, #B0AEFF 146.32%)' }}
              >
                Submit now
              </AppButton> */}
              <AppModal
                closeRef={closeModal}
                width={399}
                height={328}
                triggerBtn={
                  <AppButton
                    style={{ width: '100%', background: 'linear-gradient(96.06deg, #526AEA 4.1%, #B0AEFF 146.32%)' }}
                  >
                    Submit now
                  </AppButton>
                }
                contentStyle={{
                  borderRadius: '16px',
                  padding: '24px',
                  border: 'none',
                  backgroundColor: '#29384E'
                }}
              >
                <div className={cx('submit-modal')}>
                  <h4 className={cx('heading')}>Submit now</h4>
                  <p className={cx('desc')}>Are you sure you want to submit this round now?</p>
                  <div className={cx('input')}>
                    <label htmlFor='submit-input'>
                      <div className={cx('img')}>
                        <UploadImg />
                      </div>
                      <div className={cx('text')}>Upload your file</div>
                      <p>Drag & drop your file here</p>
                    </label>
                    <input id='submit-input' type='file' />
                  </div>
                  <div className={cx('action')}>
                    <AppButton
                      ref={closeModal}
                      style={{ width: '100%', background: 'linear-gradient(96.06deg, #526AEA 4.1%, #B0AEFF 146.32%)' }}
                    >
                      Cancel
                    </AppButton>
                    <AppButton
                      style={{ width: '100%', background: 'linear-gradient(96.06deg, #526AEA 4.1%, #B0AEFF 146.32%)' }}
                    >
                      Submit now
                    </AppButton>
                  </div>
                </div>
              </AppModal>
            </div>
          </div>
        </Col>
        <Col xs={16}>
          <div className={cx('scoring')}>
            <div className={cx('heading')}>
              <div className={cx('text')}>Scoring</div>
              <div className={cx('filter')}></div>
            </div>
            <div className={cx('chart')}>
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart
                  width={500}
                  height={400}
                  data={data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0
                  }}
                >
                  <CartesianGrid stroke='#29384E' vertical={false} strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type='monotone' dataKey='pv' stroke='#8884d8' activeDot={{ r: 8 }} />
                  <Line type='monotone' dataKey='uv' stroke='#82ca9d' />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default DetailModel
