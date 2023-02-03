import { ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const { characterId } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db('marvel-api');
    await db.collection('heroes').deleteOne({ _id: ObjectId(characterId) });
    res.status(200).json('Character successfully deleted');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
}
