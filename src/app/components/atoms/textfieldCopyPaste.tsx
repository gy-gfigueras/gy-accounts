import { lexendFont } from '@/utils/fonts';
import { InputAdornment, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { copyToClipboard } from '@/utils/functions/CopyToClipBoard';
import IconButton from '@mui/material/IconButton';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';
interface TextFieldCopyTemplateProps {
  value: string;
  disabled?: boolean;
  fullWidth?: boolean;
  label: string;
}

export default function TextFieldCopyTemplate({
  value,
  label,
  disabled = false,
  fullWidth = true,
}: TextFieldCopyTemplateProps) {
  const [hidden, setHidden] = useState(true);
  return (
    <TextField
      fullWidth={fullWidth}
      disabled={disabled}
      type={hidden ? 'password' : 'text'}
      label={label}
      value={value}
      variant="outlined"
      sx={{
        mb: '8px',
      }}
      slotProps={{
        htmlInput: {
          style: {
            fontFamily: lexendFont.style.fontFamily,
            whiteSpace: !hidden ? 'nowrap' : 'pre-wrap',
            overflow: !hidden ? 'hidden' : 'auto',
            textOverflow: !hidden ? 'ellipsis' : 'unset',
          },
        },
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={() => setHidden(!hidden)}>
                {hidden ? (
                  <VisibilityIcon
                    sx={(theme) => ({
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: theme.palette.text.primary,
                      },
                    })}
                  />
                ) : (
                  <VisibilityOffIcon
                    sx={(theme) => ({
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: theme.palette.text.primary,
                      },
                    })}
                  />
                )}
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => copyToClipboard(value)}
                edge="end"
                sx={{
                  width: 40,
                  height: 40,
                  margin: '0',
                  display: 'flex',
                  color: 'text.primary',
                }}
              >
                <ContentCopyIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
