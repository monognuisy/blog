import PostList from '@/components/post/PostList';
import { getRecentAnnouncements } from '@/lib/getAnnouncement';
import AnnouncementCard from '../components/announcement/AnnouncementCard';

interface HomeProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const recentAnnouncements = getRecentAnnouncements();
  const params = await searchParams;
  const selectedTag = params.tag;

  return (
    <main className="mx-auto h-full max-w-[80rem] px-4 2xl:max-w-[96rem] ">
      {recentAnnouncements.map(announcement => (
        <AnnouncementCard announcement={announcement} key={announcement.id} />
      ))}
      <PostList tag={selectedTag} />
    </main>
  );
}
