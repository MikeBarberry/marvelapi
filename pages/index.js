import { useState, useEffect } from 'react';
import Image from 'next/image';

import { StyledLink } from '../styles/styledComponentProvider';
import CharacterCard from '../components/CharacterCard';

export default function Home() {
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
