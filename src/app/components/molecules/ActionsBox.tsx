import { lexendFont } from '@/utils/fonts';
import { Box, Button } from '@mui/material';
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
            flexDirection: ['column', 'row'],
          }}
        >
          <Button
            variant="contained"
            sx={{
              fontFamily: lexendFont.style.fontFamily,
              fontSize: ['12px', '14px'],
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
        <Button
          sx={{
            background: '#8C54FF',
            fontFamily: lexendFont.style.fontFamily,
            fontSize: ['12px', '14px'],
          }}
          variant="contained"
          color="primary"
          onClick={handleEditClick}
        >
          Edit Profile
        </Button>
      )}
      <a href="/api/auth/logout" style={{ textDecoration: 'none' }}>
        <Button
          variant="outlined"
          color="error"
          sx={{
            fontFamily: lexendFont.style.fontFamily,
            fontSize: ['12px', '14px'],
            alignSelf: 'end',
            justifySelf: 'end',
          }}
        >
          Logout
        </Button>
      </a>
    </Box>
  );
}
