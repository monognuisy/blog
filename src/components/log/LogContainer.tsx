import { logPosts } from '@/data/logPosts';
import ScrollableMask from '../common/ScrollableMask';
import LogPostItem from './LogPostItem';

const LogContainer = () => {
  return (
    <section className="hidden lg:flex h-full  border border-gray-200 dark:border-neutral-700 rounded-2xl p-4 flex-col">
      <h2 className="text-xl font-bold my-0 py-0 flex-shrink-0">가벼운 글</h2>

      <div className="mt-4 flex-1 min-h-0">
        <ScrollableMask
          direction="vertical"
          className="absolute inset-0 overflow-y-auto"
          maskSize={50}
        >
          {logPosts.length > 0 ? (
            <ul className="space-y-0 h-full">
              {logPosts.map(logPost => (
                <LogPostItem
                  key={logPost.id}
                  title={logPost.title}
                  date={logPost.date}
                  id={logPost.id}
                />
              ))}
            </ul>
          ) : (
            <div className="space-y-0 h-full flex flex-col items-center justify-center">
              <p className="text-center text-gray-500 dark:text-gray-300">
                아직 가벼운 글이 없습니다... 🐦‍⬛
              </p>
            </div>
          )}
        </ScrollableMask>
      </div>
    </section>
  );
};

export default LogContainer;
