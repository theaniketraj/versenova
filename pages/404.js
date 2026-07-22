import Link from 'next/link';
import { getGlobalData } from '../utils/global-data';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import { motion } from 'framer-motion';

export default function Custom404({ globalData }) {
  return (
    <Layout>
      <Header name={globalData.name} />
      <main className="w-full flex flex-col items-center justify-center min-h-[60vh] text-center px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-8"
        >
          {/* Poetic route error art: A paper boat adrift on gentle, broken waves */}
          <div className="relative w-48 sm:w-64 h-32 sm:h-40 mb-6">
            <svg
              viewBox="0 0 200 140"
              className="w-full h-full text-primary/80 overflow-visible"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.g
                animate={{ y: [-3, 3, -3], rotate: [-1.5, 1.5, -1.5] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ transformOrigin: '100px 80px' }}
              >
                {/* Boat Hull Outer */}
                <motion.path
                  d="M 30 85 L 170 85 L 130 105 L 70 105 Z"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
                {/* Hull Inner Folds */}
                <motion.path
                  d="M 30 85 L 100 105 L 170 85"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1, ease: 'easeOut' }}
                />
                {/* Left Sail */}
                <motion.path
                  d="M 55 85 L 100 20 L 100 85 Z"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                />
                {/* Right Sail */}
                <motion.path
                  d="M 100 20 L 145 85 L 100 85 Z"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
                />
                {/* Center crease */}
                <motion.line
                  x1="100"
                  y1="20"
                  x2="100"
                  y2="85"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                />
                {/* Little flag blowing in wind */}
                <motion.path
                  d="M 100 20 Q 115 15 120 25 Q 110 30 100 28"
                  fill="currentColor"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.8, type: 'spring' }}
                  style={{ transformOrigin: '100px 20px' }}
                />
              </motion.g>

              {/* Water Wave 1 (Background, slower and subtler) */}
              <motion.path
                d="M -20 95 Q 0 88 20 95 T 60 95 T 100 95 T 140 95 T 180 95 T 220 95"
                strokeWidth="1.5"
                strokeDasharray="4 10"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.1, 0.4, 0.1], x: [-10, 0, -10] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Water Wave 2 (Middle, main broken wave) */}
              <motion.path
                d="M -10 115 Q 10 105 30 115 T 70 115 T 110 115 T 150 115 T 190 115 T 210 115"
                strokeWidth="2"
                strokeDasharray="6 8"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.8, 0.3], x: [-5, 5, -5] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Water Wave 3 (Foreground, faster) */}
              <motion.path
                d="M 0 130 Q 20 118 40 130 T 80 130 T 120 130 T 160 130 T 200 130"
                strokeWidth="2.5"
                strokeDasharray="8 12"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.1, 0.6, 0.1], x: [5, -5, 5] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              />
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="space-y-6 max-w-lg"
        >
          <div className="font-serif text-xl sm:text-2xl md:text-3xl leading-relaxed italic text-gray-800 dark:text-gray-200">
            <p>A missing verse,</p>
            <p>A page unturned,</p>
            <p>The path you seek cannot be found.</p>
          </div>

          <p className="font-sans text-sm sm:text-base opacity-70">
            It seems you have wandered off the edge of our pages.
          </p>

          <div className="pt-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold tracking-widest text-white uppercase transition-all duration-300 bg-primary rounded-full hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900 shadow-lg hover:shadow-primary/30"
            >
              Return Home
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer copyrightText={globalData.footerText} />

      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60 z-0 pointer-events-none"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10 z-0 pointer-events-none"
      />
    </Layout>
  );
}

export function getStaticProps() {
  const globalData = getGlobalData();
  return { props: { globalData } };
}
