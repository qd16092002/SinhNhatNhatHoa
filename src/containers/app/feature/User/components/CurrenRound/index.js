/* eslint-disable react-hooks/exhaustive-deps */
import { ClockCloseIcon, ClockOpenIcon, LinkIcon, UploadImg } from '@src/assets/svgs'
import AppButton from '@src/components/AppButton'
import AppModal from '@src/components/AppModal/AppModal'
import Status from '@src/components/Status'
import { SUBMISSION_TYPE } from '@src/configs'
import classNames from 'classnames/bind'
import { useRef, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { userApi } from '../../userService'
import HistoryItem from '../HistoryItem'
import styles from './CurrentRound.module.sass'
import moment from 'moment/moment'
import { isEmptyValue } from '@src/helpers/check'
import ReactLoading from 'react-loading'

const cx = classNames.bind(styles)

function CurrentRound({ isLoading, reloadData, inputData }) {
  const [file, setFile] = useState()
  const closeModal = useRef(null)

  const [submitModel, { isLoading: isSubmitting }] = userApi.endpoints.submitModel.useMutation()

  const handleSubmitModel = async () => {
    const data = new FormData()
    if (file) {
      data.append('file', file)
      const response = await submitModel({
        params: { competitionId: process.env.COMPETITION_ID, submission: SUBMISSION_TYPE.PUBLIC_TEST },
        body: data
      })

      if (response.error) {
        toast.error(response.error.data.detail || 'An error occurred')
      } else {
        toast.success("Submit model's prediction successfully!")
        setTimeout(() => {
          reloadData()
        }, 10000)
        closeModal.current.click()
      }
    } else {
      toast.error('Please choose a file')
    }
  }

  return (
    <div className={cx('curr-round')}>
      <Toaster />
      <div className={cx('heading')}>
        <div className={cx('top')}>
          <p>Public test</p>
          <Status active>Opening</Status>
        </div>
        <div className={cx('bottom')}>Latest Performance</div>
      </div>
      <div className={cx('content-list')}>
        {!isEmptyValue(inputData) ? (
          <>
            <HistoryItem Icon={<ClockOpenIcon />} title='Submission Time'>
              {moment.unix(inputData[0]['Submission Time'] / 1000).format('MM/DD/YYYY')}
            </HistoryItem>
            <HistoryItem Icon={<ClockCloseIcon />} title='Movement Score'>
              {Number(inputData[0]['Movement Score']).toFixed(6)}
            </HistoryItem>
            <HistoryItem Icon={<LinkIcon />} title='Correlation'>
              <p> {Number(inputData[0]['Correlation']).toFixed(6)}</p>
              {/* <Trend up value='10%' /> */}
            </HistoryItem>
            <HistoryItem Icon={<ClockCloseIcon />} title='True Contribution'>
              {Number(inputData[0]['True Contribution']).toFixed(6)}
            </HistoryItem>
          </>
        ) : isLoading ? (
          <div className={cx('data-notify')}>
            <ReactLoading type='bubbles' height={32} width={32} />{' '}
          </div>
        ) : (
          <div className={cx('data-notify')}>No data</div>
        )}
      </div>
      <div className={cx('btn')}>
        {/* <AppButton
      style={{ width: '100%', background: 'linear-gradient(96.06deg, #526AEA 4.1%, #B0AEFF 146.32%)' }}
    >
      Submit now
    </AppButton> */}
        <AppModal
          ref={closeModal}
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
    </div>
  )
}

export default CurrentRound
