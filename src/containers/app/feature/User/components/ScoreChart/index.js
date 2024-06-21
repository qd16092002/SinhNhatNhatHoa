import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import styles from './ScoreChart.module.sass'
import classNames from 'classnames/bind'
import AppSelect from '@src/components/AppSelect'
import { useState } from 'react'
import { dataSelection } from '@src/configs'
import ReactLoading from 'react-loading'

const cx = classNames.bind(styles)

export default function ScoreChart({ data, isLoading }) {
  const [selected, setSelected] = useState('Movement Score')
  return (
    <div className={cx('chart')}>
      <div className={cx('heading')}>
        <div className={cx('left')}>
          {/* <p className={cx('top')}>Movement score</p> */}
          <p className={cx('bottom')}>Score</p>
        </div>
        <div className={cx('right')}>
          <AppSelect onChange={setSelected} data={['Movement Score', 'Correlation', 'True Contribution']} />
        </div>
      </div>
      <div className={cx('main-chart')}>
        {data ? (
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart
              width={500}
              height={400}
              data={data[selected]}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0
              }}
            >
              <CartesianGrid stroke='#29384E' vertical={false} strokeDasharray='3 3' />
              <XAxis dataKey='day' />
              <Tooltip />
              <Area type='monotone' dataKey={dataSelection[selected]} strokeWidth={2} stroke='#8884d8' fill='#8884d8' />
            </AreaChart>
          </ResponsiveContainer>
        ) : isLoading ? (
          <div className={cx('data-noti')}>
            <ReactLoading type='bubbles' height={32} width={32} />
          </div>
        ) : (
          <div className={cx('data-noti')}>You have not submitted any results for this round yet</div>
        )}
      </div>
    </div>
  )
}
