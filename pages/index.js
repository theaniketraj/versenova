import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

export default function Index({ posts, globalData }) {
  return (
    <Layout>
      <Header name={globalData.name} />
      <main className="w-full">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-3xl font-serif text-center sm:text-4xl lg:text-6xl sm:mb-16 px-4 tracking-tight"
        >
          {globalData.blogTitle}
        </motion.h1>

        <motion.ul
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full"
        >
          {posts.map((post) => (
            <motion.li
              variants={itemVariants}
              whileHover={{ y: -5 }}
              key={post.filePath}
              className="group flex flex-col transition-all bg-white/5 border border-gray-800/10 rounded-xl backdrop-blur-md dark:bg-slate-900/40 hover:bg-white/20 dark:hover:bg-slate-800/60 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl dark:shadow-none"
              data-sb-object-id={`posts/${post.filePath}`}
            >
              <Link
                as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                href={`/posts/[slug]`}
                className="flex flex-col h-full px-6 py-8 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                {post.data.date && (
                  <p
                    className="mb-4 text-xs font-semibold tracking-wider uppercase opacity-50 font-sans"
                    data-sb-field-path="date"
                  >
                    {new Date(post.data.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                )}

                <h2
                  className="text-xl sm:text-2xl font-serif leading-snug mb-4 group-hover:text-primary transition-colors duration-300"
                  data-sb-field-path="title"
                >
                  {post.data.title}
                </h2>

                {post.data.description && (
                  <p
                    className="text-sm sm:text-base opacity-70 line-clamp-3 mb-6 font-sans leading-relaxed grow"
                    data-sb-field-path="description"
                  >
                    {post.data.description}
                  </p>
                )}

                <div className="mt-auto pt-4 border-t border-gray-800/5 dark:border-white/5 flex items-center text-sm font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                  <span className="font-sans">
                    Read {post.data.format === 'poem' ? 'poem' : 'thought'}
                  </span>
                  <ArrowIcon className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
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
