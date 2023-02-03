import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Snackbar from '@mui/material/Snackbar';

import { apiUri, marvelLogo } from '../lib/utils';
import timeout from '../lib/timeout';
import { StyledLoadingButton } from '../styles/styledComponentProvider';

export default function Add() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const router = useRouter();

  async function handleSubmit() {
    const characterInfo = {
      name,
      description,
      thumbnail,
    };
    if (!name || !description || !thumbnail) {
      setSnackbarMessage('Input fields must not be empty.');
      setIsSnackbarOpen(true);
      await timeout();
      return;
    }
    try {
      setIsLoading(true);
      const res = await fetch(`${apiUri}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(characterInfo),
      });
      const message = await res.json();
      setSnackbarMessage(message);
      setIsSnackbarOpen(true);
      setIsLoading(false);
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  }

  function closeSnackbar() {
    setSnackbarMessage('');
    setIsSnackbarOpen(false);
  }

  return (
    <div className='Header Main-header'>
      <Image
        src={marvelLogo}
        alt='Marvel Logo'
        width={680}
        height={180}
      />
      <div className='add-container'>
        <label>
          Name:
          <input
            type='text'
            placeholder='Enter character name'
            minLength='3'
            maxLength='16'
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type='text'
            placeholder='Enter a description of this character'
            minLength='5'
            maxLength='120'
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </label>
        <label>
          Thumbnail:
          <input
            type='text'
            placeholder='Enter URL for character image'
            minLength='6'
            onChange={(e) => setThumbnail(e.target.value)}
            value={thumbnail}
            required
          />
        </label>
        <StyledLoadingButton
          color='primary'
          loading={isLoading}
          onClick={handleSubmit}>
          Submit
        </StyledLoadingButton>
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={2000}
          message={snackbarMessage}
          onClose={closeSnackbar}
        />
      </div>
    </div>
  );
}
