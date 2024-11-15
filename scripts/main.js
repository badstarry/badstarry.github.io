document.addEventListener('DOMContentLoaded', function() {
    // 加载导航栏
    fetch('/templates/nav-template.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading navigation:', error));

    // 加载文章内容
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    if (articleId) {
        fetch(`/articles/${articleId}.md`)
            .then(response => response.text())
            .then(data => {
                const title = data.split('\n')[0].replace('# ', '').trim();
                const content = marked.parse(data);

                document.title = `${title} - 我的博客`;
                document.querySelector('h1').innerText = title;
                document.querySelector('.article-content').innerHTML = content;
            })
            .catch(error => console.error('Error loading article:', error));
    } else {
        console.error('Article ID not provided');
    }
});
