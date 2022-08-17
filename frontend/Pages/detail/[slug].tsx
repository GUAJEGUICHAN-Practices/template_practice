import { useRouter } from 'next/router'
import React from 'react'

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import SyntaxHighlighter from 'react-syntax-highlighter'

import style from '../../styles/slug.module.css'
import { Header } from '../../Components/Header'
const components = { SyntaxHighlighter }

const DetailPage = ({ frontMatter: { title, date }, mdxSource }) => {
  return (
    <div className={style.position}>
      <Header title='블 로 그' page_number={1} />
      <div className={[style.font_JoongMyongJo].join(' ')}>
        <h1 className={style.grid_center}>{title}</h1>
        <div className={[style.date_container].join(' ')}>{date}</div>

        <div className={[style.content_container].join(' ')}>
          <div className={[style.grid_center, style.up_5px].join(' ')}><span className={style.span_background}>&lt; 보 기 &gt;</span></div>
          <MDXRemote {...mdxSource} components={components} />
        </div>
      </div>
    </div>
  )
}

export default DetailPage

export const getStaticPaths = async () => {
  // const files = fs.readdirSync(path.join('../../posts'))
  const files = fs.readdirSync(path.join('posts'))
  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.mdx', '')
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMeta = fs.readFileSync(path.join('posts',
    slug + '.mdx'), 'utf-8')
  const { data: frontMatter, content } = matter(markdownWithMeta)
  const mdxSource = await serialize(content)
  return {
    props: {
      frontMatter,
      slug,
      mdxSource
    }
  }
}