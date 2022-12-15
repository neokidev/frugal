import Image from 'next/image';
import { signIn } from 'next-auth/react';

const loginButtonItems = [
  {
    label: 'Google',
    icon: <Image src="/google.svg" alt="Google" width={24} height={24} />,
    onClick: () => signIn('google'),
  },
  {
    label: 'GitHub',
    icon: <Image src="/github.svg" alt="GitHub" width={24} height={24} />,
    onClick: () => signIn('github'),
  },
];

export const Auth = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-[28rem] flex-col items-center justify-center overflow-hidden break-words rounded-2xl border border-black/5 bg-white px-10 py-12 shadow-md shadow-black/5 dark:border-white/5 dark:bg-gray-900">
        <h1 className="mb-8 text-3xl font-semibold">Frugal</h1>

        <div className="w-full [&>*:not(:last-child)]:mb-4">
          {loginButtonItems.map(({ label, icon, onClick }) => (
            <button
              key={label}
              className="flex w-full transform items-center justify-center space-x-2 rounded-lg border bg-white px-4 py-2 text-center text-sm text-gray-600 transition-colors duration-300 hover:bg-gray-100"
              onClick={onClick}
            >
              {icon}
              <div className="text-sm text-gray-800">
                {'Login with '}
                <span className="font-semibold">{label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
