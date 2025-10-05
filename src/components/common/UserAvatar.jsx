'use client';

import React from 'react';
import { Avatar, Badge } from '@mui/material';
import { AdminPanelSettings } from '@mui/icons-material';
import { obtenerIniciales, generarColorAvatar } from '@/utils/helpers';

export const UserAvatar = ({ 
  nombre, 
  esAdmin = false, 
  size = 40,
  showAdminBadge = true 
}) => {
  const iniciales = obtenerIniciales(nombre);
  const color = generarColorAvatar(nombre);

  const avatar = (
    <Avatar
      sx={{
        width: size,
        height: size,
        bgcolor: color,
        fontWeight: 600,
        fontSize: size / 2.5,
      }}
    >
      {iniciales}
    </Avatar>
  );

  if (esAdmin && showAdminBadge) {
    return (
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <AdminPanelSettings
            sx={{
              width: size / 2.5,
              height: size / 2.5,
              bgcolor: '#f59e0b',
              color: 'white',
              borderRadius: '50%',
              p: 0.3,
              border: '2px solid white',
            }}
          />
        }
      >
        {avatar}
      </Badge>
    );
  }

  return avatar;
};

