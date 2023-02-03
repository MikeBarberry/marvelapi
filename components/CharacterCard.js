import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const characterImageStyle = {
  justifySelf: 'center',
  height: 'auto',
  maxHeight: '250px',
  width: 'auto',
  maxWidth: '250px',
  borderRadius: '15px',
};

function CharacterImage({ thumbnail, name, toggleHidden }) {
  return (
    <div
      onClick={toggleHidden}
      className='hero-image-wrapper'>
      <Image
        src={thumbnail}
        alt={name}
        width={250}
        height={250}
        style={characterImageStyle}
      />
    </div>
  );
}

export default function CharacterCard({ character, isHidden, toggleHidden }) {
  const { _id, name, thumbnail, description } = character;
  const [editButtonClicked, setEditButtonClicked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem(
      'characterInfo',
      JSON.stringify({ _id, name, thumbnail, description })
    );
  }, [editButtonClicked]);

  return (
    <div
      className='card'
      key={_id}>
      <h2>{name}</h2>
      <CharacterImage
        thumbnail={thumbnail}
        name={name}
        toggleHidden={toggleHidden}
      />
      {isHidden ? null : <p className='description'>{description}</p>}
      <button
        className='button'
        onClick={() => {
          setEditButtonClicked(true);
          router.push('/edit');
        }}>
        Edit
      </button>
    </div>
  );
}
