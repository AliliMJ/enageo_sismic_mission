import { Response, Request } from 'express';
import mongo from '../utils/mongodb';

export const addResourceToProject = async (req: Request, res: Response) => {
  const resource = req.body;

  try {
    const stockCollection = mongo.db().collection('stock');
    const result = await stockCollection.updateOne(
      { resource: resource.resource },
      { $set: resource },
      { upsert: true }
    );

    res.status(201).json(result);
  } catch {
    res.status(500).json({ err: 'Could not insert resource to stock' });
  }
};

export const insertConsommation = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const consommationCollection = mongo.db().collection('consommation');
    const consommation = await consommationCollection.insertOne(data);

    res.status(201).json(consommation);
  } catch {
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
