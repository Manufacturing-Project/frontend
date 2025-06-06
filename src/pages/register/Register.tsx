import React from "react";
import { FullLogo } from "../../components/organism/fullLogo/FullLogo";
import { InputTextField } from "../../components/molecules";
import {
  Box,
  Button,
  Typography,
  Grid,
  Link,
} from "@mui/material";
import theme from "../../components/theme";
import img from "../../assets/small-team-discussing-ideas-2194220-0.png";
import { useSignupMutation } from "../../features/user/UserApiSlice";
import { useDispatch } from "react-redux";
import { setUser, setLoading } from "../../features/user/UserSlice";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import {RegisterinitialValues} from "../../utils/forms/initialStatus/FormInitialStatus";
import {RegisterValidationSchema } from "../../utils/forms/validationSchemas/ValidationSchema";




  const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "80%", height: "100vh", marginLeft: "200px" }}>
      <FullLogo />
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 2, marginLeft: "20px" }}>

          <Typography component="h2" variant="h5" marginLeft="-220px">Welcome!</Typography>

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
                navigate('/dashboard');
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

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isSubmitting || isLoading || !isValid || !dirty}
                  sx={{
                    backgroundColor: theme.colors.primary_color_green,
                    color: theme.colors.secondary_background_color,
                    marginTop: "40px",
                    width: "350px",
                    height: "36px",
                  }}
                >
                  {isLoading ? "Registering..." : "Sign Up"}
                </Button>

                <Typography sx={{ fontSize: "12px", alignSelf: "center", marginTop: "20px", marginLeft: "60px" }}>
                  Already have an account?{" "}
                  <Link href="/auth/login" sx={{ textDecoration: "none" }}>
                    Login
                  </Link>
                </Typography>

                <ToastContainer />
              </Form>
            )}
          </Formik>
        </Box>

        {/* Right Side: Image */}
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={img} width="600px" alt="Team Discussion" />
        </Box>
      </Box>
    </Box>
  );
};

export { RegisterPage };
