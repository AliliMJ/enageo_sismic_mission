<template>
  <!-- <n-loading-bar-provider>
  <n-message-provider>
    <n-notification-provider>
      <n-dialog-provider> -->

  <NSpace justify="space-between" class="space">
    <img class="logoImg" src="@/assets/ENAGEOTEXT.png" alt="erreur" />
    <NSpace justify="space-between" class="space1">
      <NButton @click="showEvenementModal=!showEvenementModal" class="notification-btn" type="warning" v-if="auth.user?.role === Role.ChefTerrain"
        >signaler un evenement
        <template #icon>
          <NIcon><alert /></NIcon>
        </template>
      </NButton>
      <NSpace class="space-drop" justify="space-between">
        <n-popover placement="bottom" trigger="click">
          <template #trigger>
            <n-button text style="font-size: 30px">
              <n-badge :value="numberNotReaded" processing show-zero>
                <n-icon>
                  <notification />
                </n-icon>
              </n-badge>
            </n-button>
          </template>
          <NSpace>
            <NSpace vertical>
              <NSpace justify="end">
                <NText @click="readAllNotifications" class="readButton">
                  marquer tous comme lu</NText
                >
              </NSpace>

              <NSpace
                style="
                  background-color: rgb(255, 255, 255);
                  width: 20vw;
                  padding: 5px;
                  position: relative;
                "
                v-for="evenement in evenements"
                key="evenements.key"
              >
                <NSpace vertical style="width:20vw;">
                  <NText style="font-weight: bold">{{ evenement.titre }}</NText>
                  <NText style="font-size: 12px">
                    {{ evenement.date }} à {{ evenement.Heure }}</NText
                  >
                  <NText v-if="evenement.readed === false" class="dot">•</NText>
                  <NSpace justify="end">
                    <NText @click="seeDetails(evenement.id)" class="see-text">voir plus...</NText>
                  </NSpace>
                </NSpace>
              </NSpace>
            </NSpace>
          </NSpace>
        </n-popover>

        <n-dropdown
          trigger="hover"
          :options="options"
          @select="handleSelect"
          style="width: 180px"
        >
          <n-button text style="font-size: 30px">
            <n-icon>
              <Persone />
            </n-icon>
          </n-button>
        </n-dropdown>
      </NSpace>
    </NSpace>
  </NSpace>
  <!-- 
   </n-dialog-provider>
    </n-notification-provider>
  </n-message-provider>
</n-loading-bar-provider> -->

<Modal
    :showModal="showEvenementModal"
    :idProjet="idProjetRef"
    :nb="evenements.length"
    @cancel="showEvenementModal = false"
    @confirm="handleConfirmEvent"
  />

</template>

<script setup>
import {
  NSpace,
  NIcon,
  NImage,
  NButton,
  NDropdown,
  useMessage,
  NAvatar,
  NText,
  useDialog,
  NPopover,
  NBadge,
  NDivider,
} from "naive-ui";
import {
  PersonCircleOutline as Persone,
  NotificationsOutline as notification,
  PersonCircleOutline as UserIcon,
  LogOutOutline as LogoutIcon,
  SettingsOutline as Settings,
  PersonOutline as Person,
  AlertCircleOutline as alert,
} from "@vicons/ionicons5";
import { h } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../../stores/authentication";
import { renderIcon, renderMenuItem } from "../../utils/render";
import axios from "axios";
import { ref } from "vue";
import { Role } from '../../enums';
import Modal from "common/addEvenementModal.vue";
//import { ref, onMounted, computed, watch } from 'vue';

const router = useRouter();
const auth = useAuth();
const dialog = useDialog();
const message = useMessage();
// const notificationVue = useNotification();

const showEvenementModal = ref(false);

const evenements = ref([]);

const employe = (await axios.get("http://localhost:3000/employes/" + auth.user.id)).data;
const projet = (
  await axios.get(
    `http://localhost:3000/projets/projetByMission/${employe.codeMission}`
  )
).data;
evenements.value = (await axios.get(`http://localhost:3000/evenement/${projet.idProjet}`)).data;

const numberNotReaded = ref(0);
const idProjetRef = ref(evenements.value[0].idProjet);

