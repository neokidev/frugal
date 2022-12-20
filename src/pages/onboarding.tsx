import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useMutateUser } from '@/hooks/useMutateUser';

const Onboarding = () => {
  const router = useRouter();
  const { createAdditionalUserDataMutation } = useMutateUser();

  useEffect(() => {
    createAdditionalUserDataMutation.mutate(undefined, {
      onError: (error) => console.error(error),
    });
    router.push('/').catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="text-while h-screen dark:text-gray-900" />;
};

export default Onboarding;
