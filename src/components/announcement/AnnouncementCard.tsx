import Link from 'next/link';
import type { TAnnouncement } from '@/types/announcement';

type TAnnouncementCardProps = {
  announcement: TAnnouncement;
};

const AnnouncementCard = ({ announcement }: TAnnouncementCardProps) => {
  const { id, title, date } = announcement;
  return (
    <Link href={`/announcement/${id}`}>
      <div className="my-4 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2 text-red-500 md:py-4 md:text-lg dark:text-red-400">
        <p className="text-xl">ⓘ</p>
        <p className="">{title}</p>
        <p className="ml-auto text-gray-500 text-sm">{date}</p>
      </div>
    </Link>
  );
};

export default AnnouncementCard;
