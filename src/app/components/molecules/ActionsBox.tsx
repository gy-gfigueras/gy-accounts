import { fadeInUpVariants } from '@/utils/animations/variants';
import { lexendFont } from '@/utils/fonts';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import Button from '../atoms/Button';

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
      variants={fadeInUpVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.9 }}
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
              gradient={true}
              variant="contained"
              sx={{
                fontFamily: lexendFont.style.fontFamily,
                fontSize: ['12px', '14px'],
              }}
              onClick={handleSaveEdit}
              disabled={isLoadingUpdate}
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
              gradient={true}
              sx={{
                fontFamily: lexendFont.style.fontFamily,
                fontSize: ['12px', '14px'],
              }}
              variant="contained"
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
                  borderColor: theme.palette.error.main,
                  color: theme.palette.error.main,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: theme.palette.error.main,
                    color: '#fff',
                    borderColor: theme.palette.error.main,
                    boxShadow: '0 8px 20px rgba(244, 67, 54, 0.4)',
                    transform: 'translateY(-2px)',
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
