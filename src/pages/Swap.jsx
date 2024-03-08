import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../components/Navbars/MainNavbar';

const Swap = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgrFOqG6PjPhS0sFukUOQzE4GYBe8e7Rw56Q&usqp=CAU')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100vw', // Adjust according to your layout needs
          height: '100vh', // Adjust according to your layout needs
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white', // Optionally change text color for better contrast
        }}
      >
        Swap
      </Box>
    </>
  );
};

export default Swap;
