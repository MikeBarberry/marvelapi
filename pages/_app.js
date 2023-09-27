import Head from 'next/head';

import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';

import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Marvel Characters</title>
      </Head>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '100%',
        }}>
        <Component {...pageProps} />
        <Box
          component='footer'
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '5px',
            backgroundColor: '#e04b52',
            height: '200px',
          }}>
          <Box
            component='p'
            sx={{ color: 'white', fontSize: '22px' }}>
            Built and maintained with
          </Box>
          <FavoriteIcon sx={{ color: 'white' }} />
          <Box
            component='p'
            sx={{ color: 'white', fontSize: '22px' }}>
            by
          </Box>
          <Box
            component='a'
            sx={{ textDecoration: 'none', color: 'white', fontSize: '22px' }}
            href='https://github.com/MikeBarberry'
            target='_blank'>
            Mike Barberry
          </Box>
        </Box>
      </Box>
    </>
  );
}
