import { Box, Card, CardContent, Skeleton } from '@mui/material';

import React from 'react';

export function ProfileSkeleton() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        overflow: 'hidden',
        width: '100vw',
        paddingX: '5%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        borderRadius: '16px',
      }}
    >
      <Card
        sx={{
          width: '100%',
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            height: '120px',
            backgroundColor: '#00000040',
          }}
        >
          <Skeleton
            width={'120px'}
            height={'200px'}
            sx={{
              position: 'absolute',
              bottom: '-100px',
              left: '16px',
              borderRadius: '50%',
            }}
          />
        </Box>
        <CardContent sx={{ pt: '80px', pb: '10px' }}>
          <Skeleton
            variant="text"
            width="100%"
            height={75}
            sx={{ mb: '2px' }}
          />
          <Box display={'flex'} flexDirection={'column'}>
            <Box>
              <Skeleton variant="text" width="20%" height={75} />
            </Box>
            <Box>
              <Skeleton variant="text" width="15%" height={75} />
            </Box>
          </Box>
          <Skeleton
            variant="text"
            width="15%"
            height={75}
            sx={{ mt: '10px' }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: '24px',
            }}
          >
            <Skeleton variant="rectangular" width={150} height={40} />
            <Skeleton variant="rectangular" width={150} height={40} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
