<template>
  <NSpace justify="space-between" class="space">
    <img
      class="logoImg"
      src="../../assets/ENAGEOTEXT.png"
      alt="erreur"
      @click="imageClick"
    />
    <NSpace justify="space-between" class="space1">
      <NButton
        @click="showEvenementModal = !showEvenementModal"
        type="warning"
        v-if="auth.user?.role === Role.ChefTerrain"
        >signaler un evenement
        <template #icon>
          <NIcon><alert /></NIcon>
        </template>
      </NButton>
      <NSpace v-if="auth.user?.role != Role.ChefTerrain"> </NSpace>
      <NSpace class="space-drop" justify="space-between">
        <n-popover placement="bottom" trigger="click">
          <template #trigger>
            <n-button text style="font-size: 30px">
              <n-badge :value="numberNotReaded" show-zero>
                <n-icon>
                  <notification />
                </n-icon>
              </n-badge>
            </n-button>
          </template>
          <NSpace v-if="evenements.length != 0">
            <NSpace vertical>
              <NSpace justify="end">
                <NText
                  @click="readAllNotifications"
                  class="readButton"
                  v-if="auth.user.role === Role.ChefMision"
                >
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
                <NSpace vertical style="width: 20vw">
                  <NText style="font-weight: bold">{{ evenement.titre }}</NText>
                  <NText style="font-size: 12px">
                    {{ evenement.date }} à {{ evenement.Heure }}</NText
                  >
                  <NText v-if="evenement.readed === false" class="dot">•</NText>
                  <NSpace justify="end">
                    <NText @click="seeDetails(evenement)" class="see-text"
                      >voir plus...</NText
                    >
                  </NSpace>
                  <n-divider style="width: 20vw; margin: 0px" />
                </NSpace>
              </NSpace>
            </NSpace>
          </NSpace>

          <NSpace v-if="evenements.length === 0">
            <n-empty description="il ya pas des notifications">
              <template #icon>
                <n-icon>
                  <check />
                </n-icon>
              </template>
            </n-empty>
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
  <Modal
    :showModal="showEvenementModal"
    :codeMission="mission.codeMission"
    :nb="evenements.length"
    @cancel="showEvenementModal = false"
    @confirm="handleConfirmEvent"
  />
  <DetailModal
    :showModal="showEvenementDetailsModal"
    @close="showEvenementDetailsModal = false"
    :evenement="evenement"
  />
</template>

<script setup>
import {
  NSpace,
  NIcon,
  NButton,
  NDropdown,
  useMessage,
  NAvatar,
  NText,
  useDialog,
  NPopover,
  NBadge,
  NDivider,
  useNotification,
  NEmpty
} from "naive-ui";
import {
  PersonCircleOutline as Persone,
  NotificationsOutline as notification,
  LogOutOutline as LogoutIcon,
  SettingsOutline as Settings,
  PersonOutline as Person,
  AlertCircleOutline as alert,
  CheckboxOutline as check
} from "@vicons/ionicons5";
import { h } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../../stores/authentication";
import { renderIcon, renderMenuItem } from "../../utils/render";
import axios from "axios";
import { ref, onMounted } from "vue";
import { Role } from "../../enums";

import Modal from "../common/AddEvenementModal.vue";
import DetailModal from "../common/NotificationDetailModal.vue";

const router = useRouter();
const auth = useAuth();
const dialog = useDialog();
const message = useMessage();
const notificationVue = useNotification();

const showEvenementModal = ref(false);
const showEvenementDetailsModal = ref(false);

const evenement = ref();

const evenements = ref([]);
const mission = ref();


mission.value = (
  await axios.get(
    `http://localhost:3000/missions/MissionWithEvents/${auth.employe.codeMission}`
  )
).data;


console.log("--->" + mission.value.codeMission);



if(mission.value.Evenements!=null){
evenements.value = mission.value.Evenements ?? [];
}



const numberNotReaded = ref(0);

evenements.value.forEach((item, index, arr) => {
  arr[index].date = new Date(item.date).toLocaleDateString("fr");

  if (arr[index].readed === false) {
    numberNotReaded.value++;
  }
});

onMounted(async () => {
  if (numberNotReaded.value > 0 && auth.user.role === Role.ChefMision) {
    let markAsRead = false;
    const n = notificationVue.create({
      title: "Il y a des nouvelles notifications !!",
      content: `vous avez (${numberNotReaded.value}) nouveaux événements qu'ils ne sont pas encore lus`,
      meta: new Date().toLocaleDateString("fr"),
      action: () =>
        h(
          NButton,
          {
            text: true,
            type: "primary",
            onClick: () => {
              markAsRead = true;
              n.destroy();
            },
          },
          {
            default: () => "marquer comme lu",
          }
        ),
      onClose: () => {
        if (!markAsRead) {
          message.warning("Please mark as read");
          return false;
        }
      },
    });
  }
});

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

function seeDetails(event) {
  evenement.value = event;
  showEvenementDetailsModal.value = true;
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
  const req = {
    titre: event.titre,
    type: event.type,
    date: new Date(event.date),
    Heure: event.Heure,
    description: event.description,
  };
  event.date = new Date(event.date).toLocaleDateString("fr");
  evenements.value.unshift(event);
  numberNotReaded.value++;
  showEvenementModal.value = false;

  console.log("--->" + mission.value.codeMission);

  await axios.post(
    `http://localhost:3000/evenement/insertEvenement/${mission.value.codeMission}`,
    req
  );
}

async function readAllNotifications() {
  evenements.value.forEach((item, index, arr) => {
    arr[index].readed = true;
  });
  numberNotReaded.value = 0;
  await axios.put(
    `http://localhost:3000/evenement/setTrue/${mission.value.codeMission}`
  );
}

function imageClick() {
  router.push("/");
}
</script>

<style scoped>
.space {
  padding: 0;
}

.space1 {
  width: 55vw;
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
  cursor: pointer;
  /* text-decoration:underline; */
  font-size: 10px;
}
</style>
