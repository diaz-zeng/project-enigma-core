/*
 * @Date: 2021-11-09 16:49:17
 * @LastEditors: 曾令宇
 * @LastEditTime: 2022-01-18 16:28:06
 * @FilePath: /project-enigma-core/docs/.vuepress/config.js
 */
module.exports = {
    base: "/project-enigma-core/",
    title: 'Project Enigma Core', locales: {
        '/': {
            lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
        }
    },
    themeConfig: {
        sidebar: ['/', '/settings', '/enigma'],
        sidebarDepth: 3,
        nav:
            [{ text: "GitHub", link: 'https://github.com/diaz-zeng/project-enigma-core', target: '_blank' }]
    },
    markdown: {
        toc: {
            includeLevel: [1, 2, 3, 4]
        },
        lineNumber: true // 代码块行号
    },
}
