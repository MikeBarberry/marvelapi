import { useReducer } from 'react';
import { useRouter } from 'next/router';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { StyledLoadingButton } from '../styles/styledComponentProvider';
import { API_URL, IMAGE_BUCKET } from '../lib/api';

const reducer = (state, action) => {
  switch (action.type) {
    case 'setName': {
      return {
        ...state,
        name: action.name,
      };
    }
    case 'setThumbnail': {
      return {
        ...state,
        thumbnail: action.thumbnail,
      };
    }
    case 'setDescription': {
      return {
        ...state,
        description: action.description,
      };
    }
    case 'setIsLoading': {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case 'setIsSnackbarOpen': {
      return {
        ...state,
        isSnackbarOpen: action.isSnackbarOpen,
      };
    }
    case 'setSnackbarMessage': {
      return {
        ...state,
        snackbarMessage: action.snackbarMessage,
      };
    }
  }
  throw Error('Unknown action: ' + action.type);
};

const initialState = {
  name: '',
  thumbnail: '',
  description: '',
  isLoading: false,
  isSnackbarOpen: false,
  snackbarMessage: '',
};

export default function Add() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  async function handleSubmit() {
    if (!state.name || !state.description || !state.thumbnail) {
      dispatch({ type: 'setIsSnackbarOpen', isSnackbarOpen: true });
      dispatch({ type: 'setSnackbarMessage', snackbarMessage: 'error' });
      return;
    }
    try {
      dispatch({ type: 'setIsLoading', isLoading: true });
      await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: state.name,
          description: state.description,
          thumbnail: state.thumbnail,
        }),
      });
      dispatch({ type: 'setIsLoading', isLoading: false });
      dispatch({ type: 'setIsSnackbarOpen', isSnackbarOpen: true });
      dispatch({ type: 'setSnackbarMessage', snackbarMessage: 'success' });
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  }

  function closeSnackbar(event, reason) {
    if (reason === 'clickaway') return;
    dispatch({ type: 'setIsSnackbarOpen', isSnackbarOpen: false });
  }

  return (
    <div className='Header Main-header'>
      <img
        src={`${IMAGE_BUCKET}/marvelLogo.jpeg`}
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
            onChange={(e) =>
              dispatch({ type: 'setName', name: e.target.value })
            }
            value={state.name}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type='text'
            placeholder='Enter a description for this character'
            minLength='5'
            maxLength='120'
            onChange={(e) =>
              dispatch({ type: 'setDescription', description: e.target.value })
            }
            value={state.description}
            required
          />
        </label>
        <label>
          Thumbnail:
          <input
            type='text'
            placeholder='Enter URL to character image'
            minLength='6'
            onChange={(e) =>
              dispatch({ type: 'setThumbnail', thumbnail: e.target.value })
            }
            value={state.thumbnail}
            required
          />
        </label>
        <StyledLoadingButton
          color='primary'
          loading={state.isLoading}
          onClick={handleSubmit}>
          Submit
        </StyledLoadingButton>
        <Snackbar
          open={state.isSnackbarOpen}
          autoHideDuration={2000}
          onClose={closeSnackbar}>
          <Alert
            onClose={closeSnackbar}
            severity={state.snackbarMessage === 'error' ? 'error' : 'success'}>
            {state.snackbarMessage === 'error'
              ? 'Input fields must not be empty.'
              : 'Character successfully added!'}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
