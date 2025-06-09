import { FullLogo } from "../../components/organism/fullLogo/FullLogo";
import { InputTextField } from "../../components/molecules";
import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Grid, Link } from "@mui/material";
import theme from "../../components/theme";
import img from "../../assets/small-team-discussing-ideas-2194220-0.png";
<<<<<<< Updated upstream
import { useSignupMutation} from "../../features/user/UserApiSlice";
import { setUser, setError, setLoading } from "../../features/user/UserSlice";
import { useDispatch } from 'react-redux';
import Toaster from "../../components/molecules/toaster/Toaster";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setErrorLocal] = useState("");
  
=======
import { useSignupMutation } from "../../features/user/UserApiSlice";
import { useDispatch } from "react-redux";
import { setUser, setLoading } from "../../features/user/UserSlice";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import {RegisterinitialValues} from "../../utils/forms/initialStatus/authForm/authFormInitialStatus";
import {RegisterValidationSchema} from "../../utils/forms/validationSchemas/authForm/authValidationSchema";

  const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
>>>>>>> Stashed changes
  const [registerUser, { isLoading }] = useSignupMutation();
    const dispatch = useDispatch();

  // Automatically set the username as the email when email changes
  useEffect(() => {
    setUsername(email);
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password || !confirmPassword) {
      setErrorLocal("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorLocal("Passwords do not match.");
      return;
    }

    try {
      dispatch(setLoading(true));
      const response = await registerUser({
        email, username, password,
        confirmPassword,
      }).unwrap();


      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setErrorLocal("");

      dispatch(setUser(response));
      setErrorLocal("");

      toast.success('Successfully Registered');
      console.log("User registered successfully:", response);
    } catch (err: any) {
      setErrorLocal(err.data?.message || "Registration failed.");
      toast.error("Registration Failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "80%",
        height: "100vh",
        marginLeft: "200px",
      }}
    >
      <FullLogo />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* Left Side: Registration Form */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
            marginLeft: "20px",
          }}
        >
          <Typography component="h2" variant="h6" marginLeft="-220px">
            Welcome!
          </Typography>
          <Typography component="h1" variant="h5" marginLeft="-220px">
            Sign up to
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <InputTextField
                  textPlaceholder="Email"
                  label="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <InputTextField
                  textPlaceholder="User Name"
                  label="User Name"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  name="username"
                />
              </Grid>
              <Grid item xs={12}>
                <InputTextField
                  textPlaceholder="Password"
                  label="Password"
                  required
                  
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                />
              </Grid>
              <Grid item xs={12}>
                <InputTextField
                  textPlaceholder="Confirm Password"
                  label="Confirm Password"
                  required
                  
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id="confirmPassword"
                  name="confirmPassword"
                />
              </Grid>
            </Grid>
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                backgroundColor: theme.colors.primary_color_green,
                color: theme.colors.secondary_background_color,
                marginTop: "60px",
                width: "350px",
                height: "36px",
              }}
            >
              {isLoading ? "Registering..." : "Sign Up"}
            </Button>
            <ToastContainer />

            <Typography
              sx={{
                fontSize: "12px",
                alignSelf: "center",
                marginTop: "20px",
                marginLeft: "60px",
              }}
            >
              Already have an account?{" "}
              <Link href="/auth/login" sx={{ textDecoration: "none" }}>
                Login
              </Link>
            </Typography>
          </Box>
        </Box>

        {/* Right Side: Image */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={img} width="600px" alt="Team Discussion" />
        </Box>
      </Box>
    </Box>
  );
};

export { RegisterPage };
