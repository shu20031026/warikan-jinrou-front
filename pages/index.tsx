import { css } from '@emotion/react'
import type { NextPage } from 'next'
import { useContext, useState } from 'react'
import RangeSlider from 'react-bootstrap-range-slider'
import { useRecoilValue } from 'recoil'

import { AuthContext } from '~/contexts/AuthContext'
import { groupIdState, queryState } from '~/contexts/store/gameData'

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

const HomePage: NextPage = () => {
  const [sliderValue, setSliderValue] = useState<number>(0)
  // const [alreadySendData, setAlreadySendData] = useState<boolean | 'sending'>(false)
  const { user } = useContext(AuthContext)
  const { sessionId, totalPrice } = useRecoilValue(queryState)
  const { groupId } = useRecoilValue(groupIdState)
  console.info(sessionId)
  console.info(groupId)
  return (
    <div css={container}>
      <p>
        <span css={middleSpan}>{user?.name} </span>さんは
        <br />
        合計金額 <span css={middleSpan}>{totalPrice}</span> 円のうち
        <br />
        いくらまで支払えますか...？
      </p>
      <div>
        {totalPrice !== null ? (
          <div css={contentWrapper}>
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
                console.info(sliderValue)
              }}
            >
              決定
            </button>
          </div>
        ) : (
          <div>error</div>
        )}
      </div>
    </div>
  )
}

export default HomePage
