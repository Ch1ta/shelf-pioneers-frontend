import React from 'react';
import { Box } from '@mui/material';
import QRCode from 'qrcode.react';

const Index = ({ link }) => {
  return (
    <Box>
      <QRCode value={link} size="300" />
    </Box>
  );
};

export default Index;
