import { getSortedArticlesData } from '@/lib/getArticles.server';

export default async function Home() {
  const articles = await getSortedArticlesData();
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Nos Articles</h1>
      <ul>
        {articles.map(a => (
          <li key={a.id}>{a.title}</li>
        ))}
      </ul>
    </main>
  );
}
