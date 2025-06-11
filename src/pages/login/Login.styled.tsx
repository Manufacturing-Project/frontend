import styled from "@emotion/styled";
import { Box, Button, TextField , Typography } from "@mui/material";
import theme from "../../components/theme";
import { Link } from "react-router-dom";


export const StyledContainerBox = styled(Box)({

        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        height: '100vh',
        marginLeft: '200px'
})

export const StyledSecondBox = styled(Box)({
        display: 'flex', 
        flexDirection: 'row'
})

export const StyledLofincontainerBox = styled(Box)({
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
            marginLeft: '20px'
})
export const StyledLoginTitle = styled(Typography)({

        component: 'h2',
        variant: 'h4',
        marginLeft: '-210px',
        marginBottom: 4
})
export const StyledButton = styled(Button)({
                    backgroundColor: theme.colors.primary_color_green,
                    color: theme.colors.secondary_background_color,
                    marginTop: '40px',
                    width: "350px",
                    height: "36px",
})

export const Styledtext = styled(Typography)({
            fontSize: '12px',
            alignSelf: 'center',
            marginTop: '20px',
            marginLeft: '60px'
})

export const StyledLink = styled(Link)({
            textDecoration: 'none',
        })

export const StyledImageBox = styled(Box)({
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
})

export const Styledimage = styled.img({
            width: '600px',
        })

