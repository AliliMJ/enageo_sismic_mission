import { ref } from 'vue';

export function useForm({ formCom, data, rules }) {
    const formRef = ref(null);
    const formValue = ref({ data: data() });
    const autoFocusRef = ref(null);

    const validate = ({ valide, invalide }) => {
        formRef.value?.validate((errors) => {
            if (!errors) return valide();
            else return invalide(errors);
        });
    };

    const reset = () => {
        formValue.value.data = data();
    };
    const autoFocus = () => {
        if (autoFocusRef.value) autoFocusRef.value.focus();
    };

    return {
        formCom,
        data,
        rules,
        formRef,
        formValue,
        autoFocusRef,
        autoFocus,
        validate,
        reset,
    };
}
