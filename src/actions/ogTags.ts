'use server';

import * as cheerio from 'cheerio';
import ky from 'ky';
import type { TMetadata } from '@/types/post';

export async function fetchOgTags(url: string): Promise<TMetadata> {
  if (!url) {
    throw new Error('URL is required');
  }

  try {
    // Fetch og tags from the URL
    const data = await ky.get(url).text();
    const $ = cheerio.load(data);

    // OG 태그 파싱
    const metadata: TMetadata = {
      title:
        $('meta[property="og:title"]').attr('content') || $('title').text(),
      description: $('meta[property="og:description"]').attr('content') || '',
      image: $('meta[property="og:image"]').attr('content') || '',
      siteName: $('meta[property="og:site_name"]').attr('content') || '',
    };

    return metadata;
  } catch (error) {
    console.error('Failed to fetch og tags', error);
    throw new Error('Failed to fetch og tags');
  }
}
