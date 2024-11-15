// 自定义选项
const options = {
  gfm: true, // 启用 GitHub Flavored Markdown
  pedantic: false, // 符合更严格的 Markdown 规范
  sanitize: true, // 清理输出的 HTML（防止 XSS 攻击）
  highlight: function(code, lang) {
    // 在这里可以添加代码高亮逻辑
    const validLanguage = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(validLanguage, code).value;
  }
};

// 读取文章内容
function loadArticle(articleName) {
    fetch(`articles/${articleName}.md`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(content => {
            // 提取文章标题
            const titleMatch = content.match(/^# (.+)/);
            const title = titleMatch ? titleMatch[1] : "未命名文章";

            // 将 Markdown 转换为 HTML
            const htmlContent = marked.parse(content, options);

            // 渲染文章内容
            document.getElementById('content').innerHTML = `
                <article>
                    <h1>${title}</h1>
                    <div class="article-content">
                        ${htmlContent}
                    </div>
                </article>
            `;

            // 初始化代码高亮
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightBlock(block);
            });
        })
        .catch(error => {
            console.error(`无法加载文章 ${articleName}:`, error);
            document.getElementById('content').innerHTML = `<p>无法加载文章 ${articleName}。</p>`;
        });
}

// 显示文章列表
function showPosts() {
    document.getElementById('content').innerHTML = `
        <section class="posts">
            <div class="post">
                <h2><a href="#/article1" onclick="loadArticle('article1')">第一篇博客文章</a></h2>
                <p>这是我的第一篇博客文章。在这里，我会分享一些有趣的内容和想法。</p>
            </div>
            <div class="post">
                <h2><a href="#/article2" onclick="loadArticle('article2')">第二篇博客文章</a></h2>
                <p>这是我的第二篇博客文章。在这篇文章中，我将继续分享更多的内容和见解。</p>
            </div>
            <div class="post">
                <h2><a href="#/article3" onclick="loadArticle('article3')">第三篇博客文章</a></h2>
                <p>这是我的第三篇博客文章。每一篇文章都是我对某个主题的深入思考和总结。</p>
            </div>
            <button class="toggle-button" onclick="toggleExpand('posts')">更多文章</button>
            <div class="expandable">
                <div class="post">
                    <h2><a href="#/article4" onclick="loadArticle('article4')">第四篇博客文章</a></h2>
                    <p>这是我的第四篇博客文章。在这里，我会分享一些有趣的内容和想法。</p>
                </div>
                <div class="post">
                    <h2><a href="#/article5" onclick="loadArticle('article5')">第五篇博客文章</a></h2>
                    <p>这是我的第五篇博客文章。在这篇文章中，我将继续分享更多的内容和见解。</p>
                </div>
            </div>
        </section>
    `;
}

// 显示收藏夹
function showFavorites() {
    document.getElementById('content').innerHTML = `
        <section class="favorites">
            <h2>我的收藏夹</h2>
            <div class="post">
                <h2><a href="#/favorite1">最喜欢的博客文章 1</a></h2>
                <p>这是我非常喜欢的一篇文章，内容非常丰富，值得一读。</p>
            </div>
            <div class="post">
                <h2><a href="#/favorite2">最喜欢的博客文章 2</a></h2>
                <p>这篇文章探讨了一个非常有趣的话题，提供了很多有价值的见解。</p>
            </div>
            <div class="post">
                <h2><a href="#/favorite3">最喜欢的博客文章 3</a></h2>
                <p>这篇文章对我影响很大，改变了我对某些问题的看法。</p>
            </div>
            <button class="toggle-button" onclick="toggleExpand('favorites')">更多收藏</button>
            <div class="expandable">
                <div class="post">
                    <h2><a href="#/favorite4">最喜欢的博客文章 4</a></h2>
                    <p>这是我非常喜欢的一篇文章，内容非常丰富，值得一读。</p>
                </div>
                <div class="post">
                    <h2><a href="#/favorite5">最喜欢的博客文章 5</a></h2>
                    <p>这篇文章探讨了一个非常有趣的话题，提供了很多有价值的见解。</p>
                </div>
            </div>
        </section>
    `;
}

// 显示联系方式
function showContact() {
    document.getElementById('content').innerHTML = `
        <section class="contact">
            <h2>联系我</h2>
            <a href="mailto:your-email@example.com">发邮件</a>
            <a href="https://twitter.com/your-twitter-handle">Twitter</a>
            <a href="https://github.com/your-github-username">GitHub</a>
        </section>
    `;
}

// 显示喜欢的视频
function showVideos() {
    document.getElementById('content').innerHTML = `
        <section class="videos">
            <h2>我喜欢的视频</h2>
            <div class="video">
                <a href="https://m.bilibili.com/video/BV1Re2wYHEPh?vd_source=181af9ae4f258abb2732cf48ed091135" target="_blank">ネバーランド feat. 初音ミク</a>
            </div>
            <div class="video">
                <a href="https://www.bilibili.com/video/BV234567890" target="_blank">视频 2 的描述</a>
            </div>
            <div class="video">
                <a href="https://www.bilibili.com/video/BV345678901" target="_blank">视频 3 的描述</a>
            </div>
            <button class="toggle-button" onclick="toggleExpand('videos')">更多视频</button>
            <div class="expandable">
                <div class="video">
                    <a href="https://www.bilibili.com/video/BV456789012" target="_blank">视频 4 的描述</a>
                </div>
                <div class="video">
                    <a href="https://www.bilibili.com/video/BV567890123" target="_blank">视频 5 的描述</a>
                </div>
            </div>
        </section>
    `;
}

// 默认显示文章列表
window.onload = showPosts;

// 展开和折叠功能
function toggleExpand(sectionId) {
    const section = document.querySelector(`#${sectionId}`);
    const expandable = section.querySelector('.expandable');
    const button = section.querySelector('.toggle-button');

    if (expandable.style.display === 'block') {
        expandable.style.display = 'none';
        button.textContent = '更多' + sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
    } else {
        expandable.style.display = 'block';
        button.textContent = '收起' + sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
    }
}
