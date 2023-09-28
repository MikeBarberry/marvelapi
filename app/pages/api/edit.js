import { ObjectId } from 'mongodb';

import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const characterInfo = req.body;
  const { id, name, description, thumbnail } = characterInfo;

  try {
    const client = await clientPromise;
    const db = client.db('marvel-api');
    const filter = { _id: ObjectId(id) };
    const update = {
      $set: {
        name,
        description,
        thumbnail,
      },
    };
    await db.collection('heroes').updateOne(filter, update);
    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
}
