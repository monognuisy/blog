import PostList from '@/app/_components/post/PostList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | monognuisy blog',
  description: 'Technical blog about web development, programming, and more.',
};

export default function Home() {
  return (
    <main className="h-full">
      <PostList />
    </main>
  );
}
