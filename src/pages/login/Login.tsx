import React from 'react';
import { FullLogo } from "../../components/organism/fullLogo/FullLogo";
import { InputTextField } from "../../components/molecules";
import { Grid} from '@mui/material';
import { useLoginMutation } from '../../features/user/UserApiSlice';
import img from '../../assets/small-team-discussing-ideas-2194220-0.png';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { loginInitialValues } from '../../utils/forms/initialStatus/authForm/authFormInitialStatus';
import { loginValidationSchema } from '../../utils/forms/validationSchemas/authForm/authValidationSchema';
import { StyledContainerBox , StyledSecondBox , StyledButton ,StyledImageBox ,StyledLink , StyledLofincontainerBox , StyledLoginTitle , Styledimage , Styledtext  } from './Login.styled';

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
    <StyledContainerBox>
      <FullLogo />
      <StyledSecondBox>
        <StyledLofincontainerBox>
          <StyledLoginTitle>
            Welcome !
          </StyledLoginTitle>
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
             
                <StyledButton
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting || isLoading || !isValid || !dirty}>
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </StyledButton>

                <Styledtext>
                  Don't have an account?
                  <StyledLink to="/auth/signup">
                    Sign up
                  </StyledLink>
                </Styledtext>
              </Form>
            )}
          </Formik>
        </StyledLofincontainerBox>

        <StyledImageBox>
          <Styledimage src={img}  alt="Team Discussion" />
        </StyledImageBox>
      </StyledSecondBox>
    </StyledContainerBox>
  );
};

export { LoginPage };