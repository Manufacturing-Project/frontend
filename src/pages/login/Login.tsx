import React from 'react';
import { FullLogo } from "../../components/organism/fullLogo/FullLogo";
import { InputTextField } from "../../components/molecules";
import {
  Box,
  Button,
  Typography,
  Grid,
  Link,
} from '@mui/material';
import { useLoginMutation } from '../../features/user/UserApiSlice';
import theme from '../../components/theme';
import img from '../../assets/small-team-discussing-ideas-2194220-0.png';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { loginInitialValues } from '../../utils/forms/initialStatus/materialRegistration/FormInitialStatus';
import { loginValidationSchema } from '../../utils/forms/validationSchemas/materialRegistration/ValidationSchema';
import * as Yup from 'yup';
import { loginInitialValues } from '../../utils/forms/initialStatus/authForm/authFormInitialStatus';
import { loginValidationSchema } from '../../utils/forms/validationSchemas/authForm/authValidationSchema';


const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [signIn, { isLoading }] = useLoginMutation();
  

  const handleSubmit = async (values: { email: string; password: string }, { setSubmitting, setFieldError }: any) => {
    try {
      const response = await signIn({ email: values.email, password: values.password }).unwrap();
      navigate('/dashboard');
      localStorage.setItem('token', response.token);
    } catch (err) {
      setFieldError('general', 'Invalid email or password. Please try again.');
    } finally {
      setSubmitting(false);
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
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
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
          <Typography component="h2" variant="h4" marginLeft='-210px' marginBottom={4}>
            Welcome !
          </Typography>
          <Formik
            initialValues={loginInitialValues}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isSubmitting,
              isValid,
              dirty
            }) => (
              <Form>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <InputTextField
                      textPlaceholder='User Email'
                      label="User Name"
                      required
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!(touched.email && errors.email)}
                      helperText={touched.email && errors.email ? errors.email : ""}
                      id="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputTextField
                      textPlaceholder='Password'
                      label="Password"
                      required
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!(touched.password && errors.password)}
                      helperText={touched.password && errors.password ? errors.password : ""}
                      id="password"
                    />
                  </Grid>
                </Grid>
             
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isSubmitting || isLoading || !isValid || !dirty}
                  sx={{
                    backgroundColor: theme.colors.primary_color_green,
                    color: theme.colors.secondary_background_color,
                    marginTop: '40px',
                    width: "350px",
                    height: "36px",
                  }}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>

                <Typography
                  sx={{ fontSize: '12px', alignSelf: 'center', marginTop: '20px', marginLeft: '60px' }}
                >
                  Don't have an account?
                  <Link href="/auth/signup" sx={{ textDecoration: 'none' }}>
                    Sign up
                  </Link>
                </Typography>
              </Form>
            )}
          </Formik>
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

export { LoginPage };