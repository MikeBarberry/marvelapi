import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { StyledLoadingButton } from '../styles/styledComponentProvider';
import Snackbar from '@mui/material/Snackbar';

import { apiUri, marvelLogo } from '../lib/utils';
import timeout from '../lib/timeout';

export default function Edit() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [originalThumbnail, setOriginalThumbnail] = useState('');
  const [newThumbnail, setNewThumbnail] = useState('');
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const router = useRouter();

  useEffect(() => {
    const characterInfo = JSON.parse(localStorage.getItem('characterInfo'));
    const { _id, name, description, thumbnail } = characterInfo;
    setId(_id);
    setName(name);
    setDescription(description);
    setOriginalThumbnail(thumbnail);
    setNewThumbnail(thumbnail);
  }, []);

  async function handleSubmit() {
    const updatedCharacterInfo = {
      id,
      name,
      description,
      newThumbnail,
    };
    if (!name || !description || !newThumbnail) {
      setSnackbarMessage('Input fields must not be empty.');
      setIsSnackbarOpen(true);
      await timeout();
      return;
    }
    try {
      setIsSubmitLoading(true);
      const res = await fetch(`${apiUri}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCharacterInfo),
      });
      const message = await res.json();
      setSnackbarMessage(message);
      setIsSnackbarOpen(true);
      setIsSubmitLoading(false);
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete() {
    const characterId = { characterId: id };
    try {
      setIsDeleteLoading(true);
      const res = await fetch(`${apiUri}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(characterId),
      });
      const message = await res.json();
      setSnackbarMessage(message);
      setIsSnackbarOpen(true);
      setIsDeleteLoading(false);
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
      <div
        className='edit-container'
        style={{ backgroundImage: `url(${originalThumbnail})` }}>
        <br />
        <label>
          Name:
          <input
            type='text'
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
            placeholder='Enter URL to character image'
            onChange={(e) => setNewThumbnail(e.target.value)}
            value={newThumbnail}
            required
          />
        </label>
        <StyledLoadingButton
          loading={isSubmitLoading}
          onClick={handleSubmit}>
          Submit
        </StyledLoadingButton>
        <br />
        <StyledLoadingButton
          loading={isDeleteLoading}
          onClick={handleDelete}>
          Delete
        </StyledLoadingButton>
        <Snackbar
          open={isSnackbarOpen}
          message={snackbarMessage}
          onClose={closeSnackbar}
          autoHideDuration={2000}
        />
      </div>
    </div>
  );
}
