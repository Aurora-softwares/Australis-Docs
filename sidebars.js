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
    {
      type: 'category',
      label: 'Development status',
      items: [
        'development/versioning',
        'development/os-roadmap',
        'development/active-plan',
        'development/gui-roadmap',
      ],
    },
    {
      type: 'category',
      label: 'Architecture and components',
      items: [
        'architecture/system-layout',
        'components/bootloader-gates',
        'components/kernel-gates',
        'components/loadable-drivers',
        'components/userland-plan',
        'components/system-startup',
        'components/shell',
        'components/rescue',
        'components/drivers',
        'components/filesystems',
      ],
    },
    {
      type: 'category',
      label: 'Applications',
      items: [
        'applications/platform',
        'applications/australis-baseconvertor',
        'applications/australis-calculator',
        'applications/australis-changedirectory',
        'applications/australis-clear',
        'applications/australis-helloworld',
        'applications/australis-hexviewer',
        'applications/australis-meminfo',
        'applications/australis-sysinfo',
        'applications/australis-version',
        'applications/australis.dev-user-demo',
        'applications/australis.dev-user-fault',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: ['reference/os-repository'],
    },
  ],
};

module.exports = sidebars;
