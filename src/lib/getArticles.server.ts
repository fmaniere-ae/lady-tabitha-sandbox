// src/lib/getArticles.server.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Chemin vers le dossier des articles Markdown
const articlesDirectory = path.join(process.cwd(), 'content/articles');

// Type TypeScript pour les articles
export type ArticleData = {
  id: string;
  title?: string;
  date?: string;
  contentHtml?: string;
};

/**
 * Récupère la liste des articles triés par date
 * 🔹 Côté serveur uniquement
 */
export function getSortedArticlesData(): ArticleData[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticles: ArticleData[] = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
    };
  });

  // Tri décroissant par date
  return allArticles.sort((a, b) => (a.date && b.date ? (a.date < b.date ? 1 : -1) : 0));
}

/**
 * Récupère un article complet par son id
 * 🔹 Côté serveur uniquement
 */
export async function getArticleData(id: string): Promise<ArticleData> {
  const fullPath = path.join(articlesDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    title: matterResult.data.title,
    date: matterResult.data.date,
    contentHtml,
  };
}
