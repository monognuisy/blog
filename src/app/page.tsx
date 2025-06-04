import PostList from '@/components/post/PostList';
import AnnouncementCard from '../components/announcement/AnnouncementCard';
import { getRecentAnnouncements } from '@/lib/getAnnouncement';

export default function Home() {
  const recentAnnouncements = getRecentAnnouncements();

  return (
    <main className="h-full max-w-[80rem] 2xl:max-w-[96rem] mx-auto px-4  ">
      {recentAnnouncements.map((announcement) => (
        <AnnouncementCard announcement={announcement} key={announcement.id} />
      ))}
      <PostList />
    </main>
  );
}
