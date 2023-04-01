import UsersForm from './UsersForm.vue';
import { useUserStore } from 'stores/users';
export default {
    data() {
        return { name: '', credit: 0 };
    },
    rules: {
        data: {
            name: {
                required: true,
                trigger: 'blur',
                message: 'Le nom est obligatoire',
            },
        },
    },
    formCom: UsersForm,
    useStore: useUserStore,
};
