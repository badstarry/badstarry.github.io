import os
import markdown

def read_template(template_path):
    with open(template_path, 'r', encoding='utf-8') as file:
        return file.read()

def read_markdown(md_path):
    with open(md_path, 'r', encoding='utf-8') as file:
        return file.read()

def generate_html(template, title, content, output_path):
    content_html = markdown.markdown(content)
    html = template.replace('{{title}}', title).replace('{{content}}', content_html)
    with open(output_path, 'w', encoding='utf-8') as file:
        file.write(html)

def main():
    template_path = 'templates/article-template.html'
    articles_dir = 'articles'
    output_dir = 'articles'

    template = read_template(template_path)

    for filename in os.listdir(articles_dir):
        if filename.endswith('.md'):
            md_path = os.path.join(articles_dir, filename)
            content = read_markdown(md_path)
            title = content.split('\n')[0].lstrip('# ').strip()
            output_path = os.path.join(output_dir, filename.replace('.md', '.html'))
            generate_html(template, title, content, output_path)

if __name__ == '__main__':
    main()
