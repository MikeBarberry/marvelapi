import { ObjectId } from 'mongodb';

import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;

    const db = client.db('marvel-api');
    const response = await db.collection('heroes').find({}).toArray();

    for (let idx = 0; idx < response.length; idx++) {
      const character = response[idx];
      response[idx] = {
        _id: ObjectId(character._id).toString(),
        name: character.name,
        description: character.description,
        thumbnail: character.thumbnail,
      };
    }

    res.status(200).end(JSON.stringify(response));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
}
