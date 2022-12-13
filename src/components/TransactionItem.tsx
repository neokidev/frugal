type Props = {
  name: string;
  description: string;
  amount: string;
  date: string;
  type: 'income' | 'expense';
  icon: () => JSX.Element;
};

export const TransactionItem = ({
  name,
  description,
  amount,
  date,
  type,
  icon: Icon,
}: Props) => {
  return (
    <li className="mx-1 flex items-start rounded-lg p-2 hover:bg-orange-50 dark:hover:bg-orange-600/20">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white dark:text-gray-900">
        <Icon aria-hidden="true" />
      </div>
      <div className="ml-4 flex-1">
        <p className="mb-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
          {name}
        </p>
        <p className="text-xs">{description}</p>
      </div>
      <div className="ml-4 text-right">
        <p
          className={`mb-1 text-sm font-semibold ${
            type === 'income' ? 'text-lime-500' : 'text-red-500'
          }`}
        >
          $ {amount}
        </p>
        <p className="text-xs">{date}</p>
      </div>
    </li>
  );
};
