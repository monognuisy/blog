import axios from 'axios';
import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';

type TURLResponse = {
  url: string;
};

export const POST = async (request: Request) => {
  const { url } = (await request.json()) as TURLResponse;

  if (!url) {
    return NextResponse.json(
      {
        error: 'URL is required',
      },
      { status: 400 },
    );
  }

  try {
    // Fetch og tags from the URL

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // OG 태그 파싱
    const metadata = {
      title:
        $('meta[property="og:title"]').attr('content') || $('title').text(),
      description: $('meta[property="og:description"]').attr('content') || '',
      image: $('meta[property="og:image"]').attr('content') || '',
      siteName: $('meta[property="og:site_name"]').attr('content') || '',
    };

    return NextResponse.json(metadata);
  } catch (error) {
    console.error('Failed to fetch og tags', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch og tags',
      },
      { status: 500 },
    );
  }
};
