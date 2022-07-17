import { css } from '@emotion/react'
import type { NextPage } from 'next'
import { useContext } from 'react'
import { useRecoilValue } from 'recoil'

import { AuthContext } from '~/contexts/AuthContext'
import { groupIdState, queryState } from '~/contexts/store/gameData'

export const container = css`
  background-color: #3bacb6;
`
const HomePage: NextPage = () => {
  const { user } = useContext(AuthContext)
  const { sessionId, totalPrice } = useRecoilValue(queryState)
  const { groupId } = useRecoilValue(groupIdState)

  return (
    <div>
      <h1>ようこそ、LIFFの世界へ</h1>

      <div>
        {totalPrice !== null ? (
          <>
            <p>{totalPrice}</p>
          </>
        ) : (
          <div>error</div>
        )}
      </div>
      <table>
        <tbody>
          <tr>
            <td>LINE表示名</td>
            <td>：{user!.name}</td>
          </tr>
          <tr>
            <td>userUid</td>
            <td>：{user!.userUid}</td>
          </tr>
          <tr>
            <td>sessionId</td>
            <td>：{sessionId}</td>
          </tr>
          <tr>
            <td>groupId</td>
            <td>：{groupId}</td>
          </tr>
          <tr>
            <td>totalPrice</td>
            <td>：{totalPrice}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default HomePage
