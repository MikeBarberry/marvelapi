import { useState } from 'react';
import Image from 'next/image';
import { ObjectId } from 'mongodb';

import clientPromise from '../lib/mongodb';

import { StyledLink } from '../styles/styledComponentProvider';
import CharacterCard from '../components/CharacterCard';

export async function getServerSideProps() {
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

  return {
    props: {
      characters: response,
    },
  };
}

export default function Home({ characters }) {
  const [isHidden, setIsHidden] = useState(true);

  const toggleHidden = () => {
    setIsHidden((prevState) => !prevState);
  };

  return (
    <div className='Header Main-header'>
      <Image
        src={'/marvelLogo.jpeg'}
        alt='Marvel Logo'
        width={680}
        height={180}
      />
      <StyledLink href='/add'>Add</StyledLink>
      <div className='hero-list'>
        {characters.map((character) => (
          <CharacterCard
            key={character.name}
            character={character}
            toggleHidden={toggleHidden}
            isHidden={isHidden}
          />
        ))}
      </div>
    </div>
  );
}
