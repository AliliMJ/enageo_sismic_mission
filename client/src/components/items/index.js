import ItemsForm from './ItemsForm.vue';
import { useItemStore } from 'stores/items';
export default {
    data() {
        return {
            title: '',
            price: 0,
            unit: 'pièce',
            stock: 0,
            lowStock: 20,
            description: '',
        };
    },
    rules: {
        data: {
            title: {
                required: true,
                trigger: 'blur',
                message: 'Le titre est obligatoire',
            },
        },
    },
    formCom: ItemsForm,
    useStore: useItemStore,
};
