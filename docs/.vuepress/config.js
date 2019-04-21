module.exports = {
  dest: "vuepress",
  locales: {
    "/": {
      lang: "zh-CN",
      title: "VuePress",
      description: "Vue 驱动的静态站点生成工具"
    }
  },
  head: [
    ["link", { rel: "icon", href: `/logo.png` }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" }
    ],
    [
      "link",
      { rel: "apple-touch-icon", href: `/icons/apple-touch-icon-152x152.png` }
    ],
    [
      "link",
      {
        rel: "mask-icon",
        href: "/icons/safari-pinned-tab.svg",
        color: "#3eaf7c"
      }
    ],
    [
      "meta",
      {
        name: "msapplication-TileImage",
        content: "/icons/msapplication-icon-144x144.png"
      }
    ],
    ["meta", { name: "msapplication-TileColor", content: "#000000" }]
  ],
  serviceWorker: true,
  theme: "vue",
  themeConfig: {
    repo: "docschina/vuepress",
    editLinks: true,
    docsDir: "docs",
    locales: {
      "/": {
        nav: [
          {
            text: "指南",
            link: "/guide/"
          },
          // {
          //   text: '个人笔记',
          //   items: [
          //     { text: 'c++', link: '/cpp/' },

          //   ]
          // },
          {
            text: "前端",
            link: "/web/"
          },
          {
            text: "配置参考",
            link: "/config/"
          },

          {
            text: "默认主题配置",
            link: "/default-theme-config/"
          }
        ],
        sidebar: {
          "/guide/": genSidebarConfig("指南"),
          "/web/": webSidebarConfig("前端")
        }
      }
    }
  }
};
function webSidebarConfig(title) {
  return [
    {
      title,
      collapsable: false,
      children: ["", "mobile", "mode", "console", "css"]
    }
  ];
}
function genSidebarConfig(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        "",
        "getting-started",
        "basic-config",
        "assets",
        "markdown",
        "using-vue",
        "custom-themes",
        "i18n",
        "deploy"
      ]
    }
  ];
}
