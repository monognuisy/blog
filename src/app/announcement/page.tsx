import AnnouncementCard from '@/components/announcement/AnnouncementCard';
import { getSortedAnnouncement } from '@/lib/getAnnouncement';

export const generateMetadata = () => {
  return {
    title: 'Announcements',
    description: 'Announcements of monognuisy blog',
  };
};

const AnnouncementPage = () => {
  const announcements = getSortedAnnouncement();

  return (
    <div className="mx-auto max-w-[1200px] min-h-[100vh] px-4 ">
      <h1 className="mt-8 text-2xl md:mt-12 md:text-3xl">공지사항</h1>
      {announcements.map(announcement => (
        <AnnouncementCard announcement={announcement} key={announcement.id} />
      ))}
    </div>
  );
};

export default AnnouncementPage;
