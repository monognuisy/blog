import Image from 'next/image';
import PostList from '@/app/_components/root/PostList';
import GoToTopButton from './_components/common/GoToTopButton';

export default function Home() {
  return (
    <main className="">
      <PostList />
      <GoToTopButton />
    </main>
  );
}
