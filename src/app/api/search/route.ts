import { type NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { Posts } from '@/types/supabase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const limit = searchParams.get('limit') || '10';

  if (!query) {
    return NextResponse.json(
      { error: '검색어가 필요합니다.' },
      { status: 400 },
    );
  }

  try {
    const supabaseQuery = supabase
      .rpc('search_posts_simple', { search_text: query })
      .order('date', { ascending: false })
      .limit(parseInt(limit));

    const { data: posts, error } = (await supabaseQuery) as {
      data: Posts[];
      error: Error | null;
    };

    if (error) {
      console.error('Search error:', error);
      return NextResponse.json(
        { error: '검색 중 오류가 발생했습니다.' },
        { status: 500 },
      );
    }

    // 검색 결과 하이라이팅을 위한 추가 정보
    const results = posts.map(post => {
      const titleLower = post.title.toLowerCase();
      const descLower = post.description?.toLowerCase() || '';
      const queryLower = query.toLowerCase();

      // 띄어쓰기 무시 매치 확인
      const titleNoSpaces = titleLower.replace(/\s+/g, '');
      const descNoSpaces = descLower.replace(/\s+/g, '');

      const matchedTitle =
        titleLower.includes(queryLower) || titleNoSpaces.includes(queryLower)
          ? queryLower
          : null;
      const matchedDescription = descLower.includes(queryLower)
        ? queryLower
        : descNoSpaces.includes(queryLower)
          ? queryLower
          : null;

      return {
        ...post,
        matchedTitle,
        matchedDescription,
      } as const;
    });

    return NextResponse.json({
      results,
      total: results.length,
      query,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
