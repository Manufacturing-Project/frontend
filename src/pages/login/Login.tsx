import React, { useState } from 'react';
import { FullLogo } from "../../components/organism/fullLogo/FullLogo";
import { InputTextField } from "../../components/molecules";
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import Done from '@mui/icons-material/Done';
import {
  
  Button,
  Typography,
  Grid,
  Link,
} from '@mui/material';
import { useLoginMutation } from '../../features/user/UserApiSlice'; // Adjust the path as per your project structure
import theme from '../../components/theme';
import img from '../../assets/small-team-discussing-ideas-2194220-0.png';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
   
  const navigate = useNavigate(); 
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [signIn, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }

    try {
      const response = await signIn({ email , password }).unwrap();
      console.log('Login successful:', response);
      setError('');
      // Save the token or navigate to another page
      localStorage.setItem('token', response.token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        height: '100vh',
        marginLeft: '200px'
      }}
    >
      <FullLogo />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
            marginLeft: '20px'
          }}
        >
          <Typography component="h2" variant="h6" marginLeft='-220px'>
            Welcome !
          </Typography>
          <Typography component="h1" variant="h5" marginLeft='-220px'>
            Sign in to
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={18}>
                <InputTextField
                  textPlaceholder="User Name"
                  label="User Name"
                  required
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  id="email"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <InputTextField
                  textPlaceholder="Password"
                  label="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="psw"
                  name="psw"
                  
                />
              </Grid>
            </Grid>
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

      <Box sx={{ marginTop: '30px', fontSize: '12px', display: 'flex', flexDirection: 'row' }}>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<Done />} 
                  checkedIcon={<Done />} 
                />
              }
              label="Remember Me"
            />
          </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                backgroundColor: theme.colors.primary_color_green,
                color: theme.colors.secondary_background_color,
                marginTop: '20px',
                width: "350px",
                height: "36px",
              }}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>

            <Typography
              sx={{ fontSize: '12px', alignSelf: 'center' , marginTop: '20px' , marginLeft: '60px'}}
              >
               Don't have an account?
              <Link href="/auth/signup" sx={{ textDecoration: 'none' }}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src={img} width="600px" alt="Team Discussion" />
        </Box>
      </Box>
    </Box>
  );
};

export {LoginPage};
