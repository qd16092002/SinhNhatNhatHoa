/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import data3 from '@src/assets/images/data3.png'
import { ChevronDown, CloseIcon, StarDivider } from '@src/assets/svgs'
import AppButton from '@src/components/AppButton'
import AppModal from '@src/components/AppModal'
import useMediaQuery from '@src/hooks/useMediaQuery'
import { Col, Row } from 'antd'
import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import {
  useCreateApiKeyMutation,
  useLazyGetApiKeyQuery,
  useLazyGetDataQuery,
  useLazyGetSymbolByCategoryQuery,
  useLazyGetVerifyCompetitionQuery
} from '../../userService'
import styles from './Data.module.sass'
import { SYMBOL_OPTIONS } from '@src/configs'
import { Container } from '@mui/material'
// import axios from 'axios'
// import Cookies from 'universal-cookie'

// const cookies = new Cookies()

const cx = classNames.bind(styles)
const options = SYMBOL_OPTIONS

function Data() {
  const [showOptions, setShowOptions] = useState(false)
  const [showSuggest, setShowSuggest] = useState(false)
  const [symbol, setSymbol] = useState('')
  const [selectedOption, setSelectedOption] = useState(options[0])
  const [verifyClick, setVerifyClick] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const symbolInput = useRef()
  const closeModal = useRef(null)

  const [getData, { isFetching: isLoading }] = useLazyGetDataQuery()
  const [getApiKey, { data: apiKey, isLoading: isGettingAPIKey }] = useLazyGetApiKeyQuery()
  const [createApiKey, { data: newApiKey, isLoading: isCreatingAPIKey }] = useCreateApiKeyMutation()
  const [getSymbols, { data: symbols }] = useLazyGetSymbolByCategoryQuery()
  const [getRegistered, { data: verifyCompetition }] = useLazyGetVerifyCompetitionQuery()

  const maxSm = useMediaQuery('(max-width: 992px)')

  useEffect(() => {
    setOpenModal(!verifyCompetition)
  }, [verifyCompetition])

  useEffect(() => {
    getRegistered(null, false)
    getSymbols({ category: options[0].toLowerCase() }, false)
  }, [])

  const handleOptionClick = async (index) => {
    setSelectedOption(options[index])
    setShowOptions(false)
    await getSymbols({ category: options[index].toLowerCase() })
  }

  const handleOutsideClick = () => {
    setShowOptions(false)
  }

  const handleGetData = async () => {
    const response = await getData({ category: selectedOption.toLowerCase(), symbol: symbol.toUpperCase() }, false)

    if (response?.error) {
      toast.error(response?.error?.data?.detail || 'An error occurred')
    } else {
      const href = response.data

      // create "a" HTML element with href to file & click
      const link = document.createElement('a')
      link.href = href
      link.setAttribute('download', `${symbol}.zip`) //or any other extension
      document.body.appendChild(link)
      link.click()

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link)
      URL.revokeObjectURL(href)
    }
  }

  const handleGetAPIKey = async () => {
    if (!verifyCompetition) {
      toast.error('You must subscribe to competition to get API key!')
    } else {
      const response = await getApiKey(null, false)
      if (response.error?.status === 404) {
        const result = await createApiKey()
      } else if (response.error) {
        toast.error(response?.error?.data?.detail || 'An error occurred')
        //other error\
      }
    }
  }

  const handleSymbolClick = (symbol) => {
    symbolInput.current.value = symbol
    setSymbol(symbol)
  }

  return (
    <div className={cx('data')}>
      <Container>
        <AppModal
          closeRef={closeModal}
          width={399}
          height={142}
          isOpen={openModal}
          contentStyle={{
            borderRadius: '16px',
            padding: '24px',
            border: 'none',
            backgroundColor: '#29384E'
          }}
        >
          <div className={cx('submit-modal')}>
            <div ref={closeModal} onClick={() => setOpenModal(false)} className={cx('close')}>
              <CloseIcon />
            </div>
            <p className={cx('heading')}>You have to register to participate in the tournament to access the data</p>
            <Link
              target='_blank'
              rel='noopener noreferrer'
              to='https://docs.google.com/forms/d/e/1FAIpQLSeJ--tvLKIpHKB-pKE6RKRiQWmMnpye_86Bg6vxfjruz9IBSQ/viewform?usp=send_form'
              className={cx('btn')}
            >
              <AppButton
                style={{ width: '100%', background: 'linear-gradient(96.06deg, #526AEA 4.1%, #B0AEFF 146.32%)' }}
              >
                Subscribe
              </AppButton>
            </Link>
          </div>
        </AppModal>
        <div className={cx('bg-1')}></div>
        <div className={cx('bg-2')}></div>
        <div className={cx('bg-3')}></div>
        <Toaster position='top-center' reverseOrder={false} />
        <div className={cx(maxSm ? 'data-wrapper-mobile' : 'data-wrapper')}>
          {verifyClick ? <div className={cx('verify-notification')}>Please check your email to verify!</div> : null}
          <div className={cx('heading')}>Download historical data</div>
          <p className={cx('description')}>Obtain the most up-to-date financial information</p>
          <p className={cx('description')}>
            To obtain additional details regarding the data we offer, kindly refer to our document dedicated to the raw
            data section.
          </p>
          <div className={cx('download-wrapper')}>
            <Row gutter={12}>
              <Col lg={10} md={10} sm={24} xs={24} gap={12}>
                <div className={cx('custom-select-wrapper')} onBlur={handleOutsideClick}>
                  <div className={cx('custom-select')} onClick={() => setShowOptions(!showOptions)}>
                    <div className={cx('selected-option')}>{selectedOption}</div>
                    <div className={cx('arrow')} style={showOptions ? { rotate: '180deg' } : {}}>
                      <ChevronDown />
                    </div>
                  </div>
                  <div style={showOptions ? {} : { display: 'none' }} className={cx('options')}>
                    {options.map((option, index) => {
                      return (
                        <div key={option} className={cx('option')} onClick={() => handleOptionClick(index)}>
                          {option}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </Col>
              <Col lg={10} md={10} sm={16} xs={16}>
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
                            <div
                              key={symbolItem}
                              className={cx('symbol')}
                              onClick={() => handleSymbolClick(symbolItem)}
                            >
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
              </Col>
              <Col lg={4} md={4} sm={8} xs={8}>
                <div className={cx('button')}>
                  <AppButton
                    isLoading={isLoading}
                    onClick={() => {
                      handleGetData()
                    }}
                    style={{ background: 'linear-gradient(96.06deg, #526AEA 4.1%, #B0AEFF 146.32%)' }}
                  >
                    Download
                  </AppButton>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className={cx('divider')}>
          <div className={cx('left')}></div>
          <div className={cx('center')}>
            <StarDivider />
            <StarDivider />
            <StarDivider />
          </div>
          <div className={cx('right')}></div>
        </div>
        <div className={cx('api-key-wrapper')}>
          <div className={cx('api-key')}>
            <Row style={{ width: '100%' }} gutter={12}>
              <Col lg={12} md={12} sm={0} xs={0}>
                <div className={cx('text')}>
                  <div style={{ marginTop: '24px' }} className={cx('heading')}>
                    Using NestQuant API
                  </div>
                  <p className={cx('description')}>
                    If you wish to engage with our data using an API, please explore{' '}
                    <a
                      style={{ color: '#b0aeff', fontWeight: '500' }}
                      href='https://github.com/nestquant/NestQuant-Tutorial/tree/feature/etl'
                      target='_blank'
                      rel='noreferrer'
                    >
                      {' '}
                      this repository
                    </a>
                    .
                  </p>
                  <div className={cx('api-button')}>
                    <AppButton isLoading={isGettingAPIKey || isCreatingAPIKey} onClick={handleGetAPIKey}>
                      Get API key
                    </AppButton>
                  </div>
                  {apiKey && !newApiKey ? (
                    <div className={cx('api-key')}>{`Your API key: ${apiKey.api_key}`}</div>
                  ) : null}
                  {newApiKey ? <div className={cx('api-key')}>{`Your API key: ${newApiKey.api_key}`}</div> : null}
                </div>
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                <div className={cx('get-api-key')}>
                  <img src={data3} alt='api-key' />
                </div>
              </Col>
              <Col lg={0} md={0} sm={24} xs={24}>
                <div className={cx('text-mobile')}>
                  <div style={{ marginTop: '24px' }} className={cx('heading')}>
                    Using NestQuant API
                  </div>
                  <p className={cx('description')}>
                    If you wish to engage with our data using an API, please explore{' '}
                    <a
                      style={{ color: '#b0aeff', fontWeight: '500' }}
                      href='https://github.com/nestquant/NestQuant-Tutorial/tree/feature/etl'
                      target='_blank'
                      rel='noreferrer'
                    >
                      {' '}
                      this repository
                    </a>
                    .
                  </p>
                  <div className={cx('api-button')}>
                    <AppButton isLoading={isGettingAPIKey || isCreatingAPIKey} onClick={handleGetAPIKey}>
                      Get API key
                    </AppButton>
                  </div>
                  {apiKey && !newApiKey ? (
                    <div className={cx('api-key')}>{`Your API key: ${apiKey.api_key}`}</div>
                  ) : null}
                  {newApiKey ? <div className={cx('api-key')}>{`Your API key: ${newApiKey.api_key}`}</div> : null}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Data
