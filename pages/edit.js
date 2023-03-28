import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { StyledLoadingButton } from '../styles/styledComponentProvider';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Edit() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [originalThumbnail, setOriginalThumbnail] = useState('');
  const [newThumbnail, setNewThumbnail] = useState('');
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState('');

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

  const handleSubmit = async () => {
    if (!name || !description || !newThumbnail) {
      setIsSnackbarOpen(true);
      setSnackbarType('error');
      return;
    }
    try {
      setIsSubmitLoading(true);
      await fetch('/api/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          name,
          description,
          newThumbnail,
        }),
      });
      setIsSubmitLoading(false);
      setIsSnackbarOpen(true);
      setSnackbarType('edit');
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleteLoading(true);
      await fetch('/api/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ characterId: id }),
      });
      setIsDeleteLoading(false);
      setIsSnackbarOpen(true);
      setSnackbarType('delete');
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setIsSnackbarOpen(false);
  };

  const getMessage = () => {
    switch (snackbarType) {
      case 'error':
        return 'Input fields must not be empty.';
      case 'edit':
        return 'Character successfully edited!';
      case 'delete':
        return 'Character successfully deleted.';
    }
  };

  return (
    <div className='Header Main-header'>
      <Image
        src={'/marvelLogo.jpeg'}
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
          message={getMessage()}
          onClose={closeSnackbar}
          autoHideDuration={3000}>
          <Alert
            onClose={closeSnackbar}
            severity={snackbarType === 'error' ? 'error' : 'success'}>
            {getMessage()}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
