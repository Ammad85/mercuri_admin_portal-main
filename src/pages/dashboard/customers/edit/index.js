import { useCallback, useEffect, useRef, useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { customerApi } from "../../../../__fake-api__/customer-api";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import { CustomerListTable } from "../../../../components/dashboard/customer/customer-list-table";
import { useMounted } from "../../../../hooks/use-mounted";
import { Download as DownloadIcon } from "../../../../icons/download";
import { Plus as PlusIcon } from "../../../../icons/plus";
import { Search as SearchIcon } from "../../../../icons/search";
import { Upload as UploadIcon } from "../../../../icons/upload";
import { gtm } from "../../../../lib/gtm";
import { axiosClient } from "../../../../api/config";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Alert, FormHelperText, CircularProgress } from "@mui/material";
import { useAuth } from "../../../../hooks/use-auth";
import NextLink from 'next/link';
import { Logo } from '../../../../components/logo';
import Link from "next/link";


const CustomerEdit = () => {
  const isMounted = useMounted();
  const queryRef = useRef(null);
  const router = useRouter();
  const { register } = useAuth();
  const [error, setError] = useState(false);
  const [success,setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
       userId: router.query.userId,
       employeeNumber: "",
       email: router.query.email,
       title: router.query.title,
      firstName: router.query.firstName,
      lastName: router.query.username,
      mobile: router.query.mobile,
      officeTel: router.query.officeTel,
      enabled: true,
      companyId: 1,
      username: router.query.username,
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      title: Yup
        .string()
        .max(255)
        .required('Title is required'),
      firstName: Yup
        .string()
        .max(255)
        .required('First Name is required'),
      lastName: Yup
        .string()
        .max(255)
        .required('Last Name is required'),
      username: Yup
        .string()
        .max(255)
        .required('Username is required'),
      mobile: Yup
        .string()
        .max(255)
        .required('Mobile no is required'),
    }),
    onSubmit: async (values, helpers) => {
      setLoading(true);
      let body = values;
      delete body["submit"];
      delete body["password"];
      delete body["userRole"];
      console.log(body);
      
      try {
        await axiosClient.post("User/editUser", values).then((res) => {
         if (res.status === 200) {
           setSuccess(true);
         }

       })
       
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

  const formikPassword = useFormik({
    initialValues: {
      userId: router.query.userId,
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      password: Yup
        .string()
        .min(7)
        .max(255)
        .required('Password is required'),
    }),
    onSubmit: async (values, helpers) => {
      setLoading(true);
      let body = values;
      delete body["submit"];
      console.log(body);
      try {
        await axiosClient.post("User/updatePassword", values).then((res) => {
         if (res.status === 200) {
           setSuccess(true);
         }

       })
       
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

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);


 
  useEffect(
    () => {
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleRoleAdd = async (value) => {
    setLoading(true);
    let body = {
      userId: router.query.userId,
      userRole: value
    };
      console.log(body);
      try {
        await axiosClient.post("User/addRole", body).then((res) => {
         if (res.status === 200) {
           setSuccess(true);
         }

       })
       
     } catch (err) {
       console.error(err);

       if (isMounted()) {
         helpers.setStatus({ success: false });
         helpers.setErrors({ submit: err.message });
         helpers.setSubmitting(false);
       }
     }
      setLoading(false);
  }

  const handleRoleDelete = async (value) => {
    setLoading(true);
    let body = {
      userId: router.query.userId,
      userRole: value
    };
      console.log(body);
      try {
        await axiosClient.post("User/removeRole", body).then((res) => {
         if (res.status === 200) {
           setSuccess(true);
         }

       })
       
     } catch (err) {
       console.error(err);

       if (isMounted()) {
         helpers.setStatus({ success: false });
         helpers.setErrors({ submit: err.message });
         helpers.setSubmitting(false);
       }
     }
      setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Dashboard: Edit User</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">Edit User</Typography>
              </Grid>
              <Grid item>
              <Link
         href={'/dashboard/customers'}
        >
                <Button
                  variant="contained"
                >
                  Cancel
                  </Button>
                  </Link>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{justifyContent:"center", width:'100%'}}>
          <Card sx={{maxWidth:"sm", margin:"0px auto"}}>
          <Container
            sx={{
              py: {
                xs: "20px",
                md: "40px",
              },
            }}
              >
                <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <NextLink
                href="/"
                passHref
              >
                <a>
                  <Logo
                    sx={{
                      height: 40,
                      width: 40
                    }}
                  />
                </a>
              </NextLink>
              <Typography variant="h4">
                Edit User
              </Typography>
              <Typography
                color="textSecondary"
                sx={{ mt: 2 }}
                variant="body2"
              >
                Edit user on the internal platform
              </Typography>
            </Box>
        <form noValidate onSubmit={formik.handleSubmit} >
                  <TextField
          autoFocus
          error={Boolean(formik.touched.title && formik.errors.title)}
          fullWidth
          helperText={formik.touched.title && formik.errors.title}
          label="Title"
          margin="normal"
          name="title"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.title}
                  />
        <TextField
          autoFocus
          error={Boolean(formik.touched.firstName && formik.errors.firstName)}
          fullWidth
          helperText={formik.touched.firstName && formik.errors.firstName}
          label="First Name"
          margin="normal"
          name="firstName"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.firstName}
                  />
        <TextField
          autoFocus
          error={Boolean(formik.touched.lastName && formik.errors.lastName)}
          fullWidth
          helperText={formik.touched.lastName && formik.errors.lastName}
          label="Last Name"
          margin="normal"
          name="lastName"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />          
        <TextField
          autoFocus
          error={Boolean(formik.touched.employeeNumber && formik.errors.employeeNumber)}
          fullWidth
          helperText={formik.touched.employeeNumber && formik.errors.employeeNumber}
          label="Employee Number"
          margin="normal"
          name="employeeNumber"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.employeeNumber}
                  />
        <TextField
          autoFocus
          error={Boolean(formik.touched.email && formik.errors.email)}
          fullWidth
          helperText={formik.touched.email && formik.errors.email}
          label="Email"
          margin="normal"
          name="email"
          type="email"          
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <TextField
          autoFocus
          error={Boolean(formik.touched.mobile && formik.errors.mobile)}
          fullWidth
          helperText={formik.touched.mobile && formik.errors.mobile}
          label="Mobile No"
          margin="normal"
          name="mobile"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.mobile}
                  />
         <TextField
          autoFocus
          error={Boolean(formik.touched.officeTel && formik.errors.officeTel)}
          fullWidth
          helperText={formik.touched.officeTel && formik.errors.officeTel}
          label="Office Tel"
          margin="normal"
          name="officeTel"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.officeTel}
          />
        <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: -1,
          mt: 2
        }}
      >
        <Checkbox
          checked={formik.values.enabled}
          name="enabled"
          onChange={formik.handleChange}
        />
        <Typography
          color="textSecondary"
          variant="body2"
        >
          Enabled
        </Typography>
      </Box>          
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
            Edit User
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
                {success &&
                  <Box sx={{ mt: 2 }}>
                    <Alert severity={"info"}>
            
                      <div>
                        <b> User added successfully </b>
                      </div>
             
                    </Alert>
                  </Box>
                }
                </form>
                <form noValidate onSubmit={formikPassword.handleSubmit} >         
        <TextField
          error={Boolean(formikPassword.touched.password && formikPassword.errors.password)}
          fullWidth
          helperText={formikPassword.touched.password && formikPassword.errors.password}
          label="Password"
          margin="normal"
          name="password"
          onBlur={formikPassword.handleBlur}
          onChange={formikPassword.handleChange}
          type="password"
          value={formikPassword.values.password}
                  />
                   
                  
        {formikPassword.errors.submit && (
          <Box sx={{ mt: 3 }}>
            <FormHelperText error>{formikPassword.errors.submit}</FormHelperText>
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
            Update Password
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
                {success &&
                  <Box sx={{ mt: 2 }}>
                    <Alert severity={"info"}>
            
                      <div>
                        <b> Password updated successfully </b>
                      </div>
             
                    </Alert>
                  </Box>
                }
        </form>
              </Container>
              <Box sx={{ paddingLeft: 4, paddingRight: 4, paddingTop: 0, paddingBottom: 4 }}>
              <Typography
                  color="textSecondary"
                sx={{ mb: 1 }}
                variant="body2">
                User Roles
              </Typography>
              <Grid container
                direction="row"
                justifyContent="start"
                alignItems="center"
                mb={1}
                >
                <Grid item xs={3}>
                <Typography color="textSecondary"
                    variant="body2">Coach
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                  <Button 
                  size="small"
                  variant="contained"
                  disabled={loading}
                  onClick={() => handleRoleAdd(2)}  
                    >
                  Add Role
                    </Button>
                    </Grid>
                  <Grid item xs={3}>
                  <Button 
                  size="small"
                  variant="contained"
                  disabled={loading}
                  onClick={() => handleRoleDelete(2)}   
                  >
                  Delete Role
                    </Button>
                  </Grid>
                </Grid>
                <Grid container
                direction="row"
                justifyContent="start"
                  alignItems="center"
                  mb={1}
                >
                  <Grid item xs={3}>
                <Typography color="textSecondary"
                      variant="body2">Coachee</Typography>
                    </Grid>
                  <Grid item xs={3}>
                  <Button 
                  size="small"
                  variant="contained"
                      disabled={loading}
                      onClick={() => handleRoleAdd(3)} 
                    >
                  Add Role
                    </Button>
                    </Grid>
                  <Grid item xs={3}>
                  <Button 
                  size="small"
                  variant="contained"
                  disabled={loading}
                  onClick={() => handleRoleDelete(3)} 
                    >
                  Delete Role
                    </Button>
                  </Grid>
                </Grid>
                <Grid container
                direction="row"
                justifyContent="start"
                alignItems="center"
                >
                  <Grid item xs={3}>
                <Typography color="textSecondary"
                      variant="body2">Director</Typography>
                    </Grid>
                  <Grid item xs={3}>
                  <Button 
                  size="small"
                  variant="contained"
                  disabled={loading}
                  onClick={() => handleRoleAdd(1)} 
                  >
                  Add Role
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                  <Button 
                  size="small"
                  variant="contained"
                  disabled={loading}
                  onClick={() => handleRoleDelete(1)}   
                  >
                  Delete Role
                    </Button>
                    </Grid>
                  </Grid>
                </Box>

            </Card>
            </Box>
        </Container>
      </Box>
    </>
  );
};

CustomerEdit.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CustomerEdit;
