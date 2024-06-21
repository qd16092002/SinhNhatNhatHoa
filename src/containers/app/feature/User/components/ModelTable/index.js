/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
import { useEffect, useRef, useState } from 'react'
import ReactLoading from 'react-loading'
import { Bar, CartesianGrid, ComposedChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Toaster, toast } from 'react-hot-toast'
import moment from 'moment'
import classNames from 'classnames/bind'

import { CloseIcon, UploadImg } from '@src/assets/svgs'
import AppButton from '@src/components/AppButton'
import AppModal from '@src/components/AppModal/AppModal'
import { SUBMISSION_TYPE, SYMBOL_OPTIONS, dataSelection } from '@src/configs'
import useMediaQuery from '@src/hooks/useMediaQuery'
import { useLazyGetSymbolByCategoryQuery, userApi } from '../../userService'
import Trend from '../Trend'
import styles from './ModelTable.module.sass'
import { isEmptyValue } from '@src/helpers/check'
import { Col, Row } from 'antd'

const cx = classNames.bind(styles)
const options = SYMBOL_OPTIONS
const competitionId = process.env.COMPETITION_ID

const ModelTable = ({ reloadBacktest, isLoading, data }) => {
  const [file, setFile] = useState()
  const [showOptions, setShowOptions] = useState(false)
  const [showSuggest, setShowSuggest] = useState(false)
  const [filter, setFilter] = useState('Movement Score')
  const [symbol, setSymbol] = useState('')
  const symbolInput = useRef()
  const maxMobile = useMediaQuery('(max-width: 992px)')
  const closeModal = useRef(null)
  const closeModalPerformance = useRef(null)
  const openPerformanceRef = useRef(null)
  const maxSm = useMediaQuery('(max-width: 992px)')

  const [submitModel, { isLoading: isSubmitting }] = userApi.endpoints.submitModel.useMutation()
  const [deleteSubmission, { isLoading: isDeleting }] = userApi.endpoints.deleteSubmission.useMutation()
  const [getSymbols, { data: symbols }] = useLazyGetSymbolByCategoryQuery()
  const [getModelPerformance, { data: modelPerformance, isFetching: isGettingModelPerformance }] =
    userApi.endpoints.getModelPerformance.useLazyQuery()

  useEffect(() => {
    getSymbols({ category: options[0].toLowerCase() }, false)
  }, [])

  const handleOutsideClick = () => {
    setShowOptions(false)
  }

  const handleSubmitModel = async () => {
    const data = new FormData()
    if (file) {
      data.append('file', file)
      const response = await submitModel({
        params: { competitionId: process.env.COMPETITION_ID, submission: SUBMISSION_TYPE.BACKTEST, symbol: symbol },
        body: data
      })

      if (response.error) {
        toast.error(response.error.data.detail || 'An error occurred')
      } else {
        toast.success("Submit model's prediction successfully!")
        setTimeout(() => {
          reloadBacktest()
        }, 10000)
        closeModal.current.closeModal()
      }
    } else {
      toast.error('Please choose a file')
    }
  }

  const handleSymbolClick = (symbol) => {
    symbolInput.current.value = symbol
    setSymbol(symbol)
  }

  const handleDelete = async (data) => {
    const response = await deleteSubmission({
      path: {
        competitionId: process.env.COMPETITION_ID,
        submission: SUBMISSION_TYPE.BACKTEST,
        submission_time: data['Submission Time']
      },
      body: { symbol: data.Symbol }
    })

    if (response.error) {
      toast.error(response.error.data.detail || 'An error occurred')
    } else {
      toast.success('Delete successfully!')
      reloadBacktest()
    }
  }

  {
    /**modal analyze handler */
  }
  const handleFilter = (name) => {
    setFilter(name)
  }

  const tickFormatter = (unixTime) => {
    return moment(unixTime).format('MM/DD/YYYY')
  }

  const handleGetModelPerformance = async ({ symbol, timeId }) => {
    openPerformanceRef.current.click()
    await getModelPerformance(
      {
        path: { competitionId: competitionId, submission: SUBMISSION_TYPE.BACKTEST },
        params: { submission_time: timeId, symbol: symbol }
      },
      false
    )
  }

  return (
    <div className={cx('models')}>
      <Toaster />
      <div className={cx('heading')}>
        <div className={cx('text')}>Backtesting</div>
        <AppModal
          ref={closeModalPerformance}
          width={maxSm ? '90%' : '80%'}
          height={maxSm ? '90%' : 'auto'}
          triggerBtn={
            <AppButton
              ref={openPerformanceRef}
              style={{
                width: '100%',
                display: 'none',
                background: 'linear-gradient(96.06deg, #526AEA 4.1%, #B0AEFF 146.32%)'
              }}
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
              <div onClick={() => closeModalPerformance.current.click()} className={cx('close')}>
                <CloseIcon />
              </div>
            </div>
            <div className={cx('score-wrapper')}>
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

              <div className={cx('score')}>
                <div className={cx('name')}>Correlation</div>
                {isGettingModelPerformance ? (
                  <div className={cx('data-notify')}>
                    <ReactLoading type='bubbles' height={32} width={32} />
                  </div>
                ) : modelPerformance ? (
                  <div className={cx('value')}>{Number(modelPerformance['Mean Score']['Correlation']).toFixed(6)}</div>
                ) : (
                  <div className={cx('data-notify')}>No data</div>
                )}
              </div>

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
                <div style={{ height: '400px' }}>
                  <ResponsiveContainer width='100%' height={400}>
                    <ComposedChart height={250} data={modelPerformance[filter]}>
                      <XAxis dataKey='DAY' tickFormatter={tickFormatter} />
                      <YAxis />
                      <Tooltip labelFormatter={(value) => `Day ${moment.unix(value / 1000).format('MM/DD/YYYY')}`} />
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
          </div>
        </AppModal>
        {/**modal open when click on add new testcase */}
        <AppModal
          ref={closeModal}
          width={399}
          height={380}
          triggerBtn={<AppButton style={{ width: '100%', background: '#2F4C78' }}>Add new testcase</AppButton>}
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
            <div className={cx('select-symbol-wrapper')}>
              <div className={cx('custom-select-wrapper')} onBlur={handleOutsideClick}>
                <div className={cx('custom-select')}>
                  <div className={cx('selected-option')}>Crypto</div>
                </div>
              </div>
              <div className={cx('form-field')}>
                <input
                  ref={symbolInput}
                  id='username-login'
                  type='text'
                  onFocus={() => {
                    setShowSuggest(true)
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setShowSuggest(false)
                    }, [200])
                  }}
                  onChange={(e) => setSymbol(e.target.value)}
                  placeholder='Enter your symbol'
                />
                <div style={!showSuggest ? { display: 'none' } : {}} className={cx('suggest-symbol')}>
                  {symbols?.symbols !== [] ? (
                    symbols?.symbols?.map((symbolItem) => {
                      if (symbolItem.includes(symbol.toUpperCase()))
                        return (
                          <div key={symbolItem} className={cx('symbol')} onClick={() => handleSymbolClick(symbolItem)}>
                            {symbolItem}
                          </div>
                        )
                      else {
                        return null
                      }
                    })
                  ) : (
                    <div className={cx('symbol')} key='not-found'>
                      No symbol matching your search
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={cx('input')}>
              <label htmlFor='submit-input'>
                <div className={cx('img')}>
                  <UploadImg />
                </div>
                <div className={cx('text')}>{file?.name ?? 'Upload your file'}</div>
                <p>Drag & drop your file here</p>
              </label>
              <input
                id='submit-input'
                type='file'
                onChange={(e) => {
                  setFile(e.target.files[0])
                }}
              />
            </div>
            <div className={cx('action')}>
              <AppButton
                onClick={() => closeModal.current.click()}
                style={{ width: '100%', background: 'linear-gradient(96.06deg, #526AEA 4.1%, #B0AEFF 146.32%)' }}
              >
                Cancel
              </AppButton>
              <AppButton
                onClick={handleSubmitModel}
                isLoading={isSubmitting}
                style={{ width: '100%', background: 'linear-gradient(96.06deg, #526AEA 4.1%, #B0AEFF 146.32%)' }}
              >
                Submit now
              </AppButton>
            </div>
          </div>
        </AppModal>
      </div>
      <div className={cx('table')}>
        {!isLoading ? (
          <table>
            <tr>
              <th>Ord</th>
              <th>Symbol</th>
              <th>MS</th>
              {!maxMobile ? (
                <>
                  <th>Correlation</th>
                  <th>TC</th>
                  <th>Submission Time</th>
                </>
              ) : null}

              <th></th>
            </tr>
            {data?.map((item, index) => {
              return (
                <tr key={item['Submission Time']}>
                  <td>{index + 1}</td>
                  <td>
                    <div
                      onClick={() => {
                        handleGetModelPerformance({ symbol: item['Symbol'], timeId: item['Submission Time'] })
                      }}
                      className={cx('symbol')}
                    >
                      {item['Symbol'].slice(0, -4)}
                    </div>
                  </td>
                  <td>{Number(item['Movement Score']).toFixed(6)}</td>
                  {!maxMobile ? (
                    <>
                      {/* <td className={cx('tc')}>{item['True Contribution']}</td> */}
                      <td className={cx('stake')}>{Number(item['Correlation']).toFixed(6)}</td>
                      <td className={cx('trend')}>
                        <Trend
                          up={item['True Contribution'] > 0}
                          value={Number(item['True Contribution']).toFixed(6)}
                        />
                      </td>
                      <td className={cx('status')}>
                        {/* <div className={cx('active')}>Active</div> */}
                        {moment.unix(item['Submission Time'] / 1000).format('MM/DD/YYYY HH:mm:ss')}
                      </td>
                    </>
                  ) : null}

                  <td>
                    <div className={cx('delete-action')} onClick={() => handleDelete(item)}>
                      Delete
                    </div>
                  </td>
                </tr>
              )
            })}
          </table>
        ) : (
          <div>
            <ReactLoading type='bubbles' height={32} width={32} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ModelTable
