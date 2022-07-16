import type { NextPage } from 'next'
import { useContext } from 'react'

import { AuthContext } from '~/contexts/AuthContext'

const HomePage: NextPage = () => {
  const { user } = useContext(AuthContext)

  return (
      <div style={{ marginTop: '20%' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: 8, textAlign: 'center' }}>ようこそ、LIFFの世界へ</h1>

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
          </tbody>
        </table>
      </div>
  )
}

export default HomePage
