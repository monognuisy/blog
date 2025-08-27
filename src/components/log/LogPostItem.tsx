import Link from 'next/link';

interface ILogPostItemProps {
  title: string;
  date: string;
  id: string;
}

const LogPostItem = ({ title, date, id }: ILogPostItemProps) => {
  // TODO: id 기반 routing

  return (
    <Link href={`/log/${id}`}>
      <div className="border-b border-gray-200 py-4">
        <h2 className="text-base font-bold my-0">{title}</h2>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
    </Link>
  );
};

export default LogPostItem;
