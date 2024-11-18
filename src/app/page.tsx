import PostList from '@/app/_components/post/PostList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | monognuisy blog',
  description: 'Technical blog about web development, programming, and more.',
};

export default function Home() {
  return (
    <main className="h-full max-w-[1200px] mx-auto px-4 mt-[90px]">
      <PostList />
    </main>
  );
}
