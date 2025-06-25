'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchResults } from '@/components/search/SearchResults';

interface SearchResult {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category: string;
  tags: string[];
  cover: string | null;
  date: string;
  titleMatch: boolean;
  descriptionMatch: boolean;
}

interface SearchResponse {
  results: SearchResult[];
  total: number;
  query: string;
  category?: string;
  error?: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'all';

  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedCategory, setSelectedCategory] = useState(category);

  const categories = [
    { value: 'all', label: '전체' },
    { value: 'ai', label: 'AI' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'project', label: 'Project' },
    { value: 'system-prog', label: 'System Programming' },
    { value: 'functional', label: 'Functional Programming' },
    { value: 'linear-algebra', label: 'Linear Algebra' },
    { value: 'etc', label: 'Etc' },
  ];

  const performSearch = async (searchTerm: string, cat: string) => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        q: searchTerm,
        category: cat,
        limit: '20',
      });

      const response = await fetch(`/api/search?${params}`);
      const data: SearchResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '검색 중 오류가 발생했습니다.');
      }

      setResults(data.results);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.',
      );
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // URL 파라미터 변경시 검색 실행
  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      setSelectedCategory(category);
      performSearch(query, category);
    }
  }, [query, category]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const url = new URL(window.location.href);
      url.searchParams.set('q', searchQuery);
      url.searchParams.set('category', selectedCategory);
      window.history.pushState({}, '', url.toString());
      performSearch(searchQuery, selectedCategory);
    }
  };

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    if (searchQuery.trim()) {
      const url = new URL(window.location.href);
      url.searchParams.set('category', newCategory);
      window.history.pushState({}, '', url.toString());
      performSearch(searchQuery, newCategory);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          블로그 검색
        </h1>

        {/* 검색 폼 */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="검색어를 입력하세요..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              검색
            </button>
          </div>
        </form>

        {/* 카테고리 필터 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                selectedCategory === cat.value
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 검색 결과 */}
      <SearchResults
        results={results}
        query={searchQuery}
        isLoading={isLoading}
        error={error || undefined}
      />
    </div>
  );
}
