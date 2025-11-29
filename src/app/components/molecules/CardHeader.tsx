import { avatarVariants } from '@/utils/animations/variants';
import { UserProfile } from '@gycoding/nebula';
import { Avatar, Box } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';

interface CardHeaderProps {
  previewImage: string | null;
  editData: UserProfile;
  gyUser: UserProfile;
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
      style={{ position: 'relative' }}
    >
      <Box
        sx={{
          position: 'relative',
          borderRadius: '16px',
          height: '140px',
          background: isEditing
            ? 'linear-gradient(135deg, #8C54FF 0%, #00F5FF 100%)'
            : 'linear-gradient(135deg, rgba(140, 84, 255, 0.9) 0%, rgba(115, 64, 230, 0.8) 100%)',
          backdropFilter: 'blur(10px)',
          overflow: 'hidden',
          transition: 'all 0.4s ease',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(circle at 20% 30%, rgba(163, 112, 255, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(140, 84, 255, 0.2) 0%, transparent 50%)
            `,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background:
              'linear-gradient(to top, rgba(0, 0, 0, 0.2) 0%, transparent 100%)',
          },
        }}
      />
      {/* Avatar fuera del header */}
      <Box
        sx={{ position: 'absolute', bottom: '-64px', left: '16px', zIndex: 10 }}
      >
        <motion.div
          variants={avatarVariants}
          initial="idle"
          animate="idle"
          whileHover="hover"
          style={{
            borderRadius: '50%',
          }}
        >
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
              border: isEditing
                ? `4px solid transparent`
                : '4px solid rgba(255, 255, 255, 0.2)',
              backgroundImage: isEditing
                ? 'linear-gradient(white, white), linear-gradient(135deg, #8C54FF, #00F5FF)'
                : 'none',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
              boxShadow: '0 0 30px rgba(140, 84, 255, 0.4)',
              transition: 'all 0.3s ease',
              cursor: isEditing ? 'pointer' : 'default',
              '&:hover': {
                boxShadow: '0 0 40px rgba(140, 84, 255, 0.6)',
              },
            }}
          />
        </motion.div>
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
    </motion.div>
  );
}
