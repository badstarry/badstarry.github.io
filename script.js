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
function loadArticle(articleName, folder = 'articles') {
    fetch(`${folder}/${articleName}.md`)
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

// 动态获取文章列表
function fetchArticles(folder) {
    return fetch(`/${folder}/`)
        .then(response => response.json())
        .then(data => data.articles.map(article => ({
            id: article,
            title: article.replace(/\.md$/, ''),
            excerpt: '这是文章的简短摘要'
        })))
        .catch(error => {
            console.error('无法获取文章列表:', error);
            return [];
        });
}

// 显示文章列表
function showPosts() {
    fetchArticles('articles').then(articles => {
        const content = document.getElementById('content');
        content.innerHTML = `
            <section class="posts">
                ${articles.map(article => `
                    <div class="post">
                        <h2><a href="#/${article.id}" onclick="loadArticle('${article.id}', 'articles')">${article.title}</a></h2>
                        <p>${article.excerpt}</p>
                    </div>
                `).join('')}
                <button class="toggle-button" onclick="toggleExpand('posts')">更多文章</button>
                <div class="expandable">
                    ${articles.slice(3).map(article => `
                        <div class="post">
                            <h2><a href="#/${article.id}" onclick="loadArticle('${article.id}', 'articles')">${article.title}</a></h2>
                            <p>${article.excerpt}</p>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    });
}

// 显示收藏夹
function showFavorites() {
    fetchArticles('favorites').then(favorites => {
        const content = document.getElementById('content');
        content.innerHTML = `
            <section class="favorites">
                <h2>我的收藏夹</h2>
                ${favorites.map(favorite => `
                    <div class="post">
                        <h2><a href="#/${favorite.id}" onclick="loadArticle('${favorite.id}', 'favorites')">${favorite.title}</a></h2>
                        <p>${favorite.excerpt}</p>
                    </div>
                `).join('')}
            </section>
        `;
    });
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
        </section>
    `;
}

// 默认显示文章列表
window.onload = showPosts;

// 切换展开和收起
function toggleExpand(sectionId) {
    const section = document.querySelector(`.${sectionId}`);
    section.classList.toggle('expanded');

    // 更新按钮文本
    const toggleButton = section.querySelector('.toggle-button');
    if (section.classList.contains('expanded')) {
        toggleButton.textContent = '收起文章';
    } else {
        toggleButton.textContent = '更多文章';
    }
}
