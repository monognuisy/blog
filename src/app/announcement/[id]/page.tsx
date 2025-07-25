import fs from 'node:fs';
import CustomMDXComponents from '@/components/post/CustomMDXComponents';
import {
  getAnnouncementPath,
  getSortedAnnouncement,
} from '@/lib/getAnnouncement';
import customMDX from '@/lib/mdxCompiler';
import type { TAnnouncement } from '@/types/announcement';

type TAnnouncementPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const generateStaticParams = () => {
  const announcements = getSortedAnnouncement();

  return announcements.map(({ id }) => ({
    id,
  })) satisfies Awaited<TAnnouncementPageProps['params']>[];
};

const AnnouncementPage = async ({ params }: TAnnouncementPageProps) => {
  const { id } = await params;
  const fullPath = getAnnouncementPath(id);
  const postFile = fs.readFileSync(fullPath);

  const { content, frontmatter } = await customMDX<TAnnouncement>({
    source: postFile,
    components: CustomMDXComponents('announcement', id),
  });

  return (
    <div className="post-wrapper">
      <div className="relative mx-auto max-w-[1024px] px-4 pt-10">
        <div>
          <h1>{frontmatter.title}</h1>
          <p>{frontmatter.date}</p>
        </div>
        <div className="">{content}</div>
      </div>
    </div>
  );
};

export { generateStaticParams };
export default AnnouncementPage;
