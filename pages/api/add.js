import clientPromise from '../../lib/mongodb';

/**
 * @param {Object} newCharacter
 * @param {string} newCharacter.name
 * @param {string} newCharacter.description
 * @param {string} newCharacter.thumbnail
 */
export default async function handler(req, res) {
  const newCharacter = req.body;

  try {
    const client = await clientPromise;
    const db = client.db('marvel-api');
    await db.collection('heroes').insertOne(newCharacter);
    res.status(200).json('Character successfully added');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
}
