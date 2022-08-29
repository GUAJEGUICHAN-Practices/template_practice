import * as React from 'react';
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import styles from '../styles/index.module.css'

import { PostGate } from '../Components/PostGate';
import { useRouter } from 'next/router';
import { Header } from '../Components/Header';

const Index = ({ posts, posts_column_1, posts_column_2, page, num_page }) => {
  const router = useRouter()
  return (
    <>
      <div className={[styles.position].join(' ')}>
        <Header title='블 로 그' page_number={page} />
        <main className={styles.main_layout}>
          <div className={[styles.main_column, styles.middle_line].join(' ')}>
            {posts_column_1.map((post, index) =>
              <PostGate
                key={post.slug}
                number={index + 1 + (page - 1) * 16}
                title={post.frontMatter.title}
                description={post.frontMatter.description}
                date={post.frontMatter.date}
                slug={post.slug}
              />
            )}

          </div>
          <div className={styles.main_column}>
            {posts_column_2.map((post, index) =>
              <PostGate
                key={post.slug}
                number={index + 9 + (page - 1) * 16}
                title={post.frontMatter.title}
                description={post.frontMatter.description}
                date={post.frontMatter.date}
                slug={post.slug}
              />
            )}
          </div>
        </main>
        <footer className={styles.footer_position}>
          <span>푸터</span>
          {
            [...new Array(num_page)].map((page, index) =>
              <span
                onClick={() => {
                  if (index + 1 !== page) {
                    router.push(`/${index + 1}`)
                  }
                }}
                className={(index + 1 !== page) && 'Bigger'}
              >
                {index + 1}
              </span>
            )
          }
        </footer>
      </div>
    </>
  );
};

export default Index;

export const getServerSideProps = async ({ params: { page } }) => {
  const current_page = Number(page)
  console.log('current_page', current_page)
  const dir = path.join('posts')
  const files = fs.readdirSync(dir)
  const files_sorted = files.map(function (v) {
    return {
      name: v,
      time: new Date(fs.statSync(dir + '/' + v).birthtime).getTime(),
    };
  })
    .sort(function (a, b) { return a.time - b.time; })
    .map(function (v) { return v.name; })
    .slice(16 * (current_page - 1), 16 * current_page);

  console.log(files_sorted)
  const posts = files_sorted.map(filename => {
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
    const { data: frontMatter } = matter(markdownWithMeta)

    return {
      frontMatter,
      slug: filename.split('.')[0]
    }
  })

  const posts_column_1 = posts.slice(0, 8)
  const posts_column_2 = posts.slice(8,)

  return {
    props: {
      posts,
      posts_column_1,
      posts_column_2,
      page: current_page,
      num_page: Math.ceil(files.length / 16)
    }
  }
}
