import { TAnnouncement } from '@/types/announcement';
import Link from 'next/link';

type TAnnouncementCardProps = {
  announcement: TAnnouncement;
};

const AnnouncementCard = ({ announcement }: TAnnouncementCardProps) => {
  const { id, title, date } = announcement;
  return (
    <Link href={`/announcement/${id}`}>
      <div className="bg-red-500/5 border border-red-500/20 my-4 px-4 py-2 md:py-4 rounded-xl flex items-center gap-2 md:text-lg text-red-500 dark:text-red-400">
        <p className="text-xl">ⓘ</p>
        <p className="">{title}</p>
        <p className="text-sm text-gray-500 ml-auto">{date}</p>
      </div>
    </Link>
  );
};

export default AnnouncementCard;
