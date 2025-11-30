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
        sx={(theme) => ({
          position: 'relative',
          borderRadius: '20px',
          height: '160px',
          background:
            theme.palette.mode === 'dark'
              ? isEditing
                ? 'linear-gradient(135deg, #8C54FF 0%, #00F5FF 100%)'
                : 'linear-gradient(135deg, #1a1a2e 0%, #2d1b69 50%, #1a1a2e 100%)'
              : isEditing
                ? 'linear-gradient(135deg, #8C54FF 0%, #00F5FF 100%)'
                : 'linear-gradient(135deg, #9b7dff 0%, #7c5ce6 50%, #9b7dff 100%)',
          overflow: 'hidden',
          boxShadow:
            theme.palette.mode === 'dark'
              ? 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 8px 32px rgba(140, 84, 255, 0.2)'
              : 'inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 8px 32px rgba(140, 84, 255, 0.3)',
        })}
      >
        {/* Patrón de ondas decorativas */}
        <Box
          sx={(theme) => ({
            position: 'absolute',
            inset: 0,
            opacity: theme.palette.mode === 'dark' ? 0.15 : 0.2,
            backgroundImage: `
              radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.9) 0%, transparent 40%),
              radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.7) 0%, transparent 45%),
              radial-gradient(circle at 90% 25%, rgba(255, 255, 255, 0.8) 0%, transparent 42%),
              radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.75) 0%, transparent 38%),
              radial-gradient(circle at 70% 75%, rgba(255, 255, 255, 0.85) 0%, transparent 40%),
              radial-gradient(circle at 85% 60%, rgba(255, 255, 255, 0.6) 0%, transparent 35%)
            `,
          })}
        />
        {/* Patrón de ondas de fondo */}
        <Box
          sx={(theme) => ({
            position: 'absolute',
            inset: 0,
            backgroundImage:
              theme.palette.mode === 'dark'
                ? `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 35px,
                rgba(140, 84, 255, 0.03) 35px,
                rgba(140, 84, 255, 0.03) 70px
              ),
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 35px,
                rgba(140, 84, 255, 0.03) 35px,
                rgba(140, 84, 255, 0.03) 70px
              )
            `
                : `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 35px,
                rgba(255, 255, 255, 0.15) 35px,
                rgba(255, 255, 255, 0.15) 70px
              ),
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 35px,
                rgba(255, 255, 255, 0.15) 35px,
                rgba(255, 255, 255, 0.15) 70px
              )
            `,
            opacity: 0.3,
          })}
        />
        {/* Partículas flotantes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0, opacity: 0.5 }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
            style={{
              position: 'absolute',
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              width: `${4 + i}px`,
              height: `${4 + i}px`,
              borderRadius: '50%',
              background: isEditing
                ? 'rgba(0, 245, 255, 0.6)'
                : 'rgba(255, 255, 255, 0.8)',
              filter: 'blur(1px)',
            }}
          />
        ))}
        {/* Brillo superior */}
        <Box
          sx={(theme) => ({
            position: 'absolute',
            top: 0,
            left: '30%',
            right: '30%',
            height: '50%',
            background:
              theme.palette.mode === 'dark'
                ? 'radial-gradient(ellipse at center top, rgba(255, 255, 255, 0.2) 0%, transparent 70%)'
                : 'radial-gradient(ellipse at center top, rgba(255, 255, 255, 0.4) 0%, transparent 70%)',
            filter: 'blur(20px)',
          })}
        />
      </Box>
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
