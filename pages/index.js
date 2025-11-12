import Link from 'next/link';
import { getSortedArticlesData } from '../lib/articles';

export async function getStaticProps() {
  const allArticlesData = getSortedArticlesData();
  return { props: { allArticlesData } };
}

export default function Home({ allArticlesData }) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Notre Association</h1>
      <ul>
        {allArticlesData.map(({ id, date, title }) => (
          <li key={id} className="mb-2">
            <Link href={`/articles/${id}`} className="text-blue-600 hover:underline">
              {title}
            </Link>
            <br />
            <small>{date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
