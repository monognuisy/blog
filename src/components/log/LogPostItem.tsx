import Link from 'next/link';

interface ILogPostItemProps {
  title: string;
  date: string;
  id: string;
}

const LogPostItem = ({ title, date, id }: ILogPostItemProps) => {
  // TODO: id 기반 routing

  return (
    <li className="[&:not(:last-child)]:border-b border-gray-200">
      <Link href={`/log/${id}`} className="block py-4">
        <h2 className="text-base font-bold my-0">{title}</h2>
        <p className="text-xs text-gray-500">{date}</p>
      </Link>
    </li>
  );
};

export default LogPostItem;
