import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const index = () => {
  const router = useRouter()
  useEffect(() => {
    console.log('게시판으로 이동중...')
    router.replace('/1')
  }, [])
  return (
    <div >
      Redirecting...

    </div>

  )
}

export default index