evenements.value.forEach((item, index, arr) => {
  arr[index].date = new Date(item.date).toLocaleDateString("fr");

  if (arr[index].readed === false) {
    numberNotReaded.value++;
  }
});

// onMounted(async () => {
//   if(numberNotReaded.value>0){
//     notificationVue.create({
//           title: "Wouldn't it be Nice",
//           description: "From the Beach Boys",
//           content: `abdelkrim`,
//           meta: "2019-5-27 15:11",
//           duration: 2500,
//           keepAliveOnHover: true
// });
// }
// });

const options = [
  {
    key: "header",
    type: "render",
    render: renderCustomHeader,
  },
  {
    key: "header-divider",
    type: "divider",
    // icon: renderIcon(Persone),
  },
  {
    label: renderMenuItem("Profile", "profile"),
    key: "profile",
    icon: renderIcon(Person),
  },
  {
    label: renderMenuItem("Préférences", "preference"),
    key: "settings",
    icon: renderIcon(Settings),
  },
  {
    label: "se deconnecter",
    key: "logout",
    icon: renderIcon(LogoutIcon),
  },
];

function handleSelect(key) {
  if (String(key) == "logout") {
    handleConfirm();
  }
}

function seeDetails(id){
  console.log(id);
}

function renderCustomHeader() {
  return h(
    "div",
    {
      style: "display: flex; align-items: center; padding: 8px 12px;",
    },
    [
      h(NAvatar, {
        round: true,
        style: "margin-right: 12px;",
        src: "https://07akioni.oss-cn-beijing.aliyuncs.com/demo1.JPG",
      }),
      h("div", null, [
        h("div", null, [
          h(NText, { depth: 2 }, { default: () => auth.user.username }),
        ]),
        h("div", { style: "font-size: 12px;" }, [
          h(NText, { depth: 3 }, { default: () => auth.user.role }),
        ]),
      ]),
    ]
  );
}

function handleConfirm() {
  dialog.warning({
    title: "Confirmation",
    content: "êtes-vous sûr de déconnecter?",
    positiveText: "Déconnecter",
    negativeText: "Annuler",
    onPositiveClick: () => {
      message.success("Déconnexion effectué avec success");
      auth.logout();
      router.push("/login");
    },
    onNegativeClick: () => {
      message.error("Déconnexion annulée");
    },
  });
}

async function handleConfirmEvent(event) {
  evenements.value.unshift(event);
  numberNotReaded.value++;
  showEvenementModal.value = false;

  const req = {
    titre : event.titre,
    type : event.type,
    date : new Date(event.date),
    Heure : event.Heure,
    description : event.description
  }

  console.log(req.date);

  await axios.post(`http://localhost:3000/evenement/insertEvenement/${projet.idProjet}`,req);

}

 async function readAllNotifications() {
  console.log("readed");
  evenements.value.forEach((item, index, arr) => {
    arr[index].readed = true;
  });

  await axios.put(`http://localhost:3000/evenement/setTrue/${projet.idProjet}`);
  numberNotReaded.value=0;
  //   notificationVue.create({
  //           title: "Wouldn't it be Nice",
  //           description: "From the Beach Boys",
  //           content: `abdelkrim`,
  //           meta: "2019-5-27 15:11",
  //           duration: 2500,
  //           keepAliveOnHover: true
  // });
  // notificationVue.warning({
  //   content: "What to say?",
  //   meta: "I don't know",
  //   duration: 2500,
  //   keepAliveOnHover: true,
  // });
}
</script>

<style scoped>
.space {
  padding: 0;
}

.space1 {
  width: 45vw;
  margin-right: 30px;
}

.icon {
  right: 35px;
}

.logoImg {
  width: 180px;
}

.logoImg:hover {
  cursor: pointer;
}

.button {
  padding: 0;
  border: none;
  background: none;
}

.readButton {
  text-decoration: underline;
  cursor: pointer;
}

.dot {
  position: absolute;
  right: -5px;
  top: -25px;
  font-size: 30px;
  color: red;
}

.space-drop {
  width: 10vw;
}

.see-text {
  cursor : pointer;
  /* text-decoration:underline; */
  font-size:10px;
}
</style>
