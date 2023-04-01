import { useRoute, useRouter } from 'vue-router';
import { useElement } from './useElement';
import { computed } from 'vue';

export function useInfo(props) {
  const route = useRoute();
  const router = useRouter();
  const element = useElement(props);
  const store = element.useStore();
  const info = computed(() => store.getData[route.params?.key] ?? props.data());
  element.selectedKeys.value = [route.params?.key];
  const onDeleted = () => router.push({ name: names.dashboard });
  return { info, element, onDeleted };
}
