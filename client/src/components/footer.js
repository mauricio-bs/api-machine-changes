import React from 'react';
import {Typography, Link} from '@material-ui/core'
export default function Footer() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" target="_blank" href="http://github.com/mauricio-bs">
          Thyssenkrupp Campo Limpo - Eletrônica UV09 
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }