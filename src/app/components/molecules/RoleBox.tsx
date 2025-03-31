import { ERole } from '@/utils/constants/roles.enum';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { RoleChip } from '../atoms/RoleChip';
import { User } from '@/domain/user';
import { motion } from 'framer-motion';

interface RoleBoxProps {
  gyUser: User;
}

export default function RoleBox({ gyUser }: RoleBoxProps) {
  return (
    <Box sx={{ mt: '24px' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        <Typography variant="h6" sx={{ mb: '8px', fontWeight: 'bold' }}>
          Roles
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: ['5px', '1rem'] }}>
          {gyUser.roles?.map((role) => (
            <RoleChip key={role} role={role as ERole} />
          ))}
        </Box>
      </motion.div>
    </Box>
  );
}
