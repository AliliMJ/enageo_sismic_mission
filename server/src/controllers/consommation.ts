import { Response, Request } from 'express';
import mongo from '../utils/mongodb';

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
