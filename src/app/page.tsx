/* eslint-disable react/react-in-jsx-scope */
'use client';

import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useUser as useUserGY } from '@/hooks/useUser';
import { ProfileSkeleton } from './components/organisms/ProfileSkeleton';
import { toBase64 } from '../utils/global';
import UserData from './components/molecules/UserData';
import RoleBox from './components/molecules/RoleBox';
import ActionsBox from './components/molecules/ActionsBox';
import CardHeader from './components/molecules/CardHeader';
import { EditData } from '@/domain/user';
import { ELogs } from '@/utils/constants/ELogs';

function Home() {
  const { user } = useUser();
  const {
    data: gyUser,
    isLoading: gyUserLoading,
    update,
    isLoadingUpdate,
  } = useUserGY();
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editData, setEditData] = useState<EditData>({
    username: gyUser?.username || '',
    picture: gyUser?.picture || '',
    phoneNumber: gyUser?.phoneNumber || null,
  });

  const handleEditClick = () => {
    setEditData({
      username: gyUser?.username || '',
      picture: gyUser?.picture || '',
      phoneNumber: gyUser?.phoneNumber || null,
    });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({
      username: '',
      picture: '',
      phoneNumber: null,
    });
  };

  const handleSaveEdit = async () => {
    try {
      let base64Image = editData.picture;

      if (imageFile) {
        base64Image = await toBase64(imageFile);
      }

      const updatedData = { ...editData, picture: base64Image };
      await update(updatedData);

      setPreviewImage(null);
      setIsEditing(false);
    } catch (error) {
      console.error(ELogs.ERROR_UPDATING_DATA, error);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);

      setEditData((prev) => ({
        ...prev,
        picture: objectUrl,
      }));
    }
  };

  if (gyUserLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
          paddingTop: '5%',
        }}
      >
        <ProfileSkeleton />
      </Box>
    );
  }

  if (!gyUser) {
    return (
      <div>
        <Typography variant="h6">{ELogs.NO_USER_DATA_AVAILABLE}</Typography>
      </div>
    );
  }
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        paddingTop: ['18%', '10%', '5%'],
      }}
    >
      <Box
        sx={{
          padding: '16px',
          width: '100%',
          paddingX: '5%',
          margin: '0 auto',
        }}
      >
        <Card
          sx={{
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            padding: '16px',
          }}
        >
          <CardHeader
            previewImage={previewImage}
            editData={editData}
            gyUser={gyUser}
            isEditing={isEditing}
            handleImageChange={handleImageChange}
          />
          <CardContent sx={{ pt: ['50px', '80px'], pb: '10px' }}>
            <UserData
              user={user}
              gyUser={gyUser}
              isEditing={isEditing}
              setEditData={setEditData}
              editData={editData}
            />
            <RoleBox gyUser={gyUser} />
            <ActionsBox
              isEditing={isEditing}
              handleEditClick={handleEditClick}
              handleSaveEdit={handleSaveEdit}
              handleCancelEdit={handleCancelEdit}
              isLoadingUpdate={isLoadingUpdate}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default Home;
