import express from 'express';
import cors from 'cors';

import { authRouter } from './routes/auth.ts';
import { userRouter } from './routes/compte.ts';
import { materialRouter } from './routes/material.ts';
import { missionRouter } from './routes/mission.ts';
import { atelierRouter } from './routes/aterlier.ts';
import { employeRouter } from './routes/employe.ts';
import { projetRouter } from './routes/projet.ts';
import { fonctionRouter } from './routes/fonction.ts';
import { equipeRouter } from './routes/equipe.ts';
import { wilayaRouter } from './routes/wilaya.ts';
import { typeMaterielRouter } from './routes/typeMateriel.ts';
import { rapportRouter } from './routes/rapport.ts';
import { evenementRouter } from './routes/evenement.ts';
import { statistiquesRouter } from './routes/statistiques.ts';
import { Datacraft } from './database/datacraft.ts';

import { consommationRoute } from './routes/consommation.ts';
import cron from 'node-cron';
import { createClient } from '@clickhouse/client';
const warehouse = createClient();

const datacraft = Datacraft();
datacraft.defineRule({
  pattern: {
    titre: 'string',
    quantite: 'number',
    coutTotal: 'number',
    projet: { nom: 'string', chantier: 'string' },
  },
  map: (o: any) => ({
    ressource: o.titre,
    quantite: o.quantite,
    coutTotal: o.coutTotal,
    projet: o.projet.nom,
    chantier: o.projet.chantier,
  }),
});

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', authRouter);
app.use('/comptes', userRouter);
app.use('/material', materialRouter);
app.use('/missions', missionRouter);
app.use('/atelier', atelierRouter);
app.use('/employes', employeRouter);
app.use('/projets', projetRouter);
app.use('/rapports', rapportRouter);
app.use('/fonction', fonctionRouter);
app.use('/equipes', equipeRouter);
app.use('/wilaya', wilayaRouter);
app.use('/consommation', consommationRoute);
app.use('/evenement', evenementRouter);
app.use('/statistiques', statistiquesRouter);

// cron.schedule('0-59 * * * *', async () => {
//   const consommationCollection = mongo.db().collection('consommation');
//   try {
//     //get recent added data from mongodb
//     console.log('Extracting ...');
//     const consommations = await consommationCollection.find().toArray();

//     //transform the data
//     console.log('Transforming ...');
//     const charges = datacraft.transformProcess(consommations);
//     console.log(charges);

//     //load to data warehouse
//     console.log('Loading ...');
//     if (charges.length > 0)
//       await warehouse.insert({
//         table: 'charges',
//         values: charges,
//         format: 'JSONEachRow',
//       });
//   } catch (e) {
//     console.log(e);
//   } finally {
//     await consommationCollection.deleteMany();
//   }
// });
app.use('/typeMateriel', typeMaterielRouter);

app.listen(3000, () => console.log('listening at port 3000...'));
