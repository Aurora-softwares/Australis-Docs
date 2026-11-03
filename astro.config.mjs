import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://aurora-softwares.github.io',
  base: '/Australis-Docs',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'Australis OS',
      description: 'Meet Australis OS, explore the project and learn how to build it.',
      favicon: '/Australis-Docs/favicon.svg',
      social: [
        { icon: 'github', label: 'Australis OS on GitHub', href: 'https://github.com/Aurora-softwares/Australis-OS' },
      ],
      customCss: ['./src/styles/docs.css'],
      sidebar: [
        { label: 'Welcome', link: '/' },
        { label: 'Documentation hub', slug: 'docs' },
        { label: 'Start here', items: [
          { slug: 'docs/getting-started/first-steps' },
          { slug: 'docs/getting-started/explore' },
          { slug: 'docs/getting-started/faq' },
        ] },
        { label: 'Building and running', items: [{ autogenerate: { directory: 'docs/building' } }] },
        { label: 'Inside Australis', items: [
          { autogenerate: { directory: 'docs/architecture' } },
          { autogenerate: { directory: 'docs/desktop' } },
          { autogenerate: { directory: 'docs/internals' } },
        ] },
        { label: 'Applications', collapsed: true, items: [{ autogenerate: { directory: 'docs/applications' } }] },
        { label: 'Components', collapsed: true, items: [{ autogenerate: { directory: 'docs/components' } }] },
        { label: 'Development and roadmap', collapsed: true, items: [
          { slug: 'docs/roadmap' },
          { autogenerate: { directory: 'docs/development' } },
        ] },
        { label: 'Technical reference', collapsed: true, items: [{ autogenerate: { directory: 'docs/reference' } }] },
      ],
    }),
  ],
});
