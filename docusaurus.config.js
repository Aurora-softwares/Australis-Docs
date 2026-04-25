// @ts-check

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Australis OS',
  tagline: 'Documentation for the from-scratch x86_64 operating system.',
  favicon: 'img/australis-mark.svg',

  url: 'https://aurora-softwares.github.io',
  baseUrl: '/Australis-Docs/',

  organizationName: 'Aurora-Softwares',
  projectName: 'Australis-Docs',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/Aurora-Softwares/Australis-Docs/edit/main/',
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/australis-mark.svg',
      metadata: [
        {
          name: 'description',
          content: 'Documentation for Australis OS, a from-scratch x86_64 operating system.',
        },
      ],
      navbar: {
        title: 'Australis OS',
        logo: {
          alt: 'Australis OS mark',
          src: 'img/australis-mark.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docs',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/Aurora-Softwares/Australis-OS',
            label: 'OS Repo',
            position: 'right',
          },
          {
            href: 'https://github.com/Aurora-Softwares/Australis-Docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Requirements',
                to: '/building/requirements',
              },
              {
                label: 'Architecture',
                to: '/architecture/overview',
              },
              {
                label: 'Roadmap',
                to: '/roadmap',
              },
            ],
          },
          {
            title: 'Project',
            items: [
              {
                label: 'Australis OS',
                href: 'https://github.com/Aurora-Softwares/Australis-OS',
              },
              {
                label: 'Hylang Docs',
                href: 'https://aurora-softwares.github.io/Hylang-Docs/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Aurora Softwares.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;
