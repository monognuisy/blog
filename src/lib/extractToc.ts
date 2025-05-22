// 이 파일은 이제 타입 정의만 제공합니다.
// 실제 목차 추출은 TableOfContents 컴포넌트에서 클라이언트 측에서 수행됩니다.

/**
 * 목차 항목의 타입 정의
 */
export type TocItem = {
  id: string; // 헤더 요소의 ID
  text: string; // 헤더 텍스트
  level: number; // 헤더 레벨 (1, 2, 3)
};
