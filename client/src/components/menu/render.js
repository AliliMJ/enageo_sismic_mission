import { h } from 'vue';
import { NIcon } from 'naive-ui';
import { RouterLink } from 'vue-router';

export function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
export function renderMenuItem(title, name) {
  return () =>
    h(
      RouterLink,
      {
        to: { name },
      },
      { default: () => title }
    );
}
