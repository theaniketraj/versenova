const plugin = require('tailwindcss/plugin');
const pluginTypography = require('@tailwindcss/typography');
const { COLOR_THEMES, FONT_THEMES } = require('../themes');

const THEME = process.env.BLOG_THEME || 'default';
const FONT_PRIMARY = process.env.BLOG_FONT_HEADINGS || 'sans-serif';
const FONT_SECONDARY = process.env.BLOG_FONT_BODY || 'sans-serif';

const hoveredSiblingPlugin = plugin(function ({ addVariant, e }) {
  addVariant('hovered-sibling', ({ container }) => {
    container.walkRules((rule) => {
      rule.selector = `:hover + .hovered-sibling\\:${rule.selector.slice(1)}`;
    });
  });
});

const themesConfig = plugin(function ({ addComponents }) {
  const cssVars = {};

  Object.keys(COLOR_THEMES[THEME].colors).forEach((key) => {
    cssVars[`--color-${key}`] = `${COLOR_THEMES[THEME].colors[key]}`;
  });

  cssVars['--font-primary'] = FONT_THEMES[FONT_PRIMARY];
  cssVars['--font-secondary'] = FONT_THEMES[FONT_SECONDARY];

  const themeCompiled = {
    '.theme-compiled': cssVars,
  };

  addComponents(themeCompiled);
});

module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: 'var(--color-primary)',
        'gradient-1': 'var(--color-gradient-1)',
        'gradient-2': 'var(--color-gradient-2)',
        'gradient-3': 'var(--color-gradient-3)',
        'gradient-4': 'var(--color-gradient-4)',
      },
      fonts: {
        primary: 'var(--font-primary)',
        secondary: 'var(--font-secondary)',
      },
      theme: {
        bejamas: {
          colors: {
            primary: '#FF8585',
            'gradient-1': '#7d7aff',
            'gradient-2': '#2121E2',
            'gradient-3': '#FF76B8',
            'gradient-4': '#001AFF',
          },
        },
      },
      typography(theme) {
        return {
          DEFAULT: {
            css: {
              maxWidth: 'none',
              lineHeight: '1.75',
              fontSize: '1rem',
              p: {
                marginTop: '1.25em',
                marginBottom: '1.25em',
                lineHeight: '1.75',
              },
              h1: {
                fontSize: '2.25em',
                lineHeight: '1.2',
                marginTop: '0',
                marginBottom: '0.8888889em',
              },
              h2: {
                fontSize: '1.875em',
                lineHeight: '1.2',
                marginTop: '2em',
                marginBottom: '1em',
              },
              h3: {
                fontSize: '1.5em',
                lineHeight: '1.33',
                marginTop: '1.6em',
                marginBottom: '0.6em',
              },
              '@media (max-width: 640px)': {
                fontSize: '0.95rem',
                lineHeight: '1.7',
                p: {
                  marginTop: '1.1em',
                  marginBottom: '1.1em',
                  lineHeight: '1.7',
                },
                h1: {
                  fontSize: '1.875em',
                  lineHeight: '1.15',
                },
                h2: {
                  fontSize: '1.5em',
                  lineHeight: '1.25',
                  marginTop: '1.75em',
                  marginBottom: '0.75em',
                },
                h3: {
                  fontSize: '1.25em',
                  lineHeight: '1.3',
                  marginTop: '1.5em',
                  marginBottom: '0.5em',
                },
              },
            },
          },
          sm: {
            css: {
              fontSize: '0.875rem',
              lineHeight: '1.7',
              p: {
                marginTop: '1.1429em',
                marginBottom: '1.1429em',
                lineHeight: '1.7',
              },
              h1: {
                fontSize: '1.875em',
                lineHeight: '1.15',
                marginTop: '0',
                marginBottom: '0.8em',
              },
              h2: {
                fontSize: '1.5em',
                lineHeight: '1.25',
                marginTop: '1.75em',
                marginBottom: '0.75em',
              },
              h3: {
                fontSize: '1.25em',
                lineHeight: '1.3',
                marginTop: '1.5em',
                marginBottom: '0.5em',
              },
            },
          },
          lg: {
            css: {
              fontSize: '1.125rem',
              lineHeight: '1.8',
              p: {
                marginTop: '1.3333em',
                marginBottom: '1.3333em',
                lineHeight: '1.8',
              },
              h1: {
                fontSize: '2.5em',
                lineHeight: '1.1',
                marginTop: '0',
                marginBottom: '0.8em',
              },
              h2: {
                fontSize: '2em',
                lineHeight: '1.15',
                marginTop: '2em',
                marginBottom: '1em',
              },
              h3: {
                fontSize: '1.625em',
                lineHeight: '1.3',
                marginTop: '1.6em',
                marginBottom: '0.6em',
              },
            },
          },
          dark: {
            css: {
              color: theme('colors.gray.300'),
              '[class~="lead"]': { color: theme('colors.gray.400') },
              a: {
                color: theme('colors.gray.100'),
                textDecoration: 'underline',
                textDecorationColor: theme('colors.gray.500'),
                '&:hover': {
                  color: theme('colors.white'),
                  textDecorationColor: theme('colors.gray.300'),
                },
              },
              strong: { color: theme('colors.gray.100') },
              'ul > li::before': { backgroundColor: theme('colors.gray.700') },
              hr: { borderColor: theme('colors.gray.800') },
              blockquote: {
                color: theme('colors.gray.100'),
                borderLeftColor: theme('colors.gray.800'),
                fontStyle: 'italic',
                padding: '1em 1.5em',
                margin: '1.5em 0',
                backgroundColor: theme('colors.gray.900'),
                borderRadius: '0.5rem',
              },
              h1: { color: theme('colors.gray.100') },
              h2: { color: theme('colors.gray.100') },
              h3: { color: theme('colors.gray.100') },
              h4: { color: theme('colors.gray.100') },
              code: {
                color: theme('colors.gray.100'),
                backgroundColor: theme('colors.gray.800'),
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                fontSize: '0.875em',
              },
              'a code': { color: theme('colors.gray.100') },
              pre: {
                color: theme('colors.gray.200'),
                backgroundColor: theme('colors.gray.800'),
                borderRadius: '0.5rem',
                padding: '1rem',
                overflow: 'auto',
              },
              thead: {
                color: theme('colors.gray.100'),
                borderBottomColor: theme('colors.gray.700'),
              },
              'tbody tr': { borderBottomColor: theme('colors.gray.800') },
            },
          },
        };
      },
    },
  },
  variants: {
    extend: {
      borderRadius: ['first', 'last'],
      borderWidth: ['last', 'hovered-sibling'],
      typography: ['dark'],
    },
  },
  plugins: [hoveredSiblingPlugin, pluginTypography, themesConfig],
};
