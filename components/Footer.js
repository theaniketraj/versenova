import { useState, useEffect } from 'react';
import { COLOR_THEMES } from '../themes';

const THEME_KEYS = Object.keys(COLOR_THEMES);

const sunIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="24"
    fill="none"
    viewBox="0 0 25 24"
    className="dark:opacity-50"
  >
    <g
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      clipPath="url(#clip0_192_823)"
    >
      <path d="M12.5 17a5 5 0 100-10 5 5 0 000 10zM12.5 1v2M12.5 21v2M4.72 4.22l1.42 1.42M18.86 18.36l1.42 1.42M1.5 12h2M21.5 12h2M4.72 19.78l1.42-1.42M18.86 5.64l1.42-1.42"></path>
    </g>
    <defs>
      <clipPath id="clip0_192_823">
        <path
          className="text-white fill-current"
          d="M0 0H24V24H0z"
          transform="translate(.5)"
        ></path>
      </clipPath>
    </defs>
  </svg>
);

const moonIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="20"
    fill="none"
    viewBox="0 0 21 20"
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="text-gray-400 stroke-current dark:text-white"
      d="M19.5 10.79A9 9 0 119.71 1a7 7 0 009.79 9.79v0z"
    ></path>
  </svg>
);

const paletteIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors"
  >
    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c0 .942-.42 1.848-1.127 2.455C20.125 15.1 19 15.39 19 15.39c-1.173 0-2.072-.888-2.072-2.05v-.734a3.868 3.868 0 00-3.868-3.868H11.5a1.5 1.5 0 100 3h1.562a.868.868 0 01.868.868v.734c0 2.227 1.85 4.05 4.072 4.05 0 0 1.536.315 2.656 1.104A4.981 4.981 0 0112 22z"></path>
    <circle cx="7.5" cy="10.5" r="1.5"></circle>
    <circle cx="10.5" cy="7.5" r="1.5"></circle>
    <circle cx="14.5" cy="8.5" r="1.5"></circle>
  </svg>
);

const ThemeSwitcher = () => {
  const [colorTheme, setColorTheme] = useState('default');

  useEffect(() => {
    const current = localStorage.getItem('color-theme') || 'default';
    setColorTheme(current);
  }, []);

  const handleThemeCycle = () => {
    const currentIndex = THEME_KEYS.indexOf(colorTheme);
    const nextIndex = (currentIndex + 1) % THEME_KEYS.length;
    const nextTheme = THEME_KEYS[nextIndex];

    const classes = Array.from(document.documentElement.classList);
    classes.forEach((cls) => {
      if (cls.startsWith('theme-')) {
        document.documentElement.classList.remove(cls);
      }
    });
    document.documentElement.classList.add(`theme-${nextTheme}`);
    localStorage.setItem('color-theme', nextTheme);
    setColorTheme(nextTheme);
  };

  return (
    <div className="flex items-center gap-2 mt-4 sm:mt-6">
      <div className="flex justify-center p-1 bg-white dark:bg-gray-900 rounded-3xl shadow-sm">
        <button
          type="button"
          aria-label="Use Dark Mode"
          onClick={() => {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
          }}
          className="flex items-center justify-center w-16 h-10 sm:w-20 sm:h-10 p-2 pr-2 transition dark:bg-primary rounded-3xl align-center touch-manipulation"
        >
          {moonIcon}
        </button>

        <button
          type="button"
          aria-label="Use Light Mode"
          onClick={() => {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
          }}
          className="flex items-center justify-center w-16 h-10 sm:w-20 sm:h-10 p-2 pr-2 transition bg-primary dark:bg-transparent rounded-3xl align-center touch-manipulation"
        >
          {sunIcon}
        </button>
      </div>

      <div className="flex justify-center p-1 bg-white dark:bg-gray-900 rounded-3xl shadow-sm">
        <button
          type="button"
          aria-label="Cycle Color Theme"
          onClick={handleThemeCycle}
          className="group flex flex-col items-center justify-center w-16 h-10 sm:w-20 sm:h-10 transition bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 rounded-3xl touch-manipulation"
        >
          {paletteIcon}
          <span className="text-[9px] mt-0.5 opacity-60 uppercase tracking-widest font-sans font-bold">
            {colorTheme}
          </span>
        </button>
      </div>
    </div>
  );
};

export default function Footer({ copyrightText }) {
  return (
    <footer className="flex flex-col items-center py-12 sm:py-16 px-4">
      <p className="mb-3 text-sm sm:text-base font-bold uppercase dark:text-white opacity-60 text-center">
        {copyrightText}
      </p>
      <p className="mb-3 text-xs sm:text-sm dark:text-white opacity-60 text-center">
        ©{' '}
        <a
          href="https://theaniketraj.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          Aniket Raj
        </a>
      </p>
      <ThemeSwitcher />
    </footer>
  );
}
