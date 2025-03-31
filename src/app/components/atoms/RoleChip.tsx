import { ERole } from '@/utils/constants/roles.enum';
import { lexendFont } from '@/utils/fonts';
import { Chip } from '@mui/material';
import React from 'react';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import RoleTheme from '@/utils/functions/RoleTheme';

interface RoleChipProps {
  role: ERole;
}

export function RoleChip({ role }: RoleChipProps) {
  return (
    <Chip
      icon={<Brightness1Icon />}
      label={role}
      color="primary"
      variant="outlined"
      size="medium"
      sx={{
        marginBottom: '8px',
        marginRight: '8px',
        border: '2px solid',
        padding: '5px',
        fontWeight: 700,
        fontFamily: lexendFont.style.fontFamily,
        ...RoleTheme(role),
      }}
    />
  );
}
