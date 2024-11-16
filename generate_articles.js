const fs = require('fs');
const path = require('path');
const marked = require('marked');

// 读取模板文件
const templatePath = path.join(__dirname, 'templates', 'article-template.html');
const template = fs.readFileSync(templatePath, 'utf-8');

// 读取文章目录
const articlesDir = path.join(__dirname, 'articles');
const outputDir = path.join(__dirname, 'public');

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// 处理每篇文章
fs.readdir(articlesDir, (err, files) => {
    if (err) {
        return console.error('无法读取文章目录:', err);
    }

    files.forEach(file => {
        if (file.endsWith('.md')) {
            const filePath = path.join(articlesDir, file);
            fs.readFile(filePath, 'utf-8', (err, content) => {
                if (err) {
                    return console.error(`无法读取文件 ${file}:`, err);
                }

                // 提取文章标题
                const titleMatch = content.match(/^# (.+)/);
                const title = titleMatch ? titleMatch[1] : "未命名文章";

                // 将 Markdown 转换为 HTML
                const htmlContent = marked(content);

                // 渲染模板
                const renderedContent = template
                    .replace('{{title}}', title)
                    .replace('{{content}}', htmlContent);

                // 生成输出文件名
                const outputFilename = file.replace('.md', '.html');
                const outputPath = path.join(outputDir, outputFilename);

                // 写入生成的 HTML 文件
                fs.writeFile(outputPath, renderedContent, err => {
                    if (err) {
                        return console.error(`无法写入文件 ${outputFilename}:`, err);
                    }
                    console.log(`生成文件 ${outputFilename}`);
                });
            });
        }
    });
});
