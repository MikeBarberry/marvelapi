import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('marvel-api');
    const characters = await db.collection('heroes').find({}).toArray();
    res.status(200).json(characters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
}
