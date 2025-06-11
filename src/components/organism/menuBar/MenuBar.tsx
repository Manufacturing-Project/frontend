// MenuBar.tsx

import React from 'react';
import { MenuItem } from '../../molecules';
import { menuItems } from './MenuBar.data';
import { MenuBarWrapper } from './MenuBar.styled';

export const MenuBar: React.FC = () => {
  return (
    <MenuBarWrapper>
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          icon={item.icon}
          label={item.label}
          path={item.path}
        />
      ))}
    </MenuBarWrapper>
  );
};
