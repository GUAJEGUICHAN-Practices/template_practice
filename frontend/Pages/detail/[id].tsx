import { useRouter } from 'next/router'
import React from 'react'

export default () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <>
      <div>하위목록 메뉴바</div>
      <div>{id}</div>
    </>
  )
}
