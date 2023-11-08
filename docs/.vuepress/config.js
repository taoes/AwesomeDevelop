import { defineUserConfig, defaultTheme } from 'vuepress'

export default defineUserConfig({
    lang: 'zh-CN',
    base: '/doc/',
    title: '燕归来兮的个人文档',
    description: '这是我的第一个 VuePress 站点',
    theme: defaultTheme({
        editLinkText: '编辑此页内容',
        docsRepo: 'https://github.com/taoes/awesome-develop',
        docsBranch: 'master',
        docsDir: 'docs',
        editLinkPattern: ':repo/edit/:branch/:path',
        // 默认主题配置
        navbar: [
            {
                text: '🏠 首页',
                link: '/',
            },
            {
                text: '📖 我的网站',
                link: 'https://www.zhoutao123.com',
            },
            {
                text: '🌏 Github',
                link: 'https://github.com/taoes',
            },
            {
                text: '📙 GitEE',
                link: 'https://gitee.com/taoes_admin',
            },
        ],
    }),
})