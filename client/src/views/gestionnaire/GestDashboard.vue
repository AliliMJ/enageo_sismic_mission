<template>
  <NSpace style="margin-bottom: 15px; margin-left: 40px">
    <NText class="page-header">Tableau de bord de gestionnaire</NText>
  </NSpace>
  <NGrid
    :cols="2"
    x-gap="15"
    y-gap="15"
    item-responsive
    style="width: 99%; padding-left: 5px"
  >
    <n-grid-item span="0:2 1000:1">
      <NGrid x-gap="10" y-gap="10" :cols="2" class="grid1">
        <n-grid-item :span="1">
          <div class="testCard">
            <div class="row1">
              <div class="card-title">Les employés</div>
              <div class="card-number">
                {{ gestStat.nbEmployes }}
              </div>
            </div>
            <div class="row2">
              <n-icon class="card-icon">
                <bag />
              </n-icon>
              <n-icon>
                <chart style="color: orange" />
              </n-icon>
            </div>
          </div>
        </n-grid-item>

        <n-grid-item :span="1">
          <div class="testCard">
            <div class="row1">
              <div class="card-title">
                coût réparation ce mois
              </div>
              <div class="card-number">
                <NText v-if="gestStat.coutReparationByMonth.length!=0">
                  {{ (coutReparationInterne[coutReparationInterne.length-1].cout)/1000 }}k (DA)
                </NText>
                <NText v-if="gestStat.coutReparationExterneByMonth.length!=0">
                  {{ (coutReparationExterne[coutReparationExterne.length-1].cout)/1000 }}k (DA)
                </NText>
                <NText v-if="gestStat.coutReparationByMonth.length!=0&&gestStat.coutReparationExterneByMonth.length!=0">
                  {{ (coutReparationInterne[coutReparationInterne.length-1].cout+coutReparationExterne[coutReparationExterne.length-1].cout)/1000 }}k (DA)
                </NText>
                <NText v-if="gestStat.coutReparationByMonth.length==0&&gestStat.coutReparationExterneByMonth.length==0">
                 0k (DA)
                </NText>
              </div>
            </div>
            <div class="row2">
              <n-icon class="card-icon">
                <cash />
              </n-icon>
              <n-icon>
                <chart style="color: orange" />
              </n-icon>
            </div>
          </div>
        </n-grid-item>
        
        <n-grid-item :span="4">
          <NSpace vertical class="type-pie">
            <Pie :data="pieData1" :options="pieOptions1" />
          </NSpace>
        </n-grid-item>
        <n-grid-item :span="4">
          <NSpace vertical class="bar">
            <Bar :data="barData1" :options="barOptions" />
          </NSpace>
        </n-grid-item>
      </NGrid>
    </n-grid-item>

    <n-grid-item span="0:2 1000:1">
      <NGrid x-gap="10" y-gap="10" :cols="3">
        <n-grid-item :span="1">
          <div class="testCard">
            <div class="row1">
              <div class="card-title">les véhicules</div>
              <div class="card-number">
                {{ gestStat.NbTotalMateriel }}
              </div>
            </div>
            <div class="row2">
              <n-icon class="card-icon">
                <bus />
              </n-icon>
              <n-icon>
                <chart style="color: orange" />
              </n-icon>
            </div>
          </div>
        </n-grid-item>

        <n-grid-item :span="1">
          <div class="testCard">
            <div class="row1">
              <div class="card-title">En panne</div>
              <div class="card-number">
                {{ gestStat.nbMaterielEnPanne }}
              </div>
            </div>
            <div class="row2">
              <n-icon class="card-icon">
                <build />
              </n-icon>
              <n-icon>
                <chart style="color: orange" />
              </n-icon>
            </div>
          </div>
        </n-grid-item>
        <n-grid-item :span="1">
          <div class="testCard">
            <div class="row1">
              <div class="card-title">En réparation</div>
              <div class="card-number">
                <n-tooltip trigger="hover">
                <template #trigger>
                  {{ gestStat.nbMaterielEnReparation }} 
                </template>
                en réparation Interne
              </n-tooltip>
                <n-tooltip trigger="hover">
                <template #trigger>
                  ({{ gestStat.nbMaterielEnReparationExterne }})
                </template>
                en réparation Externe
              </n-tooltip>
              </div>
            </div>
            <div class="row2">
              <n-icon class="card-icon">
                <clock />
              </n-icon>
              <n-icon>
                <chart style="color: orange" />
              </n-icon>
            </div>
          </div>
        </n-grid-item>

        <n-grid-item :span="2">
          <NSpace vertical class="type-pie">
            <Pie :data="pieData" :options="pieOptions" />
          </NSpace>
        </n-grid-item>

        <n-grid-item :span="1">
          <NSpace vertical>
            <NSpace>
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-progress
                    type="circle"
                    :color="progressColor1"
                    :percentage="gestStat.pourcentageMateriel"
                    class="progress1"
                  />
                </template>
                pourcentage des véhicules trouvée à l'atelier mécanique ( en
                panne ou bien en réparation)
              </n-tooltip>
            </NSpace>
            <NSpace>
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-progress
                  
                    type="circle"
                    :percentage="gestStat.pourcentageEmployes"
                    class="progress1"
                    :color="progressColor2"
                  />
                </template>
                pourcentage des employés non disponible dans la mission (en
                maladie ou en congé)
              </n-tooltip>
            </NSpace>
          </NSpace>
        </n-grid-item>
        <n-grid-item :span="3">
          <NSpace vertical class="bar">
            <Bar :data="barData" :options="barOptions" />
          </NSpace>
        </n-grid-item>
      </NGrid>
    </n-grid-item>
  </NGrid>
