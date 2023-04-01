import { useItemStore } from './items';
import { useUserStore } from './users';

const stores = {
    users: useUserStore,
    items: useItemStore,
};

export const useElementStore = (name) => {
    return stores[name]?.();
};
