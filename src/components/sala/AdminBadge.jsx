'use client';

import React from 'react';
import { Chip } from '@mui/material';
import { AdminPanelSettings } from '@mui/icons-material';

export const AdminBadge = ({ size = 'small' }) => {
  return (
    <Chip
      icon={<AdminPanelSettings />}
      label="Admin"
      size={size}
      sx={{
        bgcolor: '#f59e0b',
        color: 'white',
        fontWeight: 600,
        '& .MuiChip-icon': {
          color: 'white',
        },
      }}
    />
  );
};