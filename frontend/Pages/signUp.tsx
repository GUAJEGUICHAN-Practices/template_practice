import React, { FormEventHandler, useState } from 'react'
import { Header } from '../Components/Header'
import style from '../styles/login.module.css'

import { useRouter } from 'next/router'
import axios from 'axios'
import { signIn } from 'next-auth/react'

const signup = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    password: "",
    checkPassword: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInfo.password === userInfo.checkPassword) {
      const res = await axios.post('/api/signup', {
        email: userInfo.email,
        username: userInfo.username,
        password: userInfo.password,
      })
      if (res.data.ok) {
        window.alert('회원가입에 성공했습니다!')
        signIn()
      } else {
        console.log(res.data.err)
        window.alert('회원가입에 실패했습니다!')
      }
      console.log(res)
    } else {
      window.alert("비밀번호를 재확인해주세요")
    }

  }

  return <div className={[style.position].join(' ')}>
    <Header title='블 로 그' page_number='' />
    <main className={[style.justifySelfCenter].join(' ')}>
      <form
        onSubmit={handleSubmit}
        className={[style.content_container].join(' ')}>
        <div className={[style.grid_center, style.up_5px].join(' ')}>
          <span className={style.span_background}>&lt;회 원 가 입&gt;</span>
        </div>
        <div className={[style.grid_center, style.gap_5, style.login_total_container].join(' ')}>
          <div className={[style.signup_container].join(' ')}>
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
          <div className={[style.signup_container].join(' ')}>
            <span>이름</span>
            <input
              className={[style.input].join(' ')}
              type="text"
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  username: e.target.value
                })
              }}
            />
          </div>
          <div className={[style.signup_container].join(' ')}>
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
          <div className={[style.signup_container].join(' ')}>
            <span>비밀번호 확인</span>
            <input
              className={[style.input].join(' ')}
              type="password"
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  checkPassword: e.target.value
                })
              }}
            />
          </div>
          <div className={[style.grid_end].join(' ')}>
            <input type="submit" value="회원가입" />
          </div>
          <div>
            <span
              onClick={() => {
                router.push('/login')
              }}
            >로그인</span>
          </div>
        </div>
      </form>
    </main>
  </div>

}
export default signup