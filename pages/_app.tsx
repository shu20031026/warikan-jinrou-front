import 'ress'
import '~/styles/globals.scss'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { RecoilRoot } from 'recoil'

import { Authenticated } from '~/components/Authenticated'
import { AuthProvider } from '~/contexts/AuthContext'
import { useScrollTop } from '~/hooks/useScrollTop'
import { DefaultLayout } from '~/layouts/Default'

export default function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  useScrollTop()
  useEffect(() => {
    document.addEventListener(
      'touchmove',
      (e) => {
        e.preventDefault()
      },
      { passive: false }
    )
  }, [])

  return (
    <RecoilRoot>
      <AuthProvider>
        <Authenticated />

        <DefaultLayout>
          <Component {...pageProps} key={router.asPath} />
        </DefaultLayout>
      </AuthProvider>
    </RecoilRoot>
  )
}
