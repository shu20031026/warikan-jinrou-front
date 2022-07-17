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
  padding: 4px 20px;
  color: #3bacb6;
`

const HomePage: NextPage = () => {
  const [sliderValue, setSliderValue] = useState<number>(0)
  const { user } = useContext(AuthContext)
  const { sessionId, totalPrice } = useRecoilValue(queryState)
  const { groupId } = useRecoilValue(groupIdState)
  return (
    <div css={container}>
      <p>
        {user?.name}さんは合計金額{totalPrice}円のうち、
        <br />
        いくらまで支払えますか...？
      </p>
      <div>
        {totalPrice !== null ? (
          <div css={contentWrapper}>
            <p>{sliderValue}円</p>
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
              onClick={() => {
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
