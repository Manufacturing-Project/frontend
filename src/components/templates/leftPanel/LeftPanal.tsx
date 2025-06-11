import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  PanelContainer,
  StyledList,
  StyledListItem,
  ListItemContent,
  StyledListItemIcon,
  StyledListItemText,
} from './LeftPanel.styled';
import { panelItems, imageMap } from '../../../../src/utils/constants/feftPanel.constants';

const LeftPanel: React.FC = () => {
  const location = useLocation();

  const activeItem =
    location.pathname.split('/')[1]?.charAt(0).toUpperCase() +
    location.pathname.split('/')[1]?.slice(1);

  const renderPanelItems = () =>
    panelItems[activeItem || '']?.map((item) => {
      const isActive = location.pathname === item.to;
      return (
        <StyledListItem
          key={item.text}
          active={isActive}
          component={Link}
          // @ts-expect-error: 'to' is forwarded to Link
          to={item.to}
        >
          <ListItemContent>
            <StyledListItemIcon active={isActive}>{item.icon}</StyledListItemIcon>
            <StyledListItemText primary={item.text} active={isActive} />
          </ListItemContent>
        </StyledListItem>
      );
    });

  const renderActiveImage = () => {
    if (['Register', 'Setting', 'Manufacture'].includes(activeItem)) {
      return (
        <img
          src={imageMap[location.pathname]}
          alt="Active item"
          style={{ width: '260px', marginTop: '30px', height: '230px' }}
        />
      );
    }
    return null;
  };

  return (
    <PanelContainer>
      <StyledList>{renderPanelItems()}</StyledList>
      {renderActiveImage()}
    </PanelContainer>
  );
};

export { LeftPanel };
