import { ERole } from '@/utils/constants/roles.enum';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { RoleChip } from '../atoms/RoleChip';
import { User } from '@/domain/user';

interface RoleBoxProps {
  gyUser: User;
}

export default function RoleBox({ gyUser }: RoleBoxProps) {
  return (
    <Box sx={{ mt: '24px' }}>
      <Typography variant="h6" sx={{ mb: '8px', fontWeight: 'bold' }}>
        Roles
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {gyUser.roles?.map((role) => (
          <RoleChip key={role} role={role as ERole} />
        ))}
      </Box>
    </Box>
  );
}
