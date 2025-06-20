import PostList from '@/components/post/PostList';
import AnnouncementCard from '../components/announcement/AnnouncementCard';
import { getRecentAnnouncements } from '@/lib/getAnnouncement';

interface HomeProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const recentAnnouncements = getRecentAnnouncements();
  const params = await searchParams;
  const selectedTag = params.tag;

  return (
    <main className="h-full max-w-[80rem] 2xl:max-w-[96rem] mx-auto px-4  ">
      {recentAnnouncements.map((announcement) => (
        <AnnouncementCard announcement={announcement} key={announcement.id} />
      ))}
      <PostList tag={selectedTag} />
    </main>
  );
}
