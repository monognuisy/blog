import path from 'path';
import fs from 'fs';
import { ascendingSortFn } from './function';
import matter from 'gray-matter';
import { TAnnouncement } from '@/types/announcement';

const announcementDirectory = path.join(process.cwd(), 'content/announcement');

export const getSortedAnnouncement = (sortFn = ascendingSortFn) => {
  const fileNames = fs.readdirSync(announcementDirectory);

  const contents = fileNames.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(announcementDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    } as TAnnouncement;
  });

  const sortedContents = contents.toSorted((a, b) => sortFn(a.date, b.date));

  return sortedContents;
};

export const getRecentAnnouncements = (deltaDate = 30, count = 5) => {
  const announcements = getSortedAnnouncement();
  const recentAnnouncements = announcements.filter((announcement) => {
    const currentDate = new Date();
    const date = new Date(announcement.date);

    return (
      currentDate.getTime() - date.getTime() <= deltaDate * 1000 * 60 * 60 * 24
    );
  });

  return recentAnnouncements.slice(0, count);
};

export const getAnnouncementData = (id: string) => {
  const filePath = path.join(announcementDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const matterResult = matter(fileContents);

  const frontmatter = matterResult.data as TAnnouncement;
  const content = matterResult.content;

  return {
    frontmatter,
    content,
  };
};

export const getAnnouncementPath = (id: string) => {
  return path.join(announcementDirectory, `${id}.mdx`);
};
