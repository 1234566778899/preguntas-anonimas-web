'use client';

import React from 'react';
import { Container, Box } from '@mui/material';

export const PageContainer = ({ 
  children, 
  maxWidth = 'lg',
  disableGutters = false,
  sx = {} 
}) => {
  return (
    <Container 
      maxWidth={maxWidth}
      disableGutters={disableGutters}
      sx={{
        minHeight: 'calc(100vh - 200px)',
        py: { xs: 2, sm: 4 },
        ...sx
      }}
    >
      <Box sx={{ width: '100%' }}>
        {children}
      </Box>
    </Container>
  );
};