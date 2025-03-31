import { lexendFont } from '@/utils/fonts';
import { Box, Button } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';

interface ActionsBoxProps {
  isEditing: boolean;
  handleEditClick: () => void;
  handleSaveEdit: () => void;
  handleCancelEdit: () => void;
  isLoadingUpdate: boolean;
}

export default function ActionsBox({
  isEditing,
  handleEditClick,
  handleSaveEdit,
  handleCancelEdit,
  isLoadingUpdate,
}: ActionsBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 2.5 }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: '24px',
        }}
      >
        {isEditing ? (
          <Box
            sx={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'space-between',
              flexDirection: ['column', 'row'],
            }}
          >
            <Button
              variant="contained"
              sx={{
                fontFamily: lexendFont.style.fontFamily,
                fontSize: ['12px', '14px'],
                transition: 'background 0.3s',
                '&:hover': {
                  background: 'magenta',
                },
              }}
              color="info"
              onClick={handleSaveEdit}
              disabled={isLoadingUpdate}
              loading={isLoadingUpdate}
            >
              Save Changes
            </Button>
            <Button
              variant="outlined"
              sx={{
                fontFamily: lexendFont.style.fontFamily,
                fontSize: ['12px', '14px'],
              }}
              color="secondary"
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          </Box>
        ) : (
          <>
            <Button
              sx={{
                background: '#8C54FF',
                fontFamily: lexendFont.style.fontFamily,
                fontSize: ['12px', '14px'],
                transition: '0.3s',
                '&:hover': {
                  background: 'magenta',
                },
              }}
              variant="contained"
              color="primary"
              onClick={handleEditClick}
            >
              Edit Profile
            </Button>
            <a href="/api/auth/logout" style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                color="error"
                sx={(theme) => ({
                  fontFamily: lexendFont.style.fontFamily,
                  fontSize: ['12px', '14px'],
                  transition: '0.3s',
                  '&:hover': {
                    background: 'red',
                    color: theme.palette.text.primary,
                  },
                })}
              >
                Logout
              </Button>
            </a>
          </>
        )}
      </Box>
    </motion.div>
  );
}
