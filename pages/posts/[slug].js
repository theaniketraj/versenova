import { getGlobalData } from '../../utils/global-data';
import {
  getNextPostBySlug,
  getPostBySlug,
  getPreviousPostBySlug,
  getPostFilePaths,
} from '../../utils/mdx-utils';

import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import Link from 'next/link';
import ArrowIcon from '../../components/ArrowIcon';
import CustomImage from '../../components/CustomImage';
import CustomLink from '../../components/CustomLink';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import { motion, useScroll } from 'framer-motion';

const AnimatedP = ({ children }) => (
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    {children}
  </motion.p>
);

const AnimatedBlockquote = ({ children }) => (
  <motion.blockquote
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    {children}
  </motion.blockquote>
);

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  a: CustomLink,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  Head,
  img: CustomImage,
  p: AnimatedP,
  blockquote: AnimatedBlockquote,
};

export default function PostPage({
  source,
  frontMatter,
  prevPost,
  nextPost,
  globalData,
  slug,
  readingTime,
}) {
  const isPoem = frontMatter.format !== 'thought'; // Default to poem if undefined
  const { scrollYProgress } = useScroll();

  return (
    <Layout>
      <Head>
        <title>{frontMatter.title} - {globalData.name}</title>
        <meta name="description" content={frontMatter.description || `Read ${frontMatter.title} on VerseNova`} />
        <meta property="og:title" content={frontMatter.title} />
        <meta property="og:description" content={frontMatter.description || `Read ${frontMatter.title} on VerseNova`} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="fixed top-4 left-4 md:top-8 md:left-8 z-50 hidden md:block"
      >
        <div className="relative rounded-full">
          {/* Scroll Progress Border */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ overflow: 'visible' }}>
            <motion.rect
              x="0" y="0" width="100%" height="100%" rx="24" ry="24"
              fill="none"
              className="stroke-primary"
              strokeWidth="3"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <Link
            href="/"
            className="group relative z-20 flex items-center gap-2 px-4 py-2 text-sm font-medium tracking-wide transition-all bg-white/5 border border-gray-800/10 dark:border-white/10 rounded-full backdrop-blur-md hover:bg-white/20 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md text-slate-700 dark:text-slate-200"
          >
            <ArrowIcon className="transform rotate-180 w-4 h-4 transition-transform group-hover:-translate-x-1" color="text-slate-700 dark:text-slate-200" />
            <span>Home</span>
          </Link>
        </div>
      </motion.div>

      <Header name={globalData.name} />
      <article
        className="px-4 sm:px-6 md:px-0 max-w-4xl mx-auto"
        data-sb-object-id={`posts/${slug}.mdx`}
      >
        <header className="mt-12 mb-16 text-center">
          <div className="flex justify-center items-center gap-3 mb-6 text-xs font-semibold tracking-widest uppercase opacity-50 font-sans">
            {frontMatter.date && (
              <time dateTime={frontMatter.date}>
                {new Date(frontMatter.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </time>
            )}
            {frontMatter.date && readingTime && <span>&bull;</span>}
            {readingTime && <span>{readingTime} min read</span>}
          </div>
          <h1
            className={`text-3xl sm:text-4xl md:text-6xl dark:text-white leading-tight mb-8 ${isPoem ? 'font-serif text-center font-normal tracking-wide' : 'font-sans font-bold text-left tracking-tight'}`}
            data-sb-field-path="title"
          >
            {frontMatter.title}
          </h1>
          {frontMatter.description && (
            <p
              className={`text-lg sm:text-2xl leading-relaxed opacity-80 ${isPoem ? 'font-serif italic text-center' : 'font-sans text-left'}`}
              data-sb-field-path="description"
            >
              {frontMatter.description}
            </p>
          )}
        </header>
        <main>
          <article
            className={`prose sm:prose-lg lg:prose-xl dark:prose-dark max-w-3xl mx-auto transition-all ${
              isPoem
                ? 'prose-p:text-center prose-p:font-serif prose-p:leading-loose prose-headings:text-center prose-headings:font-serif prose-blockquote:text-center prose-blockquote:border-none prose-blockquote:italic prose-blockquote:text-2xl prose-blockquote:opacity-70 prose-a:font-serif'
                : 'prose-p:text-left prose-p:font-sans prose-p:leading-relaxed prose-headings:text-left prose-headings:font-sans prose-blockquote:border-l-4 prose-blockquote:pl-6 prose-a:font-sans'
            }`}
            data-sb-field-path="markdown_content"
          >
            <MDXRemote {...source} components={components} />
          </article>
        </main>
        <div className="grid mt-16 sm:mt-24 gap-6 md:grid-cols-2 lg:-mx-24 mb-16">
          {prevPost && (
            <Link
              href={`/posts/${prevPost.slug}`}
              className="group flex flex-col h-full px-6 py-8 transition-all bg-white/5 border border-gray-800/10 rounded-xl backdrop-blur-md dark:bg-slate-900/40 hover:bg-white/20 dark:hover:bg-slate-800/60 dark:border-white/10 shadow-sm hover:shadow-xl dark:shadow-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-left md:text-right"
            >
              <p className="mb-4 text-xs font-semibold tracking-wider uppercase opacity-50 font-sans">
                Previous
              </p>
              <h4 className="text-xl sm:text-2xl font-serif leading-snug mb-6 group-hover:text-primary transition-colors duration-300">
                {prevPost.title}
              </h4>
              <div className="mt-auto pt-4 border-t border-gray-800/5 dark:border-white/5 flex items-center md:justify-end text-sm font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                <ArrowIcon className="mr-2 transform rotate-180 group-hover:-translate-x-1 transition-transform" />
                <span className="font-sans">Read Previous</span>
              </div>
            </Link>
          )}
          {nextPost && (
            <Link
              href={`/posts/${nextPost.slug}`}
              className="group flex flex-col h-full px-6 py-8 transition-all bg-white/5 border border-gray-800/10 rounded-xl backdrop-blur-md dark:bg-slate-900/40 hover:bg-white/20 dark:hover:bg-slate-800/60 dark:border-white/10 shadow-sm hover:shadow-xl dark:shadow-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-left"
            >
              <p className="mb-4 text-xs font-semibold tracking-wider uppercase opacity-50 font-sans">
                Next
              </p>
              <h4 className="text-xl sm:text-2xl font-serif leading-snug mb-6 group-hover:text-primary transition-colors duration-300">
                {nextPost.title}
              </h4>
              <div className="mt-auto pt-4 border-t border-gray-800/5 dark:border-white/5 flex items-center text-sm font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                <span className="font-sans">Read Next</span>
                <ArrowIcon className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          )}
        </div>
      </article>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="absolute -top-32 opacity-30 dark:opacity-50"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const globalData = getGlobalData();
  const { mdxSource, data, readingTime } = await getPostBySlug(params.slug);
  const prevPost = getPreviousPostBySlug(params.slug);
  const nextPost = getNextPostBySlug(params.slug);

  return {
    props: {
      globalData,
      source: mdxSource,
      frontMatter: data,
      slug: params.slug,
      prevPost,
      nextPost,
      readingTime,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = getPostFilePaths()
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
