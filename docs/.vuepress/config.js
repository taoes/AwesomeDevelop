import { defineUserConfig, defaultTheme } from 'vuepress'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
    lang: 'zh-CN',
    base: '/doc/',
    title: '燕归来兮的知识库',
    description: '个人学习笔记，主要是自己近些年的学习内容记录以及面试的知识点，同时会记录一些最新的观点和问题，文章同步发布在 个人博客 以及 语雀文档 如果您对我的文章感兴趣，欢迎关注，如果文章对您有帮助的话，欢迎 Star支持⭐️ 或者提交 PR 🔀 ，您的支持是我不断更新的动力~',
    theme: defaultTheme({
        editLinkText: '帮助作者优化编辑此页内容',
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
                text: '⚗ 我的博客',
                link: 'https://www.zhoutao123.com/blog.html',
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
        plugins: [
            registerComponentsPlugin({
                componentsDir: path.resolve(__dirname, './components')
            })
        ]
    }),
})