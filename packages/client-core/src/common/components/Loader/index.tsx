import React, { useEffect, useState } from 'react'
import { GeneralStateList } from '../../services/AppService'
import { useAppState } from '../../services/AppService'
import { useTranslation } from 'react-i18next'
import styles from './Loader.module.scss'
import LottieLoader from './LottieLoader'
import { useEngineState } from '../../../world/services/EngineService'
import ProgressBar from '../ProgressBar/index'

interface Props {
  Loader?: any
}

const loaderRendererCanvasId = 'loader-renderer-canvas'

const canvasStyle = {
  zIndex: 9999,
  top: '0px',
  left: '0px',
  width: '100%',
  height: '100%',
  position: 'absolute',
  WebkitUserSelect: 'none',
  userSelect: 'none'
} as React.CSSProperties

const canvas = <canvas id={loaderRendererCanvasId} style={canvasStyle} />
let count = 1

const LoadingScreen = (props: Props) => {
  const { Loader } = props
  const onBoardingStep = useAppState().onBoardingStep
  const [showProgressBar, setShowProgressBar] = useState(true)
  const [loadingText, setLoadingText] = useState('')
  const { t } = useTranslation()
  const objectsToLoad = useEngineState().loadingProgress.value
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    switch (onBoardingStep.value) {
      case GeneralStateList.START_STATE:
        setLoadingText(t('common:loader.connecting'))
        setShowProgressBar(true)
        break
      case GeneralStateList.SCENE_LOADED:
        setLoadingText(t('common:loader.entering'))
        break
      case GeneralStateList.AWAITING_INPUT:
        setLoadingText('Click to join')
        break
      case GeneralStateList.SUCCESS:
        setShowProgressBar(false)
        break
      default:
        setLoadingText(t('common:loader.loading'))
        break
    }
  }, [onBoardingStep.value])

  useEffect(() => {
    const timer = setInterval(getPercentage, 10)

    function getPercentage() {
      if (count > 100) {
        clearInterval(timer)
        return
      } else {
        setPercentage(count++)
      }
    }

    if (onBoardingStep.value === GeneralStateList.SCENE_LOADING) {
      setLoadingText(
        t('common:loader.' + (objectsToLoad > 1 ? 'objectRemainingPlural' : 'objectRemaining'), {
          count: objectsToLoad
        })
      )
    }
  }, [objectsToLoad])

  if (!showProgressBar) return null

  return (
    <>
      <section className={styles.overlay}>
        <div className={styles.imageOverlay}>This is Rainbow Screen</div>
        <section className={styles.linearProgressContainer}>
          <span className={styles.loadingText}>{t('common:loader.loadingText')}</span>
          <span className={styles.loadingProgressInfo}>{percentage}%</span>
          <ProgressBar percentage={percentage}></ProgressBar>
          <span className={styles.downloadingAssets}>{t('common:loader.downloadingAssets')}</span>
        </section>
      </section>
    </>
  )
}
export default LoadingScreen
