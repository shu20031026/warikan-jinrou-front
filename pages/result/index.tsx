import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { queryState } from '~/contexts/store/gameData'

const ResultPage: NextPage = () => {
  const { sessionId, totalPrice } = useRecoilValue(queryState)
  console.info(totalPrice)
  useEffect(() => {
    const fetchData = async () => {
      await fetch(`/api/proxy/result?sessionId=${sessionId}`)
        .then((res) => console.info(res.json()))
        .then((data) => {
          console.info(data)
        })
        .catch((err) => {
          console.error(err)
        })
    }
    fetchData()
  }, [])

  return (
    <>
      <div>result page</div>
    </>
  )
}

export default ResultPage