</template>

<script setup>
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Pie, Bar } from 'vue-chartjs';
import axios from 'axios';
import {
  NSpace,
  NGrid,
  NGridItem,
  NIcon,
  NText,
  NProgress,
  NTooltip,
  useNotification,
  NButton,
  useMessage,
} from 'naive-ui';
import {
  PersonOutline as person,
  StatsChart as chart,
  BriefcaseOutline as bag,
  MailOutline as mail,
  BusOutline as bus,
  BuildOutline as build,
  Close as close,
  HourglassOutline as clock,
} from '@vicons/ionicons5';
import {
  Money20Regular as cash
} from '@vicons/fluent';

import { ref, onMounted, h } from 'vue';
import { useAuth } from '../../stores/authentication';

const auth = useAuth();
const message = useMessage();

const gestStat = (
  await axios.get(
    `http://localhost:3000/statistiques/getGestionnaireStatistiques/${auth.employe.codeMission}`
  )
).data;

console.log(''+gestStat)

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement
);

const pieLabelsArray = ref([]);
const pieDataArray = ref([]);

gestStat.nbMatType.forEach((element) => {
  pieLabelsArray.value.push(element.typeM);
});

gestStat.nbMatType.forEach((element) => {
  pieDataArray.value.push(element.nbr);
});

const progressColor1 = ref('green');
const progressColor2 = ref('green');

if (gestStat.pourcentageMateriel == 50) {
  progressColor1.value = 'orange';
} else if (gestStat.pourcentageMateriel > 50) {
  progressColor1.value = 'red';
}

if (gestStat.pourcentageEmployes == 50) {
  progressColor2.value = 'orange';
} else if (gestStat.pourcentageEmployes > 50) {
  progressColor2.value = 'red';
}

/* start employes joined per year */

const employesDates = ref([]);
gestStat.numberEmpByYears.forEach((element) => {
  employesDates.value.push(element.year);
});
const employesDatesData = ref([]);
gestStat.numberEmpByYears.forEach((element) => {
  employesDatesData.value.push(element.nbr);
});

/* end employes joined per year */

/* start employes par fonction */

const employesfonctions = ref([]);
gestStat.NbEmpFonction.forEach((element) => {
  employesfonctions.value.push(element.fonction);
});
const employesNbrData = ref([]);
gestStat.NbEmpFonction.forEach((element) => {
  employesNbrData.value.push(element.nbr);
});

/* end employes par fonction */

/* start employes par etat */

const employesetat = ref([]);
gestStat.nombreEmpEtat.forEach((element) => {
  employesetat.value.push(element.etat);
});
const employesEtatData = ref([]);
gestStat.nombreEmpEtat.forEach((element) => {
  employesEtatData.value.push(element.nb);
});
/* end employes par etat */

/* start employes par annee */

