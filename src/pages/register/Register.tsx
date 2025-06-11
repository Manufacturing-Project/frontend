// src/pages/register/Register.tsx
import React from "react";
import { FullLogo } from "../../components/organism/fullLogo/FullLogo";
import { InputTextField } from "../../components/molecules";
import { Grid, Link } from "@mui/material";
import img from "../../assets/small-team-discussing-ideas-2194220-0.png";
import { useSignupMutation } from "../../features/user/UserApiSlice";
import { useDispatch } from "react-redux";
import { setUser, setLoading } from "../../features/user/UserSlice";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { RegisterinitialValues } from "../../utils/forms/initialStatus/authForm/authFormInitialStatus";
import { RegisterValidationSchema } from "../../utils/forms/validationSchemas/authForm/authValidationSchema";

import {
  Container,
  ContentWrapper,
  FormWrapper,
  WelcomeText,
  StyledButton,
  ImageWrapper,
  StyledTypography,
} from "./Register.styles";

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();

  return (
    <Container>
      <FullLogo />
      <ContentWrapper>
        <FormWrapper>
          <WelcomeText as="h2" variant="h5">
            Welcome!
          </WelcomeText>

          <Formik
            initialValues={RegisterinitialValues}
            validationSchema={RegisterValidationSchema}
            onSubmit={async (values, { setSubmitting, setFieldError, resetForm }) => {
              try {
                dispatch(setLoading(true));
                const response = await registerUser(values).unwrap();
                dispatch(setUser(response));
                toast.success("Successfully Registered");
                resetForm();
                navigate("/dashboard");
              } catch (err: any) {
                toast.error(err?.data?.message || "Registration Failed");
                setFieldError("general", err?.data?.message || "Registration Failed");
              } finally {
                dispatch(setLoading(false));
                setSubmitting(false);
              }
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, isSubmitting, isValid, dirty }) => (
              <Form>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <InputTextField
                      textPlaceholder="User Name"
                      label="User Name"
                      required
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!(touched.username && errors.username)}
                      helperText={touched.username && errors.username ? errors.username : ""}
                      id="username"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputTextField
                      textPlaceholder="Email"
                      label="Email"
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
                      textPlaceholder="Password"
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
                  <Grid item xs={12}>
                    <InputTextField
                      textPlaceholder="Confirm Password"
                      label="Confirm Password"
                      required
                      name="confirmPassword"
                      type="password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!(touched.confirmPassword && errors.confirmPassword)}
                      helperText={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ""}
                      id="confirmPassword"
                    />
                  </Grid>
                </Grid>

                <StyledButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isSubmitting || isLoading || !isValid || !dirty}
                >
                  {isLoading ? "Registering..." : "Sign Up"}
                </StyledButton>

                <StyledTypography>
                  Already have an account?{" "}
                  <Link href="/auth/login" sx={{ textDecoration: "none" }}>
                    Login
                  </Link>
                </StyledTypography>

                <ToastContainer />
              </Form>
            )}
          </Formik>
        </FormWrapper>

        <ImageWrapper>
          <img src={img} width="600px" alt="Team Discussion" />
        </ImageWrapper>
      </ContentWrapper>
    </Container>
  );
};

export { RegisterPage };
