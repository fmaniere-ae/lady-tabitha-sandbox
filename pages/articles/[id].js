import { getAllArticleIds, getArticleData } from '../../lib/articles';

export async function getStaticPaths() {
  const fs = require('fs');
  const path = require('path');
  const dir = path.join(process.cwd(), 'content/articles');
  const files = fs.readdirSync(dir);
  const paths = files.map((file) => ({
    params: { id: file.replace(/\.md$/, '') },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { getArticleData } = await import('../../lib/articles');
  const articleData = await getArticleData(params.id);
  return { props: { articleData } };
}

export default function Article({ articleData }) {
  return (
    <article className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{articleData.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} />
    </article>
  );
}
