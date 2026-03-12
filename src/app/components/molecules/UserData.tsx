import { lexendFont } from '@/utils/fonts';
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

import { fadeInUpVariants } from '@/utils/animations/variants';
import colors from '@/utils/theme/colors';
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
    <Box sx={{ mb: '20px', width: '100%' }}>
      {/* ===== MOBILE: info rows (view mode) ===== */}
      <Box
        sx={{
          display: { xs: isEditing ? 'none' : 'block', sm: 'none' },
          borderRadius: '14px',
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
          mb: '16px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: 2,
            py: 1.75,
            gap: 1.5,
          }}
        >
          <PhoneAndroidIcon
            sx={{ color: 'text.secondary', fontSize: 20, flexShrink: 0 }}
          />
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ lineHeight: 1.2 }}
            >
              Phone
            </Typography>
            <Typography
              variant="body2"
              fontWeight={500}
              sx={{ fontFamily: lexendFont.style.fontFamily }}
            >
              {gyUser.phoneNumber || '—'}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: 2,
            py: 1.75,
            gap: 1.5,
          }}
        >
          <EmailIcon
            sx={{ color: 'text.secondary', fontSize: 20, flexShrink: 0 }}
          />
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ lineHeight: 1.2 }}
            >
              Email
            </Typography>
            <Typography
              variant="body2"
              fontWeight={500}
              sx={{ fontFamily: lexendFont.style.fontFamily }}
            >
              {user?.email || '—'}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ px: 2, pt: 1.5, pb: 0.5 }}>
          <TextFieldCopyTemplate
            label="API KEY"
            disabled
            value={gyUser.apiKey as string}
          />
        </Box>
      </Box>

      {/* ===== MOBILE: edit fields (edit mode) ===== */}
      <Box
        sx={{
          display: { xs: isEditing ? 'flex' : 'none', sm: 'none' },
          flexDirection: 'column',
          gap: '16px',
          mb: '16px',
          width: '100%',
        }}
      >
        <TextField
          fullWidth
          value={editData.username}
          onChange={(e) =>
            setEditData({ ...editData, username: e.target.value })
          }
          label="Username"
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': { borderColor: colors.primary.main },
            },
          }}
          slotProps={{
            htmlInput: {
              style: {
                fontFamily: lexendFont.style.fontFamily,
                fontWeight: 600,
              },
            },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          fullWidth
          value={editData.phoneNumber}
          onChange={(e) =>
            setEditData({ ...editData, phoneNumber: e.target.value })
          }
          label="Phone"
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': { borderColor: colors.primary.main },
            },
          }}
          slotProps={{
            htmlInput: { style: { fontFamily: lexendFont.style.fontFamily } },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneAndroidIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            },
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ flex: 1 }}>
            <TextFieldCopyTemplate
              label="API KEY"
              disabled
              value={gyUser.apiKey as string}
            />
          </Box>
          <IconButton
            disabled={isUpdatingAPIKEY}
            onClick={updateApiKey}
            sx={{
              mb: '8px',
              width: '48px',
              height: '48px',
              flexShrink: 0,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
                backgroundColor: 'rgba(140, 84, 255, 0.1)',
              },
            }}
          >
            <motion.div
              animate={{ rotate: isUpdatingAPIKEY ? 360 : 0 }}
              transition={{
                duration: 0.6,
                ease: 'easeInOut',
                repeat: isUpdatingAPIKEY ? Infinity : 0,
              }}
            >
              <RefreshIcon />
            </motion.div>
          </IconButton>
        </Box>
      </Box>

      {/* ===== DESKTOP: existing layout ===== */}

      {/* Username */}
      <motion.div
        variants={fadeInUpVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {isEditing ? (
            <TextField
              value={editData.username}
              onChange={(e) =>
                setEditData({ ...editData, username: e.target.value })
              }
              sx={{
                mb: '8px',
                borderBottom: '2px solid #8C54FF',
                transition: 'all 0.3s ease',
                '&:hover': {
                  '& .MuiInput-underline:before': {
                    borderBottomColor: colors.primary.light,
                  },
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: colors.primary.main,
                },
              }}
              variant="standard"
              slotProps={{
                htmlInput: {
                  style: {
                    fontFamily: lexendFont.style.fontFamily,
                    width: '100%',
                    maxWidth: '300px',
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
        </Box>
      </motion.div>

      {/* Phone + Email */}
      <motion.div
        variants={fadeInUpVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
        style={{ width: '100%' }}
      >
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'row-reverse',
            gap: '1rem',
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
                setEditData({ ...editData, phoneNumber: e.target.value })
              }
              variant="standard"
              sx={{
                mb: '8px',
                borderBottom: '2px solid #8C54FF',
                transition: 'all 0.3s ease',
                '&:hover': {
                  '& .MuiInput-underline:before': {
                    borderBottomColor: colors.primary.light,
                  },
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: colors.primary.main,
                },
              }}
              slotProps={{
                htmlInput: {
                  style: { fontFamily: lexendFont.style.fontFamily },
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
                  style: { fontFamily: lexendFont.style.fontFamily },
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
            sx={{ mb: '8px', transition: 'all 0.3s ease' }}
            slotProps={{
              htmlInput: { style: { fontFamily: lexendFont.style.fontFamily } },
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

      {/* API Key */}
      <motion.div
        variants={fadeInUpVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.7 }}
      >
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'row',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextFieldCopyTemplate
            label="API KEY"
            disabled
            value={gyUser.apiKey as string}
          />
          {isEditing && (
            <IconButton
              disabled={isUpdatingAPIKEY}
              onClick={updateApiKey}
              sx={{
                width: '48px',
                height: '48px',
                marginTop: '-6px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                  backgroundColor: 'rgba(140, 84, 255, 0.1)',
                },
              }}
            >
              <motion.div
                animate={{ rotate: isUpdatingAPIKEY ? 360 : 0 }}
                transition={{
                  duration: 0.6,
                  ease: 'easeInOut',
                  repeat: isUpdatingAPIKEY ? Infinity : 0,
                }}
              >
                <RefreshIcon sx={{ width: '32px', height: '32px' }} />
              </motion.div>
            </IconButton>
          )}
        </Box>
      </motion.div>
    </Box>
  );
}
