import os
import markdown

def read_template(template_path):
    """读取模板文件"""
    with open(template_path, 'r', encoding='utf-8') as file:
        return file.read()

def read_markdown(md_path):
    """读取 Markdown 文件"""
    with open(md_path, 'r', encoding='utf-8') as file:
        return file.read()

def generate_html(template, nav, title, content, output_path):
    """生成 HTML 文件"""
    content_html = markdown.markdown(content)
    html = template.replace('{{title}}', title).replace('{{content}}', content_html).replace('{{nav}}', nav)
    with open(output_path, 'w', encoding='utf-8') as file:
        file.write(html)

def main():
    """主函数，生成所有文章的 HTML 文件"""
    template_path = 'templates/article-template.html'
    nav_template_path = 'templates/nav-template.html'
    articles_dir = 'articles'
    output_dir = 'articles'

    # 读取模板
    template = read_template(template_path)
    nav = read_template(nav_template_path)

    # 遍历文章目录中的所有 Markdown 文件
    for filename in os.listdir(articles_dir):
        if filename.endswith('.md'):
            md_path = os.path.join(articles_dir, filename)
            content = read_markdown(md_path)
            title = content.split('\n')[0].lstrip('# ').strip()  # 提取标题
            output_path = os.path.join(output_dir, filename.replace('.md', '.html'))
            generate_html(template, nav, title, content, output_path)
            print(f'Generated {output_path}')

if __name__ == '__main__':
    main()
