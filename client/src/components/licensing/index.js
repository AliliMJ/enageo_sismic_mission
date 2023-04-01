export default {
    data() {
        return {
            username: '',
            key: '',
        };
    },
    rules: {
        data: {
            username: {
                required: true,
                trigger: 'blur',
                message: 'Le nom est obligatoire',
            },
            key: {
                required: true,
                trigger: 'blur',
                message: 'La clé est obligatoire',
            },
        },
    },
};
