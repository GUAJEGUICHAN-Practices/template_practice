import * as React from 'react';
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// import styled from '@emotion/styled';
import styles from '../styles/index.module.css'
import Link from 'next/link';
import { PostGate } from '../Components/PostGate';
import { useRouter } from 'next/router';
import { Header } from '../Components/Header';

const Index = ({ posts, }) => {
  // const state = useSelector<string, string>(state => state)
  // const titles = posts.map(post => post.frontMatter.title)
  // console.log(titles)
  // const router = useRouter()
  // React.useEffect(() => {
  //   posts.map(post => {
  //     router.prefetch(`/detail/${post.slug}`)
  //   })

  // }, [])

  return (
    <>
      {/* <div className={styles.empty} /> */}
      <div className={[styles.position].join(' ')}>
        <Header title='코테 영역' page_number={1} />
        <main className={styles.main_layout}>
          <div className={[styles.main_column, styles.middle_line].join(' ')}>
            {posts.map((post, index) =>
              <PostGate
                key={post.slug}
                number={index + 1}
                title={post.frontMatter.title}
                description={post.frontMatter.description}
                date={post.frontMatter.date}
                slug={post.slug}
              />
              // <div className={[styles.font_JoongMyongJo, styles._2rem].join(' ')}>
              //   <span>{index + 1}. </span>
              //   <Link
              //     href={`/detail/${post.slug}`}
              //   >
              //     {post.frontMatter.title}
              //   </Link>
              // </div>
            )}

          </div>
          <div className={styles.main_column}>column2</div>
        </main>
        <footer className={styles.footer_position}>
          <span>푸터</span>
        </footer>
      </div>
      {/* <div className={styles.empty} /> */}
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const dir = path.join('posts')
  const files = fs.readdirSync(dir)
  const files_sorted = files.map(function (v) {
    return {
      name: v,
      time: new Date(fs.statSync(dir + '/' + v).birthtime).getTime(),
    };
  })
    .sort(function (a, b) { return a.time - b.time; })
    .map(function (v) { return v.name; });

  console.log(files_sorted)
  const posts = files_sorted.map(filename => {
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
    const { data: frontMatter } = matter(markdownWithMeta)

    return {
      frontMatter,
      slug: filename.split('.')[0]
    }
  })

  return {
    props: {
      posts
    }
  }
}
