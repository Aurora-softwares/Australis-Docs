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
        'development/checklist-audit',
        'development/hyfs2-plan',
        'development/phase7-graphics-foundation',
        'development/phase8-software-rendering',
        'development/phase9-display-infrastructure',
        'development/phase10-native-virtio-gpu',
        'development/phase11-gpu-infrastructure',
      ],
    },
    {
      type: 'category',
      label: 'Architecture and components',
      items: [
        'architecture/system-layout',
        'components/bootloader-gates',
        'components/kernel-gates',
        'components/kernel-reliability',
        'components/memory-protection',
        'components/process-scheduling',
        'components/system-calls-ipc',
        'components/storage-driver-stability',
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
      label: 'Desktop design',
      items: ['desktop/interaction-design'],
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
      items: [
        'reference/os-repository',
        'reference/aun1-v2',
        'reference/hyfs-v1',
        'reference/hyfs-v2',
        'internals/kernel-panic-qr',
      ],
    },
  ],
};

module.exports = sidebars;
