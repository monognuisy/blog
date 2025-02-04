import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
      <h1 className="text-4xl font-bold">페이지를 찾을 수 없었어요 :(</h1>
      <p className="text-gray-600 dark:text-gray-400">
        이런 것을 404 라고 하는 것 같아요.
      </p>
      <Link
        href="/"
        className="mt-4 px-4 py-2 bg-primary dark:bg-primary-dark text-white dark:text-dark-bg rounded-md hover:opacity-90"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFound;
