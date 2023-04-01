import { ref } from 'vue';

export function useLoader() {
    const loading = ref(false);
    return {
        loading,
        setLoading(value) {
            loading.value = value;
        },
    };
}
