import fs from 'fs';
import { TAnnouncement } from '@/app/_types/announcement';
import {
  getAnnouncementPath,
  getSortedAnnouncement,
} from '@/lib/getAnnouncement';
import customMDX from '@/lib/mdxCompiler';

type TAnnouncementPageProps = {
  params: {
    id: string;
  };
};

const generateStaticParams = () => {
  const announcements = getSortedAnnouncement();

  return announcements.map(({ id }) => ({
    id,
  }));
};

const AnnouncementPage = async ({ params }: TAnnouncementPageProps) => {
  const { id } = params;
  const fullPath = getAnnouncementPath(id);
  const postFile = fs.readFileSync(fullPath);

  const { content, frontmatter } = await customMDX<TAnnouncement>({
    source: postFile,
  });

  return (
    <>
      <div className="post-wrapper bg-white">
        <div className="relative mx-auto pt-10 max-w-[768px] px-4">
          <div>
            <h1>{frontmatter.title}</h1>
            <p>{frontmatter.date}</p>
          </div>
          <div className="">{content}</div>
        </div>
      </div>
    </>
  );
};

export { generateStaticParams };
export default AnnouncementPage;
