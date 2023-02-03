import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

export default function LoadIndicator() {
  return (
    <div className='loader'>
      <ThreeDots
        ariaLabel='three-dots-loading'
        color='white'
        height='100'
        width='100'
      />
    </div>
  );
}
