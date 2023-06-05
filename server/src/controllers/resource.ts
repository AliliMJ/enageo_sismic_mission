import { Response, Request } from 'express';
import mongo from '../utils/mongodb';
import { ObjectId } from 'mongodb';
import { Resource, createConsumption } from '../database/resource';
export const addResourceToProject = async (req: Request, res: Response) => {
  const resource = req.body;

  try {
    const stockCollection = mongo.db().collection('stock');
    await stockCollection.updateOne(
      { resource: resource.resource },
      { $set: resource },
      { upsert: true }
    );
    const result = await stockCollection.findOne({
      resource: resource.resource,
    });

    res.status(201).json(result);
  } catch {
    res.status(500).json({ err: 'Could not insert resource to stock' });
  }
};
const nomsDesMois = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

export const insertConsommation = async (req: Request, res: Response) => {
  const { data, project } = req.body;
  const date = new Date();
  const numMois = date.getMonth();

  const mois = nomsDesMois[numMois];
  const annee = date.getFullYear();
  const resource = new Resource(data);

  try {
    const c = createConsumption(resource);
    const consommationCollection = mongo.db().collection('consommation');
    const consommation = await consommationCollection.insertOne({
      ...c,
      chantier: project.codeMission,
      projet: project.nom,
      mois,
      annee,
    });

    //update stock
    const stockCollection = mongo.db().collection('stock');
    const resourceInStock = await stockCollection.findOne({
      _id: new ObjectId(data._id),
    });

    if (resourceInStock != null) {
      Object.keys(data.stock).forEach((k) => {
        if (data.stock[k] > 0)
          resourceInStock.stock[k] = resourceInStock.stock[k] - data.stock[k];
      });
      //console.log('after modification', resourceInStock.stock);
      await stockCollection.updateOne(
        { _id: new ObjectId(data._id) },
        { $set: { stock: resourceInStock.stock } }
      );
    }

    res.status(201).json(consommation);
  } catch (e) {
    console.log(e);
    res.status(500).json({ err: 'Could not insert consommation' });
  }
};

export const createResource = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const resourcesCollection = mongo.db().collection('resources');
    const resource = await resourcesCollection.insertOne(data);

    res.status(201).json(resource);
  } catch {
    res.status(500).json({ err: 'Could not insert consommation' });
  }
};

export const getResources = async (req: Request, res: Response) => {
  try {
    const query = req.body.query;
    console.log(query);
    const resourcesCollection = mongo.db().collection('resources');
    const resources = await resourcesCollection.find(query).toArray();

    return res.status(200).json(resources);
  } catch {
    res
      .status(500)
      .json({ err: 'Problème lors de la collection des ressources' });
  }
};

export const getStock = async (req: Request, res: Response) => {
  try {
    const idProjet = Number(req.params.idProjet);
    const resourcesCollection = mongo.db().collection('stock');
    const resources = await resourcesCollection
      .find({ idProjet: idProjet })
      .toArray();

    return res.status(200).json(resources);
  } catch {
    res
      .status(500)
      .json({ err: 'Problème lors de la collection des ressources' });
  }
};

export const getStockByResource = async (req: Request, res: Response) => {
  try {
    const idProjet = Number(req.params.idProjet);
    const idResource = req.params.idResource;
    console.log(idProjet, idResource);
    const resourcesCollection = mongo.db().collection('stock');
    const resources = await resourcesCollection.findOne({
      idProjet: idProjet,
      resource: idResource,
    });

    return res.status(200).json(resources);
  } catch {
    res.status(500).json({ err: 'Problème lors de la collection du stock' });
  }
};

export const getConsumption = async (req: Request, res: Response) => {
  try {
    const consumptionCollection = mongo.db().collection('consommation');
    const consommations = await consumptionCollection.find().toArray();

    return res.status(200).json(consommations);
  } catch {
    res
      .status(500)
      .json({ err: 'Problème lors de la collection des consommations' });
  }
};
