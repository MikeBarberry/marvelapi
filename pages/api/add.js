import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const newCharacter = req.body;

  try {
    const client = await clientPromise;
    const db = client.db('marvel-api');
    await db.collection('heroes').insertOne(newCharacter);
    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
}
