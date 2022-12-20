import { trpc } from '@/utils/trpc';

export const useMutateUser = () => {
  const utils = trpc.useContext();

  const createAdditionalUserDataMutation =
    trpc.user.createCurrentUserAdditionalData.useMutation({
      onSuccess: () => {
        utils.user.getCurrentUserBalance
          .invalidate()
          .catch((error) => console.error(error));
      },
    });

  return { createAdditionalUserDataMutation };
};
