import { HiChartBar } from 'react-icons/hi2';

const LoginPageHeader = () => {
  return (
    <header className="bg-white lg:fixed lg:w-full lg:top-0 lg:left-0 lg:z-30">
      <div className="p-6">
        <div className="flex justify-center items-center">
          <HiChartBar className="shrink-0 w-10 h-10 text-sky-400" />
          <p className="text-4xl ml-0.5">
            <strong>Frugal</strong>
          </p>
        </div>
      </div>
    </header>
  );
};

export default LoginPageHeader;
