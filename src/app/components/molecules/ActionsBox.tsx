import { lexendFont } from '@/utils/fonts';
import { Box, Button } from '@mui/material';
import Link from 'next/link';
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
        <Box sx={{ display: 'flex', gap: '16px' }}>
          <Button
            variant="contained"
            sx={{ fontFamily: lexendFont.style.fontFamily }}
            color="info"
            onClick={handleSaveEdit}
            disabled={isLoadingUpdate}
            loading={isLoadingUpdate}
          >
            Save Changes
          </Button>
          <Button
            variant="outlined"
            sx={{ fontFamily: lexendFont.style.fontFamily }}
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
          }}
          variant="contained"
          color="primary"
          onClick={handleEditClick}
        >
          Edit Profile
        </Button>
      )}
      <Link href="/api/auth/logout" style={{ textDecoration: 'none' }}>
        <Button
          variant="outlined"
          color="error"
          sx={{ fontFamily: lexendFont.style.fontFamily }}
        >
          Logout
        </Button>
      </Link>
    </Box>
  );
}
