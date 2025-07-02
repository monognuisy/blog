import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
      <h1 className="font-bold text-4xl">페이지를 찾을 수 없었어요 :(</h1>
      <p className="text-gray-600 dark:text-gray-400">
        이런 것을 404 라고 하는 것 같아요.
      </p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-primary px-4 py-2 text-white hover:opacity-90 dark:bg-primary-dark dark:text-dark-bg"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFound;
