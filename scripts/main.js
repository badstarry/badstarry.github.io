document.addEventListener('DOMContentLoaded', () => {
    // 定义一个函数来加载导航栏模板
    const loadNavbar = async () => {
        try {
            const response = await fetch('/templates/nav-template.html');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.text();
            document.getElementById('nav-placeholder').innerHTML = data;
        } catch (error) {
            console.error('Error loading navigation:', error);
            // 可以考虑在这里添加一些用户友好的错误处理，比如显示一个错误消息
        }
    };

    // 定义一个函数来加载文章内容
    const loadArticle = async (articleId) => {
        try {
            const response = await fetch(`/articles/${articleId}.md`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.text();

            // 解析Markdown内容
            const lines = data.split('\n');
            const title = lines[0].replace(/^#\s*/, '').trim(); // 使用正则表达式更精确地匹配标题
            const content = marked.parse(data);

            // 更新页面内容
            document.title = `${title} - 我的博客`;
            document.querySelector('h1').innerText = title;
            document.querySelector('.article-content').innerHTML = content;
        } catch (error) {
            console.error('Error loading article:', error);
            // 可以考虑在这里添加一些用户友好的错误处理，比如显示一个错误页面或消息
        }
    };

    // 从URL查询参数中获取文章ID
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    // 根据文章ID加载文章内容，如果没有提供ID则不执行任何操作
    if (articleId) {
        loadArticle(articleId);
    } else {
        console.warn('Article ID not provided, loading default content or showing a message.');
        // 在这里可以添加代码来处理没有提供文章ID的情况，比如显示一个默认页面或消息
    }

    // 加载导航栏模板
    loadNavbar();
});
