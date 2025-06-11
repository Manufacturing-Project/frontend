import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import SettingsIcon from '@mui/icons-material/Settings';
import TokenSharpIcon from '@mui/icons-material/TokenSharp';
import { StyledIcon } from './MenuBarIcon.styled';

export const menuItems = [
  {
    icon: (
      <StyledIcon>
        <DashboardIcon />
      </StyledIcon>
    ),
    label: 'Dashboard',
    path: '/dashboard',
  },
  {
    icon: (
      <StyledIcon>
        <AppRegistrationIcon />
      </StyledIcon>
    ),
    label: 'Registration',
    path: '/register',
  },
  {
    icon: (
      <StyledIcon>
        <TokenSharpIcon />
      </StyledIcon>
    ),
    label: 'Manufacture',
    path: '/manufacture',
  },
  {
    icon: (
      <StyledIcon>
        <SettingsIcon />
      </StyledIcon>
    ),
    label: 'Settings',
    path: '/setting',
  },
];
