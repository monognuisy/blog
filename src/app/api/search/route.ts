import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const category = searchParams.get('category');
  const limit = searchParams.get('limit') || '10';

  if (!query) {
    return NextResponse.json({ error: '검색어가 필요합니다.' }, { status: 400 });
  }

  try {
    let supabaseQuery = supabase
      .from('posts')
      .select('id, slug, title, description, category, tags, cover, date')
      .eq('published', true);

    // 카테고리 필터링
    if (category && category !== 'all') {
      supabaseQuery = supabaseQuery.eq('category', category);
    }

    // 텍스트 검색 (제목 + 설명)
    supabaseQuery = supabaseQuery.or(`title.ilike.%${query}%,description.ilike.%${query}%`);

    // 정렬 및 제한
    supabaseQuery = supabaseQuery
      .order('date', { ascending: false })
      .limit(parseInt(limit));

    const { data: posts, error } = await supabaseQuery;

    if (error) {
      console.error('Search error:', error);
      return NextResponse.json({ error: '검색 중 오류가 발생했습니다.' }, { status: 500 });
    }

    // 검색 결과 하이라이팅을 위한 추가 정보
    const results = posts.map(post => ({
      ...post,
      // 검색어 하이라이팅을 위한 매치 정보
      titleMatch: post.title.toLowerCase().includes(query.toLowerCase()),
      descriptionMatch: post.description?.toLowerCase().includes(query.toLowerCase()) || false
    }));

    return NextResponse.json({
      results,
      total: results.length,
      query,
      category
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
} 
