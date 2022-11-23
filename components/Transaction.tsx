import dayjs from 'dayjs';
import { useMemo } from 'react';
import { RiShoppingCart2Fill } from 'react-icons/ri';

export type TransactionProps = {
  type: 'income' | 'expense';
  name: string;
  description: string;
  amount: number;
};

export const Transaction = ({
  type,
  name,
  description,
  amount,
}: TransactionProps) => {
  const now = useMemo(() => dayjs(), []);

  return (
    <div className="bg-white h-[4.5rem] rounded-2xl p-2 ring-1 ring-gray-500/5">
      <div className="flex justify-center items-center h-full">
        <div className="w-[3.5rem] h-full bg-[#fce2ec] rounded-xl">
          <RiShoppingCart2Fill className="p-3" color="f07aa7" size="full" />
        </div>
        <div className="flex-1 h-full px-3 flex items-center">
          <div>
            <div className="text-gray-800 font-semibold pb-1">{name}</div>
            <div className="text-xs ">{description}</div>
          </div>
        </div>
        <div className="h-full pr-4 flex text-right items-center">
          <div>
            <div
              className={`font-semibold pb-1 ${
                type === 'income' ? 'text-[#fd3c4a]' : 'text-[#00a86b]'
              }`}
            >
              <span className="mr-0.5">$</span>
              {amount}
            </div>
            <div className="text-xs">{now.format('MMM DD')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
