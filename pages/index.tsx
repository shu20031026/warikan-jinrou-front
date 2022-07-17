import type { NextPage } from 'next'
import { useContext } from 'react'
import { useRecoilValue } from 'recoil'

import { AuthContext } from '~/contexts/AuthContext'
import { groupIdState, sessionIdState } from '~/contexts/store/gameData'

const HomePage: NextPage = () => {
  const { user } = useContext(AuthContext)
  const { sessionId } = useRecoilValue(sessionIdState)
  const { groupId } = useRecoilValue(groupIdState)

  return (
    <div style={{ marginTop: '20%' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: 8, textAlign: 'center', color: 'red' }}>ようこそ、LIFFの世界へ</h1>

      <table style={{ margin: 'auto' }}>
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
        </tbody>
      </table>
    </div>
  )
}

export default HomePage
