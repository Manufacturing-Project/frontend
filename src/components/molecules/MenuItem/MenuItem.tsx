import React from 'react';
import { Icon } from '../../atoms';
import { MenuText } from '../../atoms';
import theme from '../../theme';


interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, isActive, onClick }) => {
      
  return (
    <div
      className={`menu-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
      style={{
        width: '150px',
        height: '65px',
        marginLeft: '50px',
        display: 'flex',
        alignItems: 'center',
        gap: '25px',
        borderBottom: isActive ? `3px solid ${theme.colors.font_color_textfeild}` : 'none',
        cursor: 'pointer',
      }}
    >
      {/* Use the Icon and Menutext components */}
      <Icon icon={icon} />
      <MenuText text={label} />
    </div>
  );
};

export default MenuItem;
