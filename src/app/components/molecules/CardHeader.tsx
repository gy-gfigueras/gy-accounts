// import { avatarVariants } from '@/utils/animations/variants';
import { UserProfile } from '@gycoding/nebula';
import { Avatar, Box } from '@mui/material';
// import { motion } from 'framer-motion';
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
    // <motion.div
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   transition={{ duration: 1 }}
    //   style={{ position: 'relative' }}
    // >
    <div style={{ position: 'relative' }}>
      <Box
        sx={(theme) => ({
          position: 'relative',
          borderRadius: '20px',
          height: '160px',
          background:
            theme.palette.mode === 'dark'
              ? isEditing
                ? '#8C54FF'
                : '#1a1a2e'
              : isEditing
                ? '#8C54FF'
                : '#8C54FF',
          overflow: 'hidden',
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 4px 12px rgba(0, 0, 0, 0.3)'
              : '0 4px 12px rgba(0, 0, 0, 0.1)',
        })}
      >
        {/* Efectos visuales comentados para prueba de rendimiento */}
        {/* Ondas, patrones diagonales, partículas y brillo deshabilitados */}
      </Box>
      {/* Avatar fuera del header */}
      <Box
        sx={{ position: 'absolute', bottom: '-64px', left: '16px', zIndex: 10 }}
      >
        {/* <motion.div
          variants={avatarVariants}
          initial="idle"
          animate="idle"
          whileHover="hover"
          style={{
            borderRadius: '50%',
          }}
        > */}
        <div style={{ borderRadius: '50%' }}>
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
              marginBottom: ['20px', '0px'],
              border: isEditing
                ? `4px solid transparent`
                : '4px solid rgba(255, 255, 255, 0.3)',
              backgroundImage: isEditing
                ? 'linear-gradient(white, white), linear-gradient(135deg, #8C54FF, #00F5FF)'
                : 'none',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
              boxShadow: isEditing
                ? '0 0 40px rgba(0, 245, 255, 0.5), 0 8px 16px rgba(0, 0, 0, 0.2)'
                : '0 0 30px rgba(140, 84, 255, 0.4), 0 8px 16px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease',
              cursor: isEditing ? 'pointer' : 'default',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: isEditing
                  ? '0 0 50px rgba(0, 245, 255, 0.7), 0 12px 24px rgba(0, 0, 0, 0.3)'
                  : '0 0 40px rgba(140, 84, 255, 0.6), 0 12px 24px rgba(0, 0, 0, 0.3)',
              },
            }}
          />
        </div>
        {/* </motion.div> */}
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
    </div>
    // </motion.div>
  );
}
