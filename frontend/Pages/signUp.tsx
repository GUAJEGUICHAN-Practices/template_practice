import React from 'react'

import { Header } from '../Components/Header'
import style from '../styles/login.module.css'

const signUp = () => {
  return (
    <div className={[style.position].join(' ')}>
      <Header title='블 로 그' page_number='' />
      <main className={[style.justifySelfCenter].join(' ')}>
        <div className={[style.content_container].join(' ')}>
          <div className={[style.grid_center, style.up_5px].join(' ')}>
            <span className={style.span_background}>&lt; 회 원 가 입&gt;</span>
          </div>
          <div className={[style.grid_center, style.gap_5, style.login_total_container].join(' ')}>
            <div className={[style.signup_container].join(' ')}>
              <span>이메일</span>
              <input className={[style.input].join(' ')} type="text" />
            </div>
            <div className={[style.signup_container].join(' ')}>
              <span>비밀번호</span>
              <input className={[style.input].join(' ')} type="password" />
            </div>
            <div className={[style.signup_container].join(' ')}>
              <span>비밀번호 확인</span>
              <input className={[style.input].join(' ')} type="password" />
            </div>
            <div className={[style.grid_end].join(' ')}>
              <input type="button" value="회원가입" />
            </div>
            <div>
              <span>로그인</span>
            </div>
          </div>
        </div>
      </main>
      <footer>
        푸터
      </footer>
    </div>
  )
}

export default signUp