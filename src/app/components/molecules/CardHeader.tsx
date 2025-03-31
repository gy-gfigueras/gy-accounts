import { EditData, User } from '@/domain/user';
import { Box, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';

interface CardHeaderProps {
  previewImage: string | null;
  editData: EditData;
  gyUser: User;
  isEditing: boolean;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CardHeader({
  previewImage,
  editData,
  gyUser,
  isEditing,
  handleImageChange,
}: CardHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Box
        sx={{
          position: 'relative',
          borderRadius: '8px',
          height: '120px',
          background: '#8C54FF',
        }}
      >
        <Box sx={{ position: 'absolute', bottom: '-40px', left: '16px' }}>
          <Avatar
            src={
              previewImage ||
              editData.picture ||
              gyUser?.picture ||
              '/default.png'
            }
            alt={editData.username || gyUser?.username}
            sx={{
              width: '128px',
              height: '128px',
              border: isEditing ? '4px solid #8C54FF' : '4px solid transparent',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.63)',
            }}
          />
          {isEditing && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <label
                style={{
                  color: 'text.primary',
                  cursor: 'pointer',
                  width: '100%',
                  height: '100%',
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </label>
            </Box>
          )}
        </Box>
      </Box>
    </motion.div>
  );
}
