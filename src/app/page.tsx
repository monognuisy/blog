import PostList from '@/components/post/PostList';
import AnnouncementCard from '../components/announcement/AnnouncementCard';
import { getRecentAnnouncements } from '@/lib/getAnnouncement';

export default function Home() {
  const recentAnnouncements = getRecentAnnouncements();

  return (
    <main className="h-full max-w-[1200px] mx-auto px-4  ">
      {recentAnnouncements.map((announcement) => (
        <AnnouncementCard announcement={announcement} key={announcement.id} />
      ))}
      <PostList />
    </main>
  );
}
