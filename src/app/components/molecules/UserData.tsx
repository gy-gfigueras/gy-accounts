import { lexendFont } from '@/utils/fonts';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import React from 'react';

import { UserProfile as Auth0UserProfile } from '@auth0/nextjs-auth0/client';
import { UserProfile } from '@gycoding/nebula';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import RefreshIcon from '@mui/icons-material/Refresh';
import { motion } from 'framer-motion';
import TextFieldCopyTemplate from '../atoms/textfieldCopyPaste';

interface UserDataProps {
  user: Auth0UserProfile | undefined;
  gyUser: UserProfile;
  isEditing: boolean;
  setEditData: React.Dispatch<React.SetStateAction<UserProfile>>;
  editData: UserProfile;
  updateApiKey: () => void;
  isUpdatingAPIKEY: boolean;
}

export default function UserData({
  user,
  gyUser,
  isEditing,
  setEditData,
  editData,
  updateApiKey,
  isUpdatingAPIKEY,
}: UserDataProps) {
  return (
    <Box
      sx={{
        mb: '20px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'start',
        gap: ['.5rem', '1rem'],
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {isEditing ? (
          <TextField
            value={editData.username}
            onChange={(e) =>
              setEditData({ ...editData, username: e.target.value })
            }
            sx={{
              mb: '8px',
              borderBottom: '2px solid #8C54FF',
            }}
            variant="standard"
            slotProps={{
              htmlInput: {
                style: {
                  fontFamily: lexendFont.style.fontFamily,
                  width: '250px',
                  fontWeight: '700',
                  fontSize: '25px',
                  borderRadius: '20px',
                },
              },

              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        ) : (
          <TextField
            disabled
            value={gyUser.username}
            variant="standard"
            sx={(theme) => ({
              mb: '8px',
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: theme.palette.text.primary,
              },
            })}
            slotProps={{
              htmlInput: {
                style: {
                  fontFamily: lexendFont.style.fontFamily,
                  width: 'auto',
                  fontWeight: '700',
                  fontSize: '25px',
                  borderRadius: '20px',
                },
              },
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon
                      sx={(theme) => ({ color: theme.palette.text.primary })}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: -30 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: ['column', 'row-reverse'],
            gap: ['.5rem', '1rem'],
            alignItems: 'center',
            justifyContent: 'start',
            width: '100%',
          }}
        >
          {isEditing ? (
            <TextField
              fullWidth
              value={editData.phoneNumber}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  phoneNumber: e.target.value,
                })
              }
              variant="standard"
              sx={{
                mb: '8px',
                borderBottom: '2px solid #8C54FF',
              }}
              slotProps={{
                htmlInput: {
                  style: {
                    fontFamily: lexendFont.style.fontFamily,
                  },
                },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneAndroidIcon
                        sx={(theme) => ({ color: theme.palette.text.primary })}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />
          ) : (
            <TextField
              fullWidth
              disabled
              value={gyUser.phoneNumber}
              variant="standard"
              sx={(theme) => ({
                mb: '8px',
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: theme.palette.text.primary,
                },
              })}
              slotProps={{
                htmlInput: {
                  style: {
                    fontFamily: lexendFont.style.fontFamily,
                  },
                },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneAndroidIcon
                        sx={(theme) => ({ color: theme.palette.text.primary })}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
          <TextField
            fullWidth
            value={user?.email}
            disabled
            variant="standard"
            sx={{ mb: '8px' }}
            slotProps={{
              htmlInput: {
                style: {
                  fontFamily: lexendFont.style.fontFamily,
                },
              },
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: 'gray' }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            width: ['auto', 'auto'],
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextFieldCopyTemplate
            label="API KEY"
            disabled
            value={gyUser!.apiKey as string}
          />

          {isEditing && (
            <IconButton
              disabled={isUpdatingAPIKEY}
              onClick={updateApiKey}
              sx={{
                width: '48px',
                height: '48px',
                marginTop: '-6px',
              }}
            >
              <RefreshIcon
                sx={{
                  width: '32px',
                  height: '32px',
                }}
              />
            </IconButton>
          )}
        </Box>
      </motion.div>
    </Box>
  );
}
