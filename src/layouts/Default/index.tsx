import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useSetRecoilState } from 'recoil'

import { Loader } from '~/components/Loader'
import { AuthContext } from '~/contexts/AuthContext'
import { queryState } from '~/contexts/store/gameData'

import type { LayoutProps } from '../types'
import { container } from './style'

export const DefaultLayout: FC<LayoutProps> = ({ children }) => {
  const { isError, isLogIn } = useContext(AuthContext)
  const setQuery = useSetRecoilState(queryState)
  const router = useRouter()
  const query = router.query

  useEffect(() => {
    const sessionId = typeof query.sessionId === 'string' ? query.sessionId : null
    const totalPriceData = Number(query.totalPrice)
    const totalPrice = typeof totalPriceData === 'number' ? totalPriceData : null
    setQuery({ sessionId, totalPrice })
  }, [query])

  if (isError) {
    return (
      <div
        css={container}
        style={{
          margin: 'auto',
          maxWidth: '600',
          height: '100vh',
          minHeight: '100vh',
          paddingBottom: 2,
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: 2, color: '#ff0000' }}>ログインに失敗しました</div>
            <a href="https://github.com/shu20031026">
              <div style={{ textDecoration: 'underline' }}>管理人へ</div>
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      css={container}
      style={{ margin: 'auto', maxWidth: '600', height: '100vh', minHeight: '100vh', paddingBottom: 2 }}
    >
      {isLogIn ? children : <Loader />}
    </div>
  )
}
