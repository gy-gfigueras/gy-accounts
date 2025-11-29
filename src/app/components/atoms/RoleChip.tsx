/* eslint-disable react/react-in-jsx-scope */
import { lexendFont } from '@/utils/fonts';
import RoleTheme from '@/utils/functions/RoleTheme';
import { ERole } from '@gycoding/nebula';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { Chip } from '@mui/material';

interface RoleChipProps {
  role: ERole;
}

export function RoleChip({ role }: RoleChipProps): JSX.Element {
  return (
    <Chip
      icon={<Brightness1Icon />}
      label={role}
      color="primary"
      variant="outlined"
      size="medium"
      sx={{
        marginBottom: '8px',
        marginRight: '8px',
        border: '2px solid',
        padding: '5px',
        fontWeight: 700,
        fontFamily: lexendFont.style.fontFamily,
        ...RoleTheme(role),
      }}
    />
  );
}
