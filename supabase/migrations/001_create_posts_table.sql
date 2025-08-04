-- 블로그 포스트 테이블 생성
CREATE TABLE posts
(
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  tags TEXT[],
  cover TEXT,
  date DATE NOT NULL,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

  -- 검색 성능을 위한 인덱스들
  CREATE INDEX idx_posts_category ON posts(category);
  CREATE INDEX idx_posts_published ON posts(published);
  CREATE INDEX idx_posts_slug ON posts(slug);
  CREATE INDEX idx_posts_date ON posts(date DESC);

  -- 전문 검색을 위한 GIN 인덱스 (제목 + 설명)
  CREATE INDEX idx_posts_search ON posts 
    USING gin
  (to_tsvector
  ('simple', title || ' ' || COALESCE
  (description, '')));

  -- 태그 배열 검색을 위한 GIN 인덱스
  CREATE INDEX idx_posts_tags ON posts USING gin(tags);

  -- RLS (Row Level Security) 설정
  ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

  -- 모든 사용자가 published된 포스트만 조회할 수 있도록 정책 설정
  CREATE POLICY "Posts are viewable by everyone" ON posts
    FOR
  SELECT USING (published = true);

  -- updated_at 자동 갱신을 위한 함수
  CREATE OR REPLACE FUNCTION update_updated_at_column
  ()
RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = NOW();
  RETURN NEW;
  END;
$$ LANGUAGE 'plpgsql';

  -- updated_at 자동 갱신 트리거
  CREATE TRIGGER update_posts_updated_at 
    BEFORE
  UPDATE ON posts
    FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 

-- 또는 더 강력한 정규화를 위해
CREATE INDEX pgroonga_posts_index ON posts 
USING pgroonga (title, description)
WITH (normalizers='NormalizerNFKC130');

-- 간단한 띄어쓰기 무시 검색 함수
CREATE OR REPLACE FUNCTION search_posts_simple(search_text text)
RETURNS SETOF posts AS $$
DECLARE
  clean_search text;
BEGIN
  -- 공백 제거
  clean_search := regexp_replace(search_text, '\s+', '', 'g');
  
  RETURN QUERY
  SELECT * FROM posts 
  WHERE regexp_replace(title, '\s+', '', 'g') &@~ clean_search
    OR regexp_replace(description, '\s+', '', 'g') &@~ clean_search
    OR title &@~ search_text  -- 원본 검색도 포함
    OR description &@~ search_text
  ORDER BY pgroonga_score(tableoid, ctid) DESC
  LIMIT 50;
END;
$$ LANGUAGE plpgsql;
