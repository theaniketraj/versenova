import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function Index({ posts, globalData }) {
  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      <main className="w-full">
        <h1 className="mb-8 text-2xl text-center sm:text-3xl lg:text-5xl sm:mb-12 px-4">
          {globalData.blogTitle}
        </h1>
        <ul className="w-full">
          {posts.map((post) => (
            <li
              key={post.filePath}
              className="transition bg-white border border-b-0 border-gray-800 md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 dark:border-white border-opacity-10 dark:border-opacity-10 last:border-b hover:border-b hovered-sibling:border-t-0" data-sb-object-id={`posts/${post.filePath}`}
            >
              <Link
                as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                href={`/posts/[slug]`}
                className="block px-4 py-4 sm:px-6 sm:py-6 lg:py-10 lg:px-16 focus:outline-none focus:ring-4 active:bg-opacity-30 transition-all">

                {post.data.date && (
                  <p className="mb-2 sm:mb-3 text-sm sm:text-base font-bold uppercase opacity-60" data-sb-field-path="date">
                    {post.data.date}
                  </p>
                )}
                <h2 className="text-xl sm:text-2xl md:text-3xl leading-tight" data-sb-field-path="title">{post.data.title}</h2>
                {post.data.description && (
                  <p className="mt-2 sm:mt-3 text-base sm:text-lg opacity-60 line-clamp-3" data-sb-field-path="description">
                    {post.data.description}
                  </p>
                )}
                <ArrowIcon className="mt-3 sm:mt-4" />

              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export function getStaticProps() {
  const posts = getPosts();
  const globalData = getGlobalData();

  return { props: { posts, globalData } };
}