// const employesDates = [];
// employesByYear.forEach((element) => {
//   employesDates.push(element.year);
// });
// const employesDatesData = [];
// employesByYear.forEach((element) => {
//   employesDatesData.push(element.nbr);
// });

/* end employes par annee */


/* start cout reparation par mois */
const coutReparationInterne = ref(gestStat.coutReparationByMonth);
const coutReparationExterne = ref(gestStat.coutReparationExterneByMonth);

// gestStat.coutReparationByMonth.forEach((element) => {
//   employesetat.value.push(element.etat);
// });
/* end cout reparation par mois */

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Distribution des véhicules par type',
      position: 'bottom',
    },
  },
};

const pieData = {
  labels: pieLabelsArray.value,
  datasets: [
    {
      backgroundColor: [
        ' #EC6B56',
        '#FFC154',
        ' #47B39C',
        '#58508D',
        '#003F5C',
      ],
      data: pieDataArray.value,
    },
  ],
};

const pieOptions1 = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Distribution des employés par leur état actual',
      position: 'bottom',
    },
  },
};

const pieData1 = {
  labels: employesetat.value,
  datasets: [
    {
      backgroundColor: [' #F47A1F', '#FDBB2F', '#377B2B', '#7AC142', '#007CC3'],
      data: employesEtatData.value,
    },
  ],
};

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

const barData = {
  labels: employesDates.value,
  datasets: [
    {
      label: 'nombre des employés rejoints par an',
      backgroundColor: ['rgb(54, 162, 235 , 0.2)'],
      borderColor: ['rgb(54, 162, 235)'],
      borderWidth: 1,
      data: employesDatesData.value,
    },
  ],
};

const barData1 = {
  labels: employesfonctions.value,
  datasets: [
    {
      label: 'nombre des employés pa leur fonction',
      backgroundColor: ['rgb(54, 162, 235 , 0.2)'],
      borderColor: ['rgb(54, 162, 235)'],
      borderWidth: 1,
      data: employesNbrData.value,
    },
  ],
};

const notificationVue = useNotification();

onMounted(async () => {
  if (gestStat.pourcentageMateriel > 50) {
    let markAsRead = false;
    const n = notificationVue.create({
      title: "fait attention à l'atelier mécanique",
      content: `Un pourcentage de ${gestStat.pourcentageMateriel}% des véhicules sont trouvés à l'atelier mécanique`,
      meta: new Date().toLocaleDateString('fr'),
      action: () =>
        h(
          NButton,
          {
            text: true,
            type: 'primary',
            onClick: () => {
              markAsRead = true;
              n.destroy();
            },
          },
          {
            default: () => 'marquer comme lu',
          }
        ),
      onClose: () => {
        if (!markAsRead) {
          message.warning('Please mark as read');
          return false;
        }
      },
    });
  }

  if (gestStat.pourcentageEmployes > 50) {
    let markAsRead = false;
    const n = notificationVue.create({
      title: 'fait attention aux employés ',
      content: `Un pourcentage de ${gestStat.pourcentageEmployes}% sont soit en maladie ou bien en congé`,
      meta: new Date().toLocaleDateString('fr'),
      action: () =>
        h(
          NButton,
          {
            text: true,
            type: 'primary',
            onClick: () => {
              markAsRead = true;
              n.destroy();
            },
          },
          {
            default: () => 'marquer comme lu',
          }
        ),
      onClose: () => {
        if (!markAsRead) {
          message.warning('Please mark as read');
          return false;
        }
      },
    });
  }
});
</script>

<style scoped>
.type-pie {
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 8px;
  padding: 5px 10px;
  /* height: 19vw; */
}

.progress1 {
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 8px;
  padding: 15px 38px;
}

.progress2 {
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 8px;
  padding: 15px 38px;
}

.bar {
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 8px;
  padding: 3px 10px;
}

.space1 {
  padding: 0px 2px;
}

.testCard {
  /* width: 265px;  */
  height: 55px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: bold;
  overflow: hidden;
  padding: 10px 8px 10px 8px;
}

.card-icon {
  font-size: 25px;
}

.page-header {
  font-size: 25px;
  font-weight: bold;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.card-title {
  color: rgb(122, 122, 122);
  font-size: 13px;
}

.card-number {
  font-size: 35px;
  margin-top: -10px;
}

.row1 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.row2 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

/* .big-space {
  margin: 0px 5px;
} */
</style>
