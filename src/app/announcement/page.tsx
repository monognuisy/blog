import AnnouncementCard from '@/app/_components/announcement/AnnouncementCard';
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
    <div className="max-w-[1200px] mx-auto px-4 mt-[90px]">
      <h1 className="text-[2rem] md:text-[3rem] mt-8 md:mt-12">
        Announcements
      </h1>
      {announcements.map((announcement) => (
        <AnnouncementCard announcement={announcement} key={announcement.id} />
      ))}
    </div>
  );
};

export default AnnouncementPage;
