import { logPosts } from '@/data/logPosts';
import ScrollableMask from '../common/ScrollableMask';
import LogPostItem from './LogPostItem';

const LogContainer = () => {
  return (
    <div className="hidden lg:flex h-full  border border-gray-200 rounded-2xl p-4 flex-col">
      <h1 className="text-xl font-bold my-0 flex-shrink-0">가벼운 글</h1>

      <div className="mt-4 flex-1 min-h-0">
        <ScrollableMask
          direction="vertical"
          className="absolute inset-0 overflow-y-auto"
          maskSize={50}
        >
          <div className="space-y-0">
            {logPosts.map(logPost => (
              <LogPostItem
                key={logPost.id}
                title={logPost.title}
                date={logPost.date}
                id={logPost.id}
              />
            ))}
          </div>
        </ScrollableMask>
      </div>
    </div>
  );
};

export default LogContainer;
