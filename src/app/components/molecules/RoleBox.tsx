/* eslint-disable react/react-in-jsx-scope */
import { ERole, UserProfile } from '@gycoding/nebula';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { RoleChip } from '../atoms/RoleChip';

interface RoleBoxProps {
  gyUser: UserProfile;
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
