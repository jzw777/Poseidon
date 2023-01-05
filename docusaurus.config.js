// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '无界互通-技术分享手册',
  tagline: '无界技术团队，欢迎更多优秀的技术人才加入！',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
 // organizationName: 'facebook', // Usually your GitHub org/user name.
 // projectName: 'docusaurus', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    async function tailwindcss() {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
    "./plugins/intercom.js"
  ],
  themeConfig: {
    prism: {
      magicComments: [
        // Remember to extend the default highlight class name as well!
        {
          className: "theme-code-block-highlighted-line",
          line: "highlight-next-line",
          block: { start: "highlight-start", end: "highlight-end" },
        },
        {
          className: "code-block-hidden",
          line: "hide-next-line",
          block: { start: "hide-start", end: "hide-end" },
        },
      ],
    },
    image: "img/refine_social_new.png",
    algolia: {
      appId: "KRR9VEUPCT",
      apiKey: "cd0188125dcd31fb4b011b5e536d963a",
      indexName: "refine",
      contextualSearch: true,
    },
    metadata: [
      {
        name: "keywords",
        content: "java,k8s,docker",
      },
    ],
    navbar: {
      logo: {
        alt: "refine",
        src: "img/meetup.svg",
      },
      items: [
        { to: "blog", label: "Blog", position: "left" },

        {
          href: "https://github.com/refinedev/refine",
          position: "right",
          className: "header-icon-link header-github-link",
        },
        {
          href: "https://discord.gg/refine",
          position: "right",
          className: "header-icon-link header-discord-link",
        },
        {
          href: "https://twitter.com/refine_dev",
          position: "right",
          className: "header-icon-link header-twitter-link",
        },
      ],
    },
    footer: {
      logo: {
        alt: "refine",
        src: "/img/meetup.svg",
      },
      links: [
        {
          title: "Resources",
          items: [
            {
              label: "Getting Started",
              to: "docs/getting-started/overview",
            },
            {
              label: "Tutorials",
              to: "docs",
            },
            {
              label: "Blog",
              to: "blog",
            },
          ],
        },
        {
          title: "Product",
          items: [
            {
              label: "Examples",
              to: "examples",
            },
            {
              label: "Integrations",
              to: "integrations",
            },
            {
              label: "Become an Expert",
              to: "become-a-refine-expert",
            },
          ],
        },
        {
          title: "Company",
          items: [
            {
              label: "About",
              to: "about",
            },
            {
              label: "Store 🎁",
              to: "https://store.refine.dev",
            },
          ],
        },
        {
          title: "__SOCIAL",
          items: [
            {
              href: "https://github.com/refinedev/refine",
              label: "github",
            },
            {
              href: "https://twitter.com/refine_dev",
              label: "twitter",
            },
            {
              href: "/img/placeholder.png",
              label: "wechat",
            },
          ],
        },
      ],
    },
  },
  customFields: {
    /** Footer Fields */
    footerDescription:
      '从明天起，做一个幸福的人。<br> 喂马，劈柴，周游世界。<br>  从明天起，关心粮食和蔬菜。<br> 我有一所房子，面向大海，春暖花开。<br> 从明天起，和每一个亲人通信。<br>告诉他们我的幸福。<br>那幸福的闪电告诉我的。<br>我将告诉每一个人。 ',
        // '<strong style="font-weight:700;">refine</strong> is a React-based framework for the rapid development of web applications. It eliminates the repetitive tasks demanded by <strong style="font-weight:700;">CRUD</strong> operations and provides industry standard solutions.',
    contactTitle: "联系我",
    contactDescription: [
      "微信: jzw89757",
    ],
    contactEmail: "1211717080@qq.com",


  },

};

module.exports = config;
