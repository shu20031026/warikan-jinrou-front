import { css } from '@emotion/react'
import type { NextPage } from 'next'
import { useContext, useState } from 'react'
import RangeSlider from 'react-bootstrap-range-slider'
import { useRecoilValue } from 'recoil'

import { AuthContext } from '~/contexts/AuthContext'
import { queryState } from '~/contexts/store/gameData'
export const container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  padding: 4vh 8vw;
  color: white;
  font-size: 1.4rem;
`

export const slideBarWrapper = css`
  width: 60vw;
`

export const contentWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const slideBarScale = css`
  display: flex;
  justify-content: space-between;
  width: 110%;
  height: 20px;
`

export const buttonStyle = css`
  border-radius: 10px;
  background-color: white;
  margin-top: 10px;
  height: 40px;
  width: 60%;
  color: #3bacb6;
`

export const nowAmount = css`
  font-size: 2rem;
`

export const middleSpan = css`
  font-size: 1.8rem;
  color: #fff5ee;
`

export const lordingOverLay = css`
  position: fixed;
  display: flex;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
`

export const lordingSvg = css`
  color: #3bacb6;
`

const HomePage: NextPage = () => {
  const [sliderValue, setSliderValue] = useState<number>(0)
  const [isAlreadySendData, setIsAlreadySendData] = useState<boolean>(false)
  const [isSending, setIsSending] = useState<boolean>(false)
  const { user } = useContext(AuthContext)
  const { sessionId, totalPrice } = useRecoilValue(queryState)

  const postData = {
    sessionId: sessionId,
    userId: user?.userUid,
    userData: {
      user_name: user?.name,
      payment_offer_price: sliderValue
    }
  }

  const sendData = async () => {
    setIsSending(true)
    await fetch('/api/proxy/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    })
      .then((res) => res.json())
      .then((data) => {
        console.info(data)
        setIsSending(false)
        setIsAlreadySendData(true)
      })
      .catch((err) => {
        console.error(err)
        setIsSending(false)
        setIsAlreadySendData(false)
      })
  }

  return (
    <div css={container}>
      {isSending && (
        <div css={lordingOverLay}>
          <div>Lording...</div>
        </div>
      )}
      <div>
        {totalPrice !== null ? (
          <div css={contentWrapper}>
            {!isAlreadySendData ? (
              <>
                <p>
                  <span css={middleSpan}>{user?.name} </span>さんは
                  <br />
                  合計金額 <span css={middleSpan}>{totalPrice}</span> 円のうち
                  <br />
                  いくらまで支払えますか...？
                </p>
                <p css={nowAmount}>{sliderValue}円</p>
                <div css={slideBarWrapper}>
                  <div css={slideBarScale}>
                    <span>¥０</span>
                    <span>¥{totalPrice}</span>
                  </div>
                  <RangeSlider
                    value={sliderValue}
                    min={0}
                    max={totalPrice}
                    tooltip={'off'}
                    step={totalPrice / 100}
                    onChange={(e) => {
                      setSliderValue(parseInt(e.target.value))
                    }}
                  />
                </div>
                <button
                  css={buttonStyle}
                  onTouchStart={() => {
                    //データをPOST
                    console.info(postData)
                    sendData()
                  }}
                >
                  決定
                </button>
              </>
            ) : (
              <>
                <div>
                  <p>送信完了</p>
                  <p>{sliderValue}</p>
                </div>
              </>
            )}
          </div>
        ) : (
          <div>error</div>
        )}
      </div>
    </div>
  )
}

export default HomePage
