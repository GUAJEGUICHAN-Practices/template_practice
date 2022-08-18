import React from 'react'
import styles from '../styles/index.module.css'

export const Header = ({ title, page_number }) => {
  return (
    <header className={styles.header_position}>
      <div>
        <span></span>
      </div>
      <div className={[styles.font_ShinGrapic_3rem, styles.header_middle].join(' ')}>
        <span>{title}</span>
      </div>
      <div className={[styles.header_right, styles.font_JoongMyongJo_3rem].join(' ')}>
        <span>{page_number}</span>
      </div>
    </header>)
}
