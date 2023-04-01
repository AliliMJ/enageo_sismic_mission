import { ref } from 'vue';
import { useForm } from './useForm';

export function useElement({ useStore, formCom, data, rules }) {
    const selectedKeys = ref([]);
    const useElementForm = () => useForm({ formCom, data, rules });

    const element = {
        useStore,
        selectedKeys,
        useElementForm,
    };

    return element;
}
