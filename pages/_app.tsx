import 'ress'
import '~/styles/globals.scss'

import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

import { Authenticated } from '~/components/Authenticated'
import { AuthProvider } from '~/contexts/AuthContext'
import { useScrollTop } from '~/hooks/useScrollTop'
import { DefaultLayout } from '~/layouts/Default'

document.addEventListener(
  'touchmove',
  (e) => {
    e.preventDefault()
  },
  { passive: false }
)

export default function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  useScrollTop()

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
