// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'README',
    {
      type: 'category',
      label: 'Building',
      collapsed: false,
      items: ['building/requirements', 'building/building'],
    },
    {
      type: 'category',
      label: 'Architecture',
      collapsed: false,
      items: ['architecture/overview', 'architecture/bootloader', 'architecture/kernel'],
    },
    {
      type: 'category',
      label: 'Internals',
      collapsed: false,
      items: ['internals/shell', 'internals/debugging'],
    },
    'roadmap',
  ],
};

module.exports = sidebars;
