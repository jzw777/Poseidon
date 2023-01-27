// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const path = require("path");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '姜米尔的技术分享小站',
  url: 'https://jzw777.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/my.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
 // organizationName: 'facebook', // Usually your GitHub org/user name.
 // projectName: 'docusaurus', // Usually your repo name.
  organizationName: 'jzw777',
  projectName: 'jzw777.github.io',
  deploymentBranch: 'main',
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  trailingSlash: false,

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/docs',

          sidebarPath: require.resolve("./sidebars.js"),
          // editUrl:
          //     "https://github.com/jzw777/Poseidon",
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          admonitions: {
            tag: ":::",
            keywords: [
              "additional",
              "note",
              "tip",
              "info-tip",
              "info",
              "caution",
              "danger",
              "sourcecode",
              "create-example",
            ],
          },
        },
        blog: false,
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
    [
      "./plugins/blog-plugin.js",
      {
        blogTitle: "Blog",
        blogDescription: "A Docusaurus powered blog!",
        routeBasePath: "/blog",
        postsPerPage: 12,
        blogSidebarTitle: "All posts",
        blogSidebarCount: 0,
        feedOptions: {
          type: "all",
          copyright: `Copyright © ${new Date().getFullYear()} Mill.`,
        },
      },
    ],
    // [
    //   "@docusaurus/plugin-content-docs",
    //   {
    //     id: "programming-language",
    //     path: "wiki/programming-language",
    //     routeBasePath: "programming-language",
    //     sidebarPath: require.resolve("./sidebars.js"),
    //     editUrl: "https://git.7wate.com/zhouzhongping/wiki/src/branch/master",
    //     showLastUpdateAuthor: true,
    //     showLastUpdateTime: true,
    //     breadcrumbs: false,
    //   },
    // ],
  ],
  themeConfig: {
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
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
      items: [
        {to:"website",label: "导航", position: "left"},
        { to: "blog", label: "博客", position: "left" },

        {
          href: "https://github.com/jzw777/Poseidon",
          position: "right",
          className: "header-icon-link header-github-link",
        },
        // {
        //   href:"/img/qrcode.png",
        //   position: "right",
        //   className: "header-icon-link header-wechat-link"
        // },
        {
          href: "https://discord.gg/fVabfAQGdr",
          position: "right",
          className: "header-icon-link header-discord-link",
        }

      ],
    },
    footer: {
      logo: {
        alt: "refine",
        src: "/img/meetup.svg",
      },
      links: [
        {
          title: "开发文档",
          items: [
            {
              label: "Getting Started",
              to: "docs",
            },
            {
              label: "Blog",
              to: "blog",
            },
          ],
        },
        {
          title: "互动专区",
          items: [
            {
              label: "在线问答",
              to: "/"
              // to: "onlineqa",
            },
          ],
        },
        {
          title: "友情链接",
          items: [
            {
              label: "李苟蛋の家",
              to: "https://lizejiao.github.io/",
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
