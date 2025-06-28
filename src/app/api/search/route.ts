import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const limit = searchParams.get('limit') || '10';

  if (!query) {
    return NextResponse.json({ error: '검색어가 필요합니다.' }, { status: 400 });
  }

  try {
    // 검색어에서 띄어쓰기 제거
    const normalizedQuery = query.replace(/\s+/g, '');
    const hasSpaces = query !== normalizedQuery;

    let supabaseQuery = supabase
      .from('posts')
      .select('id, slug, title, description, category, tags, cover, date')
      .eq('published', true);

    // 원본 검색어로 검색
    let searchConditions = `title.ilike.%${query}%,description.ilike.%${query}%`;
    
    // 띄어쓰기가 있는 경우 띄어쓰기 제거한 검색어도 추가
    if (hasSpaces && normalizedQuery.length > 0) {
      searchConditions += `,title.ilike.%${normalizedQuery}%,description.ilike.%${normalizedQuery}%`;
    }

    supabaseQuery = supabaseQuery.or(searchConditions);

    // 정렬 및 제한
    supabaseQuery = supabaseQuery
      .order('date', { ascending: false })
      .limit(parseInt(limit) * 2); // 중복 제거를 위해 더 많이 가져옴

    const { data: posts, error } = await supabaseQuery;

    if (error) {
      console.error('Search error:', error);
      return NextResponse.json({ error: '검색 중 오류가 발생했습니다.' }, { status: 500 });
    }

    // 중복 제거 (같은 id를 가진 포스트)
    const uniquePosts = posts.filter((post, index, self) => 
      index === self.findIndex(p => p.id === post.id)
    );

    // 결과 제한
    const limitedPosts = uniquePosts.slice(0, parseInt(limit));

    // 검색 결과 하이라이팅을 위한 추가 정보
    const results = limitedPosts.map(post => {
      const titleLower = post.title.toLowerCase();
      const descLower = post.description?.toLowerCase() || '';
      const queryLower = query.toLowerCase();
      const normalizedQueryLower = normalizedQuery.toLowerCase();
      
      // 띄어쓰기 무시 매치 확인
      const titleNoSpaces = titleLower.replace(/\s+/g, '');
      const descNoSpaces = descLower.replace(/\s+/g, '');
      
      return {
        ...post,
        titleMatch: titleLower.includes(queryLower) || titleNoSpaces.includes(normalizedQueryLower),
        descriptionMatch: descLower.includes(queryLower) || descNoSpaces.includes(normalizedQueryLower)
      };
    });

    return NextResponse.json({
      results,
      total: results.length,
      query
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
} 
