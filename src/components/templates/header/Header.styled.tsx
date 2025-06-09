import styled from '@emotion/styled';
import { Box , Avatar} from '@mui/material';
import theme from '../../theme';
import ProfileIcon from '../../../assets/user.png';


export const StyledHeaderContainerBox = styled(Box)({

     backgroundColor: theme.colors.secondary_background_color,
     boxShadow: `0px 2px 4px ${theme.colors.black_Transparent_1}`,
     position: 'fixed',
     width: '100%',
     zIndex: '2',
})

export const StyledfirstRowBox = styled(Box)({
    display: 'flex',
     justifyContent: 'space-between',
     alignItems: 'center',
     margin: '10px 0',
      height: '70px',
})

export const StyledAvatarBox = styled(Avatar)({
            alt:"Remy Sharp",
            src: {ProfileIcon},
            display: 'inline-block',
            cursor: 'pointer',
            marginRight: '40px',
            width: '45px',
            height: '45px',
})
export const StyledSecondRowBox = styled(Box)({
            display: 'flex',
            justifyContent: 'center',
            height: '50px',
})