/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row } from 'antd'
import classNames from 'classnames/bind'
import Analyze from '../../components/Analyze'
import History from '../../components/History'
import ModelTable from '../../components/ModelTable'
import ScoreChart from '../../components/ScoreChart'
import styles from './Submission.module.sass'
import CurrentRound from '../../components/CurrenRound'
import useMediaQuery from '@src/hooks/useMediaQuery'
import { userApi } from '../../userService'
import { useEffect } from 'react'
import { SUBMISSION_TYPE } from '@src/configs'
import { isEmptyValue } from '@src/helpers/check'
import { Container } from '@mui/material'

const cx = classNames.bind(styles)
const competitionId = process.env.COMPETITION_ID

function Submission() {
  const maxSm = useMediaQuery('(max-width: 992px)')

  const [getModelPerformance, { data: modelPerformance, isLoading: isGettingModelPerformance }] =
    userApi.endpoints.getModelPerformance.useLazyQuery()
  const [getSubmissionMeanScores, { data: submissionMeanScores, isLoading: isGettingSubmissionMeanScores }] =
    userApi.endpoints.getSubmissionMeanScores.useLazyQuery()

  const [
    getSubmissionMeanScoresBacktest,
    { data: submissionMeanScoresBacktest, isLoading: isGettingSubmissionMeanScoresBacktest }
  ] = userApi.endpoints.getSubmissionMeanScores.useLazyQuery()

  const reloadBacktest = () => {
    getSubmissionMeanScoresBacktest(
      {
        path: { competitionId: competitionId, submission: SUBMISSION_TYPE.BACKTEST },
        params: {}
      },
      false
    )
  }
  const reloadData = () => {
    getSubmissionMeanScores(
      {
        path: { competitionId: competitionId, submission: SUBMISSION_TYPE.PUBLIC_TEST },
        params: {}
      },
      false
    )
  }

  useEffect(() => {
    getSubmissionMeanScores(
      {
        path: { competitionId: competitionId, submission: SUBMISSION_TYPE.PUBLIC_TEST },
        params: {}
      },
      false
    )

    getSubmissionMeanScoresBacktest(
      {
        path: { competitionId: competitionId, submission: SUBMISSION_TYPE.BACKTEST },
        params: {}
      },
      false
    )
  }, [])

  useEffect(() => {
    if (!isEmptyValue(submissionMeanScores)) {
      getModelPerformance(
        {
          path: { competitionId: process.env.COMPETITION_ID, submission: SUBMISSION_TYPE.PUBLIC_TEST },
          params: { submission_time: submissionMeanScores[0]['Submission Time'] }
        },
        false
      )
    }
  }, [submissionMeanScores])

  return (
    <div className={cx('submission-wrapper')}>
      <Container>
        {maxSm ? (
          <Row gutter={[24, 24]}>
            <Col xs={24}>
              <CurrentRound
                reloadData={reloadData}
                isLoading={isGettingSubmissionMeanScores}
                inputData={submissionMeanScores}
              />
            </Col>
            <Col xs={24}>
              <ScoreChart isLoading={isGettingModelPerformance} data={modelPerformance} />
            </Col>
            <Col xs={24}>
              <Analyze data={submissionMeanScores} />
            </Col>
            <Col xs={24}>
              <ModelTable
                reloadBacktest={reloadBacktest}
                isLoading={isGettingSubmissionMeanScoresBacktest}
                data={submissionMeanScoresBacktest}
              />
            </Col>
            <Col xs={24}>
              <History reloadData={reloadData} data={submissionMeanScores} isLoading={isGettingSubmissionMeanScores} />
            </Col>
          </Row>
        ) : (
          <Row gutter={32}>
            <Col xs={16}>
              <ScoreChart isLoading={isGettingModelPerformance} data={modelPerformance} />
              <ModelTable
                reloadBacktest={reloadBacktest}
                isLoading={isGettingSubmissionMeanScoresBacktest}
                data={submissionMeanScoresBacktest}
              />
            </Col>
            <Col xs={8}>
              <Analyze data={submissionMeanScores} />
              <CurrentRound
                reloadData={reloadData}
                isLoading={isGettingSubmissionMeanScores}
                inputData={submissionMeanScores}
              />
              <div className={cx('history')}>
                <History
                  reloadData={reloadData}
                  data={submissionMeanScores}
                  isLoading={isGettingSubmissionMeanScores}
                />
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  )
}

export default Submission
