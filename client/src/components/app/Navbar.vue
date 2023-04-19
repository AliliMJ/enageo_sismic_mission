<template>
  <NSpace justify="space-between" class="space">
    <img class="logoImg" src="@/assets/ENAGEOTEXT.png" alt="erreur" />
    <NSpace justify="space-between" class="space1">
      

      <n-button text style="font-size: 30px">
        <n-icon>
          <notification />
        </n-icon>
      </n-button>


      <n-dropdown trigger="hover" :options="options" @select="handleSelect" style="width:300px">
        <n-button text style="font-size: 30px">
        <n-icon>
          <Persone />
        </n-icon>
      </n-button>
  </n-dropdown>

     
    </NSpace>
  </NSpace>
</template>

<script setup>
import { NSpace, NIcon, NImage, NButton , NDropdown ,  useMessage, NAvatar, NText ,useDialog  } from "naive-ui";
import {
  PersonCircleOutline as Persone,
  NotificationsOutline as notification,
} from "@vicons/ionicons5";
import { h } from "vue";
import { useRouter } from 'vue-router';
import { useAuth } from '../../stores/authentication';

const router = useRouter();
const auth = useAuth();
const dialog = useDialog();
const message = useMessage();

const options = [
        {
          key: "header",
          type: "render",
          render: renderCustomHeader
        },
        {
          key: "header-divider",
          type: "divider"
        },
        {
          label: "lpsum1",
          key: "stmt1"
        },
        {
          label: "lpsum2",
          key: "stmt2"
        },
        {
          label: "deconnecter",
          key: "stmt3"
        }
      ]

function handleSelect(key) {
        if(String(key)=='stmt3') {
          handleConfirm();
        }
      }

function renderCustomHeader() {
  return h( 
    "div",
    {
      style: "display: flex; align-items: center; padding: 8px 12px;"
    },
    [
      h(NAvatar, {
        round: true,
        style: "margin-right: 12px;",
        src: "https://07akioni.oss-cn-beijing.aliyuncs.com/demo1.JPG"
      }),
      h("div", null, [
        h("div", null, [
          h(NText, { depth: 2 }, { default: () => "Admin" })
        ]),
        h("div", { style: "font-size: 12px;" }, [
          h(NText, { depth: 3 }, { default: () => "<???>" })
        ])
      ])
    ]
  );
}

function handleConfirm() {
  dialog.warning({
    title: 'Confirmation',
    content: 'êtes-vous sûr de déconnecter?',
    positiveText: 'Déconnecter',
    negativeText: 'Annuler',
    onPositiveClick: () => {
      message.success('Déconnexion effectué avec success');
      auth.logout();
      router.push('/login');
    },
    onNegativeClick: () => {
      message.error('Déconnexion annulée');
    },
  });
}

</script>

<style scoped>
.space {
  padding: 0;
}

.space1 {
  width: 100px;
  margin-right: 30px;
}

.icon {
  right: 35px;
}

.logoImg {
  width: 180px;
}

.button {
  padding: 0;
  border: none;
  background: none;
}

</style>
