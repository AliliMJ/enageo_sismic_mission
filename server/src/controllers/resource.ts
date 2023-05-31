import { Response, Request } from 'express';
import mongo from '../utils/mongodb';

export const insertConsommation = async (req: Request, res: Response) => {
  const data = req.body;
  console.log(data);
  try {
    const consommationCollection = mongo.db().collection('consommation');
    const consommation = await consommationCollection.insertMany(data);

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
  console.log(req.body.query);
  try {
    const resourcesCollection = mongo.db().collection('resources');
    const resources = await resourcesCollection.find(req.body.query).toArray();

    return res.status(200).json(resources);
  } catch {
    res
      .status(500)
      .json({ err: 'Problème lors de la collection des ressources' });
  }
};
