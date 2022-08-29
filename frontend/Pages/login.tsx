import React, { useState, FormEventHandler } from 'react'
import { useRouter } from 'next/router'

import { Header } from '../Components/Header'

import style from '../styles/login.module.css'

import { signIn, SignInResponse } from 'next-auth/react'

const login = () => {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    console.log("Submit")
    signIn('Credentials', {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    }).then(async (res: SignInResponse) => {
      if (res.ok) {
        console.log("로그인 성공")
        await router.replace(router.asPath)
        await router.push(`/`)
      } else {
        console.log("로그인 실패")
        console.log(res.error)
        window.alert("로그인 정보가 불일치합니다.")
      }
    }).catch((err) => {
      console.log("로그인 실패 catch")
      console.log(err)
    })
  }

  return (
    <div className={[style.position].join(' ')}>
      <Header title='블 로 그' page_number='' />
      <main className={[style.justifySelfCenter].join(' ')}>
        <form
          className={[style.content_container].join(' ')}
          onSubmit={handleSubmit}
        >
          <div className={[style.grid_center, style.up_5px].join(' ')}>
            <span className={style.span_background}>&lt; 로 그 인 &gt;</span>
          </div>
          <div className={[style.grid_center, style.gap_5].join(' ')}>
            <div className={[style.login_container].join(' ')}>
              <span>이메일</span>
              <input
                className={[style.input].join(' ')}
                type="email"
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    email: e.target.value
                  })
                }}
              />
            </div>
            <div className={[style.login_container].join(' ')}>
              <span>비밀번호</span>
              <input
                className={[style.input].join(' ')}
                type="password"
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    password: e.target.value
                  })
                }}
              />
            </div>
            <div className={[style.grid_end].join(' ')}>
              <input
                type="submit"
                value="로그인"
              />
            </div>
            <div>
              <span
                onClick={() => {
                  router.push('/signup')
                }}
              >회원가입</span>
            </div>
          </div>
        </form>
      </main>
      <footer>
        푸터
      </footer>
    </div>
  )
}

export default login