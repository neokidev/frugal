import { AddTransactionForm } from "./AddTransactionForm";

function IconOne() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconTwo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconThree() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
      <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
      <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
      <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
      <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
      <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
    </svg>
  );
}

const solutions = [
  {
    id: 1,
    name: "Insights",
    description: "Measure actions your users take",
    amount: "$2,456.00",
    icon: IconOne,
    date: "Dec 12",
  },
  {
    id: 2,
    name: "Automations",
    description: "Create your own targeted content",
    href: "##",
    amount: "$1,456.00",
    icon: IconTwo,
    date: "Sep 24",
  },
  {
    id: 3,
    name: "Reports",
    description: "Keep track of your growth",
    href: "##",
    amount: "$1,234.00",
    icon: IconThree,
    date: "Nov 08",
  },
];

export const Home = () => {
  return (
    <div className="mx-auto flex w-full max-w-[80rem] p-6">
      <div className="w-full px-3">
        <div className="text-2xl font-extrabold text-[#344767]">
          Welcome Back!
        </div>

        <div className="flex w-full">
          <div className="w-full lg:mr-4">
            <div className="-mx-3 flex flex-wrap">
              <div className="mt-6 w-full max-w-full shrink-0 px-3 md:w-1/3">
                <div className="flex flex-col overflow-hidden break-words rounded-2xl border border-black/5 bg-white shadow-md shadow-black/5">
                  <div className="rounded-t-2xl p-4">
                    <p className="text-sm font-semibold capitalize leading-normal">
                      total balance
                    </p>
                    <h5 className="mb-0 text-xl font-bold">{" $130,832 "}</h5>
                    <p>
                      <span className="text-sm font-bold leading-normal text-lime-500">
                        {"+90% "}
                      </span>
                      <span className="text-xs font-semibold leading-normal text-slate-400">
                        from last weeks
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 w-full max-w-full shrink-0 px-3 md:w-1/3">
                <div className="flex flex-col overflow-hidden break-words rounded-2xl border border-black/5 bg-white shadow-md shadow-black/5">
                  <div className="rounded-t-2xl p-4">
                    <p className="text-sm font-semibold capitalize leading-normal">
                      income
                    </p>
                    <h5 className="mb-0 text-xl font-bold">{" $130,832 "}</h5>
                    <p>
                      <span className="text-sm font-bold leading-normal text-lime-500">
                        {"+90% "}
                      </span>
                      <span className="text-xs font-semibold leading-normal text-slate-400">
                        from last weeks
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 w-full max-w-full shrink-0 px-3 md:w-1/3">
                <div className="flex flex-col overflow-hidden break-words rounded-2xl border border-black/5 bg-white shadow-md shadow-black/5">
                  <div className="rounded-t-2xl p-4">
                    <p className="text-sm font-semibold capitalize leading-normal">
                      expenses
                    </p>
                    <h5 className="mb-0 text-xl font-bold">{" $130,832 "}</h5>
                    <p>
                      <span className="text-sm font-bold leading-normal text-red-500">
                        {"-90% "}
                      </span>
                      <span className="text-xs font-semibold leading-normal text-slate-400">
                        from last weeks
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap">
              <div className="flex-0 flex w-full max-w-full shrink-0 flex-col overflow-hidden break-words rounded-2xl border border-black/5 bg-white shadow-md shadow-black/5">
                <div className="p-4">
                  <h6 className="mb-2">Transitions</h6>

                  <div className="grid md:grid-cols-2">
                    {solutions.map((item) => (
                      <div
                        key={item.id}
                        className="mx-1 flex items-start rounded-lg p-2 hover:bg-orange-50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white">
                          <item.icon aria-hidden="true" />
                        </div>
                        <div className="ml-4 flex-1">
                          <p className="mb-1 text-sm font-semibold text-slate-700">
                            {item.name}
                          </p>
                          <p className="text-xs">{item.description}</p>
                        </div>
                        <div className="ml-4 text-right">
                          <p className="mb-1 text-sm font-semibold text-red-500">
                            {item.amount}
                          </p>
                          <p className="text-xs">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:ml-4 lg:block lg:w-96">
            <div className="mt-6 flex flex-wrap">
              <div className="flex-0 flex w-full max-w-full shrink-0 flex-col overflow-hidden break-words rounded-2xl border border-black/5 bg-white shadow-md shadow-black/5">
                <div className="p-4">
                  <h6 className="mb-2">Add transaction</h6>
                  <AddTransactionForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
