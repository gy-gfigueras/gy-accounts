/* eslint-disable react/react-in-jsx-scope */
'use client';

import { useUser as useUserGY } from '@/hooks/useUser';
import { ELogs } from '@/utils/constants/ELogs';
import { ESeverity } from '@/utils/constants/ESeverity';
import { useUser } from '@auth0/nextjs-auth0/client';
import { UserProfile } from '@gycoding/nebula';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useState } from 'react';
import { toBase64 } from '../utils/global';
import AnimatedAlert from './components/atoms/Alert';
import ActionsBox from './components/molecules/ActionsBox';
import CardHeader from './components/molecules/CardHeader';
import RoleBox from './components/molecules/RoleBox';
import UserData from './components/molecules/UserData';
import { ProfileSkeleton } from './components/organisms/ProfileSkeleton';

function Home() {
  const { user } = useUser();
  const {
    data: gyUser,
    isLoading: gyUserLoading,
    // error: isError,
    update,
    isLoadingUpdate,
    isErrorUpdate,
    isUpdated,
    setIsUpdated,
    setIsErrorUpdate,
    refreshApiKey,
    isUpdatingAPIKEY,
    isUpdatedAPIKEY,
    isErrorUpdateAPIKEY,
    setIsUpdatedAPIKEY,
    setIsErrorUpdateAPIKEY,
  } = useUserGY();
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editData, setEditData] = useState<UserProfile>({
    username: gyUser?.username || '',
    picture: gyUser?.picture || '',
    phoneNumber: gyUser?.phoneNumber || '',
    roles: gyUser?.roles || [],
    email: gyUser?.email || '',
    apiKey: gyUser?.apiKey || '',
  });

  const handleOpenErrorAlert = isErrorUpdate;
  const handleOpenSuccessAlert = isUpdated;
  const handleOpenSuccessAlertRefreshApiKey = isUpdatedAPIKEY;

  const handleOpenErrorAlertClose = () => {
    setIsErrorUpdate(false);
  };
  const handleOpenSuccessAlertClose = () => {
    setIsUpdated(false);
  };

  const handleOpenSuccessAlertRefreshApiKeyClose = () => {
    setIsUpdatedAPIKEY(false);
  };

  const handleOpenSuccessAlertRefreshApiKeyErrorClose = () => {
    setIsErrorUpdateAPIKEY(false);
  };

  const handleRefreshAPIKey = async () => {
    try {
      await refreshApiKey();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = () => {
    setEditData({
      username: gyUser?.username || '',
      picture: gyUser?.picture || '',
      phoneNumber: gyUser?.phoneNumber || '',
      roles: gyUser?.roles || [],
      email: gyUser?.email || '',
      apiKey: gyUser?.apiKey || '',
    });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({
      username: '',
      picture: '',
      phoneNumber: '',
      roles: [],
      email: '',
      apiKey: '',
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
              updateApiKey={handleRefreshAPIKey}
              isUpdatingAPIKEY={isUpdatingAPIKEY}
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
      {/* <AnimatedAlert
        severity={ESeverity.ERROR}
        open={isError }
        duration={5000}
        message={'An error occurred while fetching user data'}
        onClose={handleOpenErrorAlertClose}
      /> */}
      <AnimatedAlert
        severity={ESeverity.ERROR}
        open={handleOpenErrorAlert}
        duration={5000}
        message={'Profile could be not updated'}
        onClose={handleOpenErrorAlertClose}
      />

      <AnimatedAlert
        severity={ESeverity.SUCCESS}
        open={handleOpenSuccessAlert}
        duration={5000}
        message={'Profile has been updated'}
        onClose={handleOpenSuccessAlertClose}
      />
      <AnimatedAlert
        severity={ESeverity.SUCCESS}
        open={handleOpenSuccessAlertRefreshApiKey}
        duration={5000}
        message={'API KEY Has been updated'}
        onClose={handleOpenSuccessAlertRefreshApiKeyClose}
      />
      <AnimatedAlert
        severity={ESeverity.ERROR}
        open={isErrorUpdateAPIKEY}
        duration={5000}
        message={'API KEY Cannot be updated'}
        onClose={handleOpenSuccessAlertRefreshApiKeyErrorClose}
      />
    </Box>
  );
}

export default Home;
