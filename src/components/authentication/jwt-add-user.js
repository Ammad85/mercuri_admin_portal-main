import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Alert, Box, Button, FormHelperText, TextField, CircularProgress } from "@mui/material";
import { useAuth } from "../../hooks/use-auth";
import { useMounted } from "../../hooks/use-mounted";
import { axiosClient } from "../../api/config";

export const JWTLogin = (props) => {
  const isMounted = useMounted();
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      setLoading(true);
      try {
        const res = await login(values.email, values.password);
        setError(!res);

        if (isMounted()) {
          if (res) {
            const returnUrl = router.query.returnUrl || "/dashboard";
            router.push(returnUrl).catch(console.error);
          }
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
      setLoading(false);
    },
  });
  return (
    <>
      <form noValidate onSubmit={formik.handleSubmit} {...props}>
        <TextField
          autoFocus
          error={Boolean(formik.touched.email && formik.errors.email)}
          fullWidth
          helperText={formik.touched.email && formik.errors.email}
          label="Username"
          margin="normal"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <TextField
          error={Boolean(formik.touched.password && formik.errors.password)}
          fullWidth
          helperText={formik.touched.password && formik.errors.password}
          label="Password"
          margin="normal"
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="password"
          value={formik.values.password}
        />
        {formik.errors.submit && (
          <Box sx={{ mt: 3 }}>
            <FormHelperText error>{formik.errors.submit}</FormHelperText>
          </Box>
        )}
        <Box sx={{ mt: 2 }}>
          <Button
            // disabled={formik.isSubmitting}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            disabled={loading}
          >
            Log In
          </Button>
        </Box>
         {loading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 2
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <Box sx={{ mt: 2 }}>
          <Alert severity={error ? "error" : "info"}>
            {error ?
              <div>
              <b> User not found </b> please check your username and password
            </div>:
            <div>
            Use <b>demo@melsoft.co.za</b> and password <b>Password123!</b>
          </div>
          }   
          </Alert>
        </Box>
      </form>
    </>
  );
};
